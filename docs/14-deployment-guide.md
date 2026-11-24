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
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
```

- Set values in hosting dashboard, not in source.
- `NEXT_PUBLIC_SITE_URL` drives canonical and sitemap URLs.
- No secret keys required for phase 1.

## Build commands

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

## Deployment flow

1. Push changes to main branch.
2. CI installs dependencies and runs checks.
3. Production build is generated.
4. Preview deployment is reviewed.
5. Promote to production after QA sign-off.

## Static assets

- Confirm `public/images/brand/` contains all four brand assets.
- Confirm `src/app/icon.png` and `apple-icon.png` are copied from `sky-birds-icon.png`.
- Confirm product images are optimized and correctly named.

## Launch checklist

- [ ] Contact details replaced from placeholders.
- [ ] Metadata and canonical URL correct.
- [ ] `robots.txt` and sitemap generated.
- [ ] 404 page tested.
- [ ] Logo renders in navbar/footer/favicon.
- [ ] All routes visited manually.
- [ ] Mobile menu tested on real device.
- [ ] Reduced motion tested.
- [ ] WebGL fallback tested.
- [ ] Lighthouse run on home and product detail.
- [ ] Analytics not required / deferred intentionally.
- [ ] No console errors.

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
