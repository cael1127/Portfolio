import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const AdvancedAnalytics = ({ isEmbedded = false }) => {
  const [analyticsData, setAnalyticsData] = useState({
    users: [],
    predictions: [],
    trends: [],
    anomalies: []
  });
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('30d');
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time analytics data
  useEffect(() => {
    const generateUserData = () => {
      const users = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `findleytechs@gmail.com`,
        lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        sessionDuration: Math.floor(Math.random() * 180) + 30,
        pageViews: Math.floor(Math.random() * 50) + 5,
        conversionRate: Math.random() * 0.15 + 0.02,
        revenue: Math.floor(Math.random() * 500) + 50,
        churnRisk: Math.random() * 0.3,
        segment: ['High Value', 'Medium Value', 'Low Value', 'At Risk'][Math.floor(Math.random() * 4)]
      }));
      return users;
    };

    const generatePredictions = () => {
      const predictions = [
        { metric: 'Revenue', current: 125000, predicted: 142000, confidence: 0.89, trend: 'up' },
        { metric: 'User Growth', current: 1250, predicted: 1380, confidence: 0.92, trend: 'up' },
        { metric: 'Churn Rate', current: 0.08, predicted: 0.06, confidence: 0.85, trend: 'down' },
        { metric: 'Conversion Rate', current: 0.12, predicted: 0.15, confidence: 0.78, trend: 'up' },
        { metric: 'Customer Lifetime Value', current: 850, predicted: 920, confidence: 0.91, trend: 'up' }
      ];
      return predictions;
    };

    const generateTrends = () => {
      const trends = [
        { name: 'Mobile Usage', value: 68, change: 12, direction: 'up' },
        { name: 'Social Referrals', value: 23, change: -5, direction: 'down' },
        { name: 'Direct Traffic', value: 45, change: 8, direction: 'up' },
        { name: 'Email Campaigns', value: 34, change: 15, direction: 'up' },
        { name: 'Paid Search', value: 56, change: -3, direction: 'down' }
      ];
      return trends;
    };

    const generateAnomalies = () => {
      const anomalies = [
        { type: 'Spike', metric: 'Page Load Time', severity: 'High', timestamp: '2 hours ago', description: 'Unusual increase in page load time detected' },
        { type: 'Drop', metric: 'Conversion Rate', severity: 'Medium', timestamp: '4 hours ago', description: 'Significant drop in conversion rate' },
        { type: 'Pattern', metric: 'User Behavior', severity: 'Low', timestamp: '6 hours ago', description: 'New user behavior pattern detected' }
      ];
      return anomalies;
    };

    setAnalyticsData({
      users: generateUserData(),
      predictions: generatePredictions(),
      trends: generateTrends(),
      anomalies: generateAnomalies()
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        users: prev.users.map(user => ({
          ...user,
          lastActive: new Date().toISOString(),
          sessionDuration: Math.floor(Math.random() * 180) + 30,
          pageViews: Math.floor(Math.random() * 50) + 5
        }))
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const demoCode = `import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart } from 'recharts';
import { TensorFlow } from '@tensorflow/tfjs';

const AdvancedAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  
  // Machine Learning Model for Predictions
  const loadMLModel = async () => {
    const model = await TensorFlow.loadLayersModel('/models/analytics-predictor.json');
    return model;
  };
  
  // Real-time Data Processing
  const processAnalyticsData = async (rawData) => {
    const processedData = {
      users: rawData.users.map(user => ({
        ...user,
        engagementScore: calculateEngagementScore(user),
        churnProbability: predictChurn(user),
        lifetimeValue: calculateLTV(user)
      })),
      metrics: {
        totalRevenue: rawData.users.reduce((sum, user) => sum + user.revenue, 0),
        averageSessionDuration: rawData.users.reduce((sum, user) => sum + user.sessionDuration, 0) / rawData.users.length,
        conversionRate: rawData.users.filter(user => user.conversionRate > 0.05).length / rawData.users.length
      }
    };
    
    return processedData;
  };
  
  // Anomaly Detection Algorithm
  const detectAnomalies = (data) => {
    const anomalies = [];
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const std = Math.sqrt(data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length);
    
    data.forEach((value, index) => {
      const zScore = Math.abs((value - mean) / std);
      if (zScore > 2.5) {
        anomalies.push({
          index,
          value,
          severity: zScore > 3.5 ? 'High' : 'Medium',
          description: 'Statistical anomaly detected'
        });
      }
    });
    
    return anomalies;
  };
  
  // Predictive Analytics
  const generatePredictions = async (historicalData) => {
    const model = await loadMLModel();
    const predictions = [];
    
    for (let i = 0; i < 30; i++) {
      const prediction = await model.predict(historicalData.slice(-30));
      predictions.push({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        value: prediction.dataSync()[0],
        confidence: Math.random() * 0.2 + 0.8
      });
    }
    
    return predictions;
  };
  
  const containerClass = isEmbedded
    ? 'space-y-8 text-[var(--text)]'
    : 'min-h-screen bg-[var(--bg)] text-[var(--text)] p-6';

  const innerClass = isEmbedded ? 'space-y-8' : 'max-w-7xl mx-auto';

  return (
    <div className={containerClass}>
      <div className={innerClass}>
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-8">
          Advanced Analytics Dashboard
        </h1>
        
        {/* Analytics Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* User Analytics */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">User Analytics</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <p className="text-[var(--accent)] text-sm">Total Users</p>
                    <p className="text-[var(--text)] text-2xl font-bold">{analyticsData.users.length}</p>
                  </div>
                  <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <p className="text-[var(--accent)] text-sm">Active Now</p>
                    <p className="text-[var(--text)] text-2xl font-bold">{Math.floor(analyticsData.users.length * 0.3)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Predictions */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">🔮 Predictions</h2>
              <div className="space-y-3">
                {analyticsData.predictions.map((pred, index) => (
                  <div key={index} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-[var(--text)] font-semibold">{pred.metric}</p>
                      <span className={\`text-sm \${
                        pred.trend === 'up' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'
                      }\`}>
                        {pred.trend === 'up' ? '↗' : '↘'}
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-sm">
                      {pred.current} → {pred.predicted}
                    </p>
                    <p className="text-[var(--accent)] text-xs">
                      Confidence: {(pred.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Trends and Anomalies */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📈 Trends</h2>
              <div className="space-y-3">
                {analyticsData.trends.map((trend, index) => (
                  <div key={index} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <p className="text-[var(--text)] font-semibold">{trend.name}</p>
                      <span className={\`text-sm \${
                        trend.direction === 'up' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'
                      }\`}>
                        {trend.direction === 'up' ? '+' : ''}{trend.change}%
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-sm">{trend.value}%</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-red-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Anomalies</h2>
              <div className="space-y-3">
                {analyticsData.anomalies.map((anomaly, index) => (
                  <div key={index} className={\`p-4 rounded-lg \${
                    anomaly.severity === 'High' ? 'bg-[var(--accent-soft)]/50' :
                    anomaly.severity === 'Medium' ? 'bg-[var(--accent-soft)]/50' :
                    'bg-[var(--accent-soft)]/50'
                  }\`}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold">{anomaly.metric}</p>
                      <span className={\`text-xs px-2 py-1 rounded \${
                        anomaly.severity === 'High' ? 'bg-[var(--accent)]' :
                        anomaly.severity === 'Medium' ? 'bg-[var(--accent)]' :
                        'bg-[var(--accent)]'
                      }\`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <p className="text-[var(--text)] text-sm">{anomaly.description}</p>
                    <p className="text-[var(--text)] text-xs">{anomaly.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;`;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[var(--accent)] mb-2">Advanced Analytics Dashboard</h1>
              <p className="text-[var(--muted)]">Real-time data visualization and business intelligence powered by ML</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Analytics */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">User Analytics</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">Live data</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--accent)] text-sm">Total Users</p>
                  <p className="text-[var(--text)] text-2xl font-bold">{analyticsData.users.length}</p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--accent)] text-sm">Active Now</p>
                  <p className="text-[var(--text)] text-2xl font-bold">{Math.floor(analyticsData.users.length * 0.3)}</p>
                </div>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {analyticsData.users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-[var(--accent-soft)]/50 rounded-lg">
                    <div>
                      <p className="text-[var(--text)] font-semibold">{user.name}</p>
                      <p className="text-[var(--accent)] text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[var(--text)] text-sm">${user.revenue}</p>
                      <p className="text-[var(--accent)] text-xs">{user.sessionDuration}m</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Predictions */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">ML Predictions</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">AI powered</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {analyticsData.predictions.map((pred, index) => (
                  <div key={index} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold">{pred.metric}</p>
                      <span className={`text-sm ${
                        pred.trend === 'up' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'
                      }`}>
                        {pred.trend === 'up' ? '↗' : '↘'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-[var(--accent)] text-sm">
                        ${pred.current.toLocaleString()} → ${pred.predicted.toLocaleString()}
                      </p>
                      <p className="text-[var(--accent)] text-xs">
                        {(pred.confidence * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trends and Anomalies */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">Trends</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">Real-time</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {analyticsData.trends.map((trend, index) => (
                  <div key={index} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold">{trend.name}</p>
                      <span className={`text-sm ${
                        trend.direction === 'up' ? 'text-[var(--accent)]' : 'text-[var(--accent)]'
                      }`}>
                        {trend.direction === 'up' ? '+' : ''}{trend.change}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--accent-deep)] rounded-full h-2">
                      <div 
                        className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${trend.value}%` }}
                      ></div>
                    </div>
                    <p className="text-[var(--accent)] text-sm mt-2">{trend.value}%</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-red-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">Anomaly Detection</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">AI monitoring</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {analyticsData.anomalies.map((anomaly, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    anomaly.severity === 'High' ? 'bg-[var(--accent-soft)]/50' :
                    anomaly.severity === 'Medium' ? 'bg-[var(--accent-soft)]/50' :
                    'bg-[var(--accent-soft)]/50'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold">{anomaly.metric}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        anomaly.severity === 'High' ? 'bg-[var(--accent)]' :
                        anomaly.severity === 'Medium' ? 'bg-[var(--accent)]' :
                        'bg-[var(--accent)]'
                      }`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <p className="text-[var(--text)] text-sm mb-2">{anomaly.description}</p>
                    <p className="text-[var(--text)] text-xs">{anomaly.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
                      <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Machine Learning</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Predictive analytics models</li>
                <li>• Anomaly detection algorithms</li>
                <li>• Real-time data processing</li>
                <li>• Automated insights generation</li>
              </ul>
            </div>
            <div>
                              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Data Visualization</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Interactive charts and graphs</li>
                <li>• Real-time dashboards</li>
                <li>• Custom metric tracking</li>
                <li>• Export and reporting tools</li>
              </ul>
            </div>
            <div>
                              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Business Intelligence</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• KPI monitoring and alerts</li>
                <li>• Trend analysis and forecasting</li>
                <li>• User behavior analytics</li>
                <li>• Performance optimization insights</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="Advanced Analytics Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 