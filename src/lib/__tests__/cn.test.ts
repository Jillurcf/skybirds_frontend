import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/cn';

describe('cn', () => {
  it('merges conflicting tailwind classes', () => {
    expect(cn('p-4', 'p-6', 'text-charcoal')).toBe('p-6 text-charcoal');
  });

  it('ignores falsy values', () => {
    expect(cn('flex', false, undefined, null, 'gap-md')).toBe('flex gap-md');
  });
});
