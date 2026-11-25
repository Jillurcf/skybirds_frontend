# 17 — Task Tracker

Legend: `[ ]` pending · `[x]` complete · `[~]` in progress · `[!]` blocked.

## Milestone 0 — Discovery and documentation

- [x] Inspect project directory.
- [x] Inspect supplied logo metadata (`816×819`, JPEG, grey background).
- [x] Preserve original logo at `public/images/brand/sky-birds-logo-original.jpg` (legacy alias retained).
- [x] Create canonical `sky-birds-logo.png` and `sky-birds-emblem.png` derivatives.
- [x] Prepare transparent full logo variant.
- [x] Prepare emblem variant.
- [x] Prepare favicon/app icon variant.
- [x] Create `docs/00-project-overview.md`.
- [x] Create `docs/01-business-requirements.md`.
- [x] Create `docs/02-functional-requirements.md`.
- [x] Create `docs/03-non-functional-requirements.md`.
- [x] Create `docs/04-brand-guidelines.md`.
- [x] Create `docs/05-design-system.md`.
- [x] Create `docs/06-animation-guidelines.md`.
- [x] Create `docs/07-technical-architecture.md`.
- [x] Create `docs/08-project-structure.md`.
- [x] Create `docs/09-data-model.md`.
- [x] Create `docs/10-routing-and-pages.md`.
- [x] Create `docs/11-contact-integration.md`.
- [x] Create `docs/12-performance-and-accessibility.md`.
- [x] Create `docs/13-testing-strategy.md`.
- [x] Create `docs/14-deployment-guide.md`.
- [x] Create `docs/15-future-backend-integration.md`.
- [x] Create `docs/16-milestones-and-timeline.md`.
- [x] Create `docs/17-task-tracker.md`.
- [x] Create `README.md`.
- [x] Create `AGENTS.md`.

## Milestone 1 — Project foundation

**Status:** Complete. `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build` pass.

- [x] Initialize Next.js 16 App Router with TypeScript strict.
- [x] Add Tailwind CSS 3 and semantic CSS variables.
- [x] Add shadcn/ui with brand-themed primitives (button, sheet, dropdown menu).
- [x] Add Lucide React.
- [x] Add Motion, GSAP and ScrollTrigger lazy registration.
- [x] Add Three.js, R3F and Drei dependencies with lazy WebGL gate.
- [x] Configure ESLint, Prettier and TypeScript strict.
- [x] Configure Vitest with initial utility tests.
- [x] Create `src/config` files.
- [x] Copy icon assets to `src/app/icon.png` and `apple-icon.png`.
- [x] Verify lint/typecheck/test/build.
- [x] Verify production server serves homepage and brand assets.

## Milestone 2 — Shared layout and design system

**Status:** Partially complete; refinement and deeper QA remain.

- [x] `BrandLogo` component with full/emblem/icon variants.
- [x] `SiteHeader` with desktop nav, products dropdown and mobile drawer.
- [x] `SiteFooter`.
- [x] `Button`, `SectionHeading`, `Reveal`, `AnimatedText`, `Section`, `Container`, `ImageContainer`.
- [x] `ContactLinks`.
- [x] Route transition template.
- [x] Responsive structure and keyboard QA (breakpoint audit and jsdom navigation tests; real-device sign-off pending).

## Milestone 3 — Data and listings

**Status:** Complete for sample data; final catalogue and photography pending.

- [x] Product/category types.
- [x] Local product data with placeholder-safe entries.
- [x] Repository functions.
- [x] Products page with URL filter.
- [x] Category routes.
- [x] `CatalogGrid` and animated catalog card.
- [x] Empty state.

## Milestone 4 — Detail and contact

**Status:** Complete. Product detail and contact page implemented; contact values remain placeholder-safe until client confirmation.

- [x] Dynamic product route.
- [x] `generateStaticParams` and enriched `generateMetadata`.
- [x] Placeholder-safe multi-view gallery with thumbnails, keyboard navigation and lightbox.
- [x] Motion gallery crossfades, section entrances and related product transitions.
- [x] Animated colour selection with variant image and selected colour name updates.
- [x] Size selection with active state and clearly distinguished unavailable sizes.
- [x] Material, fabric, fit and specification rows.
- [x] Call Now, WhatsApp Inquiry and Email Inquiry actions with product name, SKU, selection and URL.
- [x] Responsive two-column detail layout and accessible radio groups.
- [x] No Three.js canvas added to product detail; placeholder states are sufficient.
- [x] Contact page.
- [x] Optional mailto form.

