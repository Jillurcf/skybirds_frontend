# 09 — Data Model

## Philosophy

The site is static, but data shapes should be production-like so a future CMS/API can slot in without UI rewrites.

## Category

```ts
export type CategorySlug =
  | 'shirts'
  | 't-shirts'
  | 'jeans'
  | 'trousers'
  | 'jackets'
  | 'polo-shirts'
  | 'other';

export interface Category {
  slug: CategorySlug;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  featured: boolean;
}
```

## Editorial image

```ts
export interface EditorialImage {
  src: string;
  alt: string;
  placeholderColor?: string;
}
```

The homepage hero, featured collections, arrivals, manufacturing study, signature panels and craftsmanship sections use `EditorialImage` through `getHomeContent()`. Signature and craftsmanship sections retain their explicit placeholder labels as fallbacks.

## Color option

```ts
export interface ColorOption {
  name: string;
  hex: string;
  available: boolean;
}
```

## Size option

```ts
export interface SizeOption {
  label: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  available: boolean;
}
```

## Product

```ts
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
```

## Product image

```ts
export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholderColor: string;
  view?: string;
  color?: string;
}
```

`view` labels gallery frames such as front, fabric and silhouette. `color` optionally scopes an image to a colour variant.

## Product variant and specification

```ts
export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariant {
  color: string;
  sizes: SizeLabel[];
  images?: ProductImage[];
}
```

A variant may narrow the base size list and may replace the gallery images. When no variant entry exists, the product's base sizes and images are used.

## Catalog query state

```ts
export type SizeLabel = Product['sizes'][number]['label'];
export type CatalogSort = 'featured' | 'name-asc' | 'name-desc' | 'sku-asc';

export interface CatalogFilters {
  search: string;
  category: CategorySlug | 'all';
  sizes: SizeLabel[];
  colors: string[];
  sort: CatalogSort;
}
```

Query parameters are `q`, `category`, `size` (comma-separated), `color` (comma-separated) and `sort`. Invalid values fall back to defaults. Category routes lock `category` and omit it from the URL.

## Contact config

```ts
export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: 'phone' | 'whatsapp' | 'mail' | 'map-pin' | 'clock';
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address?: string;
  hours?: string;
  channels: ContactChannel[];
}
```

## Manufacturing content

```ts
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface Capability {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}
```

## Example product (shape reference)

```ts
{
  slug: 'the-atelier-shirt',
  sku: 'SB-SH-001',
  name: 'The Atelier Shirt',
  category: 'shirts',
  collection: 'Atelier Line',
  shortDescription: 'A refined everyday shirt with a clean drape.',
  description: 'Cut for a relaxed but precise silhouette...',
  material: 'Cotton',
  fabric: '100% combed cotton',
  fit: 'Regular',
  care: ['Machine wash cold', 'Warm iron', 'Do not bleach'],
  images: [
    {
      src: '/images/products/shirts/atelier-shirt-01.webp',
      alt: 'Front view of The Atelier Shirt',
      width: 1200,
      height: 1500,
      placeholderColor: '#D9C6BB',
      view: 'Front'
    }
  ],
  colors: [
    { name: 'Ivory', hex: '#F5F1ED', available: true },
    { name: 'Charcoal', hex: '#242323', available: true }
  ],
  sizes: [
    { label: 'S', available: true },
    { label: 'M', available: true },
    { label: 'L', available: false }
  ],
  specifications: [
    { label: 'Material', value: 'Cotton' },
    { label: 'Fabric', value: '100% combed cotton' },
    { label: 'Fit', value: 'Regular' }
  ],
  variants: [
    { color: 'Ivory', sizes: ['S', 'M'] },
    { color: 'Charcoal', sizes: ['M'] }
  ],
  featured: true,
  meta: {
    title: 'The Atelier Shirt | SKY BIRDS',
    description: 'A refined men’s shirt from the SKY BIRDS Atelier Line.'
  }
}
```

## Validation rules

- `slug` must be unique and URL-safe.
- `sku` must be unique and searchable.
- Every `category` must exist in category data.
- Every product must have at least one image and one specification row.
- At least one color and one size should be available.
- Variant colors must match an available product colour.
- Variant sizes must be a subset of the product's available sizes.
- `hex` values must be valid 6-digit hex.
- Image paths must be absolute from `/public`.
- Placeholder metrics must be marked in content, not presented as verified.

## Repository API

```ts
getProducts(): Promise<Product[]>
getFeaturedProducts(limit?: number): Promise<Product[]>
getProductBySlug(slug: string): Promise<Product | null>
getProductsByCategory(slug: CategorySlug): Promise<Product[]>
getRelatedProducts(slug: string, limit?: number): Promise<Product[]>
getCategories(): Promise<Category[]>
getCategoryBySlug(slug: CategorySlug): Promise<Category | null>
```

These functions are local now; they may become API calls later.

Product detail helpers in `lib/product.ts` resolve variant state without importing raw data:

```ts
getVariantForColor(product, colorName?)
getAvailableSizesForColor(product, colorName?)
isSizeAvailableForColor(product, size, colorName?)
getGalleryImagesForColor(product, colorName?)
```

Enquiry helpers in `lib/product-enquiry.ts` compose product context for native contact links:

```ts
buildProductEnquiryContext(product, selection)
buildProductEnquiryMessages(context)
```

## State that is intentionally not persisted

- Selected size.
- Selected color.
- Filter query (except URL).
- Motion preference (browser API only).
- Contact form content (no backend).
