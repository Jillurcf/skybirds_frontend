# 08 — Project Structure

## Root layout

```
SkyBirds/
├── docs/                         # This documentation set
├── public/
│   └── images/
│       ├── brand/                # Logo original + derivatives
│       │   ├── sky-birds-logo-original.jpg
│       │   ├── sky-birds-logo.png
│       │   ├── sky-birds-emblem.png
│   │   ├── sky-birds-icon.png
│   │   ├── sky-birds-og.png            # generated social preview
│   │   └── skybirds-*.jpg/png          # legacy aliases
│       ├── products/             # Product imagery by category
│       ├── categories/           # Category hero imagery
│       └── editorial/            # Hero, homepage, process and fallback imagery
├── scripts/
│   ├── generate-dummy-images.mjs # Offline illustrated fallback
│   ├── generate-og-image.mjs     # 1200×630 Open Graph image
│   ├── seed-unsplash-images.mjs  # Sourced Unsplash WebP seed
│   └── verify-routes.mjs         # Production route/SEO smoke check
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── data/
│   ├── lib/
│   └── types/
├── README.md
├── AGENTS.md
├── package.json                  # Created in Milestone 1
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── components.json               # shadcn/ui config
├── eslint.config.mjs
└── .gitignore
```

## App Router routes

```
src/app/
├── layout.tsx
├── template.tsx
├── globals.css
├── page.tsx                         # /
├── products/
│   ├── page.tsx                     # /products
│   ├── [slug]/page.tsx              # /products/[slug]
│   ├── shirts/page.tsx              # /products/shirts
│   ├── t-shirts/page.tsx            # /products/t-shirts
│   ├── jeans/page.tsx               # /products/jeans
│   ├── trousers/page.tsx            # /products/trousers
│   ├── jackets/page.tsx             # /products/jackets
│   ├── polo-shirts/page.tsx         # /products/polo-shirts
│   └── other/page.tsx               # /products/other
├── about/page.tsx                   # /about
├── manufacturing/page.tsx           # /manufacturing
├── contact/page.tsx                 # /contact
├── not-found.tsx
├── icon.png                         # from sky-birds-icon.png
├── apple-icon.png                   # from sky-birds-icon.png
├── sitemap.ts                       # all public routes
└── robots.ts                        # crawler directives
```

## Component folders

Implemented in Milestone 1:

```
src/components/
├── brand/
│   ├── brand-logo.tsx
│   └── brand-panel.tsx
├── layout/
│   ├── announcement-bar.tsx
│   ├── contact-links.tsx
│   ├── mobile-menu.tsx
│   ├── page-wrapper.tsx
│   ├── route-transition.tsx
│   ├── site-footer.tsx
│   └── site-header.tsx
├── motion/
│   ├── animated-text.tsx
│   ├── horizontal-editorial.tsx
│   ├── motion-provider.tsx
│   ├── parallax-image.tsx
│   ├── particle-field.tsx
│   ├── reveal.tsx
│   └── scroll-reveal.tsx
├── catalog/
│   ├── catalog-explorer.tsx
│   ├── catalog-grid.tsx
│   ├── catalog-page-shell.tsx
│   ├── catalog-product-card.tsx
│   ├── category-catalog.tsx
│   └── filter-controls.tsx
├── product/
│   ├── product-card.tsx
│   ├── product-detail.tsx
│   ├── product-enquiry-links.tsx
│   ├── product-experience.tsx
│   ├── product-gallery.tsx
│   └── product-options.tsx
├── seo/
│   └── structured-data.tsx
├── three/
│   ├── lookbook-canvas.tsx
│   ├── lookbook-poster.tsx
│   ├── webgl-boundary.tsx
│   └── webgl-gate.tsx
└── ui/
    ├── button.tsx
    ├── container.tsx
    ├── dialog.tsx
    ├── dropdown-menu.tsx
    ├── image-container.tsx
    ├── nav-link.tsx
    ├── section-heading.tsx
    ├── section.tsx
    └── sheet.tsx
```

Added for the cinematic homepage:

```
src/components/
├── motion/
│   ├── hero-video-sequence.tsx
│   ├── horizontal-editorial.tsx
│   ├── parallax-image.tsx
│   └── particle-field.tsx
└── sections/
    ├── brand-introduction.tsx
    ├── company-story.tsx
    ├── contact-cta.tsx
    ├── craftsmanship-quality.tsx
    ├── featured-collections.tsx
    ├── hero-reveal.tsx
    ├── home-hero.tsx
    ├── manufacturing-capabilities.tsx
    ├── new-arrivals.tsx
    └── signature-menswear.tsx
```

