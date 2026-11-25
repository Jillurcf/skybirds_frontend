# 06 — Animation Guidelines

## Principles

1. **Meaning over motion** — movement should communicate depth, fabric or hierarchy.
2. **Slow enough to feel premium, fast enough to feel responsive.**
3. **One focal motion at a time.**
4. **No motion that blocks reading or interaction.**
5. **Reduced motion is a first-class state, not an afterthought.**
6. **Content stays readable without JavaScript.**

## Motion tokens

| Token | Value | Use |
| --- | --- | --- |
| `duration-fast` | 180 ms | Hover, focus, color swap |
| `duration-base` | 320 ms | Buttons, tabs, small reveals |
| `duration-route` | 240 ms | Route transitions |
| `duration-menu` | 300 ms | Mobile menu |
| `duration-slow` | 700 ms | Section reveals |
| `duration-emblem` | 900 ms | Logo entrance |
| `duration-headline` | 1000 ms | Masked headline lines |
| `duration-hero` | 1200–1600 ms | Hero entrance sequence |
| `ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances |
| `ease-in-out-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | Transitions |
| `stagger-step` | 80–120 ms | Lists and grids |
| `stagger-hero` | 90 ms | Hero sequence children |

Tokens live in `src/config/animations.ts`, with Tailwind utilities mirroring durations and easings.

## Hero entrance

Sequence:

1. Background/particle field fades in (400 ms).
2. Emblem scales from 0.94 to 1 and fades in (900 ms).
3. Wordmark/eyebrow slides up 16 px (700 ms, delayed 100 ms).
4. Headline lines mask-reveal upward (stagger 90 ms).
5. Supporting copy fades up (600–700 ms).
6. CTA underline draws left-to-right (180 ms, no redundant delay).

Implementation: CSS keyframes in `globals.css` applied by `HeroReveal` with token-matched durations and explicit delays. The full sequence completes within the 1.2–1.6 s hero budget. CSS animations start without JavaScript, and a `<noscript>` rule still forces the staged hero to its final state. After hydration, `HeroVideoSequence` starts the next muted local clip 1.2 s before the current one ends and crossfades with the 700 ms soft-ease transition, so both clips have live frames during the handoff; there is no hero image layer, and reduced motion, no JavaScript, load errors and blocked autoplay leave the charcoal background visible.

## Logo reveal

- Use `sky-birds-emblem.png` for the animated mark.
- Avoid animating the raster logo's internal shapes independently.
- Reveal via opacity + slight scale/translate only.
- Reduced motion: logo appears immediately at final state.

## Floating particles

- CSS particles: 12 on mobile, 18 on larger viewports.
- Rose-gold/champagne only; opacity 0.12–0.3.
- Drift 10–40 px vertical over 10–18 s, once, then hold the final position.
- `pointer-events: none`, `aria-hidden="true"`.
- Hidden entirely under reduced motion.

## Hero WebGL lookbook

Preferred approach:

1. Static lookbook poster baseline and CSS particles remain readable without WebGL.
2. Optional WebGL portrait cards use repository-driven fashion imagery, never a separate product model.
3. Cards float slowly, tilt toward the pointer and drift faster with pointer velocity; holding the pointer down amplifies the movement.
4. A soft rose-gold glow trails the pointer behind the cards; tap/click adds one brief pulse.

Constraints:

- Cards are decorative and `aria-hidden`; they do not imply navigation or commerce.
- Pointer interaction works through hero copy and is disabled under reduced motion.
- No physics library and no post-processing.
- Max 1 WebGL canvas per viewport.
- Cap DPR at 1.5 on mobile, 2 desktop.
- Pause rendering when off-screen or when the tab is hidden.
- Unmount on context loss.
- Load textures per canvas mount and dispose them on unmount.
- Under reduced motion the canvas renders one static frame, and the poster is used only when WebGL is unavailable or fails.

## Scroll-triggered sections

- `Reveal` uses Motion `whileInView` with `once: true` and `amount: 0.2`.
- Reveals start at opacity 0.85 and translate 16–24 px; content is never fully hidden.
- Grid children stagger by 80–100 ms.
- `ScrollReveal` is a thin wrapper around `Reveal`; it does not load GSAP.
- GSAP ScrollTrigger is reserved for scrubbed parallax and desktop pinning.
- GSAP setup uses an isomorphic layout effect, `gsap.context()` and `ctx.revert()`.
- Trigger ranges refresh after fonts and in-view images load.

## Image parallax

