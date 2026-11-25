import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ImageCarousel } from '@/components/ui/image-carousel';

const images = [
  { src: '/images/craftmanships/craftmanship01.jpg', alt: 'Craftsman working on a garment' },
  { src: '/images/craftmanships/craftmanship02.jpg', alt: 'Garment construction detail' },
  { src: '/images/craftmanships/craftmanship03.jpg', alt: 'Finished menswear detail' }
];

const AUTOPLAY_INTERVAL = 5000;

describe('craftsmanship image carousel', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('exposes each supplied photograph and labelled navigation controls', () => {
    render(
      <ImageCarousel
        images={images}
        placeholderLabel="Craftsmanship photograph"
        label="Craftsmanship photographs"
      />
    );

    const carousel = screen.getByRole('region', { name: 'Craftsmanship photographs' });
    expect(within(carousel).getAllByRole('group', { name: /of 3/ })).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Previous photograph' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next photograph' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show photograph 1 of 3' })).toHaveAttribute('aria-current', 'true');
  });

  it('moves to the next photograph and announces the new position', () => {
    render(
      <ImageCarousel
        images={images}
        placeholderLabel="Craftsmanship photograph"
        label="Craftsmanship photographs"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next photograph' }));

    expect(screen.getByText('Photograph 2 of 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Show photograph 2 of 3' })).toHaveAttribute('aria-current', 'true');
  });

  it('advances automatically and stops when the slideshow is paused', () => {
    vi.useFakeTimers();
    render(
      <ImageCarousel
        images={images}
        placeholderLabel="Craftsmanship photograph"
        label="Craftsmanship photographs"
      />
    );

    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_INTERVAL);
    });
    expect(screen.getByText('Photograph 2 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Pause slideshow' }));
    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_INTERVAL * 2);
    });
    expect(screen.getByText('Photograph 2 of 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Play slideshow' }));
    act(() => {
      vi.advanceTimersByTime(AUTOPLAY_INTERVAL);
    });
    expect(screen.getByText('Photograph 3 of 3')).toBeInTheDocument();
  });
});
