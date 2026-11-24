import { Reveal } from '@/components/motion/reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutMissionVisionProps {
  content: AboutPageContent['missionVision'];
}

export function AboutMissionVision({ content }: AboutMissionVisionProps) {
  const items = [content.mission, content.vision];

  return (
    <Section id="mission-vision" className="bg-champagne/15">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        align="center"
        className="mx-auto max-w-3xl"
      />
      <div className="mt-2xl grid gap-lg md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.1} className="h-full">
            <article className="flex h-full flex-col border border-champagne bg-canvas p-xl">
              <p className="eyebrow">{item.title}</p>
              <p className="mt-lg text-lg leading-relaxed text-charcoal/75">{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
