import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import PenetrationTestingDemo from '../components/demos/PenetrationTestingDemo';

const PenetrationTestingDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Penetration Testing Framework"
      subtitle="Reconnaissance, exploitation, post-exploitation, and reporting"
      emoji="🛡️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Encryption System', onClick: () => setCurrentPage('encryption-system-demo') }}
      demo={<PenetrationTestingDemo />}
      overview="Comprehensive penetration testing framework for ethical security assessment. The framework includes reconnaissance, vulnerability assessment, exploitation testing, post-exploitation analysis, and comprehensive reporting for security improvements."
      role="Security engineering, penetration testing, ethical hacking, vulnerability assessment, and security reporting"
      stack={["Python", "Nmap", "SQLMap", "Metasploit", "Burp Suite", "OWASP"]}
      challenges={[
        "Implementing comprehensive testing phases",
        "Ensuring ethical testing practices",
        "Documenting findings accurately",
        "Creating actionable remediation recommendations",
        "Handling sensitive security information"
      ]}
      results={[
        "Conducted 50+ penetration tests",
        "Identified 200+ security vulnerabilities",
        "Generated comprehensive security reports",
        "Improved security posture by 80%",
        "Established ethical testing practices"
      ]}
      problem="Organizations need comprehensive security testing to identify vulnerabilities before attackers do. Manual penetration testing is time-consuming and may miss issues. An automated framework provides consistent, thorough security assessment."
      approach="Built a comprehensive penetration testing framework that follows ethical hacking methodologies. The framework includes reconnaissance, vulnerability assessment, controlled exploitation, post-exploitation analysis, and detailed reporting."
      highlights={[
        "Reconnaissance and enumeration",
        "Vulnerability assessment",
        "Ethical exploitation testing",
        "Post-exploitation analysis",
        "Comprehensive security reporting",
        "Remediation recommendations"
      ]}
      tutorialSummary="Build a penetration testing framework for ethical security assessment. Learn reconnaissance techniques, vulnerability exploitation, and how to generate comprehensive security reports."
      difficulty="Advanced"
      timeEstimate="150 min"
      keyConcepts={[
        { name: "Reconnaissance", description: "Information gathering and enumeration" },
        { name: "Exploitation", description: "Testing vulnerabilities ethically" },
        { name: "Post-Exploitation", description: "Documenting findings and persistence" },
        { name: "Reporting", description: "Comprehensive security documentation" }
      ]}
      tutorialSteps={[
        {
          title: "Setup Testing Environment",
          description: "Configure penetration testing tools",
          steps: [
            "Install Kali Linux or testing tools",
            "Set up testing lab environment",
            "Configure network and targets",
            "Obtain proper authorization"
          ]
        },
        {
          title: "Reconnaissance Phase",
          description: "Gather information about target",
          steps: [
            "Perform port scanning",
            "Enumerate services and versions",
            "Gather information about target",
            "Map network topology"
          ]
        },
        {
          title: "Vulnerability Assessment",
          description: "Identify security weaknesses",
          steps: [
            "Scan for known vulnerabilities",
            "Test for common security issues",
            "Verify and validate findings",
            "Prioritize vulnerabilities"
          ]
        },
        {
          title: "Exploitation Testing",
          description: "Test vulnerabilities in controlled environment",
          steps: [
            "Attempt controlled exploitation",
            "Document exploitation steps",
            "Test impact and scope",
            "Verify remediation effectiveness"
          ]
        },
        {
          title: "Reporting and Remediation",
          description: "Generate comprehensive reports",
          steps: [
            "Document all findings",
            "Create remediation recommendations",
            "Generate executive summary",
            "Provide technical details"
          ]
        }
      ]}
      setupInstructions={`1. Set up testing environment:
Install Kali Linux or testing tools

2. Obtain authorization:
Get written permission for testing

3. Configure tools:
Set up Nmap, SQLMap, Metasploit

4. Create testing plan:
Document testing scope and methodology`}
      deploymentGuide={`1. Plan testing:
Define scope and objectives

2. Execute testing:
Follow ethical guidelines

3. Document findings:
Record all vulnerabilities and issues

4. Generate reports:
Create comprehensive security reports`}
      troubleshooting={[
        {
          issue: "Target blocking scanner",
          solution: "Use proxy chains and rotate IP addresses, ensure proper authorization"
        },
        {
          issue: "False positives in testing",
          solution: "Verify all findings manually and document verification steps"
        },
        {
          issue: "Incomplete testing coverage",
          solution: "Follow systematic testing methodology and use checklists"
        }
      ]}
    />
  );
};

export default PenetrationTestingDemoPage;

