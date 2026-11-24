import { describe, expect, it } from 'vitest';
import { isLightColor } from '@/lib/color';

describe('placeholder contrast', () => {
  it('detects light and dark placeholder fields', () => {
    expect(isLightColor('#F5F1ED')).toBe(true);
    expect(isLightColor('#D9C6BB')).toBe(true);
    expect(isLightColor('#242323')).toBe(false);
    expect(isLightColor('#3B4A6B')).toBe(false);
    expect(isLightColor('invalid')).toBe(true);
  });
});
