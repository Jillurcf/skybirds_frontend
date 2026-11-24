import { BrandPanel } from '@/components/brand/brand-panel';
import { Reveal } from '@/components/motion/reveal';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutIntroProps {
  content: AboutPageContent['intro'];
}

export function AboutIntro({ content }: AboutIntroProps) {
  return (
    <Section id="about-intro" className="border-y border-champagne">
      <div className="grid gap-2xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <BrandPanel className="min-h-[320px] items-center justify-center bg-ivory/60" />
        </Reveal>
        <ScrollReveal className="flex flex-col gap-lg">
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
        </ScrollReveal>
      </div>
    </Section>
  );
}
