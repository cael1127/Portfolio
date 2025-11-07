import React from 'react';
import ProjectLayout from '../ProjectLayout';
import AdvancedAnalytics from '../AdvancedAnalytics';

const AdvancedAnalyticsProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Advanced Analytics Platform"
      subtitle="Predictive business intelligence with real-time insights"
      emoji="📊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Collaboration Hub', onClick: () => setCurrentPage('real-time-collaboration') }}
      demo={<AdvancedAnalytics isEmbedded />}
      overview="Enterprise analytics suite that unifies streaming telemetry, ML-powered forecasting, and anomaly detection into an executive-ready control center."
      role="Product architecture, data engineering, predictive analytics, and front-end implementation"
      stack={[
        'React',
        'D3.js',
        'TensorFlow.js',
        'ClickHouse',
        'Kafka',
        'Tailwind CSS'
      ]}
      challenges={[
        'Designing a real-time pipeline that stays performant at scale',
        'Surfacing ML-driven predictions alongside explainable trends',
        'Balancing executive dashboards with deep analyst tooling'
      ]}
      results={[
        'Live telemetry refresh < 2 seconds with predictive overlays',
        'Automated anomaly triage with severity scoring',
        'Executive summaries distilled from multi-source data streams'
      ]}
      problem="Leaders need a single pane of glass that pairs historical performance with forward-looking forecasts they can trust."
      approach="Combined streaming ingestion, ML forecasting, and anomaly scoring into a cohesive React experience with drill-down capabilities."
      highlights={[
        'Live cohort & retention charts with interactive filters',
        'ML forecasts with confidence intervals and narrative summaries',
        'Anomaly detection that prioritises incidents by business impact',
        'Role-based views for executives, analysts, and ops teams'
      ]}
      tutorialSummary="Shows how to wire streaming analytics into a predictive dashboard using ClickHouse, Kafka, and TensorFlow.js."
      difficulty="Advanced"
      timeEstimate="3-4 weeks"
      keyConcepts={[
        { name: 'Streaming ETL', description: 'Ingest, transform, and visualise live signals with ClickHouse + Kafka' },
        { name: 'Predictive Modelling', description: 'Blend TensorFlow.js forecasts with human-readable insights' },
        { name: 'Anomaly Detection', description: 'Score deviations and surface severity to operators instantly' }
      ]}
      tutorialSteps={[
        'Model the event pipeline and warehouse schema in ClickHouse',
        'Train lightweight TensorFlow.js models for forecast-ready metrics',
        'Render responsive executive dashboards with D3.js + React',
        'Layer anomaly scoring and alerting into the UI experience'
      ]}
    />
  );
};

export default AdvancedAnalyticsProjectPage;

