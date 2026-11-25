import type { Metadata } from 'next';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StructuredData } from '@/components/seo/structured-data';
import { ogImagePath, siteConfig } from '@/config/site';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  alternates: { canonical: absoluteUrl('/') },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl('/'),
    images: [
      {
        url: absoluteUrl(ogImagePath),
        width: 1200,
        height: 630,
        alt: 'SKY BIRDS FASHION BD — premium menswear and garment manufacturing'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(ogImagePath)]
  },
  robots: {
    index: true,
    follow: true
  }
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  alternateName: siteConfig.title,
  url: absoluteUrl('/'),
  logo: absoluteUrl('/images/brand/sky-birds-icon.png'),
  image: absoluteUrl(ogImagePath),
  description: siteConfig.description
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.title,
  url: absoluteUrl('/'),
  inLanguage: 'en'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: '[data-hero-reveal],[data-hero-reveal] *{opacity:1!important;transform:none!important}' }} />
        </noscript>
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <PageWrapper>{children}</PageWrapper>
        <SiteFooter />
      </body>
    </html>
  );
}
