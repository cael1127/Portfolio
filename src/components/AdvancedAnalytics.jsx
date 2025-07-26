import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const AdvancedAnalytics = () => {
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
    // Data preprocessing and feature engineering
    const processedData = await preprocessData(rawData);
    
    // Anomaly detection using isolation forest
    const anomalies = await detectAnomalies(processedData);
    
    // Time series forecasting
    const predictions = await forecastMetrics(processedData);
    
    return { processedData, anomalies, predictions };
  };
  
  // Advanced Statistical Analysis
  const performStatisticalAnalysis = (data) => {
    const analysis = {
      correlation: calculateCorrelation(data),
      regression: performLinearRegression(data),
      clustering: performKMeansClustering(data),
      timeSeries: performTimeSeriesAnalysis(data)
    };
    
    return analysis;
  };
  
  // Real-time Dashboard Updates
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/analytics/real-time');
      const data = await response.json();
      
      const processed = await processAnalyticsData(data);
      setAnalyticsData(processed);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // WebSocket for Real-time Updates
  useEffect(() => {
    const ws = new WebSocket('wss://analytics-server.com/real-time');
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setAnalyticsData(prev => ({
        ...prev,
        [update.type]: update.data
      }));
    };
    
    return () => ws.close();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-8">
          📊 Advanced Analytics Dashboard
        </h1>
        
        {/* Real-time metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold">1,247</p>
            <p className="text-blue-300 text-sm">+12% from yesterday</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold">$125K</p>
            <p className="text-green-300 text-sm">+8% from yesterday</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold">12.5%</p>
            <p className="text-purple-300 text-sm">+2.1% from yesterday</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-900 to-red-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Churn Rate</h3>
            <p className="text-3xl font-bold">2.3%</p>
            <p className="text-red-300 text-sm">-0.5% from yesterday</p>
          </div>
        </div>
        
        {/* Machine Learning Predictions */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">🤖 ML Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map(prediction => (
              <div key={prediction.metric} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{prediction.metric}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${prediction.predicted.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">Predicted</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Confidence</p>
                    <p className="text-lg font-semibold">{(prediction.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Anomaly Detection */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">🚨 Anomaly Detection</h2>
          <div className="space-y-4">
            {anomalies.map((anomaly, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{anomaly.metric}</h3>
                    <p className="text-gray-400 text-sm">{anomaly.description}</p>
                  </div>
                  <div className="text-right">
                    <span className={\`px-2 py-1 rounded text-xs \${anomaly.severity === 'High' ? 'bg-red-600' : anomaly.severity === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'}\`}>
                      {anomaly.severity}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">{anomaly.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-purple-400 mb-2">📊 Advanced Analytics Dashboard</h1>
              <p className="text-gray-400">Machine learning predictions, real-time insights, and enterprise-level analytics</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Users</p>
                <p className="text-3xl font-bold text-white">1,247</p>
                <p className="text-blue-400 text-sm">+12% from yesterday</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-white">$125K</p>
                <p className="text-green-400 text-sm">+8% from yesterday</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Conversion Rate</p>
                <p className="text-3xl font-bold text-white">12.5%</p>
                <p className="text-purple-400 text-sm">+2.1% from yesterday</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Churn Rate</p>
                <p className="text-3xl font-bold text-white">2.3%</p>
                <p className="text-red-400 text-sm">-0.5% from yesterday</p>
              </div>
              <div className="text-4xl">📉</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ML Predictions */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">🤖 Machine Learning Predictions</h2>
            <div className="space-y-4">
              {analyticsData.predictions?.map((prediction, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{prediction.metric}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      prediction.trend === 'up' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {prediction.trend === 'up' ? '↗️' : '↘️'} {prediction.trend}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Current</p>
                      <p className="text-xl font-bold text-white">
                        {typeof prediction.current === 'number' && prediction.current > 1000 
                          ? `$${prediction.current.toLocaleString()}` 
                          : prediction.current}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Predicted</p>
                      <p className="text-xl font-bold text-green-400">
                        {typeof prediction.predicted === 'number' && prediction.predicted > 1000 
                          ? `$${prediction.predicted.toLocaleString()}` 
                          : prediction.predicted}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Confidence</span>
                      <span className="text-white font-semibold">{(prediction.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Analytics */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">👥 User Analytics</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {analyticsData.users?.slice(0, 10).map(user => (
                <div key={user.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-gray-400 text-sm">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-semibold">${user.revenue}</p>
                      <p className="text-gray-400 text-xs">{user.segment}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-400">Session</p>
                      <p className="text-white">{user.sessionDuration}m</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Views</p>
                      <p className="text-white">{user.pageViews}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Churn Risk</p>
                      <p className={`font-semibold ${
                        user.churnRisk > 0.2 ? 'text-red-400' : 
                        user.churnRisk > 0.1 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {(user.churnRisk * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🚨 Anomaly Detection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {analyticsData.anomalies?.map((anomaly, index) => (
              <div key={index} className="bg-red-800/50 p-4 rounded-lg border border-red-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{anomaly.metric}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    anomaly.severity === 'High' ? 'bg-red-600' : 
                    anomaly.severity === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                  }`}>
                    {anomaly.severity}
                  </span>
                </div>
                <p className="text-red-200 text-sm mb-2">{anomaly.description}</p>
                <p className="text-red-300 text-xs">{anomaly.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Analytics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">🤖 Machine Learning</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Predictive analytics</li>
                <li>• Anomaly detection</li>
                <li>• Pattern recognition</li>
                <li>• Automated insights</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">📊 Real-time Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Stream processing</li>
                <li>• Live data visualization</li>
                <li>• Instant metric updates</li>
                <li>• WebSocket integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">📈 Advanced Metrics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Cohort analysis</li>
                <li>• Funnel tracking</li>
                <li>• A/B testing results</li>
                <li>• Customer segmentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">🔍 Deep Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Behavioral analysis</li>
                <li>• Attribution modeling</li>
                <li>• Lifetime value calculation</li>
                <li>• Churn prediction</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Advanced Analytics Code</h3>
                <button
                  onClick={() => setShowCodeViewer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <CodeViewer code={demoCode} language="javascript" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalytics; 