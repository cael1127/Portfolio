import React, { useState, useEffect } from 'react';

export default function LogisticsDemo() {
  const [vehicles, setVehicles] = useState([
    { id: 1, name: 'Truck A-101', driver: 'John Smith', status: 'en_route', location: 'Houston, TX', eta: '2:30 PM', route: 'Houston → Dallas' },
    { id: 2, name: 'Truck B-202', driver: 'Sarah Johnson', status: 'loading', location: 'Austin, TX', eta: '4:15 PM', route: 'Austin → San Antonio' },
    { id: 3, name: 'Truck C-303', driver: 'Mike Davis', status: 'delivered', location: 'Dallas, TX', eta: 'Completed', route: 'Dallas → Fort Worth' },
    { id: 4, name: 'Truck D-404', driver: 'Lisa Wilson', status: 'en_route', location: 'San Antonio, TX', eta: '1:45 PM', route: 'San Antonio → Houston' },
  ]);

  const [optimizedRoutes, setOptimizedRoutes] = useState([
    { id: 1, origin: 'Houston', destination: 'Dallas', distance: '240 mi', fuel: '85%', traffic: 'Low', eta: '2:30 PM' },
    { id: 2, origin: 'Austin', destination: 'San Antonio', distance: '80 mi', fuel: '92%', traffic: 'Medium', eta: '4:15 PM' },
    { id: 3, origin: 'San Antonio', destination: 'Houston', distance: '200 mi', fuel: '78%', traffic: 'High', eta: '1:45 PM' },
  ]);

  const [analytics, setAnalytics] = useState({
    totalDeliveries: 156,
    onTimeRate: 94.2,
    fuelEfficiency: 87.5,
    avgDeliveryTime: '3.2 hours'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        eta: vehicle.status === 'en_route' ? 
          `${Math.floor(Math.random() * 2) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} PM` : 
          vehicle.eta
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'en_route': return 'text-green-400';
      case 'loading': return 'text-yellow-400';
      case 'delivered': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'en_route': return 'bg-green-600';
      case 'loading': return 'bg-yellow-600';
      case 'delivered': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-white mb-6">🚚 Smart Logistics Platform</h3>
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Vehicle Fleet */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Live Fleet Tracking</h4>
            <div className="space-y-4">
              {vehicles.map(vehicle => (
                <div key={vehicle.id} className="bg-gray-700 p-4 rounded border border-gray-600">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-semibold text-white">{vehicle.name}</h5>
                      <p className="text-gray-400 text-sm">Driver: {vehicle.driver}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(vehicle.status)} text-white`}>
                      {vehicle.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className="text-white">{vehicle.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Route</p>
                      <p className="text-white">{vehicle.route}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">ETA</p>
                      <p className={`font-medium ${getStatusColor(vehicle.status)}`}>{vehicle.eta}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-4">Performance Analytics</h4>
            <div className="space-y-4">
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Total Deliveries</p>
                <p className="text-2xl font-bold text-green-400">{analytics.totalDeliveries}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">On-Time Rate</p>
                <p className="text-2xl font-bold text-green-400">{analytics.onTimeRate}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Fuel Efficiency</p>
                <p className="text-2xl font-bold text-green-400">{analytics.fuelEfficiency}%</p>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-gray-400 text-sm">Avg Delivery Time</p>
                <p className="text-2xl font-bold text-green-400">{analytics.avgDeliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Route Optimization */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mt-6">
            <h4 className="text-xl font-semibold text-white mb-4">AI Route Optimization</h4>
            <div className="space-y-3">
              {optimizedRoutes.map(route => (
                <div key={route.id} className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{route.origin} → {route.destination}</span>
                    <span className="text-green-400 font-medium">{route.eta}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-400">Distance</p>
                      <p className="text-white">{route.distance}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Fuel</p>
                      <p className="text-white">{route.fuel}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Traffic</p>
                      <p className={`${
                        route.traffic === 'Low' ? 'text-green-400' : 
                        route.traffic === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                      }`}>{route.traffic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-xl font-semibold text-white mb-4">Real-time Map View</h4>
        <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-400">Interactive map showing vehicle locations and optimized routes</p>
            <p className="text-gray-500 text-sm mt-2">Real-time GPS tracking with traffic integration</p>
          </div>
        </div>
      </div>
    </div>
  );
} 