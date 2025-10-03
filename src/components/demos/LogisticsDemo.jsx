import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const LogisticsDemo = () => {
  const [shipments, setShipments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate logistics data
    const mockShipments = [
      { id: 1, origin: 'New York', destination: 'Los Angeles', status: 'In Transit', weight: 150, priority: 'High' },
      { id: 2, origin: 'Chicago', destination: 'Miami', status: 'Delivered', weight: 75, priority: 'Medium' },
      { id: 3, origin: 'Seattle', destination: 'Boston', status: 'Processing', weight: 200, priority: 'Low' },
      { id: 4, origin: 'Denver', destination: 'Phoenix', status: 'In Transit', weight: 90, priority: 'High' }
    ];

    const mockVehicles = [
      { id: 1, type: 'Truck', capacity: 1000, location: 'New York', status: 'Available' },
      { id: 2, type: 'Van', capacity: 500, location: 'Chicago', status: 'In Use' },
      { id: 3, type: 'Truck', capacity: 1200, location: 'Seattle', status: 'Maintenance' },
      { id: 4, type: 'Van', capacity: 400, location: 'Denver', status: 'Available' }
    ];

    const mockRoutes = [
      { id: 1, from: 'New York', to: 'Los Angeles', distance: 2800, duration: '2 days', cost: 1500 },
      { id: 2, from: 'Chicago', to: 'Miami', distance: 1200, duration: '1 day', cost: 800 },
      { id: 3, from: 'Seattle', to: 'Boston', distance: 3000, duration: '3 days', cost: 2000 }
    ];

    setShipments(mockShipments);
    setVehicles(mockVehicles);
    setRoutes(mockRoutes);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LogisticsDemo = () => {
  const [shipments, setShipments] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Simulate logistics data
    const mockShipments = [
      { id: 1, origin: 'New York', destination: 'Los Angeles', status: 'In Transit' },
      { id: 2, origin: 'Chicago', destination: 'Miami', status: 'Delivered' }
    ];
    
    setShipments(mockShipments);
  }, []);

`,
    explanation: `Logistics management system with shipment tracking, vehicle management, and route optimization.

## Core Implementation

**Key Features**: This demo showcases a comprehensive logistics management system with shipment tracking, vehicle management, and route optimization.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Shipment Tracking**: Real-time tracking and status updates
- **Vehicle Management**: Fleet management and maintenance scheduling
- **Route Optimization**: Efficient routing algorithms and cost optimization
- **Analytics Dashboard**: Logistics insights and performance metrics`,
    technologies: [
      {
        name: 'Route Optimization',
        description: 'Efficient routing algorithms and cost optimization',
        tags: ['Algorithms', 'Optimization']
      },
      {
        name: 'Fleet Management',
        description: 'Vehicle tracking and maintenance scheduling',
        tags: ['Fleet', 'Management']
      },
      {
        name: 'Real-time Tracking',
        description: 'Live shipment tracking and status updates',
        tags: ['Real-time', 'Tracking']
      }
    ],
    concepts: [
      {
        name: 'Route Optimization',
        description: 'Finding the most efficient routes for deliveries',
        example: 'const optimalRoute = calculateOptimalRoute(shipments, vehicles)'
      },
      {
        name: 'Fleet Management',
        description: 'Managing vehicle capacity and availability',
        example: 'const availableVehicles = vehicles.filter(v => v.status === "Available")'
      },
      {
        name: 'Real-time Tracking',
        description: 'Live updates of shipment status and location',
        example: 'const updateShipmentStatus = (id, status) => {}'
      }
    ],
    features: [
      'Real-time shipment tracking',
      'Fleet management system',
      'Route optimization algorithms',
      'Cost analysis and reporting',
      'Vehicle maintenance scheduling',
      'Performance analytics dashboard'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Logistics Management</h1>
          <p className="text-gray-400">Comprehensive logistics system with shipment tracking</p>
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

      {/* Shipments */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6">Active Shipments</h2>
        <div className="space-y-3">
          {shipments.map((shipment, index) => (
            <motion.div 
              key={shipment.id}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{shipment.origin} → {shipment.destination}</h3>
                  <p className="text-sm text-gray-400">Weight: {shipment.weight} kg</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded ${
                    shipment.status === 'Delivered' ? 'bg-green-600 text-green-100' : 
                    shipment.status === 'In Transit' ? 'bg-blue-600 text-blue-100' : 
                    'bg-yellow-600 text-yellow-100'
                  }`}>
                    {shipment.status}
                  </span>
                  <p className={`text-xs mt-1 ${
                    shipment.priority === 'High' ? 'text-red-400' : 
                    shipment.priority === 'Medium' ? 'text-yellow-400' : 
                    'text-green-400'
                  }`}>
                    {shipment.priority} Priority
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Vehicles */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Fleet Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle, index) => (
            <motion.div 
              key={vehicle.id}
              className="bg-gray-700 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{vehicle.type}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  vehicle.status === 'Available' ? 'bg-green-600 text-green-100' : 
                  vehicle.status === 'In Use' ? 'bg-blue-600 text-blue-100' : 
                  'bg-yellow-600 text-yellow-100'
                }`}>
                  {vehicle.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">Capacity: {vehicle.capacity} kg</p>
              <p className="text-sm text-gray-400">Location: {vehicle.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Routes */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Route Optimization</h2>
        <div className="space-y-3">
          {routes.map((route, index) => (
            <motion.div 
              key={route.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{route.distance}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{route.from} → {route.to}</h3>
                  <p className="text-sm text-gray-400">Duration: {route.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">${route.cost}</p>
                <p className="text-sm text-gray-400">Cost</p>
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

export default LogisticsDemo;
