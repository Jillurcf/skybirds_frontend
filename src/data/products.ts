import type { CategorySlug } from '@/types/category';
import type { SizeLabel } from '@/types/catalog';
import type {
  ColorOption,
  Product,
  ProductImage,
  ProductVariant,
  SizeOption
} from '@/types/product';

const allSizes: SizeLabel[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function makeSizes(available: SizeLabel[]): SizeOption[] {
  return allSizes.map((label) => ({ label, available: available.includes(label) }));
}

function makeColors(options: Array<[name: string, hex: string]>): ColorOption[] {
  return options.map(([name, hex]) => ({ name, hex, available: true }));
}

function makeImage(
  placeholderColor: string,
  alt: string,
  slug: string,
  category: CategorySlug,
  suffix = ''
): ProductImage[] {
  const baseAlt = alt.replace(', photography pending', '').replace(' study', '');
  const base = `/images/products/${category}/${slug}${suffix}`;

  return [
    { src: `${base}-01.webp`, alt: `${baseAlt} — illustrative front view`, width: 1200, height: 1500, placeholderColor, view: 'Front' },
    {
      src: `${base}-02.webp`,
      alt: `${baseAlt} — illustrative fabric detail`,
      width: 1200,
      height: 1500,
      placeholderColor,
      view: 'Fabric'
    },
    {
      src: `${base}-03.webp`,
      alt: `${baseAlt} — illustrative silhouette`,
      width: 1200,
      height: 1500,
      placeholderColor,
      view: 'Silhouette'
    }
  ];
}

type ProductInput = Omit<Product, 'meta' | 'specifications' | 'variants'> & {
  meta?: Product['meta'];
  specifications?: Product['specifications'];
  variants?: ProductVariant[];
};

function makeProduct(product: ProductInput): Product {
  const availableSizes = product.sizes.filter((size) => size.available).map((size) => size.label);
  const variants =
    product.variants ??
    product.colors
      .filter((color) => color.available)
      .map((color) => ({ color: color.name, sizes: availableSizes }));

  return {
    ...product,
    specifications: product.specifications ?? [
      { label: 'Material', value: product.material },
      { label: 'Fabric', value: product.fabric },
      { label: 'Fit', value: product.fit },
      { label: 'Collection', value: product.collection },
      { label: 'Care', value: product.care.join(' · ') }
    ],
    variants,
    meta: product.meta ?? {
      title: `${product.name} | SKY BIRDS`,
      description: `${product.name} — sample catalogue entry from the SKY BIRDS collection.`
    }
  };
}

export const products: Product[] = [
  makeProduct({
    slug: 'the-atelier-shirt',
    sku: 'SB-SH-001',
    name: 'The Atelier Shirt',
    category: 'shirts',
    collection: 'Atelier Line',
    shortDescription: 'A refined shirt with a clean, composed drape.',
    description:
      'A sample catalogue entry for a refined shirt designed around measured proportions, a quiet collar and an easy fall through the body.',
    material: 'Cotton',
    fabric: 'Cotton poplin (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Warm iron', 'Do not bleach'],
    images: makeImage('#D9C6BB', 'Front study of The Atelier Shirt, photography pending', 'the-atelier-shirt', 'shirts'),
    colors: makeColors([
      ['Ivory', '#F5F1ED'],
      ['Charcoal', '#242323'],
      ['Champagne', '#D9C6BB']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    variants: [
      { color: 'Ivory', sizes: ['S', 'M', 'L', 'XL'] },
      { color: 'Charcoal', sizes: ['M', 'L', 'XL'] },
      {
        color: 'Champagne',
        sizes: ['S', 'M'],
        images: makeImage('#D6AFA1', 'Champagne study of The Atelier Shirt, photography pending', 'the-atelier-shirt', 'shirts', '-champagne')
      }
    ],
    featured: true
  }),
  makeProduct({
    slug: 'the-studio-oxford',
    sku: 'SB-SH-002',
    name: 'The Studio Oxford',
    category: 'shirts',
    collection: 'Studio Line',
    shortDescription: 'A textured everyday shirt with relaxed structure.',
    description:
      'A sample catalogue entry for an Oxford shirt with a softened structure and a considered, lived-in finish.',
    material: 'Cotton',
    fabric: 'Oxford cotton (sample specification)',
    fit: 'Relaxed',
    care: ['Machine wash cold', 'Line dry', 'Warm iron'],
    images: makeImage('#C8B6A6', 'Front study of The Studio Oxford, photography pending', 'the-studio-oxford', 'shirts'),
    colors: makeColors([
      ['Sand', '#C8B6A6'],
      ['Ivory', '#F5F1ED']
    ]),
    sizes: makeSizes(['M', 'L', 'XL', 'XXL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-field-linen-shirt',
    sku: 'SB-SH-003',
    name: 'The Field Linen Shirt',
    category: 'shirts',
    collection: 'Weekend Line',
    shortDescription: 'An open, breathable shirt for warmer days.',
    description:
      'A sample catalogue entry for a linen shirt with a naturally relaxed hand feel and an understated open collar.',
    material: 'Linen blend',
    fabric: 'Linen blend (sample specification)',
    fit: 'Relaxed',
    care: ['Gentle wash cold', 'Line dry', 'Cool iron'],
    images: makeImage('#E4DCD2', 'Front study of The Field Linen Shirt, photography pending', 'the-field-linen-shirt', 'shirts'),
    colors: makeColors([
      ['Ecru', '#E4DCD2'],
      ['Olive', '#6B6F5E']
    ]),
    sizes: makeSizes(['S', 'M', 'L']),
    featured: true
  }),
  makeProduct({
    slug: 'the-essential-crew',
    sku: 'SB-TS-001',
    name: 'The Essential Crew',
    category: 't-shirts',
    collection: 'Everyday Line',
    shortDescription: 'The foundational crew neck, carefully proportioned.',
    description:
      'A sample catalogue entry for a crew neck built around a balanced neckline, straight shoulder and quiet finish.',
    material: 'Cotton',
    fabric: 'Combed cotton jersey (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Line dry', 'Do not tumble dry'],
    images: makeImage('#D9C6BB', 'Front study of The Essential Crew, photography pending', 'the-essential-crew', 't-shirts'),
    colors: makeColors([
      ['Ivory', '#F5F1ED'],
      ['Charcoal', '#242323'],
      ['Slate', '#8C8B89']
    ]),
    sizes: makeSizes(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
    variants: [
      { color: 'Ivory', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { color: 'Charcoal', sizes: ['S', 'M', 'L', 'XL'] },
      { color: 'Slate', sizes: ['M', 'L', 'XL', 'XXL'] }
    ],
    featured: true
  }),
  makeProduct({
    slug: 'the-heavyweight-tee',
    sku: 'SB-TS-002',
    name: 'The Heavyweight Tee',
    category: 't-shirts',
    collection: 'Studio Line',
    shortDescription: 'A substantial tee with a composed silhouette.',
    description:
      'A sample catalogue entry for a heavier jersey tee with a structured shoulder and a dense, even surface.',
    material: 'Cotton',
    fabric: 'Heavyweight cotton jersey (sample specification)',
    fit: 'Boxy',
    care: ['Machine wash cold', 'Line dry', 'Warm iron'],
    images: makeImage('#B8B1A6', 'Front study of The Heavyweight Tee, photography pending', 'the-heavyweight-tee', 't-shirts'),
    colors: makeColors([
      ['Stone', '#B8B1A6'],
      ['Charcoal', '#242323']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-straight-jean',
    sku: 'SB-JE-001',
    name: 'The Straight Jean',
    category: 'jeans',
    collection: 'Everyday Line',
    shortDescription: 'A straight leg with an undisturbed line.',
    description:
      'A sample catalogue entry for a straight jean with a clean front, consistent fall and restrained detailing.',
    material: 'Denim',
    fabric: 'Cotton denim (sample specification)',
    fit: 'Straight',
    care: ['Machine wash cold inside out', 'Line dry', 'Do not bleach'],
    images: makeImage('#3B4A6B', 'Front study of The Straight Jean, photography pending', 'the-straight-jean', 'jeans'),
    colors: makeColors([
      ['Indigo', '#3B4A6B'],
      ['Midnight', '#2F3437']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL', 'XXL']),
    featured: true
  }),
  makeProduct({
    slug: 'the-relaxed-jean',
    sku: 'SB-JE-002',
    name: 'The Relaxed Jean',
    category: 'jeans',
    collection: 'Weekend Line',
    shortDescription: 'A looser denim form with easy movement.',
    description:
      'A sample catalogue entry for a relaxed jean with a softer top block and a wider, unhurried leg.',
    material: 'Denim',
    fabric: 'Washed cotton denim (sample specification)',
    fit: 'Relaxed',
    care: ['Machine wash cold inside out', 'Line dry', 'Cool iron'],
    images: makeImage('#2F3437', 'Front study of The Relaxed Jean, photography pending', 'the-relaxed-jean', 'jeans'),
    colors: makeColors([
      ['Midnight', '#2F3437'],
      ['Stone', '#B8B1A6']
    ]),
    sizes: makeSizes(['M', 'L', 'XL', 'XXL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-tailored-trouser',
    sku: 'SB-TR-001',
    name: 'The Tailored Trouser',
    category: 'trousers',
    collection: 'Tailoring Line',
    shortDescription: 'A clean trouser with a precise fall.',
    description:
      'A sample catalogue entry for a tailored trouser shaped by a flat front, considered waistband and straight hem.',
    material: 'Wool blend',
    fabric: 'Wool blend (sample specification)',
    fit: 'Tailored',
    care: ['Dry clean only', 'Cool iron', 'Store on a hanger'],
    images: makeImage('#2F3437', 'Front study of The Tailored Trouser, photography pending', 'the-tailored-trouser', 'trousers'),
    colors: makeColors([
      ['Charcoal', '#242323'],
      ['Midnight', '#2F3437']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    variants: [
      { color: 'Charcoal', sizes: ['S', 'M', 'L', 'XL'] },
      { color: 'Midnight', sizes: ['M', 'L'] }
    ],
    featured: true
  }),
  makeProduct({
    slug: 'the-utility-trouser',
    sku: 'SB-TR-002',
    name: 'The Utility Trouser',
    category: 'trousers',
    collection: 'Utility Line',
    shortDescription: 'Practical detailing in a refined silhouette.',
    description:
      'A sample catalogue entry for a utility trouser with quiet pockets and a steady, straight leg.',
    material: 'Cotton',
    fabric: 'Cotton twill (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Line dry', 'Warm iron'],
    images: makeImage('#6B6F5E', 'Front study of The Utility Trouser, photography pending', 'the-utility-trouser', 'trousers'),
    colors: makeColors([
      ['Olive', '#6B6F5E'],
      ['Sand', '#C8B6A6']
    ]),
    sizes: makeSizes(['M', 'L', 'XL', 'XXL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-structured-blazer',
    sku: 'SB-JK-001',
    name: 'The Structured Blazer',
    category: 'jackets',
    collection: 'Tailoring Line',
    shortDescription: 'A composed layer with a strong shoulder.',
    description:
      'A sample catalogue entry for a blazer built around a defined shoulder, clean lapel and balanced length.',
    material: 'Wool blend',
    fabric: 'Wool blend (sample specification)',
    fit: 'Tailored',
    care: ['Dry clean only', 'Cool iron', 'Store on a hanger'],
    images: makeImage('#242323', 'Front study of The Structured Blazer, photography pending', 'the-structured-blazer', 'jackets'),
    colors: makeColors([
      ['Charcoal', '#242323'],
      ['Midnight', '#2F3437']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    featured: true
  }),
  makeProduct({
    slug: 'the-lightweight-jacket',
    sku: 'SB-JK-002',
    name: 'The Lightweight Jacket',
    category: 'jackets',
    collection: 'Utility Line',
    shortDescription: 'An unlined layer with easy structure.',
    description:
      'A sample catalogue entry for a lightweight jacket with clean seams, a short stand collar and everyday practicality.',
    material: 'Cotton blend',
    fabric: 'Cotton blend (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Line dry', 'Do not bleach'],
    images: makeImage('#9C5F45', 'Front study of The Lightweight Jacket, photography pending', 'the-lightweight-jacket', 'jackets'),
    colors: makeColors([
      ['Rust', '#9C5F45'],
      ['Olive', '#6B6F5E']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL', 'XXL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-textured-polo',
    sku: 'SB-PL-001',
    name: 'The Textured Polo',
    category: 'polo-shirts',
    collection: 'Studio Line',
    shortDescription: 'A polo with depth in the surface.',
    description:
      'A sample catalogue entry for a textured polo with a refined placket and a comfortable, composed shape.',
    material: 'Cotton',
    fabric: 'Textured cotton (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Line dry', 'Cool iron'],
    images: makeImage('#D6AFA1', 'Front study of The Textured Polo, photography pending', 'the-textured-polo', 'polo-shirts'),
    colors: makeColors([
      ['Rose Taupe', '#B98270'],
      ['Ivory', '#F5F1ED']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    featured: true
  }),
  makeProduct({
    slug: 'the-classic-polo',
    sku: 'SB-PL-002',
    name: 'The Classic Polo',
    category: 'polo-shirts',
    collection: 'Everyday Line',
    shortDescription: 'A quiet polo for regular wear.',
    description:
      'A sample catalogue entry for a classic polo with a measured collar and a clean, unfussy finish.',
    material: 'Cotton',
    fabric: 'Pique cotton (sample specification)',
    fit: 'Regular',
    care: ['Machine wash cold', 'Line dry', 'Warm iron'],
    images: makeImage('#3B4A6B', 'Front study of The Classic Polo, photography pending', 'the-classic-polo', 'polo-shirts'),
    colors: makeColors([
      ['Navy', '#2B3548'],
      ['Stone', '#B8B1A6']
    ]),
    sizes: makeSizes(['M', 'L', 'XL', 'XXL']),
    featured: false
  }),
  makeProduct({
    slug: 'the-knit-vest',
    sku: 'SB-OT-001',
    name: 'The Knit Vest',
    category: 'other',
    collection: 'Studio Line',
    shortDescription: 'A layering piece with a quiet profile.',
    description:
      'A sample catalogue entry for a knit vest designed to sit cleanly over shirting or a fine tee.',
    material: 'Cotton',
    fabric: 'Cotton knit (sample specification)',
    fit: 'Regular',
    care: ['Hand wash cold', 'Dry flat', 'Cool iron'],
    images: makeImage('#E4DCD2', 'Front study of The Knit Vest, photography pending', 'the-knit-vest', 'other'),
    colors: makeColors([
      ['Ecru', '#E4DCD2'],
      ['Charcoal', '#242323']
    ]),
    sizes: makeSizes(['S', 'M', 'L', 'XL']),
    featured: false
  })
];

export const categorySlugs: CategorySlug[] = [
  'shirts',
  't-shirts',
  'jeans',
  'trousers',
  'jackets',
  'polo-shirts',
  'other'
];
