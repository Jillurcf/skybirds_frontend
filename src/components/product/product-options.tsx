'use client';

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import { MOTION_DURATION, MOTION_EASE } from '@/lib/animation';
import { isLightColor } from '@/lib/color';
import { isSizeAvailableForColor } from '@/lib/product';
import { cn } from '@/lib/utils';
import type { ColorOption, Product, SizeLabel } from '@/types/product';

interface ProductOptionsProps {
  product: Product;
  selectedColor: ColorOption | null;
  selectedSize: SizeLabel | null;
  onColorChange: (color: ColorOption) => void;
  onSizeChange: (size: SizeLabel) => void;
}

export function ProductOptions({
  product,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange
}: ProductOptionsProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const selectionTransition = {
    duration: MOTION_DURATION.fast,
    ease: MOTION_EASE.outSoft
  };

  return (
    <div className="flex flex-col gap-xl">
      <LayoutGroup id={`${product.slug}-colours`}>
        <fieldset>
          <legend className="eyebrow mb-md">Available colours</legend>
          <div className="flex flex-wrap gap-sm">
            {product.colors.map((color) => {
              const selected = selectedColor?.name === color.name;
              return (
                <label
                  key={color.name}
                  className={cn(
                    'relative inline-flex h-11 w-11 items-center justify-center rounded-full',
                    color.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                  )}
                  title={color.available ? color.name : `${color.name} unavailable`}
                >
                  <input
                    type="radio"
                    name={`${product.slug}-colour`}
                    value={color.name}
                    checked={selected}
                    disabled={!color.available}
                    aria-disabled={!color.available}
                    onChange={() => onColorChange(color)}
                    className="peer sr-only"
                  />
                  <motion.span
                    aria-hidden="true"
                    whileTap={reducedMotion || !color.available ? undefined : { scale: 0.92 }}
                    className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-transparent transition-colors duration-fast peer-focus-visible:ring-2 peer-focus-visible:ring-rose-gold-deep peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"
                  >
                    <AnimatePresence initial={false}>
                      {selected ? (
                        <motion.span
                          key="colour-ring"
                          layoutId={reducedMotion ? undefined : `${product.slug}-colour-ring`}
                          initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
                          transition={selectionTransition}
                          className="absolute inset-0 rounded-full border-2 border-rose-gold-deep"
                        />
                      ) : null}
                    </AnimatePresence>
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-charcoal/15"
                      style={{ backgroundColor: color.hex }}
                    >
                      <AnimatePresence initial={false}>
                        {selected ? (
                          <motion.span
                            key="colour-check"
                            initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.6 }}
                            transition={
                              reducedMotion
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 400, damping: 24 }
                            }
                            className="inline-flex"
                          >
                            <Check
                              className={cn(
                                'h-3 w-3',
                                isLightColor(color.hex) ? 'text-charcoal/70' : 'text-ivory'
                              )}
                              aria-hidden="true"
                            />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </motion.span>
                  <span className="sr-only">
                    {color.name}
                    {color.available ? '' : ', unavailable'}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </LayoutGroup>

      <LayoutGroup id={`${product.slug}-sizes`}>
        <fieldset>
          <legend className="eyebrow mb-md">Available sizes</legend>
          <div className="flex flex-wrap gap-sm">
            {product.sizes.map((size) => {
              const available = isSizeAvailableForColor(product, size.label, selectedColor?.name);
              const selected = selectedSize === size.label;
              return (
                <label
                  key={size.label}
                  className={cn(
                    'relative inline-flex',
                    available ? 'cursor-pointer' : 'cursor-not-allowed'
                  )}
                  title={available ? size.label : `${size.label} unavailable in selected colour`}
                >
                  <input
                    type="radio"
                    name={`${product.slug}-size`}
                    value={size.label}
                    checked={selected}
                    disabled={!available}
                    aria-disabled={!available}
                    onChange={() => onSizeChange(size.label)}
                    className="peer sr-only"
                  />
                  <motion.span
                    aria-hidden="true"
                    whileTap={reducedMotion || !available ? undefined : { scale: 0.95 }}
                    className={cn(
                      'relative inline-flex min-h-11 min-w-11 items-center justify-center border px-md text-sm transition-colors duration-fast peer-focus-visible:ring-2 peer-focus-visible:ring-rose-gold-deep peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
                      available
                        ? 'border-champagne text-charcoal hover:border-rose-gold-deep hover:text-rose-gold-deep'
                        : 'border-champagne/40 bg-champagne/10 text-silver/70'
                    )}
                  >
                    <AnimatePresence initial={false}>
                      {selected && available ? (
                        <motion.span
                          key="size-active"
                          layoutId={reducedMotion ? undefined : `${product.slug}-size-active`}
                          initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
                          transition={selectionTransition}
                          className="absolute inset-0 bg-charcoal"
                        />
                      ) : null}
                    </AnimatePresence>
                    <span
                      className={cn(
                        'relative z-10',
                        selected && available ? 'text-ivory' : '',
                        !available ? 'line-through decoration-silver/70' : ''
                      )}
                    >
                      {size.label}
                    </span>
                  </motion.span>
                  <span className="sr-only">
                    {size.label}
                    {available ? '' : ', unavailable'}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </LayoutGroup>

      <p aria-live="polite" className="text-sm leading-relaxed text-charcoal/75">
        <span className="font-medium text-charcoal">
          {selectedColor?.name ?? 'No colour selected'}
        </span>
        {' · '}
        <span className="font-medium text-charcoal">{selectedSize ?? 'No size selected'}</span>
        <span className="block text-xs text-charcoal/75">
          Your enquiry will include this selection and the product link.
        </span>
      </p>
    </div>
  );
}
