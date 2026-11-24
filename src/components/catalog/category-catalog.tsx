import { notFound } from 'next/navigation';
import { CatalogPageShell } from '@/components/catalog/catalog-page-shell';
import { getCategories, getCategoryBySlug, getProductsByCategory } from '@/lib/repository';
import type { CategorySlug } from '@/types/category';

export async function CategoryCatalog({ slug }: { slug: CategorySlug }) {
  const [category, products, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories()
  ]);

  if (!category) notFound();

  return (
    <CatalogPageShell
      eyebrow={category.subtitle}
      title={category.name}
      description={category.description}
      products={products}
      categories={categories}
      lockedCategory={slug}
      heroImage={category.image || undefined}
      heroImageAlt={`Illustrative ${category.name} collection`}
    />
  );
}
