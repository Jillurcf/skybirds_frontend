import type { ContactChannel } from '@/types/content';

interface ContactDetails {
  phone: string;
  whatsapp: string;
  email: string;
}

export function buildPhoneHref(phone: string): string {
  const digits = phone.replace(/[^+\d]/g, '');
  return digits ? `tel:${digits}` : '';
}

export function buildWhatsAppHref(number: string, message = ''): string {
  const digits = number.replace(/\D/g, '');
  if (!digits) return '';

  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${digits}${query}`;
}

export function buildMailtoHref(email: string, subject = '', body = ''): string {
  if (!email) return '';

  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();

  return `mailto:${email}${query ? `?${query}` : ''}`;
}

export function buildContactChannels(details: ContactDetails): ContactChannel[] {
  const channels: ContactChannel[] = [
    {
      label: 'Phone',
      value: details.phone,
      href: buildPhoneHref(details.phone),
      icon: 'phone'
    },
    {
      label: 'WhatsApp',
      value: details.whatsapp,
      href: buildWhatsAppHref(details.whatsapp),
      icon: 'whatsapp'
    },
    {
      label: 'Email',
      value: details.email,
      href: buildMailtoHref(details.email),
      icon: 'mail'
    }
  ];

  return channels.map((channel) => ({ ...channel, available: Boolean(channel.href) }));
}

export function hasContactDetails(value: string | undefined): boolean {
  if (!value) return false;
  return !value.includes('XXXX') && !value.includes('example.com');
}