## Milestone 5 — Editorial pages

- [x] Homepage hero and all ten homepage sections.
- [x] Featured collections.
- [x] Signature menswear editorial study.
- [x] Manufacturing teaser.
- [x] Craftsmanship and quality split.
- [x] Company story.
- [x] Contact CTA band.
- [x] About page.
- [x] Manufacturing page.
- [x] Not found page.
- [x] sitemap/robots with canonical URLs and generated OG image.

## Milestone 6 — Motion and WebGL

**Status:** Implementation complete; device, Lighthouse and WebGL QA pending.

- [x] Hero entrance sequence with tokenized timings and noscript fallback.
- [x] ParticleField with finite motion and mobile count reduction.
- [x] Motion-based scroll reveals with readable no-JS state.
- [x] ParallaxImage with subtle scaling and GSAP matchMedia cleanup.
- [x] Desktop horizontal editorial storytelling with stacked fallback.
- [x] FabricPoster (original fabric study; superseded by `LookbookPoster`).
- [x] FabricCanvas with R3F/Drei, disposal and frameloop pausing (superseded by `LookbookCanvas`).
- [x] Interactive hero fabric: pointer-driven sheen/lift/parallax and tap ripple (superseded).
- [x] Clearer fabric read: drape folds, crossed weave and travelling light sweep (superseded).
- [x] Interactive hero lookbook cards: repository imagery, velocity sway, magnetic lift, drag amplification, trailing glow, tap pulse and static poster fallback.
- [x] Tiered WebGL detection, intersection gating and deferred mount.
- [x] Error boundary, context loss fallback and quality-change recovery.
- [x] Tokenized route, menu, hover, selection and gallery transitions.
- [x] Hover-only transforms gated to hover-capable devices.
- [x] Accessible deep rose-gold UI accent and focus states.
- [x] WebGL quality-tier and fallback unit tests.
- [x] Reduced motion matrix verification (implementation and unit/component coverage complete; device QA pending).

## Milestone 7 — QA and launch

**Status:** Automated QA and launch configuration complete; client assets and browser-tool sign-offs remain pending.

- [x] Hero visual correction: CSS entrance animation and low-tier/static-frame WebGL on all viewports.
- [x] Silent video-only hero background with six local clips, overlapping CSS crossfade and charcoal no-video fallback.
- [x] Repository-driven imagery for featured collections and the manufacturing study.
- [x] Unit tests (utilities, SEO, repository, catalog filters/search/sort/URL state, variants, WebGL helpers).
- [x] Component tests (logo, navbar/mobile drawer, catalog, product selectors, contact links, route transition, WebGL poster).
- [x] Lint, typecheck, 52 tests, production build and production route smoke test.
- [x] SEO metadata, canonical URLs, generated OG image, sitemap, robots and 404 hardening.
- [x] Placeholder-safe contact env contract and disabled fake links.
- [x] Catalog SSR grid and URL sync refinement; locked category and variant-aware size filtering fixed.
- [x] WebGL texture-load failure fallback and accessible gallery live region.
- [x] Responsive structure audit at 320/375/768/1024/1440 px breakpoints.
- [x] Vercel deployment configuration and final QA report (`docs/18-final-qa-report.md`).
- [ ] Playwright journeys (tooling not installed).
- [ ] Lighthouse budgets (tooling not installed).
- [ ] axe accessibility scan (tooling not installed).
- [ ] Cross-browser and real-device QA.
- [ ] Replace placeholder contact details after client confirmation.
- [~] Verify product imagery visually against final brand photography.
- [ ] Visual confirmation of derivative logo crops.

## Blocked / awaiting client input

- [!] Final phone number.
- [!] Final WhatsApp number.
- [!] Final email address.
- [!] Office/factory address.
- [!] Business hours.
- [!] Product photography.
- [!] Final product catalogue.
- [!] Verified manufacturing metrics/certifications.
- [~] Visual confirmation of derivative logo crops against supplied original.
- [!] Playwright/Lighthouse/axe tooling approval for automated browser sign-off.
