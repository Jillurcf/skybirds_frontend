import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouteTransition } from '@/components/layout/route-transition';

describe('page transitions', () => {
  it('renders route content immediately without hiding it from the accessibility tree', () => {
    render(
      <RouteTransition>
        <h1>Collections</h1>
      </RouteTransition>
    );

    expect(screen.getByRole('heading', { name: 'Collections', level: 1 })).toBeVisible();
  });
});
