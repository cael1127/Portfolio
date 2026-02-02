import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SIEMDemo from '../components/demos/SIEMDemo';

const SIEMDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="SIEM/Log Analysis System"
      subtitle="Real-time log ingestion, threat detection, alerting, and dashboard visualization"
      emoji="📊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'API Security Gateway', onClick: () => setCurrentPage('api-security-gateway-demo') }}
      demo={<SIEMDemo />}
      overview="A Security Information and Event Management (SIEM) system that ingests logs from multiple sources, analyzes them for security threats, and generates alerts. Features real-time log streaming, threat correlation, and comprehensive security dashboards."
      role="Security engineering, log analysis system development, threat detection algorithms, alerting system design, and dashboard implementation"
      stack={["Python", "ELK Stack", "React", "WebSocket", "Log Analysis", "Threat Intelligence"]}
      challenges={[
        "Processing high-volume log streams in real-time",
        "Correlating events across multiple sources",
        "Reducing false positives in threat detection",
        "Scaling log storage and retrieval"
      ]}
      results={[
        "Real-time log ingestion with <200ms latency",
        "Automated threat detection and alerting",
        "Comprehensive security dashboards",
        "Log correlation for advanced threat detection"
      ]}
      problem="Organizations generate massive amounts of security logs from various sources. Without proper analysis and correlation, security threats go undetected. A SIEM system is needed to centralize log analysis and provide actionable security insights."
      approach="Built a SIEM system that ingests logs from multiple sources, applies threat detection patterns, and correlates events to identify security threats. Implemented real-time streaming, alerting, and comprehensive dashboards for security monitoring."
      highlights={[
        "Real-time log ingestion and streaming",
        "Automated threat detection and correlation",
        "Multi-source log aggregation",
        "Comprehensive security dashboards",
        "Alert generation and notification",
        "Log search and analysis capabilities"
      ]}
    />
  );
};

export default SIEMDemoPage;
