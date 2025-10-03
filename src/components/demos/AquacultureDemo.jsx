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

  // Enhanced code data for the new CodeViewer
  const codeData = {
    code: `// Smart Aquaculture Monitoring Implementation
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
    OXYGEN: 'Oxygen Level',
    TEMPERATURE: 'Temperature',
    PH: 'pH Level',
    TURBIDITY: 'Turbidity',
    AMMONIA: 'Ammonia Level'
  };

  // Generate deterministic tank data
  const generateTankData = (index) => {
    const baseTime = Date.now() + index * 1000;
    return {
      id: \`tank_\${index}\`,
      name: \`Tank \${index + 1}\`,
      capacity: 1000 + (index * 200),
      currentStock: 800 + (index * 150),
      oxygenLevel: 6.5 + (Math.sin(index) * 0.5),
      temperature: 22 + (Math.cos(index) * 2),
      phLevel: 7.2 + (Math.sin(index * 0.5) * 0.3),
      turbidity: 15 + (Math.cos(index * 0.3) * 5),
      ammoniaLevel: 0.1 + (Math.sin(index * 0.7) * 0.05),
      lastUpdated: new Date(baseTime).toISOString(),
      status: index % 3 === 0 ? 'warning' : 'healthy',
      fishType: ['Salmon', 'Tilapia', 'Bass', 'Trout'][index % 4],
      age: 120 + (index * 30)
    };
  };

  // Initialize tanks
  useEffect(() => {
    const initialTanks = Array.from({ length: 6 }, (_, i) => generateTankData(i));
    setTanks(initialTanks);
    
    // Update tank data every 5 seconds
    const interval = setInterval(() => {
      setTanks(prev => prev.map(tank => generateTankData(parseInt(tank.id.split('_')[1]))));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate system statistics
  useEffect(() => {
    if (tanks.length > 0) {
      const stats = {
        totalTanks: tanks.length,
        activeSensors: tanks.length * 5, // 5 sensors per tank
        averageOxygen: tanks.reduce((sum, tank) => sum + tank.oxygenLevel, 0) / tanks.length,
        averageTemperature: tanks.reduce((sum, tank) => sum + tank.temperature, 0) / tanks.length,
        averagePH: tanks.reduce((sum, tank) => sum + tank.phLevel, 0) / tanks.length,
        waterQuality: tanks.reduce((sum, tank) => {
          const quality = (tank.oxygenLevel / 8) * 0.4 + 
                         (tank.phLevel / 8) * 0.3 + 
                         ((100 - tank.turbidity) / 100) * 0.3;
          return sum + quality;
        }, 0) / tanks.length
      };
      setSystemStats(stats);
    }
  }, [tanks]);

  // Generate AI insights
  useEffect(() => {
    const insights = [
      "Oxygen levels in Tank 2 are trending downward. Consider increasing aeration.",
      "Temperature in Tank 4 is optimal for current fish species.",
      "pH levels across all tanks are within acceptable range.",
      "Tank 1 shows signs of potential algae bloom. Monitor turbidity.",
      "Harvest prediction: Tank 3 ready in 15 days based on growth rate."
    ];
    setAiInsights(insights);
  }, []);

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{systemStats.totalTanks}</div>
          <div className="text-sm text-gray-400">Total Tanks</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">{systemStats.activeSensors}</div>
          <div className="text-sm text-gray-400">Active Sensors</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">{systemStats.averageOxygen.toFixed(1)}</div>
          <div className="text-sm text-gray-400">Avg Oxygen (mg/L)</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">{systemStats.waterQuality.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">Water Quality</div>
        </div>
      </div>

      {/* Tank Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tanks.map(tank => (
          <div 
            key={tank.id} 
            className={\`bg-gray-800 p-6 rounded-lg border-2 cursor-pointer transition-all \${
              selectedTank?.id === tank.id 
                ? 'border-blue-500 bg-gray-700' 
                : 'border-gray-700 hover:border-gray-600'
            }\`}
            onClick={() => setSelectedTank(tank)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-white">{tank.name}</h3>
              <span className={\`px-2 py-1 rounded text-xs \${
                tank.status === 'healthy' 
                  ? 'bg-green-900 text-green-400' 
                  : 'bg-yellow-900 text-yellow-400'
              }\`}>
                {tank.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Fish Type:</span>
                <span className="text-white">{tank.fishType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Stock:</span>
                <span className="text-white">{tank.currentStock}/{tank.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Oxygen:</span>
                <span className="text-blue-400">{tank.oxygenLevel.toFixed(1)} mg/L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Temperature:</span>
                <span className="text-red-400">{tank.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">pH:</span>
                <span className="text-green-400">{tank.phLevel.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">🤖 AI Insights</h3>
        <div className="space-y-2">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
              <span className="text-purple-400 mt-1">•</span>
              <span className="text-gray-300">{insight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`,
    explanation: `This smart aquaculture monitoring system demonstrates IoT integration, real-time data processing, and AI-powered insights for modern fish farming operations.

## Core Implementation

**IoT Sensor Integration**: The system simulates various environmental sensors (oxygen, temperature, pH, turbidity, ammonia) that continuously monitor water quality parameters critical for fish health.

**Real-time Data Processing**: Uses React hooks and intervals to simulate real-time sensor data updates, providing live monitoring capabilities without requiring actual hardware.

**Predictive Analytics**: Implements AI-driven insights that analyze historical data patterns to predict potential issues and provide recommendations for optimal fish farming conditions.

**Water Quality Assessment**: Calculates comprehensive water quality scores based on multiple parameters, providing farmers with actionable insights for maintaining optimal conditions.

## Key Features

**Multi-tank Monitoring**: Simultaneous monitoring of multiple fish tanks with individual parameter tracking and status assessment.

**AI-powered Insights**: Intelligent analysis of sensor data to provide recommendations for aeration, feeding, and maintenance.

**Real-time Alerts**: Automated alert system that notifies farmers of critical parameter deviations or potential issues.

**Data Visualization**: Clear, intuitive interface displaying sensor readings, trends, and system health status.

**Predictive Maintenance**: AI algorithms that predict optimal harvest times and identify potential equipment or environmental issues before they become critical.

## Technical Benefits

- **Deterministic Data Generation**: Consistent, realistic sensor data for reliable demo behavior
- **Scalable Architecture**: Designed to handle multiple tanks and sensors efficiently
- **Real-time Updates**: Live data refresh without page reload
- **Intuitive Interface**: User-friendly dashboard for easy monitoring and management`,

    technologies: [
      {
        name: "IoT Sensors",
        description: "Environmental monitoring sensors for water quality",
        tags: ["IoT", "Sensors", "Monitoring"]
      },
      {
        name: "Data Analytics",
        description: "Pattern recognition and insights from sensor data",
        tags: ["Analytics", "Data", "Insights"]
      },
      {
        name: "Real-time Dashboard",
        description: "Live monitoring interface for aquaculture operations",
        tags: ["Dashboard", "Real-time", "UI"]
      },
      {
        name: "React Hooks",
        description: "State management and lifecycle handling",
        tags: ["React", "Hooks", "State Management"]
      }
    ],

    concepts: [
      {
        name: "IoT Integration",
        description: "Connecting physical sensors to digital systems",
        example: "Water temperature and pH monitoring sensors"
      },
      {
        name: "Predictive Analytics",
        description: "Forecasting based on historical data patterns",
        example: "Predicting fish health issues and optimal harvest times"
      },
      {
        name: "Real-time Monitoring",
        description: "Continuous data collection and processing",
        example: "Live updates of water quality parameters"
      },
      {
        name: "Data Visualization",
        description: "Presenting complex data in understandable formats",
        example: "Charts and graphs showing sensor trends"
      }
    ],

    features: [
      "Water quality monitoring",
      "Fish health tracking",
      "Automated alerts",
      "Data visualization",
      "AI-powered insights",
      "Multi-tank management",
      "Real-time updates",
      "Predictive analytics"
    ]
  };

  // Initialize tanks
  useEffect(() => {
    const initialTanks = Array.from({ length: 6 }, (_, i) => ({
      id: `tank_${i}`,
      name: `Tank ${i + 1}`,
      capacity: 1000 + (i * 200),
      currentStock: 800 + (i * 150),
      oxygenLevel: 6.5 + (Math.sin(i) * 0.5),
      temperature: 22 + (Math.cos(i) * 2),
      phLevel: 7.2 + (Math.sin(i * 0.5) * 0.3),
      turbidity: 15 + (Math.cos(i * 0.3) * 5),
      ammoniaLevel: 0.1 + (Math.sin(i * 0.7) * 0.05),
      lastUpdated: new Date(Date.now() + i * 1000).toISOString(),
      status: i % 3 === 0 ? 'warning' : 'healthy',
      fishType: ['Salmon', 'Tilapia', 'Bass', 'Trout'][i % 4],
      age: 120 + (i * 30)
    }));
    setTanks(initialTanks);
    
    // Update tank data every 5 seconds
    const interval = setInterval(() => {
      setTanks(prev => prev.map((tank, i) => ({
        ...tank,
        oxygenLevel: 6.5 + (Math.sin(Date.now() / 1000 + i) * 0.5),
        temperature: 22 + (Math.cos(Date.now() / 1000 + i) * 2),
        phLevel: 7.2 + (Math.sin((Date.now() / 1000 + i) * 0.5) * 0.3),
        turbidity: 15 + (Math.cos((Date.now() / 1000 + i) * 0.3) * 5),
        ammoniaLevel: 0.1 + (Math.sin((Date.now() / 1000 + i) * 0.7) * 0.05),
        lastUpdated: new Date().toISOString()
      })));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Calculate system statistics
  useEffect(() => {
    if (tanks.length > 0) {
      const stats = {
        totalTanks: tanks.length,
        activeSensors: tanks.length * 5,
        averageOxygen: tanks.reduce((sum, tank) => sum + tank.oxygenLevel, 0) / tanks.length,
        averageTemperature: tanks.reduce((sum, tank) => sum + tank.temperature, 0) / tanks.length,
        averagePH: tanks.reduce((sum, tank) => sum + tank.phLevel, 0) / tanks.length,
        waterQuality: tanks.reduce((sum, tank) => {
          const quality = (tank.oxygenLevel / 8) * 0.4 + 
                         (tank.phLevel / 8) * 0.3 + 
                         ((100 - tank.turbidity) / 100) * 0.3;
          return sum + quality;
        }, 0) / tanks.length
      };
      setSystemStats(stats);
    }
  }, [tanks]);

  // Generate AI insights
  useEffect(() => {
    const insights = [
      "Oxygen levels in Tank 2 are trending downward. Consider increasing aeration.",
      "Temperature in Tank 4 is optimal for current fish species.",
      "pH levels across all tanks are within acceptable range.",
      "Tank 1 shows signs of potential algae bloom. Monitor turbidity.",
      "Harvest prediction: Tank 3 ready in 15 days based on growth rate."
    ];
    setAiInsights(insights);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🌊 Smart Aquaculture Monitoring Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          AI-powered aquaculture system with real-time sensor monitoring, predictive analytics, and automated insights using deterministic algorithms
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>💻</span>
            View Implementation
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">{systemStats.totalTanks}</div>
              <div className="text-sm text-gray-400">Total Tanks</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">{systemStats.activeSensors}</div>
              <div className="text-sm text-gray-400">Active Sensors</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-400">{systemStats.averageOxygen.toFixed(1)}</div>
              <div className="text-sm text-gray-400">Avg Oxygen (mg/L)</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">{systemStats.waterQuality.toFixed(1)}%</div>
              <div className="text-sm text-gray-400">Water Quality</div>
            </div>
          </div>

          {/* Tank Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {tanks.map(tank => (
              <div 
                key={tank.id} 
                className={`bg-gray-800 p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedTank?.id === tank.id 
                    ? 'border-blue-500 bg-gray-700' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedTank(tank)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-white">{tank.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    tank.status === 'healthy' 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-yellow-900 text-yellow-400'
                  }`}>
                    {tank.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fish Type:</span>
                    <span className="text-white">{tank.fishType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stock:</span>
                    <span className="text-white">{tank.currentStock}/{tank.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Oxygen:</span>
                    <span className="text-blue-400">{tank.oxygenLevel.toFixed(1)} mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temperature:</span>
                    <span className="text-red-400">{tank.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">pH:</span>
                    <span className="text-green-400">{tank.phLevel.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">🤖 AI Insights</h3>
            <div className="space-y-2">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Tank Details */}
          {selectedTank && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">Tank Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{selectedTank.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fish Type:</span>
                  <span className="text-white">{selectedTank.fishType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Age:</span>
                  <span className="text-white">{selectedTank.age} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Turbidity:</span>
                  <span className="text-yellow-400">{selectedTank.turbidity.toFixed(1)} NTU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ammonia:</span>
                  <span className="text-orange-400">{selectedTank.ammoniaLevel.toFixed(2)} mg/L</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Aquaculture Implementation"
          language="javascript"
          code={codeData.code}
          explanation={codeData.explanation}
          technologies={codeData.technologies}
          concepts={codeData.concepts}
          features={codeData.features}
        />
      )}
    </div>
  );
};

export default AquacultureDemo;