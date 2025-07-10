import React, { useState, useEffect } from 'react';

export default function SmartCityDemo() {
  const [systems, setSystems] = useState([
    { id: 1, name: 'Traffic Management', status: 'operational', efficiency: 87, alerts: 2, location: 'Downtown' },
    { id: 2, name: 'Smart Lighting', status: 'operational', efficiency: 94, alerts: 0, location: 'City Center' },
    { id: 3, name: 'Waste Management', status: 'maintenance', efficiency: 72, alerts: 1, location: 'Industrial Zone' },
    { id: 4, name: 'Air Quality Monitoring', status: 'operational', efficiency: 89, alerts: 0, location: 'Residential' },
    { id: 5, name: 'Water Distribution', status: 'operational', efficiency: 91, alerts: 0, location: 'City Wide' },
    { id: 6, name: 'Public Transport', status: 'operational', efficiency: 85, alerts: 1, location: 'Metro Area' },
  ]);

  const [trafficData, setTrafficData] = useState([
    { intersection: 'Main St & 5th Ave', congestion: 'Low', waitTime: '2 min', signalEfficiency: 92 },
    { intersection: 'Broadway & 10th St', congestion: 'Medium', waitTime: '4 min', signalEfficiency: 78 },
    { intersection: 'Park Ave & 15th St', congestion: 'High', waitTime: '7 min', signalEfficiency: 65 },
  ]);

  const [environmentalData, setEnvironmentalData] = useState({
    airQuality: { pm25: 12, pm10: 25, aqi: 45, status: 'Good' },
    energy: { consumption: 2450, renewable: 68, efficiency: 87 },
    water: { quality: 94, pressure: 85, consumption: 1200 }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => ({
        ...system,
        efficiency: Math.max(60, Math.min(98, system.efficiency + (Math.random() - 0.5) * 4)),
        alerts: Math.random() > 0.8 ? system.alerts + 1 : system.alerts
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'alert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'alert': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCongestionColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">🏙️ Smart City Infrastructure</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* System Overview */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Infrastructure Systems</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {systems.map(system => (
                <div key={system.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold text-white">{system.name}</h5>
                      <p className="text-gray-400 text-sm">{system.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(system.status)} text-white`}>
                        {system.status.toUpperCase()}
                      </span>
                      {system.alerts > 0 && (
                        <div className="mt-1">
                          <span className="text-red-400 text-xs">⚠️ {system.alerts} alerts</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-xs">Efficiency</p>
                      <p className="text-white font-bold">{system.efficiency.toFixed(0)}%</p>
                    </div>
                    <div className="w-24 bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          system.efficiency > 80 ? 'bg-green-500' : 
                          system.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
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

        {/* Environmental Data */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Environmental Monitoring</h4>
            
            {/* Air Quality */}
            <div className="bg-gray-700 p-3 rounded mb-4">
              <h5 className="text-white font-semibold mb-2">🌬️ Air Quality</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">PM2.5</p>
                  <p className="text-white">{environmentalData.airQuality.pm25} µg/m³</p>
                </div>
                <div>
                  <p className="text-gray-400">AQI</p>
                  <p className="text-green-400 font-bold">{environmentalData.airQuality.aqi}</p>
                </div>
              </div>
              <p className="text-green-400 text-xs mt-1">{environmentalData.airQuality.status}</p>
            </div>

            {/* Energy */}
            <div className="bg-gray-700 p-3 rounded mb-4">
              <h5 className="text-white font-semibold mb-2">⚡ Energy</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Consumption</p>
                  <p className="text-white">{environmentalData.energy.consumption} MW</p>
                </div>
                <div>
                  <p className="text-gray-400">Renewable</p>
                  <p className="text-green-400 font-bold">{environmentalData.energy.renewable}%</p>
                </div>
              </div>
            </div>

            {/* Water */}
            <div className="bg-gray-700 p-3 rounded">
              <h5 className="text-white font-semibold mb-2">💧 Water</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Quality</p>
                  <p className="text-green-400 font-bold">{environmentalData.water.quality}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Pressure</p>
                  <p className="text-white">{environmentalData.water.pressure} PSI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Traffic Management */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">🚦 Smart Traffic Management</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {trafficData.map((intersection, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded border border-gray-600">
              <h5 className="text-white font-semibold mb-2">{intersection.intersection}</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Congestion</span>
                  <span className={`font-medium ${getCongestionColor(intersection.congestion)}`}>
                    {intersection.congestion}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Wait Time</span>
                  <span className="text-white">{intersection.waitTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Signal Efficiency</span>
                  <span className="text-green-400 font-bold">{intersection.signalEfficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* City Dashboard */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">🏛️ City Dashboard</h4>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-white font-bold">2.3M</p>
            <p className="text-gray-400 text-sm">Population</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🚗</div>
            <p className="text-white font-bold">1.2M</p>
            <p className="text-gray-400 text-sm">Vehicles</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🏠</div>
            <p className="text-white font-bold">850K</p>
            <p className="text-gray-400 text-sm">Households</p>
          </div>
          <div className="bg-gray-700 p-4 rounded text-center">
            <div className="text-3xl mb-2">🏢</div>
            <p className="text-white font-bold">45K</p>
            <p className="text-gray-400 text-sm">Businesses</p>
          </div>
        </div>
      </div>
    </div>
  );
} 