# 04 — Brand Guidelines

## Brand statement

SKY BIRDS FASHION BD is a premium men's apparel brand and garment manufacturer. The identity combines an elegant bird/feather emblem with refined wordmark typography and a warm metallic accent.

## Supplied logo — source of truth

- Original: `C:\SkyBirds\skyBirds.jpg`
- Preserved copy: `public/images/brand/sky-birds-logo-original.jpg`
- Legacy alias: `public/images/brand/skybirds-logo-original.jpg`
- SHA-256: `8a8d61d99948c9778962694002732983aafd84133b7643be2c4142aff89c1c99`
- Dimensions: 816 × 819 px
- Background: near-uniform cool grey `RGB(179,179,182)` / approximately `#B3B2B6`
- Alpha: none in original

### Derivative assets prepared

| File | Purpose | Dimensions |
| --- | --- | --- |
| `sky-birds-logo-original.jpg` | Untouched archival source | 816 × 819 |
| `sky-birds-logo.png` | Full logo, transparent, cropped for footer/brand sections | 640 × 585 |
| `sky-birds-emblem.png` | Bird/feather emblem only, transparent | 303 × 353 |
| `sky-birds-icon.png` | Padded emblem for favicon/app icon | 512 × 512 |

Legacy aliases with `skybirds-*` prefixes remain in the asset directory for compatibility. New code must use the canonical `sky-birds-*` names.

Background removal used a soft luminance/color-distance matte from the measured grey field. Metallic texture and original color values were retained. The original JPEG remains unchanged.

> Visual caveat: the emblem was isolated by measured foreground clustering (upper cluster x≈258–544, y≈113–449). During implementation, visually confirm the crop against the original and adjust padding if required.

## Logo usage rules

### Do

- Use the supplied files.
- Keep clear space equal to at least the emblem's cap-height around the mark.
- Use the full logo in footer and major brand panels.
- Use the compact emblem in the navbar and small UI contexts.
- Use `sky-birds-icon.png` (copied to `src/app/icon.png` and `apple-icon.png`) for favicon and app icons.
- Place on warm ivory, white or charcoal backgrounds.
- Scale proportionally.

### Do not

- Recreate the bird as text, emoji or a generic icon.
- Stretch, rotate, skew, outline or apply heavy filters.
- Recolor the rose-gold metallic texture.
- Place on busy photography without a quiet overlay/panel.
- Place on rose-gold backgrounds (low separation).
- Add drop shadows that were not in the supplied mark.
- Modify or delete the original file.

## Minimum sizes

| Context | Minimum |
| --- | --- |
| Full logo, digital | 160 px wide |
| Emblem, navbar | 36 px tall |
| Favicon | 16 px; test legibility at 32 px |

## Color palette

| Token | Hex | Role |
| --- | --- | --- |
| `rose-gold` | `#B98270` | Primary accent: links hover, rules, selection rings, small fills |
| `charcoal` | `#242323` | Primary text, dark sections, navbar text |
| `ivory` | `#F5F1ED` | Primary page background |
| `champagne` | `#D9C6BB` | Soft dividers, cards, secondary surfaces |
| `silver-grey` | `#A5A1A0` | Muted text, metadata, disabled states |
| `white` | `#FFFFFF` | Cards, negative space, high-contrast text |

### Usage ratios

- Ivory/white: 60–70%
- Charcoal: 20–30%
- Champagne/silver: 5–10%
- Rose gold: 3–7%

Rose gold is an accent, not a background theme. For UI text, focus rings, selected states and filled accent buttons, use the accessible derivative `rose-gold-deep` `#8C5B4B`; it passes AA contrast while the original `#B98270` remains the brand colour for decorative rules and underlines. The supplied logo is never recoloured.

## Typography

### Headings

- Preferred: elegant high-contrast serif, for example **Cormorant Garamond** or **Playfair Display**.
- Weight: 400–600; avoid heavy bold in hero headlines.
- Letter spacing: slightly negative for large display, normal for section headings.
- Line height: 0.95–1.1 for display, 1.15–1.25 for section headings.

### Body

- Preferred: modern geometric/neutral sans, for example **Inter**, **Manrope** or **DM Sans**.
- Weight: 400 regular, 500 medium, 600 for UI labels.
- Letter spacing: 0.01em–0.04em for eyebrow labels and buttons.
- Line height: 1.6–1.75 for paragraphs.

### Scale

| Role | Desktop | Mobile |
| --- | --- | --- |
| Display | clamp(3.5rem, 8vw, 8rem) | clamp(2.75rem, 12vw, 4.5rem) |
| H2 | clamp(2rem, 4vw, 4rem) | clamp(1.75rem, 8vw, 2.5rem) |
| H3 | 1.5–2rem | 1.25–1.5rem |
| Body | 1rem–1.125rem | 1rem |
| Eyebrow | 0.6875–0.75rem, uppercase, tracked | same |

## Editorial tone

- Short, confident sentences.
- Prefer craft language: "cut", "drape", "finish", "structure", "texture".
- Avoid hype words: "revolutionary", "insane", "best ever".
- Use British/international spelling consistently where relevant.
- Product names should feel like collection pieces, not SKU codes.

## Imagery direction

- Warm, soft daylight; gentle shadow; no harsh flash.
- Neutral or textured studio backgrounds.
- Fabric close-ups to show weave, stitch and hand feel.
- Portrait and three-quarter product framing; avoid cluttered lifestyle scenes.
- Consistent color grading across the catalogue.
- Use sourced Unsplash photographs only as clearly labelled illustrative placeholders until final brand photography is supplied.
- Keep source photo IDs in the seed script so imagery can be replaced and audited.
- Give every informative image meaningful `alt` text; decorative imagery uses empty alt.

## UI principles

1. **Editorial first** — composition should breathe.
2. **Accent with restraint** — rose gold signals interaction and quality.
3. **Texture over decoration** — subtle grain/fabric cues beat gradients.
4. **Hierarchy through scale** — not through excessive weight.
5. **Quiet motion** — movement should feel like fabric and light.
6. **Craft visible** — process and manufacturing should be legible.
