export interface SiteConfig {
  name: string;
  subtitle: string;
  title: string;
  description: string;
  url: string;
  locale: string;
}

export const siteConfig: SiteConfig = {
  name: 'SKY BIRDS',
  subtitle: 'FASHION BD',
  title: 'SKY BIRDS FASHION BD',
  description:
    'Premium menswear and garment manufacturing. Explore collections, craftsmanship and direct enquiries.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  locale: 'en_BD'
};
