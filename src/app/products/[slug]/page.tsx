import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/product-detail';
import { siteConfig } from '@/config/site';
import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/repository';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product not found | SKY BIRDS' };
  }

  const path = `/products/${product.slug}`;
  const url = siteConfig.url ? `${siteConfig.url.replace(/\/$/, '')}${path}` : undefined;
  const image = product.images.find((item) => item.src);

  return {
    title: product.meta.title,
    description: product.meta.description,
    alternates: url ? { canonical: path } : undefined,
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: product.meta.title,
      description: product.meta.description,
      url,
      images: image
        ? [
            {
              url: image.src,
              width: image.width,
              height: image.height,
              alt: image.alt
            }
          ]
        : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: product.meta.title,
      description: product.meta.description
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(slug);

  return <ProductDetail product={product} related={related} />;
}
