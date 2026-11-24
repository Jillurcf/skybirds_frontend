import type { Product, ProductImage, ProductVariant, SizeLabel } from '@/types/product';

export function getAvailableColors(product: Product) {
  return product.colors.filter((color) => color.available);
}

export function getVariantForColor(
  product: Product,
  colorName?: string
): ProductVariant | undefined {
  if (!colorName) return undefined;
  return product.variants.find((variant) => variant.color === colorName);
}

export function getAvailableSizesForColor(product: Product, colorName?: string): SizeLabel[] {
  const baseSizes = product.sizes.filter((size) => size.available).map((size) => size.label);
  const variant = getVariantForColor(product, colorName);

  return variant ? baseSizes.filter((size) => variant.sizes.includes(size)) : baseSizes;
}

export function isSizeAvailableForColor(
  product: Product,
  size: SizeLabel,
  colorName?: string
): boolean {
  return getAvailableSizesForColor(product, colorName).includes(size);
}

export function getGalleryImagesForColor(product: Product, colorName?: string): ProductImage[] {
  const variant = getVariantForColor(product, colorName);

  if (variant?.images?.length) {
    return variant.images;
  }

  if (product.images.every((image) => !image.color)) {
    return product.images;
  }

  if (!colorName) {
    return product.images;
  }

  const matchingImages = product.images.filter(
    (image) => !image.color || image.color === colorName
  );
  return matchingImages.length > 0 ? matchingImages : product.images;
}
