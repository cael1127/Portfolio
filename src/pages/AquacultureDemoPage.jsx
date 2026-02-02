import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import AquacultureDemo from '../components/demos/AquacultureDemo';

const AquacultureDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Aquaculture Monitoring System"
      subtitle="Live sensor and tank data monitoring with predictive alerts"
      emoji="🌊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Smart City', onClick: () => setCurrentPage('smart-city-demo') }}
      demo={<AquacultureDemo />}
      overview="An IoT-based aquaculture monitoring system that collects sensor data from fish tanks, provides health scoring, and generates predictive alerts. The system enables operators to monitor water quality, temperature, and other critical parameters in real-time."
      role="Edge data ingestion, dashboard development, alert rule configuration, IoT integration, and predictive analytics implementation"
      stack={["React", "Node.js", "IoT", "Sensor Integration", "Real-time Monitoring", "Predictive Analytics", "Tailwind CSS"]}
      challenges={[
        "Handling noisy sensor data and filtering anomalies",
        "Setting predictive thresholds for early warning systems",
        "Processing high-frequency sensor data efficiently",
        "Creating actionable alerts for operators"
      ]}
      results={[
        "Actionable alerts with predictive capabilities",
        "Increased operator confidence in system reliability",
        "Real-time monitoring of tank health and conditions",
        "Comprehensive sensor data visualization",
        "Predictive analytics for proactive management"
      ]}
      problem="Aquaculture operations need real-time monitoring of tank conditions to ensure fish health and optimal growth. Manual monitoring is labor-intensive and may miss critical changes. An automated system with predictive alerts is essential."
      approach="Built an IoT-based monitoring system that ingests sensor data from edge devices, processes it for health scoring, and generates predictive alerts. Created an intuitive dashboard for operators to monitor tank conditions and respond to alerts."
      highlights={[
        "Real-time sensor data ingestion and monitoring",
        "Health scoring for tanks and fish",
        "Predictive alerts for early warning",
        "Comprehensive dashboard with visualizations",
        "Edge device integration",
        "Actionable insights for operators"
      ]}
    />
  );
};

export default AquacultureDemoPage; 