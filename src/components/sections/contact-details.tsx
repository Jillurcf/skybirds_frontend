import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { contact } from '@/config/contact';
import { hasContactDetails } from '@/lib/contact';
import type { ContactIcon } from '@/types/content';
import type { ContactPageContent } from '@/types/pages';

const icons = {
  phone: Phone,
  whatsapp: MessageCircle,
  mail: Mail,
  'map-pin': MapPin,
  clock: Clock
} satisfies Record<ContactIcon, typeof Phone>;

interface ContactDetailsProps {
  content: ContactPageContent['intro'];
}

export function ContactDetails({ content }: ContactDetailsProps) {
  const actionChannels = contact.channels;
  const infoItems = [
    {
      label: 'Address',
      value: contact.address ?? '',
      href: '',
      icon: 'map-pin' as const,
      description: 'Office or factory location'
    },
    {
      label: 'Business hours',
      value: contact.hours ?? '',
      href: '',
      icon: 'clock' as const,
      description: 'When our team is available'
    }
  ];

  return (
    <Section id="contact-details" className="border-y border-champagne">
      <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
      <div className="mt-2xl grid gap-lg lg:grid-cols-3">
        {actionChannels.map((channel, index) => {
          const Icon = icons[channel.icon];
          const available = Boolean(channel.available && channel.href);
          const external = channel.href.startsWith('http');

          return (
            <Reveal key={channel.label} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col border border-champagne bg-canvas p-xl">
                <div className="flex h-12 w-12 items-center justify-center border border-champagne text-rose-gold-deep">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="eyebrow mt-lg">{channel.label}</p>
                <p className="mt-md min-h-[3rem] text-base leading-relaxed text-charcoal/72">
                  {available ? channel.value : 'Contact details coming soon.'}
                </p>
                {available ? (
                  <Button
                    asChild
                    variant={channel.icon === 'whatsapp' ? 'accent' : 'outline'}
                    className="mt-lg w-full sm:w-auto"
                    data-contact-channel={channel.icon}
                    data-contact-context="contact-page"
                  >
                    <a
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      aria-label={`${channel.label}: ${channel.value}`}
                    >
                      {channel.label === 'Phone' ? 'Call now' : channel.label === 'WhatsApp' ? 'Message on WhatsApp' : 'Send email'}
                    </a>
                  </Button>
                ) : (
                  <p className="mt-lg text-xs uppercase tracking-editorial text-charcoal/75">
                    Details will be added when confirmed
                  </p>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-xl grid gap-lg md:grid-cols-2">
        {infoItems.map((item, index) => {
          const Icon = icons[item.icon];
          const available = hasContactDetails(item.value);

          return (
            <Reveal key={item.label} delay={0.08 * index} className="h-full">
              <div className="flex h-full gap-md border border-champagne bg-ivory/50 p-lg">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-champagne text-rose-gold-deep">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-editorial text-charcoal/75">{item.label}</p>
                  <p className="mt-sm text-sm leading-relaxed text-charcoal/75">
                    {available ? item.value : 'Details coming soon.'}
                  </p>
                  <p className="mt-sm text-xs text-charcoal/75">{item.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-xl text-sm text-charcoal/75">
        Enquiries are handled directly by the SKY BIRDS team through the channels above.
      </p>
    </Section>
  );
}
