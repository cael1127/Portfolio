import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    visitors: {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    },
    demos: {
      totalViews: 0,
      popularDemos: [],
      averageSessionTime: 0,
      conversionRate: 0
    },
    performance: {
      loadTime: 0,
      uptime: 0,
      errorRate: 0,
      optimizationScore: 0
    },
    engagement: {
      timeOnSite: 0,
      bounceRate: 0,
      pagesPerSession: 0,
      returningVisitors: 0
    }
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    // Initialize analytics data
    setAnalytics({
      visitors: {
        total: 15420,
        today: 342,
        thisWeek: 2847,
        thisMonth: 12456
      },
      demos: {
        totalViews: 45678,
        popularDemos: [
          { name: 'Blockchain Demo', views: 8923, growth: 12.5 },
          { name: 'AI Assistant Demo', views: 7845, growth: 8.7 },
          { name: 'Healthcare Demo', views: 6543, growth: 15.2 },
          { name: 'Financial Demo', views: 5432, growth: 6.8 },
          { name: 'Smart City Demo', views: 4321, growth: 9.3 }
        ],
        averageSessionTime: 4.2,
        conversionRate: 23.5
      },
      performance: {
        loadTime: 1.8,
        uptime: 99.9,
        errorRate: 0.1,
        optimizationScore: 95
      },
      engagement: {
        timeOnSite: 3.5,
        bounceRate: 28.4,
        pagesPerSession: 4.2,
        returningVisitors: 67.8
      }
    });

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => {
        const newData = {
          timestamp: new Date().toLocaleTimeString(),
          visitors: Math.floor(Math.random() * 10) + 1,
          pageViews: Math.floor(Math.random() * 20) + 5,
          activeUsers: Math.floor(Math.random() * 15) + 3
        };
        return [newData, ...prev.slice(0, 19)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getGrowthColor = (growth) => {
    return growth > 0 ? 'text-[var(--accent)]' : 'text-[var(--accent)]';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-[var(--accent)]';
    if (score >= 70) return 'text-[var(--accent)]';
    return 'text-[var(--accent)]';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-2">Analytics Dashboard</h1>
          <p className="text-[var(--muted)]">Real-time insights and performance metrics</p>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {['1d', '7d', '30d', '90d'].map(timeframe => (
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Total Visitors</p>
                <p className="text-3xl font-bold text-[var(--text)]">{analytics.visitors.total.toLocaleString()}</p>
                <p className="text-[var(--accent)] text-sm">+12.5% from last month</p>
              </div>
                              <div className="text-4xl">US</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Demo Views</p>
                <p className="text-3xl font-bold text-[var(--text)]">{analytics.demos.totalViews.toLocaleString()}</p>
                <p className="text-[var(--accent)] text-sm">+8.7% from last month</p>
              </div>
              <div className="text-4xl">🎯</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Avg Session Time</p>
                <p className="text-3xl font-bold text-[var(--text)]">{analytics.demos.averageSessionTime}m</p>
                <p className="text-[var(--accent)] text-sm">+2.1m from last month</p>
              </div>
                              <div className="text-4xl">TM</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-yellow-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--text)] text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-[var(--text)]">{analytics.demos.conversionRate}%</p>
                <p className="text-[var(--accent)] text-sm">+3.2% from last month</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Performance Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Load Time</span>
                <span className={`font-semibold ${getPerformanceColor(analytics.performance.loadTime)}`}>
                  {analytics.performance.loadTime}s
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Uptime</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.performance.uptime}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Error Rate</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.performance.errorRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Optimization Score</span>
                <span className={`font-semibold ${getPerformanceColor(analytics.performance.optimizationScore)}`}>
                  {analytics.performance.optimizationScore}/100
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Engagement Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Time on Site</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.engagement.timeOnSite}m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Bounce Rate</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.engagement.bounceRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Pages per Session</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.engagement.pagesPerSession}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[var(--text)]">Returning Visitors</span>
                <span className="font-semibold text-[var(--accent)]">{analytics.engagement.returningVisitors}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Demos */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)] mb-8">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🔥 Popular Demos</h2>
          <div className="space-y-4">
            {analytics.demos.popularDemos.map((demo, index) => (
              <div key={demo.name} className="flex items-center justify-between p-4 bg-[var(--surface)] rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{index + 1}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--text)]">{demo.name}</h3>
                    <p className="text-[var(--muted)] text-sm">{demo.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold ${getGrowthColor(demo.growth)}`}>
                    {demo.growth > 0 ? '+' : ''}{demo.growth}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)] mb-8">
                      <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Real-time Activity</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {realTimeData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--text)]">{data.timestamp}</span>
                </div>
                <div className="flex space-x-6 text-sm">
                  <span className="text-[var(--accent)]">{data.visitors} visitors</span>
                  <span className="text-[var(--accent)]">{data.pageViews} page views</span>
                  <span className="text-[var(--accent)]">{data.activeUsers} active users</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🔧 Advanced Analytics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Real-time Monitoring</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Live visitor tracking</li>
                <li>• Performance metrics</li>
                <li>• Error monitoring</li>
                <li>• User behavior analysis</li>
                <li>• Conversion tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Data Visualization</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Interactive charts</li>
                <li>• Trend analysis</li>
                <li>• Heat maps</li>
                <li>• Funnel analysis</li>
                <li>• Cohort analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Predictive Analytics</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Traffic forecasting</li>
                <li>• User behavior prediction</li>
                <li>• Performance optimization</li>
                <li>• A/B testing insights</li>
                <li>• ROI analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 