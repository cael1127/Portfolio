import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const OWASPScannerDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [target, setTarget] = useState('');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);

  const owaspTop10 = [
    { id: 'A01', name: 'Broken Access Control', severity: 'high' },
    { id: 'A02', name: 'Cryptographic Failures', severity: 'high' },
    { id: 'A03', name: 'Injection', severity: 'critical' },
    { id: 'A04', name: 'Insecure Design', severity: 'medium' },
    { id: 'A05', name: 'Security Misconfiguration', severity: 'medium' },
    { id: 'A06', name: 'Vulnerable Components', severity: 'high' },
    { id: 'A07', name: 'Authentication Failures', severity: 'high' },
    { id: 'A08', name: 'Software and Data Integrity', severity: 'medium' },
    { id: 'A09', name: 'Security Logging Failures', severity: 'low' },
    { id: 'A10', name: 'Server-Side Request Forgery', severity: 'high' }
  ];

  const handleScan = async () => {
    if (!target) return;
    
    setScanning(true);
    
    // Simulate scanning
    setTimeout(() => {
      const foundVulnerabilities = owaspTop10
        .filter(() => Math.random() > 0.6)
        .map(vuln => ({
          ...vuln,
          description: `Vulnerability found in ${vuln.name.toLowerCase()}`,
          location: `${target}/api/endpoint`,
          recommendation: `Implement proper ${vuln.name.toLowerCase()} controls`
        }));

      setResults({
        target,
        totalVulnerabilities: foundVulnerabilities.length,
        critical: foundVulnerabilities.filter(v => v.severity === 'critical').length,
        high: foundVulnerabilities.filter(v => v.severity === 'high').length,
        medium: foundVulnerabilities.filter(v => v.severity === 'medium').length,
        low: foundVulnerabilities.filter(v => v.severity === 'low').length,
        vulnerabilities: foundVulnerabilities,
        scanTime: new Date().toLocaleString()
      });
      
      setScanning(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/30 border-red-500/50';
      case 'high': return 'text-orange-400 bg-orange-900/30 border-orange-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
      default: return 'text-blue-400 bg-blue-900/30 border-blue-500/50';
    }
  };

  const codeData = {
    code: `// OWASP Top 10 Security Scanner
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin, urlparse

class OWASPScanner:
    def __init__(self, target_url):
        self.target_url = target_url
        self.session = requests.Session()
        self.vulnerabilities = []
        self.owasp_top10 = {
            'A01': 'Broken Access Control',
            'A02': 'Cryptographic Failures',
            'A03': 'Injection',
            'A04': 'Insecure Design',
            'A05': 'Security Misconfiguration',
            'A06': 'Vulnerable Components',
            'A07': 'Authentication Failures',
            'A08': 'Software and Data Integrity',
            'A09': 'Security Logging Failures',
            'A10': 'Server-Side Request Forgery'
        }
    
    def scan(self):
        """Run comprehensive OWASP Top 10 scan"""
        print(f"Scanning {self.target_url} for OWASP Top 10 vulnerabilities...")
        
        # A01: Broken Access Control
        self.check_access_control()
        
        # A02: Cryptographic Failures
        self.check_cryptographic_failures()
        
        # A03: Injection
        self.check_injection()
        
        # A04: Insecure Design
        self.check_insecure_design()
        
        # A05: Security Misconfiguration
        self.check_security_misconfiguration()
        
        # A06: Vulnerable Components
        self.check_vulnerable_components()
        
        # A07: Authentication Failures
        self.check_authentication_failures()
        
        # A08: Software and Data Integrity
        self.check_data_integrity()
        
        # A09: Security Logging Failures
        self.check_logging_failures()
        
        # A10: SSRF
        self.check_ssrf()
        
        return self.generate_report()
    
    def check_access_control(self):
        """A01: Test for broken access control"""
        # Test unauthorized access to admin endpoints
        admin_endpoints = ['/admin', '/api/admin', '/dashboard']
        for endpoint in admin_endpoints:
            try:
                response = self.session.get(urljoin(self.target_url, endpoint))
                if response.status_code == 200:
                    self.vulnerabilities.append({
                        'id': 'A01',
                        'name': 'Broken Access Control',
                        'severity': 'high',
                        'location': endpoint,
                        'description': 'Unauthorized access to admin endpoint'
                    })
            except:
                pass
    
    def check_injection(self):
        """A03: Test for injection vulnerabilities"""
        # SQL Injection
        sql_payloads = ["' OR '1'='1", "1' UNION SELECT NULL--", "admin'--"]
        forms = self.get_forms()
        
        for form in forms:
            for payload in sql_payloads:
                if self.test_sql_injection(form, payload):
                    self.vulnerabilities.append({
                        'id': 'A03',
                        'name': 'Injection (SQL)',
                        'severity': 'critical',
                        'location': form['action'],
                        'description': 'SQL injection vulnerability detected'
                    })
        
        # XSS
        xss_payloads = ['<script>alert(1)</script>', '<img src=x onerror=alert(1)>']
        for form in forms:
            for payload in xss_payloads:
                if self.test_xss(form, payload):
                    self.vulnerabilities.append({
                        'id': 'A03',
                        'name': 'Injection (XSS)',
                        'severity': 'high',
                        'location': form['action'],
                        'description': 'Cross-site scripting vulnerability detected'
                    })
    
    def check_cryptographic_failures(self):
        """A02: Check for cryptographic failures"""
        # Check if HTTPS is used
        if not self.target_url.startswith('https://'):
            self.vulnerabilities.append({
                'id': 'A02',
                'name': 'Cryptographic Failures',
                'severity': 'high',
                'location': 'Connection',
                'description': 'Site not using HTTPS'
            })
        
        # Check for weak cipher suites
        # (Implementation would check SSL/TLS configuration)
    
    def check_security_misconfiguration(self):
        """A05: Check for security misconfigurations"""
        # Check for exposed sensitive files
        sensitive_files = ['.env', '.git/config', 'backup.sql', 'config.php']
        for file in sensitive_files:
            try:
                response = self.session.get(urljoin(self.target_url, file))
                if response.status_code == 200:
                    self.vulnerabilities.append({
                        'id': 'A05',
                        'name': 'Security Misconfiguration',
                        'severity': 'medium',
                        'location': file,
                        'description': f'Exposed sensitive file: {file}'
                    })
            except:
                pass
        
        # Check security headers
        response = self.session.get(self.target_url)
        headers = response.headers
        
        if 'X-Frame-Options' not in headers:
            self.vulnerabilities.append({
                'id': 'A05',
                'name': 'Security Misconfiguration',
                'severity': 'medium',
                'location': 'Headers',
                'description': 'Missing X-Frame-Options header'
            })
    
    def check_authentication_failures(self):
        """A07: Check for authentication failures"""
        # Test for weak passwords, session management issues, etc.
        login_endpoints = ['/login', '/api/login', '/auth']
        for endpoint in login_endpoints:
            # Test for brute force protection
            # Test for session fixation
            # Test for weak password policies
            pass
    
    def get_forms(self):
        """Extract forms from the target page"""
        try:
            response = self.session.get(self.target_url)
            soup = BeautifulSoup(response.content, 'html.parser')
            forms = []
            for form in soup.find_all('form'):
                forms.append({
                    'action': form.get('action', ''),
                    'method': form.get('method', 'GET').upper()
                })
            return forms
        except:
            return []
    
    def test_sql_injection(self, form, payload):
        """Test for SQL injection"""
        # Implementation would send payload and check response
        return False  # Placeholder
    
    def test_xss(self, form, payload):
        """Test for XSS"""
        # Implementation would send payload and check response
        return False  # Placeholder
    
    def generate_report(self):
        """Generate comprehensive scan report"""
        return {
            'target': self.target_url,
            'total_vulnerabilities': len(self.vulnerabilities),
            'critical': len([v for v in self.vulnerabilities if v['severity'] == 'critical']),
            'high': len([v for v in self.vulnerabilities if v['severity'] == 'high']),
            'medium': len([v for v in self.vulnerabilities if v['severity'] == 'medium']),
            'low': len([v for v in self.vulnerabilities if v['severity'] == 'low']),
            'vulnerabilities': self.vulnerabilities
        }

# Usage
scanner = OWASPScanner('https://example.com')
report = scanner.scan()
print(f"Found {report['total_vulnerabilities']} vulnerabilities")`,
    language: 'python',
    title: 'OWASP Top 10 Security Scanner'
  };

  return (
    <div className="space-y-6">
      {/* Scan Input */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">OWASP Top 10 Scanner</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded text-white"
          />
          <button
            onClick={handleScan}
            disabled={scanning || !target}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            {scanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>
      </div>

      {/* OWASP Top 10 Reference */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">OWASP Top 10 (2021)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {owaspTop10.map((item) => (
            <div key={item.id} className="p-3 bg-gray-900 rounded border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-blue-400 font-mono text-sm">{item.id}</span>
                  <div className="text-white text-sm mt-1">{item.name}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.severity === 'critical' ? 'bg-red-900/50 text-red-400' :
                  item.severity === 'high' ? 'bg-orange-900/50 text-orange-400' :
                  'bg-yellow-900/50 text-yellow-400'
                }`}>
                  {item.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scan Results */}
      {results && (
        <motion.div
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Scan Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-900 rounded border border-gray-700">
              <div className="text-2xl font-bold text-white">{results.totalVulnerabilities}</div>
              <div className="text-sm text-gray-400 mt-1">Total</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded border border-red-500/50">
              <div className="text-2xl font-bold text-red-400">{results.critical}</div>
              <div className="text-sm text-red-400 mt-1">Critical</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 rounded border border-orange-500/50">
              <div className="text-2xl font-bold text-orange-400">{results.high}</div>
              <div className="text-sm text-orange-400 mt-1">High</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded border border-yellow-500/50">
              <div className="text-2xl font-bold text-yellow-400">{results.medium}</div>
              <div className="text-sm text-yellow-400 mt-1">Medium</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/50">
              <div className="text-2xl font-bold text-blue-400">{results.low}</div>
              <div className="text-sm text-blue-400 mt-1">Low</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-300">Vulnerabilities Found:</h4>
            {results.vulnerabilities.map((vuln, idx) => (
              <div key={idx} className={`p-4 rounded border ${getSeverityColor(vuln.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-blue-400">{vuln.id}</span>
                      <span className="font-semibold">{vuln.name}</span>
                    </div>
                    <div className="text-sm text-gray-300 mb-1">{vuln.description}</div>
                    <div className="text-xs text-gray-400">Location: {vuln.location}</div>
                    <div className="text-xs text-gray-400 mt-1">Recommendation: {vuln.recommendation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          View Code
        </button>
      </div>

      {showCodeViewer && (
        <CodeViewer
          code={codeData.code}
          language={codeData.language}
          title={codeData.title}
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default OWASPScannerDemo;
