import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';

export const metadata: Metadata = {
  title: 'Shirts | SKY BIRDS',
  description: 'Explore sample SKY BIRDS shirts. Final photography and specifications are pending.'
};

export default function ShirtsPage() {
  return <CategoryCatalog slug="shirts" />;
}
