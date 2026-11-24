import type { Category } from '@/types/category';

export const categories: Category[] = [
  {
    slug: 'shirts',
    name: "Men's Shirts",
    subtitle: 'Considered shirting',
    description: 'Clean lines, measured details and an easy drape for everyday wear.',
    image: '/images/categories/shirts.webp',
    featured: true
  },
  {
    slug: 't-shirts',
    name: "Men's T-Shirts",
    subtitle: 'Elevated essentials',
    description: 'Simple forms shaped by fabric weight, handle and finish.',
    image: '/images/categories/t-shirts.webp',
    featured: true
  },
  {
    slug: 'jeans',
    name: "Men's Jeans",
    subtitle: 'Relaxed structure',
    description: 'Denim with a composed silhouette and restrained detail.',
    image: '/images/categories/jeans.webp',
    featured: true
  },
  {
    slug: 'trousers',
    name: "Men's Trousers",
    subtitle: 'Lines in balance',
    description: 'Tailored and utility forms with a considered fall from waist to hem.',
    image: '/images/categories/trousers.webp',
    featured: true
  },
  {
    slug: 'jackets',
    name: "Men's Jackets",
    subtitle: 'The outer layer',
    description: 'Structure and proportion designed to settle the whole look.',
    image: '/images/categories/jackets.webp',
    featured: true
  },
  {
    slug: 'polo-shirts',
    name: "Men's Polo Shirts",
    subtitle: 'Quietly refined',
    description: 'A familiar silhouette revisited through texture and finish.',
    image: '/images/categories/polo-shirts.webp',
    featured: false
  },
  {
    slug: 'other',
    name: 'Other Apparel',
    subtitle: 'Completing the wardrobe',
    description: 'Additional pieces that sit alongside the core collection families.',
    image: '/images/categories/other.webp',
    featured: false
  }
];
