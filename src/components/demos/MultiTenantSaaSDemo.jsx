import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const MultiTenantSaaSDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState('tenant-1');
  const [tenants, setTenants] = useState([
    { id: 'tenant-1', name: 'Acme Corp', plan: 'Enterprise', users: 45, data: ['Data 1', 'Data 2', 'Data 3'] },
    { id: 'tenant-2', name: 'TechStart Inc', plan: 'Professional', users: 12, data: ['Data A', 'Data B'] },
    { id: 'tenant-3', name: 'Global Solutions', plan: 'Basic', users: 5, data: ['Item 1'] }
  ]);

  const currentTenant = tenants.find(t => t.id === selectedTenant);

  const codeData = {
    code: `// Multi-tenant SaaS Platform
const express = require('express');
const { Pool } = require('pg');
const Redis = require('redis');

class MultiTenantSaaS {
  constructor() {
    this.app = express();
    this.db = new Pool({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });
    this.redis = Redis.createClient();
    this.tenants = new Map();
  }

  // Tenant Isolation Middleware
  tenantIsolationMiddleware(req, res, next) {
    // Extract tenant ID from subdomain, header, or JWT
    const tenantId = this.extractTenantId(req);
    
    if (!tenantId) {
      return res.status(401).json({ error: 'Tenant not identified' });
    }

    // Verify tenant exists and is active
    const tenant = this.tenants.get(tenantId);
    if (!tenant || !tenant.active) {
      return res.status(403).json({ error: 'Invalid or inactive tenant' });
    }

    // Attach tenant context to request
    req.tenant = tenant;
    req.tenantId = tenantId;

    // Set row-level security context
    this.setRLSContext(tenantId);

    next();
  }

  extractTenantId(req) {
    // Method 1: Subdomain
    const hostname = req.get('host');
    const subdomain = hostname.split('.')[0];
    if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
      return subdomain;
    }

    // Method 2: Header
    const tenantHeader = req.get('X-Tenant-ID');
    if (tenantHeader) {
      return tenantHeader;
    }

    // Method 3: JWT Token
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = this.verifyJWT(token);
      return decoded.tenantId;
    }

    return null;
  }

  // Row-Level Security (PostgreSQL)
  async setRLSContext(tenantId) {
    // Set session variable for RLS
    await this.db.query(\`SET app.current_tenant = '\${tenantId}'\`);
  }

  // Enable RLS on tables
  async enableRLS() {
    await this.db.query(\`
      ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;

      -- Create RLS policies
      CREATE POLICY tenant_isolation_users ON users
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant'));

      CREATE POLICY tenant_isolation_orders ON orders
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant'));

      CREATE POLICY tenant_isolation_products ON products
        FOR ALL
        USING (tenant_id = current_setting('app.current_tenant'));
    \`);
  }

  // Tenant Management
  async createTenant(tenantData) {
    const tenantId = this.generateTenantId();
    
    const tenant = {
      id: tenantId,
      name: tenantData.name,
      plan: tenantData.plan || 'basic',
      active: true,
      createdAt: new Date(),
      subscription: {
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    };

    this.tenants.set(tenantId, tenant);

    // Create tenant-specific database schema (optional)
    await this.createTenantSchema(tenantId);

    return tenant;
  }

  async createTenantSchema(tenantId) {
    // Option 1: Shared database with RLS (recommended)
    // Already handled by RLS policies

    // Option 2: Separate schema per tenant
    await this.db.query(\`
      CREATE SCHEMA IF NOT EXISTS tenant_\${tenantId};
      GRANT USAGE ON SCHEMA tenant_\${tenantId} TO app_user;
    \`);
  }

  // Subscription Management
  async updateSubscription(tenantId, plan) {
    const tenant = this.tenants.get(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }

    tenant.plan = plan;
    tenant.subscription = {
      ...tenant.subscription,
      plan,
      updatedAt: new Date()
    };

    // Apply plan limits
    this.applyPlanLimits(tenantId, plan);

    return tenant;
  }

  applyPlanLimits(tenantId, plan) {
    const limits = {
      basic: { users: 10, storage: '10GB', features: ['core'] },
      professional: { users: 50, storage: '100GB', features: ['core', 'advanced'] },
      enterprise: { users: -1, storage: 'unlimited', features: ['core', 'advanced', 'premium'] }
    };

    const tenant = this.tenants.get(tenantId);
    tenant.limits = limits[plan] || limits.basic;
  }

  // Usage Tracking
  async trackUsage(tenantId, resource, amount) {
    const key = \`usage:\${tenantId}:\${resource}:\${this.getCurrentPeriod()}\`;
    await this.redis.incrby(key, amount);
    await this.redis.expire(key, 86400 * 30); // 30 days

    // Check limits
    const usage = await this.redis.get(key);
    const tenant = this.tenants.get(tenantId);
    const limit = tenant.limits[resource];

    if (limit && usage > limit) {
      throw new Error(\`Usage limit exceeded for \${resource}\`);
    }
  }

  getCurrentPeriod() {
    const now = new Date();
    return \`\${now.getFullYear()}-\${String(now.getMonth() + 1).padStart(2, '0')}\`;
  }

  // Billing Integration
  async generateInvoice(tenantId, period) {
    const tenant = this.tenants.get(tenantId);
    const usage = await this.getUsage(tenantId, period);

    const invoice = {
      tenantId,
      period,
      plan: tenant.plan,
      baseAmount: this.getPlanPrice(tenant.plan),
      usageCharges: this.calculateUsageCharges(usage, tenant.plan),
      total: 0,
      status: 'pending'
    };

    invoice.total = invoice.baseAmount + invoice.usageCharges;

    // Store invoice
    await this.db.query(
      'INSERT INTO invoices (tenant_id, period, amount, status) VALUES ($1, $2, $3, $4)',
      [tenantId, period, invoice.total, 'pending']
    );

    return invoice;
  }

  getPlanPrice(plan) {
    const prices = {
      basic: 29.99,
      professional: 99.99,
      enterprise: 299.99
    };
    return prices[plan] || 0;
  }

  calculateUsageCharges(usage, plan) {
    // Calculate overage charges
    return 0; // Simplified
  }

  async getUsage(tenantId, period) {
    const keys = await this.redis.keys(\`usage:\${tenantId}:*:\${period}\`);
    const usage = {};

    for (const key of keys) {
      const resource = key.split(':')[2];
      const amount = await this.redis.get(key);
      usage[resource] = parseInt(amount) || 0;
    }

    return usage;
  }

  generateTenantId() {
    return 'tenant_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  verifyJWT(token) {
    // JWT verification logic
    return { tenantId: 'tenant-1' }; // Placeholder
  }
}

// Usage
const saas = new MultiTenantSaaS();

// Setup middleware
saas.app.use(saas.tenantIsolationMiddleware.bind(saas));

// Routes
saas.app.get('/api/users', async (req, res) => {
  // Automatically filtered by tenant due to RLS
  const users = await saas.db.query('SELECT * FROM users');
  res.json(users.rows);
});

saas.app.post('/api/tenants', async (req, res) => {
  const tenant = await saas.createTenant(req.body);
  res.json(tenant);
});

module.exports = MultiTenantSaaS;`,
    language: 'javascript',
    title: 'Multi-tenant SaaS Platform'
  };

  return (
    <div className="space-y-6">
      {/* Tenant Selector */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Tenant Management</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Tenant</label>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded text-white"
            >
              {tenants.map(tenant => (
                <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current Tenant Info */}
      {currentTenant && (
        <motion.div
          className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-semibold mb-4">Tenant Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-gray-400 text-sm">Name</div>
              <div className="text-white font-semibold mt-1">{currentTenant.name}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Plan</div>
              <div className="text-blue-400 font-semibold mt-1">{currentTenant.plan}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Users</div>
              <div className="text-white font-semibold mt-1">{currentTenant.users}</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tenant Data Isolation */}
      {currentTenant && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Tenant Data (Isolated)</h3>
          <div className="space-y-2">
            {currentTenant.data.map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-900 rounded border border-gray-700">
                <div className="text-white">{item}</div>
                <div className="text-xs text-gray-400 mt-1">Tenant: {currentTenant.id}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tenants Overview */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">All Tenants</h3>
        <div className="space-y-3">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="flex items-center justify-between p-4 bg-gray-900 rounded border border-gray-700">
              <div>
                <div className="font-semibold text-white">{tenant.name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {tenant.users} users • {tenant.plan} plan
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded text-xs ${
                  tenant.plan === 'Enterprise' ? 'bg-purple-900/50 text-purple-400' :
                  tenant.plan === 'Professional' ? 'bg-blue-900/50 text-blue-400' :
                  'bg-gray-700 text-gray-400'
                }`}>
                  {tenant.plan}
                </span>
                <button className="text-blue-400 hover:text-blue-300 text-sm">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Data Isolation</div>
            <div className="text-sm text-gray-400">Row-level security ensures complete tenant isolation</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Subscription Management</div>
            <div className="text-sm text-gray-400">Flexible plans with usage-based billing</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Usage Tracking</div>
            <div className="text-sm text-gray-400">Real-time usage monitoring and limits</div>
          </div>
          <div className="p-4 bg-gray-900 rounded border border-gray-700">
            <div className="text-blue-400 font-semibold mb-2">Multi-tenancy</div>
            <div className="text-sm text-gray-400">Support for unlimited tenants with isolation</div>
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

export default MultiTenantSaaSDemo;
