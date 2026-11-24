import type { Category, CategorySlug } from '@/types/category';
import type { Product } from '@/types/product';

export type SizeLabel = Product['sizes'][number]['label'];

export type CatalogSort = 'featured' | 'name-asc' | 'name-desc' | 'sku-asc';

export interface CatalogColorOption {
  name: string;
  hex: string;
}

export interface CatalogFilterOptions {
  categories: Category[];
  sizes: SizeLabel[];
  colors: CatalogColorOption[];
}

export interface CatalogFilters {
  search: string;
  category: CategorySlug | 'all';
  sizes: SizeLabel[];
  colors: string[];
  sort: CatalogSort;
}
