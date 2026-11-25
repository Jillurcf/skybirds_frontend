# 07 — Technical Architecture

## Milestone 1 implementation note

The foundation uses Next.js 16, React 19, Tailwind CSS 3, TypeScript strict, shadcn/ui-style Radix primitives, Motion 14, GSAP 3, Three.js 0.187, R3F 9 and Drei 10. GSAP is registered lazily via `src/lib/gsap.ts`; WebGL loads only through `WebGLGate` after capability detection and idle deferral.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| Icons | Lucide React |
| Motion | Motion (Framer Motion) |
| Scroll animation | GSAP + ScrollTrigger |
| 3D | Three.js, React Three Fiber, React Three Drei |
| Content | Typed local TypeScript data |
| Deployment | Static-optimized Next.js hosting (Vercel-compatible) |

## Architectural principles

- Server Components by default for layout and content.
- Client Components only where interaction/animation requires them.
- No backend in this phase.
- Data access through a repository layer.
- Heavy 3D dynamically imported and isolated behind a WebGL capability check.
- One source of truth for brand, navigation and contact config.

## Rendering strategy

| Route type | Strategy |
| --- | --- |
| Home, About, Manufacturing, Contact | Server Component shell + client motion islands |
| Products listing | Server-rendered base grid + client filter state synced to URL |
| Product detail | Server-rendered breadcrumb/related shell + one client experience island for gallery, selectors and enquiry state |
| Not found | Server-rendered static fallback |

## Directory shape (planned)

```
src/
  app/
    layout.tsx
    template.tsx
    globals.css
    page.tsx
    products/
      page.tsx
      [slug]/page.tsx
    shirts/page.tsx
    t-shirts/page.tsx
    jeans/page.tsx
    trousers/page.tsx
    jackets/page.tsx
    about/page.tsx
    manufacturing/page.tsx
    contact/page.tsx
    not-found.tsx
    icon.png
    apple-icon.png
  components/
    layout/
    brand/
    ui/
    product/
    motion/
    three/
    sections/
  config/
    site.ts
    contact.ts
    navigation.ts
    animations.ts
  data/
    products.ts
    categories.ts
    manufacturing.ts
  lib/
    repository.ts
    webgl.ts
    utils.ts
  types/
    product.ts
    content.ts
```

Detailed structure in `08-project-structure.md`.

## Data flow

```
data/*.ts (typed local content)
        ↓
lib/repository.ts (getProducts, getProductBySlug, getProductsByCategory)
        ↓
Server Component page
        ↓
Client islands (filters, selectors, motion, 3D)
```

Components must not import `data/*.ts` directly except through repository functions.

## Three.js integration strategy

### Loading

```tsx
const LookbookCanvas = dynamic(() => import('@/components/three/lookbook-canvas'), {
  ssr: false,
  loading: () => <LookbookPoster images={[]} />
});
```

- `LookbookCanvas` is a Client Component.
- Mount only after `hasWebGL()` returns true.
- Defer until `requestIdleCallback` or intersection with hero.
- Provide `LookbookPoster` as a static card fallback.

### Capability detection

```ts
function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}
```

### Safety rules

- No `window` access during SSR.
- Error boundary around 3D canvas.
- Listen for `webglcontextlost` and switch to poster.
- Dispose geometries/materials/textures on unmount.
- Respect reduced motion by rendering a static frame or poster.

### Recommended scene

- Portrait image planes with a thin champagne border and depth-based ordering.
- `meshBasicMaterial` maps for faithful editorial colour; no physically based lighting pass.
- Subtle fog for depth.
- Three cards on low tier, four on desktop.
- No post-processing in initial milestone.

### Product detail decision

No product 3D canvas is mounted. Placeholder photography, colour-aware frames and Motion crossfades communicate the product without a heavy scene. A future 3D viewer should be introduced only with real product models and its own WebGL gate.

### Implemented homepage scene

