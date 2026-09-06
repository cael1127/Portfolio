// ACF — AI assistant for the portfolio. Update this summary as work.js changes.
const PORTFOLIO_CONTEXT = `You are ACF, the AI assistant embedded in Cael Findley's software engineering portfolio.

About Cael:
- Studying Computer Science at Texas A&M Engineering.
- Full-stack software engineer who ships production systems, not just demos.
- Contact: caelfindley@gmail.com · GitHub: github.com/cael1127 · LinkedIn: linkedin.com/in/cael-findley-a45541394

Selected client & production work:
- Three Sisters Oyster Co. — production e-commerce storefront for a Gulf Coast aquaculture business (React, Node.js, Stripe, MongoDB).
- Bapux, UIL Academy, BPAWD, MinBod, JF Portfolio — client web builds across e-commerce, education, and competition platforms.

Systems & product work:
- AquaFarm — TypeScript tooling for aquaculture monitoring and ops dashboards.
- BoltPlanner — planning product focused on fast capture and clean execution flows.
- Grabby, Neurals, Atlus — systems-level experiments (utilities, neural building blocks, product exploration).

The site also hosts a large library of interactive demos and labs covering AI/ML, cybersecurity, DevOps, and full-stack architecture — these are deterministic client-side simulations meant to demonstrate range, not production deployments.

Your job: help visitors (mostly recruiters, hiring managers, and engineers) quickly understand what Cael has built and whether he's a fit for their role. Be concise, specific, and honest — if you don't know something, say so and point them to the Work or Contact pages instead of guessing. Keep replies conversational and under ~120 words unless asked for detail.`;

const FALLBACK_MESSAGE =
  "I'm still getting my AI brain wired up — check back soon! In the meantime, feel free to browse using the nav above or ⌘K search.";

const PROVIDERS = {
  anthropic: {
    url: 'https://api.anthropic.com/v1/messages',
    headers: (key) => ({
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    }),
    body: (messages, system) => ({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
      max_tokens: 500,
      system,
      messages,
    }),
    extract: (data) => data?.content?.[0]?.text,
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    headers: (key) => ({
      Authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    }),
    body: (messages, system) => ({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      max_tokens: 500,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
    extract: (data) => data?.choices?.[0]?.message?.content,
  },
};

function resolveProvider() {
  const configured = process.env.LLM_PROVIDER;
  if (configured && PROVIDERS[configured]) return configured;
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.OPENAI_API_KEY) return 'openai';
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let message;
  let conversationHistory = [];
  try {
    ({ message, conversationHistory = [] } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!message || typeof message !== 'string') {
    return { statusCode: 400, body: JSON.stringify({ error: 'message is required' }) };
  }

  const providerName = resolveProvider();
  const apiKey =
    providerName === 'anthropic'
      ? process.env.ANTHROPIC_API_KEY
      : providerName === 'openai'
      ? process.env.OPENAI_API_KEY
      : null;

  if (!providerName || !apiKey) {
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ response: FALLBACK_MESSAGE }),
    };
  }

  const provider = PROVIDERS[providerName];
  const messages = [
    ...conversationHistory
      .slice(-10)
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
    { role: 'user', content: message },
  ];

  try {
    const res = await fetch(provider.url, {
      method: 'POST',
      headers: provider.headers(apiKey),
      body: JSON.stringify(provider.body(messages, PORTFOLIO_CONTEXT)),
    });

    if (!res.ok) {
      throw new Error(`${providerName} API responded ${res.status}`);
    }

    const data = await res.json();
    const text = provider.extract(data);

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ response: text || FALLBACK_MESSAGE }),
    };
  } catch (error) {
    console.error('chat function error:', error);
    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ response: FALLBACK_MESSAGE }),
    };
  }
};
