import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import WAFDemo from '../components/demos/WAFDemo';

const WAFDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Web Application Firewall (WAF)"
      subtitle="Request filtering, rate limiting, SQL injection protection, and XSS blocking"
      emoji="🛡️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'SIEM System', onClick: () => setCurrentPage('siem-demo') }}
      demo={<WAFDemo />}
      overview="A comprehensive Web Application Firewall that protects web applications from common attacks including SQL injection, XSS, rate limiting, and IP-based filtering. Provides real-time request analysis and blocking capabilities with configurable security rules."
      role="Security engineering, WAF rule engine development, request analysis, security policy implementation, and dashboard development"
      stack={["Node.js", "Express", "React", "Rule Engine", "Request Analysis", "Security Policies"]}
      challenges={[
        "Implementing efficient request filtering without impacting performance",
        "Creating flexible rule engine for security policies",
        "Handling false positives while maintaining security",
        "Scaling to handle high-volume traffic"
      ]}
      results={[
        "Real-time request filtering with <10ms overhead",
        "Configurable security rules for different attack patterns",
        "Comprehensive attack detection and blocking",
        "Interactive dashboard for monitoring and management"
      ]}
      problem="Web applications are vulnerable to various attacks including SQL injection, XSS, and DDoS. A Web Application Firewall is needed to filter malicious requests before they reach the application, protecting against common vulnerabilities."
      approach="Built a Web Application Firewall with a flexible rule engine that analyzes incoming requests for attack patterns. Implemented real-time filtering, rate limiting, and IP-based access control. Created an interactive dashboard for monitoring and rule management."
      highlights={[
        "Real-time request filtering and analysis",
        "SQL injection and XSS detection",
        "Configurable rate limiting",
        "IP whitelisting and blacklisting",
        "Interactive security dashboard",
        "Comprehensive attack pattern detection"
      ]}
    />
  );
};

export default WAFDemoPage;
