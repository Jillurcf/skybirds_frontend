import type { Metadata } from 'next';
import { AboutCraftsmanship } from '@/components/sections/about-craftsmanship';
import { AboutCta } from '@/components/sections/about-cta';
import { AboutIntro } from '@/components/sections/about-intro';
import { AboutMissionVision } from '@/components/sections/about-mission-vision';
import { AboutPhilosophy } from '@/components/sections/about-philosophy';
import { AboutValues } from '@/components/sections/about-values';
import { PageHero } from '@/components/sections/page-hero';
import { getAboutContent } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'About Us | SKY BIRDS',
  description:
    'Learn about SKY BIRDS FASHION BD — our brand philosophy, mission, values and commitment to premium menswear craftsmanship.'
};

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <AboutIntro content={content.intro} />
      <AboutPhilosophy content={content.philosophy} />
      <AboutMissionVision content={content.missionVision} />
      <AboutValues content={content.values} />
      <AboutCraftsmanship content={content.craftsmanship} />
      <AboutCta content={content.cta} />
    </>
  );
}
