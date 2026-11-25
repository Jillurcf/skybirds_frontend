import { fireEvent, render, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HeroVideoSequence } from '@/components/motion/hero-video-sequence';

const fallbackImage = {
  src: '/images/editorial/hero-fashion.webp',
  alt: ''
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('hero video sequence', () => {
  it('renders six muted decorative clips over the static fallback image', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);

    const { container } = render(<HeroVideoSequence fallbackImage={fallbackImage} />);

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('img')).toHaveAttribute('alt', '');

    const videos = container.querySelectorAll('video');
    expect(videos).toHaveLength(6);
    expect(Array.from(videos).every((video) => video.muted && video.playsInline)).toBe(true);
    expect(videos[0]).toHaveAttribute('data-active', 'true');
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
  });

  it('starts the next clip before the current clip ends', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);

    const { container } = render(<HeroVideoSequence fallbackImage={fallbackImage} />);
    const videos = container.querySelectorAll('video');

    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    Object.defineProperty(videos[0], 'duration', { configurable: true, value: 10 });
    Object.defineProperty(videos[0], 'currentTime', {
      configurable: true,
      writable: true,
      value: 9
    });
    Object.defineProperty(videos[1], 'paused', { configurable: true, get: () => false });

    fireEvent.timeUpdate(videos[0]);

    await waitFor(() => expect(videos[1]).toHaveAttribute('data-active', 'true'));
    expect(videos[0]).toHaveAttribute('data-active', 'false');
    expect(play).toHaveBeenCalledTimes(2);
  });

  it('falls forward when the active clip ends', async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);

    const { container } = render(<HeroVideoSequence fallbackImage={fallbackImage} />);
    const videos = container.querySelectorAll('video');

    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    fireEvent.ended(videos[0]);

    await waitFor(() => expect(videos[1]).toHaveAttribute('data-active', 'true'));
    expect(videos[0]).toHaveAttribute('data-active', 'false');
  });
});
