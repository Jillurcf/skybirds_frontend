import type { Metadata } from 'next';
import { ManufacturingCapabilityCards } from '@/components/sections/manufacturing-capability-cards';
import { ManufacturingCta } from '@/components/sections/manufacturing-cta';
import { ManufacturingIntro } from '@/components/sections/manufacturing-intro';
import { ManufacturingProcess } from '@/components/sections/manufacturing-process';
import { ManufacturingQuality } from '@/components/sections/manufacturing-quality';
import { PageHero } from '@/components/sections/page-hero';
import { getManufacturingContent } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Manufacturing | SKY BIRDS',
  description:
    'Explore SKY BIRDS manufacturing capabilities — from fabric selection and pattern making to quality inspection and packaging.'
};

export default async function ManufacturingPage() {
  const content = await getManufacturingContent();

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <ManufacturingIntro content={content.intro} />
      <ManufacturingProcess content={content.process} />
      <ManufacturingCapabilityCards content={content.capabilities} />
      <ManufacturingQuality content={content.quality} />
      <ManufacturingCta content={content.cta} />
    </>
  );
}
