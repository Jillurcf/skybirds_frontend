import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/product/product-detail';
import { getProductBySlug, getProducts, getRelatedProducts } from '@/lib/repository';
import { createPageMetadata } from '@/lib/seo';

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
    return {
      ...createPageMetadata({
        title: 'Product not found | SKY BIRDS',
        description: 'This SKY BIRDS product is not available.',
        path: `/products/${slug}`
      }),
      robots: { index: false, follow: false }
    };
  }

  const image = product.images.find((item) => item.src);

  return createPageMetadata({
    title: product.meta.title,
    description: product.meta.description,
    path: `/products/${product.slug}`,
    image: image
      ? {
          url: image.src,
          width: image.width,
          height: image.height,
          alt: image.alt
        }
      : undefined
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const related = await getRelatedProducts(slug);

  return <ProductDetail product={product} related={related} />;
}
