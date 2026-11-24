import { Reveal } from '@/components/motion/reveal';
import { ImageContainer } from '@/components/ui/image-container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { HomeManufacturingContent } from '@/types/home';

export function ManufacturingCapabilities({ content }: { content: HomeManufacturingContent }) {
  return (
    <Section
      id="manufacturing"
      tone="dark"
      className="[&_.eyebrow]:text-rose-soft [&_.lede]:text-ivory/70 [&_.section-title]:text-ivory"
    >
      <div className="grid gap-2xl lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
          <ol className="mt-xl grid gap-md sm:grid-cols-2">
            {content.steps.map((step, index) => (
              <li key={step.number} className="h-full">
                <Reveal delay={index * 0.09} className="h-full">
                  <div className="flex h-full flex-col border border-ivory/15 p-lg">
                    <span className="font-display text-4xl text-rose-soft">{step.number}</span>
                    <h3 className="mt-md font-display text-2xl text-ivory">{step.title}</h3>
                    <p className="mt-sm text-sm leading-relaxed text-ivory/65">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {content.image ? (
          <Reveal delay={0.14}>
            <div className="relative">
              <ImageContainer
                src={content.image.src}
                alt={content.image.alt}
                aspect="portrait"
                placeholderColor={content.image.placeholderColor}
                placeholderLabel="Illustrative process detail"
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="border border-ivory/15 lg:max-h-[560px]"
              />
              <div className="mt-md flex items-center justify-between gap-md text-[10px] uppercase tracking-editorial text-ivory/55">
                <span>{content.imageCaption ?? 'Process study'}</span>
                <span>SKY BIRDS</span>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>

      <p className="mt-xl text-xs uppercase tracking-editorial text-ivory/75">
        Verified figures and certifications will be added only when supplied.
      </p>
    </Section>
  );
}
