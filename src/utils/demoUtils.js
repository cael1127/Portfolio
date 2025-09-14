// Deterministic utilities used across demos so employers can inspect logic

// Object detection label formatter
export function formatDetectionLabel(id, score) {
  const pct = Math.round(score * 100);
  return `${id} ${pct}%`;
}

// Ecommerce cart total
export function computeCartTotal(cartEntries, products) {
  // cartEntries: Array<[id, qty]>
  const map = new Map(cartEntries);
  let sum = 0;
  for (const [id, qty] of map) {
    const p = products.find((x) => x.id === id);
    if (p) sum += p.price * qty;
  }
  return sum;
}

// SaaS analytics retention calculation
export function retentionDeltas(cohorts) {
  // cohorts: [{ month: 'YYYY-MM', users: number }]
  return cohorts.map((c) => ({
    month: c.month,
    d30: Math.round(c.users * 0.6),
    d60: Math.round(c.users * 0.45),
  }));
}

// Configurator variant switching
export function nextVariant(currentId, variants) {
  const idx = variants.findIndex((v) => v.id === currentId);
  if (idx < 0) return variants[0]?.id;
  const next = (idx + 1) % variants.length;
  return variants[next].id;
}

// Chat message appender (dedup by ts+user)
export function appendMessage(messages, msg) {
  const key = `${msg.userId}-${msg.ts}`;
  const has = messages.some((m) => `${m.userId}-${m.ts}` === key);
  return has ? messages : [...messages, msg];
}

// Audio transcript generator (deterministic)
export function generateTranscript() {
  return [
    { t: '00:00', speaker: 'A', text: 'Welcome to the demo meeting.' },
    { t: '00:04', speaker: 'B', text: 'Agenda: roadmap and hiring updates.' },
    { t: '00:09', speaker: 'A', text: 'We shipped the analytics module last week.' },
  ];
}


