import type { Product } from '@/types/product';

export interface ProductEnquirySelection {
  size?: string | null;
  color?: string | null;
  url?: string;
}

export interface ProductEnquiryContext {
  productName: string;
  sku: string;
  size: string;
  color: string;
  url: string;
}

export interface ProductEnquiryMessages {
  subject: string;
  body: string;
  whatsapp: string;
}

export function buildProductEnquiryContext(
  product: Product,
  selection: ProductEnquirySelection = {}
): ProductEnquiryContext {
  return {
    productName: product.name,
    sku: product.sku,
    size: selection.size ?? 'Not selected',
    color: selection.color ?? 'Not selected',
    url: selection.url ?? 'Not available'
  };
}

export function buildProductEnquiryMessages(
  context: ProductEnquiryContext
): ProductEnquiryMessages {
  const detailLines = [
    `Product: ${context.productName}`,
    `SKU: ${context.sku}`,
    `Size: ${context.size}`,
    `Colour: ${context.color}`,
    `Product URL: ${context.url}`
  ];

  return {
    subject: `Enquiry: ${context.productName} (${context.sku})`,
    body: `Hello SKY BIRDS,\n\nI would like to enquire about this piece.\n\n${detailLines.join('\n')}\n\nPlease confirm availability and next steps.\n\nThank you.`,
    whatsapp: `Hello SKY BIRDS, I would like to enquire about ${context.productName} (${context.sku}). Size: ${context.size}. Colour: ${context.color}. Product URL: ${context.url}`
  };
}
