import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ManufacturingPageContent } from '@/types/pages';

interface ManufacturingIntroProps {
  content: ManufacturingPageContent['intro'];
}

export function ManufacturingIntro({ content }: ManufacturingIntroProps) {
  return (
    <Section id="manufacturing-intro" className="border-y border-champagne">
      <ScrollReveal className="max-w-4xl">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
      </ScrollReveal>
    </Section>
  );
}
