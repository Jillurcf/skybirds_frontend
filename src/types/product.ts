import type { CategorySlug } from '@/types/category';

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholderColor: string;
  view?: string;
  color?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  available: boolean;
}

export interface SizeOption {
  label: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  available: boolean;
}

export type SizeLabel = SizeOption['label'];

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariant {
  color: string;
  sizes: SizeLabel[];
  images?: ProductImage[];
}

export interface Product {
  slug: string;
  sku: string;
  name: string;
  category: CategorySlug;
  collection: string;
  shortDescription: string;
  description: string;
  material: string;
  fabric: string;
  fit: string;
  care: string[];
  images: ProductImage[];
  colors: ColorOption[];
  sizes: SizeOption[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
}
