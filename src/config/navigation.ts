import type { NavItem } from '@/types/content';

export const primaryNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Shirts', href: '/products/shirts' },
  { label: 'T-Shirts', href: '/products/t-shirts' },
  { label: 'Jeans', href: '/products/jeans' },
  { label: 'Trousers', href: '/products/trousers' },
  { label: 'Jackets', href: '/products/jackets' },
  { label: 'Polo Shirts', href: '/products/polo-shirts' },
  { label: 'Other Apparel', href: '/products/other' },
  { label: 'About', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Contact', href: '/contact' }
];

export const productNavigation: NavItem[] = [
  { label: 'All products', href: '/products' },
  { label: 'Shirts', href: '/products/shirts' },
  { label: 'T-Shirts', href: '/products/t-shirts' },
  { label: 'Jeans', href: '/products/jeans' },
  { label: 'Trousers', href: '/products/trousers' },
  { label: 'Jackets', href: '/products/jackets' },
  { label: 'Polo Shirts', href: '/products/polo-shirts' },
  { label: 'Other Apparel', href: '/products/other' }
];

export const desktopPrimaryNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shirts', href: '/products/shirts' },
  { label: 'T-Shirts', href: '/products/t-shirts' },
  { label: 'Jeans', href: '/products/jeans' },
  { label: 'Trousers', href: '/products/trousers' },
  { label: 'Jackets', href: '/products/jackets' },
  { label: 'About', href: '/about' },
  { label: 'Manufacturing', href: '/manufacturing' }
];

export const footerNavigation: NavItem[] = primaryNavigation;
