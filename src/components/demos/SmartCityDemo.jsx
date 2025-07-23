import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const SmartCityDemo = () => {
  const [sensors, setSensors] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  const [energyGrid, setEnergyGrid] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [cityStats, setCityStats] = useState({
    totalSensors: 0,
    activeSensors: 0,
    trafficFlow: 0,
    airQuality: 0,
    energyConsumption: 0,
    publicSafety: 0,
    wasteManagement: 0,
    waterQuality: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';

const SmartCityDemo = () => {
  const [sensors, setSensors] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 10,
        status: Math.random() > 0.95 ? 'offline' : 'online',
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const analyzeTrafficFlow = (trafficData) => {
    // AI-powered traffic analysis
    const analysis = {
      congestion: trafficData.flow > 80 ? 'High' : trafficData.flow > 50 ? 'Medium' : 'Low',
      recommendation: trafficData.flow > 80 ? 'Consider alternative routes' : 'Normal flow'
    };
    return analysis;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* IoT Sensors */}
        <div className="space-y-4">
          {sensors.map((sensor) => (
            <div key={sensor.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{sensor.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Value</p>
                  <p className="text-white font-semibold">{sensor.value}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{sensor.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Traffic Management */}
        <div className="space-y-4">
          {trafficData.map((traffic) => (
            <div key={traffic.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{traffic.location}</h3>
              <p className="text-gray-300 text-sm">{traffic.flow}% flow</p>
              <p className="text-gray-400 text-xs">{traffic.speed} km/h avg</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCityDemo;`;

  useEffect(() => {
    // Initialize smart city data
    const initialSensors = [
      {
        id: 1,
        name: 'Air Quality Sensor',
        type: 'Environmental',
        location: 'Downtown',
        value: 45,
        unit: 'AQI',
        status: 'online',
        threshold: 50,
        lastUpdate: 'Just now',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        battery: 85,
        maintenance: '2024-02-15'
      },
      {
        id: 2,
        name: 'Traffic Camera',
        type: 'Traffic',
        location: 'Main Street',
        value: 78,
        unit: 'vehicles/min',
        status: 'online',
        threshold: 100,
        lastUpdate: '1 minute ago',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        battery: 92,
        maintenance: '2024-02-20'
      },
      {
        id: 3,
        name: 'Smart Streetlight',
        type: 'Lighting',
        location: 'Central Park',
        value: 85,
        unit: 'lumens',
        status: 'online',
        threshold: 90,
        lastUpdate: '2 minutes ago',
        coordinates: { lat: 40.7829, lng: -73.9654 },
        battery: 67,
        maintenance: '2024-02-10'
      },
      {
        id: 4,
        name: 'Waste Bin Sensor',
        type: 'Waste Management',
        location: 'Shopping District',
        value: 23,
        unit: '% full',
        status: 'online',
        threshold: 80,
        lastUpdate: '3 minutes ago',
        coordinates: { lat: 40.7505, lng: -73.9934 },
        battery: 45,
        maintenance: '2024-02-25'
      },
      {
        id: 5,
        name: 'Water Quality Monitor',
        type: 'Water',
        location: 'Harbor',
        value: 7.2,
        unit: 'pH',
        status: 'online',
        threshold: 8.5,
        lastUpdate: 'Just now',
        coordinates: { lat: 40.6892, lng: -74.0445 },
        battery: 78,
        maintenance: '2024-02-18'
      }
    ];

    const initialTrafficData = [
      {
        id: 1,
        location: 'Main Street & 5th Ave',
        flow: 78,
        speed: 35,
        congestion: 'moderate',
        status: 'normal',
        lastUpdate: 'Just now',
        incidents: 0,
        signalStatus: 'green',
        pedestrianCount: 45
      },
      {
        id: 2,
        location: 'Broadway & 42nd St',
        flow: 92,
        speed: 18,
        congestion: 'high',
        status: 'congested',
        lastUpdate: '1 minute ago',
        incidents: 1,
        signalStatus: 'yellow',
        pedestrianCount: 120
      },
      {
        id: 3,
        location: 'Park Avenue & 34th St',
        flow: 45,
        speed: 42,
        congestion: 'low',
        status: 'smooth',
        lastUpdate: '2 minutes ago',
        incidents: 0,
        signalStatus: 'green',
        pedestrianCount: 28
      }
    ];

    const initialEnvironmentalData = [
      {
        id: 1,
        type: 'Air Quality',
        location: 'Downtown',
        value: 45,
        unit: 'AQI',
        status: 'good',
        trend: 'improving',
        lastUpdate: 'Just now',
        pollutants: {
          pm25: 12,
          pm10: 25,
          no2: 18,
          o3: 35
        }
      },
      {
        id: 2,
        type: 'Noise Level',
        location: 'Times Square',
        value: 75,
        unit: 'dB',
        status: 'moderate',
        trend: 'stable',
        lastUpdate: '1 minute ago',
        pollutants: {
          peak: 85,
          average: 72,
          background: 65
        }
      },
      {
        id: 3,
        type: 'Temperature',
        location: 'Central Park',
        value: 22,
        unit: '°C',
        status: 'comfortable',
        trend: 'rising',
        lastUpdate: '2 minutes ago',
        pollutants: {
          humidity: 65,
          heatIndex: 24,
          windSpeed: 8
        }
      }
    ];

    const initialEnergyGrid = [
      {
        id: 1,
        name: 'Solar Farm',
        type: 'Renewable',
        location: 'Rooftop District',
        output: 85,
        unit: 'MW',
        capacity: 100,
        status: 'active',
        efficiency: 78,
        lastUpdate: 'Just now'
      },
      {
        id: 2,
        name: 'Wind Turbine',
        type: 'Renewable',
        location: 'Harbor Area',
        output: 45,
        unit: 'MW',
        capacity: 60,
        status: 'active',
        efficiency: 75,
        lastUpdate: '1 minute ago'
      },
      {
        id: 3,
        name: 'Battery Storage',
        type: 'Storage',
        location: 'Grid Station',
        output: 120,
        unit: 'MWh',
        capacity: 200,
        status: 'charging',
        efficiency: 92,
        lastUpdate: '2 minutes ago'
      }
    ];

    setSensors(initialSensors);
    setTrafficData(initialTrafficData);
    setEnvironmentalData(initialEnvironmentalData);
    setEnergyGrid(initialEnergyGrid);
  }, []);

  useEffect(() => {
    // Simulate real-time smart city updates
    const interval = setInterval(() => {
      // Update sensor data
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: Math.max(0, Math.min(100, sensor.value + (Math.random() - 0.5) * 10)),
        status: Math.random() > 0.98 ? 'offline' : 'online',
        battery: Math.max(0, sensor.battery - Math.random() * 0.5),
        lastUpdate: 'Just now'
      })));

      // Update traffic data
      setTrafficData(prev => prev.map(traffic => ({
        ...traffic,
        flow: Math.max(0, Math.min(100, traffic.flow + (Math.random() - 0.5) * 15)),
        speed: Math.max(5, Math.min(60, traffic.speed + (Math.random() - 0.5) * 5)),
        lastUpdate: 'Just now'
      })));

      // Update environmental data
      setEnvironmentalData(prev => prev.map(env => ({
        ...env,
        value: Math.max(0, Math.min(100, env.value + (Math.random() - 0.5) * 5)),
        lastUpdate: 'Just now'
      })));

      // Update energy grid
      setEnergyGrid(prev => prev.map(energy => ({
        ...energy,
        output: Math.max(0, Math.min(energy.capacity, energy.output + (Math.random() - 0.5) * 10)),
        efficiency: Math.max(50, Math.min(95, energy.efficiency + (Math.random() - 0.5) * 2)),
        lastUpdate: 'Just now'
      })));

      // Update city stats
      setCityStats(prev => ({
        totalSensors: sensors.length,
        activeSensors: sensors.filter(s => s.status === 'online').length,
        trafficFlow: Math.max(0, Math.min(100, prev.trafficFlow + (Math.random() - 0.5) * 5)),
        airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 3)),
        energyConsumption: Math.max(0, Math.min(100, prev.energyConsumption + (Math.random() - 0.5) * 2)),
        publicSafety: Math.max(0, Math.min(100, prev.publicSafety + (Math.random() - 0.5) * 1)),
        wasteManagement: Math.max(0, Math.min(100, prev.wasteManagement + (Math.random() - 0.5) * 2)),
        waterQuality: Math.max(0, Math.min(100, prev.waterQuality + (Math.random() - 0.5) * 1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [sensors]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'online': return 'bg-green-600';
      case 'offline': return 'bg-red-600';
      case 'maintenance': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getTrafficColor = (congestion) => {
    switch (congestion) {
      case 'high': return 'text-red-400';
      case 'moderate': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTrafficBg = (congestion) => {
    switch (congestion) {
      case 'high': return 'bg-red-600';
      case 'moderate': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getAirQualityColor = (aqi) => {
    if (aqi <= 50) return 'text-green-400';
    if (aqi <= 100) return 'text-yellow-400';
    if (aqi <= 150) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAirQualityBg = (aqi) => {
    if (aqi <= 50) return 'bg-green-600';
    if (aqi <= 100) return 'bg-yellow-600';
    if (aqi <= 150) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const formatCoordinates = (coords) => {
    return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🏙️ Smart City Platform</h1>
            <p className="text-gray-300 text-lg">
              IoT-powered urban management with real-time monitoring, traffic optimization, and environmental analytics
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

        {/* City Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Sensors</h3>
            <p className="text-3xl font-bold text-green-400">{cityStats.activeSensors}/{cityStats.totalSensors}</p>
            <p className="text-green-300 text-sm">Real-time monitoring</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🚗</div>
            <h3 className="text-xl font-semibold text-white mb-2">Traffic Flow</h3>
            <p className="text-3xl font-bold text-blue-400">{cityStats.trafficFlow.toFixed(0)}%</p>
            <p className="text-blue-300 text-sm">Optimized routes</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🌬️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Air Quality</h3>
            <p className="text-3xl font-bold text-purple-400">{cityStats.airQuality.toFixed(0)} AQI</p>
            <p className="text-purple-300 text-sm">Environmental monitoring</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Energy Usage</h3>
            <p className="text-3xl font-bold text-yellow-400">{cityStats.energyConsumption.toFixed(0)}%</p>
            <p className="text-yellow-300 text-sm">Smart grid management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* IoT Sensors */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">📡 IoT Sensor Network</h2>
                <div className="text-sm text-green-300">Real-time updates every 3s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      sensor.status === 'online' 
                        ? 'bg-green-900/50 border-green-600' 
                        : sensor.status === 'offline'
                          ? 'bg-red-900/50 border-red-600'
                          : 'bg-yellow-900/50 border-yellow-600'
                    )}
                    onClick={() => setSelectedSensor(sensor)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{sensor.name}</h3>
                        <p className="text-gray-300 text-sm">{sensor.type} • {sensor.location}</p>
                        <p className="text-gray-400 text-xs">{sensor.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(sensor.status)}>
                          {sensor.status.toUpperCase()}
                        </div>
                        <p className="text-gray-300 text-xs mt-1">{sensor.value} {sensor.unit}</p>
                        <p className="text-gray-400 text-xs">{sensor.battery.toFixed(0)}% battery</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Threshold</p>
                        <p className="text-white font-semibold">{sensor.threshold} {sensor.unit}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white font-semibold">{formatCoordinates(sensor.coordinates)}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Battery Level</span>
                        <span>{sensor.battery.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            sensor.battery < 20 ? 'bg-red-500' : 
                            sensor.battery < 50 ? 'bg-yellow-500' : 'bg-green-500'
                          )}
                          style={{ width: sensor.battery + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart City Analytics */}
          <div className="space-y-6">
            {/* Traffic Management */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚗 Traffic Management</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {trafficData.map((traffic) => (
                  <div key={traffic.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{traffic.location}</p>
                        <p className="text-blue-200 text-sm">{traffic.flow}% flow</p>
                        <p className="text-blue-200 text-xs">{traffic.speed} km/h avg</p>
                        <p className="text-gray-300 text-xs">{traffic.pedestrianCount} pedestrians</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getTrafficBg(traffic.congestion)}>
                          {traffic.congestion.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{traffic.signalStatus}</p>
                        <p className="text-gray-300 text-xs">{traffic.incidents} incidents</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Monitoring */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">🌬️ Environmental Data</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {environmentalData.map((env) => (
                  <div key={env.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{env.type}</p>
                        <p className="text-purple-200 text-sm">{env.location}</p>
                        <p className="text-purple-200 text-xs">{env.value} {env.unit}</p>
                        <p className="text-gray-300 text-xs">{env.trend}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getAirQualityBg(env.value)}>
                          {env.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{env.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy Grid */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚡ Energy Grid</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {energyGrid.map((energy) => (
                  <div key={energy.id} className="bg-yellow-800/50 p-3 rounded-lg border border-yellow-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{energy.name}</p>
                        <p className="text-yellow-200 text-sm">{energy.type}</p>
                        <p className="text-yellow-200 text-xs">{energy.location}</p>
                        <p className="text-gray-300 text-xs">{energy.efficiency}% efficient</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(energy.status)}>
                          {energy.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{energy.output} {energy.unit}</p>
                        <p className="text-gray-300 text-xs">{energy.capacity} capacity</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Details Modal */}
        {selectedSensor && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Sensor Details</h2>
                <button
                  onClick={() => setSelectedSensor(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Sensor ID</p>
                  <p className="text-white font-semibold">{selectedSensor.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="text-white font-semibold">{selectedSensor.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white font-semibold">{selectedSensor.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white font-semibold">{selectedSensor.location}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Value</p>
                  <p className="text-white font-semibold">{selectedSensor.value} {selectedSensor.unit}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={'font-semibold ' + getStatusColor(selectedSensor.status)}>
                    {selectedSensor.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Threshold</p>
                  <p className="text-white font-semibold">{selectedSensor.threshold} {selectedSensor.unit}</p>
                </div>
                <div>
                  <p className="text-gray-400">Battery Level</p>
                  <p className="text-white font-semibold">{selectedSensor.battery.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Coordinates</p>
                  <p className="text-white font-semibold">{formatCoordinates(selectedSensor.coordinates)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Update</p>
                  <p className="text-white font-semibold">{selectedSensor.lastUpdate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Maintenance Due</p>
                  <p className="text-white font-semibold">{selectedSensor.maintenance}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Smart City Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🏙️ Advanced Smart City Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">IoT Infrastructure</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time sensor monitoring</li>
                <li>• Predictive maintenance</li>
                <li>• Automated alerts</li>
                <li>• Energy optimization</li>
                <li>• Environmental tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Traffic Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• AI-powered traffic analysis</li>
                <li>• Dynamic signal timing</li>
                <li>• Congestion prediction</li>
                <li>• Emergency vehicle routing</li>
                <li>• Public transport optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Urban Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Air quality monitoring</li>
                <li>• Noise level tracking</li>
                <li>• Waste management</li>
                <li>• Water quality control</li>
                <li>• Public safety systems</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Smart City Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default SmartCityDemo; 