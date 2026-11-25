# 05 — Design System

## Foundations

The design system is token-driven. Tailwind CSS theme values map to semantic CSS variables so dark and light surfaces can share components.

## Color tokens

```ts
colors: {
  rose: {
    gold: '#B98270',
    goldDeep: '#8C5B4B',
    soft: '#D6AFA1'
  },
  charcoal: '#242323',
  ivory: '#F5F1ED',
  champagne: '#D9C6BB',
  silver: '#A5A1A0',
  white: '#FFFFFF'
}
```

Semantic aliases:

| Alias | Maps to | Usage |
| --- | --- | --- |
| `background` | ivory | Page surface |
| `surface` | white / champagne | Cards and panels |
| `foreground` | charcoal | Body text |
| `muted` | silver | Metadata |
| `accent` | rose gold deep | Accessible interactive highlight and focus ring |
| `line` | champagne | Hairline borders |

## Spacing scale

Use 4 px base increment. Editorial sections use larger rhythmic steps.

| Token | Value | Typical use |
| --- | --- | --- |
| `xs` | 4 px | Icon gaps |
| `sm` | 8 px | Inline gaps |
| `md` | 16 px | Control padding |
| `lg` | 24 px | Card padding |
| `xl` | 40 px | Grid gaps |
| `2xl` | 64 px | Section padding (mobile) |
| `3xl` | 96 px | Section padding (tablet) |
| `4xl` | 144 px | Section padding (desktop) |

## Radii and borders

- Radius: `none` for editorial blocks, `sm` 4 px for controls, `full` for pills/swatches.
- Borders: 1 px champagne; avoid heavy shadows.
- Divider rule: 1 px `rgba(36,35,35,0.12)`.

## Elevation

| Level | Treatment |
| --- | --- |
| 0 | Flat on ivory |
| 1 | `box-shadow: 0 12px 40px rgba(36,35,35,0.06)` |
| 2 | `box-shadow: 0 24px 80px rgba(36,35,35,0.10)` for overlays only |

## Typography classes

| Class | Definition |
| --- | --- |
| `.font-display` | Serif stack |
| `.font-body` | Sans stack |
| `.eyebrow` | 11–12 px, uppercase, tracking 0.18em, rose gold or silver |
| `.display-xl` | Display clamp |
| `.section-title` | H2 clamp |
| `.lede` | Body 1.125–1.25rem, muted charcoal |

## Component inventory (planned)

| Component | Responsibility |
| --- | --- |
| `SiteHeader` | Sticky nav, logo, mobile menu |
| `SiteFooter` | Full logo, contact links, navigation |
| `BrandLogo` | Variant-aware wrapper around brand assets |
| `Button` | shadcn/ui-based CTA with rose-gold/dark variants |
| `SectionHeading` | Eyebrow + serif title + optional lede |
| `ProductCard` | Image, hover state, title, category, price/placeholder |
| `ProductGrid` | Responsive grid + empty state |
| `CategoryFilter` | URL-backed category pills |
| `SizeSelector` | Accessible radio group with disabled states |
| `ColorSelector` | Accessible swatch radio group |
| `Gallery` | Product image viewer with thumbnails and keyboard navigation |
| `Dialog` | Accessible lightbox/overlay primitive |
| `ProductExperience` | Shared selection state for gallery, options and enquiry |
| `ContactLinks` | Phone/WhatsApp/email link group |
| `ProductEnquiryLinks` | Product-aware phone/WhatsApp/email actions |
| `Reveal` | Motion wrapper with reduced-motion fallback |
| `ParallaxImage` | Scroll-linked image movement |
| `LookbookCanvas` | Dynamically imported WebGL lookbook-card layer |
| `ParticleField` | Lightweight CSS/canvas particles |
| `SectionHeading` | Consistent heading reveal with `reveal={false}` escape hatch |
| `HorizontalEditorial` | Desktop-only pinned horizontal storytelling |

## Homepage composition

The homepage uses the shared primitives in this order: `HomeHero`, `BrandIntroduction`, `FeaturedCollections`, `NewArrivals`, `SignatureMenswear`, `ManufacturingCapabilities`, `CraftsmanshipQuality`, `CompanyStory`, `ContactCta` and the global `SiteFooter`.

Hero copy, its priority editorial image and the WebGL card imagery are delivered through `getHomeContent()` and rendered with the existing `Section`, `Container`, `Button` and `BrandLogo` primitives. The hero is capped at `max-h-screen` with a `100svh - 72px` minimum so it never grows beyond the viewport; the hero image is a full-bleed baseline, and floating lookbook cards, gradient scrims and particles are atmospheric layers above it.
 Featured collections and the manufacturing study use the same repository-driven image pattern as arrivals, signature and craftsmanship sections. Dark sections override `.section-title` and `.lede` to ivory through token-aware wrapper selectors.

## shadcn/ui usage

Install only required primitives:

- `button`
- `dialog` (mobile menu / gallery if needed)
- `radio-group` (size/color selection)
- `separator`
- `sheet` (mobile nav, optional)
- `tooltip` (optional product metadata)

Style them with tokens; do not leave default shadcn colors unchanged.

## Product card anatomy

```
[ image area 4:5 ]
  hover: scale 1.03 + subtle overlay + secondary image
[ category eyebrow ]
[ product name — serif ]
[ detail link arrow ]
```

## Button variants

| Variant | Style | Use |
| --- | --- | --- |
| `primary` | Charcoal fill, ivory text, rose-gold hover rule | Main CTA |
| `accent` | Rose-gold fill, white text, restrained | Enquiry CTA |
| `outline` | 1 px charcoal, transparent | Secondary |
| `ghost` | Text + underline | Inline links |

## Iconography

- Library: Lucide React.
- Stroke width: 1.25–1.5 for editorial lightness.
- Icons always paired with text or `aria-label`.
- Never use Lucide icons as substitutes for the brand emblem.

## Grid

- 12-column desktop grid, 6-column tablet, 4-column mobile.
- Product grid: 2 columns mobile, 3 tablet, 4 desktop; featured grid may use 3 large cards.
- Editorial split: 5/7 or 7/5 columns.
- Max content width: 1440 px with 24–64 px gutters.

## Dark surface rules

- Background: charcoal.
- Text: ivory/white.
- Accent: rose gold or champagne.
- Use the emblem or full logo only if contrast is confirmed; otherwise use a champagne wordmark treatment only after visual QA.

## Form controls

- Radio/checkbox states: champagne border, rose-gold selected ring.
- Focus: 2 px rose-gold outline, 2 px offset.
- Disabled: silver at reduced opacity with `aria-disabled`.

## State vocabulary

| State | Visual |
| --- | --- |
| Default | Quiet, neutral |
| Hover | Rose-gold underline or 1.03 scale |
| Focus | Rose-gold ring, always visible |
| Selected | Rose-gold ring + check |
| Disabled | Muted, no pointer action |
| Loading | Branded skeleton in champagne |
| Error | Charcoal text with rose-gold left rule |
