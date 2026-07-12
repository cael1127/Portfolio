import React from 'react';
import ProjectLayout from '../ProjectLayout';
import { getSystemsCaseStudy, systemsOrder } from '../../data/systemsCaseStudies';

const GitHubSurface = ({ github, title, subtitle }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h3 className="text-xl font-medium text-[var(--text)]">{title}</h3>
      {subtitle && <p className="mt-1 text-[var(--muted)]">{subtitle}</p>}
      <p className="mt-4 font-mono text-xs text-[var(--muted)]">
        Personal / systems project — source on GitHub.
      </p>
    </div>
    <a
      href={`https://github.com/${github}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
    >
      View source ↗
    </a>
  </div>
);

const SystemProjectPage = ({ id, setCurrentPage }) => {
  const data = getSystemsCaseStudy(id);

  if (!data) {
    return (
      <div className="page-shell py-24 text-[var(--muted)]">
        <p>Project not found.</p>
        <button
          type="button"
          className="mt-4 text-[var(--accent)]"
          onClick={() => setCurrentPage('work')}
        >
          ← Back to work
        </button>
      </div>
    );
  }

  const idx = systemsOrder.indexOf(id);
  const nextId = idx >= 0 ? systemsOrder[(idx + 1) % systemsOrder.length] : null;
  const nextData = nextId ? getSystemsCaseStudy(nextId) : null;

  return (
    <ProjectLayout
      title={data.title}
      subtitle={data.subtitle}
      accent={data.accent}
      onBack={() => setCurrentPage('work')}
      next={
        nextData
          ? { label: nextData.title, onClick: () => setCurrentPage(nextId) }
          : { label: 'Back to work', onClick: () => setCurrentPage('work') }
      }
      demo={<GitHubSurface github={data.github} title={data.title} subtitle={data.subtitle} />}
      problem={data.problem}
      approach={data.approach}
      process={data.process}
      technicalDecisions={data.technicalDecisions}
      overview={data.approach}
      role="Design, implementation, and iteration (solo)"
      stack={data.stack}
      challenges={data.challenges}
      results={data.results}
      impact={data.impact}
      lessons={data.lessons}
      highlights={data.highlights}
    />
  );
};

export default SystemProjectPage;
