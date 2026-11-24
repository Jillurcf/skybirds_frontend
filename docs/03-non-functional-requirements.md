# 03 — Non-Functional Requirements

## NFR-01: Performance

| Metric | Target |
| --- | --- |
| Largest Contentful Paint (mobile, lab) | ≤ 2.5 s |
| Interaction to Next Paint | ≤ 200 ms |
| Cumulative Layout Shift | ≤ 0.1 |
| First JS payload (initial route) | ≤ 170 kB gzip where feasible |
| 3D bundle | Loaded only after idle/interaction, never in critical path |
| Image formats | AVIF/WebP with JPEG fallback where supported |
| Fonts | Self-hosted or `next/font`, preloaded, `font-display: swap` |

## NFR-02: Responsive behavior

- Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- Mobile-first layout.
- No horizontal overflow at 320 px width.
- Touch targets minimum 44 × 44 px.
- Navigation and product controls usable one-handed.

## NFR-03: Accessibility

- WCAG 2.2 AA target.
- Visible focus rings on all interactive elements.
- Keyboard-operable menu, selectors and galleries.
- Proper `aria-label` for icon-only buttons.
- Sufficient contrast: charcoal on ivory, white on charcoal; rose gold used for accents only where contrast passes.
- Motion respects `prefers-reduced-motion: reduce`.
- Decorative particles/3D marked `aria-hidden`.

## NFR-04: Browser support

- Latest two versions of Chrome, Edge, Firefox and Safari.
- iOS Safari and Android Chrome current and previous major.
- No WebGL fallback required by design.
- JavaScript-disabled experience: core content should remain readable where practical.

## NFR-05: Reliability

- Build succeeds with `next build`.
- No runtime errors from missing product data.
- No hydration mismatches from animation/3D layers.
- External links open predictably; `rel="noopener noreferrer"` for new tabs.

## NFR-06: Maintainability

- TypeScript strict mode enabled.
- ESLint and Prettier configured.
- Component naming consistent: PascalCase files for components, kebab-case for utilities/data.
- Central config for brand, contact and navigation.
- All magic values for color/spacing/motion defined as design tokens.

## NFR-07: Security

- No secrets committed.
- Contact details are public business data only.
- External URLs validated by config, not user input.
- Dependencies kept current; no abandoned packages where alternatives exist.

## NFR-08: SEO / sharing

- Metadata on every route.
- Descriptive image `alt` text.
- Semantic landmarks: header, nav, main, footer.
- Structured data can be added later without changing UI.

## NFR-09: Motion quality

- Target 60 fps on mid-range mobile for CSS/GSAP motion.
- 3D capped at device pixel ratio 1.5–2.
- Particle count adaptive to viewport and hardware.
- Animation durations typically 200–900 ms; hero sequences up to ~1.6 s.
- Easing curves documented in `06-animation-guidelines.md`.

## NFR-10: Documentation currency

- Any architecture or design change must update the relevant numbered doc.
- `17-task-tracker.md` must reflect completed acceptance criteria at milestone boundaries.
