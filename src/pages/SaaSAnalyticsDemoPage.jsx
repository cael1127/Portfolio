import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SaaSAnalyticsDemo from '../components/demos/SaaSAnalyticsDemo';

const SaaSAnalyticsDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="SaaS Analytics Dashboard"
      subtitle="Cohorts, retention, and funnels"
      emoji="📈"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Product Configurator', onClick: () => setCurrentPage('product-configurator-demo') }}
      demo={<SaaSAnalyticsDemo />}
      overview="Comprehensive SaaS analytics platform providing real-time insights into user behavior, cohort analysis, retention metrics, and conversion funnels. Designed to help product managers make data-driven decisions with interactive visualizations and automated reporting."
      role="Full-stack development, data visualization, analytics engineering, and dashboard design"
      stack={["React", "D3.js", "SVG", "JavaScript", "Data Processing", "Chart.js"]}
      challenges={[
        "Processing large datasets efficiently",
        "Creating interactive and responsive charts",
        "Implementing real-time data updates",
        "Designing intuitive user interfaces for complex metrics"
      ]}
      results={[
        "Interactive cohort analysis with 30/60-day retention",
        "Real-time data visualization with SVG charts",
        "Exportable analytics reports",
        "Responsive dashboard design"
      ]}
      problem="Build a comprehensive analytics dashboard that can process and visualize complex SaaS metrics including cohort analysis, retention rates, and conversion funnels to help product teams understand user behavior and optimize business outcomes."
      approach="Implemented a deterministic demo using SVG-based charts to showcase cohort analysis and retention metrics. Used calculated data to demonstrate the visualization capabilities without requiring real-time data processing infrastructure."
      highlights={[
        "Cohort analysis with 30/60-day retention tracking",
        "SVG-based data visualization",
        "Deterministic calculations for consistent results",
        "Interactive chart components",
        "Real-time metric updates",
        "Clean data processing pipeline"
      ]}
    />
  );
};

export default SaaSAnalyticsDemoPage;


