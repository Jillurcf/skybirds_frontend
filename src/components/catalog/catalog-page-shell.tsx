import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CatalogExplorer } from '@/components/catalog/catalog-explorer';
import { ImageContainer } from '@/components/ui/image-container';
import { Section } from '@/components/ui/section';
import type { Category, CategorySlug } from '@/types/category';
import type { Product } from '@/types/product';

interface CatalogPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  categories: Category[];
  lockedCategory?: CategorySlug;
  heroImage?: string;
  heroImageAlt?: string;
}

export function CatalogPageShell({
  eyebrow,
  title,
  description,
  products,
  categories,
  lockedCategory,
  heroImage,
  heroImageAlt
}: CatalogPageShellProps) {
  return (
    <Section spacing="compact" className="pt-xl md:pt-3xl">
      {lockedCategory ? (
        <Link
          href="/products"
          className="mb-lg inline-flex min-h-11 items-center gap-sm text-xs uppercase tracking-editorial text-charcoal/75 transition-colors duration-fast hover:text-rose-gold-deep"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All products
        </Link>
      ) : null}

      {heroImage ? (
        <ImageContainer
          src={heroImage}
          alt={heroImageAlt ?? ''}
          aspect="wide"
          placeholderLabel="Illustrative collection image"
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="mb-xl border border-champagne"
        />
      ) : null}

      <div className="mb-2xl max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-md font-display text-section font-normal leading-tight text-charcoal">{title}</h1>
        <p className="lede mt-md">{description}</p>
      </div>

      <CatalogExplorer products={products} categories={categories} lockedCategory={lockedCategory} />
    </Section>
  );
}
