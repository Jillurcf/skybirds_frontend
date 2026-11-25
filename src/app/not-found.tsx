import type { Metadata } from 'next';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: 'Page not found | SKY BIRDS',
    description: 'The page you requested could not be found on the SKY BIRDS website.',
    path: '/404'
  }),
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-xl py-3xl">
      <BrandLogo variant="full" width={200} priority />
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-md font-display text-5xl text-charcoal">This page has flown the nest.</h1>
        <p className="lede mt-md">
          The address you requested does not exist or has moved. Explore the collection instead.
        </p>
      </div>
      <div className="flex flex-wrap gap-md">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/products">Explore products</Link>
        </Button>
      </div>
    </Container>
  );
}
