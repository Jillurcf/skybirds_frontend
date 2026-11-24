import { ParallaxImage } from '@/components/motion/parallax-image';
import { ScrollReveal } from '@/components/motion/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { AboutPageContent } from '@/types/pages';

interface AboutCraftsmanshipProps {
  content: AboutPageContent['craftsmanship'];
}

export function AboutCraftsmanship({ content }: AboutCraftsmanshipProps) {
  return (
    <Section id="fashion-craftsmanship" className="border-y border-champagne">
      <div className="grid gap-2xl lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <ParallaxImage
          placeholderLabel={content.imagePlaceholder}
          imageSrc={content.image}
          imageAlt={content.imageAlt}
          className="min-h-[420px] border border-champagne md:min-h-[560px]"
        />
        <ScrollReveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
          <div className="mt-xl space-y-md">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-base leading-relaxed text-charcoal/72">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
