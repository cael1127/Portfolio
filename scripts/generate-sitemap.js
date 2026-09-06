// Regenerates public/sitemap.xml from the same route data the app uses for
// routing, plus blog post slugs. Run automatically via the `postbuild` script
// so the sitemap can't drift out of sync with the site's actual pages again.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://findley.netlify.app';
const TODAY = new Date().toISOString().slice(0, 10);

const pageSlugs = require('../src/data/pageSlugs.json');

function extractBlogSlugs() {
  const source = fs.readFileSync(path.join(__dirname, '../src/data/blogPosts.js'), 'utf8');
  const matches = [...source.matchAll(/slug:\s*'([^']+)'/g)];
  return matches.map((m) => m[1]);
}

// Priority reflects how much a page matters for search ranking, not traffic.
function priorityFor(slug) {
  if (slug === '') return '1.0';
  if (['work', 'about', 'resume'].includes(slug)) return '0.9';
  if (slug === 'blog') return '0.8';
  if (slug.startsWith('blog/')) return '0.6';
  return '0.7';
}

function buildUrls() {
  const slugs = new Set(Object.values(pageSlugs));
  const blogSlugs = extractBlogSlugs();
  blogSlugs.forEach((slug) => slugs.add(`blog/${slug}`));
  return [...slugs].sort();
}

function buildSitemap() {
  const urls = buildUrls()
    .map((slug) => {
      const loc = slug ? `${SITE_URL}/${slug}` : `${SITE_URL}/`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priorityFor(slug)}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, buildSitemap());
console.log(`sitemap.xml written with ${buildUrls().length} URLs`);
