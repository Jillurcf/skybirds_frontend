import type { EditorialImage, NavItem } from '@/types/content';

export interface HomeHeroContent {
  eyebrow: string;
  headlineLines: [string, string];
  description: string;
  image: EditorialImage;
  primaryCta: NavItem;
  secondaryCta: NavItem;
}

export interface HomeIntroContent {
  eyebrow: string;
  title: string;
  description: string;
  notes: string[];
}

export interface HomeCollectionContent {
  name: string;
  category: string;
  href: string;
  description: string;
  image?: EditorialImage;
}

export interface HomeArrivalContent {
  eyebrow: string;
  title: string;
  description: string;
  placeholders: string[];
  images: EditorialImage[];
}

export interface HomeEditorialPanel {
  kicker: string;
  title: string;
  description: string;
  placeholderLabel: string;
  image: string;
  imageAlt: string;
}

export interface HomeSignatureContent {
  eyebrow: string;
  title: string;
  description: string;
  panels: HomeEditorialPanel[];
}

export interface HomeProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface HomeManufacturingContent {
  eyebrow: string;
  title: string;
  description: string;
  steps: HomeProcessStep[];
  image?: EditorialImage;
  imageCaption?: string;
}

export interface HomeCraftPillar {
  title: string;
  description: string;
}

export interface HomeCraftsmanshipContent {
  eyebrow: string;
  title: string;
  description: string;
  imagePlaceholder: string;
  image: string;
  imageAlt: string;
  pillars: HomeCraftPillar[];
}

export interface HomeStoryContent {
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
}

export interface HomeContactCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: NavItem;
}

export interface HomeContent {
  hero: HomeHeroContent;
  intro: HomeIntroContent;
  collections: {
    eyebrow: string;
    title: string;
    description: string;
    items: HomeCollectionContent[];
    allCta: NavItem;
  };
  arrivals: HomeArrivalContent;
  signature: HomeSignatureContent;
  manufacturing: HomeManufacturingContent;
  craftsmanship: HomeCraftsmanshipContent;
  story: HomeStoryContent;
  contactCta: HomeContactCtaContent;
}
