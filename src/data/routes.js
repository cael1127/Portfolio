// Single source of truth for page IDs -> URL slugs.
// The slug map itself lives in pageSlugs.json so scripts/generate-sitemap.js
// (plain Node, no JSX/ESM build step) can read it without a bundler.
import pageSlugs from './pageSlugs.json';

export const PAGE_SLUGS = pageSlugs;

// Blog posts use a synthetic `blog-<slug>` page id (see App.jsx renderContent);
// give them a real URL instead of falling back to '/'.
export function pageIdToPath(pageId) {
  if (typeof pageId === 'string' && pageId.startsWith('blog-')) {
    return `/blog/${pageId.slice('blog-'.length)}`;
  }
  const slug = PAGE_SLUGS[pageId];
  return slug ? `/${slug}` : '/';
}

export function pathToPageId(pathname) {
  const clean = (pathname || '').replace(/^\/+|\/+$/g, '');
  if (clean.startsWith('blog/') && clean.length > 'blog/'.length) {
    return `blog-${clean.slice('blog/'.length)}`;
  }
  return null;
}

export const SYSTEMS_PAGE_IDS = [
  'aquaFarm',
  'boltPlanner',
  'grabby',
  'neurals',
  'AtlusPersonal',
  'aisw',
  'physics',
  'terminalUI',
];
