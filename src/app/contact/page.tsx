import type { Metadata } from 'next';
import { ContactDetails } from '@/components/sections/contact-details';
import { ContactForm } from '@/components/sections/contact-form';
import { PageHero } from '@/components/sections/page-hero';
import { getContactPageContent } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Contact | SKY BIRDS',
  description:
    'Contact SKY BIRDS FASHION BD for collection enquiries, manufacturing partnerships or general information. Reach us by phone, WhatsApp or email.'
};

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <>
      <PageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
      />
      <ContactDetails content={content.intro} />
      <ContactForm content={content.form} />
    </>
  );
}
