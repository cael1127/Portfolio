import React, { useState } from 'react';

const SmartCityProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    trafficManagement: `// Traffic Management System
class TrafficManager {
  constructor() {
    this.intersections = new Map();
    this.vehicles = new Map();
    this.signals = new Map();
    this.analytics = new TrafficAnalytics();
  }

  addIntersection(intersectionId, location) {
    this.intersections.set(intersectionId, {
      id: intersectionId,
      location: location,
      signals: [],
      trafficFlow: [],
      congestionLevel: 0
    });
  }

  updateTrafficFlow(intersectionId, flowData) {
    const intersection = this.intersections.get(intersectionId);
    if (!intersection) return;

    intersection.trafficFlow.push({
      ...flowData,
      timestamp: new Date()
    });

    // Calculate congestion level
    intersection.congestionLevel = this.calculateCongestion(intersection.trafficFlow);
    
    // Optimize signal timing
    this.optimizeSignals(intersectionId);
  }

  calculateCongestion(trafficFlow) {
    if (trafficFlow.length === 0) return 0;
    
    const recentFlow = trafficFlow.slice(-10);
    const averageFlow = recentFlow.reduce((sum, flow) => sum + flow.vehicleCount, 0) / recentFlow.length;
    
    // Normalize to 0-100 scale
    return Math.min(100, (averageFlow / 100) * 100);
  }

  optimizeSignals(intersectionId) {
    const intersection = this.intersections.get(intersectionId);
    if (!intersection) return;

    const congestion = intersection.congestionLevel;
    
    // Adjust signal timing based on congestion
    intersection.signals.forEach(signal => {
      if (congestion > 70) {
        signal.greenTime = Math.min(90, signal.greenTime + 10);
      } else if (congestion < 30) {
        signal.greenTime = Math.max(30, signal.greenTime - 5);
      }
    });
  }
}`,
    
    energyMonitoring: `// Energy Monitoring System
class EnergyMonitor {
  constructor() {
    this.grids = new Map();
    this.sensors = new Map();
    this.analytics = new EnergyAnalytics();
  }

  addGrid(gridId, gridData) {
    this.grids.set(gridId, {
      id: gridId,
      capacity: gridData.capacity,
      currentLoad: 0,
      renewablePercentage: 0,
      efficiency: 0,
      status: 'active'
    });
  }

  updateGridLoad(gridId, loadData) {
    const grid = this.grids.get(gridId);
    if (!grid) return;

    grid.currentLoad = loadData.load;
    grid.renewablePercentage = loadData.renewablePercentage;
    grid.efficiency = this.calculateEfficiency(grid);

    // Check for grid stability
    this.checkGridStability(gridId);
  }

  calculateEfficiency(grid) {
    const loadFactor = grid.currentLoad / grid.capacity;
    const renewableFactor = grid.renewablePercentage / 100;
    
    // Efficiency formula considering load and renewable energy
    return Math.min(100, (loadFactor * 0.7 + renewableFactor * 0.3) * 100);
  }

  checkGridStability(gridId) {
    const grid = this.grids.get(gridId);
    if (!grid) return;

    if (grid.currentLoad > grid.capacity * 0.9) {
      this.triggerAlert(gridId, 'high_load', 'Grid load approaching capacity');
    }

    if (grid.efficiency < 60) {
      this.triggerAlert(gridId, 'low_efficiency', 'Grid efficiency below threshold');
    }
  }

  triggerAlert(gridId, type, message) {
    const alert = {
      gridId,
      type,
      message,
      timestamp: new Date(),
      severity: type === 'high_load' ? 'critical' : 'warning'
    };

    this.emit('gridAlert', alert);
  }
}`,
    
    environmentalMonitoring: `// Environmental Monitoring System
class EnvironmentalMonitor {
  constructor() {
    this.sensors = new Map();
    this.zones = new Map();
    this.analytics = new EnvironmentalAnalytics();
  }

  addSensor(sensorId, sensorData) {
    this.sensors.set(sensorId, {
      id: sensorId,
      type: sensorData.type,
      location: sensorData.location,
      zone: sensorData.zone,
      status: 'active',
      lastReading: null
    });
  }

  updateSensorReading(sensorId, reading) {
    const sensor = this.sensors.get(sensorId);
    if (!sensor) return;

    sensor.lastReading = {
      ...reading,
      timestamp: new Date()
    };

    // Analyze environmental impact
    this.analyzeEnvironmentalImpact(sensor.zone, reading);
  }

  analyzeEnvironmentalImpact(zone, reading) {
    const zoneData = this.zones.get(zone);
    if (!zoneData) return;

    // Update zone metrics
    zoneData.airQuality = this.calculateAirQuality(reading);
    zoneData.noiseLevel = reading.noiseLevel || zoneData.noiseLevel;
    zoneData.temperature = reading.temperature || zoneData.temperature;
    zoneData.humidity = reading.humidity || zoneData.humidity;

    // Check for environmental alerts
    this.checkEnvironmentalAlerts(zone, zoneData);
  }

  calculateAirQuality(reading) {
    const aqi = reading.pm25 * 0.5 + reading.pm10 * 0.3 + reading.co * 0.2;
    
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'unhealthy_sensitive';
    if (aqi <= 200) return 'unhealthy';
    if (aqi <= 300) return 'very_unhealthy';
    return 'hazardous';
  }

  checkEnvironmentalAlerts(zone, zoneData) {
    const alerts = [];

    if (zoneData.airQuality === 'unhealthy' || zoneData.airQuality === 'very_unhealthy') {
      alerts.push({
        type: 'air_quality',
        severity: 'high',
        message: 'Poor air quality detected',
        zone: zone
      });
    }

    if (zoneData.noiseLevel > 85) {
      alerts.push({
        type: 'noise_pollution',
        severity: 'medium',
        message: 'High noise levels detected',
        zone: zone
      });
    }

    alerts.forEach(alert => {
      this.emit('environmentalAlert', alert);
    });
  }
}`,
    
    dashboardComponent: `// React Smart City Dashboard
import React, { useState, useEffect } from 'react';

const SmartCityDashboard = () => {
  const [cityData, setCityData] = useState({
    traffic: {},
    energy: {},
    environment: {},
    infrastructure: {}
  });

  useEffect(() => {
    const trafficManager = new TrafficManager();
    const energyMonitor = new EnergyMonitor();
    const envMonitor = new EnvironmentalMonitor();

    // Initialize city systems
    trafficManager.addIntersection('INT-001', { lat: 40.7128, lng: -74.0060 });
    energyMonitor.addGrid('GRID-001', { capacity: 1000 });
    envMonitor.addSensor('SENSOR-001', { type: 'air_quality', zone: 'downtown' });

    // Update city data
    const interval = setInterval(() => {
      setCityData(prev => ({
        traffic: {
          congestionLevel: Math.random() * 100,
          activeVehicles: Math.floor(Math.random() * 1000),
          averageSpeed: 25 + Math.random() * 15
        },
        energy: {
          currentLoad: Math.random() * 1000,
          renewablePercentage: 20 + Math.random() * 30,
          efficiency: 70 + Math.random() * 20
        },
        environment: {
          airQuality: ['good', 'moderate', 'unhealthy'][Math.floor(Math.random() * 3)],
          temperature: 20 + Math.random() * 15,
          humidity: 40 + Math.random() * 30
        },
        infrastructure: {
          activeSensors: 150 + Math.floor(Math.random() * 50),
          systemHealth: 85 + Math.random() * 10
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-8">
          Smart City Infrastructure
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Traffic</h3>
            <p className="text-2xl font-bold text-[var(--text)]">
              {cityData.traffic?.congestionLevel?.toFixed(1)}%
            </p>
            <p className="text-sm text-[var(--muted)]">Congestion Level</p>
          </div>
          
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Energy</h3>
            <p className="text-2xl font-bold text-[var(--text)]">
              {cityData.energy?.efficiency?.toFixed(1)}%
            </p>
            <p className="text-sm text-[var(--muted)]">Grid Efficiency</p>
          </div>
          
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Environment</h3>
            <p className="text-2xl font-bold text-[var(--text)] capitalize">
              {cityData.environment?.airQuality}
            </p>
            <p className="text-sm text-[var(--muted)]">Air Quality</p>
          </div>
          
          <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
            <h3 className="text-lg font-semibold text-[var(--accent)]">Infrastructure</h3>
            <p className="text-2xl font-bold text-[var(--text)]">
              {cityData.infrastructure?.systemHealth?.toFixed(1)}%
            </p>
            <p className="text-sm text-[var(--muted)]">System Health</p>
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-[var(--accent)] hover:text-[var(--accent)] mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">🏙️ Smart City Infrastructure</h1>
          <p className="text-[var(--text)] text-lg">
            Comprehensive smart city monitoring and management with traffic optimization, energy monitoring, and environmental tracking
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
                  ? 'bg-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Project Overview</h2>
                <p className="text-[var(--text)] leading-relaxed">
                  The Smart City Infrastructure platform is a comprehensive urban management system that integrates 
                  traffic optimization, energy monitoring, environmental tracking, and infrastructure management to 
                  create efficient, sustainable, and livable cities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Optimize traffic flow and reduce congestion</li>
                    <li>• Monitor and manage energy consumption</li>
                    <li>• Track environmental quality</li>
                    <li>• Improve infrastructure efficiency</li>
                    <li>• Enhance public safety</li>
                    <li>• Reduce carbon footprint</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• React.js for dashboard</li>
                    <li>• Node.js backend API</li>
                    <li>• IoT sensor networks</li>
                    <li>• Real-time data processing</li>
                    <li>• Machine learning algorithms</li>
                    <li>• GIS mapping integration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🚦 Traffic Management</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time traffic monitoring</li>
                    <li>• Adaptive signal timing</li>
                    <li>• Congestion prediction</li>
                    <li>• Route optimization</li>
                    <li>• Incident detection</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">⚡ Energy Monitoring</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Grid load monitoring</li>
                    <li>• Renewable energy tracking</li>
                    <li>• Efficiency optimization</li>
                    <li>• Demand forecasting</li>
                    <li>• Smart grid management</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🌱 Environmental Tracking</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Air quality monitoring</li>
                    <li>• Noise level detection</li>
                    <li>• Weather integration</li>
                    <li>• Pollution tracking</li>
                    <li>• Environmental alerts</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🏗️ Infrastructure Management</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Sensor network monitoring</li>
                    <li>• Predictive maintenance</li>
                    <li>• System health tracking</li>
                    <li>• Resource optimization</li>
                    <li>• Emergency response</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Traffic Management System</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.trafficManagement}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Energy Monitoring System</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.energyMonitoring}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Environmental Monitoring</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.environmentalMonitoring}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Dashboard Component</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• React.js dashboard</li>
                      <li>• Real-time city map</li>
                      <li>• Interactive visualizations</li>
                      <li>• Mobile responsive</li>
                      <li>• Multi-device support</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Backend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• Node.js API server</li>
                      <li>• IoT data processing</li>
                      <li>• Real-time analytics</li>
                      <li>• Alert management</li>
                      <li>• Data aggregation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">1</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Sensor Data Collection</p>
                      <p className="text-[var(--text)] text-sm">IoT sensors collect real-time city data</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">2</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Data Processing</p>
                      <p className="text-[var(--text)] text-sm">AI algorithms analyze and optimize city systems</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">3</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Dashboard Updates</p>
                      <p className="text-[var(--text)] text-sm">Real-time updates to the city dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Live Demo</h2>
              <p className="text-[var(--text)] mb-6">
                Experience the smart city infrastructure in action. The demo showcases real-time traffic monitoring, 
                energy management, environmental tracking, and comprehensive city analytics.
              </p>
              
              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">Interactive Smart City Demo</h3>
                  <button
                    onClick={() => setCurrentPage('smartcity')}
                    className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-[var(--text)] text-sm">
                  Click "Launch Demo" to experience the full smart city infrastructure with real-time monitoring, 
                  traffic optimization, energy management, and environmental tracking.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartCityProjectPage; 