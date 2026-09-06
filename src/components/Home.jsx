import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from './ui/Button';
import ContactModal from './ContactModal';
import WordReveal from './motion/WordReveal';
import Marquee from './motion/Marquee';
import Magnetic from './motion/Magnetic';
import Reveal from './motion/Reveal';
import { featuredWork } from '../data/work';
import { easeOut } from '../utils/motion';
import usePageMeta from '../hooks/usePageMeta';

const INTERNAL_WORK_IDS = new Set([
  'three-sisters-oyster-project',
  'bapux-project',
  'bpawd-project',
  'uil-academy-project',
  'minbod-project',
  'jf-resume-project',
  'aquaFarm',
  'boltPlanner',
  'grabby',
  'neurals',
  'AtlusPersonal',
  'aisw',
  'physics',
  'terminalUI',
]);

const MARQUEE_ITEMS = [
  'React',
  'TypeScript',
  'Node',
  'Rust',
  'Systems',
  'Aquaculture',
  'E-commerce',
  'Product Engineering',
];

const Home = ({ setCurrentPage }) => {
  usePageMeta({
    description:
      'Cael Findley — software engineer shipping production systems for real businesses. Studying Computer Science at Texas A&M Engineering.',
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const spotlight = featuredWork.slice(0, 5);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const metaY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const openItem = (item) => {
    if (INTERNAL_WORK_IDS.has(item.id) || item.isLab || item.slug.includes('-demo')) {
      setCurrentPage(item.id);
    } else if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else if (item.github) {
      window.open(`https://github.com/${item.github}`, '_blank', 'noopener,noreferrer');
    } else {
      setCurrentPage('work');
    }
  };

  return (
    <div className="relative min-h-screen text-[var(--text)]">
      {/* ── Hero ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]"
          style={{ background: 'var(--hero-wash)' }}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: easeOut }}
        />

        <div className="page-shell relative pt-20 pb-10 md:pt-28">
          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <span className="text-[var(--accent)]">●</span>
            <span>Software Engineer</span>
            <span className="text-[var(--border-strong)]">/</span>
            <span>College Station, TX</span>
            <span className="text-[var(--border-strong)]">/</span>
            <span>Available for work</span>
          </motion.div>

          {/* Mega name */}
          <motion.h1
            style={{ y: nameY, opacity: nameOpacity }}
            className="display mt-8 text-mega text-[var(--text)]"
          >
            <WordReveal text="Cael" className="block" duration={0.7} />
            <span className="block">
              <span className="text-[var(--accent)]">
                <WordReveal text="Findley" delay={0.12} duration={0.7} />
              </span>
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"
            style={{ y: metaY }}
          >
            <Reveal delay={0.3} className="max-w-xl text-sub text-[var(--muted)] text-balance">
              I ship production systems for real businesses — full-stack products,
              aquaculture ops tooling, and careful engineering you can run in the wild.
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap gap-3 md:justify-end">
              <Magnetic>
                <Button onClick={() => setCurrentPage('work')} size="lg">
                  View work
                </Button>
              </Magnetic>
              <Magnetic>
                <Button variant="secondary" size="lg" onClick={() => setShowContactModal(true)}>
                  Get in touch
                </Button>
              </Magnetic>
            </Reveal>
          </motion.div>
        </div>

        {/* Marquee ticker */}
        <motion.div
          className="relative border-y border-[var(--border)] bg-[var(--surface)] py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        >
          <Marquee duration={34}>
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={item}
                className="flex items-center gap-6 px-6 font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                {item}
                <span className="text-[var(--accent)]">✦</span>
              </span>
            ))}
          </Marquee>
        </motion.div>
      </section>

      {/* ── Selected work ────────────────────────────── */}
      <section className="border-b border-[var(--border)]">
        <div className="page-shell py-20 md:py-28">
          <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                Selected work
              </p>
              <h2 className="display mt-3 text-section text-[var(--text)]">
                Built to run, not to demo.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('work')}
              className="link-sweep self-start text-sm text-[var(--muted)] hover:text-[var(--text)]"
            >
              All work →
            </button>
          </Reveal>

          <div className="border-t border-[var(--border)]">
            {spotlight.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => openItem(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: easeOut, delay: i * 0.05 }}
                whileHover="hover"
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-[var(--border)] py-7 text-left md:gap-8 md:py-9"
              >
                <motion.span
                  className="absolute inset-0 -z-0 origin-left bg-[var(--surface)]"
                  variants={{ hover: { scaleX: 1 }, initial: { scaleX: 0 } }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                />
                <span className="relative font-mono text-xs text-[var(--muted)] md:text-sm">
                  0{i + 1}
                </span>
                <span className="relative min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="display text-2xl text-[var(--text)] transition-colors duration-200 group-hover:text-[var(--accent)] md:text-4xl">
                      {item.title}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
                      {item.category}
                    </span>
                  </span>
                  <span className="mt-1.5 block max-w-xl text-sm text-[var(--muted)] md:text-base">
                    {item.subtitle}
                  </span>
                </span>
                <motion.span
                  className="relative text-[var(--accent)]"
                  variants={{ hover: { x: 6, opacity: 1 }, initial: { x: 0, opacity: 0.4 } }}
                  initial={{ x: 0, opacity: 0.4 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                >
                  ↗
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── How I work ───────────────────────────────── */}
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="page-shell py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                Approach
              </p>
              <h2 className="display mt-3 text-section text-[var(--text)]">How I work</h2>
              <p className="mt-4 max-w-sm text-[var(--muted)]">
                Prefer clarity over spectacle. Ship something a business can run,
                then refine the edges.
              </p>
            </Reveal>

            <div className="grid gap-px overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              {[
                {
                  n: '01',
                  title: 'Outcomes first',
                  body: 'Inventory that doesn’t lie, checkouts that convert, dashboards ops teams actually open.',
                },
                {
                  n: '02',
                  title: 'Honest engineering',
                  body: 'Readable code, deliberate tradeoffs, and demos that show the approach — not theater.',
                },
                {
                  n: '03',
                  title: 'Range with focus',
                  body: 'From React storefronts to Rust and C systems work — depth where it matters.',
                },
                {
                  n: '04',
                  title: 'Field-aware',
                  body: 'Built around real constraints: weather, perishable stock, customers who don’t wait.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.n}
                  className="group relative bg-[var(--surface)] p-7 md:p-9"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: i * 0.08 }}
                >
                  <span className="font-mono text-xs text-[var(--accent)]">{item.n}</span>
                  <h3 className="mt-4 text-lg font-medium text-[var(--text)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-texture rotate-180" aria-hidden />
        <div className="page-shell relative py-24 md:py-36">
          <Reveal className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Contact
            </p>
            <h2 className="display mt-4 text-hero text-[var(--text)] text-balance">
              Let’s build something worth shipping.
            </h2>
            <p className="mt-5 max-w-xl text-[var(--muted)]">
              Available for freelance, full-time roles, and technical consulting.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Button size="lg" onClick={() => setShowContactModal(true)}>
                  Start a conversation
                </Button>
              </Magnetic>
              <a
                href="mailto:caelfindley@gmail.com"
                className="link-sweep self-center text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                caelfindley@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </div>
  );
};

export default Home;
