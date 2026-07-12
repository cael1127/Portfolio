import React from 'react';
import ProjectLayout from '../ProjectLayout';

const LiveLink = ({ href, title, subtitle }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h3 className="text-xl font-medium text-[var(--text)]">{title}</h3>
      {subtitle && <p className="mt-1 text-[var(--muted)]">{subtitle}</p>}
    </div>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
    >
      Visit live site →
    </a>
  </div>
);

const BPAWDProjectPage = ({ setCurrentPage }) => (
  <ProjectLayout
    title="BPAWD"
    subtitle="Competition web platform for BPA deliverables"
    accent="#A31F34"
    onBack={() => setCurrentPage('work')}
    next={{ label: 'UIL Academy', onClick: () => setCurrentPage('uil-academy-project') }}
    demo={<LiveLink href="https://bpawd.netlify.app" title="BPAWD" subtitle="Live competition site" />}
    problem="The team needed a polished web deliverable for BPA competition that could be demoed and judged under time pressure."
    approach="Built a React site with a modern stack, clear information architecture, and Netlify deploy for reliable presentation."
    process={[
      'Broke the rubric into concrete build requirements',
      'Set information architecture before visual design',
      'Built responsive React views against a tight deadline',
      'Deployed early and rehearsed the demo path',
    ]}
    technicalDecisions={[
      'React + Netlify for fast, reliable static delivery',
      'Content structure locked first to avoid last-minute churn',
      'Kept the stack boring so the deadline stayed safe',
    ]}
    overview="Full-stack web application for BPA competition work."
    role="Full-stack development and deployment"
    stack={['React', 'Node.js', 'Tailwind CSS', 'Netlify']}
    challenges={['Performance', 'Responsive design', 'Deadline delivery']}
    results={['Successful deployment', 'Competition-ready presentation']}
    impact="A shippable site the team could stand behind in front of judges."
    lessons={[
      'Deploy early — a demo that only runs locally is a risk',
      'Judge-facing clarity beats clever features under time pressure',
    ]}
    highlights={['Modern stack', 'Fast performance', 'Responsive design']}
  />
);

export default BPAWDProjectPage;
