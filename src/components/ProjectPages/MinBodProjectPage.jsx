import React from 'react';
import ProjectLayout from '../ProjectLayout';

const MinBodProjectPage = ({ setCurrentPage }) => (
  <ProjectLayout
    title="MinBod"
    subtitle="Health directory and wellness platform"
    accent="#A31F34"
    onBack={() => setCurrentPage('work')}
    next={{ label: 'JF Portfolio', onClick: () => setCurrentPage('jf-resume-project') }}
    demo={
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-medium text-[var(--text)]">MinBod</h3>
          <p className="mt-1 text-[var(--muted)]">Directory · search · wellness resources</p>
        </div>
        <a
          href="https://minbod.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
        >
          Visit live site →
        </a>
      </div>
    }
    problem="People needed a trustworthy way to find health professionals — therapists, coaches, trainers — without a noisy marketplace."
    approach="Built a searchable health directory with filtering, professional listings, and a calm UI that respects sensitive context."
    process={[
      'Modeled professionals, specialties, and search filters',
      'Designed a calm, low-pressure browsing experience',
      'Implemented search and filtering over the directory',
      'Deployed and refined based on real browsing patterns',
    ]}
    technicalDecisions={[
      'MongoDB for flexible professional/listing documents',
      'Filtering kept fast and predictable for large lists',
      'Restrained UI to respect a sensitive, health-adjacent context',
    ]}
    overview="Health directory connecting users with professionals, plus wellness resources."
    role="Full-stack development, directory implementation, UI/UX"
    stack={['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express']}
    challenges={['Directory search', 'Filtering', 'Privacy-aware UX']}
    results={['Launched directory', 'Search and filters shipped', 'Clear browsing experience']}
    impact="A quieter, more usable path to finding the right professional."
    lessons={[
      'In sensitive contexts, calm UX is a feature',
      'Good filtering matters more than a big listing count',
    ]}
    highlights={['Health directory', 'Search & filter', 'Responsive design']}
  />
);

export default MinBodProjectPage;
