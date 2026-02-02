import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import OWASPScannerDemo from '../components/demos/OWASPScannerDemo';

const OWASPScannerDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="OWASP Top 10 Security Scanner"
      subtitle="Automated vulnerability scanning with OWASP Top 10 coverage and detailed reporting"
      emoji="🔍"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Network Traffic Analyzer', onClick: () => setCurrentPage('network-traffic-analyzer-demo') }}
      demo={<OWASPScannerDemo />}
      overview="A comprehensive security scanner that tests web applications against the OWASP Top 10 vulnerabilities. Performs automated scanning for injection attacks, broken authentication, sensitive data exposure, and other critical security issues with detailed reporting and remediation recommendations."
      role="Security engineering, vulnerability scanning algorithm development, OWASP compliance testing, security reporting, and remediation guidance"
      stack={["Python", "OWASP ZAP", "React", "Security Testing", "Vulnerability Assessment"]}
      challenges={[
        "Covering all OWASP Top 10 vulnerability categories comprehensively",
        "Reducing false positives in vulnerability detection",
        "Generating actionable remediation recommendations",
        "Handling large-scale application scanning"
      ]}
      results={[
        "Comprehensive OWASP Top 10 coverage",
        "Automated vulnerability detection and reporting",
        "Detailed remediation recommendations",
        "Interactive scanning interface with real-time results"
      ]}
      problem="Web applications need regular security assessments to identify vulnerabilities. The OWASP Top 10 represents the most critical security risks. An automated scanner is needed to test applications against these vulnerabilities and provide actionable remediation guidance."
      approach="Built an OWASP Top 10 security scanner that performs automated testing for all vulnerability categories. Implemented comprehensive scanning algorithms, detailed reporting, and remediation recommendations. Created an interactive interface for running scans and viewing results."
      highlights={[
        "Complete OWASP Top 10 vulnerability coverage",
        "Automated scanning and testing",
        "Detailed vulnerability reporting",
        "Remediation recommendations",
        "Interactive scanning interface",
        "Real-time scan results"
      ]}
    />
  );
};

export default OWASPScannerDemoPage;
