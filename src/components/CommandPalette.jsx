import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { workItems } from '../data/work';
import { easeOut } from '../utils/motion';

const PAGES = [
  { id: 'home', label: 'Home', keywords: 'home start' },
  { id: 'work', label: 'Work', keywords: 'projects portfolio github' },
  { id: 'blog', label: 'Blog', keywords: 'writing posts' },
  { id: 'education', label: 'About', keywords: 'about education tamu' },
  { id: 'resume', label: 'Resume', keywords: 'cv pdf' },
];

export default function CommandPalette({ open, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pageHits = PAGES.filter(
      (p) =>
        !q ||
        p.label.toLowerCase().includes(q) ||
        p.keywords.includes(q) ||
        p.id.includes(q)
    ).map((p) => ({ type: 'page', ...p }));

    const workHits = workItems
      .filter(
        (w) =>
          !q ||
          w.title.toLowerCase().includes(q) ||
          w.blurb.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 8)
      .map((w) => ({ type: 'work', id: w.id, label: w.title, keywords: w.subtitle }));

    return [...pageHits, ...workHits];
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[active]) {
        e.preventDefault();
        onNavigate(results[active].id);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, active, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: easeOut }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="w-full max-w-lg overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeOut }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[var(--border)] px-4 py-3">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages and projects…"
                className="w-full bg-transparent text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
              />
            </div>
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-[var(--muted)]">No matches</li>
              )}
              {results.map((item, i) => (
                <li key={`${item.type}-${item.id}`}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      i === active
                        ? 'bg-[var(--accent-soft)] text-[var(--text)]'
                        : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                    }`}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                      {item.type}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-[var(--border)] px-4 py-2 font-mono text-[10px] text-[var(--muted)]">
              ↑↓ navigate · Enter open · Esc close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
