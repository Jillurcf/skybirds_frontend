import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';

export const metadata: Metadata = {
  title: 'Trousers | SKY BIRDS',
  description: 'Explore sample SKY BIRDS trousers. Final photography and specifications are pending.'
};

export default function TrousersPage() {
  return <CategoryCatalog slug="trousers" />;
}
