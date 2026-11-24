import { describe, expect, it } from 'vitest';
import {
  buildContactChannels,
  buildMailtoHref,
  buildPhoneHref,
  buildWhatsAppHref,
  hasContactDetails
} from '@/lib/contact';

describe('contact helpers', () => {
  it('builds native contact hrefs', () => {
    expect(buildPhoneHref('+880 1711 000111')).toBe('tel:+8801711000111');
    expect(buildWhatsAppHref('8801711000111', 'Hello SKY BIRDS')).toBe(
      'https://wa.me/8801711000111?text=Hello%20SKY%20BIRDS'
    );
    expect(buildMailtoHref('hello@example.com', 'Enquiry')).toBe(
      'mailto:hello@example.com?subject=Enquiry'
    );
  });

  it('does not invent links when details are missing', () => {
    expect(buildPhoneHref('')).toBe('');
    expect(buildWhatsAppHref('')).toBe('');
    expect(buildMailtoHref('')).toBe('');
    expect(buildContactChannels({ phone: '', whatsapp: '', email: '' }).every((c) => !c.available)).toBe(true);
  });

  it('detects placeholder contact data', () => {
    expect(hasContactDetails('+880XXXXXXXXXX')).toBe(false);
    expect(hasContactDetails('hello@example.com')).toBe(false);
    expect(hasContactDetails('+8801711000111')).toBe(true);
  });
});
