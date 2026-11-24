import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';

export const metadata: Metadata = {
  title: 'Jackets | SKY BIRDS',
  description: 'Explore sample SKY BIRDS jackets. Final photography and specifications are pending.'
};

export default function JacketsPage() {
  return <CategoryCatalog slug="jackets" />;
}
