import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const APISecurityGatewayDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('/api/users');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState(null);
  const [rateLimit, setRateLimit] = useState({ remaining: 100, limit: 100, reset: Date.now() + 60000 });

  const handleRequest = async () => {
    // Simulate API request
    if (!apiKey) {
      setResponse({ error: 'API key required', status: 401 });
      return;
    }

    // Simulate rate limiting
    if (rateLimit.remaining <= 0) {
      setResponse({ error: 'Rate limit exceeded', status: 429 });
      return;
    }

    setRateLimit(prev => ({ ...prev, remaining: prev.remaining - 1 }));
    
    // Simulate successful response
    setTimeout(() => {
      setResponse({
        status: 200,
        data: { users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }] },
        headers: { 'X-RateLimit-Remaining': rateLimit.remaining - 1 }
      });
    }, 500);
  };

  const codeData = {
    code: `// API Security Gateway Implementation
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Redis = require('redis');

class APISecurityGateway {
  constructor() {
    this.apiKeys = new Map();
    this.rateLimitStore = Redis.createClient();
    this.jwtSecret = process.env.JWT_SECRET;
  }

  // API Key Authentication
  authenticateAPIKey(req, res, next) {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    
    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const keyData = this.apiKeys.get(apiKey);
    if (!keyData || !keyData.active) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.apiKey = keyData;
    next();
  }

  // JWT Authentication
  authenticateJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token required' });
    }

    jwt.verify(token, this.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  }

  // Rate Limiting
  createRateLimiter(windowMs, maxRequests) {
    return rateLimit({
      windowMs,
      max: maxRequests,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        client: this.rateLimitStore,
        prefix: 'ratelimit:'
      }),
      keyGenerator: (req) => {
        return req.apiKey?.id || req.user?.id || req.ip;
      }
    });
  }

  // Request Validation
  validateRequest(req, res, next) {
    // Validate content type
    if (req.method === 'POST' || req.method === 'PUT') {
      if (!req.is('application/json')) {
        return res.status(400).json({ error: 'Content-Type must be application/json' });
      }
    }

    // Validate request size
    if (req.headers['content-length'] > 10485760) { // 10MB
      return res.status(413).json({ error: 'Request too large' });
    }

    next();
  }

  // CORS Configuration
  configureCORS() {
    return (req, res, next) => {
      const origin = req.headers.origin;
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

      if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-API-Key');
      }

      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }

      next();
    };
  }

  // API Key Management
  generateAPIKey(userId, permissions = []) {
    const key = this.generateRandomKey();
    this.apiKeys.set(key, {
      id: userId,
      key,
      active: true,
      permissions,
      createdAt: new Date(),
      lastUsed: null
    });
    return key;
  }

  generateRandomKey() {
    return 'sk_' + require('crypto').randomBytes(32).toString('hex');
  }
}

module.exports = APISecurityGateway;`,
    language: 'javascript',
    title: 'API Security Gateway'
  };

  return (
    <div className="space-y-6">
      {/* API Configuration */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">API Request</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">API Key</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Endpoint</label>
              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
              />
            </div>
          </div>
          <button
            onClick={handleRequest}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Send Request
          </button>
        </div>
      </div>

      {/* Rate Limit Status */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Rate Limit Status</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Remaining</span>
              <span>{rateLimit.remaining} / {rateLimit.limit}</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(rateLimit.remaining / rateLimit.limit) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Response */}
      {response && (
        <motion.div
          className={`bg-gray-800 rounded-lg border p-6 ${
            response.status === 200 ? 'border-green-500/50' : 'border-red-500/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Response</h3>
          <div className={`text-sm font-mono p-4 rounded bg-gray-900 ${
            response.status === 200 ? 'text-green-400' : 'text-red-400'
          }`}>
            <div>Status: {response.status}</div>
            <pre className="mt-2 overflow-x-auto">
              {JSON.stringify(response.data || response.error, null, 2)}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Authentication Methods */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Supported Authentication</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">API Key</div>
            <div className="text-sm text-gray-400">Header: X-API-Key</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">JWT Token</div>
            <div className="text-sm text-gray-400">Header: Authorization: Bearer</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">OAuth2</div>
            <div className="text-sm text-gray-400">Standard OAuth2 flow</div>
          </div>
        </div>
      </div>

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

export default APISecurityGatewayDemo;
