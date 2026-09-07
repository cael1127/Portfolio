import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const MicroservicesDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [services, setServices] = useState([
    { id: 'auth', name: 'Auth Service', status: 'healthy', requests: 0, latency: 0 },
    { id: 'user', name: 'User Service', status: 'healthy', requests: 0, latency: 0 },
    { id: 'product', name: 'Product Service', status: 'healthy', requests: 0, latency: 0 },
    { id: 'order', name: 'Order Service', status: 'healthy', requests: 0, latency: 0 },
    { id: 'payment', name: 'Payment Service', status: 'healthy', requests: 0, latency: 0 }
  ]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => prev.map(service => ({
        ...service,
        requests: service.requests + Math.floor(Math.random() * 5),
        latency: Math.floor(Math.random() * 100) + 10,
        status: Math.random() > 0.9 ? 'degraded' : 'healthy'
      })));

      // Simulate API gateway routing
      const serviceNames = ['auth', 'user', 'product', 'order', 'payment'];
      const randomService = serviceNames[Math.floor(Math.random() * serviceNames.length)];
      setRequests(prev => [{
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        service: randomService,
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.1 ? 200 : 500,
        latency: Math.floor(Math.random() * 150) + 20
      }, ...prev].slice(0, 20));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-[var(--accent)]';
      case 'degraded': return 'bg-[var(--accent)]';
      case 'down': return 'bg-[var(--accent)]';
      default: return 'bg-[var(--border-strong)]';
    }
  };

  const codeData = {
    code: `// Microservices Architecture Platform
const express = require('express');
const axios = require('axios');
const Redis = require('redis');

class MicroservicesPlatform {
  constructor() {
    this.services = new Map();
    this.serviceRegistry = new Map();
    this.apiGateway = express();
    this.redis = Redis.createClient();
    this.loadBalancer = new LoadBalancer();
  }

  // Service Registration
  registerService(serviceName, serviceUrl, healthCheckUrl) {
    this.serviceRegistry.set(serviceName, {
      url: serviceUrl,
      healthCheckUrl,
      instances: [],
      lastHealthCheck: null,
      status: 'unknown'
    });

    // Start health checking
    this.startHealthCheck(serviceName);
  }

  // Health Check
  async startHealthCheck(serviceName) {
    const service = this.serviceRegistry.get(serviceName);
    
    setInterval(async () => {
      try {
        const response = await axios.get(service.healthCheckUrl, { timeout: 5000 });
        service.status = response.status === 200 ? 'healthy' : 'degraded';
        service.lastHealthCheck = new Date();
      } catch (error) {
        service.status = 'down';
        service.lastHealthCheck = new Date();
      }
    }, 30000); // Check every 30 seconds
  }

  // Service Discovery
  discoverService(serviceName) {
    const service = this.serviceRegistry.get(serviceName);
    if (!service || service.status !== 'healthy') {
      throw new Error(\`Service \${serviceName} is not available\`);
    }
    
    // Load balancing
    const instance = this.loadBalancer.selectInstance(service.instances);
    return instance.url;
  }

  // API Gateway Routing
  setupAPIGateway() {
    this.apiGateway.use(express.json());
    
    // Service routing
    this.apiGateway.all('/api/:service/*', async (req, res) => {
      const serviceName = req.params.service;
      
      try {
        const serviceUrl = await this.discoverService(serviceName);
        const targetUrl = \`\${serviceUrl}\${req.path.replace(\`/api/\${serviceName}\`, '')}\`;
        
        // Forward request
        const response = await axios({
          method: req.method,
          url: targetUrl,
          data: req.body,
          headers: req.headers,
          timeout: 10000
        });
        
        res.status(response.status).json(response.data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  }

  // Inter-Service Communication
  async callService(serviceName, endpoint, method = 'GET', data = null) {
    const serviceUrl = await this.discoverService(serviceName);
    const url = \`\${serviceUrl}\${endpoint}\`;
    
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
          'X-Service-Request': 'true'
        }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(\`Service call failed: \${error.message}\`);
    }
  }

  // Circuit Breaker Pattern
  createCircuitBreaker(serviceName, options = {}) {
    const { failureThreshold = 5, timeout = 60000 } = options;
    let failures = 0;
    let state = 'closed'; // closed, open, half-open
    
    return async (fn) => {
      if (state === 'open') {
        throw new Error('Circuit breaker is open');
      }
      
      try {
        const result = await fn();
        failures = 0;
        state = 'closed';
        return result;
      } catch (error) {
        failures++;
        if (failures >= failureThreshold) {
          state = 'open';
          setTimeout(() => {
            state = 'half-open';
          }, timeout);
        }
        throw error;
      }
    };
  }
}

class LoadBalancer {
  constructor(strategy = 'round-robin') {
    this.strategy = strategy;
    this.currentIndex = 0;
  }

  selectInstance(instances) {
    if (instances.length === 0) {
      throw new Error('No service instances available');
    }

    switch (this.strategy) {
      case 'round-robin':
        const instance = instances[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % instances.length;
        return instance;
      
      case 'least-connections':
        return instances.reduce((min, instance) => 
          instance.connections < min.connections ? instance : min
        );
      
      case 'random':
        return instances[Math.floor(Math.random() * instances.length)];
      
      default:
        return instances[0];
    }
  }
}

// Usage
const platform = new MicroservicesPlatform();

// Register services
platform.registerService('auth', 'http://auth-service:3001', 'http://auth-service:3001/health');
platform.registerService('user', 'http://user-service:3002', 'http://user-service:3002/health');
platform.registerService('product', 'http://product-service:3003', 'http://product-service:3003/health');

// Setup API Gateway
platform.setupAPIGateway();

module.exports = MicroservicesPlatform;`,
    language: 'javascript',
    title: 'Microservices Architecture Platform'
  };

  return (
    <div className="space-y-6">
      {/* Service Health Dashboard */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Service Health Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-[var(--bg)] p-4 rounded-lg border border-[var(--border)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-[var(--text)]">{service.name}</div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Requests:</span>
                  <span className="text-[var(--text)]">{service.requests}</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Latency:</span>
                  <span className="text-[var(--text)]">{service.latency}ms</span>
                </div>
                <div className="flex justify-between text-[var(--muted)]">
                  <span>Status:</span>
                  <span className={`${
                    service.status === 'healthy' ? 'text-[var(--accent)]' :
                    service.status === 'degraded' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Topology */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">Service Topology</h3>
        <div className="flex items-center justify-center p-8 bg-[var(--bg)] rounded">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-[var(--text)] text-xs">API Gateway</span>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
              {services.slice(0, 4).map((service) => (
                <div key={service.id} className="text-center">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${
                    service.status === 'healthy' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                  }`}>
                    <span className="text-[var(--text)] text-xs">{service.name.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Request Log */}
      <div className="bg-[var(--surface)] rounded-lg border border-[var(--border)] p-6">
        <h3 className="text-lg font-semibold mb-4">API Gateway Request Log</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {requests.map((request) => (
            <motion.div
              key={request.id}
              className={`flex items-center gap-4 p-3 rounded border ${
                request.status === 200 
                  ? 'bg-[var(--bg)] border-[var(--border)]' 
                  : 'bg-[var(--accent-soft)]/20 border-[var(--accent)]/50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[var(--muted)] text-xs w-20">{request.timestamp}</span>
              <span className="text-[var(--accent)] font-mono text-xs w-16">{request.method}</span>
              <span className="text-[var(--text)] text-sm">/api/{request.service}</span>
              <span className={`px-2 py-1 rounded text-xs ${
                request.status === 200 ? 'bg-[var(--accent-soft)]/50 text-[var(--accent)]' : 'bg-[var(--accent-soft)]/50 text-[var(--accent)]'
              }`}>
                {request.status}
              </span>
              <span className="text-[var(--muted)] text-xs ml-auto">{request.latency}ms</span>
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

export default MicroservicesDemo;
