import React from 'react';
import ProjectLayout from '../ProjectLayout';
import ProjectHeroVideo from '../ProjectHeroVideo';

const UILAcademyProjectPage = ({ setCurrentPage }) => (
  <ProjectLayout
    title="UIL Academy"
    subtitle="Educational platform for competitive academics"
    accent="#A31F34"
    onBack={() => setCurrentPage('work')}
    next={{ label: 'MinBod', onClick: () => setCurrentPage('minbod-project') }}
    heroVisual={<ProjectHeroVideo src="/videos/projects/uil-academy.mp4" />}
    demo={
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-medium text-[var(--text)]">UIL Academy</h3>
          <p className="mt-1 text-[var(--muted)]">Learning management surface</p>
        </div>
        <a
          href="https://uilacademy.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
        >
          Visit live site →
        </a>
      </div>
    }
    problem="Competitive academics needed a modern learning surface — courses, progress, and modules without enterprise LMS bloat."
    approach="Built an LMS-style React app with catalog, progress tracking, and interactive modules backed by Node and MongoDB."
    process={[
      'Defined learner and admin flows',
      'Implemented catalog and progress models',
      'Shipped interactive module UI',
      'Deployed and iterated on feedback',
    ]}
    technicalDecisions={[
      'MongoDB for flexible course, module, and progress documents',
      'Progress modeled explicitly so it can be shown, not guessed',
      'Navigation designed around the lesson, not the feature list',
    ]}
    overview="Educational platform with course catalog, student management, progress tracking, and interactive modules."
    role="Full-stack development, LMS implementation, UI/UX"
    stack={['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express']}
    challenges={[
      'Learning management features',
      'Interactive modules',
      'Progress tracking',
      'Intuitive UI',
    ]}
    results={['Launched platform', 'LMS features shipped', 'Engaging learning flows']}
    impact="A focused education product students and coaches can actually navigate."
    lessons={['EdTech UI fails when navigation fights the lesson', 'Track progress visibly']}
    highlights={['LMS', 'Course catalog', 'Progress tracking', 'Interactive modules']}
  />
);

export default UILAcademyProjectPage;
