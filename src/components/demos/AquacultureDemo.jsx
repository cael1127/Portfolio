import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const AquacultureDemo = () => {
  const [tanks, setTanks] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [systemStats, setSystemStats] = useState({
    totalTanks: 0,
    activeSensors: 0,
    averageOxygen: 0,
    averageTemperature: 0,
    averagePH: 0,
    waterQuality: 0
  });
  const [predictiveAnalytics, setPredictiveAnalytics] = useState({
    oxygenTrend: [],
    temperatureTrend: [],
    phTrend: [],
    growthPrediction: [],
    harvestPrediction: []
  });
  const [aiInsights, setAiInsights] = useState([]);

  const demoCode = `/**
 * Smart Aquaculture Monitoring Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates AI-powered aquaculture monitoring
 * with real-time sensor data, predictive analytics, and automated alerts.
 */

import React, { useState, useEffect } from 'react';

const AquacultureDemo = () => {
  const [tanks, setTanks] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalTanks: 0,
    activeSensors: 0,
    averageOxygen: 0,
    averageTemperature: 0,
    averagePH: 0,
    waterQuality: 0
  });

  // Sensor data types
  const sensorTypes = {
    temperature: { unit: '°C', min: 18, max: 30, critical: 32 },
    oxygen: { unit: 'mg/L', min: 5, max: 12, critical: 3 },
    ph: { unit: '', min: 6.5, max: 8.5, critical: 6.0 },
    salinity: { unit: 'ppt', min: 30, max: 40, critical: 25 },
    waterLevel: { unit: '%', min: 70, max: 100, critical: 60 },
    ammonia: { unit: 'mg/L', min: 0, max: 0.05, critical: 0.1 },
    nitrite: { unit: 'mg/L', min: 0, max: 0.02, critical: 0.05 },
    nitrate: { unit: 'mg/L', min: 0, max: 10, critical: 20 }
  };

  // AI-powered water quality analysis
  const analyzeWaterQuality = (sensorData) => {
    const qualityScore = Object.entries(sensorData).reduce((score, [key, value]) => {
      const sensor = sensorTypes[key];
      if (!sensor) return score;
      
      const normalized = (value - sensor.min) / (sensor.max - sensor.min);
      return score + Math.max(0, Math.min(1, normalized));
    }, 0) / Object.keys(sensorData).length * 100;
    
    return Math.round(qualityScore);
  };

  // Predictive analytics for fish growth
  const predictGrowth = (sensorData, currentWeight) => {
    const waterQuality = analyzeWaterQuality(sensorData);
    const temperatureFactor = sensorData.temperature / 25; // Optimal temp
    const oxygenFactor = sensorData.oxygen / 8; // Optimal oxygen
    
    const growthRate = (waterQuality / 100) * temperatureFactor * oxygenFactor * 0.15;
    const predictedWeight = currentWeight * (1 + growthRate);
    
    return {
      growthRate: growthRate,
      predictedWeight: predictedWeight,
      daysToHarvest: Math.max(0, (targetWeight - predictedWeight) / (predictedWeight * growthRate))
    };
  };

  // Automated alert system
  const checkAlerts = (tankId, sensorData) => {
    const newAlerts = [];
    
    Object.entries(sensorData).forEach(([key, value]) => {
      const sensor = sensorTypes[key];
      if (!sensor) return;
      
      if (value < sensor.min || value > sensor.max) {
        newAlerts.push({
          id: Date.now(),
          tankId,
          sensor: key,
          value,
          severity: value <= sensor.critical || value >= sensor.critical ? 'critical' : 'warning',
          message: \`\${key} is \${value < sensor.min ? 'below' : 'above'} normal range (\${value}\${sensor.unit})\`
        });
      }
    });
    
    return newAlerts;
  };

  // Real-time sensor monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setTanks(prevTanks => prevTanks.map(tank => {
        // Simulate sensor fluctuations
        const newSensors = {
          temperature: tank.sensors.temperature + (Math.random() - 0.5) * 2,
          oxygen: tank.sensors.oxygen + (Math.random() - 0.5) * 1,
          ph: tank.sensors.ph + (Math.random() - 0.5) * 0.3,
          salinity: tank.sensors.salinity + (Math.random() - 0.5) * 1,
          waterLevel: tank.sensors.waterLevel + (Math.random() - 0.5) * 5,
          ammonia: tank.sensors.ammonia + (Math.random() - 0.5) * 0.02,
          nitrite: tank.sensors.nitrite + (Math.random() - 0.5) * 0.01,
          nitrate: tank.sensors.nitrate + (Math.random() - 0.5) * 2
        };
        
        // Check for alerts
        const newAlerts = checkAlerts(tank.id, newSensors);
        if (newAlerts.length > 0) {
          setAlerts(prev => [...prev, ...newAlerts]);
        }
        
        // Update analytics
        const waterQuality = analyzeWaterQuality(newSensors);
        const growthPrediction = predictGrowth(newSensors, tank.currentStock);
        
        return {
          ...tank,
          sensors: newSensors,
          analytics: {
            ...tank.analytics,
            waterQuality,
            growthRate: growthPrediction.growthRate,
            predictedWeight: growthPrediction.predictedWeight
          },
          lastUpdate: 'Just now'
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // System statistics calculation
  useEffect(() => {
    if (tanks.length > 0) {
      const totalSensors = tanks.length * 8; // 8 sensors per tank
      const avgOxygen = tanks.reduce((sum, tank) => sum + tank.sensors.oxygen, 0) / tanks.length;
      const avgTemperature = tanks.reduce((sum, tank) => sum + tank.sensors.temperature, 0) / tanks.length;
      const avgPH = tanks.reduce((sum, tank) => sum + tank.sensors.ph, 0) / tanks.length;
      const avgWaterQuality = tanks.reduce((sum, tank) => sum + tank.analytics.waterQuality, 0) / tanks.length;
      
      setSystemStats({
        totalTanks: tanks.length,
        activeSensors: totalSensors,
        averageOxygen: avgOxygen,
        averageTemperature: avgTemperature,
        averagePH: avgPH,
        waterQuality: avgWaterQuality
      });
    }
  }, [tanks]);

  // Update predictive analytics
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictiveAnalytics(prev => ({
        oxygenTrend: [...prev.oxygenTrend.slice(-9), Math.floor(Math.random() * 5) + 6],
        temperatureTrend: [...prev.temperatureTrend.slice(-9), Math.floor(Math.random() * 10) + 20],
        phTrend: [...prev.phTrend.slice(-9), Math.floor(Math.random() * 15) + 65],
        growthPrediction: [...prev.growthPrediction.slice(-9), Math.floor(Math.random() * 20) + 80],
        harvestPrediction: [...prev.harvestPrediction.slice(-9), Math.floor(Math.random() * 30) + 70]
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Generate AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      const insights = [
        {
          id: Date.now() + Math.random(),
          type: 'warning',
          message: 'Tank C-3 showing signs of stress. Recommend immediate water change.',
          priority: 'high',
          timestamp: new Date().toLocaleTimeString()
        },
        {
          id: Date.now() + Math.random(),
          type: 'info',
          message: 'Optimal feeding time detected. Stock growth rate improving.',
          priority: 'medium',
          timestamp: new Date().toLocaleTimeString()
        },
        {
          id: Date.now() + Math.random(),
          type: 'success',
          message: 'Water quality parameters stabilizing across all tanks.',
          priority: 'low',
          timestamp: new Date().toLocaleTimeString()
        }
      ];
      setAiInsights(insights.slice(0, 3));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  `;

  // Calculate water quality score
  const calculateWaterQuality = (sensors) => {
    let score = 100;
    
    if (sensors.temperature > 28 || sensors.temperature < 18) score -= 20;
    if (sensors.oxygen < 6) score -= 25;
    if (sensors.ph < 6.5 || sensors.ph > 8.0) score -= 15;
    if (sensors.ammonia > 0.05) score -= 20;
    if (sensors.nitrite > 0.02) score -= 10;
    
    return Math.max(0, score);
  };

  // Calculate growth rate based on conditions
  const calculateGrowthRate = (sensors) => {
    let rate = 0.15;
    
    if (sensors.temperature >= 22 && sensors.temperature <= 26) rate += 0.05;
    if (sensors.oxygen >= 7) rate += 0.03;
    if (sensors.ph >= 7.0 && sensors.ph <= 7.5) rate += 0.02;
    if (sensors.ammonia < 0.03) rate += 0.02;
    
    return Math.min(0.25, rate);
  };

  // Calculate mortality rate based on conditions
  const calculateMortalityRate = (sensors) => {
    let rate = 0.02;
    
    if (sensors.temperature > 28) rate += 0.05;
    if (sensors.oxygen < 5) rate += 0.08;
    if (sensors.ph < 6.5) rate += 0.03;
    if (sensors.ammonia > 0.08) rate += 0.06;
    
    return Math.min(0.25, rate);
  };

  // Calculate feed efficiency
  const calculateFeedEfficiency = (sensors) => {
    let efficiency = 0.8;
    
    if (sensors.temperature >= 22 && sensors.temperature <= 26) efficiency += 0.05;
    if (sensors.oxygen >= 7) efficiency += 0.03;
    if (sensors.ph >= 7.0 && sensors.ph <= 7.5) efficiency += 0.02;
    
    return Math.min(0.95, efficiency);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getWaterQualityColor = (quality) => {
    if (quality >= 80) return 'text-green-400';
    if (quality >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getWaterQualityBg = (quality) => {
    if (quality >= 80) return 'bg-green-600';
    if (quality >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🌊 Smart Aquaculture Monitoring</h1>
            <p className="text-gray-300 text-lg">
              AI-powered aquaculture system with real-time sensor monitoring, predictive analytics, and automated insights
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">🐟</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Tanks</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalTanks}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Sensors</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeSensors}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Temperature</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageTemperature.toFixed(1)}°C</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="text-xl font-semibold text-white mb-2">Water Quality</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.waterQuality.toFixed(0)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tank Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Tank Monitoring</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {tanks.map((tank) => (
                  <div
                    key={tank.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all ' + (
                      selectedTank?.id === tank.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedTank(tank)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{tank.name}</h3>
                        <p className="text-gray-400 text-sm">{tank.lastUpdate}</p>
                        <p className={'text-sm ' + getStatusColor(tank.status)}>
                          {tank.status}
                        </p>
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(tank.status)}>
                          {tank.alerts.length} alerts
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(tank.status)}>
                          {tank.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{tank.currentStock}/{tank.capacity} fish</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Temperature</p>
                        <p className="text-white font-semibold">{tank.sensors.temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Oxygen</p>
                        <p className="text-white">{tank.sensors.oxygen.toFixed(1)} mg/L</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Water Quality</span>
                        <span>{tank.analytics.waterQuality}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + getWaterQualityBg(tank.analytics.waterQuality)}
                          style={{ width: tank.analytics.waterQuality + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights & Alerts */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Insights</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{insight.message}</p>
                        <p className="text-blue-200 text-xs">{insight.timestamp}</p>
                      </div>
                      <div className={'px-2 py-1 rounded text-xs ' + (
                        insight.priority === 'high' ? 'bg-red-600 text-white' : 
                        insight.priority === 'medium' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
                      )}>
                        {insight.priority.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 System Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.tank}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'critical' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ System Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Add New Tank
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Generate Report
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Emergency Protocol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tank Details */}
        {selectedTank && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedTank.name} Details</h2>
              <button
                onClick={() => setSelectedTank(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Sensor Data</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Temperature</span>
                    <span className="text-lg font-semibold text-white">{selectedTank.sensors.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Oxygen</span>
                    <span className="text-lg font-semibold text-white">{selectedTank.sensors.oxygen.toFixed(1)} mg/L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">pH Level</span>
                    <span className="text-lg font-semibold text-white">{selectedTank.sensors.ph.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Salinity</span>
                    <span className="text-lg font-semibold text-white">{selectedTank.sensors.salinity.toFixed(1)} ppt</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Water Level</span>
                    <span className="text-lg font-semibold text-white">{selectedTank.sensors.waterLevel}%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Growth Rate</span>
                    <span className="text-lg font-semibold text-white">{(selectedTank.analytics.growthRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mortality Rate</span>
                    <span className="text-lg font-semibold text-white">{(selectedTank.analytics.mortalityRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Feed Efficiency</span>
                    <span className="text-lg font-semibold text-white">{(selectedTank.analytics.feedEfficiency * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Water Quality</span>
                    <span className={'text-lg font-semibold ' + getWaterQualityColor(selectedTank.analytics.waterQuality)}>
                      {selectedTank.analytics.waterQuality}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Water Quality Parameters */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Water Quality Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-white mb-2">Ammonia</h4>
                  <p className="text-2xl font-bold text-white">{selectedTank.sensors.ammonia.toFixed(3)} mg/L</p>
                  <p className="text-gray-400 text-sm">Safe: &lt; 0.05 mg/L</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-white mb-2">Nitrite</h4>
                  <p className="text-2xl font-bold text-white">{selectedTank.sensors.nitrite.toFixed(3)} mg/L</p>
                  <p className="text-gray-400 text-sm">Safe: &lt; 0.02 mg/L</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <h4 className="font-semibold text-white mb-2">Nitrate</h4>
                  <p className="text-2xl font-bold text-white">{selectedTank.sensors.nitrate.toFixed(1)} mg/L</p>
                  <p className="text-gray-400 text-sm">Safe: &lt; 10 mg/L</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Predictive Analytics Charts */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">📈 Predictive Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Oxygen Trend (mg/L)</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {predictiveAnalytics.oxygenTrend.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-4"
                        style={{ height: (value / 12) * 100 + '%' }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Temperature Trend (°C)</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {predictiveAnalytics.temperatureTrend.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-red-500 rounded-t w-4"
                        style={{ height: (value / 35) * 100 + '%' }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Growth Prediction (%)</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex items-end justify-between h-32">
                  {predictiveAnalytics.growthPrediction.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-green-500 rounded-t w-4"
                        style={{ height: (value / 100) * 100 + '%' }}
                      ></div>
                      <span className="text-xs text-gray-400 mt-1">{value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Aquaculture Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Real-time Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Multi-parameter sensors</li>
                <li>• Continuous data collection</li>
                <li>• Automated alerts</li>
                <li>• Remote monitoring</li>
                <li>• Historical data analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Predictive Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Growth rate prediction</li>
                <li>• Disease outbreak detection</li>
                <li>• Optimal feeding schedules</li>
                <li>• Harvest timing optimization</li>
                <li>• Water quality forecasting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">AI Insights</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Automated recommendations</li>
                <li>• Risk assessment</li>
                <li>• Performance optimization</li>
                <li>• Cost reduction analysis</li>
                <li>• Sustainability metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        code={demoCode}
        language="jsx"
        title="Aquaculture Demo Code"
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
      />
    </div>
  );
};

export default AquacultureDemo; 