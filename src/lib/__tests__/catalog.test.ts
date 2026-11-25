import { describe, expect, it } from 'vitest';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import {
  buildCatalogQuery,
  defaultCatalogFilters,
  filterAndSortProducts,
  getCatalogFilterOptions,
  hasActiveCatalogFilters,
  parseCatalogFilters
} from '@/lib/catalog';

const options = getCatalogFilterOptions(products, categories);

describe('catalog filters', () => {
  it('filters by category', () => {
    const result = filterAndSortProducts(products, { ...defaultCatalogFilters, category: 'shirts' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.category === 'shirts')).toBe(true);
  });

  it('filters by available size', () => {
    const result = filterAndSortProducts(products, { ...defaultCatalogFilters, sizes: ['XXL'] });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.sizes.some((size) => size.label === 'XXL' && size.available))).toBe(true);
  });

  it('filters by available colour', () => {
    const result = filterAndSortProducts(products, { ...defaultCatalogFilters, colors: ['Champagne'] });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((product) => product.colors.some((color) => color.name === 'Champagne' && color.available))).toBe(true);
  });

  it('combines category, size and colour filters', () => {
    const result = filterAndSortProducts(products, {
      ...defaultCatalogFilters,
      category: 'shirts',
      sizes: ['M'],
      colors: ['Ivory']
    });
    expect(result.every((product) => product.category === 'shirts')).toBe(true);
    expect(result.every((product) => product.sizes.some((size) => size.label === 'M' && size.available))).toBe(true);
    expect(result.every((product) => product.colors.some((color) => color.name === 'Ivory' && color.available))).toBe(true);
  });

  it('searches name, SKU, collection and short description case-insensitively', () => {
    expect(filterAndSortProducts(products, { ...defaultCatalogFilters, search: 'ATELIER' }).map((product) => product.slug)).toContain('the-atelier-shirt');
    expect(filterAndSortProducts(products, { ...defaultCatalogFilters, search: 'sb-sh-001' }).map((product) => product.slug)).toEqual(['the-atelier-shirt']);
    expect(filterAndSortProducts(products, { ...defaultCatalogFilters, search: 'atelier line' }).map((product) => product.slug)).toContain('the-atelier-shirt');
    expect(filterAndSortProducts(products, { ...defaultCatalogFilters, search: 'foundational' }).map((product) => product.slug)).toContain('the-essential-crew');
  });

  it('returns an empty list when nothing matches', () => {
    expect(filterAndSortProducts(products, { ...defaultCatalogFilters, search: 'no-such-garment' })).toEqual([]);
  });
});

describe('catalog sorting', () => {
  it('sorts featured first by default', () => {
    const result = filterAndSortProducts(products, defaultCatalogFilters);
    expect(result[0].featured).toBe(true);
    expect(result.findIndex((product) => !product.featured)).toBeGreaterThanOrEqual(0);
  });

  it('sorts by name ascending and descending', () => {
    const ascending = filterAndSortProducts(products, { ...defaultCatalogFilters, sort: 'name-asc' }).map((product) => product.name);
    const descending = filterAndSortProducts(products, { ...defaultCatalogFilters, sort: 'name-desc' }).map((product) => product.name);
    expect(ascending).toEqual([...ascending].sort((a, b) => a.localeCompare(b)));
    expect(descending).toEqual([...ascending].reverse());
  });

  it('sorts by SKU', () => {
    const result = filterAndSortProducts(products, { ...defaultCatalogFilters, sort: 'sku-asc' }).map((product) => product.sku);
    expect(result).toEqual([...result].sort((a, b) => a.localeCompare(b)));
  });
});

describe('catalog URL state', () => {
  it('parses valid filters and ignores invalid values', () => {
    const params = new URLSearchParams(
      'q=%20shirt%20&category=bogus&size=S,XXS&color=Ivory,Nope&sort=bogus'
    );
    expect(parseCatalogFilters(params, options)).toEqual({
      search: 'shirt',
      category: 'all',
      sizes: ['S'],
      colors: ['Ivory'],
      sort: 'featured'
    });
  });

  it('locks the category on category routes', () => {
    const params = new URLSearchParams('category=t-shirts');
    expect(parseCatalogFilters(params, options, 'shirts').category).toBe('shirts');
    expect(buildCatalogQuery(parseCatalogFilters(params, options, 'shirts'), 'shirts').has('category')).toBe(false);
  });

  it('builds a query without default values', () => {
    expect(buildCatalogQuery(defaultCatalogFilters).toString()).toBe('');
    const query = buildCatalogQuery({
      search: 'linen',
      category: 'shirts',
      sizes: ['S', 'M'],
      colors: ['Ivory'],
      sort: 'name-asc'
    });
    expect(query.get('q')).toBe('linen');
    expect(query.get('category')).toBe('shirts');
    expect(query.get('size')).toBe('S,M');
    expect(query.get('color')).toBe('Ivory');
    expect(query.get('sort')).toBe('name-asc');
  });
});

describe('catalog options', () => {
  it('exposes every category and only available sizes and colours', () => {
    expect(options.categories).toHaveLength(7);
    expect(options.sizes).toEqual(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
    expect(options.colors.length).toBeGreaterThan(0);
    expect(new Set(options.colors.map((color) => color.name)).size).toBe(options.colors.length);
    expect(options.colors.every((color) => /^#[0-9A-Fa-f]{6}$/.test(color.hex))).toBe(true);
  });

  it('reports active filters', () => {
    expect(hasActiveCatalogFilters(defaultCatalogFilters)).toBe(false);
    expect(hasActiveCatalogFilters({ ...defaultCatalogFilters, search: 'shirt' })).toBe(true);
    expect(hasActiveCatalogFilters({ ...defaultCatalogFilters, sizes: ['M'] })).toBe(true);
    expect(hasActiveCatalogFilters({ ...defaultCatalogFilters, sort: 'sku-asc' })).toBe(true);
  });

  it('does not treat a locked category as an active user filter', () => {
    const filters = parseCatalogFilters(new URLSearchParams(), options, 'shirts');
    expect(hasActiveCatalogFilters(filters, 'shirts')).toBe(false);
    expect(hasActiveCatalogFilters({ ...filters, sizes: ['M'] }, 'shirts')).toBe(true);
  });

  it('respects size availability for the selected colour variant', () => {
    const result = filterAndSortProducts(products, {
      ...defaultCatalogFilters,
      colors: ['Charcoal'],
      sizes: ['S']
    });
    expect(result.map((product) => product.slug)).not.toContain('the-atelier-shirt');
  });
});
