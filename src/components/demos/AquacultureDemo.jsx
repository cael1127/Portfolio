import React, { useState, useEffect } from 'react';

const AquacultureDemo = () => {
  const [tanks, setTanks] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalTanks: 0,
    activeTanks: 0,
    totalOysters: 0,
    waterQuality: 0
  });

  // Initialize tanks with sensor data
  useEffect(() => {
    const initialTanks = [
      {
        id: 1,
        name: 'Tank A-1',
        status: 'active',
        temperature: 22.5,
        ph: 7.8,
        salinity: 35.2,
        oxygen: 6.8,
        oysterCount: 1250,
        lastFeeding: '2 hours ago',
        waterLevel: 85,
        alerts: []
      },
      {
        id: 2,
        name: 'Tank A-2',
        status: 'active',
        temperature: 23.1,
        ph: 7.6,
        salinity: 34.8,
        oxygen: 7.2,
        oysterCount: 1180,
        lastFeeding: '1 hour ago',
        waterLevel: 92,
        alerts: []
      },
      {
        id: 3,
        name: 'Tank B-1',
        status: 'maintenance',
        temperature: 21.8,
        ph: 7.9,
        salinity: 35.5,
        oxygen: 6.5,
        oysterCount: 0,
        lastFeeding: 'N/A',
        waterLevel: 45,
        alerts: ['Low water level', 'Maintenance required']
      }
    ];
    setTanks(initialTanks);
    setSystemStats({
      totalTanks: initialTanks.length,
      activeTanks: initialTanks.filter(t => t.status === 'active').length,
      totalOysters: initialTanks.reduce((sum, t) => sum + t.oysterCount, 0),
      waterQuality: 92
    });
  }, []);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTanks(prevTanks => prevTanks.map(tank => {
        if (tank.status === 'active') {
          const newTank = {
            ...tank,
            temperature: tank.temperature + (Math.random() - 0.5) * 0.2,
            ph: tank.ph + (Math.random() - 0.5) * 0.1,
            salinity: tank.salinity + (Math.random() - 0.5) * 0.1,
            oxygen: tank.oxygen + (Math.random() - 0.5) * 0.1,
            waterLevel: Math.max(0, Math.min(100, tank.waterLevel + (Math.random() - 0.5) * 2))
          };

          // Generate alerts based on conditions
          const newAlerts = [];
          if (newTank.temperature > 25 || newTank.temperature < 18) {
            newAlerts.push('Temperature out of range');
          }
          if (newTank.ph > 8.5 || newTank.ph < 7.0) {
            newAlerts.push('pH level critical');
          }
          if (newTank.oxygen < 6.0) {
            newAlerts.push('Low oxygen levels');
          }
          if (newTank.waterLevel < 50) {
            newAlerts.push('Low water level');
          }

          newTank.alerts = newAlerts;
          return newTank;
        }
        return tank;
      }));

      // Update system stats
      setSystemStats(prev => ({
        ...prev,
        waterQuality: Math.max(0, Math.min(100, prev.waterQuality + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = tanks.flatMap(tank => 
        tank.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          tank: tank.name,
          message: alert,
          severity: alert.includes('critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [tanks]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'inactive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'inactive': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🌊 Aquaculture Monitoring System</h1>
          <p className="text-gray-300 text-lg">
            Real-time oyster farm monitoring with IoT sensors, water quality analysis, and automated alerts
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Tanks</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalTanks}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🦪</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Oysters</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.totalOysters.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">💧</div>
            <h3 className="text-xl font-semibold text-white mb-2">Water Quality</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.waterQuality.toFixed(1)}%</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Tanks</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.activeTanks}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tank Monitoring */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Tank Monitoring</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tanks.map((tank) => (
                  <div
                    key={tank.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedTank?.id === tank.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedTank(tank)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{tank.name}</h3>
                        <p className={`text-sm ${getStatusColor(tank.status)}`}>
                          {tank.status.charAt(0).toUpperCase() + tank.status.slice(1)}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${getStatusBg(tank.status)}`}>
                        {tank.oysterCount} oysters
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-400">Temperature</p>
                        <p className="text-white">{tank.temperature.toFixed(1)}°C</p>
                      </div>
                      <div>
                        <p className="text-gray-400">pH Level</p>
                        <p className="text-white">{tank.ph.toFixed(1)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Salinity</p>
                        <p className="text-white">{tank.salinity.toFixed(1)} ppt</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Oxygen</p>
                        <p className="text-white">{tank.oxygen.toFixed(1)} mg/L</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Water Level</span>
                        <span>{tank.waterLevel.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            tank.waterLevel > 70 ? 'bg-green-500' : 
                            tank.waterLevel > 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${tank.waterLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alerts & Controls */}
          <div className="space-y-6">
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
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Feed All Tanks
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Check Water Quality
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Maintenance Mode
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
                <h3 className="text-lg font-semibold text-green-400 mb-3">Sensor Readings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Temperature</span>
                    <span className={`text-lg font-semibold ${
                      selectedTank.temperature > 25 || selectedTank.temperature < 18 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedTank.temperature.toFixed(1)}°C
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">pH Level</span>
                    <span className={`text-lg font-semibold ${
                      selectedTank.ph > 8.5 || selectedTank.ph < 7.0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedTank.ph.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Salinity</span>
                    <span className="text-lg font-semibold text-blue-400">
                      {selectedTank.salinity.toFixed(1)} ppt
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Dissolved Oxygen</span>
                    <span className={`text-lg font-semibold ${
                      selectedTank.oxygen < 6.0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedTank.oxygen.toFixed(1)} mg/L
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Tank Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Oyster Count</span>
                    <span className="text-lg font-semibold text-white">
                      {selectedTank.oysterCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Last Feeding</span>
                    <span className="text-lg font-semibold text-white">
                      {selectedTank.lastFeeding}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Water Level</span>
                    <span className={`text-lg font-semibold ${
                      selectedTank.waterLevel < 50 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedTank.waterLevel.toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={`px-2 py-1 rounded text-sm ${getStatusBg(selectedTank.status)}`}>
                      {selectedTank.status.charAt(0).toUpperCase() + selectedTank.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* IoT Sensors Info */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">📡 IoT Sensor Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Water Quality Sensors</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Temperature sensors (PT100)</li>
                <li>• pH level probes</li>
                <li>• Dissolved oxygen meters</li>
                <li>• Salinity conductivity sensors</li>
                <li>• Turbidity sensors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Environmental Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Water level sensors</li>
                <li>• Flow rate meters</li>
                <li>• Weather station integration</li>
                <li>• Light intensity sensors</li>
                <li>• Air quality monitors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Data Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time data collection</li>
                <li>• Machine learning analysis</li>
                <li>• Predictive maintenance</li>
                <li>• Automated alerts</li>
                <li>• Historical trend analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AquacultureDemo; 