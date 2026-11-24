# 10 — Routing and Pages

## Route table

| Path | Page | Rendering | Notes |
| --- | --- | --- | --- |
| `/` | Homepage | Server + client islands | Hero, categories, featured, story, manufacturing teaser, contact |
| `/products` | All products | Server + client filter | Query: `q`, `category`, `size`, `color`, `sort` |
| `/products/[slug]` | Product detail | Server + client selectors | `generateStaticParams` + `generateMetadata` |
| `/products/shirts` | Shirts collection | Reuses listing | Fixed category |
| `/products/t-shirts` | T-Shirts collection | Reuses listing | Fixed category |
| `/products/jeans` | Jeans collection | Reuses listing | Fixed category |
| `/products/trousers` | Trousers collection | Reuses listing | Fixed category |
| `/products/jackets` | Jackets collection | Reuses listing | Fixed category |
| `/about` | About Us | Server + reveals | Full logo brand panel |
| `/manufacturing` | Manufacturing | Server + reveals | Process and capability |
| `/contact` | Contact | Server + client optional | Phone/WhatsApp/email |
| `*` | Not found | Static | Branded 404 |

## Navigation model

Navbar primary links:

```
Home
Products
Shirts
T-Shirts
Jeans
Trousers
Jackets
About
Manufacturing
Contact
```

Desktop may group apparel under a "Collections" dropdown, but direct routes must remain keyboard reachable.

Footer links mirror primary navigation plus legal/placeholder links only if content exists.

## URL rules

- Lowercase, hyphenated paths.
- No trailing slash inconsistency.
- Category query values use slugs: `?category=t-shirts`.
- `size` and `color` accept comma-separated values; unknown values are ignored.
- `sort` accepts `featured`, `name-asc`, `name-desc` and `sku-asc`.
- Unknown query values fall back to all products.
- Product slugs are stable, human-readable strings.

## Page responsibilities

### Homepage

Implemented sections in order:

1. Full-screen cinematic hero with actual logo reveal and interactive WebGL lookbook cards with a static poster fallback.
2. Brand introduction with full logo panel.
3. Featured collection families from the documented category list.
4. New arrivals framed with illustrative Unsplash imagery pending confirmed photography.
5. Signature menswear editorial study with desktop horizontal scroll.
6. Manufacturing capability process overview without unverified metrics.
7. Craftsmanship and quality split with GSAP parallax.
8. Company story with full logo panel.
9. Contact CTA using only configured direct channels.
10. Global site footer.

Hero CTAs target `#collections` and `#craftsmanship`; collection links target the product routes.

### Products

- Animated `CatalogGrid` with illustrative Unsplash catalogue imagery.
- URL-backed search, category, size, colour and sort filters.
- Desktop filter rail and mobile filter drawer.
- Accessible empty state for no matches.

### Category pages

- Dedicated hero with category image, name and description.
- Same `CatalogGrid` as Products, fixed to category.
- Link back to all products; navigation cross-links to other categories.

### Product detail

- Breadcrumb.
- Two-column editorial layout: gallery left, product information right.
- Placeholder-safe gallery with multiple views, thumbnails, previous/next controls and an accessible lightbox.
- Title, SKU, description, material, fabric, fit, specifications and care information.
- Native radio groups for colour and size; colour selection updates the gallery, selected colour name and variant size availability.
- Unavailable sizes remain visible with muted/struck-through styling and `aria-disabled`.
- Direct phone/WhatsApp/email enquiry actions include product name, SKU, selected colour, selected size and product URL.
- Related products from the same category with staggered Motion transitions.
- `generateStaticParams` and `generateMetadata` provide static routes, canonical URLs and Open Graph/Twitter metadata.

### About

- Brand story, values, full logo panel, editorial imagery.

### Manufacturing

- Process steps, capability cards, quality statement, B2B CTA.

### Contact

- Large direct action cards for phone, WhatsApp, email.
- Address/hours when supplied.
- Optional `mailto:` enquiry form only.

## Metadata per route

| Route | Title pattern |
| --- | --- |
| `/` | `SKY BIRDS FASHION BD — Premium Menswear & Manufacturing` |
| `/products` | `Collections | SKY BIRDS` |
| Category | `{Category} | SKY BIRDS` |
| Product | `{Product Name} | SKY BIRDS` |
| `/about` | `About Us | SKY BIRDS` |
| `/manufacturing` | `Manufacturing | SKY BIRDS` |
| `/contact` | `Contact | SKY BIRDS` |

## Redirection rules

- No redirects required in phase 1.
- If a product slug changes, add a permanent redirect in `next.config.ts` to preserve links.

## Accessibility of routing

- Active link uses `aria-current="page"`.
- Route transitions must not steal focus unexpectedly.
- Skip link targets `main` on each page.
- 404 includes navigation back home and to products.
