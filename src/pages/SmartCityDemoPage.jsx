import React from 'react';
import SmartCityDemo from '../components/demos/SmartCityDemo';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';

const SmartCityDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Smart City Demo"
      subtitle="Infrastructure and traffic monitoring"
      emoji="🏙️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Resume Analyzer', onClick: () => setCurrentPage('resume-analyzer-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🏙️" accent="#22c55e" />
        <SmartCityDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Real-time urban telemetry and anomaly detection across traffic, energy, and environment."
          role="Architecture, data modeling, and frontend implementation."
          stack={["React", "WebSocket", "Node.js", "Tailwind", "Map APIs"]}
          challenges={["Combining disparate data feeds", "Maintaining 60fps charts on low-end devices"]}
          results={["Unified dashboard with <200ms updates", "Clear operator workflows"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default SmartCityDemoPage; 