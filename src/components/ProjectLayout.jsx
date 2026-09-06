import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CaseStudy from './CaseStudy';
import DemoReadme from './DemoReadme';
import ProjectTutorial from './ProjectTutorial';
import WordReveal from './motion/WordReveal';
import { easeOut } from '../utils/motion';
import usePageMeta from '../hooks/usePageMeta';

const tocLinks = [
  { href: '#demo', label: 'Live surface' },
  { href: '#problem', label: 'Problem' },
  { href: '#approach', label: 'Approach' },
  { href: '#tech-stack', label: 'Stack' },
  { href: '#outcome', label: 'Outcome' },
];

const ProjectLayout = ({
  title,
  subtitle,
  emoji,
  onBack,
  next,
  children,
  demo,
  overview,
  role,
  stack,
  challenges,
  results,
  problem,
  approach,
  highlights,
  process,
  technicalDecisions,
  impact,
  lessons,
  heroVisual,
  accent = '#A31F34',
  tutorialSummary,
  difficulty,
  timeEstimate,
  keyConcepts,
  tutorialSteps,
  setupInstructions,
  deploymentGuide,
  troubleshooting,
}) => {
  usePageMeta({ title, description: overview || problem });
  const [activeSection, setActiveSection] = useState('demo');

  const navLinks = [
    ...tocLinks,
    ...(tutorialSummary || tutorialSteps ? [{ href: '#tutorial', label: 'Notes' }] : []),
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 80);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [tutorialSummary, tutorialSteps]);

  return (
    <div className="min-h-screen text-[var(--text)]">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 85% 10%, ${accent}22, transparent 60%)`,
          }}
          aria-hidden
        />
        <div className="page-shell relative py-8 md:py-10">
          <motion.button
            type="button"
            onClick={onBack}
            className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.15 }}
          >
            ← Back to work
          </motion.button>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <motion.p
                className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut }}
              >
                Case study
              </motion.p>
              <h1 className="display mt-4 text-[clamp(2.75rem,7vw,4.5rem)] leading-[0.98] text-[var(--text)] text-balance">
                <WordReveal text={title} duration={0.7} />
              </h1>
              {subtitle && (
                <motion.p
                  className="mt-5 max-w-xl text-lg text-[var(--muted)]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.25 }}
                >
                  {subtitle}
                </motion.p>
              )}
              {(role || stack?.length > 0) && (
                <motion.div
                  className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--border)] pt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.35 }}
                >
                  {role && (
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        Role
                      </div>
                      <div className="mt-1 text-sm text-[var(--text)]">{role}</div>
                    </div>
                  )}
                  {stack?.length > 0 && (
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                        Stack
                      </div>
                      <div className="mt-1 text-sm text-[var(--text)]">
                        {stack.slice(0, 4).join(' · ')}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
            <motion.div
              className="relative min-h-[220px] overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent}26, transparent 55%)`,
              }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
            >
              {heroVisual || (
                <div className="flex h-full min-h-[220px] items-end p-6">
                  <span className="display text-6xl text-[var(--text)]/10">
                    {emoji || title?.charAt(0)}
                  </span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      <div className="page-shell py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:items-start">
          <aside className="hidden lg:block sticky top-24">
            <nav className="text-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mb-4">
                On this page
              </div>
              <ul className="space-y-1">
                {navLinks.map((l) => {
                  const id = l.href.slice(1);
                  const active = activeSection === id;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className={`group flex items-center gap-3 py-1 transition-colors duration-200 ${
                          active ? 'text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <span
                          className={`h-px transition-all duration-300 ease-out ${
                            active
                              ? 'w-6 bg-[var(--accent)]'
                              : 'w-3 bg-[var(--border-strong)] group-hover:w-5'
                          }`}
                          aria-hidden
                        />
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="space-y-12 min-w-0">
            <motion.section
              id="demo"
              className="scroll-mt-28"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <h2 className="display text-2xl md:text-3xl text-[var(--text)] mb-4">Live surface</h2>
              <div className="overflow-x-auto rounded-sm border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
                {demo || children}
              </div>
            </motion.section>

            {(highlights?.length > 0 || stack?.length > 0) && (
              <section id="code" className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] mb-3">
                    Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {stack?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[var(--border)] px-2.5 py-1 font-mono text-xs text-[var(--text)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {highlights?.length > 0 && (
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] mb-3">
                      Highlights
                    </h3>
                    <ul className="space-y-2 text-sm text-[var(--muted)]">
                      {highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-[var(--accent)]">·</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            <CaseStudy
              overview={overview}
              role={role}
              stack={stack}
              challenges={challenges}
              results={results}
              problem={problem}
              approach={approach}
              process={process}
              technicalDecisions={technicalDecisions}
              impact={impact}
              lessons={lessons}
            />

            {problem && approach && !process && (
              <DemoReadme problem={problem} approach={approach} highlights={highlights} />
            )}

            {(tutorialSummary || tutorialSteps || keyConcepts) && (
              <div id="tutorial">
                <ProjectTutorial
                  summary={tutorialSummary}
                  difficulty={difficulty}
                  timeEstimate={timeEstimate}
                  keyConcepts={keyConcepts}
                  steps={tutorialSteps}
                  setupInstructions={setupInstructions}
                  deploymentGuide={deploymentGuide}
                  troubleshooting={troubleshooting}
                />
              </div>
            )}

            {next && (
              <motion.div
                className="pt-8 border-t border-[var(--border)] flex items-center justify-between"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, ease: easeOut }}
              >
                <span className="text-sm text-[var(--muted)]">Next</span>
                <button
                  type="button"
                  onClick={next.onClick}
                  className="font-medium text-[var(--accent)] hover:brightness-110 transition"
                >
                  {next.label} →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
