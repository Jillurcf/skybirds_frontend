import type { Capability, ContactIcon, NavItem, ProcessStep } from '@/types/content';

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface AboutValue {
  title: string;
  description: string;
}

export interface AboutStorySection {
  eyebrow: string;
  title: string;
  description: string;
  paragraphs: string[];
  imagePlaceholder: string;
  image: string;
  imageAlt: string;
}

export interface AboutPageContent {
  hero: PageHeroContent;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    description: string;
    paragraphs: string[];
  };
  missionVision: {
    eyebrow: string;
    title: string;
    mission: { title: string; description: string };
    vision: { title: string; description: string };
  };
  values: {
    eyebrow: string;
    title: string;
    description: string;
    items: AboutValue[];
  };
  craftsmanship: AboutStorySection;
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: NavItem;
    secondaryCta: NavItem;
  };
}

export interface ManufacturingPageContent {
  hero: PageHeroContent;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    description: string;
    items: Capability[];
  };
  quality: {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    imagePlaceholder: string;
    image: string;
    imageAlt: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: NavItem;
  };
}

export interface ContactInfoItem {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
  available: boolean;
  description: string;
}

export interface ContactPageContent {
  hero: PageHeroContent;
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  form: {
    eyebrow: string;
    title: string;
    description: string;
  };
}
