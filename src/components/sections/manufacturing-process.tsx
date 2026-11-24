import { Reveal } from '@/components/motion/reveal';
import { ImageContainer } from '@/components/ui/image-container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ManufacturingPageContent } from '@/types/pages';

interface ManufacturingProcessProps {
  content: ManufacturingPageContent['process'];
}

export function ManufacturingProcess({ content }: ManufacturingProcessProps) {
  return (
    <Section id="production-process">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        className="max-w-3xl"
      />
      <ol className="mt-2xl grid gap-lg md:grid-cols-2 xl:grid-cols-3">
        {content.steps.map((step, index) => (
          <li key={step.number} className="h-full">
            <Reveal delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col border border-champagne bg-canvas">
                <ImageContainer
                  aspect="wide"
                  placeholderLabel={step.image ? step.title : `${step.title} illustration pending`}
                  src={step.image}
                  alt={step.image ? (step.imageAlt ?? step.title) : ''}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="flex flex-1 flex-col p-lg">
                  <span className="font-display text-4xl text-rose-gold-deep">{step.number}</span>
                  <h3 className="mt-md font-display text-2xl text-charcoal">{step.title}</h3>
                  <p className="mt-md text-sm leading-relaxed text-charcoal/68">{step.description}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
