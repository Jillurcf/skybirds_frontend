import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';
import { getCategoryMetadata } from '@/lib/page-metadata';

export function generateMetadata(): Promise<Metadata> {
  return getCategoryMetadata('t-shirts');
}

export default function TShirtsPage() {
  return <CategoryCatalog slug="t-shirts" />;
}