`LookbookCanvas` is loaded only by `WebGLGate` after idle and capability checks. `HomePage` derives up to four portrait image URLs from `getHomeContent()` and passes them through `HomeHero` → `WebGLGate` → `LookbookCanvas`; components never import raw data directly. `TextureLoader` loads a dedicated texture set per canvas mount, sets sRGB/colour filters, calls `invalidate()` when ready and disposes every texture on unmount. `getHeroPointer()` normalizes window pointer/touch coordinates against the hero bounds so movement over hero copy still drives the scene. A shared pointer ref is damped in `PointerDriver`, which also derives velocity from the position error and eases a drag target. `LookbookCard` maps the pointer to world coordinates for magnetic proximity lift, then combines it with velocity sway, drag amplification and tap pulse in position/rotation/scale. `PointerGlow` trails the pointer on a background additive plane; `CameraRig` adds a larger damped parallax and look-at shift. No React state is updated during pointer movement. Canvas `frameloop` switches to `never` when the hero leaves the viewport or the tab is hidden, and to `demand` for one static frame under reduced motion, where pointer listeners are not attached. Declarative geometries/materials are disposed by React Three Fiber.

`HeroVideoSequence` is the only hero background layer beneath the canvas. After hydration, it plays the six local MP4 sources from `src/config/hero-videos.ts` in order, warming the next clip ahead of time and starting it 1.2 s before the current clip ends so the 700 ms CSS opacity crossfade has live frames on both sides. The clips are muted, inline, decorative and have no controls. There is no hero image or poster; no JavaScript, reduced motion, load errors and blocked autoplay leave the charcoal base visible, and playback pauses when the hero leaves the viewport or the tab is hidden. `WebGLGate` resolves `low` below 1024 px and `high` for desktops through `getHeroQuality()`. It waits for both hero intersection and an 800 ms idle window; browsers without `requestIdleCallback` use the same deferred fallback. No WebGL, runtime errors and context loss render `LookbookPoster`, a CSS collage of the same repository imagery. Context-loss detection listens on the stable container in capture phase, and quality changes reset a failed state so a later viewport change can recover.

## Motion architecture

- Components call `useReducedMotion()` directly; no global preference provider is mounted.
- `Reveal`/`ScrollReveal` handle ordinary in-view fades with Motion; content starts at 0.85 opacity so no-JS and slow-hydration states remain readable.
- `SectionHeading` reveals by default and accepts `reveal={false}` when a parent already owns the animation.
- GSAP ScrollTrigger is reserved for scrubbed parallax and desktop pinning. It is registered lazily and set up through an isomorphic layout effect with `gsap.context()`.
- ScrollTrigger ranges refresh after fonts and in-view images load via `observeScrollTriggerRefresh()`.
- Cleanup: `ctx.revert()` and observer disconnect on unmount.
- Page transitions use a 240 ms Motion fade; product/gallery/variant interactions use Motion or CSS only.

## Styling architecture

- CSS variables in `globals.css` for semantic tokens.
- Tailwind config extends colors/fonts/spacing from tokens.
- shadcn/ui components adapted to brand tokens.
- Utility class composition via `clsx`/`tailwind-merge` through `cn()`.

## Configuration

| File | Contents |
| --- | --- |
| `site.ts` | Name, tagline, canonical URL resolution, OG image path |
| `contact.ts` | Env-backed phone, WhatsApp, email, address, hours and channels |
| `navigation.ts` | Nav and footer link arrays including all category routes |
| `animations.ts` | Durations, easings, stagger values |

## Environment

```env
NEXT_PUBLIC_SITE_URL=https://skyybirds.example
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_ADDRESS=
NEXT_PUBLIC_BUSINESS_HOURS=
```

`resolveSiteUrl()` prefers `NEXT_PUBLIC_SITE_URL`, then Vercel's `VERCEL_URL`, then the documented placeholder. The placeholder is never presented as a live contact channel. Never put private credentials in `NEXT_PUBLIC_*`.

## SEO architecture

- `src/lib/seo.ts` exposes `createPageMetadata()` so every route shares canonical, Open Graph and Twitter defaults.
- `root layout` sets `metadataBase`, default metadata and `Organization`/`WebSite` JSON-LD via `StructuredData`.
- Every static route and all product/category routes export metadata; product pages add `Product` and `BreadcrumbList` JSON-LD.
- `public/images/brand/sky-birds-og.png` is the generated 1200×630 social image, reproducible with `npm run images:og`.
- `src/app/sitemap.ts` enumerates all public routes from the repository; `src/app/robots.ts` disallows private paths and points to the sitemap.
- 404 metadata is `noindex, nofollow` and the page offers branded recovery links.
- `npm run verify:routes` starts the production server and smoke-checks status codes, canonical tags, OG images, main landmarks, h1s, 404 behavior, `robots.txt` and `sitemap.xml`.

## Future backend seam

Repository functions are async-friendly now even though data is local. A future CMS/API can replace their internals without changing pages. See `15-future-backend-integration.md`.
