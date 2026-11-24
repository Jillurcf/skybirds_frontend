import type { CatalogColorOption, CatalogFilters, CatalogFilterOptions, CatalogSort, SizeLabel } from '@/types/catalog';
import type { Category, CategorySlug } from '@/types/category';
import type { Product } from '@/types/product';

const sortValues: CatalogSort[] = ['featured', 'name-asc', 'name-desc', 'sku-asc'];
const sizeValues: SizeLabel[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const defaultCatalogFilters: CatalogFilters = {
  search: '',
  category: 'all',
  sizes: [],
  colors: [],
  sort: 'featured'
};

export function getCatalogFilterOptions(products: Product[], categories: Category[]): CatalogFilterOptions {
  const colorMap = new Map<string, CatalogColorOption>();

  for (const product of products) {
    for (const color of product.colors) {
      if (color.available && !colorMap.has(color.name)) {
        colorMap.set(color.name, { name: color.name, hex: color.hex });
      }
    }
  }

  return {
    categories,
    sizes: sizeValues.filter((size) => products.some((product) => product.sizes.some((option) => option.available && option.label === size))),
    colors: Array.from(colorMap.values())
  };
}

export function parseCatalogFilters(
  params: URLSearchParams,
  options: CatalogFilterOptions,
  lockedCategory?: CategorySlug
): CatalogFilters {
  const categoryParam = params.get('category');
  const validCategories = options.categories.map((category) => category.slug);
  const category =
    lockedCategory ??
    (categoryParam && (categoryParam === 'all' || validCategories.includes(categoryParam as CategorySlug))
      ? (categoryParam as CategorySlug | 'all')
      : 'all');

  const sizes = (params.get('size') ?? '')
    .split(',')
    .map((value) => value.trim() as SizeLabel)
    .filter((size) => options.sizes.includes(size));

  const colors = (params.get('color') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter((value) => options.colors.some((color) => color.name === value));

  const sortParam = params.get('sort') as CatalogSort | null;
  const sort = sortParam && sortValues.includes(sortParam) ? sortParam : 'featured';

  return {
    search: (params.get('q') ?? '').trim(),
    category,
    sizes: Array.from(new Set(sizes)),
    colors: Array.from(new Set(colors)),
    sort
  };
}

export function buildCatalogQuery(filters: CatalogFilters, lockedCategory?: CategorySlug): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.search) params.set('q', filters.search);
  if (!lockedCategory && filters.category !== 'all') params.set('category', filters.category);
  if (filters.sizes.length > 0) params.set('size', filters.sizes.join(','));
  if (filters.colors.length > 0) params.set('color', filters.colors.join(','));
  if (filters.sort !== 'featured') params.set('sort', filters.sort);

  params.sort();
  return params;
}

export function filterAndSortProducts(products: Product[], filters: CatalogFilters): Product[] {
  const query = filters.search.toLowerCase();
  const matches = products.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;

    if (query) {
      const haystack = [product.name, product.sku, product.collection, product.shortDescription]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (
      filters.sizes.length > 0 &&
      !product.sizes.some((size) => size.available && filters.sizes.includes(size.label))
    ) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !product.colors.some((color) => color.available && filters.colors.includes(color.name))
    ) {
      return false;
    }

    return true;
  });

  return matches.sort((a, b) => {
    switch (filters.sort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'sku-asc':
        return a.sku.localeCompare(b.sku);
      default:
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
    }
  });
}

export function hasActiveCatalogFilters(filters: CatalogFilters): boolean {
  return (
    filters.search.length > 0 ||
    filters.category !== 'all' ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.sort !== 'featured'
  );
}
