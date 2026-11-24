'use client';

import { useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { ImageContainer } from '@/components/ui/image-container';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/animation';
import { getVariantForColor } from '@/lib/product';
import { cn } from '@/lib/utils';
import type { Product, ProductImage } from '@/types/product';

interface ProductGalleryProps {
  product: Product;
  images: ProductImage[];
  selectedColorName?: string;
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}

export function ProductGallery({
  product,
  images,
  selectedColorName,
  activeIndex,
  onActiveIndexChange
}: ProductGalleryProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const safeIndex = Math.min(Math.max(activeIndex, 0), Math.max(images.length - 1, 0));
  const activeImage = images[safeIndex];
  const selectedColor = product.colors.find((color) => color.name === selectedColorName);
  const variantHasImages = Boolean(getVariantForColor(product, selectedColorName)?.images?.length);
  const placeholderColor =
    selectedColor && !variantHasImages ? selectedColor.hex : activeImage?.placeholderColor;

  const transition = {
    duration: MOTION_DURATION.base,
    ease: MOTION_EASE.outSoft
  };

  function goTo(offset: number) {
    if (images.length < 2) return;
    onActiveIndexChange((safeIndex + offset + images.length) % images.length);
  }

  function handleGalleryKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(-1);
    }
  }

  if (!activeImage) {
    return null;
  }

  const visualKey = `${selectedColorName ?? 'default'}-${activeImage.src}-${safeIndex}`;
  const placeholderLabel = `${product.name} — ${activeImage.view ?? 'front'} photography pending`;

  return (
    <div onKeyDown={handleGalleryKeys}>
      <div className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={visualKey}
            initial={reducedMotion ? false : { opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
            transition={transition}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`View larger: ${activeImage.alt}`}
              className="group relative block w-full overflow-hidden rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ImageContainer
                src={activeImage.src || undefined}
                alt={activeImage.alt}
                aspect="portrait"
                placeholderColor={placeholderColor}
                placeholderLabel={placeholderLabel}
                priority={safeIndex === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="transition-transform duration-base ease-out-soft group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-md right-md inline-flex min-h-11 items-center gap-sm bg-ivory/90 px-md text-[10px] uppercase tracking-editorial text-charcoal/75"
              >
                <ZoomIn className="h-4 w-4" />
                View larger
              </span>
            </button>
          </motion.div>
        </AnimatePresence>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => goTo(-1)}
              aria-label="Previous image"
              className="absolute left-sm top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-control bg-ivory/85 text-charcoal transition-colors hover:bg-ivory hover:text-rose-gold-deep"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              aria-label="Next image"
              className="absolute right-sm top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-control bg-ivory/85 text-charcoal transition-colors hover:bg-ivory hover:text-rose-gold-deep"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul
          className="mt-md flex gap-sm overflow-x-auto pb-sm"
          aria-label={`Images of ${product.name}`}
        >
          {images.map((image, index) => {
            const isActive = index === safeIndex;
            return (
              <li key={`${image.src}-${index}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onActiveIndexChange(index)}
                  aria-label={`Show ${image.view ?? 'image'} ${index + 1} of ${images.length}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'block h-20 w-20 overflow-hidden rounded-control border-2 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold-deep focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    isActive ? 'border-rose-gold-deep' : 'border-transparent hover:border-champagne'
                  )}
                >
                  <ImageContainer
                    src={image.src || undefined}
                    alt=""
                    aspect="square"
                    placeholderColor={image.placeholderColor}
                    placeholderLabel={`${image.view ?? 'View'} ${index + 1}`}
                    sizes="80px"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent onKeyDown={handleGalleryKeys}>
          <DialogTitle className="sr-only">{product.name} image gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Use the left and right arrow keys or the navigation buttons to browse images.
          </DialogDescription>
          <div className="relative mt-md">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={visualKey}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 1.01 }}
                transition={transition}
              >
                <ImageContainer
                  src={activeImage.src || undefined}
                  alt={activeImage.alt}
                  aspect="portrait"
                  placeholderColor={placeholderColor}
                  placeholderLabel={placeholderLabel}
                  sizes="(max-width: 768px) 92vw, 52rem"
                  className="mx-auto h-[min(70vh,42rem)] w-auto max-w-full"
                />
              </motion.div>
            </AnimatePresence>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => goTo(-1)}
                  aria-label="Previous image in larger view"
                  className="absolute left-sm top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-control bg-ivory/90 text-charcoal transition-colors hover:text-rose-gold-deep"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  aria-label="Next image in larger view"
                  className="absolute right-sm top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-control bg-ivory/90 text-charcoal transition-colors hover:text-rose-gold-deep"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>
          <p aria-live="polite" className="mt-md text-center text-[10px] uppercase tracking-editorial text-charcoal/75">
            {safeIndex + 1} / {images.length} · {activeImage.view ?? 'View'}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
