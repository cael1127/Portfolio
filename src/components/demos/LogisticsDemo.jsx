import React, { useState, useEffect } from 'react';

const LogisticsDemo = () => {
  const [fleet, setFleet] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [systemStats, setSystemStats] = useState({
    totalVehicles: 0,
    activeDeliveries: 0,
    totalDistance: 0,
    fuelEfficiency: 0
  });

  // Initialize fleet with vehicles
  useEffect(() => {
    const initialFleet = [
      {
        id: 1,
        name: 'Truck-001',
        type: 'Semi-Trailer',
        status: 'active',
        driver: 'John Smith',
        currentLocation: 'Houston, TX',
        destination: 'Dallas, TX',
        cargo: 'Electronics',
        weight: 15000,
        fuelLevel: 85,
        speed: 65,
        eta: '2 hours',
        route: [
          { lat: 29.7604, lng: -95.3698, name: 'Houston' },
          { lat: 30.2672, lng: -97.7431, name: 'Austin' },
          { lat: 32.7767, lng: -96.7970, name: 'Dallas' }
        ]
      },
      {
        id: 2,
        name: 'Van-002',
        type: 'Delivery Van',
        status: 'active',
        driver: 'Sarah Johnson',
        currentLocation: 'Austin, TX',
        destination: 'San Antonio, TX',
        cargo: 'Pharmaceuticals',
        weight: 2000,
        fuelLevel: 92,
        speed: 55,
        eta: '1.5 hours',
        route: [
          { lat: 30.2672, lng: -97.7431, name: 'Austin' },
          { lat: 29.4241, lng: -98.4936, name: 'San Antonio' }
        ]
      },
      {
        id: 3,
        name: 'Truck-003',
        type: 'Refrigerated',
        status: 'maintenance',
        driver: 'Mike Davis',
        currentLocation: 'Maintenance Bay',
        destination: 'N/A',
        cargo: 'Frozen Foods',
        weight: 0,
        fuelLevel: 45,
        speed: 0,
        eta: 'N/A',
        route: []
      }
    ];
    setFleet(initialFleet);
    setSystemStats({
      totalVehicles: initialFleet.length,
      activeDeliveries: initialFleet.filter(v => v.status === 'active').length,
      totalDistance: 1250,
      fuelEfficiency: 8.5
    });
  }, []);

  // Simulate real-time fleet updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFleet(prevFleet => prevFleet.map(vehicle => {
        if (vehicle.status === 'active') {
          return {
            ...vehicle,
            fuelLevel: Math.max(0, vehicle.fuelLevel - Math.random() * 0.5),
            speed: vehicle.speed + (Math.random() - 0.5) * 5,
            eta: vehicle.eta === '2 hours' ? '1.8 hours' : 
                  vehicle.eta === '1.5 hours' ? '1.3 hours' : vehicle.eta
          };
        }
        return vehicle;
      }));

      setSystemStats(prev => ({
        ...prev,
        totalDistance: prev.totalDistance + Math.random() * 10,
        fuelEfficiency: Math.max(7, Math.min(10, prev.fuelEfficiency + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate optimized routes
  useEffect(() => {
    const newRoutes = [
      {
        id: 1,
        name: 'Houston to Dallas',
        distance: 240,
        duration: '3.5 hours',
        fuelCost: 180,
        stops: 2,
        optimization: 'AI-optimized',
        status: 'active'
      },
      {
        id: 2,
        name: 'Austin to San Antonio',
        distance: 80,
        duration: '1.2 hours',
        fuelCost: 60,
        stops: 1,
        optimization: 'Real-time traffic',
        status: 'active'
      },
      {
        id: 3,
        name: 'Dallas to Houston',
        distance: 240,
        duration: '3.8 hours',
        fuelCost: 190,
        stops: 3,
        optimization: 'Weather-adjusted',
        status: 'planned'
      }
    ];
    setRoutes(newRoutes);
  }, []);

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
          <h1 className="text-4xl font-bold text-green-400 mb-4">🚚 Smart Logistics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered fleet management with real-time tracking, route optimization, and predictive analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">🚛</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Vehicles</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalVehicles}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Deliveries</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeDeliveries}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🛣️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Distance</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.totalDistance.toFixed(0)} km</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="text-xl font-semibold text-white mb-2">Fuel Efficiency</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.fuelEfficiency.toFixed(1)} mpg</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fleet Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Fleet Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {fleet.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedVehicle?.id === vehicle.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                        <p className="text-gray-400 text-sm">{vehicle.type} • {vehicle.driver}</p>
                        <p className={'text-sm ' + getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </p>
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(vehicle.status)}>
                          {vehicle.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${getStatusBg(vehicle.status)}`}>
                          {vehicle.cargo}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{vehicle.weight} lbs</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Current Location</p>
                        <p className="text-white">{vehicle.currentLocation}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Destination</p>
                        <p className="text-white">{vehicle.destination}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Speed</p>
                        <p className="text-white">{vehicle.speed.toFixed(0)} mph</p>
                      </div>
                      <div>
                        <p className="text-gray-400">ETA</p>
                        <p className="text-white">{vehicle.eta}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Fuel Level</span>
                        <span>{vehicle.fuelLevel.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                            vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Optimization */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🛣️ Route Optimization</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {routes.map((route) => (
                  <div key={route.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{route.name}</p>
                        <p className="text-blue-200 text-sm">{route.distance} km • {route.duration}</p>
                        <p className="text-gray-300 text-xs">{route.optimization}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        route.status === 'active' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                      }`}>
                        {route.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Fuel Cost: ${route.fuelCost}</span>
                      <span>{route.stops} stops</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Fleet Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Optimize All Routes
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Check Fuel Levels
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Maintenance Alert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        {selectedVehicle && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedVehicle.name} Details</h2>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Vehicle Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Type</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Driver</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.driver}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Cargo</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.cargo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Weight</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.weight.toLocaleString()} lbs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={'px-2 py-1 rounded text-sm ' + getStatusBg(selectedVehicle.status)}>
                      {selectedVehicle.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Current Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Location</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.currentLocation}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Destination</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.destination}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Speed</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.speed.toFixed(0)} mph</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ETA</span>
                    <span className="text-lg font-semibold text-white">{selectedVehicle.eta}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Fuel Level</span>
                    <span className={`text-lg font-semibold ${
                      selectedVehicle.fuelLevel < 30 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {selectedVehicle.fuelLevel.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 AI-Powered Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Route Optimization</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time traffic analysis</li>
                <li>• Weather condition routing</li>
                <li>• Fuel efficiency optimization</li>
                <li>• Dynamic route adjustment</li>
                <li>• Multi-stop optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Predictive Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Maintenance prediction</li>
                <li>• Fuel consumption forecasting</li>
                <li>• Delivery time estimation</li>
                <li>• Risk assessment</li>
                <li>• Cost optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Fleet Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time GPS tracking</li>
                <li>• Driver behavior monitoring</li>
                <li>• Cargo security tracking</li>
                <li>• Automated dispatching</li>
                <li>• Performance analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsDemo; 