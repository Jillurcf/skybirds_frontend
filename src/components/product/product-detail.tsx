import Link from 'next/link';
import { CatalogGrid } from '@/components/catalog/catalog-grid';
import { Reveal } from '@/components/motion/reveal';
import { ProductExperience } from '@/components/product/product-experience';
import { StructuredData } from '@/components/seo/structured-data';
import { Section } from '@/components/ui/section';
import { formatCategoryLabel } from '@/lib/format';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import type { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const productPath = `/products/${product.slug}`;
  const categoryLabel = formatCategoryLabel(product.category);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    category: categoryLabel,
    brand: { '@type': 'Brand', name: siteConfig.name },
    image: product.images.map((image) => absoluteUrl(image.src))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Products', item: absoluteUrl('/products') },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryLabel,
        item: absoluteUrl(`/products/${product.category}`)
      },
      { '@type': 'ListItem', position: 3, name: product.name, item: absoluteUrl(productPath) }
    ]
  };

  return (
    <Section spacing="compact" className="pt-xl md:pt-3xl">
      <StructuredData data={[productSchema, breadcrumbSchema]} />
      <nav
        aria-label="Breadcrumb"
        className="text-xs uppercase tracking-editorial text-charcoal/75"
      >
        <ol className="flex flex-wrap items-center gap-sm">
          <li>
            <Link href="/products" className="inline-flex min-h-11 items-center transition-colors hover:text-rose-gold-deep">
              Products
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/products/${product.category}`}
              className="inline-flex min-h-11 items-center transition-colors hover:text-rose-gold-deep"
            >
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-charcoal">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-xl">
        <ProductExperience product={product} />
      </div>

      {related.length > 0 ? (
        <Reveal className="mt-3xl border-t border-champagne pt-xl">
          <p className="eyebrow">Continue exploring</p>
          <h2 className="mt-md font-display text-3xl text-charcoal">
            More from {categoryLabel}
          </h2>
          <div className="mt-xl">
            <CatalogGrid products={related} />
          </div>
        </Reveal>
      ) : null}
    </Section>
  );
}