Added for corporate/manufacturing/contact pages:

```
src/app/
├── about/page.tsx
├── manufacturing/page.tsx
└── contact/page.tsx

src/components/sections/
├── about-craftsmanship.tsx
├── about-cta.tsx
├── about-intro.tsx
├── about-mission-vision.tsx
├── about-philosophy.tsx
├── about-values.tsx
├── contact-details.tsx
├── contact-form.tsx
├── manufacturing-capability-cards.tsx
├── manufacturing-cta.tsx
├── manufacturing-intro.tsx
├── manufacturing-process.tsx
├── manufacturing-quality.tsx
└── page-hero.tsx

src/data/
├── about.ts
├── contact-page.ts
└── manufacturing.ts

src/types/
└── pages.ts
```

Added for the product catalogue: animated grid, filters, selectors, enquiry links and placeholder-safe gallery. Added for PROMPT 05: a client `ProductExperience` island that shares colour/size state across `ProductGallery`, `ProductOptions` and `ProductEnquiryLinks`, plus an accessible `Dialog` lightbox.

Added for final QA:

```
src/
├── test/setup.ts
├── vitest.config.ts
└── components/
    ├── brand/brand-logo.test.tsx
    ├── catalog/catalog-explorer.test.tsx
    ├── layout/contact-links.test.tsx
    ├── layout/route-transition.test.tsx
    ├── layout/site-header.test.tsx
    ├── product/product-options.test.tsx
    └── three/lookbook-poster.test.tsx
```

## Config / data / lib

Implemented in Milestone 1:

```
src/config/
├── animations.ts
├── contact.ts
├── hero-videos.ts
├── navigation.ts
└── site.ts

src/lib/
├── __tests__/
│   ├── catalog.test.ts
│   ├── cn.test.ts
│   ├── color.test.ts
│   ├── contact.test.ts
│   ├── product-enquiry.test.ts
│   ├── product.test.ts
│   ├── repository.test.ts
│   ├── seo.test.ts
│   └── webgl.test.ts
├── animation.ts
├── cn.ts
├── color.ts
├── contact.ts
├── format.ts
├── gsap.ts
├── page-metadata.ts
├── product-enquiry.ts
├── product.ts
├── seo.ts
├── utils.ts
└── webgl.ts

src/types/
├── catalog.ts
├── category.ts
├── content.ts
├── home.ts
└── product.ts
```

Added for homepage and catalogue content:

```
src/data/
├── categories.ts
├── home.ts
└── products.ts

src/lib/
├── animation.ts
├── catalog.ts
├── gsap.ts
├── repository.ts
├── use-isomorphic-layout-effect.ts
└── webgl.ts
```

`getHomeContent()` is the only route into homepage copy. Product and category content is accessed through repository functions; pages do not import raw data. `motion-provider.tsx` remains as an unused legacy component; mounted components read `useReducedMotion()` directly.

## File naming rules

- Components, pages and types: `PascalCase.tsx` / `PascalCase.ts`.
- Utilities, config and data: `kebab-case.ts`.
- Route folders: lowercase, hyphenated (`t-shirts`).
- Assets: `kebab-case` with brand prefix where relevant.

## Import conventions

Use `@/*` alias for `src/*`:

```ts
import { BrandLogo } from '@/components/brand/brand-logo';
import { cn } from '@/lib/utils';
```

## Asset rules

- Original logo is never edited in place.
- Derivative logo files are generated from the original and versioned.
- Product images go in `public/images/products/<category>/`.
- Category and editorial images go in `public/images/categories/` and `public/images/editorial/`, including the wide `hero-fashion.webp` baseline.
- `npm run images:seed` downloads the documented Unsplash photo IDs and exports local WebP files.
- `npm run images:seed:illustrations` regenerates the offline illustrated fallback set.
- Prefer AVIF/WebP exports with descriptive names; keep source files OUT of `public` unless used.

## What is intentionally absent now

- Confirmed product photography and final product catalogue.
- Verified manufacturing figures and final contact details.
- Backend, CMS, database, cart and checkout.
- Playwright, Lighthouse CI and axe runner dependencies.
