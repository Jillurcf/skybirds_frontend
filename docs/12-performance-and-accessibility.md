# 12 — Performance and Accessibility

## Performance budget

| Item | Budget |
| --- | --- |
| Initial HTML + CSS | Small, server-rendered |
| First-load JS | ≤ 170 kB gzip (excluding deferred 3D) |
| 3D chunk | Deferred; loaded after idle/intersection |
| Hero image | Optimized AVIF/WebP, explicit dimensions |
| Hero video | Six muted local MP4 clips streamed sequentially; video-only background |
| Total page weight (home, excluding streamed hero video) | ≤ 2.5 MB on mobile target |
| CLS | ≤ 0.1 |
| LCP | ≤ 2.5 s lab mobile |
| INP | ≤ 200 ms |

## Image strategy

- Use `next/image` for all content images.
- Provide `width`/`height` or `fill` with sized container.
- Prefer AVIF then WebP; keep JPEG fallback where needed.
- Local WebP assets are generated from standard-license Unsplash photos by `npm run images:seed`; they remain illustrative until final photography is supplied. Client-supplied craftsmanship JPEGs are served directly and optimized by `next/image`.
- Decorative WebGL fallback and lookbook poster images use empty alt text and `aria-hidden` wrappers.
- Lazy-load below-fold images; the hero has no image layer.
- Hero video playback starts after hydration; the active and upcoming clips auto-preload and the remaining clips preload metadata only. Playback pauses off-screen or in a hidden tab.
- Use `placeholderColor` from product data for shimmer/solid placeholder.
- Avoid loading full-resolution images for cards.

## Font strategy

- Use `next/font` for serif and sans stacks.
- Preload only used weights.
- `font-display: swap`.
- Avoid more than two font families and four total weights.

## JavaScript strategy

- Server Components by default.
- Motion wrappers are Client Components but kept small.
- Dynamic import 3D with `ssr: false` equivalent client boundary.
- No global animation library in pages that do not need it.
- Tree-shake Lucide icons by named imports.

## 3D strategy

- Detect WebGL before mount.
- Defer until hero is intersecting and browser is idle; the idle window is 800 ms.
- Cap DPR: 1.5 below 768 px, 2 on larger screens.
- Pause when tab hidden or canvas off-screen.
- Dispose resources on unmount; context loss falls back to the poster and quality changes can clear the failed state.
- Static canvas frame for reduced-motion devices; poster only for unsupported devices or runtime failures.
- Implemented tiers: reduced scene below 1024 px, full scene on desktops.
- `frameloop` pauses when the canvas leaves the viewport or the document is hidden, and switches to a single demand frame under reduced motion.
- Decorative particles and the 3D canvas are `aria-hidden`; reduced motion removes CSS particles and all scroll transforms.
- CSS particles are finite, capped at opacity 0.3, and hidden below 768 px beyond the first 12 motes.
- Hover transforms apply only on hover-capable devices and are disabled under reduced motion.

## Core Web Vitals practices

- Reserve space for images and embeds.
- Avoid render-blocking third-party scripts.
- Minimize layout thrash in scroll handlers.
- Use passive listeners.
- Avoid long tasks > 50 ms during interaction.

## Accessibility target

WCAG 2.2 AA.

Auto-updating carousels provide a persistent pause/play control (WCAG 2.2.2) and never advance under reduced motion.

## Semantic structure

- One `h1` per route.
- Heading order: `h1` → `h2` → `h3`.
- Landmarks: `header`, `nav`, `main`, `footer`.
- Buttons for actions, anchors for navigation.
- Lists for product grids and process steps.

## Keyboard support

| Interaction | Requirement |
| --- | --- |
| Navbar/mobile menu | Tab, Enter/Space, Escape to close |
| Product cards | Focusable link with visible ring |
| Size/color selector | Arrow keys via radio-group pattern |
| Gallery | Thumbnail buttons, keyboard next/previous and Escape to close lightbox |
| Craftsmanship carousel | Native swipe, arrow keys on the region, labelled previous/next, slide and pause/play buttons; autoplay pauses on hover/focus, off-screen and hidden tabs |
| Colour/size radio groups | Native arrow-key selection and visible focus ring |
| Contact links | Native anchor behavior |
| Filter pills | Radio/tab semantics with arrow support |

## Focus and contrast

- Visible focus: 2 px rose-gold outline with 2 px offset.
- Charcoal on ivory: passes AA.
- White on charcoal: passes AA.
- Rose gold on ivory may fail for small text; use for large text, rules and accents.
- UI text, focus rings and selection states use `rose-gold-deep` (`#8C5B4B`) for AA contrast: 5.03:1 on ivory and 5.66:1 against white text. The original `#B98270` remains the brand accent for decorative rules.
- Muted enabled text uses `charcoal/75` or `ivory/75`; lower-opacity values are reserved for disabled states.
- Placeholder panels choose charcoal or ivory label text from measured luminance of the placeholder colour.
- Check all placeholder text and disabled states manually.

## Motion accessibility

- Respect `prefers-reduced-motion: reduce`.
- Provide no parallax, particles or scroll-triggered transforms when reduced.
- Reveals, route transitions and hero staging never leave important content permanently hidden; a `<noscript>` rule finalises the hero.
- Keep decorative CSS motion finite and provide instant state changes for gallery and selectors under reduced motion.
- No autoplay audio. Decorative background video is muted, `playsInline`, has no controls or poster; reduced motion, no JavaScript, load errors and blocked autoplay leave the charcoal base visible.
- No flashing content.

## Screen reader details

- Decorative images: `alt=""`.
- Informative product images: descriptive alt.
- Icon-only buttons: `aria-label`.
- Disabled sizes: `aria-disabled="true"` plus visible text.
- Selected swatch: `aria-checked`.
- 3D/particles: `aria-hidden="true"`.

## Mobile accessibility

- 44 × 44 px minimum touch targets.
- Adequate spacing between controls.
- No hover-only information.
- Menu and selectors usable with touch.

## Test references

- Automated: Lighthouse, axe, React Testing Library.
- Manual: keyboard-only pass, VoiceOver/NVDA spot check, 200% zoom, reduced-motion pass.
- See `13-testing-strategy.md`.
