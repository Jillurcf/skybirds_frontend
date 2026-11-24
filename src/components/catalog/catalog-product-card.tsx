'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ImageContainer } from '@/components/ui/image-container';
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from '@/lib/animation';
import { formatCategoryLabel } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

const cardVariants: Variants = {
  hidden: { opacity: 0.85, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE.outSoft }
  }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATION.slow,
      delay: MOTION_STAGGER,
      ease: MOTION_EASE.outSoft
    }
  }
};

const swatchVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATION.base,
      delay: MOTION_STAGGER * 2,
      ease: MOTION_EASE.outSoft
    }
  }
};

interface CatalogProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function CatalogProductCard({ product, priority = false, className }: CatalogProductCardProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const image = product.images[0];
  const availableColors = product.colors.filter((color) => color.available);
  const availableSizes = product.sizes.filter((size) => size.available);

  return (
    <motion.article
      variants={reducedMotion ? undefined : cardVariants}
      className={cn('h-full', className)}
    >
      <Link href={`/products/${product.slug}`} className="group block h-full rounded-editorial">
        <div className="relative overflow-hidden">
          <ImageContainer
            src={image?.src || undefined}
            alt={image?.alt ?? `${product.name} product photograph pending`}
            placeholderColor={image?.placeholderColor}
            placeholderLabel={`${product.name} photography pending`}
            priority={priority}
            className="transition-transform duration-base ease-out-soft group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-champagne/0 transition-colors duration-base group-hover:bg-champagne/10 group-focus-visible:bg-champagne/10"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-md top-md bg-ivory/90 px-2 py-1 text-[9px] uppercase tracking-editorial text-charcoal/70"
          >
            Sample entry
          </span>
        </div>

        <div className="pt-md">
          <div className="flex items-center justify-between gap-md">
            <p className="eyebrow">{formatCategoryLabel(product.category)}</p>
            <p className="text-[10px] uppercase tracking-editorial text-charcoal/75">SKU {product.sku}</p>
          </div>

          <motion.h3 variants={reducedMotion ? undefined : titleVariants} className="mt-2 font-display text-2xl leading-tight text-charcoal underline-offset-4 decoration-rose-gold group-hover:underline group-focus-visible:underline">
            {product.name}
          </motion.h3>

          <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{product.shortDescription}</p>

          <div className="mt-md flex flex-wrap items-center gap-lg border-t border-champagne pt-md">
            <div>
              <p className="text-[9px] uppercase tracking-editorial text-charcoal/75">Colours</p>
              <ul className="mt-sm flex items-center gap-sm" aria-label={`Available colours for ${product.name}`}>
                {availableColors.map((color) => (
                  <li key={color.name} className="flex items-center">
                    <span className="sr-only">{color.name}</span>
                    <motion.span
                      aria-hidden="true"
                      variants={reducedMotion ? undefined : swatchVariants}
                      className="block h-3 w-3 rounded-full border border-charcoal/20 shadow-[0_0_0_1px_rgba(255,255,255,0.6)]"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[9px] uppercase tracking-editorial text-charcoal/75">Sizes</p>
              <ul className="mt-sm flex flex-wrap gap-xs" aria-label={`Available sizes for ${product.name}`}>
                {availableSizes.map((size) => (
                  <li
                    key={size.label}
                    className="border border-champagne px-2 py-[2px] text-[10px] leading-5 text-charcoal/70"
                  >
                    {size.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <span className="mt-md inline-flex items-center gap-sm text-xs font-medium uppercase tracking-editorial text-charcoal transition-colors duration-fast group-hover:text-rose-gold-deep group-focus-visible:text-rose-gold-deep">
            View details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-fast group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 motion-reduce:transform-none" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
