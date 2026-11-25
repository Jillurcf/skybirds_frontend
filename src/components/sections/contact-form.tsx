'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { contact } from '@/config/contact';
import { buildMailtoHref, hasContactDetails } from '@/lib/contact';
import type { ContactPageContent } from '@/types/pages';

interface ContactFormProps {
  content: ContactPageContent['form'];
}

interface FormValues {
  name: string;
  email: string;
  interest: string;
  message: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  interest: 'General enquiry',
  message: ''
};

export function ContactForm({ content }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState('');
  const emailAvailable = hasContactDetails(contact.email);

  const onChange = (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!values.message.trim()) nextErrors.message = 'Please enter your message.';
    return nextErrors;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!emailAvailable) return;

    const subject = `SKY BIRDS enquiry — ${values.interest}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Interest: ${values.interest}`,
      '',
      'Message:',
      values.message.trim()
    ].join('\n');

    const href = buildMailtoHref(contact.email, subject, body);
    if (href) {
      setStatus('Your email app should open with the message ready to send.');
      window.location.href = href;
    }
  };

  const inputClass =
    'min-h-11 w-full border border-champagne bg-canvas px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/75 focus:border-rose-gold-deep focus:outline-none focus:ring-2 focus:ring-rose-gold-deep';

  return (
    <Section id="contact-form">
      <div className="grid gap-2xl lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} reveal={false} />
          <p className="mt-lg max-w-md text-sm leading-relaxed text-charcoal/75">
            This will open your email app. No message is sent automatically by this website.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="border border-champagne bg-canvas p-lg md:p-xl" noValidate>
            <div className="grid gap-md sm:grid-cols-2">
              <label className="flex flex-col gap-sm text-sm text-charcoal/75">
                <span>Name <span className="text-rose-gold-deep">*</span></span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange('name')}
                  className={inputClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name ? <span id="contact-name-error" className="text-xs text-rose-gold-deep">{errors.name}</span> : null}
              </label>
              <label className="flex flex-col gap-sm text-sm text-charcoal/75">
                <span>Email <span className="text-rose-gold-deep">*</span></span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={onChange('email')}
                  className={inputClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email ? <span id="contact-email-error" className="text-xs text-rose-gold-deep">{errors.email}</span> : null}
              </label>
            </div>
            <label className="mt-md flex flex-col gap-sm text-sm text-charcoal/75">
              <span>Interest</span>
              <select name="interest" value={values.interest} onChange={onChange('interest')} className={inputClass}>
                <option>General enquiry</option>
                <option>Product enquiry</option>
                <option>Manufacturing partnership</option>
                <option>Sampling and development</option>
                <option>Other</option>
              </select>
            </label>
            <label className="mt-md flex flex-col gap-sm text-sm text-charcoal/75">
              <span>Message <span className="text-rose-gold-deep">*</span></span>
              <textarea
                name="message"
                rows={6}
                value={values.message}
                onChange={onChange('message')}
                className={`${inputClass} min-h-[160px] resize-y`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message ? <span id="contact-message-error" className="text-xs text-rose-gold-deep">{errors.message}</span> : null}
            </label>
            <div className="mt-lg flex flex-col gap-md sm:flex-row sm:items-center">
              <Button type="submit" variant="accent" size="lg" disabled={!emailAvailable}>
                Open email app
              </Button>
              {!emailAvailable ? (
                <p className="text-sm text-charcoal/75">Email details coming soon.</p>
              ) : null}
              <p aria-live="polite" className="text-sm text-charcoal/75">
                {status}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
