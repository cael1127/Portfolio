import { useEffect } from 'react';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../siteConfig';
import { useRoutePath } from '../context/RouteContext';

function setMetaTag(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonicalLink(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Updates document title + meta description/canonical/OG tags for the current route.
// Google's crawler executes JS and picks these up; OG scrapers (LinkedIn, Twitter,
// Facebook) do not, so social share previews still use the static tags in index.html
// until the site is prerendered or server-rendered.
export default function usePageMeta({ title, description, image } = {}) {
  const path = useRoutePath();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const fullTitle = title ? `${title} — Cael Findley` : 'Cael Findley — Software Engineer';
    const cleanPath = (path || '').replace(/^\/+/, '').replace(/\/+$/, '');
    const url = cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
    const ogImage = image || DEFAULT_OG_IMAGE;
    const trimmedDescription =
      description && description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description;

    document.title = fullTitle;
    setMetaTag('name', 'description', trimmedDescription);
    setCanonicalLink(url);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', trimmedDescription);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'twitter:title', fullTitle);
    setMetaTag('property', 'twitter:description', trimmedDescription);
    setMetaTag('property', 'twitter:image', ogImage);
  }, [title, description, image, path]);
}
