import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const SIEMDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [logs, setLogs] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [threats, setThreats] = useState(0);

  useEffect(() => {
    const logTypes = [
      { type: 'auth', message: 'Failed login attempt from 192.168.1.50', severity: 'medium', source: 'Auth Server' },
      { type: 'network', message: 'Unusual traffic pattern detected', severity: 'high', source: 'Firewall' },
      { type: 'system', message: 'File integrity check passed', severity: 'low', source: 'System Monitor' },
      { type: 'security', message: 'Suspicious process detected: malware.exe', severity: 'critical', source: 'Endpoint Protection' },
      { type: 'network', message: 'Port scan detected from 10.0.0.100', severity: 'high', source: 'IDS' }
    ];

    const interval = setInterval(() => {
      const randomLog = logTypes[Math.floor(Math.random() * logTypes.length)];
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        ...randomLog
      };

      setLogs(prev => [newLog, ...prev].slice(0, 30));

      if (randomLog.severity === 'critical' || randomLog.severity === 'high') {
        setAlerts(prev => [newLog, ...prev].slice(0, 10));
        setThreats(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-[var(--accent)] bg-[var(--accent-soft)]/30 border-[var(--accent)]/50';
      case 'high': return 'text-[var(--accent)] bg-[var(--accent-soft)]/30 border-[var(--accent)]/50';
      case 'medium': return 'text-[var(--accent)] bg-[var(--accent-soft)]/30 border-[var(--accent)]/50';
      default: return 'text-[var(--accent)] bg-[var(--accent-soft)]/30 border-[var(--accent)]/50';
    }
  };

  const codeData = {
    code: `// SIEM/Log Analysis System Implementation
const express = require('express');
const WebSocket = require('ws');
const { createLogger, format, transports } = require('winston');

class SIEMSystem {
  constructor() {
    this.logs = [];
    this.alerts = [];
    this.threatPatterns = [
      { pattern: /failed.*login/i, severity: 'medium', type: 'auth' },
      { pattern: /port.*scan/i, severity: 'high', type: 'network' },
      { pattern: /malware|virus|trojan/i, severity: 'critical', type: 'security' },
      { pattern: /sql.*injection/i, severity: 'high', type: 'web' }
    ];
  }

  // Ingest log entry
  ingestLog(logEntry) {
    this.logs.push({
      ...logEntry,
      timestamp: new Date().toISOString(),
      id: this.generateId()
    });

    // Analyze for threats
    this.analyzeThreat(logEntry);
  }

  // Threat analysis
  analyzeThreat(logEntry) {
    const message = logEntry.message || JSON.stringify(logEntry);
    
    for (const threat of this.threatPatterns) {
      if (threat.pattern.test(message)) {
        const alert = {
          id: this.generateId(),
          timestamp: new Date().toISOString(),
          severity: threat.severity,
          type: threat.type,
          message: logEntry.message,
          source: logEntry.source,
          action: 'investigate'
        };

        this.alerts.push(alert);
        this.notifyAlert(alert);
        break;
      }
    }
  }

  // Alert notification
  notifyAlert(alert) {
    // Send to dashboard, email, Slack, etc.
    console.log('ALERT:', alert);
    
    // WebSocket broadcast to connected clients
    if (this.wss) {
      this.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'alert', data: alert }));
        }
      });
    }
  }

  // Log correlation
  correlateLogs(timeWindow = 300000) { // 5 minutes
    const now = Date.now();
    const recentLogs = this.logs.filter(
      log => now - new Date(log.timestamp).getTime() < timeWindow
    );

    // Group by source IP
    const ipGroups = {};
    recentLogs.forEach(log => {
      const ip = this.extractIP(log.message);
      if (ip) {
        if (!ipGroups[ip]) ipGroups[ip] = [];
        ipGroups[ip].push(log);
      }
    });

    // Detect patterns
    Object.entries(ipGroups).forEach(([ip, logs]) => {
      if (logs.length > 10) {
        this.analyzeThreat({
          message: \`Multiple suspicious activities from \${ip}\`,
          source: 'SIEM Correlation Engine',
          severity: 'high'
        });
      }
    });
  }

  extractIP(message) {
    const ipRegex = /\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/;
    const match = message.match(ipRegex);
    return match ? match[0] : null;
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

module.exports = SIEMSystem;`,
    language: 'javascript',
    title: 'SIEM/Log Analysis System'
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[var(--muted)] text-sm">Total Logs</div>
          <div className="text-2xl font-bold text-[var(--text)] mt-1">{logs.length}</div>
        </motion.div>
        <motion.div 
          className="bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-[var(--accent)] text-sm">Active Alerts</div>
          <div className="text-2xl font-bold text-[var(--accent)] mt-1">{alerts.length}</div>
        </motion.div>
        <motion.div 
          className="bg-[var(--accent-soft)]/30 border-[var(--accent)]/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-[var(--accent)] text-sm">Threats Detected</div>
          <div className="text-2xl font-bold text-[var(--accent)] mt-1">{threats}</div>
        </motion.div>
      </div>

      {/* Alerts */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Security Alerts</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              className={`p-3 rounded border ${getSeverityColor(alert.severity)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{alert.severity.toUpperCase()}</span>
                    <span className="text-sm text-[var(--muted)]">{alert.timestamp}</span>
                  </div>
                  <div className="text-sm mt-1">{alert.message}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">Source: {alert.source}</div>
                </div>
                <button className="text-[var(--accent)] hover:text-[var(--accent)] text-sm">Investigate</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Log Stream */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Live Log Stream</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              className="flex items-center gap-3 p-2 bg-[var(--bg)] rounded border border-[var(--border)]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[var(--muted)] text-xs w-20">{log.timestamp}</span>
              <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(log.severity)}`}>
                {log.severity}
              </span>
              <span className="text-[var(--muted)] text-sm">{log.source}</span>
              <span className="text-[var(--text)] text-sm flex-1">{log.message}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowCodeViewer(true)}
          className="px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] rounded-lg transition-colors"
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

export default SIEMDemo;
