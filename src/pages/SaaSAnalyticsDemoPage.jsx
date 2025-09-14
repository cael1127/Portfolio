import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import SaaSAnalyticsDemo from '../components/demos/SaaSAnalyticsDemo';

const SaaSAnalyticsDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="SaaS Analytics"
      subtitle="Cohorts, retention, and funnels"
      emoji="📈"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: '3D Configurator', onClick: () => setCurrentPage('product-configurator-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="📈" accent="#84cc16" />
        <SaaSAnalyticsDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Product analytics focused on activation, retention, and conversion."
          role="Metrics design, data viz."
          stack={["React", "D3", "Node.js"]}
          challenges={["Large datasets", "Fast chart interactions"]}
          results={["Responsive charts", "Actionable insights"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Expose cohort retention and funnels clearly for PMs."
          approach="Deterministic bar chart rendering and simple retention math."
          highlights={["SVG bars", "D30/D60 deltas", "PM-friendly labels"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default SaaSAnalyticsDemoPage;


