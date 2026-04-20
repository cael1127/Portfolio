const DAY_MS = 24 * 60 * 60 * 1000;

function storageKey(fullName) {
  return `github_repo_meta_v1:${fullName}`;
}

export async function fetchRepoMeta(fullName, { ttlMs = DAY_MS } = {}) {
  if (typeof window !== 'undefined') {
    try {
      const raw = window.sessionStorage.getItem(storageKey(fullName));
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.fetchedAt && Date.now() - parsed.fetchedAt < ttlMs && parsed?.data) {
          return parsed.data;
        }
      }
    } catch {
      // ignore cache errors
    }
  }

  const resp = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`GitHub repo fetch failed (${resp.status}): ${text || resp.statusText}`);
  }

  const data = await resp.json();

  if (typeof window !== 'undefined') {
    try {
      window.sessionStorage.setItem(
        storageKey(fullName),
        JSON.stringify({ fetchedAt: Date.now(), data })
      );
    } catch {
      // ignore cache errors
    }
  }

  return data;
}

