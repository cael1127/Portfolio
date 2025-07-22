import React, { useState } from 'react';

const AquacultureProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    sensorData: `// Sensor Data Management
class SensorManager {
  constructor() {
    this.sensors = new Map();
    this.dataHistory = new Map();
    this.alertThresholds = {
      temperature: { min: 18, max: 28 },
      oxygen: { min: 5, max: 12 },
      ph: { min: 6.5, max: 8.0 },
      ammonia: { max: 0.05 },
      nitrite: { max: 0.02 },
      nitrate: { max: 10 }
    };
  }

  addSensor(sensorId, sensorType, location) {
    this.sensors.set(sensorId, {
      id: sensorId,
      type: sensorType,
      location: location,
      status: 'active',
      lastReading: null,
      calibrationDate: new Date()
    });
  }

  updateReading(sensorId, reading) {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) return;

    sensor.lastReading = {
      value: reading.value,
      unit: reading.unit,
      timestamp: new Date(),
      quality: this.calculateQuality(reading)
    };

    // Store historical data
    if (!this.dataHistory.has(sensorId)) {
      this.dataHistory.set(sensorId, []);
    }
    this.dataHistory.get(sensorId).push(sensor.lastReading);

    // Check for alerts
    this.checkAlerts(sensorId, reading);
  }

  calculateQuality(reading) {
    const thresholds = this.alertThresholds[reading.type];
    if (!thresholds) return 'unknown';

    if (reading.value < thresholds.min || reading.value > thresholds.max) {
      return 'critical';
    } else if (reading.value < thresholds.min * 1.1 || reading.value > thresholds.max * 0.9) {
      return 'warning';
    }
    return 'good';
  }

  checkAlerts(sensorId, reading) {
    const quality = this.calculateQuality(reading);
    if (quality !== 'good') {
      this.triggerAlert(sensorId, reading, quality);
    }
  }

  triggerAlert(sensorId, reading, severity) {
    const alert = {
      id: Date.now(),
      sensorId: sensorId,
      type: reading.type,
      value: reading.value,
      severity: severity,
      timestamp: new Date(),
      message: \`\${reading.type} level is \${severity}: \${reading.value} \${reading.unit}\`
    };
    
    // Emit alert event
    this.emit('alert', alert);
  }
}`,
    
    waterQualityCalculator: `// Water Quality Calculator
class WaterQualityCalculator {
  constructor() {
    this.parameters = {
      temperature: { weight: 0.25, optimal: { min: 22, max: 26 } },
      oxygen: { weight: 0.30, optimal: { min: 7, max: 12 } },
      ph: { weight: 0.20, optimal: { min: 7.0, max: 7.5 } },
      ammonia: { weight: 0.15, optimal: { max: 0.03 } },
      nitrite: { weight: 0.10, optimal: { max: 0.01 } }
    };
  }

  calculateQuality(sensorData) {
    let totalScore = 0;
    let totalWeight = 0;

    for (const [parameter, config] of Object.entries(this.parameters)) {
      const value = sensorData[parameter];
      if (value !== undefined) {
        const score = this.calculateParameterScore(parameter, value, config);
        totalScore += score * config.weight;
        totalWeight += config.weight;
      }
    }

    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;
  }

  calculateParameterScore(parameter, value, config) {
    const optimal = config.optimal;
    
    if (optimal.max !== undefined && optimal.min !== undefined) {
      // Range-based parameter (temperature, oxygen, ph)
      if (value >= optimal.min && value <= optimal.max) {
        return 1.0; // Perfect score
      } else if (value >= optimal.min * 0.8 && value <= optimal.max * 1.2) {
        return 0.7; // Acceptable score
      } else {
        return 0.3; // Poor score
      }
    } else if (optimal.max !== undefined) {
      // Maximum threshold parameter (ammonia, nitrite)
      if (value <= optimal.max) {
        return 1.0; // Perfect score
      } else if (value <= optimal.max * 2) {
        return 0.5; // Acceptable score
      } else {
        return 0.1; // Poor score
      }
    }
    
    return 0.5; // Default score
  }

  getRecommendations(sensorData) {
    const recommendations = [];
    
    if (sensorData.temperature > 28) {
      recommendations.push({
        priority: 'high',
        action: 'Reduce water temperature',
        reason: 'High temperature can stress fish and reduce oxygen levels'
      });
    }
    
    if (sensorData.oxygen < 5) {
      recommendations.push({
        priority: 'critical',
        action: 'Increase aeration immediately',
        reason: 'Low oxygen levels can cause fish mortality'
      });
    }
    
    if (sensorData.ph < 6.5) {
      recommendations.push({
        priority: 'high',
        action: 'Adjust pH levels',
        reason: 'Low pH can affect fish health and feed efficiency'
      });
    }
    
    if (sensorData.ammonia > 0.05) {
      recommendations.push({
        priority: 'high',
        action: 'Perform water change',
        reason: 'High ammonia levels are toxic to fish'
      });
    }
    
    return recommendations;
  }
}`,
    
    predictiveAnalytics: `// Predictive Analytics Engine
class PredictiveAnalytics {
  constructor() {
    this.models = {
      growthRate: new GrowthRateModel(),
      mortalityRate: new MortalityRateModel(),
      feedEfficiency: new FeedEfficiencyModel(),
      harvestPrediction: new HarvestPredictionModel()
    };
  }

  async predictGrowthRate(sensorData, historicalData) {
    const features = this.extractFeatures(sensorData, historicalData);
    return await this.models.growthRate.predict(features);
  }

  async predictMortalityRate(sensorData, historicalData) {
    const features = this.extractFeatures(sensorData, historicalData);
    return await this.models.mortalityRate.predict(features);
  }

  async predictFeedEfficiency(sensorData, historicalData) {
    const features = this.extractFeatures(sensorData, historicalData);
    return await this.models.feedEfficiency.predict(features);
  }

  async predictHarvestDate(sensorData, historicalData, stockingDate) {
    const features = this.extractFeatures(sensorData, historicalData);
    const growthRate = await this.predictGrowthRate(sensorData, historicalData);
    return await this.models.harvestPrediction.predict(features, growthRate, stockingDate);
  }

  extractFeatures(sensorData, historicalData) {
    return {
      avgTemperature: this.calculateAverage(historicalData, 'temperature'),
      avgOxygen: this.calculateAverage(historicalData, 'oxygen'),
      avgPH: this.calculateAverage(historicalData, 'ph'),
      temperatureVariance: this.calculateVariance(historicalData, 'temperature'),
      oxygenVariance: this.calculateVariance(historicalData, 'oxygen'),
      currentTemperature: sensorData.temperature,
      currentOxygen: sensorData.oxygen,
      currentPH: sensorData.ph,
      ammoniaLevel: sensorData.ammonia,
      nitriteLevel: sensorData.nitrite,
      nitrateLevel: sensorData.nitrate,
      waterQuality: this.calculateWaterQuality(sensorData)
    };
  }

  calculateAverage(data, parameter) {
    const values = data.map(d => d[parameter]).filter(v => v !== undefined);
    return values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  calculateVariance(data, parameter) {
    const values = data.map(d => d[parameter]).filter(v => v !== undefined);
    if (values.length === 0) return 0;
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  calculateWaterQuality(sensorData) {
    // Implementation of water quality calculation
    return 85; // Placeholder
  }
}

// Machine Learning Models
class GrowthRateModel {
  async predict(features) {
    // Simplified ML model for growth rate prediction
    let growthRate = 0.15; // Base growth rate
    
    // Temperature factor
    if (features.currentTemperature >= 22 && features.currentTemperature <= 26) {
      growthRate += 0.05;
    }
    
    // Oxygen factor
    if (features.currentOxygen >= 7) {
      growthRate += 0.03;
    }
    
    // Water quality factor
    if (features.waterQuality >= 80) {
      growthRate += 0.02;
    }
    
    return Math.min(0.25, Math.max(0.05, growthRate));
  }
}

class MortalityRateModel {
  async predict(features) {
    let mortalityRate = 0.02; // Base mortality rate
    
    // Temperature stress
    if (features.currentTemperature > 28) {
      mortalityRate += 0.05;
    }
    
    // Oxygen stress
    if (features.currentOxygen < 5) {
      mortalityRate += 0.08;
    }
    
    // Water quality stress
    if (features.waterQuality < 60) {
      mortalityRate += 0.03;
    }
    
    return Math.min(0.25, Math.max(0.01, mortalityRate));
  }
}`,
    
    realTimeMonitoring: `// Real-time Monitoring System
class RealTimeMonitoring {
  constructor() {
    this.connections = new Map();
    this.dataStreams = new Map();
    this.alertHandlers = new Map();
    this.analytics = new PredictiveAnalytics();
  }

  async startMonitoring(tankId) {
    const connection = await this.establishConnection(tankId);
    this.connections.set(tankId, connection);
    
    // Start data collection
    this.startDataCollection(tankId);
    
    // Start analytics processing
    this.startAnalyticsProcessing(tankId);
    
    // Start alert monitoring
    this.startAlertMonitoring(tankId);
  }

  async establishConnection(tankId) {
    // Simulate IoT sensor connection
    return {
      id: tankId,
      status: 'connected',
      lastHeartbeat: new Date(),
      sensors: ['temperature', 'oxygen', 'ph', 'ammonia', 'nitrite', 'nitrate']
    };
  }

  startDataCollection(tankId) {
    const interval = setInterval(async () => {
      try {
        const sensorData = await this.collectSensorData(tankId);
        this.processSensorData(tankId, sensorData);
      } catch (error) {
        console.error('Data collection error:', error);
        this.handleConnectionError(tankId);
      }
    }, 5000); // Collect data every 5 seconds

    this.dataStreams.set(tankId, interval);
  }

  async collectSensorData(tankId) {
    // Simulate sensor data collection
    return {
      temperature: 22.5 + (Math.random() - 0.5) * 4,
      oxygen: 8.2 + (Math.random() - 0.5) * 2,
      ph: 7.4 + (Math.random() - 0.5) * 0.6,
      ammonia: 0.02 + Math.random() * 0.08,
      nitrite: 0.01 + Math.random() * 0.04,
      nitrate: 5.2 + Math.random() * 10,
      timestamp: new Date()
    };
  }

  async processSensorData(tankId, sensorData) {
    // Store data
    await this.storeSensorData(tankId, sensorData);
    
    // Calculate water quality
    const waterQuality = this.calculateWaterQuality(sensorData);
    
    // Update dashboard
    this.updateDashboard(tankId, { ...sensorData, waterQuality });
    
    // Run analytics
    await this.runAnalytics(tankId, sensorData);
    
    // Check alerts
    this.checkAlerts(tankId, sensorData, waterQuality);
  }

  async runAnalytics(tankId, sensorData) {
    try {
      const historicalData = await this.getHistoricalData(tankId);
      
      const predictions = {
        growthRate: await this.analytics.predictGrowthRate(sensorData, historicalData),
        mortalityRate: await this.analytics.predictMortalityRate(sensorData, historicalData),
        feedEfficiency: await this.analytics.predictFeedEfficiency(sensorData, historicalData),
        harvestDate: await this.analytics.predictHarvestDate(sensorData, historicalData, new Date())
      };
      
      this.updateAnalytics(tankId, predictions);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  checkAlerts(tankId, sensorData, waterQuality) {
    const alerts = [];
    
    if (sensorData.temperature > 28) {
      alerts.push({
        type: 'temperature',
        severity: 'high',
        message: 'High temperature detected',
        value: sensorData.temperature
      });
    }
    
    if (sensorData.oxygen < 5) {
      alerts.push({
        type: 'oxygen',
        severity: 'critical',
        message: 'Low oxygen levels',
        value: sensorData.oxygen
      });
    }
    
    if (waterQuality < 60) {
      alerts.push({
        type: 'water_quality',
        severity: 'high',
        message: 'Poor water quality',
        value: waterQuality
      });
    }
    
    if (alerts.length > 0) {
      this.triggerAlerts(tankId, alerts);
    }
  }

  triggerAlerts(tankId, alerts) {
    alerts.forEach(alert => {
      // Send notification
      this.sendNotification(tankId, alert);
      
      // Log alert
      this.logAlert(tankId, alert);
      
      // Update dashboard
      this.updateAlertStatus(tankId, alert);
    });
  }

  calculateWaterQuality(sensorData) {
    let score = 100;
    
    // Temperature factor
    if (sensorData.temperature > 28 || sensorData.temperature < 18) {
      score -= 20;
    }
    
    // Oxygen factor
    if (sensorData.oxygen < 6) {
      score -= 25;
    }
    
    // pH factor
    if (sensorData.ph < 6.5 || sensorData.ph > 8.0) {
      score -= 15;
    }
    
    // Ammonia factor
    if (sensorData.ammonia > 0.05) {
      score -= 20;
    }
    
    // Nitrite factor
    if (sensorData.nitrite > 0.02) {
      score -= 10;
    }
    
    return Math.max(0, score);
  }
}`,
    
    dashboardComponent: `// React Dashboard Component
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AquacultureDashboard = () => {
  const [tanks, setTanks] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [analytics, setAnalytics] = useState({});
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initialize real-time monitoring
    const monitoring = new RealTimeMonitoring();
    
    // Start monitoring all tanks
    const tankIds = ['tank-1', 'tank-2', 'tank-3'];
    tankIds.forEach(tankId => {
      monitoring.startMonitoring(tankId);
    });

    // Set up event listeners
    monitoring.on('dataUpdate', (tankId, data) => {
      setTanks(prev => prev.map(tank => 
        tank.id === tankId ? { ...tank, ...data } : tank
      ));
    });

    monitoring.on('alert', (tankId, alert) => {
      setAlerts(prev => [...prev, { tankId, ...alert }]);
    });

    monitoring.on('analytics', (tankId, analytics) => {
      setAnalytics(prev => ({ ...prev, [tankId]: analytics }));
    });

    return () => {
      // Cleanup monitoring
      tankIds.forEach(tankId => {
        monitoring.stopMonitoring(tankId);
      });
    };
  }, []);

  const TankCard = ({ tank }) => (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{tank.name}</h3>
          <p className="text-gray-400 text-sm">{tank.status}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-400">
            {tank.waterQuality}%
          </div>
          <div className="text-xs text-gray-400">Water Quality</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Temperature</p>
          <p className="text-white font-semibold">{tank.temperature?.toFixed(1)}°C</p>
        </div>
        <div>
          <p className="text-gray-400">Oxygen</p>
          <p className="text-white">{tank.oxygen?.toFixed(1)} mg/L</p>
        </div>
        <div>
          <p className="text-gray-400">pH</p>
          <p className="text-white">{tank.ph?.toFixed(1)}</p>
        </div>
        <div>
          <p className="text-gray-400">Ammonia</p>
          <p className="text-white">{tank.ammonia?.toFixed(3)} mg/L</p>
        </div>
      </div>
      
      {analytics[tank.id] && (
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-400">Growth Rate</p>
              <p className="text-green-400">{(analytics[tank.id].growthRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Mortality</p>
              <p className="text-red-400">{(analytics[tank.id].mortalityRate * 100).toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-400">Feed Efficiency</p>
              <p className="text-blue-400">{(analytics[tank.id].feedEfficiency * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Aquaculture Monitoring Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tanks.map(tank => (
            <TankCard key={tank.id} tank={tank} />
          ))}
        </div>
        
        {alerts.length > 0 && (
          <div className="mt-8 bg-red-900 p-6 rounded-lg border border-red-600">
            <h2 className="text-xl font-bold text-white mb-4">Active Alerts</h2>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="bg-red-800 p-3 rounded border border-red-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">{alert.message}</p>
                      <p className="text-red-200 text-sm">Tank: {alert.tankId}</p>
                    </div>
                    <div className="text-red-300 text-sm">{alert.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AquacultureDashboard;`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🌊 Smart Aquaculture Monitoring System</h1>
          <p className="text-gray-300 text-lg">
            AI-powered aquaculture monitoring with real-time sensor data, predictive analytics, and automated insights
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Smart Aquaculture Monitoring System is a comprehensive IoT solution designed for modern fish farming operations. 
                  It combines real-time sensor monitoring, AI-powered predictive analytics, and automated alert systems to optimize 
                  aquaculture production and ensure fish health.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time water quality monitoring</li>
                    <li>• Predictive analytics for growth optimization</li>
                    <li>• Automated alert system for critical conditions</li>
                    <li>• Data-driven decision making</li>
                    <li>• Remote monitoring capabilities</li>
                    <li>• Cost optimization through efficiency</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for frontend dashboard</li>
                    <li>• Node.js for backend API</li>
                    <li>• IoT sensors for data collection</li>
                    <li>• Machine learning for predictions</li>
                    <li>• WebSocket for real-time updates</li>
                    <li>• MongoDB for data storage</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Real-World Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Commercial Fish Farms</h4>
                    <p className="text-gray-300 text-sm">Large-scale aquaculture operations with multiple tanks and automated systems</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Research Facilities</h4>
                    <p className="text-gray-300 text-sm">Scientific research with precise environmental control and data collection</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">Hatcheries</h4>
                    <p className="text-gray-300 text-sm">Specialized facilities for breeding and early-stage fish development</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📡 IoT Sensor Network</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Multi-parameter water quality sensors</li>
                    <li>• Real-time data collection</li>
                    <li>• Wireless sensor communication</li>
                    <li>• Sensor calibration management</li>
                    <li>• Fault detection and diagnostics</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">🤖 AI Analytics</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Growth rate prediction</li>
                    <li>• Mortality risk assessment</li>
                    <li>• Feed efficiency optimization</li>
                    <li>• Harvest timing prediction</li>
                    <li>• Water quality forecasting</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">📊 Real-time Dashboard</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Live sensor data visualization</li>
                    <li>• Historical trend analysis</li>
                    <li>• Performance metrics tracking</li>
                    <li>• Mobile-responsive design</li>
                    <li>• Customizable alerts</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">🚨 Alert System</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Automated critical condition alerts</li>
                    <li>• Multi-channel notifications</li>
                    <li>• Escalation protocols</li>
                    <li>• Alert history tracking</li>
                    <li>• Custom threshold settings</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-red-400 mb-3">🔒 Security & Compliance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Security</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Encrypted data transmission</li>
                      <li>• Secure API endpoints</li>
                      <li>• User authentication</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Compliance</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Industry standards compliance</li>
                      <li>• Data retention policies</li>
                      <li>• Audit trail logging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Reliability</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• 99.9% uptime guarantee</li>
                      <li>• Backup and recovery</li>
                      <li>• Disaster recovery plans</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Sensor Data Management</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.sensorData}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Water Quality Calculator</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.waterQualityCalculator}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Predictive Analytics</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.predictiveAnalytics}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Real-time Monitoring</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.realTimeMonitoring}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-3">React Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js dashboard components</li>
                      <li>• Real-time data visualization</li>
                      <li>• Interactive charts and graphs</li>
                      <li>• Mobile-responsive design</li>
                      <li>• WebSocket connections</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Backend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Node.js API server</li>
                      <li>• Real-time data processing</li>
                      <li>• Machine learning models</li>
                      <li>• Alert management system</li>
                      <li>• Data persistence layer</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">IoT Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Sensor Network</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Temperature sensors</li>
                      <li>• Dissolved oxygen probes</li>
                      <li>• pH level sensors</li>
                      <li>• Ammonia detectors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Communication</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Wireless sensor networks</li>
                      <li>• LoRaWAN connectivity</li>
                      <li>• Cellular backup</li>
                      <li>• Local gateway devices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Processing</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Edge computing</li>
                      <li>• Data validation</li>
                      <li>• Calibration management</li>
                      <li>• Fault detection</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">Sensor Data Collection</p>
                      <p className="text-gray-300 text-sm">IoT sensors continuously monitor water parameters</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Data Processing</p>
                      <p className="text-gray-300 text-sm">Raw data is validated, calibrated, and processed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">Analytics & Predictions</p>
                      <p className="text-gray-300 text-sm">ML models analyze data and generate predictions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">4</div>
                    <div>
                      <p className="text-white font-semibold">Dashboard Updates</p>
                      <p className="text-gray-300 text-sm">Real-time updates are pushed to the dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the aquaculture monitoring system in action. The demo showcases real-time sensor data, 
                predictive analytics, and automated alert systems for optimal fish farming operations.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Aquaculture Demo</h3>
                  <button
                    onClick={() => setCurrentPage('aquaculture')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full aquaculture monitoring system with real-time sensor data, 
                  predictive analytics, and comprehensive water quality management.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-blue-400 mb-2">Real-time Monitoring</h4>
                  <p className="text-gray-300 text-sm">Watch live sensor data updates with water quality parameters</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-purple-400 mb-2">Predictive Analytics</h4>
                  <p className="text-gray-300 text-sm">See AI-powered growth and mortality predictions</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-green-400 mb-2">Alert System</h4>
                  <p className="text-gray-300 text-sm">Experience automated alerts for critical conditions</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AquacultureProjectPage; 