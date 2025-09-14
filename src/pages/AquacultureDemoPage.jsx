import React from 'react';
import AquacultureDemo from '../components/demos/AquacultureDemo';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';

const AquacultureDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Aquaculture Demo"
      subtitle="Live sensor and tank data monitoring"
      emoji="🌊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Smart City', onClick: () => setCurrentPage('smart-city-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🌊" accent="#10b981" />
        <AquacultureDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Sensor ingestion and health scoring for tanks with predictive alerts."
          role="Edge ingestion, dashboard, alert rules."
          stack={["React", "Node.js", "IoT", "Tailwind"]}
          challenges={["Noisy sensor data", "Predictive thresholds"]}
          results={["Actionable alerts", "Operator confidence"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default AquacultureDemoPage; 