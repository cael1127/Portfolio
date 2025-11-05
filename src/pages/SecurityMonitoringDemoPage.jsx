import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SecurityMonitoringDemo from '../components/demos/SecurityMonitoringDemo';

const SecurityMonitoringDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Security Monitoring Dashboard"
      subtitle="Real-time threat detection, log analysis, alerting, and incident response"
      emoji="📡"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Three Sisters Oyster', onClick: () => setCurrentPage('three-sisters-oyster-project') }}
      demo={<SecurityMonitoringDemo />}
      overview="Real-time security monitoring dashboard that detects threats, analyzes logs from multiple sources, generates alerts, and provides automated incident response. The system aggregates logs, identifies security threats, and responds automatically to protect systems."
      role="Security engineering, SIEM implementation, log analysis, threat detection, incident response automation, and dashboard development"
      stack={["Python", "ELK Stack", "Splunk", "Prometheus", "Grafana", "SIEM", "Log Aggregation"]}
      challenges={[
        "Aggregating logs from multiple sources",
        "Implementing real-time threat detection",
        "Reducing false positives in alerts",
        "Automating incident response",
        "Scaling log processing for high volumes"
      ]}
      results={[
        "Reduced threat detection time from hours to seconds",
        "Implemented automated incident response",
        "Reduced false positive rate to <5%",
        "Created comprehensive security dashboards",
        "Integrated with 10+ log sources"
      ]}
      problem="Organizations need real-time visibility into security threats and incidents. Without proper monitoring, security threats can go undetected until damage is done. A comprehensive monitoring system is essential."
      approach="Built a comprehensive security monitoring dashboard that aggregates logs from multiple sources, detects threats in real-time using pattern matching and anomaly detection, generates alerts, and provides automated incident response capabilities."
      highlights={[
        "Real-time threat detection",
        "Log aggregation from multiple sources",
        "Automated alerting system",
        "Incident response automation",
        "Security dashboards and visualization",
        "Comprehensive reporting"
      ]}
      tutorialSummary="Build a security monitoring dashboard with real-time threat detection, log analysis, alerting, and incident response. Learn SIEM implementation, log aggregation, and security operations."
      difficulty="Advanced"
      timeEstimate="150 min"
      keyConcepts={[
        { name: "SIEM", description: "Security Information and Event Management" },
        { name: "Threat Detection", description: "Identifying security threats" },
        { name: "Incident Response", description: "Responding to security incidents" },
        { name: "Log Analysis", description: "Analyzing security logs" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Log Collection",
          description: "Configure log aggregation from multiple sources",
          steps: [
            "Set up log collectors",
            "Configure log sources (firewall, apps, IDS)",
            "Set up log forwarding",
            "Verify log collection"
          ]
        },
        {
          title: "Implement Threat Detection",
          description: "Build threat detection algorithms",
          steps: [
            "Create pattern matching rules",
            "Implement anomaly detection",
            "Configure threat signatures",
            "Test detection accuracy"
          ]
        },
        {
          title: "Build Alerting System",
          description: "Create alert generation and notification",
          steps: [
            "Define alert rules",
            "Configure alert severity levels",
            "Set up notification channels",
            "Test alert generation"
          ]
        },
        {
          title: "Implement Incident Response",
          description: "Add automated response capabilities",
          steps: [
            "Create response playbooks",
            "Implement automated actions",
            "Set up IP blocking",
            "Configure system isolation"
          ]
        },
        {
          title: "Create Dashboards and Reporting",
          description: "Build visualization and reporting",
          steps: [
            "Create security dashboards",
            "Set up real-time visualizations",
            "Generate security reports",
            "Configure scheduled reports"
          ]
        }
      ]}
      setupInstructions={`1. Install monitoring stack:
Set up ELK stack or Splunk

2. Configure log sources:
Set up log forwarding from applications

3. Set up alerting:
Configure notification channels

4. Test detection:
Verify threat detection is working`}
      deploymentGuide={`1. Deploy monitoring infrastructure:
Set up log aggregation servers

2. Configure log sources:
Connect all log sources

3. Set up dashboards:
Configure Grafana or Splunk dashboards

4. Monitor and tune:
Adjust detection rules and thresholds`}
      troubleshooting={[
        {
          issue: "High false positive rate",
          solution: "Tune detection rules and adjust thresholds based on baseline behavior"
        },
        {
          issue: "Log processing delays",
          solution: "Scale log processing infrastructure and optimize log parsing"
        },
        {
          issue: "Missing log sources",
          solution: "Verify log forwarding configuration and network connectivity"
        }
      ]}
    />
  );
};

export default SecurityMonitoringDemoPage;

