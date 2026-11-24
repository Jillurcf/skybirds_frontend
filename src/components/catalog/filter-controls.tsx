'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CategorySlug } from '@/types/category';
import type { CatalogFilters, CatalogFilterOptions, SizeLabel } from '@/types/catalog';

interface FilterControlsProps {
  options: CatalogFilterOptions;
  filters: CatalogFilters;
  lockedCategory?: CategorySlug;
  hasActiveFilters: boolean;
  onCategoryChange: (category: CategorySlug | 'all') => void;
  onSizeToggle: (size: SizeLabel) => void;
  onColorToggle: (color: string) => void;
  onClear: () => void;
}

export function FilterControls({
  options,
  filters,
  lockedCategory,
  hasActiveFilters,
  onCategoryChange,
  onSizeToggle,
  onColorToggle,
  onClear
}: FilterControlsProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const categories = [{ slug: 'all' as const, name: 'All' }, ...options.categories];

  function moveCategoryFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;

    const offset = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
    event.preventDefault();
    const nextIndex = (index + offset + categories.length) % categories.length;
    const next = categories[nextIndex];
    onCategoryChange(next.slug === 'all' ? 'all' : next.slug);
    const buttons = event.currentTarget.parentElement?.querySelectorAll('button');
    buttons?.[nextIndex]?.focus();
  }

  return (
    <div className="flex flex-col gap-xl">
      <fieldset>
        <legend className="eyebrow mb-md">Category</legend>
        {lockedCategory ? (
          <div className="border border-champagne bg-canvas px-md py-sm text-sm text-charcoal">
            {options.categories.find((category) => category.slug === lockedCategory)?.name ?? lockedCategory}
          </div>
        ) : (
          <div role="radiogroup" aria-label="Category" className="flex flex-wrap gap-sm">
            {categories.map((category, index) => (
              <button
                key={category.slug}
                type="button"
                role="radio"
                aria-checked={filters.category === category.slug}
                tabIndex={filters.category === category.slug ? 0 : -1}
                onClick={() => onCategoryChange(category.slug === 'all' ? 'all' : category.slug)}
                onKeyDown={(event) => moveCategoryFocus(event, index)}
                className={cn(
                  'min-h-11 border px-md text-sm transition-colors duration-fast ease-out-soft hover:border-rose-gold-deep hover:text-rose-gold-deep',
                  filters.category === category.slug
                    ? 'border-charcoal bg-charcoal text-ivory'
                    : 'border-champagne text-charcoal'
                )}
              >
                {category.name.replace("Men's ", '')}
              </button>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-md">Size</legend>
        <div className="flex flex-wrap gap-sm">
          {options.sizes.map((size) => {
            const selected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => onSizeToggle(size)}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center border px-md text-sm transition-colors duration-fast ease-out-soft hover:border-rose-gold-deep hover:text-rose-gold-deep',
                  selected ? 'border-rose-gold-deep bg-rose-gold/10 text-charcoal' : 'border-champagne text-charcoal/75'
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-md">Colour</legend>
        <div className="flex flex-wrap gap-sm">
          {options.colors.map((color) => {
            const selected = filters.colors.includes(color.name);
            return (
              <motion.button
                key={color.name}
                type="button"
                aria-label={color.name}
                aria-pressed={selected}
                onClick={() => onColorToggle(color.name)}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 transition-colors duration-fast',
                  selected ? 'border-rose-gold-deep' : 'border-transparent hover:border-champagne'
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full border border-charcoal/15"
                  style={{ backgroundColor: color.hex }}
                />
              </motion.button>
            );
          })}
        </div>
      </fieldset>

      <Button
        type="button"
        variant="outline"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="w-full"
      >
        Clear filters
      </Button>
    </div>
  );
}
