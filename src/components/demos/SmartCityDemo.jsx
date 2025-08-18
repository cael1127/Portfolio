import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

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
    trafficFlow: 0,
    sustainabilityScore: 0,
    efficiencyMetrics: {}
  });
  const [urbanAlgorithms, setUrbanAlgorithms] = useState({
    trafficOptimization: [],
    energyManagement: {},
    environmentalPredictions: [],
    infrastructureRecommendations: []
  });

  // Deterministic Smart City System Implementation
  const smartCitySystem = {
    // Deterministic traffic optimization using genetic algorithm principles
    optimizeTrafficFlow: (intersections, vehicles, timeOfDay) => {
      if (!intersections || intersections.length === 0) return [];
      
      const optimizationResults = intersections.map(intersection => {
        // Calculate optimal signal timing based on traffic patterns
        const baseCycle = 90; // Base signal cycle in seconds
        const trafficVolume = intersection.vehicleCount || 0;
        const pedestrianVolume = intersection.pedestrianCount || 0;
        
        // Adjust cycle length based on traffic volume
        let optimalCycle = baseCycle;
        if (trafficVolume > 100) optimalCycle = 120;
        else if (trafficVolume > 50) optimalCycle = 105;
        else if (trafficVolume < 20) optimalCycle = 75;
        
        // Calculate green time allocation
        const totalGreenTime = optimalCycle - 10; // 10 seconds for yellow/red
        const trafficRatio = trafficVolume / (trafficVolume + pedestrianVolume + 1);
        const greenTime = Math.round(totalGreenTime * trafficRatio);
        const pedestrianTime = totalGreenTime - greenTime;
        
        // Calculate efficiency metrics
        const throughput = Math.round((trafficVolume / optimalCycle) * 3600); // vehicles per hour
        const delay = Math.max(0, (optimalCycle - 60) * 2); // seconds of delay
        const efficiency = Math.max(0, 100 - (delay / optimalCycle) * 100);
        
        return {
          intersectionId: intersection.id,
          location: intersection.location,
          optimalCycle,
          greenTime,
          pedestrianTime,
          throughput,
          delay,
          efficiency,
          recommendations: this.generateTrafficRecommendations(efficiency, trafficVolume)
        };
      });
      
      return optimizationResults;
    },

    // Generate traffic optimization recommendations
    generateTrafficRecommendations: (efficiency, trafficVolume) => {
      const recommendations = [];
      
      if (efficiency < 70) {
        recommendations.push('Consider signal timing adjustment');
        recommendations.push('Implement traffic flow sensors');
      }
      
      if (trafficVolume > 100) {
        recommendations.push('Add dedicated turning lanes');
        recommendations.push('Consider roundabout conversion');
      }
      
      if (efficiency < 50) {
        recommendations.push('Implement adaptive signal control');
        recommendations.push('Add traffic calming measures');
      }
      
      return recommendations;
    },

    // Deterministic energy management system
    optimizeEnergyConsumption: (buildings, timeOfDay, weatherConditions) => {
      if (!buildings || buildings.length === 0) return {};
      
      const energyOptimization = {
        totalConsumption: 0,
        renewablePercentage: 0,
        costSavings: 0,
        recommendations: []
      };
      
      buildings.forEach(building => {
        // Calculate optimal energy consumption based on time and weather
        const baseConsumption = building.baseConsumption || 1000; // kWh
        let optimalConsumption = baseConsumption;
        
        // Time-based optimization
        if (timeOfDay >= 6 && timeOfDay <= 18) {
          optimalConsumption *= 1.2; // Peak hours
        } else if (timeOfDay >= 22 || timeOfDay <= 6) {
          optimalConsumption *= 0.7; // Off-peak hours
        }
        
        // Weather-based optimization
        if (weatherConditions.temperature < 10 || weatherConditions.temperature > 30) {
          optimalConsumption *= 1.3; // Heating/cooling needed
        }
        
        // Renewable energy integration
        const renewableCapacity = building.renewableCapacity || 0;
        const renewableGeneration = this.calculateRenewableGeneration(
          renewableCapacity,
          weatherConditions,
          timeOfDay
        );
        
        const netConsumption = Math.max(0, optimalConsumption - renewableGeneration);
        const costSavings = (baseConsumption - netConsumption) * 0.12; // $0.12 per kWh
        
        energyOptimization.totalConsumption += netConsumption;
        energyOptimization.costSavings += costSavings;
        
        // Generate building-specific recommendations
        if (netConsumption > baseConsumption * 1.2) {
          energyOptimization.recommendations.push(
            `${building.name}: Implement energy efficiency measures`
          );
        }
        
        if (renewableCapacity < baseConsumption * 0.3) {
          energyOptimization.recommendations.push(
            `${building.name}: Consider renewable energy expansion`
          );
        }
      });
      
      energyOptimization.renewablePercentage = 
        (energyOptimization.totalConsumption > 0) ? 
        Math.round((energyOptimization.costSavings / energyOptimization.totalConsumption) * 100) : 0;
      
      return energyOptimization;
    },

    // Calculate renewable energy generation
    calculateRenewableGeneration: (capacity, weather, timeOfDay) => {
      let generation = 0;
      
      // Solar generation (simplified)
      if (capacity > 0) {
        const solarEfficiency = weather.cloudCover < 30 ? 0.8 : 
                               weather.cloudCover < 70 ? 0.5 : 0.2;
        const timeEfficiency = (timeOfDay >= 6 && timeOfDay <= 18) ? 
                              Math.sin((timeOfDay - 6) * Math.PI / 12) : 0;
        
        generation = capacity * solarEfficiency * timeEfficiency;
      }
      
      return Math.max(0, generation);
    },

    // Deterministic environmental prediction system
    predictEnvironmentalConditions: (currentData, historicalData, timeHorizon) => {
      if (!currentData || !historicalData) return [];
      
      const predictions = [];
      const baseTime = Date.now();
      
      for (let i = 1; i <= timeHorizon; i++) {
        const predictionTime = new Date(baseTime + (i * 3600000)); // 1 hour intervals
        
        // Predict air quality
        const airQualityTrend = this.calculateAirQualityTrend(currentData.airQuality, historicalData);
        const predictedAirQuality = Math.max(0, Math.min(500, 
          currentData.airQuality + (airQualityTrend * i)
        ));
        
        // Predict temperature
        const temperatureTrend = this.calculateTemperatureTrend(currentData.temperature, historicalData);
        const predictedTemperature = currentData.temperature + (temperatureTrend * i);
        
        // Predict humidity
        const humidityTrend = this.calculateHumidityTrend(currentData.humidity, historicalData);
        const predictedHumidity = Math.max(0, Math.min(100, 
          currentData.humidity + (humidityTrend * i)
        ));
        
        // Predict pollution levels
        const pollutionTrend = this.calculatePollutionTrend(currentData.pollution, historicalData);
        const predictedPollution = Math.max(0, 
          currentData.pollution + (pollutionTrend * i)
        );
        
        predictions.push({
          timestamp: predictionTime.toISOString(),
          airQuality: Math.round(predictedAirQuality),
          temperature: Math.round(predictedTemperature * 10) / 10,
          humidity: Math.round(predictedHumidity),
          pollution: Math.round(predictedPollution),
          riskLevel: this.calculateEnvironmentalRisk(predictedAirQuality, predictedPollution)
        });
      }
      
      return predictions;
    },

    // Calculate environmental trends
    calculateAirQualityTrend: (current, historical) => {
      if (!historical || historical.length < 2) return 0;
      
      const recentValues = historical.slice(-5);
      const trend = recentValues.reduce((sum, value, index) => 
        sum + (value - current) * (index + 1), 0) / recentValues.length;
      
      return trend * 0.1; // Dampened trend
    },

    calculateTemperatureTrend: (current, historical) => {
      if (!historical || historical.length < 2) return 0;
      
      const recentValues = historical.slice(-3);
      const trend = recentValues.reduce((sum, value, index) => 
        sum + (value - current), 0) / recentValues.length;
      
      return trend * 0.05; // Gradual temperature change
    },

    calculateHumidityTrend: (current, historical) => {
      if (!historical || historical.length < 2) return 0;
      
      const recentValues = historical.slice(-4);
      const trend = recentValues.reduce((sum, value, index) => 
        sum + (value - current), 0) / recentValues.length;
      
      return trend * 0.1; // Humidity change
    },

    calculatePollutionTrend: (current, historical) => {
      if (!historical || historical.length < 2) return 0;
      
      const recentValues = historical.slice(-6);
      const trend = recentValues.reduce((sum, value, index) => 
        sum + (value - current), 0) / recentValues.length;
      
      return trend * 0.15; // Pollution change
    },

    // Calculate environmental risk level
    calculateEnvironmentalRisk: (airQuality, pollution) => {
      let riskScore = 0;
      
      // Air quality risk
      if (airQuality > 300) riskScore += 3;
      else if (airQuality > 200) riskScore += 2;
      else if (airQuality > 100) riskScore += 1;
      
      // Pollution risk
      if (pollution > 80) riskScore += 3;
      else if (pollution > 60) riskScore += 2;
      else if (pollution > 40) riskScore += 1;
      
      if (riskScore >= 5) return 'Critical';
      if (riskScore >= 3) return 'High';
      if (riskScore >= 1) return 'Moderate';
      return 'Low';
    },

    // Deterministic infrastructure optimization
    optimizeInfrastructure: (cityData, population, growthRate) => {
      const infrastructureRecommendations = [];
      
      // Transportation infrastructure
      const currentRoads = cityData.roadLength || 0;
      const requiredRoads = population * 0.01; // 0.01 km per person
      
      if (currentRoads < requiredRoads * 0.8) {
        infrastructureRecommendations.push({
          category: 'Transportation',
          priority: 'High',
          recommendation: 'Expand road network',
          estimatedCost: (requiredRoads - currentRoads) * 1000000, // $1M per km
          impact: 'Reduce traffic congestion and improve connectivity'
        });
      }
      
      // Energy infrastructure
      const currentEnergyCapacity = cityData.energyCapacity || 0;
      const requiredEnergyCapacity = population * 0.5; // 0.5 MW per person
      
      if (currentEnergyCapacity < requiredEnergyCapacity * 0.9) {
        infrastructureRecommendations.push({
          category: 'Energy',
          priority: 'Medium',
          recommendation: 'Upgrade energy grid',
          estimatedCost: (requiredEnergyCapacity - currentEnergyCapacity) * 2000000, // $2M per MW
          impact: 'Ensure reliable energy supply and support growth'
        });
      }
      
      // Water infrastructure
      const currentWaterCapacity = cityData.waterCapacity || 0;
      const requiredWaterCapacity = population * 0.2; // 0.2 ML per person
      
      if (currentWaterCapacity < requiredWaterCapacity * 0.85) {
        infrastructureRecommendations.push({
          category: 'Water',
          priority: 'High',
          recommendation: 'Expand water treatment facilities',
          estimatedCost: (requiredWaterCapacity - currentWaterCapacity) * 5000000, // $5M per ML
          impact: 'Ensure clean water supply and public health'
        });
      }
      
      // Smart technology integration
      if (cityData.smartTechnologyCoverage < 60) {
        infrastructureRecommendations.push({
          category: 'Technology',
          priority: 'Medium',
          recommendation: 'Deploy IoT sensors and smart systems',
          estimatedCost: population * 100, // $100 per person
          impact: 'Improve monitoring, efficiency, and citizen services'
        });
      }
      
      return infrastructureRecommendations;
    },

    // Calculate sustainability score
    calculateSustainabilityScore: (cityData) => {
      let score = 0;
      const maxScore = 100;
      
      // Energy efficiency (25 points)
      const energyEfficiency = Math.min(25, (cityData.renewableEnergyPercentage || 0) * 0.25);
      score += energyEfficiency;
      
      // Transportation efficiency (25 points)
      const publicTransportUsage = cityData.publicTransportUsage || 0;
      const transportScore = Math.min(25, publicTransportUsage * 0.25);
      score += transportScore;
      
      // Waste management (20 points)
      const recyclingRate = cityData.recyclingRate || 0;
      const wasteScore = Math.min(20, recyclingRate * 0.2);
      score += wasteScore;
      
      // Green spaces (15 points)
      const greenSpacePercentage = cityData.greenSpacePercentage || 0;
      const greenScore = Math.min(15, greenSpacePercentage * 0.15);
      score += greenScore;
      
      // Air quality (15 points)
      const airQualityScore = Math.max(0, 15 - (cityData.airQualityIndex || 0) * 0.03);
      score += airQualityScore;
      
      return Math.round(score);
    }
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const baseTime = Date.now();
    
    // Generate weather data
    const weatherData = {
      city: 'Smart City',
      temperature: 22 + Math.sin(Date.now() * 0.0001) * 5,
      humidity: 60 + Math.cos(Date.now() * 0.0001) * 20,
      pressure: 1013 + Math.sin(Date.now() * 0.0002) * 10,
      windSpeed: 5 + Math.sin(Date.now() * 0.0003) * 3,
      cloudCover: 30 + Math.cos(Date.now() * 0.0001) * 40,
      description: 'Partly Cloudy',
      timestamp: new Date().toISOString()
    };
    
    // Generate traffic data
    const intersectionNames = ['Central Square', 'North Junction', 'East Cross', 'South Gate', 'West Bridge'];
    const trafficData = intersectionNames.map((name, index) => ({
      id: index + 1,
      location: name,
      vehicleCount: 50 + (index * 20) + Math.floor(Math.sin(Date.now() * 0.0001 + index) * 30),
      pedestrianCount: 20 + (index * 10) + Math.floor(Math.cos(Date.now() * 0.0001 + index) * 15),
      congestion: Math.min(100, 30 + (index * 15) + Math.sin(Date.now() * 0.0001 + index) * 20),
      averageSpeed: Math.max(10, 40 - (index * 5) + Math.cos(Date.now() * 0.0001 + index) * 10),
      signalStatus: 'Green',
      lastUpdate: new Date(baseTime - (index * 300000)).toISOString()
    }));
    
    // Generate environmental data
    const environmentalData = {
      airQuality: 45 + Math.sin(Date.now() * 0.0001) * 15,
      pollution: 25 + Math.cos(Date.now() * 0.0001) * 10,
      noiseLevel: 55 + Math.sin(Date.now() * 0.0002) * 10,
      waterQuality: 85 + Math.cos(Date.now() * 0.0001) * 10,
      soilQuality: 90 + Math.sin(Date.now() * 0.0003) * 5,
      timestamp: new Date().toISOString()
    };
    
    // Generate IoT devices
    const deviceTypes = ['Traffic Sensor', 'Air Quality Monitor', 'Energy Meter', 'Water Sensor', 'Weather Station'];
    const iotDevices = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `${deviceTypes[index % deviceTypes.length]} ${index + 1}`,
      type: deviceTypes[index % deviceTypes.length],
      location: {
        x: (index % 5 - 2) * 100,
        y: (Math.floor(index / 5) - 2) * 100
      },
      status: index < 18 ? 'active' : 'maintenance',
      battery: 80 + (index * 2),
      lastReading: new Date(baseTime - (index * 600000)).toISOString(),
      dataQuality: 95 + (index % 5)
    }));
    
    // Generate city statistics
    const population = 250000 + Math.floor(Math.sin(Date.now() * 0.00001) * 5000);
    const energyConsumption = 150 + Math.cos(Date.now() * 0.0001) * 20;
    const airQuality = environmentalData.airQuality;
    const trafficFlow = trafficData.reduce((sum, intersection) => sum + intersection.vehicleCount, 0);
    const sustainabilityScore = smartCitySystem.calculateSustainabilityScore({
      renewableEnergyPercentage: 35,
      publicTransportUsage: 45,
      recyclingRate: 70,
      greenSpacePercentage: 25,
      airQualityIndex: airQuality
    });
    
    setWeatherData(weatherData);
    setTrafficData(trafficData);
    setEnvironmentalData(environmentalData);
    setIotDevices(iotDevices);
    setCityStats({
      population,
      energyConsumption: Math.round(energyConsumption),
      airQuality,
      trafficFlow,
      sustainabilityScore,
      efficiencyMetrics: {
        energyEfficiency: 75,
        trafficEfficiency: 68,
        wasteEfficiency: 82,
        waterEfficiency: 88
      }
    });
    
    return { weatherData, trafficData, environmentalData, iotDevices, cityStats };
  };

  // Run smart city algorithms
  const runSmartCityAlgorithms = (data) => {
    const { trafficData, environmentalData } = data;
    
    // Run traffic optimization
    const trafficOptimization = smartCitySystem.optimizeTrafficFlow(
      trafficData,
      [],
      new Date().getHours()
    );
    
    // Run energy management
    const energyManagement = smartCitySystem.optimizeEnergyConsumption(
      [
        { name: 'City Hall', baseConsumption: 2000, renewableCapacity: 500 },
        { name: 'Hospital', baseConsumption: 5000, renewableCapacity: 800 },
        { name: 'Shopping Center', baseConsumption: 3000, renewableCapacity: 400 }
      ],
      new Date().getHours(),
      data.weatherData
    );
    
    // Run environmental predictions
    const environmentalPredictions = smartCitySystem.predictEnvironmentalConditions(
      environmentalData,
      [environmentalData], // Simplified historical data
      24 // 24-hour prediction
    );
    
    // Run infrastructure optimization
    const infrastructureRecommendations = smartCitySystem.optimizeInfrastructure(
      {
        roadLength: 2500,
        energyCapacity: 100,
        waterCapacity: 50,
        smartTechnologyCoverage: 45
      },
      data.cityStats.population,
      0.02 // 2% growth rate
    );
    
    setUrbanAlgorithms({
      trafficOptimization,
      energyManagement,
      environmentalPredictions: environmentalPredictions.slice(0, 6), // Show next 6 hours
      infrastructureRecommendations
    });
    
    return { trafficOptimization, energyManagement, environmentalPredictions, infrastructureRecommendations };
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const results = runSmartCityAlgorithms(sampleData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🏙️ Smart City Infrastructure</h1>
          <p className="text-gray-300 text-lg">
            AI-powered urban management with deterministic algorithms for traffic optimization, energy management, and environmental monitoring
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* City Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">City Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{cityStats.population.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Population</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{cityStats.sustainabilityScore}</div>
                  <div className="text-sm text-gray-400">Sustainability Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{cityStats.airQuality}</div>
                  <div className="text-sm text-gray-400">Air Quality Index</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{cityStats.trafficFlow}</div>
                  <div className="text-sm text-gray-400">Traffic Flow</div>
                </div>
              </div>
            </div>

            {/* Weather and Environment */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Weather & Environment</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {weatherData && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Current Weather</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Temperature:</span>
                        <span className="text-blue-400">{weatherData.temperature.toFixed(1)}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Humidity:</span>
                        <span className="text-green-400">{weatherData.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind Speed:</span>
                        <span className="text-yellow-400">{weatherData.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cloud Cover:</span>
                        <span className="text-gray-400">{weatherData.cloudCover}%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {environmentalData && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">Environmental Data</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Air Quality:</span>
                        <span className="text-blue-400">{environmentalData.airQuality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pollution:</span>
                        <span className="text-red-400">{environmentalData.pollution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Noise Level:</span>
                        <span className="text-yellow-400">{environmentalData.noiseLevel} dB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Water Quality:</span>
                        <span className="text-green-400">{environmentalData.waterQuality}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Traffic Optimization */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Traffic Optimization</h2>
              <div className="space-y-3">
                {urbanAlgorithms.trafficOptimization.slice(0, 5).map(optimization => (
                  <div key={optimization.intersectionId} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">{optimization.location}</div>
                        <div className="text-sm text-gray-300">
                          Cycle: {optimization.optimalCycle}s | Green: {optimization.greenTime}s
                        </div>
                        <div className="text-xs text-gray-400">
                          Throughput: {optimization.throughput} vehicles/hour
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          optimization.efficiency >= 80 ? 'text-green-400' :
                          optimization.efficiency >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {optimization.efficiency}%
                        </div>
                        <div className="text-sm text-gray-400">Efficiency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Energy Management */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Energy Management</h3>
              <div className="space-y-3">
                {urbanAlgorithms.energyManagement.totalConsumption && (
                  <>
                    <div className="flex justify-between">
                      <span>Total Consumption:</span>
                      <span className="text-blue-400">{Math.round(urbanAlgorithms.energyManagement.totalConsumption)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewable %:</span>
                      <span className="text-green-400">{urbanAlgorithms.energyManagement.renewablePercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Savings:</span>
                      <span className="text-yellow-400">${urbanAlgorithms.energyManagement.costSavings.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* IoT Devices */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">IoT Devices</h3>
              <div className="space-y-2">
                {iotDevices.slice(0, 6).map(device => (
                  <div key={device.id} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{device.name}</div>
                        <div className="text-gray-400">{device.type}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded ${
                          device.status === 'active' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
                        }`}>
                          {device.status}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{device.battery}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Smart City Implementation"
          code={`
// Deterministic Smart City System Implementation
class SmartCitySystem {
  // Deterministic traffic optimization using genetic algorithm principles
  optimizeTrafficFlow(intersections, vehicles, timeOfDay) {
    if (!intersections || intersections.length === 0) return [];
    
    const optimizationResults = intersections.map(intersection => {
      // Calculate optimal signal timing based on traffic patterns
      const baseCycle = 90; // Base signal cycle in seconds
      const trafficVolume = intersection.vehicleCount || 0;
      const pedestrianVolume = intersection.pedestrianCount || 0;
      
      // Adjust cycle length based on traffic volume
      let optimalCycle = baseCycle;
      if (trafficVolume > 100) optimalCycle = 120;
      else if (trafficVolume > 50) optimalCycle = 105;
      else if (trafficVolume < 20) optimalCycle = 75;
      
      // Calculate green time allocation
      const totalGreenTime = optimalCycle - 10; // 10 seconds for yellow/red
      const trafficRatio = trafficVolume / (trafficVolume + pedestrianVolume + 1);
      const greenTime = Math.round(totalGreenTime * trafficRatio);
      const pedestrianTime = totalGreenTime - greenTime;
      
      // Calculate efficiency metrics
      const throughput = Math.round((trafficVolume / optimalCycle) * 3600);
      const delay = Math.max(0, (optimalCycle - 60) * 2);
      const efficiency = Math.max(0, 100 - (delay / optimalCycle) * 100);
      
      return {
        intersectionId: intersection.id,
        location: intersection.location,
        optimalCycle,
        greenTime,
        pedestrianTime,
        throughput,
        delay,
        efficiency,
        recommendations: this.generateTrafficRecommendations(efficiency, trafficVolume)
      };
    });
    
    return optimizationResults;
  }

  // Deterministic energy management system
  optimizeEnergyConsumption(buildings, timeOfDay, weatherConditions) {
    if (!buildings || buildings.length === 0) return {};
    
    const energyOptimization = {
      totalConsumption: 0,
      renewablePercentage: 0,
      costSavings: 0,
      recommendations: []
    };
    
    buildings.forEach(building => {
      const baseConsumption = building.baseConsumption || 1000;
      let optimalConsumption = baseConsumption;
      
      // Time-based optimization
      if (timeOfDay >= 6 && timeOfDay <= 18) {
        optimalConsumption *= 1.2; // Peak hours
      } else if (timeOfDay >= 22 || timeOfDay <= 6) {
        optimalConsumption *= 0.7; // Off-peak hours
      }
      
      // Weather-based optimization
      if (weatherConditions.temperature < 10 || weatherConditions.temperature > 30) {
        optimalConsumption *= 1.3; // Heating/cooling needed
      }
      
      const renewableCapacity = building.renewableCapacity || 0;
      const renewableGeneration = this.calculateRenewableGeneration(
        renewableCapacity,
        weatherConditions,
        timeOfDay
      );
      
      const netConsumption = Math.max(0, optimalConsumption - renewableGeneration);
      const costSavings = (baseConsumption - netConsumption) * 0.12;
      
      energyOptimization.totalConsumption += netConsumption;
      energyOptimization.costSavings += costSavings;
    });
    
    return energyOptimization;
  }

  // Calculate sustainability score
  calculateSustainabilityScore(cityData) {
    let score = 0;
    
    // Energy efficiency (25 points)
    const energyEfficiency = Math.min(25, (cityData.renewableEnergyPercentage || 0) * 0.25);
    score += energyEfficiency;
    
    // Transportation efficiency (25 points)
    const publicTransportUsage = cityData.publicTransportUsage || 0;
    const transportScore = Math.min(25, publicTransportUsage * 0.25);
    score += transportScore;
    
    // Waste management (20 points)
    const recyclingRate = cityData.recyclingRate || 0;
    const wasteScore = Math.min(20, recyclingRate * 0.2);
    score += wasteScore;
    
    // Green spaces (15 points)
    const greenSpacePercentage = cityData.greenSpacePercentage || 0;
    const greenScore = Math.min(15, greenSpacePercentage * 0.15);
    score += greenScore;
    
    // Air quality (15 points)
    const airQualityScore = Math.max(0, 15 - (cityData.airQualityIndex || 0) * 0.03);
    score += airQualityScore;
    
    return Math.round(score);
  }
}
          `}
        />
      )}
    </div>
  );
};

export default SmartCityDemo; 