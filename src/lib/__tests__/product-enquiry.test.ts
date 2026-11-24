import { describe, expect, it } from 'vitest';
import { buildProductEnquiryContext, buildProductEnquiryMessages } from '@/lib/product-enquiry';
import { getProductBySlug } from '@/lib/repository';

describe('product enquiry context', () => {
  it('includes product, SKU, selection and URL in every enquiry message', async () => {
    const product = await getProductBySlug('the-atelier-shirt');
    const context = buildProductEnquiryContext(product!, {
      size: 'M',
      color: 'Ivory',
      url: 'https://example.com/products/the-atelier-shirt'
    });
    const messages = buildProductEnquiryMessages(context);

    expect(messages.subject).toBe('Enquiry: The Atelier Shirt (SB-SH-001)');
    expect(messages.body).toContain('Product: The Atelier Shirt');
    expect(messages.body).toContain('SKU: SB-SH-001');
    expect(messages.body).toContain('Size: M');
    expect(messages.body).toContain('Colour: Ivory');
    expect(messages.body).toContain('Product URL: https://example.com/products/the-atelier-shirt');
    expect(messages.whatsapp).toContain('Size: M');
    expect(messages.whatsapp).toContain('Colour: Ivory');
    expect(messages.whatsapp).toContain(
      'Product URL: https://example.com/products/the-atelier-shirt'
    );
  });

  it('uses clear fallbacks when no options are selected', async () => {
    const product = await getProductBySlug('the-studio-oxford');
    const messages = buildProductEnquiryMessages(buildProductEnquiryContext(product!));

    expect(messages.body).toContain('Size: Not selected');
    expect(messages.body).toContain('Colour: Not selected');
    expect(messages.body).toContain('Product URL: Not available');
  });
});
