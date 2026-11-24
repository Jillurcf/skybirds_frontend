'use client';

import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { CatalogProductCard } from '@/components/catalog/catalog-product-card';
import { MOTION_STAGGER } from '@/lib/animation';
import type { Product } from '@/types/product';

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION_STAGGER }
  }
};

const exitVariants = { opacity: 0, scale: 0.98 };

export function CatalogGrid({ products }: { products: Product[] }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <motion.ul
      variants={reducedMotion ? undefined : gridVariants}
      initial={reducedMotion ? false : 'hidden'}
      animate={reducedMotion ? undefined : 'visible'}
      className="grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.li
            key={product.slug}
            layout={!reducedMotion}
            exit={reducedMotion ? undefined : exitVariants}
            className="min-w-0"
          >
            <CatalogProductCard product={product} priority={index < 4} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
