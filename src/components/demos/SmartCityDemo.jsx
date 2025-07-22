import React, { useState, useEffect } from 'react';

const SmartCityDemo = () => {
  const [infrastructure, setInfrastructure] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalSensors: 0,
    activeSystems: 0,
    energyEfficiency: 0,
    trafficFlow: 0
  });

  // Initialize smart city infrastructure
  useEffect(() => {
    const initialInfrastructure = [
      {
        id: 1,
        name: 'Traffic Management',
        type: 'Transportation',
        status: 'active',
        efficiency: 87,
        sensors: 245,
        location: 'Downtown District',
        lastUpdate: '1 minute ago',
        alerts: [],
        metrics: {
          trafficFlow: 78,
          congestionLevel: 'Medium',
          averageSpeed: 35,
          signalOptimization: 92
        }
      },
      {
        id: 2,
        name: 'Energy Grid',
        type: 'Utilities',
        status: 'active',
        efficiency: 94,
        sensors: 189,
        location: 'Central Power Station',
        lastUpdate: '2 minutes ago',
        alerts: [],
        metrics: {
          powerConsumption: 85,
          renewableEnergy: 45,
          gridStability: 98,
          peakDemand: 72
        }
      },
      {
        id: 3,
        name: 'Water Management',
        type: 'Utilities',
        status: 'warning',
        efficiency: 76,
        sensors: 156,
        location: 'Water Treatment Plant',
        lastUpdate: 'Just now',
        alerts: ['High water consumption', 'Pressure fluctuation'],
        metrics: {
          waterQuality: 99,
          consumptionRate: 89,
          pressureLevel: 85,
          leakDetection: 100
        }
      },
      {
        id: 4,
        name: 'Waste Management',
        type: 'Environmental',
        status: 'active',
        efficiency: 82,
        sensors: 98,
        location: 'Recycling Center',
        lastUpdate: '3 minutes ago',
        alerts: [],
        metrics: {
          recyclingRate: 78,
          collectionEfficiency: 95,
          wasteReduction: 23,
          binOptimization: 88
        }
      }
    ];
    setInfrastructure(initialInfrastructure);
    setSystemStats({
      totalSensors: initialInfrastructure.reduce((sum, sys) => sum + sys.sensors, 0),
      activeSystems: initialInfrastructure.filter(sys => sys.status === 'active').length,
      energyEfficiency: 89,
      trafficFlow: 78
    });
  }, []);

  // Simulate real-time infrastructure updates
  useEffect(() => {
    const interval = setInterval(() => {
      setInfrastructure(prevInfrastructure => prevInfrastructure.map(system => {
        const newSystem = {
          ...system,
          efficiency: Math.max(0, Math.min(100, system.efficiency + (Math.random() - 0.5) * 2)),
          lastUpdate: 'Just now'
        };

        // Update specific metrics based on system type
        if (system.type === 'Transportation') {
          newSystem.metrics = {
            ...system.metrics,
            trafficFlow: Math.max(0, Math.min(100, system.metrics.trafficFlow + (Math.random() - 0.5) * 3)),
            averageSpeed: system.metrics.averageSpeed + (Math.random() - 0.5) * 2
          };
        } else if (system.type === 'Utilities') {
          newSystem.metrics = {
            ...system.metrics,
            powerConsumption: Math.max(0, Math.min(100, system.metrics.powerConsumption + (Math.random() - 0.5) * 2)),
            renewableEnergy: Math.max(0, Math.min(100, system.metrics.renewableEnergy + (Math.random() - 0.5) * 1))
          };
        }

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newSystem.efficiency < 80) {
          newAlerts.push('Low efficiency detected');
        }
        if (newSystem.metrics.trafficFlow > 90) {
          newAlerts.push('High traffic congestion');
        }
        if (newSystem.metrics.powerConsumption > 95) {
          newAlerts.push('Peak power demand');
        }

        newSystem.alerts = newAlerts;
        newSystem.status = newAlerts.length > 2 ? 'critical' : 
                          newAlerts.length > 0 ? 'warning' : 'active';
        
        return newSystem;
      }));

      setSystemStats(prev => ({
        ...prev,
        energyEfficiency: Math.max(0, Math.min(100, prev.energyEfficiency + (Math.random() - 0.5) * 1)),
        trafficFlow: Math.max(0, Math.min(100, prev.trafficFlow + (Math.random() - 0.5) * 2))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate traffic data
  useEffect(() => {
    const newTrafficData = [
      {
        id: 1,
        intersection: 'Main St & 5th Ave',
        congestion: 'Low',
        waitTime: '15 sec',
        vehicles: 45,
        efficiency: 92
      },
      {
        id: 2,
        intersection: 'Broadway & 3rd St',
        congestion: 'Medium',
        waitTime: '45 sec',
        vehicles: 78,
        efficiency: 76
      },
      {
        id: 3,
        intersection: 'Park Ave & 7th St',
        congestion: 'High',
        waitTime: '90 sec',
        vehicles: 125,
        efficiency: 58
      }
    ];
    setTrafficData(newTrafficData);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = infrastructure.flatMap(system => 
        system.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          system: system.name,
          location: system.location,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, [infrastructure]);

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

  const getCongestionColor = (congestion) => {
    switch (congestion) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏙️ Smart City Infrastructure</h1>
          <p className="text-gray-300 text-lg">
            IoT-powered city management with real-time monitoring, traffic optimization, and energy efficiency
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Sensors</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalSensors}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Energy Efficiency</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.energyEfficiency.toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="text-xl font-semibold text-white mb-2">Traffic Flow</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.trafficFlow.toFixed(0)}%</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🏗️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Systems</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.activeSystems}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Infrastructure Monitoring */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Infrastructure Systems</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {infrastructure.map((system) => (
                  <div
                    key={system.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedSystem?.id === system.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedSystem(system)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{system.name}</h3>
                        <p className="text-gray-400 text-sm">{system.type} • {system.location}</p>
                        <p className={`text-sm ${getStatusColor(system.status)}`}>
                          {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${getStatusBg(system.status)}`}>
                          {system.sensors} sensors
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{system.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Efficiency</p>
                        <p className={`text-white font-semibold ${
                          system.efficiency < 80 ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {system.efficiency.toFixed(0)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Alerts</p>
                        <p className="text-white">{system.alerts.length}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>System Performance</span>
                        <span>{system.efficiency.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            system.efficiency > 85 ? 'bg-green-500' : 
                            system.efficiency > 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${system.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Traffic & Alerts */}
          <div className="space-y-6">
            {/* Traffic Management */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚦 Traffic Management</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {trafficData.map((intersection) => (
                  <div key={intersection.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{intersection.intersection}</p>
                        <p className={`text-blue-200 text-sm ${getCongestionColor(intersection.congestion)}`}>
                          {intersection.congestion} Congestion
                        </p>
                        <p className="text-gray-300 text-xs">{intersection.vehicles} vehicles</p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${
                          intersection.efficiency > 80 ? 'bg-green-600 text-white' : 
                          intersection.efficiency > 60 ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          {intersection.efficiency}% efficiency
                        </div>
                        <p className="text-gray-300 text-xs mt-1">{intersection.waitTime}</p>
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
                          <p className="text-white font-semibold">{alert.system}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.location} • {alert.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
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
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ City Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Optimize Traffic Signals
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Energy Management
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Emergency Response
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Details */}
        {selectedSystem && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedSystem.name} Details</h2>
              <button
                onClick={() => setSelectedSystem(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">System Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Type</span>
                    <span className="text-lg font-semibold text-white">{selectedSystem.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Location</span>
                    <span className="text-lg font-semibold text-white">{selectedSystem.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sensors</span>
                    <span className="text-lg font-semibold text-white">{selectedSystem.sensors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Efficiency</span>
                    <span className={`text-lg font-semibold ${
                      selectedSystem.efficiency < 80 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedSystem.efficiency.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={`px-2 py-1 rounded text-sm ${getStatusBg(selectedSystem.status)}`}>
                      {selectedSystem.status.charAt(0).toUpperCase() + selectedSystem.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Performance Metrics</h3>
                <div className="space-y-4">
                  {Object.entries(selectedSystem.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <span className="text-lg font-semibold text-white">
                        {typeof value === 'number' ? value.toFixed(0) : value}
                        {typeof value === 'number' && key.includes('Rate') ? '%' : ''}
                        {typeof value === 'number' && key.includes('Speed') ? ' mph' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IoT Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 IoT-Powered Smart City Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Infrastructure Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time sensor networks</li>
                <li>• Predictive maintenance</li>
                <li>• Energy consumption tracking</li>
                <li>• Water quality monitoring</li>
                <li>• Waste management optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Traffic Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• AI-powered signal optimization</li>
                <li>• Real-time congestion detection</li>
                <li>• Dynamic route planning</li>
                <li>• Public transport integration</li>
                <li>• Parking space optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Energy & Sustainability</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Smart grid management</li>
                <li>• Renewable energy integration</li>
                <li>• Demand response systems</li>
                <li>• Carbon footprint tracking</li>
                <li>• Green building optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCityDemo; 