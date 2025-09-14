import { formatDetectionLabel, computeCartTotal, retentionDeltas, nextVariant, appendMessage, generateTranscript } from '../utils/demoUtils';

test('formatDetectionLabel', () => {
  expect(formatDetectionLabel('person', 0.981)).toBe('person 98%');
});

test('computeCartTotal', () => {
  const products = [{ id:'a', price: 10 }, { id:'b', price: 5 }];
  const cart = [['a',2], ['b',3]];
  expect(computeCartTotal(cart, products)).toBe(2*10 + 3*5);
});

test('retentionDeltas', () => {
  const data = [{ month:'2025-01', users: 100 }];
  expect(retentionDeltas(data)[0]).toEqual({ month:'2025-01', d30: 60, d60: 45 });
});

test('nextVariant', () => {
  const variants = [{id:'a'},{id:'b'},{id:'c'}];
  expect(nextVariant('a', variants)).toBe('b');
  expect(nextVariant('c', variants)).toBe('a');
});

test('appendMessage dedup', () => {
  const now = Date.now();
  const msgs = [{ userId:'u1', ts: now, body:'hi' }];
  const appended = appendMessage(msgs, { userId:'u1', ts: now, body:'hi again' });
  expect(appended).toHaveLength(1);
});

test('generateTranscript', () => {
  const t = generateTranscript();
  expect(t).toHaveLength(3);
  expect(t[0].text).toMatch(/Welcome/);
});


