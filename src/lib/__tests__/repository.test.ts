import { describe, expect, it } from 'vitest';
import {
  getCategories,
  getCategoryBySlug,
  getHomeContent,
  getProductBySlug,
  getProducts,
  getProductsByCategory,
  getRelatedProducts
} from '@/lib/repository';

describe('getHomeContent', () => {
  it('returns the cinematic hero copy and CTAs', async () => {
    const { hero } = await getHomeContent();

    expect(hero.headlineLines).toEqual(['CRAFTING STYLE.', 'DEFINING IDENTITY.']);
    expect(hero.description).toBe(
      "Premium men's fashion. Crafted with precision, designed for distinction."
    );
    expect(hero.primaryCta).toEqual({ label: 'Explore Collection', href: '#collections' });
    expect(hero.secondaryCta).toEqual({ label: 'Discover Our Craft', href: '#craftsmanship' });
    expect(hero.image.src).toBe('/images/editorial/hero-fashion.webp');
  });

  it('provides every homepage section without invented figures', async () => {
    const content = await getHomeContent();
    const serialised = JSON.stringify(content);

    expect(content.collections.items.map((item) => item.category)).toEqual([
      'shirts',
      't-shirts',
      'jeans',
      'trousers',
      'jackets'
    ]);
    expect(content.signature.panels).toHaveLength(4);
    expect(content.manufacturing.steps).toHaveLength(4);
    expect(content.craftsmanship.pillars).toHaveLength(3);
    expect(content.arrivals.placeholders).toHaveLength(3);
    expect(content.arrivals.images).toHaveLength(3);
    expect(content.signature.panels.every((panel) => panel.image.startsWith('/images/editorial/'))).toBe(true);
    expect(content.collections.items.every((item) => item.image?.src.startsWith('/images/categories/'))).toBe(true);
    expect(content.manufacturing.image?.src).toBe('/images/editorial/process-03.webp');
    expect(content.craftsmanship.image).toBe('/images/editorial/craftsmanship-detail.webp');
    expect(serialised).not.toMatch(/\b\d{2,}%|\b\d+\+|\bcertified\b/i);
  });
});

describe('catalog repository', () => {
  it('returns the sample categories and products', async () => {
    const [categories, products] = await Promise.all([getCategories(), getProducts()]);
    expect(categories).toHaveLength(7);
    expect(products).toHaveLength(14);
    expect(
      products.every(
        (product) =>
          product.sku &&
          product.material &&
          product.images.length > 1 &&
          product.images.every((image) => image.src.startsWith('/images/products/')) &&
          product.specifications.length > 0 &&
          product.variants.length > 0
      )
    ).toBe(true);
    expect(categories.every((category) => category.image.startsWith('/images/categories/'))).toBe(true);
  });

  it('looks up products and categories by slug', async () => {
    const product = await getProductBySlug('the-atelier-shirt');
    const category = await getCategoryBySlug('shirts');
    expect(product?.name).toBe('The Atelier Shirt');
    expect(category?.name).toBe("Men's Shirts");
    expect(await getProductBySlug('missing-product')).toBeNull();
    expect(await getCategoryBySlug('shirts')).not.toBeNull();
  });

  it('scopes products by category and excludes the current product from related items', async () => {
    const shirts = await getProductsByCategory('shirts');
    const related = await getRelatedProducts('the-atelier-shirt', 3);
    expect(shirts.length).toBeGreaterThan(0);
    expect(shirts.every((product) => product.category === 'shirts')).toBe(true);
    expect(related.length).toBeGreaterThan(0);
    expect(
      related.every(
        (product) => product.slug !== 'the-atelier-shirt' && product.category === 'shirts'
      )
    ).toBe(true);
  });
});
