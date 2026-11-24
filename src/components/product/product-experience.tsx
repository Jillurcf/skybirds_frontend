'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { ProductEnquiryLinks } from '@/components/product/product-enquiry-links';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductOptions } from '@/components/product/product-options';
import { siteConfig } from '@/config/site';
import { MOTION_DURATION, MOTION_EASE, MOTION_STAGGER } from '@/lib/animation';
import { formatCategoryLabel } from '@/lib/format';
import { getAvailableSizesForColor, getGalleryImagesForColor } from '@/lib/product';
import { cn } from '@/lib/utils';
import type { ColorOption, Product, SizeLabel } from '@/types/product';

interface ProductExperienceProps {
  product: Product;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION_STAGGER }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION_DURATION.slow, ease: MOTION_EASE.outSoft }
  }
};

export function ProductExperience({ product }: ProductExperienceProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const pathname = usePathname();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeLabel | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = getGalleryImagesForColor(product, selectedColor?.name);
  const productUrl = siteConfig.url ? `${siteConfig.url.replace(/\/$/, '')}${pathname}` : pathname;

  function handleColorChange(color: ColorOption) {
    if (selectedColor?.name === color.name) return;

    const nextSizes = getAvailableSizesForColor(product, color.name);
    setSelectedColor(color);
    setActiveImageIndex(0);
    setSelectedSize((current) => (current && nextSizes.includes(current) ? current : null));
  }

  function handleSizeChange(size: SizeLabel) {
    setSelectedSize(size);
  }

  return (
    <motion.div
      variants={reducedMotion ? undefined : containerVariants}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-3xl lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start"
    >
      <motion.div variants={reducedMotion ? undefined : itemVariants}>
        <ProductGallery
          product={product}
          images={images}
          selectedColorName={selectedColor?.name}
          activeIndex={activeImageIndex}
          onActiveIndexChange={setActiveImageIndex}
        />
      </motion.div>

      <div>
        <motion.div variants={reducedMotion ? undefined : itemVariants}>
          <div className="flex flex-wrap items-center justify-between gap-md">
            <p className="eyebrow">
              {formatCategoryLabel(product.category)} · {product.collection}
            </p>
            <p className="text-[10px] uppercase tracking-editorial text-charcoal/75">
              SKU {product.sku}
            </p>
          </div>
          <h1 className="mt-md font-display text-section font-normal leading-tight text-charcoal">
            {product.name}
          </h1>
          <p className="lede mt-md">{product.shortDescription}</p>
        </motion.div>

        <motion.div variants={reducedMotion ? undefined : itemVariants} className="mt-xl">
          <h2 className="eyebrow">Description</h2>
          <p className="mt-sm max-w-xl text-sm leading-loose text-charcoal/70">
            {product.description}
          </p>
          <p className="mt-sm text-xs leading-relaxed text-charcoal/75">
            Sample catalogue entry. Photography and specifications are pending final confirmation.
          </p>
        </motion.div>

        <motion.div variants={reducedMotion ? undefined : itemVariants} className="mt-xl">
          <h2 className="font-display text-2xl text-charcoal">Specifications</h2>
          <dl className="mt-md grid grid-cols-2 gap-md border-y border-champagne py-lg text-sm">
            {product.specifications.map((specification) => (
              <div
                key={specification.label}
                className={cn(specification.label === 'Care' ? 'col-span-2' : undefined)}
              >
                <dt className="eyebrow">{specification.label}</dt>
                <dd className="mt-sm leading-relaxed text-charcoal/80">{specification.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div variants={reducedMotion ? undefined : itemVariants} className="mt-xl">
          <ProductOptions
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={handleColorChange}
            onSizeChange={handleSizeChange}
          />
        </motion.div>

        <motion.div
          variants={reducedMotion ? undefined : itemVariants}
          className="mt-xl border-t border-champagne pt-lg"
        >
          <h2 className="font-display text-2xl text-charcoal">Enquire about this piece</h2>
          <p className="mt-sm text-sm leading-relaxed text-charcoal/65">
            Call, message or email. Your enquiry will include the selected colour, size and this
            product page.
          </p>
          <div className="mt-md">
            <ProductEnquiryLinks
              product={product}
              selection={{
                size: selectedSize,
                color: selectedColor?.name,
                url: productUrl
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
