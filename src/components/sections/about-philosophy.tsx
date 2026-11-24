import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutPhilosophyProps {
  content: AboutPageContent['philosophy'];
}

export function AboutPhilosophy({ content }: AboutPhilosophyProps) {
  return (
    <Section id="philosophy">
      <div className="grid gap-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <ScrollReveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
        </ScrollReveal>
        <ScrollReveal className="space-y-md lg:pt-2xl">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-base leading-relaxed text-charcoal/72">
              {paragraph}
            </p>
          ))}
        </ScrollReveal>
      </div>
    </Section>
  );
}
