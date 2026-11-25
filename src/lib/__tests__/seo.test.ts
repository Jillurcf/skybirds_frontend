import { describe, expect, it } from 'vitest';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';
import { getCategories, getProducts } from '@/lib/repository';
import { absoluteUrl, createPageMetadata } from '@/lib/seo';

describe('page metadata', () => {
  it('sets absolute titles, canonical URLs and social cards', () => {
    const metadata = createPageMetadata({
      title: 'Collections | SKY BIRDS',
      description: 'Sample catalogue',
      path: '/products',
      image: {
        url: '/images/brand/sky-birds-og.png',
        width: 1200,
        height: 630,
        alt: 'Brand card'
      }
    });

    expect(metadata.title).toEqual({ absolute: 'Collections | SKY BIRDS' });
    expect(metadata.alternates?.canonical).toBe(absoluteUrl('/products'));
    expect(metadata.openGraph).toMatchObject({
      url: absoluteUrl('/products'),
      siteName: 'SKY BIRDS',
      images: [{ url: absoluteUrl('/images/brand/sky-birds-og.png'), width: 1200 }]
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      images: [absoluteUrl('/images/brand/sky-birds-og.png')]
    });
  });

  it('uses the branded Open Graph image by default', () => {
    const metadata = createPageMetadata({ title: 'Home', description: 'Home', path: '/' });
    const images = metadata.openGraph?.images;
    expect(Array.isArray(images) ? images[0] : undefined).toMatchObject({
      url: absoluteUrl('/images/brand/sky-birds-og.png'),
      width: 1200,
      height: 630
    });
  });
});

describe('sitemap and robots', () => {
  it('includes every implemented static, category and product route', async () => {
    const [products, categories] = await Promise.all([getProducts(), getCategories()]);
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl('/'));
    expect(urls).toContain(absoluteUrl('/products'));
    expect(urls).toContain(absoluteUrl('/about'));
    expect(urls).toContain(absoluteUrl('/manufacturing'));
    expect(urls).toContain(absoluteUrl('/contact'));
    expect(urls).toContain(absoluteUrl('/products/polo-shirts'));
    expect(urls).toContain(absoluteUrl('/products/other'));
    expect(urls).toHaveLength(5 + categories.length + products.length);
  });

  it('advertises the sitemap and allows public pages', () => {
    expect(robots()).toMatchObject({
      rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
      sitemap: absoluteUrl('/sitemap.xml'),
      host: absoluteUrl('/')
    });
  });
});
