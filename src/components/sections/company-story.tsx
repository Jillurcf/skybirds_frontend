import { BrandPanel } from '@/components/brand/brand-panel';
import { Reveal } from '@/components/motion/reveal';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeStoryContent } from '@/types/home';

export function CompanyStory({ content }: { content: HomeStoryContent }) {
  return (
    <Section id="company-story" className="bg-champagne/20">
      <div className="grid gap-2xl lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <ScrollReveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
          <div className="mt-xl space-y-md">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-base leading-relaxed text-charcoal/70">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <Reveal delay={0.12}>
          <BrandPanel className="min-h-[360px] items-center justify-center" />
        </Reveal>
      </div>
    </Section>
  );
}
