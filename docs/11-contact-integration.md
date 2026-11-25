# 11 — Contact Integration

## Scope

No backend, no API route and no form submission service. All contact actions use native links.

## Single source of truth

`src/config/contact.ts` is the only source of truth. Pages and components must import from there. Values come from `NEXT_PUBLIC_*` environment variables with clearly marked placeholders; no live fake links are generated.

```env
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_ADDRESS=
NEXT_PUBLIC_BUSINESS_HOURS=
```

`isPlaceholderContactValue()` marks blank and `To be supplied`/example values as unavailable. `buildContactChannels()` hides unavailable channels, and `ContactLinks` renders a plain "Contact details coming soon." message when none are configured.

## Channel formats

### Phone

```ts
href={`tel:${contact.phone.replace(/\s/g, '')}`}
```

- Display format can be human-readable.
- `href` uses `+` and digits only.

### WhatsApp

```ts
const message = encodeURIComponent('Hello SKY BIRDS, I would like to enquire about...');
href={`https://wa.me/${contact.whatsapp}?text=${message}`};
```

- Number must be international format without `+`, spaces or dashes.
- `target="_blank"` with `rel="noopener noreferrer"`.
- Product enquiries are composed by `buildProductEnquiryMessages()` from `lib/product-enquiry.ts`.
- Every product enquiry includes product name, SKU, selected colour, selected size and product URL.
- Unselected options are shown as `Not selected`; a missing site URL is shown as `Not available`.

### Email

```ts
const subject = encodeURIComponent('Product enquiry — The Atelier Shirt');
href=`mailto:${contact.email}?subject=${subject}&body=${body}`;
```

### Address

- Plain text with optional map link if a verified URL is supplied.
- Do not invent coordinates or map URLs.

## Contact components

| Component | Use |
| --- | --- |
| `ContactLinks` | Reusable phone/WhatsApp/email button group |
| `ContactBand` | Homepage CTA band |
| `ContactCards` | Contact page large action cards |
| `ProductEnquiryLinks` | Product detail Call Now, WhatsApp Inquiry and Email Inquiry actions with prefilled context |

## Optional mailto form

Allowed only if it composes an email client message:

- Fields: name, email, interest, message.
- On submit, build `mailto:` URL and set `window.location.href`.
- Validate required fields client-side.
- Show helper text: "This will open your email app."
- No server calls, no fake success states.

## Missing data handling

Until client values are supplied:

- Use clearly marked placeholders in config.
- Do not create fake clickable numbers.
- Render `Contact details coming soon` for missing channels.
- Keep layout stable so replacement is trivial.

## Analytics consideration

No event tracking in phase 1. Structure `ContactLinks` with data attributes so analytics can be added later:

```tsx
data-contact-channel="whatsapp"
data-contact-context="product"
```

## Acceptance criteria

- All three channels render from config only.
- Product enquiry text includes product name, SKU, selected colour, selected size and product URL.
- Missing channels render no fake links plus "Contact details coming soon" instead.
- Links open correctly on mobile and desktop.
- No duplicate hardcoded contact strings in components.
- Missing values never break the page.
