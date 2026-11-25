import type { Metadata } from 'next';
import { CategoryCatalog } from '@/components/catalog/category-catalog';
import { getCategoryMetadata } from '@/lib/page-metadata';

export function generateMetadata(): Promise<Metadata> {
  return getCategoryMetadata('shirts');
}

export default function ShirtsPage() {
  return <CategoryCatalog slug="shirts" />;
}
