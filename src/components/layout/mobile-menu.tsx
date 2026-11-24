'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { NavLink } from '@/components/ui/nav-link';
import { primaryNavigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <BrandLogo variant="full" width={168} alt="SKY BIRDS FASHION BD" priority />
          <SheetTitle className="sr-only">Site navigation</SheetTitle>
          <SheetDescription className="sr-only">Browse collections and company information.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile navigation" className="mt-xl">
          <ul className="flex flex-col gap-1">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  onNavigate={close}
                  className={cn('w-full justify-start py-3 text-base font-display', 'after:hidden')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="mt-xl">
          <Button asChild variant="accent" className="w-full">
            <Link href="/contact" onClick={close}>
              Start an enquiry
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
