import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const WAFDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [requests, setRequests] = useState([]);
  const [rules, setRules] = useState([
    { id: 1, name: 'SQL Injection Protection', enabled: true, blocked: 12 },
    { id: 2, name: 'XSS Protection', enabled: true, blocked: 8 },
    { id: 3, name: 'Rate Limiting', enabled: true, blocked: 45 },
    { id: 4, name: 'IP Blacklist', enabled: true, blocked: 23 }
  ]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    blocked: 0,
    allowed: 0,
    blockedPercentage: 0
  });

  useEffect(() => {
    // Simulate incoming requests
    const interval = setInterval(() => {
      const requestTypes = [
        { type: 'normal', path: '/api/users', method: 'GET', ip: '192.168.1.100' },
        { type: 'sql-injection', path: '/api/login', method: 'POST', ip: '10.0.0.50', blocked: true, reason: 'SQL Injection' },
        { type: 'xss', path: '/api/comment', method: 'POST', ip: '172.16.0.25', blocked: true, reason: 'XSS Attack' },
        { type: 'rate-limit', path: '/api/data', method: 'GET', ip: '192.168.1.200', blocked: true, reason: 'Rate Limit Exceeded' },
        { type: 'normal', path: '/api/products', method: 'GET', ip: '192.168.1.101' }
      ];

      const randomRequest = requestTypes[Math.floor(Math.random() * requestTypes.length)];
      const newRequest = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        ...randomRequest,
        blocked: randomRequest.blocked || false
      };

      setRequests(prev => [newRequest, ...prev].slice(0, 20));
      
      setStats(prev => {
        const total = prev.totalRequests + 1;
        const blocked = prev.blocked + (newRequest.blocked ? 1 : 0);
        const allowed = total - blocked;
        return {
          totalRequests: total,
          blocked,
          allowed,
          blockedPercentage: ((blocked / total) * 100).toFixed(1)
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const codeData = {
    code: `// Web Application Firewall (WAF) Implementation
const express = require('express');
const rateLimit = require('express-rate-limit');

class WebApplicationFirewall {
  constructor() {
    this.rules = [];
    this.blockedIPs = new Set();
    this.requestHistory = new Map();
  }

  // SQL Injection Detection
  detectSQLInjection(input) {
    const sqlPatterns = [
      /('|(\\-\\-)|(;)|(\\|\\|)|(\\*)|(%))/i,
      /(union|select|insert|update|delete|drop|create|alter)/i,
      /(exec|execute|script|javascript|vbscript)/i
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }

  // XSS Detection
  detectXSS(input) {
    const xssPatterns = [
      /<script[^>]*>.*?<\\/script>/gi,
      /<iframe[^>]*>.*?<\\/iframe>/gi,
      /javascript:/gi,
      /on\\w+\\s*=/gi
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }

  // Rate Limiting
  checkRateLimit(ip) {
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 100;

    if (!this.requestHistory.has(ip)) {
      this.requestHistory.set(ip, []);
    }

    const requests = this.requestHistory.get(ip);
    const recentRequests = requests.filter(time => now - time < windowMs);

    if (recentRequests.length >= maxRequests) {
      return false; // Rate limit exceeded
    }

    recentRequests.push(now);
    this.requestHistory.set(ip, recentRequests);
    return true;
  }

  // Main WAF Middleware
  middleware(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    
    // Check IP blacklist
    if (this.blockedIPs.has(ip)) {
      return res.status(403).json({ error: 'IP blocked' });
    }

    // Check rate limiting
    if (!this.checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    // Check request body for SQL injection
    if (req.body && JSON.stringify(req.body).match(this.detectSQLInjection)) {
      this.blockedIPs.add(ip);
      return res.status(403).json({ error: 'SQL injection detected' });
    }

    // Check for XSS
    if (req.body && this.detectXSS(JSON.stringify(req.body))) {
      return res.status(403).json({ error: 'XSS attack detected' });
    }

    next();
  }
}

module.exports = WebApplicationFirewall;`,
    language: 'javascript',
    title: 'Web Application Firewall Implementation'
  };

  return (
    <div className="space-y-6">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gray-400 text-sm">Total Requests</div>
          <div className="text-2xl font-bold text-white mt-1">{stats.totalRequests}</div>
        </motion.div>
        <motion.div 
          className="bg-red-900/30 border-red-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-red-400 text-sm">Blocked</div>
          <div className="text-2xl font-bold text-red-400 mt-1">{stats.blocked}</div>
        </motion.div>
        <motion.div 
          className="bg-green-900/30 border-green-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-green-400 text-sm">Allowed</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{stats.allowed}</div>
        </motion.div>
        <motion.div 
          className="bg-yellow-900/30 border-yellow-500/50 p-4 rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-yellow-400 text-sm">Block Rate</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">{stats.blockedPercentage}%</div>
        </motion.div>
      </div>

      {/* Security Rules */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Security Rules</h3>
        <div className="space-y-3">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-900 rounded border border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                <span className="text-white">{rule.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">Blocked: {rule.blocked}</span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">Configure</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Log */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Request Log</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              className={`flex items-center justify-between p-3 rounded border ${
                request.blocked 
                  ? 'bg-red-900/20 border-red-500/50' 
                  : 'bg-gray-900 border-gray-700'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${request.blocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-gray-400 text-sm">{request.timestamp}</span>
                <span className="text-white font-mono text-sm">{request.method}</span>
                <span className="text-gray-300">{request.path}</span>
                <span className="text-gray-500 text-sm">{request.ip}</span>
              </div>
              {request.blocked && (
                <span className="text-red-400 text-sm font-semibold">{request.reason}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Code Viewer Button */}
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

export default WAFDemo;
