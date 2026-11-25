import type { HomeContent } from '@/types/home';

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'SKY BIRDS — FASHION BD',
    headlineLines: ['CRAFTING STYLE.', 'DEFINING IDENTITY.'],
    description: "Premium men's fashion. Crafted with precision, designed for distinction.",
    image: {
      src: '/images/editorial/hero-fashion.webp',
      alt: 'Illustrative editorial photograph of tailored menswear',
      placeholderColor: '#242323'
    },
    primaryCta: { label: 'Explore Collection', href: '#collections' },
    secondaryCta: { label: 'Discover Our Craft', href: '#craftsmanship' }
  },
  intro: {
    eyebrow: 'The brand',
    title: 'Style, considered from the first stitch.',
    description:
      'SKY BIRDS FASHION BD brings a quiet, editorial point of view to menswear. Fabric, proportion and finish are treated as one conversation — never as separate details.',
    notes: ['Fabric-led design', 'Considered silhouettes', 'Detailing with intent']
  },
  collections: {
    eyebrow: 'Featured collections',
    title: 'A wardrobe of considered forms.',
    description:
      'The first collection families are shirts, t-shirts, jeans, trousers and jackets. Each line will be introduced through lookbook photography when the catalogue is confirmed.',
    items: [
      {
        name: 'Shirts',
        category: 'shirts',
        href: '/products?category=shirts',
        description: 'Tailored lines with an ease of movement.',
        image: {
          src: '/images/categories/shirts.webp',
          alt: 'Illustrative shirt collection photograph',
          placeholderColor: '#E4DCD2'
        }
      },
      {
        name: 'T-Shirts',
        category: 't-shirts',
        href: '/products?category=t-shirts',
        description: 'Essential shapes, elevated by hand feel.',
        image: {
          src: '/images/categories/t-shirts.webp',
          alt: 'Illustrative t-shirt collection photograph',
          placeholderColor: '#D9C6BB'
        }
      },
      {
        name: 'Jeans',
        category: 'jeans',
        href: '/products?category=jeans',
        description: 'Relaxed structure with a precise edge.',
        image: {
          src: '/images/categories/jeans.webp',
          alt: 'Illustrative jeans collection photograph',
          placeholderColor: '#3B4A6B'
        }
      },
      {
        name: 'Trousers',
        category: 'trousers',
        href: '/products?category=trousers',
        description: 'Clean drape for a composed silhouette.',
        image: {
          src: '/images/categories/trousers.webp',
          alt: 'Illustrative trouser collection photograph',
          placeholderColor: '#2F3437'
        }
      },
      {
        name: 'Jackets',
        category: 'jackets',
        href: '/products?category=jackets',
        description: 'Outer layers designed to hold their shape.',
        image: {
          src: '/images/categories/jackets.webp',
          alt: 'Illustrative jacket collection photograph',
          placeholderColor: '#242323'
        }
      }
    ],
    allCta: { label: 'View all collections', href: '/products' }
  },
  arrivals: {
    eyebrow: 'New arrivals',
    title: 'The next chapter is in preparation.',
    description:
      'Illustrative Unsplash imagery holds these frames until the first confirmed product photography is supplied.',
    placeholders: ['First look', 'Fabric study', 'Detail study'],
    images: [
      {
        src: '/images/editorial/arrivals-01.webp',
        alt: 'Illustrative editorial look for the upcoming collection',
        placeholderColor: '#D9C6BB'
      },
      {
        src: '/images/editorial/arrivals-02.webp',
        alt: 'Illustrative linen fabric study for the upcoming collection',
        placeholderColor: '#D6AFA1'
      },
      {
        src: '/images/editorial/arrivals-03.webp',
        alt: 'Illustrative tailoring detail for the upcoming collection',
        placeholderColor: '#D9C6BB'
      }
    ]
  },
  signature: {
    eyebrow: "Signature men's wear",
    title: 'The details that define the line.',
    description:
      'An editorial study of the pieces at the centre of the wardrobe: the shirt, the t-shirt, the trouser and the outer layer.',
    panels: [
      {
        kicker: '01 / The shirt',
        title: 'A studied silhouette.',
        description: 'Crisp structure softened by the way the cloth moves.',
        placeholderLabel: 'Illustrative shirt study',
        image: '/images/editorial/signature-shirt.webp',
        imageAlt: 'Illustrative editorial photograph of a shirt'
      },
      {
        kicker: '02 / The t-shirt',
        title: 'Quiet essentials.',
        description: 'A simple form given presence through fabric and finish.',
        placeholderLabel: 'Illustrative t-shirt study',
        image: '/images/editorial/signature-t-shirt.webp',
        imageAlt: 'Illustrative editorial photograph of a t-shirt'
      },
      {
        kicker: '03 / The trouser',
        title: 'Line and ease.',
        description: 'A considered fall from waist to hem, built around balance.',
        placeholderLabel: 'Illustrative trouser study',
        image: '/images/editorial/signature-trouser.webp',
        imageAlt: 'Illustrative editorial photograph of trousers'
      },
      {
        kicker: '04 / The outer layer',
        title: 'The final composition.',
        description: 'The piece that settles the proportions of everything beneath it.',
        placeholderLabel: 'Illustrative jacket study',
        image: '/images/editorial/signature-jacket.webp',
        imageAlt: 'Illustrative editorial photograph of a jacket'
      }
    ]
  },
  manufacturing: {
    eyebrow: 'Manufacturing capabilities',
    title: 'A process meant to be seen clearly.',
    description:
      'SKY BIRDS is developing a manufacturing showcase alongside the fashion line. Each stage will be presented with verified detail as the portfolio is confirmed.',
    steps: [
      {
        number: '01',
        title: 'Pattern development',
        description: 'How an idea becomes a repeatable, balanced form.'
      },
      {
        number: '02',
        title: 'Sampling',
        description: 'How fit, drape and hand feel are refined before a run.'
      },
      {
        number: '03',
        title: 'Cutting and sewing',
        description: 'Where alignment, structure and consistency come together.'
      },
      {
        number: '04',
        title: 'Finishing and inspection',
        description: 'The final attention given before a piece is handed over.'
      }
    ],
    image: {
      src: '/images/editorial/process-03.webp',
      alt: 'Illustrative close-up of garment stitching',
      placeholderColor: '#D9C6BB'
    },
    imageCaption: 'Process study / stitch detail'
  },
  craftsmanship: {
    eyebrow: 'Craftsmanship and quality',
    title: 'Quality is a discipline, not a claim.',
    description:
      'Our visual language is built around the evidence of craft: the surface of the cloth, the behaviour of a seam, the restraint of a final finish.',
    imagePlaceholder: 'Craftsmanship photograph',
    images: [
      {
        src: '/images/craftmanships/craftmanship01.jpg',
        alt: 'Craftsman working on a garment in the workshop',
        placeholderColor: '#D9C6BB'
      },
      {
        src: '/images/craftmanships/craftmanship02.jpg',
        alt: 'Garment construction detail',
        placeholderColor: '#D6AFA1'
      },
      {
        src: '/images/craftmanships/craftmanship03.jpg',
        alt: 'Finished menswear detail',
        placeholderColor: '#B8B1A6'
      }
    ],
    pillars: [
      {
        title: 'Fabric',
        description: 'Texture and weight guide the silhouette before any detail is added.'
      },
      {
        title: 'Cut',
        description: 'Proportion creates the quiet confidence of the finished piece.'
      },
      {
        title: 'Finish',
        description: 'The smallest details carry the longest impression.'
      }
    ]
  },
  story: {
    eyebrow: 'Company story',
    title: 'Two disciplines, one standard.',
    description:
      'The brand is shaped by a fashion sensibility and a manufacturing perspective held in the same frame. The story will be told through verified work and considered imagery.',
    paragraphs: [
      'SKY BIRDS FASHION BD presents menswear as a study in restraint: fewer gestures, better judged. The visual identity is deliberately quiet so the garment can speak.',
      'Alongside it, the manufacturing narrative will document process and capability with accuracy. Nothing is claimed before it can be shown.'
    ]
  },
  contactCta: {
    eyebrow: 'Enquiries',
    title: 'Let us build something considered.',
    description:
      'For collection and manufacturing enquiries, direct contact routes will appear here once the final details are confirmed.',
    primaryCta: { label: 'Contact enquiries', href: '/contact' }
  }
};
