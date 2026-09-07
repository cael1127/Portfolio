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
