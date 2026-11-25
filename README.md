# SKY BIRDS FASHION BD

Premium men's fashion and garment manufacturing showcase — **cinematic homepage implemented on the milestone 1 foundation**.

## Current status

The Next.js foundation, design tokens, shared UI primitives, navigation, footer, tokenized motion utilities and WebGL safety layer are implemented. The homepage includes a full-screen cinematic hero with a priority fashion image baseline, CSS-keyframed entrance sequence, interactive Three.js lookbook cards on all viewports with a static reduced-motion frame, and all ten planned homepage sections. Repository-driven portrait cards float at different depths, tilt/parallax with pointer velocity, lift magnetically near the cursor and move further while the pointer is held down; a rose-gold glow trails the pointer. Motion refinements keep important content readable without JavaScript, gate hover effects to hover-capable devices, and use an accessible deep rose-gold derivative for UI text and focus states.

The sample product catalogue is implemented at `/products` and `/products/<category>`, with URL-backed search, filters and sorting, a mobile filter drawer, animated cards, empty states and premium interactive product detail pages with variant selection, a thumbnail gallery and lightbox. Illustrative standard-license Unsplash imagery is wired across the catalogue, categories, editorial sections, manufacturing process and WebGL fallback; client-supplied craftsmanship photographs appear in the homepage carousel. Final brand photography and confirmed catalogue data are still pending.

Phase 1 QA and SEO hardening is complete: route-level canonical/OG/Twitter metadata, generated social image, JSON-LD, sitemap, robots, 404 hardening, placeholder-safe contact channels, component tests and a production route smoke check. Final results and limitations are recorded in [`docs/18-final-qa-report.md`](docs/18-final-qa-report.md).

Start with [`docs/00-project-overview.md`](docs/00-project-overview.md) and follow the numbered documentation through [`docs/18-final-qa-report.md`](docs/18-final-qa-report.md).

## Brand assets

The supplied official logo is preserved unchanged:

- `public/images/brand/sky-birds-logo-original.jpg` — original, 816 × 819 JPEG

Derived assets:

- `sky-birds-logo.png` — transparent full logo
- `sky-birds-emblem.png` — transparent bird/feather emblem
- `sky-birds-icon.png` — padded emblem for app icons

Legacy aliases (`skybirds-*.png/jpg`) remain for compatibility. Do not redraw, recolor, replace or delete the original logo. See [`docs/04-brand-guidelines.md`](docs/04-brand-guidelines.md).

## Installed stack

- Next.js 16 App Router + TypeScript strict
- Tailwind CSS 3 + shadcn/ui primitives
- Lucide React
- Motion (Framer Motion) + GSAP/ScrollTrigger
- Three.js + React Three Fiber + Drei (lazy, client-only)
- Vitest for unit tests

## Commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify:routes
npm run images:seed
npm run images:seed:illustrations
npm run images:og
```

`verify:routes` requires a completed build and starts a temporary production server on port `4310` (`VERIFY_PORT` overrides it).

All four core verification commands (`lint`, `typecheck`, `test`, `build`) plus `verify:routes` pass on the final phase 1 code. `images:seed` refreshes local WebP imagery from the documented Unsplash sources; `images:seed:illustrations` restores the offline illustrated fallback set; `images:og` regenerates the social preview.

## Scope

Included now:

- Tokenized global design system.
- Reusable brand logo, buttons, containers, section wrappers, headings, animated text, image containers, nav links and product card primitive.
- Sticky responsive navbar with products dropdown and mobile drawer.
- Footer with contact links.
- Tokenized Motion reveals and interactions, GSAP limited to scrubbed parallax/pinning, and a WebGL gate with poster fallback, viewport tiers, idle/intersection gating and context-loss recovery.
- Full homepage: hero, brand introduction, featured collections, new arrivals, signature menswear, manufacturing, craftsmanship, company story, contact CTA and footer.
- Cinematic hero with priority editorial image, staged logo/headline reveal, CSS particles, drifting image layer, tiered pointer-driven WebGL lookbook cards with velocity sway, magnetic lift, drag amplification, trailing glow and a static card poster fallback.
- Motion section reveals, GSAP image parallax with subtle scaling, and desktop horizontal editorial storytelling.
- Sample product catalogue with animated cards, desktop filter rail, mobile filter drawer, URL-synced search/filters/sort and responsive empty states.
- Premium product detail pages with animated variant selection, gallery/lightbox, specifications and direct enquiry links carrying product context.
- About, Manufacturing and Contact pages with placeholder-safe content and direct `mailto:` enquiry composition.
- Illustrative Unsplash imagery across products, categories, homepage hero, featured collections, manufacturing study, editorial sections and the static WebGL fallback, plus a client-supplied craftsmanship carousel.
- Canonical URLs, Open Graph/Twitter metadata, JSON-LD, generated social image, sitemap, robots, branded 404 and production route smoke verification.
- Unit and component tests for SEO, contact, catalogue, product selectors, navigation, logo and WebGL fallback.

Planned later:

- Confirmed photography, catalogue data and verified manufacturing/contact figures.
- Playwright E2E, Lighthouse CI and axe automation once tooling is approved.
- Real-device/cross-browser visual sign-off.

Excluded:

- Cart, checkout, payments.
- Authentication/accounts.
- Backend, CMS, database.
- Order management.

## Documentation index

| File | Topic |
| --- | --- |
| `docs/00-project-overview.md` | Vision and discovery status |
| `docs/01-business-requirements.md` | Business goals and exclusions |
| `docs/02-functional-requirements.md` | Features and behaviors |
| `docs/03-non-functional-requirements.md` | Performance, a11y, quality |
| `docs/04-brand-guidelines.md` | Logo, palette, typography |
| `docs/05-design-system.md` | Tokens and components |
| `docs/06-animation-guidelines.md` | Motion system |
| `docs/07-technical-architecture.md` | Stack and rendering strategy |
| `docs/08-project-structure.md` | Implemented file tree and plan |
| `docs/09-data-model.md` | Types and repository API |
| `docs/10-routing-and-pages.md` | Routes and page duties |
| `docs/11-contact-integration.md` | Contact channels |
| `docs/12-performance-and-accessibility.md` | Budgets and WCAG target |
| `docs/13-testing-strategy.md` | Test plan |
| `docs/14-deployment-guide.md` | Launch process |
| `docs/15-future-backend-integration.md` | Backend seams |
| `docs/16-milestones-and-timeline.md` | Delivery plan |
| `docs/17-task-tracker.md` | Execution checklist |
| `docs/18-final-qa-report.md` | Final QA, limitations and launch readiness |

## Next milestone

Launch sign-off after confirmed contact details, final photography/catalogue and visual approval; an optional backend/CMS phase is described in [`docs/15-future-backend-integration.md`](docs/15-future-backend-integration.md).
