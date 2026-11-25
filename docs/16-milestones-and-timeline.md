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

**Status:** Complete for phase 1; real-device QA remains a launch limitation.

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

**Status:** Complete for sample data; final catalogue and photography pending.

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

Estimated: 2–3 days. **Status:** Complete; contact values remain placeholder-safe until client confirmation.

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

**Status:** Complete, including sitemap, robots and route-level SEO.

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

**Status:** Implementation and automated fallback tests complete; device/WebGL performance QA pending.

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

**Status:** Code and automated QA complete; external sign-offs remain blocked on client assets and browser tooling.

Estimated: 2–3 days.

- Unit and component tests.
- Production route/SEO smoke verification.
- Responsive structure audit across 320, 375, 768, 1024 and 1440 px breakpoints.
- Vercel deployment configuration and environment variable contract.
- Final QA report and known limitations documented.

Acceptance:

- `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` and `npm run verify:routes` pass.
- Launch checklist in `14-deployment-guide.md` distinguishes verified items from pending client/browser sign-offs.
- No cart, checkout, backend or server form introduced.

## Total estimated duration

Approximately 15–24 working days depending on asset readiness and review cycles.

## Dependencies

- Product photography and verified copy from client.
- Final phone/WhatsApp/email values.
- Visual confirmation of logo derivative crops.
- Access to deployment environment.

## Recommended next milestone

Launch sign-off once contact details, final photography/catalogue and verified manufacturing data are supplied, followed by an optional future backend/CMS milestone described in `15-future-backend-integration.md`.
