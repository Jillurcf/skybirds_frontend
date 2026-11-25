import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { getCategoryBySlug } from '@/lib/repository';
import type { CategorySlug } from '@/types/category';

export async function getCategoryMetadata(slug: CategorySlug): Promise<Metadata> {
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return createPageMetadata({
      title: 'Collection not found | SKY BIRDS',
      description: 'The requested SKY BIRDS collection could not be found.',
      path: `/products/${slug}`
    });
  }

  return createPageMetadata({
    title: `${category.name} | SKY BIRDS`,
    description: `${category.description} Explore the SKY BIRDS sample catalogue.`,
    path: `/products/${slug}`,
    image: {
      url: category.image,
      width: 1200,
      height: 750,
      alt: `Illustrative ${category.name} collection`
    }
  });
}
