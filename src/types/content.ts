export type ContactIcon = 'phone' | 'whatsapp' | 'mail' | 'map-pin' | 'clock';

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
  available?: boolean;
}

export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address?: string;
  hours?: string;
  channels: ContactChannel[];
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface EditorialImage {
  src: string;
  alt: string;
  placeholderColor?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export interface Capability {
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}
