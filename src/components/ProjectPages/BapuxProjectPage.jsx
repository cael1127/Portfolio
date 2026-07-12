import React from 'react';
import ProjectLayout from '../ProjectLayout';

const BapuxProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Bapux"
      subtitle="Client web experience with clear structure and fast delivery"
      accent="#A31F34"
      onBack={() => setCurrentPage('work')}
      next={{ label: 'BPAWD', onClick: () => setCurrentPage('bpawd-project') }}
      demo={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-xl font-medium text-[var(--text)]">Bapux</h3>
            <p className="mt-1 text-[var(--muted)]">Live client site</p>
          </div>
          <a
            href="https://bapux.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--accent-fg)] hover:brightness-110"
          >
            Visit live site →
          </a>
        </div>
      }
      problem="The client needed a modern, responsive web presence that loaded quickly and communicated clearly without unnecessary chrome."
      approach="Shipped a React front end with a mobile-first layout, tight content hierarchy, and Netlify deployment for reliable static delivery."
      process={[
        'Clarified content and conversion goals',
        'Designed a restrained visual system',
        'Built responsive React views',
        'Deployed and validated on real devices',
      ]}
      technicalDecisions={[
        'React + Netlify for fast, reliable static delivery',
        'Mobile-first layout to match real traffic',
        'Kept the visual system restrained to avoid chrome for its own sake',
      ]}
      overview="Full-stack web application with responsive design and a focus on performance."
      role="Full-stack development, UI/UX, and deployment"
      stack={['React', 'Node.js', 'Tailwind CSS', 'Netlify']}
      challenges={['Responsive design', 'Performance budget', 'Cross-browser compatibility']}
      results={['Production launch', 'Strong performance scores', 'Reliable mobile experience']}
      impact="A clean, fast site that presents the product without fighting the user."
      lessons={['Clarity beats decoration', 'Ship the primary path first']}
      highlights={['Responsive design', 'Fast performance', 'Modern UI']}
    />
  );
};

export default BapuxProjectPage;
