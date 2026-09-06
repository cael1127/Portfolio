import React from 'react';
import Button from '../components/ui/Button';
import WordReveal from '../components/motion/WordReveal';
import Reveal from '../components/motion/Reveal';
import usePageMeta from '../hooks/usePageMeta';

const RESUME_URL = '/Cael_Findley_Resume_NSWC.pdf';

export default function ResumePage({ setCurrentPage }) {
  usePageMeta({
    title: 'Resume',
    description: "Cael Findley's resume — software engineering experience, projects, and skills.",
  });
  return (
    <div className="min-h-screen text-[var(--text)]">
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 grid-texture" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70%]"
          style={{ background: 'var(--hero-wash)' }}
          aria-hidden
        />
        <div className="page-shell relative pt-20 pb-14 md:pt-28 md:pb-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                Resume
              </p>
              <h1 className="display mt-5 text-mega text-[var(--text)]">
                <WordReveal text="On paper." duration={0.7} />
              </h1>
              <Reveal delay={0.25} className="mt-6 max-w-md text-sub text-[var(--muted)]">
                The condensed version — download the PDF or read it below.
              </Reveal>
            </div>

            <Reveal delay={0.35} className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setCurrentPage('home')}>
                Home
              </Button>
              <Button as="a" href={RESUME_URL} target="_blank" rel="noreferrer" download>
                Download PDF
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="page-shell pt-12 pb-20">
        <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <div className="font-mono text-xs text-[var(--muted)]">Cael_Findley_Resume.pdf</div>
            <a
              className="text-sm text-[var(--accent)] hover:brightness-110"
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open in new tab
            </a>
          </div>

          <div className="h-[75vh] bg-[var(--bg)]">
            <object data={RESUME_URL} type="application/pdf" className="h-full w-full">
              <iframe title="Resume PDF" src={RESUME_URL} className="h-full w-full" />
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
