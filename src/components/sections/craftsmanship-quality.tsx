import { Reveal } from '@/components/motion/reveal';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeCraftsmanshipContent } from '@/types/home';

export function CraftsmanshipQuality({ content }: { content: HomeCraftsmanshipContent }) {
  return (
    <Section id="craftsmanship" className="border-b border-champagne">
      <div className="grid gap-2xl lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <ImageCarousel
          images={content.images}
          placeholderLabel={content.imagePlaceholder}
          label="Craftsmanship photographs"
          className="aspect-[4/5] w-full lg:aspect-[5/6]"
        />

        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <Reveal>
            <dl className="mt-xl border-t border-champagne">
              {content.pillars.map((pillar) => (
                <div key={pillar.title} className="grid gap-sm border-b border-champagne py-lg sm:grid-cols-[0.35fr_1fr]">
                  <dt className="font-display text-xl text-charcoal">{pillar.title}</dt>
                  <dd className="text-sm leading-relaxed text-charcoal/70">{pillar.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
