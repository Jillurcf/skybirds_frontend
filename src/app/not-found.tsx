import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-xl py-3xl">
      <BrandLogo variant="full" width={200} priority />
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-md font-display text-5xl text-charcoal">This page is still being tailored.</h1>
        <p className="lede mt-md">The route you requested is not part of the foundation milestone yet.</p>
      </div>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </Container>
  );
}
