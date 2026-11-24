'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type NavLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  onNavigate?: () => void;
};

export function NavLink({ href, className, onNavigate, onClick, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  const content = (
    <span
      className={cn(
        'relative inline-flex min-h-11 items-center text-sm text-charcoal transition-colors duration-fast hover:text-rose-gold-deep group-focus-visible:text-rose-gold-deep',
        isActive && 'text-charcoal',
        className
      )}
    >
      {props.children}
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-rose-gold-deep transition-transform duration-fast ease-out-soft group-hover:scale-x-100 group-focus-visible:scale-x-100',
          isActive && 'scale-x-100'
        )}
      />
    </span>
  );

  if (external) {
    return (
      <a href={href} onClick={onClick} className="group inline-flex">
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        onNavigate?.();
      }}
      aria-current={isActive ? 'page' : undefined}
      className="group"
      {...props}
    >
      {content}
    </Link>
  );
}