- Max translation 6% of image height.
- Only on full-width editorial images.
- Image container `overflow-hidden`; image scale stays between 1.08 and 1.1.
- Scrub is smoothed (`scrub: 1`) and clamped with `invalidateOnRefresh`.
- Reduced motion skips ScrollTrigger entirely.

## Product hover

- Image scale: 1 → 1.03 over 320 ms.
- Overlay: champagne wash from 0 → 0.12 opacity.
- Title underline and arrow draw on hover **and** keyboard focus.
- Secondary image crossfade is added when final photography supplies a second view.
- Touch devices skip hover-specific behavior via Tailwind's `hoverOnlyWhenSupported` option.
- Reduced motion keeps only the instant colour/focus change; scale/translate transforms are disabled.

## Product detail motion

- Gallery frames crossfade with overlapping `AnimatePresence mode="popLayout"` layers and a 1.5% scale change.
- Gallery arrow keys work in both the main frame and the lightbox; the counter is announced politely.
- The lightbox trigger's accessible name includes the visible "View larger" label.
- Section content uses staggered in-view entrances with 100 ms steps.
- Related products use the existing `CatalogGrid` stagger.
- No Three.js canvas is used on product detail.

## Color and size selection

- Color swatch: border expands to ring on select; check icon scales in with a spring.
- Size pill: charcoal fill on select; ivory text.
- Unavailable size: muted style plus `aria-disabled`.
- Native radio inputs preserve arrow-key behaviour and accessible names.
- Selection change duration is 180 ms; reduced motion removes exit transforms.

## Navigation transitions

- Navbar stays mounted; background transitions from transparent at the top to ivory on scroll.
- Desktop nav underlines draw on hover and keyboard focus.
- Mobile menu slides/fades in 300 ms; focus is trapped while open and restored on close.
- Route changes use a 240 ms fade/slide via `template.tsx`.

## CTA animation

- Arrow icon translates 4 px on hover and keyboard focus.
- Underline draws on hover/focus.
- Accent CTAs use an accessible deep rose-gold fill; no excessive glow.

## Footer animation

- Footer columns reveal in a short stagger using Motion `Reveal`.
- Footer links keep 44 × 44 px touch targets.
- Reduced motion renders the footer static.

## Reduced motion matrix

| Effect | Normal | Reduced |
| --- | --- | --- |
| Hero entrance | Staggered reveal | Immediate final state |
| Particles | Finite subtle drift | Hidden |
| Fabric WebGL | Subtle motion | Static canvas frame; poster only on WebGL failure |
| Parallax | Scroll-linked | None |
| Scroll reveals | 0.85 → 1 fade and lift | Immediate readable state |
| Product hover | Scale/fade | Instant colour change only |
| Gallery/selection | Crossfade and spring | Instant state swap |
| Route transition | 240 ms fade | None |

## Performance guardrails

- Prefer `transform` and `opacity`.
- Avoid animating `width`, `height`, `top`, `left`.
- Do not use permanent `will-change`; GSAP tracks only active scrub ranges.
- Batch reads/writes in ScrollTrigger callbacks.
- Kill triggers on unmount.
- Defer WebGL until the hero intersects and the browser is idle.
- Test on 4× CPU throttling before accepting new motion.

## Implemented homepage motion

- `HeroReveal` coordinates emblem scale/fade, wordmark and eyebrow lift, two masked headline lines, supporting copy and CTA underline draw with CSS keyframes matched to motion tokens.
- `HomeHero` adds a silent video-only background with overlapping crossfades and editorial frame details; without video support the composition falls back to the charcoal base rather than an image.
- `ParticleField` renders 12–14 deterministic motes on mobile and 18 on larger viewports, hidden under reduced motion.
- `LookbookCanvas` renders three portrait cards on low tier and four on high tier, using repository-driven editorial imagery. Cards drift on independent cycles, tilt/parallax toward the pointer, respond to pointer velocity and move magnetically when the pointer is near. Holding the pointer down amplifies movement; a rose-gold glow trails the pointer behind the cards. Rendering pauses when off-screen or when the tab is hidden; reduced motion uses a single demand frame with interaction listeners disabled.
- `WebGLGate` waits for intersection and an 800 ms idle window, resolves to a low tier below 1024 px and the full scene on desktops. Context loss and runtime errors fall back to `LookbookPoster`.
- `ParallaxImage` scrubs an overscaled image from -6% to 6% vertical movement with scale 1.1 → 1.08.
- `HorizontalEditorial` pins only at `min-width: 1024px`; mobile and reduced-motion visitors receive a stacked, static list.
- `Reveal`/`ScrollReveal` provide section-level fades; `SectionHeading` reveals by default unless its parent already handles the reveal.
- `SiteFooter` uses a short column stagger.
