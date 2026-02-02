import React from 'react';
import ProjectLayout from '../components/ProjectLayout';

const ThreatIntelligenceDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Threat Intelligence Platform"
      subtitle="IOC collection, threat feed aggregation, and reputation checking"
      emoji="🔎"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Microservices Platform', onClick: () => setCurrentPage('microservices-demo') }}
      demo={null}
      overview="A comprehensive Threat Intelligence Platform that aggregates Indicators of Compromise (IOCs) from multiple threat feeds, performs reputation checking, and provides actionable threat intelligence. Integrates with various threat intelligence sources to provide real-time threat data and analysis."
      role="Security engineering, threat intelligence system development, IOC management, threat feed integration, and reputation checking implementation"
      stack={["Python", "Threat Feeds", "API Integration", "IOC Management", "Threat Intelligence"]}
      challenges={[
        "Aggregating data from multiple threat intelligence sources",
        "Processing and normalizing IOCs from different formats",
        "Maintaining up-to-date threat intelligence",
        "Integrating threat data with security systems"
      ]}
      results={[
        "Comprehensive IOC collection and management",
        "Multi-source threat feed aggregation",
        "Real-time reputation checking",
        "Actionable threat intelligence delivery"
      ]}
      problem="Security teams need access to current threat intelligence to protect against emerging threats. Manual threat intelligence gathering is time-consuming and may miss critical information. A centralized platform is needed to aggregate and analyze threat data from multiple sources."
      approach="Built a Threat Intelligence Platform that aggregates IOCs from multiple threat feeds, normalizes the data, and provides reputation checking capabilities. Integrated with various threat intelligence APIs and created a unified interface for threat analysis and management."
      highlights={[
        "Multi-source IOC collection",
        "Threat feed aggregation and normalization",
        "Real-time reputation checking",
        "Threat intelligence API integration",
        "Comprehensive threat analysis",
        "Actionable intelligence delivery"
      ]}
    />
  );
};

export default ThreatIntelligenceDemoPage;
