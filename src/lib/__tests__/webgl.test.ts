import { describe, expect, it } from 'vitest';
import { getHeroPointer, getHeroQuality, getRecommendedDpr, hasWebGL } from '@/lib/webgl';

describe('webgl helpers', () => {
  it('fails safely without a browser', () => {
    expect(hasWebGL()).toBe(false);
    expect(getRecommendedDpr()).toBe(1);
  });

  it('tiers WebGL quality by viewport width', () => {
    expect(getHeroQuality(320)).toBe('low');
    expect(getHeroQuality(767)).toBe('low');
    expect(getHeroQuality(768)).toBe('low');
    expect(getHeroQuality(1023)).toBe('low');
    expect(getHeroQuality(1024)).toBe('high');
  });

  it('normalizes hero pointer coordinates and detects the hero bounds', () => {
    const rect = { left: 100, top: 50, width: 800, height: 400 };

    expect(getHeroPointer(500, 250, rect)).toEqual({ x: 0, y: 0, inside: true });
    expect(getHeroPointer(900, 50, rect)).toEqual({ x: 1, y: 1, inside: true });
    expect(getHeroPointer(50, 250, rect).inside).toBe(false);
    expect(getHeroPointer(500, 250, { ...rect, width: 0 }).inside).toBe(false);
  });
});
