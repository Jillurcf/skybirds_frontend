import type { ManufacturingPageContent } from '@/types/pages';

export const manufacturingContent: ManufacturingPageContent = {
  hero: {
    eyebrow: 'Manufacturing',
    title: 'Precision behind every garment.',
    description:
      'SKY BIRDS approaches manufacturing with the same care as design — structured process, disciplined quality and a commitment to reliable craft.'
  },
  intro: {
    eyebrow: 'Our capability',
    title: 'Built for quality, prepared for partnership.',
    description:
      'From fabric selection to final packaging, our manufacturing workflow is organised around consistency, attention to detail and clear communication. Verified capacity and certification details will be added when supplied.'
  },
  process: {
    eyebrow: 'Production process',
    title: 'A clear process, step by step.',
    description:
      'Every stage is handled with intention, ensuring the finished garment reflects the standard set at the design table.',
    steps: [
      {
        number: '01',
        title: 'Fabric selection',
        description:
          'Materials are reviewed for hand feel, weight, durability and suitability to the intended silhouette.',
        image: '/images/editorial/process-01.webp',
        imageAlt: 'Illustrative close-up of selected fabric'
      },
      {
        number: '02',
        title: 'Pattern making',
        description:
          'Patterns are developed to balance fit, proportion and repeatability across production.',
        image: '/images/editorial/process-02.webp',
        imageAlt: 'Illustrative pattern planning workspace'
      },
      {
        number: '03',
        title: 'Cutting',
        description:
          'Fabric is cut with care to maintain alignment, consistency and efficient use of material.',
        image: '/images/editorial/process-03.webp',
        imageAlt: 'Illustrative garment cutting process'
      },
      {
        number: '04',
        title: 'Stitching',
        description:
          'Garments are assembled with controlled construction methods to preserve structure and comfort.',
        image: '/images/editorial/process-04.webp',
        imageAlt: 'Illustrative stitching detail'
      },
      {
        number: '05',
        title: 'Finishing',
        description:
          'Final details, pressing and presentation are refined so each piece meets the expected standard.',
        image: '/images/editorial/process-05.webp',
        imageAlt: 'Illustrative finishing detail'
      },
      {
        number: '06',
        title: 'Quality inspection',
        description:
          'Each garment is checked for construction, measurement and finish before it moves forward.',
        image: '/images/editorial/process-06.webp',
        imageAlt: 'Illustrative garment inspection'
      },
      {
        number: '07',
        title: 'Packaging',
        description:
          'Approved pieces are prepared and packed with care, ready for delivery or further distribution.',
        image: '/images/editorial/process-07.webp',
        imageAlt: 'Illustrative prepared apparel collection'
      }
    ]
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Disciplined making, dependable outcomes.',
    description:
      'Our capabilities are presented with transparency. Specific metrics and certifications will be published once verified.',
    items: [
      {
        title: 'Material sourcing',
        description: 'Careful selection of fabrics and trims suited to premium menswear requirements.'
      },
      {
        title: 'Sample development',
        description: 'Prototype and sampling support to refine fit, construction and finish before production.'
      },
      {
        title: 'Quality control',
        description: 'Inspection checkpoints through production to maintain consistency and reduce defects.',
        metric: 'Pending verification',
        metricLabel: 'Quality metrics'
      },
      {
        title: 'Production partnerships',
        description: 'A collaborative approach for brands seeking reliable manufacturing support.',
        metric: 'Pending verification',
        metricLabel: 'Capacity details'
      }
    ]
  },
  quality: {
    eyebrow: 'Quality commitment',
    title: 'Quality is checked, not assumed.',
    description:
      'We treat quality as a continuous practice. From material handling to final packaging, every stage includes deliberate review.',
    points: [
      'Construction and seam integrity reviewed at key stages',
      'Measurement and fit consistency checked against specification',
      'Finishing details inspected before packaging and handover',
      'Verified certifications and performance figures to be added when confirmed'
    ],
    imagePlaceholder: 'Illustrative garment production study',
    image: '/images/editorial/production-quality.webp',
    imageAlt: 'Illustrative photograph from a garment production setting'
  },
  cta: {
    eyebrow: 'B2B enquiries',
    title: 'Discuss your manufacturing needs directly.',
    description:
      'For partnership, sampling or production enquiries, reach our team through the direct contact channels below.',
    primaryCta: { label: 'Contact the team', href: '/contact' }
  }
};
