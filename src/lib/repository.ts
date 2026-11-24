import { aboutContent } from '@/data/about';
import { categories } from '@/data/categories';
import { contactPageContent } from '@/data/contact-page';
import { homeContent } from '@/data/home';
import { manufacturingContent } from '@/data/manufacturing';
import { products } from '@/data/products';
import type { Category, CategorySlug } from '@/types/category';
import type { HomeContent } from '@/types/home';
import type { AboutPageContent, ContactPageContent, ManufacturingPageContent } from '@/types/pages';
import type { Product } from '@/types/product';

export async function getHomeContent(): Promise<HomeContent> {
  return homeContent;
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return products.filter((product) => product.featured).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: CategorySlug): Promise<Product[]> {
  return products.filter((product) => product.category === slug);
}

export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const product = await getProductBySlug(slug);
  if (!product) return [];

  return products
    .filter((candidate) => candidate.slug !== slug && candidate.category === product.category)
    .slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: CategorySlug): Promise<Category | null> {
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getAboutContent(): Promise<AboutPageContent> {
  return aboutContent;
}

export async function getManufacturingContent(): Promise<ManufacturingPageContent> {
  return manufacturingContent;
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  return contactPageContent;
}
