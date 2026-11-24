import type { AboutPageContent } from '@/types/pages';

export const aboutContent: AboutPageContent = {
  hero: {
    eyebrow: 'About SKY BIRDS',
    title: 'Crafting style. Defining identity.',
    description:
      'SKY BIRDS FASHION BD is a premium menswear identity shaped by considered design, disciplined craft and a clear point of view.'
  },
  intro: {
    eyebrow: 'Brand introduction',
    title: 'A quiet confidence, built into every line.',
    description:
      'We approach menswear as an editorial study in proportion, fabric and finish. Each piece is designed to feel composed, enduring and distinctly SKY BIRDS.'
  },
  philosophy: {
    eyebrow: 'Company philosophy',
    title: 'Restraint is a design decision.',
    description:
      'Our philosophy is grounded in the belief that the strongest garments do not ask for attention — they earn it through balance, material and detail.',
    paragraphs: [
      'We value clarity over excess. From the first sketch to the final inspection, every decision is measured against how a garment sits, moves and lasts.',
      'This discipline guides both our fashion identity and our manufacturing perspective, keeping the work honest, refined and purposeful.'
    ]
  },
  missionVision: {
    eyebrow: 'Mission and vision',
    title: 'Direction with purpose.',
    mission: {
      title: 'Our mission',
      description:
        'To create premium menswear that reflects thoughtful craftsmanship, refined simplicity and a confident modern identity.'
    },
    vision: {
      title: 'Our vision',
      description:
        'To grow as a trusted fashion and manufacturing name from Bangladesh, recognised for quality, integrity and considered design.'
    }
  },
  values: {
    eyebrow: 'Brand values',
    title: 'The principles behind the work.',
    description:
      'Our values shape how we design, make and present every garment — with care, consistency and intention.',
    items: [
      {
        title: 'Craftsmanship',
        description: 'We honour the skill behind every seam, cut and finish.'
      },
      {
        title: 'Quality',
        description: 'We pursue standards that can be felt in fabric, fit and durability.'
      },
      {
        title: 'Integrity',
        description: 'We present only what we can stand behind, with clarity and honesty.'
      },
      {
        title: 'Refinement',
        description: 'We believe elegance lives in restraint, balance and thoughtful detail.'
      }
    ]
  },
  craftsmanship: {
    eyebrow: 'Fashion and craftsmanship',
    title: 'Where design meets discipline.',
    description:
      'Fashion at SKY BIRDS is not separated from making. The character of a garment comes from how design intent is carried through material, construction and finishing.',
    paragraphs: [
      'We study texture, drape and structure to create menswear with a composed presence. The result is clothing that feels natural to wear and deliberate in form.',
      'As our story continues to unfold, we will present verified work and imagery that reflect the full depth of our craft and capability.'
    ],
    imagePlaceholder: 'Illustrative editorial craftsmanship study',
    image: '/images/editorial/craftsmanship-editorial.webp',
    imageAlt: 'Illustrative editorial photograph of tailored garments'
  },
  cta: {
    eyebrow: 'Continue the story',
    title: 'Discover how we make and how to reach us.',
    description:
      'Learn more about our manufacturing approach or start a direct conversation with the SKY BIRDS team.',
    primaryCta: { label: 'Explore manufacturing', href: '/manufacturing' },
    secondaryCta: { label: 'Contact us', href: '/contact' }
  }
};
