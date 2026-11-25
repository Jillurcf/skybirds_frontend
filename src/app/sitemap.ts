import type { MetadataRoute } from 'next';
import { getCategories, getProducts } from '@/lib/repository';
import { absoluteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/manufacturing'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/contact'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/products'), lastModified, changeFrequency: 'weekly', priority: 0.9 }
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/products/${category.slug}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
