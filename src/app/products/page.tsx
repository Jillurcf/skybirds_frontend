import type { Metadata } from 'next';
import { CatalogPageShell } from '@/components/catalog/catalog-page-shell';
import { getCategories, getProducts } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Collections | SKY BIRDS',
  description: 'Explore the SKY BIRDS sample menswear catalogue. Final photography and product details are pending.'
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <CatalogPageShell
      eyebrow="The catalogue"
      title="The collection"
      description="A considered study in proportion, fabric and finish. Use the filters to explore the sample catalogue by category, size and colour."
      products={products}
      categories={categories}
    />
  );
}
