# 01 — Business Requirements

## BR-01: Brand positioning

The site must present SKY BIRDS FASHION BD as a premium, sophisticated men's apparel brand with credible manufacturing capability.

**Acceptance criteria**

- Hero and navigation use the supplied logo, not a text substitute.
- Rose gold is used as an accent against ivory, charcoal and white.
- Tone is editorial, concise and confident; no hard-sell copy.
- Manufacturing capability is visible from the homepage and has a dedicated page.

## BR-02: Collection browsing

Visitors must be able to browse apparel by category.

**Categories**

- All Products
- Shirts
- T-Shirts
- Jeans
- Trousers
- Jackets
- Other apparel (extension category)

**Acceptance criteria**

- Dedicated route for each category listed in `10-routing-and-pages.md`.
- Products can be filtered by category from the Products page.
- Empty or sparse categories show an elegant empty state, not a broken grid.

## BR-03: Product exploration

Visitors must be able to inspect a product in detail.

**Acceptance criteria**

- Each product has a detail route with gallery, name, category, description, fabric/care notes, available sizes and colors.
- Size and color controls provide visible selection state.
- Selection does not add to cart or persist an order.
- A clear "Enquire about this piece" CTA opens a contact route or prefilled contact channel.

## BR-04: Contact and conversion

Visitors must be able to contact the company through phone, WhatsApp and email.

**Acceptance criteria**

- Phone links use `tel:`.
- WhatsApp links use `wa.me` with an international-format number.
- Email links use `mailto:`.
- Contact routes are reachable from navbar, footer and product CTA.
- Contact details are centralized in one config file so they are not duplicated.

## BR-05: Manufacturing credibility

The site must communicate manufacturing capability without requiring a backend.

**Acceptance criteria**

- Manufacturing page explains process, quality control, materials, capacity and partnership model.
- Content uses concrete, verifiable claims only. Placeholder metrics must be clearly marked for client confirmation.
- CTA invites B2B enquiries through the same contact channels.

## BR-06: Scope exclusions

The following must **not** be implemented in this phase:

- Cart, checkout, payment, order history.
- Login, registration, password reset, accounts.
- Admin panel, CMS, inventory sync.
- Server-side contact form submission.
- Database or external API dependencies.
- User reviews, wishlists, recommendation engines.

## BR-07: International appearance

The visual language must feel international rather than locally generic.

**Acceptance criteria**

- Editorial typography with strong hierarchy.
- Restrained palette with rose-gold accents.
- Large photographic areas, generous padding, asymmetric grid moments.
- Micro-interactions are subtle and intentional.

## BR-08: Extensibility

The static showcase must be structured so a future backend can replace local data without redesign.

**Acceptance criteria**

- Product/category data accessed through typed repository functions.
- UI components do not import raw data files directly.
- Contact config separated from content config.
- Data model documented in `09-data-model.md`.

## Open business inputs to confirm

| Item | Status | Owner |
| --- | --- | --- |
| Phone number | To be supplied | Client |
| WhatsApp number | To be supplied | Client |
| Email address | To be supplied | Client |
| Office/factory address | To be supplied | Client |
| Business hours | To be supplied | Client |
| Product catalogue and photography | To be supplied | Client |
| Claimed production capacity/certifications | To be verified | Client |
