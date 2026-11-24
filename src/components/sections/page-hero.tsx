import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <Section spacing="compact" className={className ?? 'pt-xl md:pt-3xl'}>
      <Container className="max-w-5xl">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-md font-display text-display font-normal leading-[0.95] tracking-tight text-charcoal text-balance">
            {title}
          </h1>
          <p className="lede mt-lg max-w-3xl">{description}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
