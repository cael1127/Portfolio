import React, { useState, useEffect } from 'react';

const PerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState({
    pageLoadTimes: [],
    userInteractions: [],
    errors: [],
    resources: [],
    optimization: {
      score: 0,
      suggestions: [],
      criticalIssues: []
    }
  });

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    currentUsers: 0,
    activeSessions: 0,
    averageResponseTime: 0,
    errorRate: 0
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);

  useEffect(() => {
    // Initialize performance data
    setPerformanceData({
      pageLoadTimes: [
        { page: 'Home', loadTime: 1.2, timestamp: '2 minutes ago' },
        { page: 'Blockchain Demo', loadTime: 2.8, timestamp: '5 minutes ago' },
        { page: 'Healthcare Demo', loadTime: 1.8, timestamp: '8 minutes ago' },
        { page: 'Analytics Dashboard', loadTime: 3.2, timestamp: '12 minutes ago' },
        { page: 'Resume Builder', loadTime: 2.1, timestamp: '15 minutes ago' }
      ],
      userInteractions: [
        { type: 'Click', element: 'Demo Button', count: 156, timestamp: 'Just now' },
        { type: 'Scroll', element: 'Page Content', count: 89, timestamp: '1 minute ago' },
        { type: 'Hover', element: 'Navigation', count: 234, timestamp: '2 minutes ago' },
        { type: 'Form Input', element: 'Contact Form', count: 12, timestamp: '5 minutes ago' },
        { type: 'Download', element: 'Resume PDF', count: 8, timestamp: '10 minutes ago' }
      ],
      errors: [
        { type: 'JavaScript Error', message: 'Cannot read property of undefined', count: 3, severity: 'medium' },
        { type: 'Network Error', message: 'Failed to fetch API data', count: 1, severity: 'low' },
        { type: 'Console Warning', message: 'Deprecated API usage', count: 5, severity: 'low' }
      ],
      resources: [
        { name: 'main.js', size: '245KB', type: 'JavaScript', loadTime: 0.8 },
        { name: 'styles.css', size: '156KB', type: 'CSS', loadTime: 0.5 },
        { name: 'images/hero.jpg', size: '2.1MB', type: 'Image', loadTime: 1.2 },
        { name: 'api/data.json', size: '45KB', type: 'API', loadTime: 0.3 }
      ],
      optimization: {
        score: 87,
        suggestions: [
          'Optimize image sizes for faster loading',
          'Implement lazy loading for non-critical resources',
          'Minimize JavaScript bundle size',
          'Enable gzip compression',
          'Use CDN for static assets'
        ],
        criticalIssues: [
          'Large hero image (2.1MB) affecting load time',
          'Unused CSS rules detected',
          'Missing alt attributes on images'
        ]
      }
    });

    setRealTimeMetrics({
      currentUsers: 23,
      activeSessions: 8,
      averageResponseTime: 1.8,
      errorRate: 0.2
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        currentUsers: prev.currentUsers + Math.floor(Math.random() * 3) - 1,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 2) - 1,
        averageResponseTime: prev.averageResponseTime + (Math.random() - 0.5) * 0.2,
        errorRate: prev.errorRate + (Math.random() - 0.5) * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-[var(--accent)]';
      case 'high': return 'text-[var(--accent)]';
      case 'medium': return 'text-[var(--accent)]';
      case 'low': return 'text-[var(--accent)]';
      default: return 'text-[var(--muted)]';
    }
  };

  const getPerformanceColor = (loadTime) => {
    if (loadTime < 1) return 'text-[var(--accent)]';
    if (loadTime < 2) return 'text-[var(--accent)]';
    return 'text-[var(--accent)]';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-2">⚡ Performance Monitor</h1>
          <p className="text-[var(--muted)]">Real-time performance tracking and optimization insights</p>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['1h', '24h', '7d', '30d'].map(timeframe => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-[var(--accent)] text-[var(--text)]'
                    : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Current Users</p>
                <p className="text-3xl font-bold text-[var(--text)]">{realTimeMetrics.currentUsers}</p>
                <p className="text-[var(--accent)] text-sm">+2 from last hour</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Active Sessions</p>
                <p className="text-3xl font-bold text-[var(--text)]">{realTimeMetrics.activeSessions}</p>
                <p className="text-[var(--accent)] text-sm">+1 from last hour</p>
              </div>
              <div className="text-4xl">💻</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Avg Response Time</p>
                <p className="text-3xl font-bold text-[var(--text)]">{realTimeMetrics.averageResponseTime.toFixed(1)}s</p>
                <p className="text-[var(--accent)] text-sm">-0.2s from last hour</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-red-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Error Rate</p>
                <p className="text-3xl font-bold text-[var(--text)]">{realTimeMetrics.errorRate.toFixed(1)}%</p>
                <p className="text-[var(--accent)] text-sm">-0.1% from last hour</p>
              </div>
              <div className="text-4xl">⚠️</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Page Load Times */}
          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📊 Page Load Times</h2>
            <div className="space-y-4">
              {performanceData.pageLoadTimes.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[var(--text)]">{page.page}</h3>
                    <p className="text-[var(--muted)] text-sm">{page.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${getPerformanceColor(page.loadTime)}`}>
                      {page.loadTime}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Interactions */}
          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🖱️ User Interactions</h2>
            <div className="space-y-4">
              {performanceData.userInteractions.map((interaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[var(--text)]">{interaction.type}</h3>
                    <p className="text-[var(--muted)] text-sm">{interaction.element}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[var(--accent)]">{interaction.count}</span>
                    <p className="text-[var(--muted)] text-xs">{interaction.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Errors */}
          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🚨 Errors & Warnings</h2>
            <div className="space-y-4">
              {performanceData.errors.map((error, index) => (
                <div key={index} className="p-3 bg-[var(--surface)] rounded-lg border-l-4 border-[var(--accent)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--text)]">{error.type}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(error.severity)}`}>
                      {error.severity}
                    </span>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-2">{error.message}</p>
                  <p className="text-[var(--muted)] text-xs">Occurrences: {error.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Loading */}
          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📦 Resource Loading</h2>
            <div className="space-y-4">
              {performanceData.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                  <div>
                    <h3 className="font-semibold text-[var(--text)]">{resource.name}</h3>
                    <p className="text-[var(--muted)] text-sm">{resource.type} • {resource.size}</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-semibold ${getPerformanceColor(resource.loadTime)}`}>
                      {resource.loadTime}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optimization Score */}
        <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--text)]">🎯 Performance Score</h2>
            <div className="text-right">
              <span className="text-4xl font-bold text-[var(--text)]">{performanceData.optimization.score}/100</span>
              <p className="text-[var(--accent)] text-sm">Optimization Score</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">💡 Optimization Suggestions</h3>
              <ul className="space-y-2">
                {performanceData.optimization.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-[var(--text)] text-sm flex items-start">
                    <span className="mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">⚠️ Critical Issues</h3>
              <ul className="space-y-2">
                {performanceData.optimization.criticalIssues.map((issue, index) => (
                  <li key={index} className="text-[var(--text)] text-sm flex items-start">
                    <span className="mr-2">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => setShowOptimizationModal(true)}
            className="mt-6 w-full p-3 bg-[var(--accent)] text-[var(--text)] rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
          >
            🔧 Run Performance Audit
          </button>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🔧 Advanced Performance Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Real-time Monitoring</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Live performance metrics</li>
                <li>• User behavior tracking</li>
                <li>• Error monitoring</li>
                <li>• Resource loading analysis</li>
                <li>• Response time tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Optimization Tools</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Performance scoring</li>
                <li>• Optimization suggestions</li>
                <li>• Critical issue detection</li>
                <li>• Resource optimization</li>
                <li>• Load time analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Analytics & Insights</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• User interaction patterns</li>
                <li>• Performance trends</li>
                <li>• Error rate analysis</li>
                <li>• Resource usage tracking</li>
                <li>• Optimization recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Optimization Modal */}
        {showOptimizationModal && (
          <div className="fixed inset-0 bg-[var(--bg)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[var(--surface)] p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-[var(--text)] mb-4">🔧 Performance Audit</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--surface-2)] rounded-lg">
                  <h4 className="font-semibold text-[var(--text)] mb-2">Audit Results</h4>
                  <div className="space-y-2 text-sm text-[var(--text)]">
                    <p>✅ Image optimization: 15% improvement</p>
                    <p>✅ JavaScript minification: 8% improvement</p>
                    <p>⚠️ CSS optimization needed</p>
                    <p>❌ Critical: Large hero image detected</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 p-3 bg-[var(--accent)] text-[var(--text)] rounded-lg hover:bg-[var(--accent-deep)] transition-colors">
                    Apply Fixes
                  </button>
                  <button
                    onClick={() => setShowOptimizationModal(false)}
                    className="flex-1 p-3 bg-[var(--border-strong)] text-[var(--text)] rounded-lg hover:bg-[var(--surface-2)] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor; 