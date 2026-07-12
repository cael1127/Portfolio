import React from 'react';

const DemoReadme = ({ problem, approach, highlights = [], repoLink }) => {
  return (
    <div className="mt-6 rounded-sm border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)] mb-4">
        README
      </h3>
      <div className="text-sm leading-relaxed text-[var(--muted)] space-y-3">
        <p>
          <span className="text-[var(--text)]">Problem — </span>
          {problem}
        </p>
        <p>
          <span className="text-[var(--text)]">Approach — </span>
          {approach}
        </p>
        {highlights.length > 0 && (
          <div>
            <div className="text-[var(--text)] mb-1">Highlights</div>
            <ul className="list-disc pl-5 space-y-1">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
        {repoLink && (
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[var(--accent)] hover:brightness-110"
          >
            View repository →
          </a>
        )}
      </div>
    </div>
  );
};

export default DemoReadme;
