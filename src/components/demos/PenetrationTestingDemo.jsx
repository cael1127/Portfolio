import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const PenetrationTestingDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  const codeData = {
    code: `import nmap
import socket
import requests
from sqlmap import api

class PenetrationTestingFramework:
    def __init__(self, target):
        self.target = target
        self.results = []
    
    def reconnaissance(self):
        """Perform reconnaissance phase"""
        # Port scanning
        nm = nmap.PortScanner()
        nm.scan(self.target, '1-1000')
        
        # Service enumeration
        services = {}
        for host in nm.all_hosts():
            for proto in nm[host].all_protocols():
                ports = nm[host][proto].keys()
                for port in ports:
                    service = nm[host][proto][port]
                    services[port] = service
        
        return services
    
    def vulnerability_assessment(self):
        """Assess vulnerabilities"""
        vulnerabilities = []
        
        # Check for common vulnerabilities
        # SQL injection
        # XSS
        # Authentication bypass
        
        return vulnerabilities
    
    def exploitation(self, vulnerability):
        """Exploit identified vulnerability"""
        # Ethical exploitation for testing
        pass
    
    def post_exploitation(self):
        """Post-exploitation activities"""
        # Document findings
        # Test persistence
        # Check privilege escalation
        
        pass
    
    def generate_report(self):
        """Generate penetration test report"""
        report = {
            'target': self.target,
            'findings': self.results,
            'recommendations': []
        }
        return report`,
    explanation: `Comprehensive penetration testing framework for ethical security assessment.

## Testing Phases

**Reconnaissance**: Information gathering and enumeration.

**Vulnerability Assessment**: Identifying security weaknesses.

**Exploitation**: Testing vulnerabilities in controlled environment.

**Post-Exploitation**: Documenting findings and testing persistence.

**Reporting**: Generating comprehensive security reports.

## Technical Implementation

The framework uses tools like Nmap, SQLMap, and custom scripts for comprehensive security testing with proper documentation and ethical guidelines.

## Benefits

- **Comprehensive Testing**: Multiple testing phases
- **Ethical Approach**: Controlled testing environment
- **Documentation**: Detailed findings and recommendations
- **Remediation**: Actionable security improvements`,
    technologies: [
      { name: 'Nmap', description: 'Network scanner', tags: ['Network', 'Security'] },
      { name: 'SQLMap', description: 'SQL injection tool', tags: ['Security', 'Testing'] },
      { name: 'Metasploit', description: 'Penetration testing framework', tags: ['Security', 'Testing'] },
      { name: 'Burp Suite', description: 'Web security testing', tags: ['Web', 'Security'] }
    ],
    concepts: [
      { name: 'Reconnaissance', description: 'Information gathering', example: 'Port scanning and enumeration' },
      { name: 'Exploitation', description: 'Testing vulnerabilities', example: 'Ethical exploitation testing' },
      { name: 'Post-Exploitation', description: 'Documenting findings', example: 'Testing persistence and access' },
      { name: 'Reporting', description: 'Security documentation', example: 'Comprehensive test reports' }
    ],
    features: [
      'Reconnaissance and enumeration',
      'Vulnerability assessment',
      'Ethical exploitation testing',
      'Post-exploitation analysis',
      'Comprehensive reporting',
      'Remediation recommendations'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Penetration Testing Framework</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🔍</div>
            <div className="text-sm font-medium text-white">Recon</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm font-medium text-white">Exploitation</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium text-white">Reporting</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🔒</div>
            <div className="text-sm font-medium text-white">Remediation</div>
          </div>
        </div>
      </div>
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="python"
        title="Penetration Testing Framework"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default PenetrationTestingDemo;

