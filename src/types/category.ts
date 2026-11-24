export type CategorySlug =
  | 'shirts'
  | 't-shirts'
  | 'jeans'
  | 'trousers'
  | 'jackets'
  | 'polo-shirts'
  | 'other';

export interface Category {
  slug: CategorySlug;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  featured: boolean;
}
