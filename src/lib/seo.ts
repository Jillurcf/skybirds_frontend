import type { Metadata } from 'next';
import { ogImagePath, siteConfig } from '@/config/site';

interface SeoImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: SeoImage;
  type?: 'website' | 'article';
}

const defaultImage: SeoImage = {
  url: ogImagePath,
  width: 1200,
  height: 630,
  alt: 'SKY BIRDS FASHION BD — premium menswear and garment manufacturing'
};

export function absoluteUrl(path: string): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  image = defaultImage,
  type = 'website'
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.url);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: image.width, height: image.height, alt: image.alt }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl]
    }
  };
}
