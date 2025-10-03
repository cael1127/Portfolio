import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const SmartCityDemo = () => {
  const [cityData, setCityData] = useState({});
  const [sensors, setSensors] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate smart city data
    const mockCityData = {
      population: 850000,
      energyConsumption: 1250,
      airQuality: 85,
      temperature: 22,
      humidity: 65
    };

    const mockSensors = [
      { id: 1, type: 'Traffic', location: 'Main Street', status: 'Active', value: 45 },
      { id: 2, type: 'Air Quality', location: 'City Center', status: 'Active', value: 85 },
      { id: 3, type: 'Noise', location: 'Residential', status: 'Active', value: 35 },
      { id: 4, type: 'Temperature', location: 'Park', status: 'Active', value: 22 }
    ];

    const mockTrafficData = [
      { id: 1, street: 'Main Street', congestion: 'High', speed: 25, vehicles: 150 },
      { id: 2, street: 'Oak Avenue', congestion: 'Medium', speed: 35, vehicles: 90 },
      { id: 3, street: 'Pine Road', congestion: 'Low', speed: 45, vehicles: 45 },
      { id: 4, street: 'Elm Street', congestion: 'High', speed: 20, vehicles: 180 }
    ];

    setCityData(mockCityData);
    setSensors(mockSensors);
    setTrafficData(mockTrafficData);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SmartCityDemo = () => {
  const [cityData, setCityData] = useState({});
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    // Simulate smart city data
    const mockCityData = {
      population: 850000,
      energyConsumption: 1250,
      airQuality: 85
    };
    
    setCityData(mockCityData);
  }, []);

`,
    explanation: `Smart city management system with IoT sensors, real-time monitoring, and data analytics.

## Core Implementation

**Key Features**: This demo showcases a comprehensive smart city management system with IoT sensors, real-time monitoring, and data analytics.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **IoT Integration**: Real-time sensor data collection and processing
- **Data Analytics**: Comprehensive city data analysis and insights
- **Traffic Management**: Intelligent traffic monitoring and optimization
- **Environmental Monitoring**: Air quality and environmental data tracking`,
    technologies: [
      {
        name: 'IoT Sensors',
        description: 'Real-time sensor data collection and processing',
        tags: ['IoT', 'Sensors']
      },
      {
        name: 'Data Analytics',
        description: 'Comprehensive city data analysis and insights',
        tags: ['Analytics', 'Data']
      },
      {
        name: 'Traffic Management',
        description: 'Intelligent traffic monitoring and optimization',
        tags: ['Traffic', 'Optimization']
      }
    ],
    concepts: [
      {
        name: 'IoT Integration',
        description: 'Connecting and managing multiple sensors and devices',
        example: 'const sensorData = await fetchSensorData(sensorId)'
      },
      {
        name: 'Real-time Monitoring',
        description: 'Live data streaming and processing',
        example: 'useEffect(() => { const interval = setInterval(updateData, 1000) }, [])'
      },
      {
        name: 'Data Visualization',
        description: 'Presenting complex city data in understandable formats',
        example: 'const chartData = processCityData(rawData)'
      }
    ],
    features: [
      'IoT sensor integration',
      'Real-time city monitoring',
      'Traffic management system',
      'Environmental data tracking',
      'Data analytics dashboard',
      'Predictive analytics'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart City Dashboard</h1>
          <p className="text-gray-400">IoT-powered city management and monitoring system</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* City Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Population</h3>
          <p className="text-3xl font-bold text-blue-400">{cityData.population?.toLocaleString()}</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Air Quality</h3>
          <p className="text-3xl font-bold text-green-400">{cityData.airQuality}%</p>
        </motion.div>
        <motion.div 
          className="bg-gray-800 p-6 rounded-lg text-center"
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-gray-400 text-sm">Energy Consumption</h3>
          <p className="text-3xl font-bold text-yellow-400">{cityData.energyConsumption} MW</p>
        </motion.div>
      </motion.div>

      {/* Sensors */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">IoT Sensors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensors.map((sensor, index) => (
            <motion.div 
              key={sensor.id}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{sensor.type}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  sensor.status === 'Active' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'
                }`}>
                  {sensor.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">{sensor.location}</p>
              <p className="text-2xl font-bold text-blue-400">{sensor.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Traffic Data */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Traffic Monitoring</h2>
        <div className="space-y-3">
          {trafficData.map((traffic, index) => (
            <motion.div 
              key={traffic.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  traffic.congestion === 'High' ? 'bg-red-400' : 
                  traffic.congestion === 'Medium' ? 'bg-yellow-400' : 
                  'bg-green-400'
                }`}></div>
                <div>
                  <h3 className="font-semibold text-white">{traffic.street}</h3>
                  <p className="text-sm text-gray-400">{traffic.vehicles} vehicles</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-400">{traffic.speed} km/h</p>
                <p className={`text-sm ${
                  traffic.congestion === 'High' ? 'text-red-400' : 
                  traffic.congestion === 'Medium' ? 'text-yellow-400' : 
                  'text-green-400'
                }`}>
                  {traffic.congestion} Traffic
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default SmartCityDemo;
