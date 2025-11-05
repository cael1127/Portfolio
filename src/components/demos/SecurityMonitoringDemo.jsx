import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const SecurityMonitoringDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  const codeData = {
    code: `import logging
from datetime import datetime
import json
from collections import defaultdict

class SecurityMonitoringDashboard:
    def __init__(self):
        self.alerts = []
        self.threats = []
        self.logs = []
        self.metrics = defaultdict(int)
    
    def collect_logs(self, log_source):
        """Collect security logs from various sources"""
        # Collect from:
        # - Application logs
        # - Firewall logs
        # - IDS/IPS logs
        # - Authentication logs
        pass
    
    def detect_threats(self, logs):
        """Detect security threats from logs"""
        threats = []
        
        # Detect brute force attacks
        failed_logins = [log for log in logs if 'failed login' in log]
        if len(failed_logins) > 10:
            threats.append({
                'type': 'brute_force',
                'severity': 'high',
                'description': 'Multiple failed login attempts'
            })
        
        # Detect suspicious activity
        suspicious_patterns = ['sql injection', 'xss', 'unauthorized access']
        for pattern in suspicious_patterns:
            if any(pattern in log.lower() for log in logs):
                threats.append({
                    'type': 'suspicious_activity',
                    'severity': 'medium',
                    'description': f'Detected {pattern}'
                })
        
        return threats
    
    def generate_alert(self, threat):
        """Generate security alert"""
        alert = {
            'id': len(self.alerts) + 1,
            'threat': threat,
            'timestamp': datetime.now().isoformat(),
            'status': 'active'
        }
        self.alerts.append(alert)
        return alert
    
    def incident_response(self, alert):
        """Automated incident response"""
        # Block IP addresses
        # Isolate affected systems
        # Notify security team
        pass
    
    def generate_report(self):
        """Generate security monitoring report"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'total_alerts': len(self.alerts),
            'active_threats': len([a for a in self.alerts if a['status'] == 'active']),
            'threats_by_severity': {
                'high': len([a for a in self.alerts if a['threat']['severity'] == 'high']),
                'medium': len([a for a in self.alerts if a['threat']['severity'] == 'medium']),
                'low': len([a for a in self.alerts if a['threat']['severity'] == 'low'])
            }
        }
        return report

# Usage
monitor = SecurityMonitoringDashboard()
logs = monitor.collect_logs('firewall')
threats = monitor.detect_threats(logs)
for threat in threats:
    alert = monitor.generate_alert(threat)
    monitor.incident_response(alert)
report = monitor.generate_report()`,
    explanation: `Real-time security monitoring dashboard for threat detection, log analysis, alerting, and incident response.

## Monitoring Capabilities

**Log Collection**: Aggregates logs from multiple sources (firewall, applications, IDS/IPS).

**Threat Detection**: Identifies security threats using pattern matching and anomaly detection.

**Alerting**: Generates alerts for security incidents with severity levels.

**Incident Response**: Automated response to security threats (IP blocking, system isolation).

**Reporting**: Comprehensive security reports and dashboards.

## Technical Implementation

The dashboard uses log aggregation, pattern matching, anomaly detection, and automated response mechanisms for comprehensive security monitoring.

## Benefits

- **Real-time Monitoring**: Immediate threat detection
- **Automated Response**: Quick response to security incidents
- **Comprehensive Coverage**: Multiple log sources and threat types
- **Actionable Insights**: Detailed reports and recommendations`,
    technologies: [
      { name: 'ELK Stack', description: 'Log aggregation and analysis', tags: ['Logging', 'Analytics'] },
      { name: 'Splunk', description: 'Security information management', tags: ['SIEM', 'Security'] },
      { name: 'Prometheus', description: 'Metrics and monitoring', tags: ['Monitoring', 'Metrics'] },
      { name: 'Grafana', description: 'Visualization dashboard', tags: ['Visualization', 'Dashboard'] }
    ],
    concepts: [
      { name: 'SIEM', description: 'Security Information and Event Management', example: 'Centralized log analysis' },
      { name: 'Threat Detection', description: 'Identifying security threats', example: 'Pattern matching and anomaly detection' },
      { name: 'Incident Response', description: 'Responding to security incidents', example: 'Automated blocking and isolation' },
      { name: 'Log Analysis', description: 'Analyzing security logs', example: 'Correlation and pattern detection' }
    ],
    features: [
      'Real-time threat detection',
      'Log aggregation and analysis',
      'Automated alerting',
      'Incident response automation',
      'Security dashboards',
      'Comprehensive reporting'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Security Monitoring Dashboard</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium text-white">Threat Detection</div>
            <div className="text-xs text-gray-400">Real-time</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">📝</div>
            <div className="text-sm font-medium text-white">Log Analysis</div>
            <div className="text-xs text-gray-400">Aggregated</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">🚨</div>
            <div className="text-sm font-medium text-white">Alerting</div>
            <div className="text-xs text-gray-400">Automated</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-sm font-medium text-white">Response</div>
            <div className="text-xs text-gray-400">Incident</div>
          </div>
        </div>
      </div>
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="python"
        title="Security Monitoring Dashboard"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default SecurityMonitoringDemo;

