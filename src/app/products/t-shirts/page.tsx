import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';

export const metadata: Metadata = {
  title: 'T-Shirts | SKY BIRDS',
  description: 'Explore sample SKY BIRDS T-shirts. Final photography and specifications are pending.'
};

export default function TShirtsPage() {
  return <CategoryCatalog slug="t-shirts" />;
}
