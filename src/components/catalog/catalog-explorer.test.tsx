import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/products' }));

import { CatalogExplorer } from '@/components/catalog/catalog-explorer';
import { getCategories, getProducts } from '@/lib/repository';

describe('catalog explorer', () => {
  beforeEach(() => window.history.replaceState(null, '', '/products'));

  it('renders the full sample catalogue in the initial markup', async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    render(<CatalogExplorer products={products} categories={categories} />);

    expect(screen.getByRole('heading', { name: 'Collection filters and results', level: 2 })).toBeInTheDocument();
    expect(document.querySelectorAll('a[href^="/products/"]').length).toBe(products.length);
    expect(screen.getByText(`${products.length} pieces`)).toBeInTheDocument();
  });

  it('writes sort state to the URL and updates the visible order', async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    render(<CatalogExplorer products={products} categories={categories} />);

    fireEvent.change(screen.getByLabelText('Sort products'), { target: { value: 'name-desc' } });

    await waitFor(() => expect(window.location.search).toContain('sort=name-desc'));
    const firstCard = document.querySelector('a[href^="/products/"]');
    expect(firstCard?.getAttribute('href')).toBe(`/products/${[...products].sort((a, b) => b.name.localeCompare(a.name))[0].slug}`);
  });

  it('keeps the locked category clear-filter action disabled until a user filter is applied', async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    render(
      <CatalogExplorer products={products} categories={categories} lockedCategory="shirts" />
    );

    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'M' }));
    await waitFor(() => expect(window.location.search).toContain('size=M'));
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeEnabled();
  });
});
