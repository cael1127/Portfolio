import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import NetworkTrafficAnalyzerDemo from '../components/demos/NetworkTrafficAnalyzerDemo';

const NetworkTrafficAnalyzerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Network Traffic Analyzer"
      subtitle="Packet capture, protocol analysis, anomaly detection, and traffic visualization"
      emoji="🌐"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Microservices Platform', onClick: () => setCurrentPage('microservices-demo') }}
      demo={<NetworkTrafficAnalyzerDemo />}
      overview="A comprehensive network traffic analysis system that captures and analyzes network packets in real-time. Provides protocol breakdown, anomaly detection, traffic visualization, and security monitoring capabilities for network administrators and security teams."
      role="Network security engineering, packet analysis system development, anomaly detection algorithms, protocol analysis, and traffic visualization"
      stack={["Python", "Scapy", "React", "WebSocket", "Network Analysis", "Packet Capture"]}
      challenges={[
        "Processing high-volume packet streams in real-time",
        "Detecting anomalies in network traffic patterns",
        "Identifying security threats from packet analysis",
        "Visualizing complex network data effectively"
      ]}
      results={[
        "Real-time packet capture and analysis",
        "Comprehensive protocol breakdown and statistics",
        "Automated anomaly detection",
        "Interactive traffic visualization"
      ]}
      problem="Network administrators and security teams need tools to monitor and analyze network traffic for security threats, performance issues, and anomalies. Manual packet analysis is time-consuming and doesn't scale to modern network volumes."
      approach="Built a network traffic analyzer using Scapy for packet capture and analysis. Implemented real-time processing, protocol analysis, anomaly detection algorithms, and comprehensive visualization. Created an interactive dashboard for monitoring network traffic and security threats."
      highlights={[
        "Real-time packet capture and analysis",
        "Protocol breakdown and statistics",
        "Anomaly detection algorithms",
        "Traffic visualization and monitoring",
        "Security threat identification",
        "Interactive network dashboard"
      ]}
    />
  );
};

export default NetworkTrafficAnalyzerDemoPage;
