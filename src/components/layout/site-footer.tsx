import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
import { ContactLinks } from '@/components/layout/contact-links';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { footerNavigation, productNavigation } from '@/config/navigation';
import { siteConfig } from '@/config/site';

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-champagne bg-ivory">
      <Container className="grid gap-xl py-2xl md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <Reveal className="flex flex-col items-start gap-lg">
          <BrandLogo variant="full" width={220} responsive className="max-w-[220px]" />
          <p className="max-w-xs text-sm leading-relaxed text-charcoal/75">
            A premium menswear and garment manufacturing identity from Bangladesh.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="eyebrow mb-md">Navigate</p>
          <ul className="flex flex-col">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center text-sm text-charcoal/75 transition-colors duration-fast hover:text-rose-gold-deep"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="eyebrow mb-md">Collections</p>
          <ul className="flex flex-col">
            {productNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-11 items-center text-sm text-charcoal/75 transition-colors duration-fast hover:text-rose-gold-deep"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="eyebrow mb-md">Enquiries</p>
          <ContactLinks context="footer" variant="stack" />
        </Reveal>
      </Container>

      <div className="border-t border-champagne/70">
        <Container className="flex min-h-16 flex-col items-start justify-between gap-2 py-md text-xs text-charcoal/75 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.subtitle}</p>
        </Container>
      </div>
    </footer>
  );
}
