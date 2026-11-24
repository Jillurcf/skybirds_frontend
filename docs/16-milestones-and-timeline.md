# 16 — Milestones and Timeline

## Milestone 0 — Discovery and documentation

**Status:** Complete.

Deliverables:

- All 18 docs created.
- README.md and AGENTS.md created.
- Logo inspected and preserved.
- Brand derivative assets created.

Acceptance:

- No UI implementation started.
- Architecture and acceptance criteria documented.

## Milestone 1 — Project foundation

**Status:** Complete. Lint, typecheck, test and production build pass.

Estimated: 1–2 days.

- Initialize Next.js App Router + TypeScript.
- Configure Tailwind, CSS variables, shadcn/ui, Lucide.
- Add ESLint, Prettier, TypeScript strict, Vitest.
- Add config files and base layouts.
- Copy brand assets into app icon slots.

Acceptance:

- `npm run dev`, `lint`, `typecheck`, `build` pass.
- Root layout renders header/footer and logo variants.

## Milestone 2 — Design system and shared layout

**Status:** Partially complete; refinement remains.

Estimated: 2–3 days.

- Tokenized Tailwind theme.
- Button, Reveal, SectionHeading, Logo, ContactLinks.
- SiteHeader with mobile menu.
- SiteFooter.
- Route transition template.

Acceptance:

- Responsive at 320–1440 px.
- Keyboard navigation passes.
- Reduced motion respected.

## Milestone 3 — Data layer and product listing

Estimated: 2–3 days.

- Product/category types and local data.
- Repository functions.
- Products page with URL-backed filter.
- Category pages.
- ProductCard/ProductGrid with hover states.

Acceptance:

- All category routes render.
- Filter query works.
- Empty state works.

## Milestone 4 — Product detail and contact

Estimated: 2–3 days. **Status:** Premium product detail complete; Contact page still pending.

- Dynamic product route with enriched metadata.
- Thumbnail gallery with lightbox and Motion transitions.
- Animated size/colour selectors with variant-aware state.
- Material, fabric, fit and specification rows.
- Product-aware enquiry links and Contact page.

Acceptance:

- Selection states accessible and variant-aware.
- Contact URLs include product context where applicable.
- No cart/checkout behavior.

## Milestone 5 — Editorial pages

Estimated: 2–3 days.

- Homepage sections.
- About page.
- Manufacturing page.
- 404 page.
- SEO metadata, sitemap, robots.

Acceptance:

- All documented pages complete.
- Editorial hierarchy matches brand guidelines.

## Milestone 6 — Motion and WebGL

Estimated: 3–5 days.

- Hero entrance.
- Particles.
- Scroll reveals.
- Parallax.
- Fabric WebGL with dynamic import and fallback.
- WebGL capability detection and error boundary.

Acceptance:

- 60 fps target on mid-range mobile.
- Reduced motion and no-WebGL tested.
- No hydration errors.

## Milestone 7 — QA and launch readiness

Estimated: 2–3 days.

- Unit/component/E2E tests.
- Lighthouse and axe checks.
- Cross-browser/device QA.
- Content/contact placeholders replaced.
- Deployment configured.

Acceptance:

- All checks pass.
- Launch checklist in `14-deployment-guide.md` complete.

## Total estimated duration

Approximately 15–24 working days depending on asset readiness and review cycles.

## Dependencies

- Product photography and verified copy from client.
- Final phone/WhatsApp/email values.
- Visual confirmation of logo derivative crops.
- Access to deployment environment.

## Recommended next milestone

**Milestone 2 — Design system and shared layout refinement**, then Milestone 3 data and listings.
