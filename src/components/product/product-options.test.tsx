import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductOptions } from '@/components/product/product-options';
import { getProductBySlug } from '@/lib/repository';

describe('product colour and size selection', () => {
  it('exposes available and unavailable variants with native radio semantics', async () => {
    const product = await getProductBySlug('the-atelier-shirt');
    if (!product) throw new Error('Test product missing');

    const charcoal = product.colors.find((color) => color.name === 'Charcoal');
    if (!charcoal) throw new Error('Test colour missing');

    const onColorChange = vi.fn();
    const onSizeChange = vi.fn();

    render(
      <ProductOptions
        product={product}
        selectedColor={charcoal}
        selectedSize="M"
        onColorChange={onColorChange}
        onSizeChange={onSizeChange}
      />
    );

    const charcoalRadio = screen.getByRole('radio', { name: 'Charcoal' });
    expect(charcoalRadio).toBeChecked();

    const small = screen.getByRole('radio', { name: 'S, unavailable' });
    expect(small).toBeDisabled();
    expect(small).toHaveAttribute('aria-disabled', 'true');

    const large = screen.getByRole('radio', { name: 'L' });
    expect(large).not.toBeDisabled();
    fireEvent.click(large);
    expect(onSizeChange).toHaveBeenCalledWith('L');

    const ivory = screen.getByRole('radio', { name: 'Ivory' });
    fireEvent.click(ivory);
    expect(onColorChange).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ivory' }));
  });
});
