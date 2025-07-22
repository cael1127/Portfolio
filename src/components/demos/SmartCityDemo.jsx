import React, { useState, useEffect } from 'react';

const SmartCityDemo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cityData, setCityData] = useState({});
  const [sensorData, setSensorData] = useState({});
  const [trafficData, setTrafficData] = useState([]);
  const [energyData, setEnergyData] = useState({});
  const [environmentalData, setEnvironmentalData] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('downtown');
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏙️' },
    { id: 'traffic', label: 'Traffic', icon: '🚗' },
    { id: 'energy', label: 'Energy', icon: '⚡' },
    { id: 'environment', label: 'Environment', icon: '🌱' },
    { id: 'ai', label: 'AI Insights', icon: '🤖' }
  ];

  const districts = [
    { id: 'downtown', name: 'Downtown', color: 'blue' },
    { id: 'midtown', name: 'Midtown', color: 'green' },
    { id: 'uptown', name: 'Uptown', color: 'purple' },
    { id: 'suburbs', name: 'Suburbs', color: 'orange' }
  ];

  useEffect(() => {
    initializeData();
    const interval = setInterval(updateData, 4000);
    return () => clearInterval(interval);
  }, []);

  const initializeData = () => {
    // Initialize city overview data
    setCityData({
      population: 850000,
      area: 450,
      districts: 4,
      sensors: 1250,
      efficiency: 87.5
    });

    // Initialize sensor data
    setSensorData({
      airQuality: {
        downtown: { pm25: 35, pm10: 65, co2: 420, status: 'moderate' },
        midtown: { pm25: 28, pm10: 52, co2: 395, status: 'good' },
        uptown: { pm25: 22, pm10: 45, co2: 380, status: 'good' },
        suburbs: { pm25: 18, pm10: 38, co2: 365, status: 'excellent' }
      },
      noise: {
        downtown: 68,
        midtown: 62,
        uptown: 58,
        suburbs: 45
      },
      temperature: {
        downtown: 72,
        midtown: 70,
        uptown: 68,
        suburbs: 66
      },
      humidity: {
        downtown: 65,
        midtown: 62,
        uptown: 60,
        suburbs: 58
      }
    });

    // Initialize traffic data
    const initialTraffic = [];
    for (let i = 0; i < 24; i++) {
      initialTraffic.push({
        hour: i,
        downtown: Math.floor(Math.random() * 1000) + 500,
        midtown: Math.floor(Math.random() * 800) + 400,
        uptown: Math.floor(Math.random() * 600) + 300,
        suburbs: Math.floor(Math.random() * 400) + 200
      });
    }
    setTrafficData(initialTraffic);

    // Initialize energy data
    setEnergyData({
      solar: { current: 45.2, capacity: 60, efficiency: 75.3 },
      wind: { current: 28.8, capacity: 40, efficiency: 72.0 },
      hydro: { current: 15.6, capacity: 20, efficiency: 78.0 },
      grid: { current: 120.4, capacity: 150, efficiency: 80.3 },
      consumption: {
        residential: 45,
        commercial: 35,
        industrial: 20
      }
    });

    // Initialize environmental data
    setEnvironmentalData({
      wasteRecycling: 78.5,
      greenSpaces: 23.4,
      waterQuality: 94.2,
      biodiversity: 87.6
    });
  };

  const updateData = () => {
    // Update sensor data
    setSensorData(prev => ({
      airQuality: {
        downtown: {
          pm25: prev.airQuality.downtown.pm25 + (Math.random() - 0.5) * 4,
          pm10: prev.airQuality.downtown.pm10 + (Math.random() - 0.5) * 6,
          co2: prev.airQuality.downtown.co2 + (Math.random() - 0.5) * 8,
          status: prev.airQuality.downtown.pm25 > 35 ? 'moderate' : 'good'
        },
        midtown: {
          pm25: prev.airQuality.midtown.pm25 + (Math.random() - 0.5) * 3,
          pm10: prev.airQuality.midtown.pm10 + (Math.random() - 0.5) * 5,
          co2: prev.airQuality.midtown.co2 + (Math.random() - 0.5) * 6,
          status: prev.airQuality.midtown.pm25 > 30 ? 'moderate' : 'good'
        },
        uptown: {
          pm25: prev.airQuality.uptown.pm25 + (Math.random() - 0.5) * 2,
          pm10: prev.airQuality.uptown.pm10 + (Math.random() - 0.5) * 4,
          co2: prev.airQuality.uptown.co2 + (Math.random() - 0.5) * 5,
          status: 'good'
        },
        suburbs: {
          pm25: prev.airQuality.suburbs.pm25 + (Math.random() - 0.5) * 1,
          pm10: prev.airQuality.suburbs.pm10 + (Math.random() - 0.5) * 3,
          co2: prev.airQuality.suburbs.co2 + (Math.random() - 0.5) * 4,
          status: 'excellent'
        }
      },
      noise: {
        downtown: prev.noise.downtown + (Math.random() - 0.5) * 2,
        midtown: prev.noise.midtown + (Math.random() - 0.5) * 1.5,
        uptown: prev.noise.uptown + (Math.random() - 0.5) * 1,
        suburbs: prev.noise.suburbs + (Math.random() - 0.5) * 0.5
      },
      temperature: {
        downtown: prev.temperature.downtown + (Math.random() - 0.5) * 1,
        midtown: prev.temperature.midtown + (Math.random() - 0.5) * 0.8,
        uptown: prev.temperature.uptown + (Math.random() - 0.5) * 0.6,
        suburbs: prev.temperature.suburbs + (Math.random() - 0.5) * 0.4
      },
      humidity: {
        downtown: prev.humidity.downtown + (Math.random() - 0.5) * 2,
        midtown: prev.humidity.midtown + (Math.random() - 0.5) * 1.5,
        uptown: prev.humidity.uptown + (Math.random() - 0.5) * 1,
        suburbs: prev.humidity.suburbs + (Math.random() - 0.5) * 0.5
      }
    }));

    // Update traffic data
    setTrafficData(prev => {
      const newData = [...prev];
      const currentHour = new Date().getHours();
      newData[currentHour] = {
        hour: currentHour,
        downtown: Math.floor(Math.random() * 1000) + 500,
        midtown: Math.floor(Math.random() * 800) + 400,
        uptown: Math.floor(Math.random() * 600) + 300,
        suburbs: Math.floor(Math.random() * 400) + 200
      };
      return newData;
    });

    // Update energy data
    setEnergyData(prev => ({
      ...prev,
      solar: {
        ...prev.solar,
        current: prev.solar.current + (Math.random() - 0.5) * 2,
        efficiency: prev.solar.efficiency + (Math.random() - 0.5) * 1
      },
      wind: {
        ...prev.wind,
        current: prev.wind.current + (Math.random() - 0.5) * 1.5,
        efficiency: prev.wind.efficiency + (Math.random() - 0.5) * 0.8
      }
    }));
  };

  const getAirQualityColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'moderate': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getAirQualityBg = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-600';
      case 'good': return 'bg-blue-600';
      case 'moderate': return 'bg-yellow-600';
      case 'poor': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const renderCityOverview = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">City Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Population</p>
            <p className="text-2xl font-bold text-white">{cityData.population.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Area (km²)</p>
            <p className="text-2xl font-bold text-green-400">{cityData.area}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Smart Sensors</p>
            <p className="text-2xl font-bold text-blue-400">{cityData.sensors.toLocaleString()}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Efficiency</p>
            <p className="text-2xl font-bold text-purple-400">{cityData.efficiency}%</p>
          </div>
        </div>

        {/* District Selection */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3">District Monitoring</h4>
          <div className="flex flex-wrap gap-2">
            {districts.map(district => (
              <button
                key={district.id}
                onClick={() => setSelectedDistrict(district.id)}
                className={'px-4 py-2 rounded-lg transition-colors ' + (
                  selectedDistrict === district.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                {district.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected District Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Air Quality - {districts.find(d => d.id === selectedDistrict)?.name}</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">PM2.5</span>
                <span className="text-white font-semibold">
                  {sensorData.airQuality?.[selectedDistrict]?.pm25.toFixed(1)} μg/m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">PM10</span>
                <span className="text-white font-semibold">
                  {sensorData.airQuality?.[selectedDistrict]?.pm10.toFixed(1)} μg/m³
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">CO₂</span>
                <span className="text-white font-semibold">
                  {sensorData.airQuality?.[selectedDistrict]?.co2.toFixed(0)} ppm
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Status</span>
                <span className={'px-2 py-1 rounded text-xs ' + getAirQualityBg(sensorData.airQuality?.[selectedDistrict]?.status)}>
                  {sensorData.airQuality?.[selectedDistrict]?.status || 'Unknown'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Environmental Data</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temperature</span>
                <span className="text-white font-semibold">
                  {sensorData.temperature?.[selectedDistrict]?.toFixed(1)}°F
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Humidity</span>
                <span className="text-white font-semibold">
                  {sensorData.humidity?.[selectedDistrict]?.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Noise Level</span>
                <span className="text-white font-semibold">
                  {sensorData.noise?.[selectedDistrict]?.toFixed(1)} dB
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Sensors Active</span>
                <span className="text-green-400 font-semibold">
                  {Math.floor(Math.random() * 50) + 200}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTrafficManagement = () => {
    const currentTraffic = trafficData[new Date().getHours()];
    
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-green-400 mb-4">Traffic Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Downtown Traffic</p>
            <p className="text-2xl font-bold text-blue-400">
              {currentTraffic?.downtown.toLocaleString()} vehicles
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Midtown Traffic</p>
            <p className="text-2xl font-bold text-green-400">
              {currentTraffic?.midtown.toLocaleString()} vehicles
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Uptown Traffic</p>
            <p className="text-2xl font-bold text-purple-400">
              {currentTraffic?.uptown.toLocaleString()} vehicles
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Suburbs Traffic</p>
            <p className="text-2xl font-bold text-orange-400">
              {currentTraffic?.suburbs.toLocaleString()} vehicles
            </p>
          </div>
        </div>

        {/* Traffic Flow Chart */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-white mb-3">24-Hour Traffic Flow</h4>
          <div className="h-64 bg-gray-700 rounded p-4">
            <div className="flex items-end justify-between h-full">
              {trafficData.slice(0, 12).map((data, index) => {
                const maxTraffic = Math.max(...trafficData.map(d => d.downtown));
                const height = (data.downtown / maxTraffic) * 100;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-3 bg-blue-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {data.hour}:00
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Traffic Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Traffic Alerts</h4>
            <div className="space-y-2">
              <div className="bg-yellow-900/20 border border-yellow-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">⚠️</span>
                  <span className="text-yellow-300">Heavy traffic on Main Street</span>
                </div>
              </div>
              <div className="bg-green-900/20 border border-green-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-green-300">Traffic flow normal in suburbs</span>
                </div>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">🚦</span>
                  <span className="text-blue-300">Smart signals optimized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Traffic Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Average Speed</span>
                <span className="text-green-400 font-semibold">32 mph</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Congestion Level</span>
                <span className="text-yellow-400 font-semibold">Moderate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Public Transit</span>
                <span className="text-blue-400 font-semibold">85% on time</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Smart Signals</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEnergyManagement = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-yellow-400 mb-4">Energy Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Solar Power</p>
            <p className="text-2xl font-bold text-yellow-400">
              {energyData.solar.current.toFixed(1)} MW
            </p>
            <p className="text-xs text-gray-400">
              {energyData.solar.efficiency.toFixed(1)}% efficiency
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Wind Power</p>
            <p className="text-2xl font-bold text-blue-400">
              {energyData.wind.current.toFixed(1)} MW
            </p>
            <p className="text-xs text-gray-400">
              {energyData.wind.efficiency.toFixed(1)}% efficiency
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Hydro Power</p>
            <p className="text-2xl font-bold text-cyan-400">
              {energyData.hydro.current.toFixed(1)} MW
            </p>
            <p className="text-xs text-gray-400">
              {energyData.hydro.efficiency.toFixed(1)}% efficiency
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Grid Power</p>
            <p className="text-2xl font-bold text-purple-400">
              {energyData.grid.current.toFixed(1)} MW
            </p>
            <p className="text-xs text-gray-400">
              {energyData.grid.efficiency.toFixed(1)}% efficiency
            </p>
          </div>
        </div>

        {/* Energy Consumption */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Energy Consumption</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Residential</span>
                  <span className="text-blue-400">{energyData.consumption.residential}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${energyData.consumption.residential}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Commercial</span>
                  <span className="text-green-400">{energyData.consumption.commercial}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: `${energyData.consumption.commercial}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Industrial</span>
                  <span className="text-yellow-400">{energyData.consumption.industrial}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${energyData.consumption.industrial}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Smart Grid Status</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Grid Stability</span>
                <span className="text-green-400 font-semibold">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Renewable Energy</span>
                <span className="text-blue-400 font-semibold">74.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Energy Storage</span>
                <span className="text-purple-400 font-semibold">85.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Smart Meters</span>
                <span className="text-green-400 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEnvironmentalMonitoring = () => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-green-400 mb-4">Environmental Monitoring</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Waste Recycling</p>
            <p className="text-2xl font-bold text-green-400">
              {environmentalData.wasteRecycling.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Green Spaces</p>
            <p className="text-2xl font-bold text-blue-400">
              {environmentalData.greenSpaces.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Water Quality</p>
            <p className="text-2xl font-bold text-cyan-400">
              {environmentalData.waterQuality.toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded">
            <p className="text-sm text-gray-300">Biodiversity</p>
            <p className="text-2xl font-bold text-purple-400">
              {environmentalData.biodiversity.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Environmental Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Sustainability Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Carbon Footprint</span>
                <span className="text-green-400 font-semibold">-12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Air Quality Index</span>
                <span className="text-blue-400 font-semibold">Good</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Water Conservation</span>
                <span className="text-cyan-400 font-semibold">+8.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Green Buildings</span>
                <span className="text-purple-400 font-semibold">67%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded">
            <h4 className="text-md font-semibold text-white mb-3">Environmental Alerts</h4>
            <div className="space-y-2">
              <div className="bg-green-900/20 border border-green-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">✅</span>
                  <span className="text-green-300">Air quality improving in downtown</span>
                </div>
              </div>
              <div className="bg-blue-900/20 border border-blue-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">💧</span>
                  <span className="text-blue-300">Water quality excellent across city</span>
                </div>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/50 p-3 rounded">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-400">🌱</span>
                  <span className="text-yellow-300">New green spaces planned for midtown</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAIInsights = () => {
    const insights = [
      {
        category: 'Traffic Optimization',
        prediction: 'Reduce congestion by 15%',
        confidence: 0.89,
        action: 'Adjust signal timing on Main Street'
      },
      {
        category: 'Energy Efficiency',
        prediction: 'Increase renewable energy by 8%',
        confidence: 0.92,
        action: 'Activate additional solar panels'
      },
      {
        category: 'Air Quality',
        prediction: 'Improve air quality by 12%',
        confidence: 0.85,
        action: 'Implement green corridor in downtown'
      },
      {
        category: 'Public Safety',
        prediction: 'Reduce incidents by 23%',
        confidence: 0.94,
        action: 'Deploy additional smart cameras'
      }
    ];

    return (
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-semibold text-purple-400 mb-4">AI-Powered Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Predictions */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Smart City Predictions</h4>
            <div className="space-y-3">
              {insights.map((insight, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-white">{insight.category}</p>
                      <p className="text-sm text-gray-300">{insight.prediction}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-400">
                        {(insight.confidence * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-400">confidence</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                    <div 
                      className="bg-purple-400 h-2 rounded-full"
                      style={{ width: (insight.confidence * 100) + '%' }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    {insight.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Performance */}
          <div>
            <h4 className="text-md font-semibold text-white mb-3">AI System Performance</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Prediction Accuracy</span>
                  <span className="text-green-400 font-semibold">91.3%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '91.3%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Response Time</span>
                  <span className="text-blue-400 font-semibold">0.8s</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Data Processing</span>
                  <span className="text-purple-400 font-semibold">2.1M/s</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏙️ Smart City Analytics Platform</h1>
          <p className="text-gray-300 text-lg">
            IoT-powered city management with real-time monitoring, AI insights, and comprehensive urban analytics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={'px-4 py-2 rounded-lg transition-colors ' + (
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && renderCityOverview()}
          {activeTab === 'traffic' && renderTrafficManagement()}
          {activeTab === 'energy' && renderEnergyManagement()}
          {activeTab === 'environment' && renderEnvironmentalMonitoring()}
          {activeTab === 'ai' && renderAIInsights()}
        </div>
      </div>
    </div>
  );
};

export default SmartCityDemo; 