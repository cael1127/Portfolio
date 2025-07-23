import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';
import webScraper from '../../utils/webScraper';

const SmartCityDemo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState(null);
  const [iotDevices, setIotDevices] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [cityStats, setCityStats] = useState({
    population: 0,
    energyConsumption: 0,
    airQuality: 0,
    trafficFlow: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';
import webScraper from '../../utils/webScraper';

const SmartCityDemo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch real weather data
      const weather = await webScraper.getWeatherData('New York');
      setWeatherData(weather);
      
      // Fetch real traffic data
      const traffic = await webScraper.getTrafficData();
      setTrafficData(traffic);
      
      // Fetch real environmental data
      const environmental = await webScraper.getEnvironmentalData();
      setEnvironmentalData(environmental);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Real-time smart city data display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2>Weather & Environment</h2>
          {weatherData && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3>{weatherData.city}</h3>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Description: {weatherData.description}</p>
            </div>
          )}
        </div>
        
        <div>
          <h2>Traffic Monitoring</h2>
          {trafficData.map(intersection => (
            <div key={intersection.location} className="p-4 bg-gray-800 rounded-lg mb-4">
              <h3>{intersection.location}</h3>
              <p>Congestion: {intersection.congestion}%</p>
              <p>Average Speed: {intersection.averageSpeed} mph</p>
              <p>Signal: {intersection.signalStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCityDemo;`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real weather data
        const weather = await webScraper.getWeatherData('New York');
        setWeatherData(weather);
        
        // Fetch real traffic data
        const traffic = await webScraper.getTrafficData();
        setTrafficData(traffic || []);
        
        // Fetch real environmental data
        const environmental = await webScraper.getEnvironmentalData();
        setEnvironmentalData(environmental);
        
        // Update city stats
        updateCityStats(weather, traffic, environmental);
      } catch (error) {
        console.error('Error fetching smart city data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const updateCityStats = (weather, traffic, environmental) => {
    const population = 8400000 + Math.floor(Math.random() * 100000);
    const energyConsumption = 5000 + Math.random() * 1000;
    const airQuality = environmental?.airQuality?.index || Math.floor(Math.random() * 5) + 1;
    const trafficFlow = traffic?.reduce((sum, t) => sum + t.vehicleCount, 0) || Math.floor(Math.random() * 1000);
    
    setCityStats({
      population,
      energyConsumption,
      airQuality,
      trafficFlow
    });
  };

  // Simulate IoT devices
  useEffect(() => {
    const devices = [
      {
        id: 1,
        name: 'Smart Street Light #1247',
        type: 'Lighting',
        location: 'Main St & Oak Ave',
        status: 'active',
        battery: 85,
        lastUpdate: '2 minutes ago',
        data: {
          brightness: 80,
          motion: 'detected',
          energy: 2.4
        }
      },
      {
        id: 2,
        name: 'Traffic Sensor #892',
        type: 'Traffic',
        location: 'Pine Rd & Elm St',
        status: 'active',
        battery: 92,
        lastUpdate: '1 minute ago',
        data: {
          vehicleCount: 156,
          averageSpeed: 35,
          congestion: 45
        }
      },
      {
        id: 3,
        name: 'Air Quality Monitor #334',
        type: 'Environmental',
        location: 'City Center',
        status: 'active',
        battery: 78,
        lastUpdate: 'Just now',
        data: {
          pm25: 12,
          co2: 420,
          temperature: 22
        }
      },
      {
        id: 4,
        name: 'Smart Parking Sensor #567',
        type: 'Parking',
        location: 'Central Parking Garage',
        status: 'warning',
        battery: 45,
        lastUpdate: '3 minutes ago',
        data: {
          availableSpaces: 23,
          totalSpaces: 150,
          occupancy: 85
        }
      }
    ];

    setIotDevices(devices);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setIotDevices(prev => prev.map(device => ({
        ...device,
        battery: Math.max(0, device.battery - Math.random() * 0.5),
        lastUpdate: 'Just now',
        data: {
          ...device.data,
          ...(device.type === 'Traffic' && {
            vehicleCount: device.data.vehicleCount + Math.floor(Math.random() * 10) - 5,
            averageSpeed: Math.max(0, device.data.averageSpeed + (Math.random() - 0.5) * 5)
          }),
          ...(device.type === 'Environmental' && {
            pm25: Math.max(0, device.data.pm25 + (Math.random() - 0.5) * 2),
            temperature: device.data.temperature + (Math.random() - 0.5) * 1
          })
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getAirQualityColor = (index) => {
    if (index <= 2) return 'text-green-400';
    if (index <= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🏙️ Smart City Infrastructure</h1>
              <p className="text-gray-400">Real-time IoT monitoring and urban analytics</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* City Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Population</p>
                <p className="text-3xl font-bold text-white">{cityStats.population.toLocaleString()}</p>
                <p className="text-blue-400 text-sm">+1.2% this year</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Energy Consumption</p>
                <p className="text-3xl font-bold text-white">{cityStats.energyConsumption.toFixed(0)} MW</p>
                <p className="text-green-400 text-sm">-5.3% vs last month</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Air Quality Index</p>
                <p className={`text-3xl font-bold ${getAirQualityColor(cityStats.airQuality)}`}>
                  {cityStats.airQuality}/5
                </p>
                <p className="text-purple-400 text-sm">Good quality</p>
              </div>
              <div className="text-4xl">🌬️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Traffic Flow</p>
                <p className="text-3xl font-bold text-white">{cityStats.trafficFlow.toLocaleString()}</p>
                <p className="text-yellow-400 text-sm">vehicles/hour</p>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weather & Environment */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">🌤️ Weather & Environment</h2>
            {weatherData && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{weatherData.city}</h3>
                    <span className="text-2xl">🌤️</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Temperature</p>
                      <p className="text-xl font-semibold text-white">{weatherData.temperature.toFixed(1)}°C</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Humidity</p>
                      <p className="text-xl font-semibold text-white">{weatherData.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Wind Speed</p>
                      <p className="text-xl font-semibold text-white">{weatherData.windSpeed.toFixed(1)} m/s</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Pressure</p>
                      <p className="text-xl font-semibold text-white">{weatherData.pressure} hPa</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-3">{weatherData.description}</p>
                </div>
                
                {environmentalData && (
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Environmental Sensors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">PM2.5</p>
                        <p className="text-xl font-semibold text-white">{environmentalData.airQuality.pm25} µg/m³</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">CO₂</p>
                        <p className="text-xl font-semibold text-white">{environmentalData.airQuality.co2} ppm</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Noise Level</p>
                        <p className="text-xl font-semibold text-white">{environmentalData.noise.level} dB</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Air Quality</p>
                        <p className={`text-xl font-semibold ${getAirQualityColor(environmentalData.airQuality.index)}`}>
                          {environmentalData.airQuality.index}/5
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Traffic Monitoring */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">🚦 Traffic Monitoring</h2>
            <div className="space-y-4">
              {trafficData.map(intersection => (
                <div key={intersection.location} className="p-4 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{intersection.location}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBg(intersection.signalStatus.toLowerCase())}`}>
                      {intersection.signalStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Congestion</p>
                      <p className="text-white font-semibold">{intersection.congestion}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Avg Speed</p>
                      <p className="text-white font-semibold">{intersection.averageSpeed} mph</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Vehicles</p>
                      <p className="text-white font-semibold">{intersection.vehicleCount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* IoT Devices */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">📡 IoT Device Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {iotDevices.map(device => (
              <div 
                key={device.id} 
                className="p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer"
                onClick={() => setSelectedDevice(device)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{device.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusBg(device.status)}`}>
                    {device.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="text-white">{device.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Battery</span>
                    <span className={`font-semibold ${device.battery > 20 ? 'text-green-400' : 'text-red-400'}`}>
                      {device.battery.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Location</span>
                    <span className="text-white text-xs">{device.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Update</span>
                    <span className="text-gray-300 text-xs">{device.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart City Features */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🏗️ Smart City Infrastructure Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">IoT Monitoring</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time sensor data</li>
                <li>• Environmental monitoring</li>
                <li>• Traffic flow analysis</li>
                <li>• Energy consumption tracking</li>
                <li>• Air quality measurement</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Urban Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Population density mapping</li>
                <li>• Infrastructure health monitoring</li>
                <li>• Predictive maintenance</li>
                <li>• Resource optimization</li>
                <li>• Emergency response coordination</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Smart Services</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Intelligent traffic lights</li>
                <li>• Smart parking systems</li>
                <li>• Waste management optimization</li>
                <li>• Public safety monitoring</li>
                <li>• Citizen engagement platforms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Device Details Modal */}
        {selectedDevice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Device Details</h3>
                <button
                  onClick={() => setSelectedDevice(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Device Name</span>
                  <span className="text-white font-semibold">{selectedDevice.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Type</span>
                  <span className="text-white font-semibold">{selectedDevice.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Location</span>
                  <span className="text-white font-semibold">{selectedDevice.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Status</span>
                  <span className={`font-semibold ${getStatusColor(selectedDevice.status)}`}>
                    {selectedDevice.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Battery</span>
                  <span className={`font-semibold ${selectedDevice.battery > 20 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedDevice.battery.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-4 p-3 bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Sensor Data</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(selectedDevice.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-400">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Smart City Demo Code</h3>
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

export default SmartCityDemo; 