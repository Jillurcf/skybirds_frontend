import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';

export const metadata: Metadata = {
  title: 'Jeans | SKY BIRDS',
  description: 'Explore sample SKY BIRDS jeans. Final photography and specifications are pending.'
};

export default function JeansPage() {
  return <CategoryCatalog slug="jeans" />;
}
