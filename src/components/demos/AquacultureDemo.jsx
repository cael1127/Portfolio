import React, { useState, useEffect } from 'react';

export default function AquacultureDemo() {
  const [sensors, setSensors] = useState([
    { id: 1, name: 'Water Temperature', value: 22.5, unit: '°C', status: 'normal', location: 'Tank A1' },
    { id: 2, name: 'pH Level', value: 7.2, unit: 'pH', status: 'normal', location: 'Tank A1' },
    { id: 3, name: 'Dissolved Oxygen', value: 8.1, unit: 'mg/L', status: 'normal', location: 'Tank A1' },
    { id: 4, name: 'Salinity', value: 32.5, unit: 'ppt', status: 'warning', location: 'Tank B2' },
    { id: 5, name: 'Turbidity', value: 15.2, unit: 'NTU', status: 'normal', location: 'Tank B2' },
    { id: 6, name: 'Ammonia', value: 0.8, unit: 'mg/L', status: 'alert', location: 'Tank C3' },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'Salinity levels approaching threshold in Tank B2', time: '2 min ago' },
    { id: 2, type: 'alert', message: 'Ammonia levels critical in Tank C3 - Immediate action required', time: '5 min ago' },
  ]);

  const [selectedTank, setSelectedTank] = useState('Tank A1');

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 2,
        status: Math.random() > 0.9 ? 'alert' : sensor.status
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'alert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'alert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">🌊 Aquaculture Tracking System</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sensor Dashboard */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Real-time Sensor Data</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {sensors.map(sensor => (
                <div key={sensor.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-semibold text-white">{sensor.name}</h5>
                      <p className="text-gray-400 text-sm">{sensor.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(sensor.status)} text-white`}>
                      {sensor.status.toUpperCase()}
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${getStatusColor(sensor.status)}`}>
                    {sensor.value.toFixed(1)} {sensor.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Active Alerts</h4>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded border-l-4 ${
                  alert.type === 'alert' ? 'border-red-400 bg-red-900/20' : 'border-yellow-400 bg-yellow-900/20'
                }`}>
                  <p className="text-white text-sm mb-1">{alert.message}</p>
                  <p className="text-gray-400 text-xs">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tank Selection */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">Tank Overview</h4>
            <div className="grid grid-cols-3 gap-2">
              {['Tank A1', 'Tank B2', 'Tank C3'].map(tank => (
                <button
                  key={tank}
                  onClick={() => setSelectedTank(tank)}
                  className={`p-3 rounded text-sm font-medium transition-colors ${
                    selectedTank === tank 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {tank}
                </button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gray-700 rounded">
              <p className="text-white text-sm">Selected: <span className="text-green-400 font-medium">{selectedTank}</span></p>
              <p className="text-gray-400 text-xs mt-1">6 sensors active • Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Data Chart */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">Historical Data - {selectedTank}</h4>
        <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-400">Interactive chart showing 24-hour sensor data trends</p>
            <p className="text-gray-500 text-sm mt-2">Temperature, pH, Oxygen, Salinity, and Ammonia levels</p>
          </div>
        </div>
      </div>
    </div>
  );
} 