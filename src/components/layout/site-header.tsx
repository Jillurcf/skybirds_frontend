'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { BrandLogo } from '@/components/brand/brand-logo';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { NavLink } from '@/components/ui/nav-link';
import { desktopPrimaryNavigation, productNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const productsActive = pathname === '/products' || productNavigation.some((item) => pathname === item.href);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-base ease-out-soft',
        scrolled
          ? 'border-champagne/70 bg-ivory/95 shadow-editorial backdrop-blur'
          : 'border-transparent bg-transparent'
      )}
    >
      <Container className="flex min-h-[72px] items-center justify-between gap-lg">
        <Link href="/" className="flex min-h-11 items-center gap-md" aria-label="SKY BIRDS home">
          <BrandLogo variant="emblem" width={40} alt="" priority />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg uppercase tracking-tight text-charcoal">Sky Birds</span>
            <span className="mt-1 text-[9px] uppercase tracking-editorial text-charcoal/75">Fashion BD</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-xl lg:flex">
          <NavLink href="/">Home</NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  'inline-flex min-h-11 items-center gap-1 text-sm text-charcoal transition-colors duration-fast hover:text-rose-gold-deep',
                  productsActive && 'text-rose-gold-deep'
                )}
              >
                Products
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[14rem]">
              <DropdownMenuLabel>Collections</DropdownMenuLabel>
              {productNavigation.map((item) => (
                <DropdownMenuItem asChild key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {desktopPrimaryNavigation
            .filter((item) => item.href !== '/')
            .map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-md">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <Link href="/contact">Contact</Link>
          </Button>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control text-charcoal lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}
