# 00 — Project Overview

## Project identity

- **Brand:** SKY BIRDS
- **Subtitle:** FASHION BD
- **Market position:** Premium men's fashion and garment manufacturing showcase
- **Website type:** Static, content-led product showcase
- **Not in scope:** Cart, checkout, payments, authentication, user accounts, CMS/backend, order tracking

## Purpose

Create a cinematic, editorial digital presence that communicates two things at once:

1. **Consumer-facing fashion brand** — collections, silhouettes, styling, product detail.
2. **Professional garment manufacturer** — capability, process, quality, reliability, B2B contact.

The website must feel like an international fashion house while remaining technically lightweight, fast, accessible and maintainable.

## Discovery status

- Project directory was inspected at `C:\SkyBirds`.
- Initial directory was empty except for the supplied logo at `C:\SkyBirds\skyBirds.jpg`.
- No existing framework, package manifest, source tree or test configuration was found.
- The logo was copied unchanged to `public/images/brand/sky-birds-logo-original.jpg` (SHA-256 verified).
- Legacy alias `public/images/brand/skybirds-logo-original.jpg` is retained.
- Derivative logo assets were prepared with canonical `sky-birds-*` names; see `04-brand-guidelines.md`.
- Milestone 1 foundation is implemented: tokens, shared UI, layout, motion and WebGL safety layers.
- The cinematic homepage is implemented with a tiered WebGL hero, poster fallback, GSAP scroll storytelling and all ten planned homepage sections.

## Logo inspection summary

| Property | Value |
| --- | --- |
| Source file | `skyBirds.jpg` |
| Dimensions | 816 × 819 px |
| Format | JPEG, 3 channels, no alpha |
| Background | Near-uniform cool grey, approximately RGB(179, 179, 182) / `#B3B2B6` |
| Foreground | Bird/feather emblem above a wide wordmark cluster |
| Emblem region | Approximately x 258–544, y 113–449 |
| Wordmark region | Approximately x 148–771, y 450–681 |
| Total foreground | ~8.5% of canvas |

> The visual review was performed programmatically. The original must remain the source of truth; do not redraw, recolor or substitute the emblem.

## Design thesis

> "Quiet luxury with an industrial spine."

- Warm ivory field, charcoal typography, rose-gold accents.
- Generous whitespace, editorial grids, deliberate asymmetry.
- Product imagery treated like lookbook photography, not catalogue thumbnails.
- Motion used to suggest fabric, light and craft — never to decorate randomly.
- 3D used only where it adds depth: hero atmosphere, fabric study, selected transitions.

## Primary audiences

| Audience | Need | Evidence on site |
| --- | --- | --- |
| Style-conscious men | Browse and compare garments | Collections, product detail, size/color selectors |
| Buyers / sourcing teams | Assess manufacturing credibility | Manufacturing page, process, capabilities, contact |
| Retail partners | Understand brand identity | About, lookbooks, clear contact routes |
| Mobile visitors | Fast, thumb-friendly browsing | Responsive layout, sticky contact actions |

## Success criteria (project level)

- All documented pages are implemented and navigable.
- Logo usage matches the supplied identity.
- Product detail pages support size and color selection without commerce state.
- Contact actions work via `tel:`, WhatsApp deep link and `mailto:`.
- Reduced-motion and no-WebGL fallbacks are present.
- Lighthouse-style targets documented in `12-performance-and-accessibility.md` are met.

## Documentation map

Start with `01-business-requirements.md`, then follow numeric order. `17-task-tracker.md` is the execution checklist for the next milestone.
