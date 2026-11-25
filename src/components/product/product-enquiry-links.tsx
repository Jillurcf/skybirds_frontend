import { Mail, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/config/contact';
import { buildMailtoHref, buildPhoneHref, buildWhatsAppHref } from '@/lib/contact';
import {
  buildProductEnquiryContext,
  buildProductEnquiryMessages,
  type ProductEnquirySelection
} from '@/lib/product-enquiry';
import type { Product } from '@/types/product';

interface ProductEnquiryLinksProps {
  product: Product;
  selection?: ProductEnquirySelection;
}

export function ProductEnquiryLinks({ product, selection }: ProductEnquiryLinksProps) {
  const context = buildProductEnquiryContext(product, selection);
  const messages = buildProductEnquiryMessages(context);
  const channels = [
    {
      label: 'Call Now',
      channel: 'phone',
      href: buildPhoneHref(contact.phone),
      icon: Phone,
      variant: 'default' as const,
      external: false,
      available: contact.channels.find((item) => item.icon === 'phone')?.available ?? false
    },
    {
      label: 'WhatsApp Inquiry',
      channel: 'whatsapp',
      href: buildWhatsAppHref(contact.whatsapp, messages.whatsapp),
      icon: MessageCircle,
      variant: 'accent' as const,
      external: true,
      available: contact.channels.find((item) => item.icon === 'whatsapp')?.available ?? false
    },
    {
      label: 'Email Inquiry',
      channel: 'email',
      href: buildMailtoHref(contact.email, messages.subject, messages.body),
      icon: Mail,
      variant: 'outline' as const,
      external: false,
      available: contact.channels.find((item) => item.icon === 'mail')?.available ?? false
    }
  ];

  const missingDetails = channels.every((item) => !item.available || !item.href);

  return (
    <div>
      <div className="flex flex-wrap gap-md" data-contact-context="product">
        {channels.map((item) => {
          const Icon = item.icon;
          const label = `${item.label} about ${product.name} (${product.sku})`;

          if (!item.available || !item.href) {
            return (
              <Button key={item.channel} variant={item.variant} disabled aria-label={label}>
                <Icon aria-hidden="true" />
                {item.label}
              </Button>
            );
          }

          return (
            <Button asChild key={item.channel} variant={item.variant}>
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                data-contact-channel={item.channel}
              >
                <Icon aria-hidden="true" />
                {item.label}
              </a>
            </Button>
          );
        })}
      </div>
      {missingDetails ? (
        <p className="mt-md text-sm text-charcoal/75">Contact details coming soon.</p>
      ) : null}
    </div>
  );
}
