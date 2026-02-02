import React from 'react';
import ProjectLayout from '../components/ProjectLayout';

const IDSDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Network Intrusion Detection System (IDS)"
      subtitle="Signature-based detection, anomaly detection, and alert generation"
      emoji="🚨"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Threat Intelligence', onClick: () => setCurrentPage('threat-intelligence-demo') }}
      demo={null}
      overview="A Network Intrusion Detection System (IDS) that monitors network traffic for malicious activities and policy violations. Uses signature-based detection to identify known attack patterns and anomaly detection to identify unusual network behavior. Generates alerts for security incidents and provides comprehensive network security monitoring."
      role="Network security engineering, IDS system development, signature database management, anomaly detection algorithms, and alert system design"
      stack={["Python", "Snort", "Network Analysis", "Packet Inspection", "Signature Detection"]}
      challenges={[
        "Processing high-volume network traffic in real-time",
        "Maintaining comprehensive signature database",
        "Reducing false positives in anomaly detection",
        "Scaling to monitor large network infrastructures"
      ]}
      results={[
        "Real-time network traffic monitoring",
        "Signature-based attack detection",
        "Anomaly detection for unknown threats",
        "Comprehensive alert generation and reporting"
      ]}
      problem="Networks are constantly under threat from various attacks including malware, intrusions, and policy violations. A Network Intrusion Detection System is needed to monitor network traffic, detect security incidents, and generate alerts for security teams."
      approach="Developed a Network Intrusion Detection System using signature-based detection for known attack patterns and anomaly detection for unusual network behavior. Implemented comprehensive monitoring, alert generation, and reporting capabilities for network security teams."
      highlights={[
        "Signature-based intrusion detection",
        "Anomaly detection for unknown threats",
        "Real-time network traffic monitoring",
        "Comprehensive alert generation",
        "Network security policy enforcement",
        "Detailed incident reporting"
      ]}
    />
  );
};

export default IDSDemoPage;
