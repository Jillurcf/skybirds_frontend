import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/config/contact', () => ({
  contact: {
    phone: '+8801711000111',
    whatsapp: '8801711000111',
    email: 'hello@skyybirds.test',
    channels: [
      {
        label: 'Phone',
        value: '+8801711000111',
        href: 'tel:+8801711000111',
        icon: 'phone',
        available: true
      },
      {
        label: 'WhatsApp',
        value: '8801711000111',
        href: 'https://wa.me/8801711000111',
        icon: 'whatsapp',
        available: true
      },
      {
        label: 'Email',
        value: 'hello@skyybirds.test',
        href: 'mailto:hello@skyybirds.test',
        icon: 'mail',
        available: true
      }
    ]
  }
}));

import { ContactLinks } from '@/components/layout/contact-links';
import { contact } from '@/config/contact';

describe('contact links', () => {
  it('renders native phone, WhatsApp and email links with safe external attributes', () => {
    render(<ContactLinks context="product" />);

    expect(screen.getByRole('link', { name: 'Phone: +8801711000111' })).toHaveAttribute(
      'href',
      'tel:+8801711000111'
    );

    const whatsapp = screen.getByRole('link', { name: 'WhatsApp: 8801711000111' });
    expect(whatsapp).toHaveAttribute('href', 'https://wa.me/8801711000111');
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
    expect(whatsapp).toHaveAttribute('data-contact-context', 'product');

    expect(screen.getByRole('link', { name: 'Email: hello@skyybirds.test' })).toHaveAttribute(
      'href',
      'mailto:hello@skyybirds.test'
    );
  });

  it('shows a placeholder message when no channels are configured', () => {
    const original = contact.channels;
    contact.channels = [];
    render(<ContactLinks />);
    expect(screen.getByText('Contact details coming soon.')).toBeInTheDocument();
    contact.channels = original;
  });
});
