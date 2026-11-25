import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo } from '@/components/brand/brand-logo';

describe('BrandLogo', () => {
  it('renders the supplied full logo with an accessible name', () => {
    render(<BrandLogo variant="full" />);
    const logo = screen.getByRole('img', { name: 'SKY BIRDS FASHION BD logo' });
    expect(logo.getAttribute('src')).toContain('sky-birds-logo.png');
  });

  it('uses the emblem and padded icon assets for compact variants', () => {
    const { rerender } = render(<BrandLogo variant="emblem" />);
    expect(screen.getByRole('img', { name: 'SKY BIRDS bird emblem' }).getAttribute('src')).toContain(
      'sky-birds-emblem.png'
    );

    rerender(<BrandLogo variant="icon" />);
    expect(screen.getByRole('img', { name: 'SKY BIRDS icon' }).getAttribute('src')).toContain(
      'sky-birds-icon.png'
    );
  });

  it('allows decorative use with an empty alt', () => {
    const { container } = render(<BrandLogo variant="emblem" alt="" />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });
});
