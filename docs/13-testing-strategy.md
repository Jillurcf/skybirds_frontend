# 13 — Testing Strategy

## Milestone 1 status

Vitest is configured with `@` alias support. The current suite contains 31 tests covering `cn()`, contact URL helpers, WebGL fallback behavior and quality tiers, repository access, catalog filters, search, sorting and URL state, variants and product enquiry messages. Component and E2E suites remain planned; no headless browser is installed in the current environment.

## Test layers

| Layer | Tooling (planned) | Scope |
| --- | --- | --- |
| Type safety | `tsc --noEmit` | Whole project |
| Lint | ESLint + Next config | Code quality |
| Format | Prettier check | Consistency |
| Unit | Vitest + React Testing Library | Utilities, data mapping |
| Component | React Testing Library | Selectors, cards, filters |
| E2E | Playwright | Critical user journeys |
| Build | `next build` | Production compilation |
| Performance | Lighthouse CI | Web vitals budgets |
| Accessibility | axe + manual | WCAG AA |

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
     - Block WebGL context → static lookbook poster renders over the hero image → no console errors.

    - Set a narrow viewport → low-tier scene still mounts when WebGL exists; no poster-only width tier remains.

9. **No JavaScript**
   - Load the homepage with JavaScript disabled → hero and section content remain visible.

## Build checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Add `npm run test:e2e` when Playwright is configured.

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

- Hero image and lookbook poster appear before WebGL loads.
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
