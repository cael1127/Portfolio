import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { filterWork, workCategories } from '../data/work';
import { fetchRepoMeta } from '../utils/github';
import { easeOut } from '../utils/motion';
import usePageMeta from '../hooks/usePageMeta';
import WordReveal from './motion/WordReveal';
import Reveal from './motion/Reveal';
import Button from './ui/Button';

const INTERNAL_PAGES = new Set([
  'three-sisters-oyster-project',
  'bapux-project',
  'bpawd-project',
  'uil-academy-project',
  'minbod-project',
  'jf-resume-project',
  'object-detection-demo',
  'saas-analytics-demo',
  'ecommerce-demo',
  'realtime-chat-demo',
  // Systems / GitHub case studies
  'aquaFarm',
  'boltPlanner',
  'grabby',
  'neurals',
  'AtlusPersonal',
  'aisw',
  'physics',
  'terminalUI',
]);

export default function Work({ setCurrentPage }) {
  usePageMeta({
    title: 'Work',
    description:
      'Selected client work, production systems, and interactive engineering demos by Cael Findley.',
  });
  const [category, setCategory] = useState('featured');
  const [repoMeta, setRepoMeta] = useState({});
  const [hovered, setHovered] = useState(null);

  const finePointer =
    typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const cx = useSpring(px, { stiffness: 250, damping: 28, mass: 0.5 });
  const cy = useSpring(py, { stiffness: 250, damping: 28, mass: 0.5 });
  const listRef = useRef(null);

  const handleMove = (e) => {
    if (!finePointer) return;
    px.set(e.clientX + 24);
    py.set(e.clientY - 90);
  };

  const items = useMemo(() => filterWork(category), [category]);

  useEffect(() => {
    let cancelled = false;
    const withGithub = filterWork('all').filter((w) => w.github);

    (async () => {
      const results = await Promise.all(
        withGithub.map(async (w) => {
          try {
            const data = await fetchRepoMeta(w.github);
            return [w.github, { ok: true, data }];
          } catch (e) {
            return [w.github, { ok: false, error: String(e?.message || e) }];
          }
        })
      );
      if (!cancelled) setRepoMeta(Object.fromEntries(results));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const openItem = (item) => {
    if (INTERNAL_PAGES.has(item.id)) {
      setCurrentPage(item.id);
      return;
    }
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (item.github) {
      window.open(`https://github.com/${item.github}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen text-[var(--text)]">
      {/* ── Header ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <div className="page-shell relative pt-20 pb-12 md:pt-28 md:pb-16">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            Work — {String(items.length).padStart(2, '0')} projects
          </motion.p>
          <h1 className="display mt-5 text-mega text-[var(--text)]">
            <WordReveal text="Selected" className="block" duration={0.7} />
            <span className="block text-[var(--accent)]">
              <WordReveal text="projects" delay={0.1} duration={0.7} />
            </span>
          </h1>
          <Reveal delay={0.3} className="mt-8 max-w-xl text-sub text-[var(--muted)] text-balance">
            Client systems and GitHub projects. Labs are honest interaction sketches —
            not a demo farm.
          </Reveal>

          <motion.div
            className="mt-10 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: easeOut }}
          >
            {workCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ease-out ${
                  category === c.id
                    ? 'text-[var(--accent-fg)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {category === c.id && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 -z-0 rounded-full bg-[var(--accent)]"
                    transition={{ duration: 0.3, ease: easeOut }}
                  />
                )}
                <span className="relative z-10">{c.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Index ────────────────────────────────────── */}
      <div className="page-shell pb-24" ref={listRef} onMouseMove={handleMove}>
        <AnimatePresence mode="wait">
          <motion.ul
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="border-b border-[var(--border)]"
          >
            {items.map((item, i) => {
              const meta = item.github ? repoMeta[item.github] : null;
              const stars = meta?.ok ? meta.data?.stargazers_count : null;
              const lang = meta?.ok ? meta.data?.language : null;

              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easeOut, delay: i * 0.05 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => openItem(item)}
                    onMouseEnter={() => setHovered(item)}
                    onMouseLeave={() => setHovered((h) => (h?.id === item.id ? null : h))}
                    whileHover="hover"
                    initial="initial"
                    className="group relative grid w-full grid-cols-[auto_1fr] items-start gap-4 border-t border-[var(--border)] py-8 text-left md:grid-cols-[3rem_1fr_auto] md:gap-8 md:py-10"
                  >
                    <motion.span
                      className="absolute inset-0 -z-0 origin-left bg-[var(--surface)]"
                      variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                      transition={{ duration: 0.4, ease: easeOut }}
                    />

                    <span className="relative pt-2 font-mono text-xs text-[var(--muted)] md:text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h2 className="display text-2xl text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)] md:text-4xl">
                          {item.title}
                        </h2>
                        {item.isLab && (
                          <span className="rounded border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]">
                            Lab
                          </span>
                        )}
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                          {item.category}
                        </span>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm text-[var(--muted)] md:text-base">
                        {item.blurb || item.subtitle}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex items-center gap-4 pt-2 md:flex-col md:items-end md:gap-2">
                      <span className="font-mono text-xs text-[var(--muted)]">{item.year}</span>
                      {(stars != null || lang) && (
                        <span className="font-mono text-xs text-[var(--muted)]">
                          {lang || ''}
                          {lang && stars != null ? ' · ' : ''}
                          {stars != null ? `${stars}★` : ''}
                        </span>
                      )}
                      <motion.span
                        className="text-[var(--accent)] md:mt-auto"
                        variants={{ hover: { x: 6, opacity: 1 }, initial: { x: 0, opacity: 0.4 } }}
                        transition={{ duration: 0.2, ease: easeOut }}
                      >
                        ↗
                      </motion.span>
                    </div>
                  </motion.button>
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>

        {items.length === 0 && (
          <p className="py-16 text-center text-[var(--muted)]">Nothing in this filter yet.</p>
        )}

        <Reveal className="mt-12 flex flex-wrap gap-3">
          <Button
            as="a"
            href="https://github.com/cael1127?tab=repositories"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            Browse GitHub
          </Button>
        </Reveal>
      </div>

      {/* ── Cursor-following preview ──────────────────── */}
      {finePointer && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
          style={{ x: cx, y: cy }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="h-52 w-72 overflow-hidden rounded-md border border-[var(--border-strong)] shadow-2xl"
                style={{
                  backgroundColor: 'var(--surface)',
                  backgroundImage:
                    'radial-gradient(ellipse 80% 70% at 20% 0%, var(--accent-soft), transparent 60%)',
                }}
              >
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                      {hovered.category}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted)]">{hovered.year}</span>
                  </div>
                  <div>
                    <div className="display text-[2.75rem] leading-[0.9] text-[var(--text)]">
                      {hovered.title.charAt(0)}
                    </div>
                    <h3 className="mt-2 text-base font-medium text-[var(--text)]">{hovered.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                      {hovered.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--muted)]">
                    <span className="text-[var(--accent)]">↗</span>
                    {INTERNAL_PAGES.has(hovered.id)
                      ? 'Read case study'
                      : hovered.href
                      ? 'Visit site'
                      : hovered.github
                      ? 'View source'
                      : 'Open'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
