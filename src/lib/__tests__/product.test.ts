import { describe, expect, it } from 'vitest';
import {
  getAvailableSizesForColor,
  getGalleryImagesForColor,
  isSizeAvailableForColor
} from '@/lib/product';
import { getProductBySlug } from '@/lib/repository';

describe('product variant helpers', () => {
  it('uses variant size availability when a colour is selected', async () => {
    const product = await getProductBySlug('the-atelier-shirt');

    expect(product).not.toBeNull();
    expect(getAvailableSizesForColor(product!, 'Charcoal')).toEqual(['M', 'L', 'XL']);
    expect(isSizeAvailableForColor(product!, 'S', 'Champagne')).toBe(true);
    expect(isSizeAvailableForColor(product!, 'L', 'Champagne')).toBe(false);
    expect(getAvailableSizesForColor(product!)).toEqual(['S', 'M', 'L', 'XL']);
  });

  it('returns variant images when provided and base images otherwise', async () => {
    const product = await getProductBySlug('the-atelier-shirt');

    expect(getGalleryImagesForColor(product!, 'Charcoal')).toHaveLength(3);
    expect(getGalleryImagesForColor(product!, 'Champagne')[0].placeholderColor).toBe('#D6AFA1');
    expect(getGalleryImagesForColor(product!)).toHaveLength(3);
  });
});
