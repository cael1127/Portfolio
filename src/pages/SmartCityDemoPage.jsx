import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SmartCityDemo from '../components/demos/SmartCityDemo';

const SmartCityDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Smart City Platform"
      subtitle="Real-time infrastructure and traffic monitoring with urban analytics"
      emoji="🏙️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Resume Analyzer', onClick: () => setCurrentPage('resume-analyzer-demo') }}
      demo={<SmartCityDemo />}
      overview="Comprehensive smart city platform featuring real-time urban telemetry, traffic monitoring, energy management, and environmental tracking. Provides unified dashboards with anomaly detection and analytics for efficient city management."
      role="Architecture design, data modeling, real-time data processing, frontend implementation, and analytics dashboard development"
      stack={["React", "WebSocket", "Node.js", "Tailwind CSS", "Map APIs", "Real-time Analytics", "Data Visualization"]}
      challenges={[
        "Combining disparate data feeds from multiple city systems",
        "Maintaining 60fps performance on charts for low-end devices",
        "Processing and visualizing large volumes of real-time data",
        "Creating intuitive operator workflows for city management"
      ]}
      results={[
        "Unified dashboard with real-time updates under 200ms",
        "Clear and intuitive operator workflows",
        "Comprehensive city analytics and monitoring",
        "Anomaly detection across multiple city systems",
        "Responsive design for all devices"
      ]}
      problem="City administrators need unified platforms to monitor and manage various city systems including traffic, energy, and environment. Disconnected systems make it difficult to get a comprehensive view of city operations."
      approach="Built a comprehensive smart city platform that aggregates data from multiple city systems, provides real-time monitoring and analytics, and includes anomaly detection. Created unified dashboards with intuitive workflows for city operators."
      highlights={[
        "Real-time urban telemetry and monitoring",
        "Traffic management and optimization",
        "Energy consumption tracking and management",
        "Environmental monitoring and analytics",
        "Anomaly detection across city systems",
        "Unified dashboard with comprehensive city view"
      ]}
    />
  );
};

export default SmartCityDemoPage; 