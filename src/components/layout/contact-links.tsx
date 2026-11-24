import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contact } from '@/config/contact';
import { cn } from '@/lib/utils';
import type { ContactIcon } from '@/types/content';

const icons = {
  phone: Phone,
  whatsapp: MessageCircle,
  mail: Mail,
  'map-pin': MapPin,
  clock: MessageCircle
} satisfies Record<ContactIcon, typeof Phone>;

interface ContactLinksProps {
  context?: 'general' | 'product' | 'footer';
  variant?: 'inline' | 'stack';
  className?: string;
}

export function ContactLinks({ context = 'general', variant = 'inline', className }: ContactLinksProps) {
  const channels = contact.channels.filter((channel) => channel.available && channel.href);

  if (channels.length === 0) {
    return <p className="text-sm text-charcoal/75">Contact details coming soon.</p>;
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-md',
        variant === 'stack' && 'flex-col items-start',
        className
      )}
    >
      {channels.map((channel) => {
        const Icon = icons[channel.icon];
        const external = channel.href.startsWith('http');

        return (
          <Button
            asChild
            key={channel.label}
            variant={channel.icon === 'whatsapp' ? 'accent' : 'outline'}
            size="sm"
            data-contact-channel={channel.icon}
            data-contact-context={context}
          >
            <a
              href={channel.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={channel.value ? `${channel.label}: ${channel.value}` : channel.label}
            >
              <Icon aria-hidden="true" />
              {channel.label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
