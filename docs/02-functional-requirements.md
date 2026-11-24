# 02 — Functional Requirements

## FR-01: Global navigation

- Sticky navbar with compact emblem/logo lockup on the left.
- Desktop links: Home, Products, Shirts, T-Shirts, Jeans, Trousers, Jackets, About, Manufacturing, Contact.
- Mobile: hamburger opens a full-screen or drawer menu with the same routes.
- Active route indicator using rose-gold underline or pill.
- Navbar transitions from transparent-over-hero to solid ivory/charcoal on scroll.
- All links must work with keyboard and screen readers.

## FR-02: Homepage

Sections in order:

1. Cinematic hero with brand reveal and primary CTA.
2. Category rail with apparel categories.
3. Featured products grid.
4. Editorial brand story split section.
5. Manufacturing capability teaser.
6. Process/materials strip.
7. Contact CTA band.
8. Footer.

Each section must be independently renderable and independently testable.

## FR-03: Products listing

- Grid of all products with category filter.
- Filter state reflected in URL query string (for example `?category=shirts`) so views are shareable.
- Hover/focus reveals secondary product image or subtle zoom.
- Each card links to `/products/[slug]`.
- Category pages are dedicated routes and reuse the same listing component with a fixed category.

## FR-04: Product detail

- Breadcrumb: Home / Products / Category / Product.
- Two-column detail layout with a gallery on the left and information on the right.
- Gallery with multiple placeholder/photography views, thumbnails, previous/next controls and a lightbox.
- Size selector: available sizes clickable, unavailable sizes disabled with clear label.
- Color selector: swatches with accessible names; selected state shown by ring/checkmark.
- Colour selection updates the image set when variant images exist, the selected colour name and size availability where variants differ.
- Specifications include material, fabric, fit, collection and care.
- Enquiry actions for Call Now, WhatsApp Inquiry and Email Inquiry include product name, SKU, selected size, selected colour and product URL.
- Related products from the same category.
- No cart, inventory mutation, checkout or persisted selection required.

## FR-05: About Us

- Brand narrative, values, design philosophy.
- Use full logo in an editorial brand panel.
- Timeline/story sections with scroll-triggered reveals.
- Link to Manufacturing and Contact.

## FR-06: Manufacturing

- Capability overview, process steps, quality assurance, materials and partnerships.
- Process steps rendered as a numbered editorial sequence.
- B2B enquiry CTA.

## FR-07: Contact

- Phone, WhatsApp and email actions.
- Office/factory address and hours if supplied.
- Optional contact form UI is allowed only if it uses `mailto:` composition; no server endpoint.
- Clear note that enquiries are handled directly by the team.

## FR-08: Motion behavior

- Hero entrance: staggered logo/emblem, headline and CTA reveal.
- Floating particles: subtle, low-density, non-blocking.
- Fabric visual: CSS/SVG fallback plus optional WebGL layer.
- Scroll reveals for sections and cards.
- Parallax on selected imagery only.
- Product hover: image scale and accent underline.
- Color/size selection transitions: ring, fill and micro-scale.
- All motion disabled/reduced under `prefers-reduced-motion`.

## FR-09: WebGL behavior

- Heavy 3D components dynamically imported with `ssr: false`-equivalent client boundary.
- WebGL detection before mount.
- Context loss and error boundary handling.
- Static poster/fallback for unsupported devices.
- 3D never blocks text or primary actions.

## FR-10: SEO and metadata

- Per-page title and description.
- Open Graph metadata with brand imagery where practical.
- Canonical site URL configured from environment.
- Semantic headings (`h1` once per page).
- Sitemap and robots definitions after routes exist.

## FR-11: Error states

- `not-found.tsx` for unknown product/page routes.
- Graceful empty category state.
- Image loading fallback with branded placeholder.
- Contact config missing state must not crash the app.

## FR-12: Analytics

- No analytics required in discovery phase.
- Structure should allow later analytics injection without component rewrites.
