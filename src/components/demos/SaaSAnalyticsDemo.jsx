import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const SaaSAnalyticsDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState({
    mrr: 0,
    activeUsers: 0,
    churnRate: 0,
    conversionRate: 0
  });
  const [chartData, setChartData] = useState([]);
  const [topFeatures, setTopFeatures] = useState([]);

  useEffect(() => {
    // Sample metrics
    setMetrics({
      mrr: 125420,
      activeUsers: 3847,
      churnRate: 2.3,
      conversionRate: 8.5
    });

    // Sample chart data
    setChartData([
      { date: '2024-01-08', revenue: 18500, users: 3650 },
      { date: '2024-01-09', revenue: 19200, users: 3720 },
      { date: '2024-01-10', revenue: 20100, users: 3790 },
      { date: '2024-01-11', revenue: 19800, users: 3810 },
      { date: '2024-01-12', revenue: 21500, users: 3850 },
      { date: '2024-01-13', revenue: 22300, users: 3920 },
      { date: '2024-01-14', revenue: 23100, users: 4010 }
    ]);

    // Sample feature usage
    setTopFeatures([
      { name: 'Dashboard', usage: 95, trend: 'up' },
      { name: 'Reports', usage: 78, trend: 'up' },
      { name: 'API Access', usage: 62, trend: 'stable' },
      { name: 'Integrations', usage: 45, trend: 'up' },
      { name: 'Team Collaboration', usage: 38, trend: 'down' }
    ]);
  }, [timeRange]);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart } from 'recharts';
import mixpanel from 'mixpanel-browser';
import amplitude from 'amplitude-js';
import { ClickHouse } from '@clickhouse/client';

// SaaS Analytics Dashboard

class AnalyticsPlatform {
  constructor() {
    this.clickhouse = new ClickHouse({
      host: process.env.CLICKHOUSE_HOST,
      password: process.env.CLICKHOUSE_PASSWORD
    });
    
    mixpanel.init(process.env.MIXPANEL_TOKEN);
    amplitude.getInstance().init(process.env.AMPLITUDE_KEY);
  }

  // Track user events
  trackEvent(userId, eventName, properties) {
    const event = {
      user_id: userId,
      event_name: eventName,
      timestamp: new Date(),
      properties: JSON.stringify(properties),
      session_id: this.getSessionId(),
      device: this.getDeviceInfo(),
      location: this.getLocation()
    };

    // Send to ClickHouse for real-time analytics
    this.clickhouse.insert({
      table: 'events',
      values: [event],
      format: 'JSONEachRow'
    });

    // Send to Mixpanel for product analytics
    mixpanel.track(eventName, properties);

    // Send to Amplitude for behavioral analytics
    amplitude.getInstance().logEvent(eventName, properties);
  }

