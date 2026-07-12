import React from 'react';
import ProjectLayout from '../ProjectLayout';

const JFResumeProjectPage = ({ setCurrentPage }) => (
  <ProjectLayout
    title="JF Portfolio"
    subtitle="Mechanical engineering portfolio — typography and clarity first"
    accent="#A31F34"
    onBack={() => setCurrentPage('work')}
    next={{ label: 'Back to work', onClick: () => setCurrentPage('work') }}
    demo={
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-medium text-[var(--text)]">JF Portfolio</h3>
          <p className="mt-1 text-[var(--muted)]">Portfolio for mechanical engineering work</p>
        </div>
        <a
          href="https://jfresume.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
        >
          Visit live site →
        </a>
      </div>
    }
    problem="A mechanical engineer needed a portfolio that felt professional and readable — not a template resume dump."
    approach="Designed a typography-led portfolio with clear project storytelling and export-friendly structure."
    process={[
      'Interviewed for the projects worth featuring',
      'Set a type-first hierarchy before any visual flourish',
      'Built responsive, print-friendly layouts',
      'Deployed and reviewed on real devices',
    ]}
    technicalDecisions={[
      'Typography and hierarchy chosen before decoration',
      'Layout kept export/print friendly for real-world use',
      'React + Netlify for a fast, maintainable site',
    ]}
    overview="Interactive portfolio/resume experience with professional presentation and export paths."
    role="Full-stack development and UI/UX design"
    stack={['React', 'JavaScript', 'Tailwind CSS', 'Netlify']}
    challenges={['Clear hierarchy for technical work', 'Print/export friendliness', 'Restraint in visual design']}
    results={['Shipped portfolio site', 'Clean reading experience', 'Professional presentation']}
    impact="Work reads as intentional craft — closer to a product than a résumé PDF."
    lessons={[
      'Typography does most of the work in a portfolio',
      'Restraint reads as confidence',
    ]}
    highlights={['Typography-first layout', 'Project storytelling', 'Responsive']}
  />
);

export default JFResumeProjectPage;
