import { buildContactChannels } from '@/lib/contact';
import type { ContactConfig } from '@/types/content';

const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() ?? '';
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? '';
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? '';

export const contact: ContactConfig = {
  phone,
  whatsapp,
  email,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() ?? '',
  hours: process.env.NEXT_PUBLIC_CONTACT_HOURS?.trim() ?? '',
  channels: buildContactChannels({ phone, whatsapp, email })
};
