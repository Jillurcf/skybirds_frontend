# 14 — Deployment Guide

## Target platform

Vercel-compatible Next.js hosting is the default target. Any Node-compatible host supporting Next.js output can also be used.

## Prerequisites

- Node.js LTS (20+ recommended)
- pnpm or npm
- Git repository
- Domain/DNS access
- Verified contact details before launch

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=https://skyybirds.example
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_ADDRESS=
NEXT_PUBLIC_BUSINESS_HOURS=
```

- Set values in the Vercel project dashboard, not in source.
- `NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonical URLs, Open Graph URLs and sitemap URLs. Vercel's `VERCEL_URL` is used when the explicit value is absent.
- Blank/example values are treated as placeholders and hidden from live contact links.
- No secret keys are required for phase 1.
- Project settings: Framework `Next.js`, build command `npm run build`, output directory default, Node.js 20+.
- After setting env vars, redeploy so metadata and sitemap URLs are regenerated.

## Build commands

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify:routes
```

`npm run images:og` regenerates the social preview if brand assets change. `npm run verify:routes` requires a completed build and starts a temporary production server on port `4310` (override with `VERIFY_PORT`).

## Deployment flow

1. Push changes to main branch.
2. CI installs dependencies and runs checks.
3. Production build is generated.
4. Preview deployment is reviewed.
5. Promote to production after QA sign-off.

## Static assets

- Confirm `public/images/brand/` contains the original, full logo, emblem, icon and `sky-birds-og.png`.
- Confirm `src/app/icon.png` and `apple-icon.png` are copied from `sky-birds-icon.png`.
- Confirm product images are optimized and correctly named.
- Do not edit or replace the supplied original logo.

## Launch checklist

- [x] Metadata and canonical URL verified by route smoke test.
- [x] `robots.txt` and sitemap generated and verified.
- [x] 404 page tested by route smoke test.
- [x] Logo renders in navbar/footer/favicon via component tests.
- [x] All 26 public routes checked against the production server.
- [x] Mobile drawer structure and links tested in jsdom.
- [x] Reduced-motion and WebGL poster fallbacks covered by unit/component tests.
- [x] Analytics intentionally deferred; no console errors in automated checks.
- [ ] Contact details replaced from env placeholders after client confirmation.
- [ ] Mobile menu tested on a real device.
- [ ] Lighthouse run on home and product detail.
- [ ] axe scan and manual WCAG 2.2 AA sign-off.
- [ ] Cross-browser visual QA.
- [ ] Derivative logo crops visually confirmed against the original.

## Rollback

- Hosting platforms can instantly promote the previous successful deployment.
- Keep production build artifacts or commit tags for rollback reference.
- Data is local; rollback does not require migration.

## Domain and SEO

- Configure www/non-www redirect consistently.
- Enable HTTPS.
- Submit sitemap to search consoles after launch.
- Verify Open Graph preview with social debuggers.

## Monitoring

Phase 1 does not require application monitoring. Recommended later:

- Hosting web vitals dashboard.
- Basic error reporting.
- Privacy-friendly analytics if the client approves.
