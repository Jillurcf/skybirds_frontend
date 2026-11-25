# 18 — Final QA and Launch Report

## Scope

Final QA covers the phase 1 showcase: homepage, catalogue, category routes, product detail, About, Manufacturing, Contact, 404, SEO routes, shared layout, motion/WebGL fallbacks and Vercel-ready configuration. No cart, checkout, authentication, backend, database, CMS or server-side contact form was added.

## Verification results

| Check | Command | Result |
| --- | --- | --- |
| Lint | `npm run lint` | Passed with no output |
| Types | `npm run typecheck` | Passed with no output |
| Tests | `npm run test` | 16 files, 52 tests passed |
| Production build | `npm run build` | Passed; 32 static pages generated; no `metadataBase` warning |
| Route/SEO smoke | `npm run verify:routes` | 26 public routes plus 404, `robots.txt` and `sitemap.xml` verified |

The production build output includes `/`, `/products`, seven category routes, 14 product routes, About, Manufacturing, Contact, 404, icons, `robots.txt` and `sitemap.xml`.

## SEO and semantic verification

- Every public page has `<html lang="en">`, a canonical URL, Open Graph/Twitter metadata and the generated `sky-birds-og.png` social image.
- Root metadata uses `resolveSiteUrl()` for `metadataBase`, so production HTML no longer falls back to `http://localhost:3000`.
- Organization/WebSite JSON-LD is present in the root layout; product detail adds Product/BreadcrumbList JSON-LD.
- `sitemap.xml` is generated from the repository and contains all public routes.
- `robots.txt` points to the sitemap and disallows private paths.
- 404 is branded, has one h1, recovery links and `noindex, nofollow`.
- Catalogue pages expose a server-rendered product grid and an sr-only section heading; filters sync through `history.replaceState` without SSR `useSearchParams` suspensions.

## Feature verification

- Catalogue: locked categories no longer appear as active user filters; size filtering respects colour-specific variants; clear-filters state matches actual filters.
- Product detail: colour and size radios have accessible names, unavailable sizes are exposed as disabled/`aria-disabled`, and the gallery announces the active frame.
- Contact: `tel:`, `wa.me` and `mailto:` links are built only from configured non-placeholder values; unavailable channels do not render fake links.
- Contact form: client-side `mailto:` composition only, with an accessible status region and tokenized error color.
- Navigation: desktop and mobile menus use the same route config; the mobile trigger exposes `aria-expanded` and `aria-controls`; all category routes are reachable.
- Logo: supplied original is unchanged; full/emblem/icon variants and favicon/assets are wired through `BrandLogo` and app icon files.
- Motion/3D: reduced-motion variants, lazy client-only WebGL, static poster fallback, texture-load fallback and frameloop/intersection gating are covered by tests.

## Responsive audit

- Base styles and Tailwind `sm`/`md`/`lg`/`xl` rules cover 320, 375, 768, 1024 and 1440 px layouts.
- Header, mobile drawer, catalogue filter rail/drawer, product detail two-column layout, editorial sections and footer have explicit small-viewport fallbacks.
- Component tests verify the mobile drawer structure and route access; static markup tests verify main landmarks and h1 presence.
- Real-device viewport screenshots and touch testing are still required for final client sign-off.

## Known limitations

- Final phone, WhatsApp, email, address, business hours, product photography, catalogue data and manufacturing metrics have not been supplied. Placeholders remain intentionally hidden from live links.
- Playwright, Lighthouse CI and axe runner are not installed, so automated E2E, performance budgets and axe scans are not claimed as passed.
- Cross-browser and real-device visual QA remain outstanding.
- Derivative logo crops still need visual confirmation against the supplied original.
- The site remains static; no backend, CMS, database, cart, checkout, payments or authentication exists.

## Deployment readiness

Vercel-compatible configuration is complete: Node 20+, `npm run build`, public `NEXT_PUBLIC_*` variables, canonical URL resolution via `NEXT_PUBLIC_SITE_URL`/`VERCEL_URL`, generated social image, asset checks, rollback guidance and smoke verification. Set real environment values and redeploy before launch, then submit `sitemap.xml` to search consoles and validate the Open Graph preview.