  // Calculate MRR (Monthly Recurring Revenue)
  async calculateMRR(startDate, endDate) {
    const query = \`
      SELECT
        toStartOfMonth(created_at) as month,
        sum(amount) as mrr,
        count(distinct user_id) as paying_customers,
        avg(amount) as arpu
      FROM subscriptions
      WHERE status = 'active'
        AND created_at BETWEEN '\${startDate}' AND '\${endDate}'
      GROUP BY month
      ORDER BY month DESC
    \`;

    const result = await this.clickhouse.query({ query });
    return result.json();
  }

  // Calculate Churn Rate
  async calculateChurnRate(period = '30d') {
    const query = \`
      WITH 
        start_users AS (
          SELECT count(distinct user_id) as count
          FROM subscriptions
          WHERE created_at <= now() - INTERVAL \${period}
            AND status = 'active'
        ),
        churned_users AS (
          SELECT count(distinct user_id) as count
          FROM subscriptions
          WHERE canceled_at >= now() - INTERVAL \${period}
            AND canceled_at <= now()
        )
      SELECT 
        churned_users.count / start_users.count * 100 as churn_rate
      FROM start_users, churned_users
    \`;

    const result = await this.clickhouse.query({ query });
    return result.json();
  }

  // Cohort Analysis
  async cohortAnalysis(startDate, endDate) {
    const query = \`
      SELECT
        toStartOfMonth(first_seen) as cohort_month,
        month_number,
        count(distinct user_id) as users,
        sum(revenue) as revenue
      FROM (
        SELECT
          user_id,
          min(created_at) as first_seen,
          dateDiff('month', min(created_at), created_at) as month_number,
          sum(amount) as revenue
        FROM events
        WHERE event_name = 'purchase'
        GROUP BY user_id, month_number
      )
      WHERE first_seen BETWEEN '\${startDate}' AND '\${endDate}'
      GROUP BY cohort_month, month_number
      ORDER BY cohort_month, month_number
    \`;

    const result = await this.clickhouse.query({ query });
    return this.formatCohortData(result.json());
  }

  // Funnel Analysis
  async funnelAnalysis(steps, timeWindow = '7d') {
    const funnelQuery = steps.map((step, index) => \`
      SELECT
        '\${step}' as step,
        \${index + 1} as step_number,
        count(distinct user_id) as users
      FROM events
      WHERE event_name = '\${step}'
        AND timestamp >= now() - INTERVAL \${timeWindow}
    \`).join(' UNION ALL ');

    const result = await this.clickhouse.query({ query: funnelQuery });
    const data = result.json();

    // Calculate conversion rates
    return data.map((step, index) => ({
      ...step,
      conversion_rate: index > 0 
        ? (step.users / data[0].users * 100).toFixed(2)
        : 100
    }));
  }

  // User Retention
  async retentionAnalysis(days = 30) {
    const query = \`
      SELECT
        day_number,
        count(distinct user_id) as retained_users,
        retained_users / first_day_users * 100 as retention_rate
      FROM (
        SELECT
          user_id,
          dateDiff('day', min(created_at), event_date) as day_number
        FROM events
        WHERE created_at >= now() - INTERVAL \${days} DAY
        GROUP BY user_id, event_date
      )
      GROUP BY day_number
      ORDER BY day_number
    \`;

    const result = await this.clickhouse.query({ query });
    return result.json();
  }

  // Feature Usage Analytics
  async featureUsage(timeRange = '30d') {
    const query = \`
      SELECT
        feature_name,
        count(*) as usage_count,
        count(distinct user_id) as unique_users,
        avg(time_spent) as avg_time_spent
      FROM events
      WHERE event_name = 'feature_used'
        AND timestamp >= now() - INTERVAL \${timeRange}
      GROUP BY feature_name
      ORDER BY usage_count DESC
      LIMIT 20
    \`;

    const result = await this.clickhouse.query({ query });
    return result.json();
  }

  // Revenue Analytics
  async revenueBreakdown(timeRange = '30d') {
    const query = \`
      SELECT
        plan_type,
        billing_frequency,
        count(distinct user_id) as subscribers,
        sum(amount) as revenue,
        avg(amount) as arpu
      FROM subscriptions
      WHERE status = 'active'
        AND created_at >= now() - INTERVAL \${timeRange}
      GROUP BY plan_type, billing_frequency
      ORDER BY revenue DESC
    \`;

    const result = await this.clickhouse.query({ query });
    return result.json();
  }

  // A/B Test Analysis
  async abTestResults(testId) {
    const query = \`
      SELECT
        variant,
        count(distinct user_id) as users,
        countIf(event_name = 'conversion') as conversions,
        conversions / users * 100 as conversion_rate,
        avg(revenue) as avg_revenue
      FROM events
      WHERE ab_test_id = '\${testId}'
      GROUP BY variant
    \`;

    const result = await this.clickhouse.query({ query });
    return this.calculateStatisticalSignificance(result.json());
  }

  calculateStatisticalSignificance(results) {
    // Chi-square test for A/B testing
    const control = results.find(r => r.variant === 'control');
    const variants = results.filter(r => r.variant !== 'control');

    return variants.map(variant => {
      const chiSquare = this.chiSquareTest(
        control.conversions,
        control.users,
        variant.conversions,
        variant.users
      );

      return {
        ...variant,
        p_value: chiSquare.pValue,
        is_significant: chiSquare.pValue < 0.05,
        uplift: ((variant.conversion_rate - control.conversion_rate) / 
                 control.conversion_rate * 100).toFixed(2)
      };
    });
  }
}

// Backend API
const express = require('express');
const app = express();

const analytics = new AnalyticsPlatform();

// Track event endpoint
app.post('/api/track', async (req, res) => {
  try {
    const { userId, event, properties } = req.body;
    await analytics.trackEvent(userId, event, properties);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard metrics
app.get('/api/metrics/dashboard', async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    const [mrr, churnRate, activeUsers, conversionRate] = await Promise.all([
      analytics.calculateMRR(timeRange),
      analytics.calculateChurnRate(timeRange),
      analytics.getActiveUsers(timeRange),
      analytics.getConversionRate(timeRange)
    ]);

    res.json({
      mrr,
      churnRate,
      activeUsers,
      conversionRate,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Frontend Dashboard
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const AnalyticsDashboard = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetch('/api/metrics/dashboard?timeRange=30d')
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);

  return (
    <div className="dashboard">
      <MetricCard title="MRR" value={\`$\${metrics.mrr}\`} />
      <MetricCard title="Churn Rate" value={\`\${metrics.churnRate}%\`} />
      <LineChart data={metrics.chartData}>
        <Line dataKey="revenue" stroke="#3b82f6" />
      </LineChart>
    </div>
  );
};`,
    explanation: `Comprehensive SaaS analytics platform with real-time metrics, cohort analysis, funnel tracking, and revenue insights.

## Core Implementation

**Key Features**: This demo showcases an enterprise-grade analytics platform with MRR tracking, churn analysis, cohort retention, funnel optimization, A/B testing, and feature usage analytics using ClickHouse for real-time data processing.

**Architecture**: Built with React for visualization, ClickHouse for high-performance analytics, Mixpanel/Amplitude for product analytics, and Express.js for API, handling millions of events per day.

**Performance**: Implements efficient columnar database queries, real-time aggregations, pre-computed metrics, and sub-second dashboard load times even with billions of data points.

## Technical Benefits

- **Real-time Analytics**: Process millions of events with sub-second latency
- **Cohort Analysis**: Track user behavior over time
- **Revenue Insights**: MRR, ARR, churn, and LTV calculations
- **A/B Testing**: Statistical significance testing built-in`,
    technologies: [
      {
        name: 'ClickHouse',
        description: 'Fast columnar database for analytics',
        tags: ['Database', 'Analytics', 'OLAP']
      },
      {
        name: 'Mixpanel',
        description: 'Product analytics platform',
        tags: ['Analytics', 'Product', 'SaaS']
      },
      {
        name: 'Recharts',
        description: 'Composable charting library for React',
        tags: ['Charts', 'Visualization', 'React']
      },
      {
        name: 'Amplitude',
        description: 'Behavioral analytics platform',
        tags: ['Analytics', 'Behavioral', 'SaaS']
      }
    ],
    concepts: [
      {
        name: 'Monthly Recurring Revenue (MRR)',
        description: 'Predictable revenue from subscriptions',
        example: 'Sum of all active subscription amounts per month'
      },
      {
        name: 'Cohort Analysis',
        description: 'Tracking groups of users over time',
        example: 'Users who signed up in January, tracked monthly'
      },
      {
        name: 'Churn Rate',
        description: 'Percentage of customers who cancel',
        example: 'Churned users / Total users at start of period'
      },
      {
        name: 'Funnel Analysis',
        description: 'Conversion tracking through steps',
        example: 'Signup → Trial → Payment → Active User'
      }
    ],
    features: [
      'Real-time MRR and ARR tracking',
      'Churn rate calculation and prediction',
      'Cohort retention analysis',
      'Funnel conversion tracking',
      'Feature usage analytics',
      'Revenue breakdown by plan',
      'A/B test statistical analysis',
      'User segmentation',
      'Custom event tracking',
      'Export to CSV/PDF'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-4">📊 SaaS Analytics Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Enterprise-grade analytics platform with real-time metrics, cohort analysis, and revenue insights for SaaS businesses.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💻</span>
            View Implementation
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-[1fr,320px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="space-y-6">
          {/* Time Range Selector */}
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div 
            className="grid md:grid-cols-2 gap-4"
            variants={itemVariants}
          >
            {[
              { label: 'MRR', value: formatCurrency(metrics.mrr), trend: '+12%', color: 'blue' },
              { label: 'Active Users', value: metrics.activeUsers.toLocaleString(), trend: '+8%', color: 'green' },
              { label: 'Churn Rate', value: `${metrics.churnRate}%`, trend: '-0.5%', color: 'red' },
              { label: 'Conversion', value: `${metrics.conversionRate}%`, trend: '+2.1%', color: 'purple' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className={`text-3xl font-bold text-${metric.color}-400`}>
                    {metric.value}
                  </span>
                  <span className={`text-sm ${
                    metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Revenue Chart */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Revenue Trend</h2>
            
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((data, index) => (
                <motion.div
                  key={data.date}
                  className="flex-1 bg-blue-600 rounded-t"
                  style={{ 
                    height: `${(data.revenue / 25000) * 100}%`,
                    minHeight: '20px'
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.revenue / 25000) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ opacity: 0.8 }}
                />
              ))}
            </div>
            
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              {chartData.map(data => (
                <span key={data.date}>{data.date.slice(5)}</span>
              ))}
            </div>
          </motion.div>

          {/* Feature Usage */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Feature Usage</h2>
            
            <div className="space-y-3">
              {topFeatures.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{feature.usage}%</span>
                      <span className={`text-xs ${
                        feature.trend === 'up' ? 'text-green-400' :
                        feature.trend === 'down' ? 'text-red-400' :
                        'text-gray-400'
                      }`}>
                        {feature.trend === 'up' ? '↑' : feature.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${feature.usage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">⚡ Quick Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">LTV:</span>
                <span className="font-semibold">$2,840</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CAC:</span>
                <span className="font-semibold">$420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">LTV:CAC:</span>
                <span className="text-green-400 font-semibold">6.8x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ARR:</span>
                <span className="font-semibold">{formatCurrency(metrics.mrr * 12)}</span>
              </div>
            </div>
          </motion.div>

          {/* Top Plans */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">💎 Top Plans</h3>
            <div className="space-y-3">
              {[
                { name: 'Pro', percentage: 45 },
                { name: 'Business', percentage: 32 },
                { name: 'Enterprise', percentage: 15 },
                { name: 'Starter', percentage: 8 }
              ].map((plan, index) => (
                <div key={plan.name} className="flex justify-between items-center">
                  <span className="text-sm">{plan.name}</span>
                  <span className="text-sm font-semibold">{plan.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Cohort Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Revenue Tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>A/B Testing</span>
              </li>
            </ul>
          </motion.div>
      </div>
      </motion.div>

      {/* CodeViewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default SaaSAnalyticsDemo;
