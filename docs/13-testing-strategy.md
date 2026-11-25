# 13 — Testing Strategy

## Milestone 7 status

Vitest uses two projects: Node for utility tests and jsdom with React Testing Library for component tests. The final local suite contains 52 passing tests across 16 files, covering `cn()`, SEO metadata, contact URL helpers and placeholder detection, WebGL fallback/quality tiers, repository access, catalog filters/search/sort/URL state, variant awareness, product enquiry messages, the logo, navbar/mobile navigation, catalog explorer, product selectors, contact links, route transitions and the static WebGL poster.

`npm run verify:routes` checks the built production server: 26 public routes, 404, `robots.txt` and `sitemap.xml`. Playwright, Lighthouse CI and axe are not installed; E2E, performance and automated accessibility scans remain documented limitations rather than claimed passes.

## Test layers

| Layer | Tooling | Scope | Status |
| --- | --- | --- | --- |
| Type safety | `tsc --noEmit` | Whole project | Passing |
| Lint | ESLint + Next config | Code quality | Passing |
| Unit | Vitest (Node) | Utilities, data mapping, SEO | Passing |
| Component | Vitest + React Testing Library (jsdom) | Selectors, nav, filters, fallback | Passing |
| Route smoke | `verify:routes.mjs` + `next start` | Status codes and SEO markers | Passing |
| Build | `next build` | Production compilation | Passing |
| Format | Prettier check | Consistency | Available, not required by QA gate |
| E2E | Playwright | Critical user journeys | Not installed |
| Performance | Lighthouse CI | Web vitals budgets | Not installed |
| Accessibility | axe + manual | WCAG AA | Runner not installed; manual checks recorded |

## Unit tests

- `cn()` class merging.
- Repository functions return expected products.
- Category lookup handles unknown slug.
- Catalog category/size/colour filters match available options only.
- Search matches name, SKU, collection and short description case-insensitively.
- Sort modes return the expected featured, alphabetical and SKU order.
- Query parsing ignores invalid values and respects locked categories.
- WhatsApp URL encoding.
- Product enquiry messages include product name, SKU, selected colour, selected size and product URL.
- Variant helpers narrow size availability and select variant images by colour.
- Placeholder contrast labels switch between charcoal and ivory by luminance.
- Metadata generation for products.
- WebGL detection fallback behavior with mocked `window`.
- WebGL quality tiers for low and high viewport widths; `poster` remains the fallback state only.

## Component tests

Implemented: logo asset/alt variants, desktop and mobile navigation access, catalog SSR grid/URL sync/locked category, product colour/size radio semantics, contact hrefs/attributes/placeholder state, route transition visibility and decorative WebGL poster.

Still recommended when a browser runner is available:

### ProductCard

- Renders name, category and image alt.
- Links to correct detail route.
- Hover state does not break accessibility tree.

### ProductOptions

- Shows available and disabled sizes, with `aria-disabled` on unavailable sizes.
- Selection updates visual state and native radio `aria-checked`.
- Keyboard arrow navigation works through colour and size groups.
- Colour selection updates the visible colour name and variant image state.
- Swatches have accessible names and unavailable colours cannot be selected.

### ProductGallery

- Thumbnails and previous/next buttons change the main frame.
- Lightbox opens, traps focus, closes with Escape and navigates with arrow keys.
- Decorative overlay controls have accessible names.

### ContactLinks

- Renders only provided channels.
- `tel:`, `wa.me` and `mailto:` URLs are correct.
- External links have safe `rel`.

## E2E journeys

1. **Browse all products**
   - Home → Products → card → detail → back.

2. **Category filter**
   - Products → select Shirts → URL contains `?category=shirts` → only shirts shown.

3. **Product selection**
   - Open product → select colour → confirm gallery/name/size availability update → select size → open lightbox → enquiry links include product name, SKU, colour, size and URL.

4. **Contact**
   - Contact page → each channel has correct href.

5. **Mobile navigation**
   - Open menu → navigate to Jackets → menu closes → active link indicated.

6. **Not found**
   - Visit unknown path → branded 404 → return home.

7. **Reduced motion**
   - Emulate reduced motion → no particle animation, parallax transforms or injected pointer motion.
   - Hero, reveals, route transitions, gallery and selectors show final states immediately.

 8. **No WebGL**
     - Block WebGL context → static lookbook poster renders over the hero video → no console errors.

    - Set a narrow viewport → low-tier scene still mounts when WebGL exists; no poster-only width tier remains.

9. **No JavaScript**
    - Load the homepage with JavaScript disabled → hero copy and section content remain visible over the charcoal hero base.


## Build checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify:routes
```

All five commands were run against the final code. Add `npm run test:e2e` when Playwright is configured.

## Visual QA checklist

- Logo appears correctly in navbar and footer.
- No stretched/altered emblem.
- Rose gold used sparingly.
- Typography hierarchy reads at a glance.
- No horizontal overflow at 320/375/768/1024/1440 px.
- Images use consistent color grading.
- Hover and focus states visible.
- Dark sections pass contrast.

## Motion QA checklist

- Hero sequence completes within 1.2–1.6 s without jank.
- Scroll reveals trigger once and never hide text before hydration.
- Product hover smooth on desktop and absent on touch.
- Gallery arrow keys work in both frame and lightbox.
- Underline motion follows hover and keyboard focus.
- Reduced motion shows final states immediately.
- No animation on layout properties.

## 3D QA checklist

- Hero video and lookbook poster render before WebGL loads.
- WebGL waits for hero intersection and an 800 ms idle window.
- No hydration mismatch.
- No flash of unstyled canvas.
- Canvas pauses off-screen and when the document is hidden.
- Context loss falls back gracefully and quality changes can recover.
- No memory leak after navigation.

## Definition of done

A feature is complete when:

- Acceptance criteria in docs are met.
- Tests pass locally.
- Type/lint/build clean.
- Responsive and accessibility checks pass.
- Relevant documentation is updated.
- No TODO placeholder remains without an owner.
