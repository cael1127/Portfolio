# Hero 3D Scene Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a lazy-loaded, theme-aware 3D particle/node "constellation" behind the hero text on the homepage.

**Architecture:** A pure-JS math module (point generation, connection-building, accent color lookup, media-query helpers) with real unit tests, consumed by a `react-three-fiber` component that is lazy-loaded and mounted as one more absolutely-positioned background layer in the existing hero section.

**Tech Stack:** React 18, `three`, `@react-three/fiber` (new dependencies), Jest (existing `react-scripts test` setup — see `src/__tests__/demoUtils.test.js` for the project's existing plain-Jest convention this plan follows).

**Spec:** [docs/superpowers/specs/2026-09-06-hero-3d-scene-design.md](../specs/2026-09-06-hero-3d-scene-design.md)

## Global Constraints

- New dependencies are limited to `three` and `@react-three/fiber` — do not add `@react-three/drei` or any other package.
- The scene component must be `React.lazy`-loaded inside `<Suspense fallback={null}>` — it must never be part of the main JS bundle.
- Must not render at all when `prefers-reduced-motion: reduce` is set (fall back to the existing static hero background only).
- Must skip pointer-parallax (self-rotation only, no cursor tracking) when `window.matchMedia('(pointer: coarse)').matches` is true.
- The canvas layer must be `pointer-events-none` and must never block clicks on existing hero text/buttons.
- Point/line color comes from `getAccentColor(theme)` and must exactly match `--accent` in `src/index.css`: `#a31f34` for `dark`, `#500000` for `light`.

---

### Task 1: Scene math utilities

**Files:**
- Create: `src/utils/heroScene.js`
- Test: `src/__tests__/heroScene.test.js`

**Interfaces:**
- Produces: `generatePoints(count: number, seed: number): number[][]` — array of `[x, y, z]` triples, `x` in `[-6, 6]`, `y` in `[-3, 3]`, `z` in `[-4, 2]`.
- Produces: `buildConnections(points: number[][], maxDistance: number): number[][]` — array of `[i, j]` index pairs (`i < j`) where the Euclidean distance between `points[i]` and `points[j]` is less than `maxDistance`.
- Produces: `getAccentColor(theme: 'dark' | 'light' | undefined): string` — hex color string.
- Produces: `prefersReducedMotion(): boolean`
- Produces: `hasCoarsePointer(): boolean`

- [ ] **Step 1: Write the failing tests**

Create `src/__tests__/heroScene.test.js`:

```js
import {
  generatePoints,
  buildConnections,
  getAccentColor,
  prefersReducedMotion,
  hasCoarsePointer,
} from '../utils/heroScene';

function mockMatchMedia(matches) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
}

test('generatePoints returns the requested count within bounds', () => {
  const points = generatePoints(70, 1);
  expect(points).toHaveLength(70);
  points.forEach(([x, y, z]) => {
    expect(x).toBeGreaterThanOrEqual(-6);
    expect(x).toBeLessThanOrEqual(6);
    expect(y).toBeGreaterThanOrEqual(-3);
    expect(y).toBeLessThanOrEqual(3);
    expect(z).toBeGreaterThanOrEqual(-4);
    expect(z).toBeLessThanOrEqual(2);
  });
});

test('generatePoints is deterministic for a given seed', () => {
  expect(generatePoints(10, 42)).toEqual(generatePoints(10, 42));
});

test('generatePoints produces different output for different seeds', () => {
  expect(generatePoints(10, 1)).not.toEqual(generatePoints(10, 2));
});

test('buildConnections links points within range', () => {
  const points = [[0, 0, 0], [1, 0, 0], [10, 0, 0]];
  expect(buildConnections(points, 2)).toEqual([[0, 1]]);
});

test('buildConnections returns no pairs when nothing is within range', () => {
  const points = [[0, 0, 0], [10, 0, 0]];
  expect(buildConnections(points, 2)).toEqual([]);
});

test('buildConnections handles multiple qualifying pairs', () => {
  const points = [[0, 0, 0], [1, 0, 0], [1.5, 0, 0]];
  expect(buildConnections(points, 2)).toEqual([[0, 1], [0, 2], [1, 2]]);
});

test('getAccentColor returns the dark accent', () => {
  expect(getAccentColor('dark')).toBe('#a31f34');
});

test('getAccentColor returns the light accent', () => {
  expect(getAccentColor('light')).toBe('#500000');
});

test('getAccentColor defaults to dark for unknown input', () => {
  expect(getAccentColor(undefined)).toBe('#a31f34');
});

test('prefersReducedMotion reflects matchMedia', () => {
  mockMatchMedia(true);
  expect(prefersReducedMotion()).toBe(true);
  mockMatchMedia(false);
  expect(prefersReducedMotion()).toBe(false);
});

test('hasCoarsePointer reflects matchMedia', () => {
  mockMatchMedia(true);
  expect(hasCoarsePointer()).toBe(true);
  mockMatchMedia(false);
  expect(hasCoarsePointer()).toBe(false);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx react-scripts test src/__tests__/heroScene.test.js --watchAll=false`
Expected: FAIL — `Cannot find module '../utils/heroScene'`

- [ ] **Step 3: Write the implementation**

Create `src/utils/heroScene.js`:

```js
// Deterministic PRNG (mulberry32) so the constellation is reproducible in tests
// and doesn't "pop" to a different shape on every render.
function mulberry32(seed) {
  let state = seed | 0;
  return function random() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generatePoints(count, seed = 1) {
  const random = mulberry32(seed);
  const points = [];
  for (let i = 0; i < count; i += 1) {
    const x = random() * 12 - 6;
    const y = random() * 6 - 3;
    const z = random() * 6 - 4;
    points.push([x, y, z]);
  }
  return points;
}

function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function buildConnections(points, maxDistance) {
  const connections = [];
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      if (distance(points[i], points[j]) < maxDistance) {
        connections.push([i, j]);
      }
    }
  }
  return connections;
}

const ACCENT_BY_THEME = { dark: '#a31f34', light: '#500000' };

export function getAccentColor(theme) {
  return ACCENT_BY_THEME[theme] || ACCENT_BY_THEME.dark;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function hasCoarsePointer() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(pointer: coarse)').matches;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx react-scripts test src/__tests__/heroScene.test.js --watchAll=false`
Expected: PASS — 11 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/utils/heroScene.js src/__tests__/heroScene.test.js
git commit -m "Add scene-math utilities for the hero 3D constellation"
```

---

### Task 2: HeroScene component and hero integration

**Files:**
- Modify: `package.json` (add `three`, `@react-three/fiber`)
- Create: `src/components/HeroScene.jsx`
- Modify: `src/components/Home.jsx`

**Interfaces:**
- Consumes (from Task 1): `generatePoints(count, seed)`, `buildConnections(points, maxDistance)`, `getAccentColor(theme)`, `prefersReducedMotion()`, `hasCoarsePointer()`
- Consumes (existing): `useTheme()` from `../context/ThemeContext` → `{ theme: 'dark' | 'light' }`
- Produces: default export `HeroScene` (React component, no props) from `src/components/HeroScene.jsx`

This task has no automated test: `react-three-fiber` renders to a WebGL context that `jsdom` (the test environment) does not provide, so a component-render test would require heavyweight WebGL mocking with no real signal. Verification is a build check plus manual browser checks, both given as exact steps below.

- [ ] **Step 1: Install the 3D dependencies**

Run: `npm install three @react-three/fiber`
Expected: `package.json` `dependencies` now include `three` and `@react-three/fiber`; install exits 0 with no peer-dependency errors (both packages support React 18, which this project already uses).

- [ ] **Step 2: Create the HeroScene component**

Create `src/components/HeroScene.jsx`:

```jsx
import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';
import {
  generatePoints,
  buildConnections,
  getAccentColor,
  hasCoarsePointer,
} from '../utils/heroScene';

const POINT_COUNT = 70;
const SEED = 1;
const MAX_CONNECTION_DISTANCE = 2.2;

function ConstellationGroup({ color }) {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const interactive = useMemo(() => !hasCoarsePointer(), []);

  const points = useMemo(() => generatePoints(POINT_COUNT, SEED), []);
  const connections = useMemo(
    () => buildConnections(points, MAX_CONNECTION_DISTANCE),
    [points]
  );

  const pointPositions = useMemo(() => new Float32Array(points.flat()), [points]);
  const linePositions = useMemo(() => {
    const array = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      array.set([...points[a], ...points[b]], i * 6);
    });
    return array;
  }, [points, connections]);

  useEffect(() => {
    if (!interactive) return undefined;
    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [interactive]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * 0.02;
    if (interactive) {
      const targetTiltX = pointer.current.y * 0.15;
      const targetTiltZ = pointer.current.x * 0.15;
      group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;
      group.rotation.z += (targetTiltZ - group.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointPositions.length / 3}
            array={pointPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={color} size={0.05} sizeAttenuation transparent opacity={0.8} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const color = getAccentColor(theme);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      >
        <ConstellationGroup color={color} />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Wire HeroScene into the hero, lazily and behind a reduced-motion gate**

In `src/components/Home.jsx`, update the imports (add to the existing import block):

```jsx
import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
```

Add near the other top-level imports:

```jsx
import { prefersReducedMotion } from '../utils/heroScene';

const HeroScene = lazy(() => import('./HeroScene'));
```

Inside the `Home` component, after the existing `usePageMeta({...})` call, add:

```jsx
  const [show3DScene, setShow3DScene] = useState(false);
  useEffect(() => {
    setShow3DScene(!prefersReducedMotion());
  }, []);
```

In the JSX, inside the hero `<section>`, insert the scene between the existing `motion.div` (the `hero-wash` background) and the `page-shell` content div:

```jsx
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]"
          style={{ background: 'var(--hero-wash)' }}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: easeOut }}
        />

        {show3DScene && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}

        <div className="page-shell relative pt-20 pb-10 md:pt-28">
```

- [ ] **Step 4: Verify the production build and code-splitting**

Run: `npm run build`
Expected: exits 0, "Compiled successfully." The "File sizes after gzip" section lists more than one JS file (the lazy `HeroScene`/three.js chunk, separate from `main.*.js`) — confirming it did not get merged into the main bundle.

- [ ] **Step 5: Verify in the browser — desktop**

Run: `npm start`, open `http://localhost:3000`.
Expected: the constellation of connected points is visible behind the "Cael Findley" hero text, slowly rotating; moving the mouse subtly tilts it. Open the browser DevTools console: no errors. Click the "Work" nav link and a hero CTA button to confirm they're still clickable (the canvas layer must not block them).

- [ ] **Step 6: Verify in the browser — mobile viewport**

Resize the browser (or use DevTools device emulation) to a mobile width (e.g. 375px).
Expected: the scene still renders (self-rotating), no console errors, no layout shift or overflow.

- [ ] **Step 7: Verify `prefers-reduced-motion: reduce`**

In Chrome DevTools: Rendering tab → "Emulate CSS media feature prefers-reduced-motion" → "reduce". Reload the page.
Expected: the hero shows only the existing static background (grid texture + wash) — no 3D scene renders, no console errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/components/HeroScene.jsx src/components/Home.jsx
git commit -m "Add 3D constellation to the hero, lazy-loaded and reduced-motion aware"
```
