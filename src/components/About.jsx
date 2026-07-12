import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import ContactModal from './ContactModal';
import WordReveal from './motion/WordReveal';
import Reveal from './motion/Reveal';
import { easeOut } from '../utils/motion';

const focusAreas = [
  {
    t: 'Product engineering',
    d: 'Storefronts, dashboards, and APIs that survive contact with customers.',
  },
  {
    t: 'Ops & aquaculture',
    d: 'Tools for perishable inventory, monitoring, and field-aware workflows.',
  },
  {
    t: 'Systems curiosity',
    d: 'Rust, C, and infrastructure when depth beats another UI wrapper.',
  },
];

const About = ({ setCurrentPage }) => {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen text-[var(--text)]">
      {/* ── Header ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
          style={{ background: 'var(--hero-wash)' }}
          aria-hidden
        />
        <div className="page-shell relative pt-20 pb-14 md:pt-28 md:pb-20">
          <motion.p
            className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            About
          </motion.p>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,5rem)] leading-[0.98] text-[var(--text)] text-balance max-w-4xl">
            <WordReveal text="Software businesses" className="block" duration={0.7} />
            <span className="block text-[var(--accent)]">
              <WordReveal text="can actually run." delay={0.12} duration={0.7} />
            </span>
          </h1>
          <Reveal delay={0.3} className="mt-8 max-w-2xl text-sub text-[var(--muted)] text-balance">
            I’m Cael Findley — a software engineer studying Computer Science at Texas A&amp;M
            University’s College of Engineering in College Station. I ship full-stack products,
            aquaculture and ops tooling, and careful systems work rooted in real constraints.
          </Reveal>
        </div>
      </section>

      <div className="page-shell pb-24">
        {/* ── Education + Story ──────────────────────── */}
        <section className="grid gap-x-16 gap-y-12 border-b border-[var(--border)] py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-[var(--accent)]">01</span>
              <h2 className="display text-section text-[var(--text)]">Education</h2>
            </div>
            <div className="mt-8 border-l-2 border-[var(--accent)] pl-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                Undergraduate
              </p>
              <h3 className="mt-3 display text-2xl text-[var(--text)]">B.S. Computer Science</h3>
              <p className="mt-2 text-[var(--muted)]">
                Texas A&amp;M University · College of Engineering
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">College Station, TX</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-[var(--accent)]">02</span>
              <h2 className="display text-section text-[var(--text)]">Story</h2>
            </div>
            <div className="mt-8 space-y-5 text-[var(--muted)]">
              <p>
                I grew up around the Gulf Coast and work with Three Sisters Oyster Co. —
                a real aquaculture business where inventory, weather, and customers don’t wait
                for perfect abstractions.
              </p>
              <p>
                That environment shaped how I build: prefer outcomes over demos, honesty over
                theater, and systems that ops teams can trust. At Texas A&amp;M I’m deepening
                the computer science foundation behind that craft.
              </p>
              <p>
                Outside client work you’ll find planning tools, aquaculture monitoring experiments,
                and lower-level projects in Rust and C — range with a bias toward shipping.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ── Focus ──────────────────────────────────── */}
        <section className="border-b border-[var(--border)] py-16 md:py-20">
          <Reveal className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[var(--accent)]">03</span>
            <h2 className="display text-section text-[var(--text)]">Focus</h2>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
            {focusAreas.map((item, i) => (
              <motion.li
                key={item.t}
                className="group bg-[var(--surface)] p-7 md:p-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: easeOut, delay: i * 0.08 }}
              >
                <p className="font-mono text-xs text-[var(--accent)]">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-medium text-[var(--text)]">{item.t}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.d}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* ── CTA ────────────────────────────────────── */}
        <Reveal className="flex flex-wrap gap-3 pt-16">
          <Button onClick={() => setCurrentPage('work')}>View work</Button>
          <Button variant="secondary" onClick={() => setShowContact(true)}>
            Contact
          </Button>
          <Button variant="ghost" onClick={() => setCurrentPage('resume')}>
            Resume →
          </Button>
        </Reveal>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
};

export default About;
