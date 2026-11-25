import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
vi.mock('next/link', () => ({
  default: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) => (
    <a
      {...props}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  )
}));

import { SiteHeader } from '@/components/layout/site-header';

describe('navbar and mobile navigation', () => {
  it('renders the logo home link and primary navigation', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'SKY BIRDS home' })).toHaveAttribute('href', '/');
    const primary = screen.getByRole('navigation', { name: 'Primary navigation' });
    expect(primary).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Shirts' })).toHaveAttribute('href', '/products/shirts');
    expect(screen.getByRole('button', { name: /Products/ })).toBeInTheDocument();
  });

  it('opens the mobile drawer and exposes the same routes', async () => {
    render(<SiteHeader />);
    const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(trigger).toHaveAttribute('aria-controls', 'mobile-navigation-menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    const mobile = screen.getByRole('navigation', { name: 'Mobile navigation' });
    expect(mobile).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Polo Shirts' })).toHaveAttribute(
      'href',
      '/products/polo-shirts'
    );

    fireEvent.click(within(mobile).getByRole('link', { name: 'Contact' }));
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
  });
});
