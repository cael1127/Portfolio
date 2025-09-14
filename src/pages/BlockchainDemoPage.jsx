import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';

const BlockchainDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Blockchain Demo"
      subtitle="Supply chain with real-time transactions"
      emoji="🔗"
      onBack={() => setCurrentPage('demo-organizer')}
    >
      <Reveal>
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Blockchain Demo Test</h2>
          <p className="text-gray-300 mb-4">This is a simplified version to validate navigation and layout.</p>
          <button
            onClick={() => setCurrentPage('demo-organizer')}
            className="bg-primary/20 text-primary hover:bg-primary/30 px-4 py-2 rounded-lg transition-colors"
          >
            Back to work
          </button>
        </div>
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy />
      </Reveal>
    </ProjectLayout>
  );
};

export default BlockchainDemoPage; 