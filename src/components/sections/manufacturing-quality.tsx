import { ParallaxImage } from '@/components/motion/parallax-image';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ManufacturingPageContent } from '@/types/pages';

interface ManufacturingQualityProps {
  content: ManufacturingPageContent['quality'];
}

export function ManufacturingQuality({ content }: ManufacturingQualityProps) {
  return (
    <Section id="quality-inspection" className="border-y border-champagne">
      <div className="grid gap-2xl lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <ScrollReveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
          <ul className="mt-xl space-y-md">
            {content.points.map((point, index) => (
              <li key={point} className="flex gap-md border-t border-champagne pt-md text-sm leading-relaxed text-charcoal/72">
                <span className="font-display text-xl text-rose-gold-deep">0{index + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
        <ParallaxImage
          placeholderLabel={content.imagePlaceholder}
          imageSrc={content.image}
          imageAlt={content.imageAlt}
          className="min-h-[420px] border border-champagne md:min-h-[560px]"
        />
      </div>
    </Section>
  );
}
