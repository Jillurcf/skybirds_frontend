# AGENTS.md — Repository Instructions

## Project

SKY BIRDS FASHION BD is a premium men's apparel showcase and manufacturing website. Current phase: **Milestone 1 foundation complete**. Shared UI and motion foundations exist; full pages are not implemented yet.

## Read first

1. `README.md`
2. `docs/00-project-overview.md`
3. `docs/04-brand-guidelines.md`
4. `docs/07-technical-architecture.md`
5. `docs/17-task-tracker.md`

Read the specific numbered doc relevant to any change before editing code or docs.

## Hard rules

- Do not modify, delete, recolor, redraw or replace the supplied logo.
- Canonical original: `public/images/brand/sky-birds-logo-original.jpg`.
- Legacy original alias: `public/images/brand/skybirds-logo-original.jpg`.
- Do not recreate the bird/feather emblem with text, emoji or unrelated icons.
- Rose gold `#B98270` is an accent, not a page background.
- No cart, checkout, payment, authentication, backend, database or CMS in phase 1.
- No server-side contact form. Use `tel:`, WhatsApp `wa.me` and `mailto:`.
- Do not build all pages during the foundation milestone. Follow milestone scope in `docs/17-task-tracker.md`.
- Do not commit unless explicitly asked.

## Code conventions

- Next.js App Router, TypeScript strict, Tailwind CSS 3, shadcn/ui.
- Server Components by default; Client Components only when needed.
- Use `@/*` imports from `src/*`.
- Components: `PascalCase.tsx`; config/data/utilities: `kebab-case.ts`.
- Keep contact details in `src/config/contact.ts` only.
- Access content through `src/lib/repository.ts`; never import raw data directly in pages.
- Use design tokens from `docs/05-design-system.md`; avoid hard-coded colors.
- Use `cn()` from `@/lib/utils` for class composition.
- Do not add code comments unless requested.

## Motion and 3D rules

- Respect `prefers-reduced-motion`.
- Provide static/fallback experience when WebGL is unavailable.
- Dynamically import Three.js/R3F components; never SSR them.
- Cap DPR, pause off-screen rendering, dispose resources on unmount.
- Prefer `transform` and `opacity` animations.
- Use GSAP ScrollTrigger with proper cleanup via `gsap.context`.

## Accessibility rules

- WCAG 2.2 AA target.
- One `h1` per page, semantic landmarks, logical heading order.
- Visible focus rings on all interactive elements.
- Accessible names for icon buttons, swatches and selectors.
- Touch targets at least 44 × 44 px.
- Decorative motion/3D marked `aria-hidden`.

## Documentation maintenance

- Any architecture, design, data or behavior change must update the relevant doc.
- Update `docs/17-task-tracker.md` at milestone boundaries.
- Keep placeholder contact data clearly marked until confirmed by the client.

## Verification expectations

Before declaring work complete, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

All four commands exist and pass after Milestone 1.

## Current known gaps

- Final contact details not supplied.
- Product catalogue and photography not supplied.
- Product, category and listing pages not implemented.
- Derivative logo crops still need visual confirmation against the original.
