export interface SiteConfig {
  name: string;
  subtitle: string;
  title: string;
  description: string;
  url: string;
  locale: string;
}

const PLACEHOLDER_SITE_URL = 'https://skyybirds.example';

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return `https://${vercelUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;

  return PLACEHOLDER_SITE_URL;
}

export const siteConfig: SiteConfig = {
  name: 'SKY BIRDS',
  subtitle: 'FASHION BD',
  title: 'SKY BIRDS FASHION BD',
  description:
    'Premium menswear and garment manufacturing. Explore collections, craftsmanship and direct enquiries.',
  url: resolveSiteUrl(),
  locale: 'en_BD'
};

export const ogImagePath = '/images/brand/sky-birds-og.png';

export function isPlaceholderSiteUrl(): boolean {
  return !process.env.NEXT_PUBLIC_SITE_URL?.trim() && !process.env.VERCEL_URL?.trim();
}
