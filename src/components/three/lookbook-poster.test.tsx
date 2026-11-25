import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LookbookPoster } from '@/components/three/lookbook-poster';

describe('hero WebGL fallback', () => {
  it('renders a decorative static card collage without exposing it to assistive technology', () => {
    const { container } = render(
      <LookbookPoster images={['/images/editorial/arrivals-01.webp', '/images/editorial/arrivals-02.webp']} />
    );

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(Array.from(images).every((image) => image.getAttribute('alt') === '')).toBe(true);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
