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
