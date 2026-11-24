import { buildContactChannels } from '@/lib/contact';
import type { ContactConfig } from '@/types/content';

const phone = '';
const whatsapp = '';
const email = '';

export const contact: ContactConfig = {
  phone,
  whatsapp,
  email,
  address: '',
  hours: '',
  channels: buildContactChannels({ phone, whatsapp, email })
};
