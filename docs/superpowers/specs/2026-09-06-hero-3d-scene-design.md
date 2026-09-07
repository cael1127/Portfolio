# Hero 3D scene — design

**Status:** Approved for implementation
**Date:** 2026-09-06

## Problem

The portfolio's hero (`src/components/Home.jsx`) is text-forward and static:
a CSS grid texture, a radial gradient wash, and `AmbientBackground`'s two
blurred blobs. There is no 3D anything in the codebase. The goal is a
tasteful, on-brand 3D centerpiece that adds visual distinction without
fighting the site's minimalist editorial tone or hurting the Core Web
Vitals numbers the SEO work just improved.

## Approach

A drifting 3D "constellation" — ~70 points connected by thin lines when
close together — positioned behind the hero text, rendered in the site's
existing accent color at low opacity. Chosen over a single abstract blob
(more generic, "every AI startup has one") and over a literal 3D scene of
floating tech icons (highest risk of clashing with the minimalist tone and
of mobile jank). A node/constellation network reads as "systems," which
fits an engineer's site, and particles are cheap to keep performant.

## Architecture

**New dependencies:** `three`, `@react-three/fiber`. Not `@react-three/drei`
— its helpers (OrbitControls, environment maps, etc.) aren't needed here;
plain R3F intrinsics (`<points>`, `<lineSegments>`) are sufficient and keep
the dependency footprint smaller.

**New component:** `src/components/HeroScene.jsx`. Single file — this is a
single-purpose visual, not a reusable scene system.

**Integration:** `React.lazy(() => import('./HeroScene'))` wrapped in
`<Suspense fallback={null}>`, mounted inside `Home.jsx`'s existing hero
`<section>`, absolutely positioned behind the text content alongside the
current `AmbientBackground`/grid-texture layers. Nothing existing is
removed; this adds one more layer to the existing stack.

**Theming:** reads `theme` from the already-wired-but-unused
`useTheme()` (`src/context/ThemeContext.jsx`) and picks the matching
accent hex (`#a31f34` dark / `#500000` light) to match `--accent` in
`index.css`. Point/line colors are set imperatively at material-creation
time and re-derived if `theme` changes.

## Behavior

- **Idle animation:** the whole point/line group self-rotates slowly
  (~0.02 rad/s) via `useFrame`, so it always has gentle motion even with
  zero interactivity.
- **Desktop pointer parallax:** the group also tilts a few degrees toward
  the cursor, smoothed via lerp in `useFrame` (no hard snapping).
- **Mobile/touch:** renders the same scene but skips the pointer-parallax
  branch entirely — self-rotation only. No pointer-position dependency to
  break on touch devices.
- **`prefers-reduced-motion: reduce`:** the component is not rendered at
  all; the hero falls back to today's static background layers only.
- No `OrbitControls` or any user camera manipulation — this is a passive
  background layer, `pointer-events-none`, and must never intercept
  clicks intended for the hero text/buttons.

## Performance

- Points render as one `THREE.Points` (BufferGeometry), connecting lines
  as one `THREE.LineSegments` (BufferGeometry) — not one object per
  point/line pair — regardless of point count.
- `<Canvas dpr={[1, 1.5]}>` caps device-pixel-ratio rendering cost on
  high-DPI mobile screens.
- `gl={{ powerPreference: 'low-power' }}` on the Canvas.
- The three.js/R3F chunk loads lazily and asynchronously; it must not
  appear in the main JS bundle (verified by checking the build output for
  a separate chunk, not a main-bundle size jump).
- The render loop pauses (`<Canvas frameloop="never">`) whenever the hero
  section is scrolled out of view, via an `IntersectionObserver` on the
  hero, and resumes when it re-enters. Without this, a 60fps WebGL loop
  keeps running for the entire session on pages taller than the hero,
  burning GPU/battery for pixels nobody can see. (Added post-review —
  the original spec covered dpr/power-preference/buffering/code-splitting
  but missed visibility, which the final whole-branch review flagged as
  the more consequential lever for a page this tall.)
- A local error boundary (not the app's root one) wraps the lazy
  `<Suspense>`/`<HeroScene>` tree with a silent (`null`) fallback. This is
  a purely decorative layer — a WebGL context failure or a lazy-chunk
  load failure must fall back to the existing static background, not
  propagate to the app's root error boundary and replace the entire site
  with an error screen. (Added post-review — the original spec's example
  integration snippet omitted this; see the implementation plan's
  post-implementation amendment for the corrected snippet.)

## Testing / verification

This is a visual feature with no business logic to unit test. Verification
is: production build succeeds and the three.js code splits into its own
chunk; manual check in the browser at desktop and mobile viewport widths;
`prefers-reduced-motion: reduce` emulation shows the static fallback with
no console errors; no regressions to the existing hero text/CTA
interactions (they must remain clickable through the `pointer-events-none`
canvas layer).

## Out of scope

- No 3D anywhere else on the site yet (product configurator demo, other
  sections) — this spec covers the hero only.
- No Higgsfield-generated video in this pass — separate follow-up once
  this lands.
