import Link from 'next/link';
import { CatalogGrid } from '@/components/catalog/catalog-grid';
import { Reveal } from '@/components/motion/reveal';
import { ProductExperience } from '@/components/product/product-experience';
import { Section } from '@/components/ui/section';
import { formatCategoryLabel } from '@/lib/format';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  return (
    <Section spacing="compact" className="pt-xl md:pt-3xl">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-sm text-xs uppercase tracking-editorial text-charcoal/75"
      >
        <Link href="/products" className="inline-flex min-h-11 items-center transition-colors hover:text-rose-gold-deep">
          Products
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/products/${product.category}`}
          className="inline-flex min-h-11 items-center transition-colors hover:text-rose-gold-deep"
        >
          {formatCategoryLabel(product.category)}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-charcoal">
          {product.name}
        </span>
      </nav>

      <div className="mt-xl">
        <ProductExperience product={product} />
      </div>

      {related.length > 0 ? (
        <Reveal className="mt-3xl border-t border-champagne pt-xl">
          <p className="eyebrow">Continue exploring</p>
          <h2 className="mt-md font-display text-3xl text-charcoal">
            More from {formatCategoryLabel(product.category)}
          </h2>
          <div className="mt-xl">
            <CatalogGrid products={related} />
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
