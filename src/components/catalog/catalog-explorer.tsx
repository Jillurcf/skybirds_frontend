'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { CatalogGrid } from '@/components/catalog/catalog-grid';
import { FilterControls } from '@/components/catalog/filter-controls';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import {
  buildCatalogQuery,
  filterAndSortProducts,
  getCatalogFilterOptions,
  hasActiveCatalogFilters,
  parseCatalogFilters
} from '@/lib/catalog';
import type { CatalogFilters } from '@/types/catalog';
import type { Category, CategorySlug } from '@/types/category';
import type { CatalogSort, SizeLabel } from '@/types/catalog';
import type { Product } from '@/types/product';

interface CatalogExplorerProps {
  products: Product[];
  categories: Category[];
  lockedCategory?: CategorySlug;
}

const sortLabels: Record<CatalogSort, string> = {
  featured: 'Featured',
  'name-asc': 'Name A–Z',
  'name-desc': 'Name Z–A',
  'sku-asc': 'SKU A–Z'
};

export function CatalogExplorer({ products, categories, lockedCategory }: CatalogExplorerProps) {
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterOptions = useMemo(() => getCatalogFilterOptions(products, categories), [products, categories]);
  const defaultFilters = useMemo(
    () => parseCatalogFilters(new URLSearchParams(), filterOptions, lockedCategory),
    [filterOptions, lockedCategory]
  );
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);

  useEffect(() => {
    const syncFromUrl = () => {
      setFilters(
        parseCatalogFilters(new URLSearchParams(window.location.search), filterOptions, lockedCategory)
      );
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [filterOptions, lockedCategory]);

  const visibleProducts = useMemo(() => filterAndSortProducts(products, filters), [products, filters]);
  const activeFilters = hasActiveCatalogFilters(filters, lockedCategory);

  const writeParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const currentQuery = typeof window === 'undefined' ? '' : window.location.search;
      const params = new URLSearchParams(currentQuery);
      mutate(params);

      const nextFilters = parseCatalogFilters(params, filterOptions, lockedCategory);
      const query = buildCatalogQuery(nextFilters, lockedCategory);
      const queryString = query.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', url);
      }
      setFilters(nextFilters);
    },
    [pathname, filterOptions, lockedCategory]
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      writeParams((params) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
    },
    [writeParams]
  );

  useEffect(() => {
    if (searchRef.current && searchRef.current.value !== filters.search) {
      searchRef.current.value = filters.search;
    }
  }, [filters.search]);

  useEffect(() => {
    const input = searchRef.current;
    if (!input) return;

    const handleInput = () => {
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        setParam('q', input.value.trim() || null);
        debounceRef.current = null;
      }, 250);
    };

    input.addEventListener('input', handleInput);
    return () => {
      input.removeEventListener('input', handleInput);
      if (debounceRef.current !== null) window.clearTimeout(debounceRef.current);
    };
  }, [setParam]);

  const clearFilters = () => {
    if (searchRef.current) searchRef.current.value = '';
    writeParams((params) => {
      for (const key of ['q', 'category', 'size', 'color', 'sort']) params.delete(key);
    });
  };

  const toggleSize = (size: SizeLabel) => {
    const next = filters.sizes.includes(size)
      ? filters.sizes.filter((item) => item !== size)
      : [...filters.sizes, size];
    setParam('size', next.join(',') || null);
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((item) => item !== color)
      : [...filters.colors, color];
    setParam('color', next.join(',') || null);
  };

  const controls = (
    <FilterControls
      options={filterOptions}
      filters={filters}
      lockedCategory={lockedCategory}
      hasActiveFilters={activeFilters}
      onCategoryChange={(category) => setParam('category', category === 'all' ? null : category)}
      onSizeToggle={toggleSize}
      onColorToggle={toggleColor}
      onClear={clearFilters}
    />
  );

  return (
    <div className="flex flex-col gap-2xl lg:flex-row lg:items-start">
      <aside aria-label="Product filters" className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 border border-champagne bg-canvas p-lg">
          <p className="mb-lg font-display text-2xl text-charcoal">Refine</p>
          {controls}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <h2 className="sr-only">Collection filters and results</h2>
        <div className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <label htmlFor="catalog-search" className="sr-only">
              Search products
            </label>
            <Search aria-hidden="true" className="absolute left-md top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/75" />
            <input
              ref={searchRef}
              id="catalog-search"
              type="search"
              defaultValue={defaultFilters.search}
              placeholder="Search name, SKU or collection"
              className="min-h-11 w-full rounded-control border border-champagne bg-canvas pl-11 pr-md text-sm text-charcoal placeholder:text-charcoal/75 focus-visible:border-rose-gold-deep"
            />
          </div>

          <div className="flex flex-wrap items-center gap-md">
            <label htmlFor="catalog-sort" className="sr-only">
              Sort products
            </label>
            <select
              id="catalog-sort"
              value={filters.sort}
              onChange={(event) => setParam('sort', event.target.value === 'featured' ? null : event.target.value)}
              className="min-h-11 rounded-control border border-champagne bg-canvas px-md text-sm text-charcoal focus-visible:border-rose-gold-deep"
            >
              {(Object.keys(sortLabels) as CatalogSort[]).map((sort) => (
                <option key={sort} value={sort}>
                  {sortLabels[sort]}
                </option>
              ))}
            </select>

            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal aria-hidden="true" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent closeLabel="Close filters">
                <SheetHeader>
                  <SheetTitle>Refine the collection</SheetTitle>
                  <SheetDescription>Filter by category, size and colour.</SheetDescription>
                </SheetHeader>
                <div className="mt-xl overflow-y-auto pr-sm">{controls}</div>
                <SheetFooter>
                  <Button type="button" onClick={() => setDrawerOpen(false)}>
                    Show {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <p aria-live="polite" className="text-xs uppercase tracking-editorial text-charcoal/75">
              {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </div>

        <p className="mt-lg text-xs leading-relaxed text-charcoal/55">
          Sample catalogue: photography and final specifications are pending.
        </p>

        {visibleProducts.length > 0 ? (
          <CatalogGrid products={visibleProducts} />
        ) : (
          <div className="mt-lg border border-champagne bg-canvas p-2xl text-center">
            <p className="eyebrow">No matches</p>
            <h2 className="mt-md font-display text-3xl text-charcoal">Nothing in this edit.</h2>
            <p className="mx-auto mt-md max-w-md text-sm leading-relaxed text-charcoal/65">
              Try a different search or clear the filters to see the full sample catalogue.
            </p>
            <Button type="button" variant="outline" onClick={clearFilters} className="mt-lg">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
