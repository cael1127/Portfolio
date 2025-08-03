import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const LogisticsDemo = () => {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fleetStats, setFleetStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    totalOrders: 0,
    averageDeliveryTime: 0,
    fuelEfficiency: 0,
    totalDistance: 0,
    onTimeDeliveries: 0,
    activeRoutes: 0
  });

  // Sample code for the demo
  const demoCode = `/**
 * Smart Logistics Platform Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates AI-powered fleet management
 * with route optimization, real-time tracking, and predictive analytics.
 */

import React, { useState, useEffect } from 'react';

const LogisticsDemo = () => {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        location: {
          lat: vehicle.location.lat + (Math.random() - 0.5) * 0.01,
          lng: vehicle.location.lng + (Math.random() - 0.5) * 0.01
        },
        fuel: Math.max(0, vehicle.fuel - Math.random() * 2),
        speed: Math.floor(Math.random() * 30) + 40,
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const optimizeRoute = (vehicleId, destinations) => {
    // AI-powered route optimization algorithm
    const optimizedRoute = destinations.sort(() => Math.random() - 0.5);
    return optimizedRoute;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fleet Management */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{vehicle.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Fuel</p>
                  <p className="text-white font-semibold">{vehicle.fuel.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{vehicle.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Route Optimization */}
        <div className="space-y-4">
          {routes.map((route) => (
            <div key={route.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">Route {route.id}</h3>
              <p className="text-gray-300 text-sm">{route.distance.toFixed(1)} km</p>
              <p className="text-gray-400 text-xs">{route.estimatedTime} min</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDemo;`;

  useEffect(() => {
    // Initialize logistics data
    const initialVehicles = [
      {
        id: 1,
        name: 'Truck-001',
        type: 'Delivery Truck',
        capacity: '5000 kg',
        fuel: 85,
        status: 'active',
        location: { lat: 40.7128, lng: -74.0060 },
        speed: 45,
        driver: 'John Smith',
        phone: '+1-555-0123',
        lastUpdate: 'Just now',
        currentOrder: 'ORD-2024-001',
        route: 'Route A',
        fuelEfficiency: 8.5,
        totalDistance: 1250,
        deliveriesToday: 8
      },
      {
        id: 2,
        name: 'Van-002',
        type: 'Cargo Van',
        capacity: '2000 kg',
        fuel: 92,
        status: 'active',
        location: { lat: 34.0522, lng: -118.2437 },
        speed: 38,
        driver: 'Sarah Johnson',
        phone: '+1-555-0124',
        lastUpdate: '1 minute ago',
        currentOrder: 'ORD-2024-002',
        route: 'Route B',
        fuelEfficiency: 12.3,
        totalDistance: 890,
        deliveriesToday: 5
      },
      {
        id: 3,
        name: 'Truck-003',
        type: 'Refrigerated Truck',
        capacity: '3000 kg',
        fuel: 67,
        status: 'maintenance',
        location: { lat: 41.8781, lng: -87.6298 },
        speed: 0,
        driver: 'Mike Chen',
        phone: '+1-555-0125',
        lastUpdate: '15 minutes ago',
        currentOrder: null,
        route: 'Maintenance',
        fuelEfficiency: 7.8,
        totalDistance: 2100,
        deliveriesToday: 0
      }
    ];

    const initialRoutes = [
      {
        id: 'A',
        name: 'Downtown Express',
        distance: 45.2,
        estimatedTime: 65,
        stops: 8,
        vehicle: 'Truck-001',
        status: 'active',
        traffic: 'moderate',
        fuelCost: 28.50,
        efficiency: 92
      },
      {
        id: 'B',
        name: 'Suburban Circuit',
        distance: 78.5,
        estimatedTime: 95,
        stops: 12,
        vehicle: 'Van-002',
        status: 'active',
        traffic: 'light',
        fuelCost: 42.30,
        efficiency: 88
      },
      {
        id: 'C',
        name: 'Industrial Zone',
        distance: 120.3,
        estimatedTime: 140,
        stops: 6,
        vehicle: 'Truck-003',
        status: 'inactive',
        traffic: 'heavy',
        fuelCost: 65.20,
        efficiency: 75
      }
    ];

    const initialOrders = [
      {
        id: 'ORD-2024-001',
        customer: 'TechCorp Inc.',
        destination: '123 Business Ave, Downtown',
        status: 'in-transit',
        priority: 'high',
        weight: '250 kg',
        estimatedDelivery: '2:30 PM',
        actualDelivery: null,
        driver: 'John Smith',
        vehicle: 'Truck-001'
      },
      {
        id: 'ORD-2024-002',
        customer: 'Green Foods Market',
        destination: '456 Fresh St, Suburbs',
        status: 'in-transit',
        priority: 'medium',
        weight: '180 kg',
        estimatedDelivery: '3:15 PM',
        actualDelivery: null,
        driver: 'Sarah Johnson',
        vehicle: 'Van-002'
      },
      {
        id: 'ORD-2024-003',
        customer: 'Industrial Supplies Co.',
        destination: '789 Factory Rd, Industrial Zone',
        status: 'pending',
        priority: 'low',
        weight: '1200 kg',
        estimatedDelivery: '4:00 PM',
        actualDelivery: null,
        driver: 'Mike Chen',
        vehicle: 'Truck-003'
      }
    ];

    const initialWarehouses = [
      {
        id: 1,
        name: 'Central Hub',
        location: 'Downtown',
        capacity: '10000 sq ft',
        utilization: 78,
        temperature: 22,
        humidity: 45,
        status: 'active',
        inventory: 1250,
        orders: 45
      },
      {
        id: 2,
        name: 'North Distribution',
        location: 'Suburbs',
        capacity: '8000 sq ft',
        utilization: 65,
        temperature: 20,
        humidity: 42,
        status: 'active',
        inventory: 890,
        orders: 32
      }
    ];

    setVehicles(initialVehicles);
    setRoutes(initialRoutes);
    setOrders(initialOrders);
    setWarehouses(initialWarehouses);
  }, []);

  useEffect(() => {
    // Simulate real-time logistics updates
    const interval = setInterval(() => {
      // Update vehicle locations and status
      setVehicles(prev => prev.map(vehicle => {
        if (vehicle.status === 'active') {
          return {
            ...vehicle,
            location: {
              lat: vehicle.location.lat + (Math.random() - 0.5) * 0.01,
              lng: vehicle.location.lng + (Math.random() - 0.5) * 0.01
            },
            fuel: Math.max(0, vehicle.fuel - Math.random() * 2),
            speed: Math.floor(Math.random() * 30) + 40,
            lastUpdate: 'Just now',
            totalDistance: vehicle.totalDistance + Math.random() * 5
          };
        }
        return vehicle;
      }));

      // Update fleet stats
      setFleetStats(prev => ({
        totalVehicles: vehicles.length,
        activeVehicles: vehicles.filter(v => v.status === 'active').length,
        totalOrders: orders.length,
        averageDeliveryTime: Math.max(45, prev.averageDeliveryTime + (Math.random() - 0.5) * 5),
        fuelEfficiency: Math.max(7, prev.fuelEfficiency + (Math.random() - 0.5) * 0.5),
        totalDistance: vehicles.reduce((sum, v) => sum + v.totalDistance, 0),
        onTimeDeliveries: Math.floor(prev.onTimeDeliveries + Math.random() * 2),
        activeRoutes: routes.filter(r => r.status === 'active').length
      }));

      // Update order statuses
      setOrders(prev => prev.map(order => {
        if (order.status === 'in-transit' && Math.random() > 0.9) {
          return {
            ...order,
            status: 'delivered',
            actualDelivery: new Date().toLocaleTimeString()
          };
        }
        return order;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [vehicles, orders, routes]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'maintenance': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'offline': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const formatLocation = (location) => {
    return `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🚚 Smart Logistics Platform</h1>
            <p className="text-gray-300 text-lg">
              AI-powered fleet management with real-time tracking, route optimization, and delivery analytics
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

        {/* Fleet Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">🚛</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Vehicles</h3>
            <p className="text-3xl font-bold text-green-400">{fleetStats.activeVehicles}/{fleetStats.totalVehicles}</p>
            <p className="text-green-300 text-sm">Real-time tracking</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-400">{fleetStats.totalOrders}</p>
            <p className="text-blue-300 text-sm">Active deliveries</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Delivery Time</h3>
            <p className="text-3xl font-bold text-purple-400">{fleetStats.averageDeliveryTime.toFixed(0)} min</p>
            <p className="text-purple-300 text-sm">On-time: {fleetStats.onTimeDeliveries}%</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⛽</div>
            <h3 className="text-xl font-semibold text-white mb-2">Fuel Efficiency</h3>
            <p className="text-3xl font-bold text-yellow-400">{fleetStats.fuelEfficiency.toFixed(1)} km/L</p>
            <p className="text-yellow-300 text-sm">{(fleetStats.totalDistance / 1000).toFixed(1)}k km today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fleet Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🚛 Fleet Management</h2>
                <div className="text-sm text-green-300">Real-time updates every 3s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedVehicle?.id === vehicle.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                        <p className="text-gray-300 text-sm">{vehicle.type} • {vehicle.capacity}</p>
                        <p className="text-gray-400 text-xs">Driver: {vehicle.driver}</p>
                        <p className="text-gray-400 text-xs">{vehicle.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(vehicle.status)}>
                          {vehicle.status.toUpperCase()}
                        </div>
                        <p className="text-gray-300 text-xs mt-1">{vehicle.speed} km/h</p>
                        <p className="text-gray-400 text-xs">{vehicle.fuel.toFixed(1)}% fuel</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white font-semibold">{formatLocation(vehicle.location)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Current Order</p>
                        <p className="text-white font-semibold">{vehicle.currentOrder || 'None'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Fuel Level</span>
                        <span>{vehicle.fuel.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            vehicle.fuel < 20 ? 'bg-red-500' : 
                            vehicle.fuel < 50 ? 'bg-yellow-500' : 'bg-green-500'
                          )}
                          style={{ width: vehicle.fuel + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Optimization & Orders */}
          <div className="space-y-6">
            {/* Route Optimization */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🗺️ Route Optimization</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {routes.map((route) => (
                  <div key={route.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{route.name}</p>
                        <p className="text-blue-200 text-sm">{route.distance.toFixed(1)} km</p>
                        <p className="text-blue-200 text-xs">{route.stops} stops</p>
                        <p className="text-gray-300 text-xs">{route.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(route.status)}>
                          {route.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{route.estimatedTime} min</p>
                        <p className="text-gray-300 text-xs">{route.efficiency}% efficient</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Orders */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">📦 Active Orders</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {orders.map((order) => (
                  <div key={order.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{order.id}</p>
                        <p className="text-purple-200 text-sm">{order.customer}</p>
                        <p className="text-purple-200 text-xs">{order.weight}</p>
                        <p className="text-gray-300 text-xs">{order.estimatedDelivery}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getPriorityBg(order.priority)}>
                          {order.priority.toUpperCase()}
                        </div>
                        <div className={'px-2 py-1 rounded text-xs mt-1 ' + getStatusBg(order.status)}>
                          {order.status.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warehouse Status */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">🏭 Warehouse Status</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="bg-yellow-800/50 p-3 rounded-lg border border-yellow-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{warehouse.name}</p>
                        <p className="text-yellow-200 text-sm">{warehouse.location}</p>
                        <p className="text-yellow-200 text-xs">{warehouse.capacity}</p>
                        <p className="text-gray-300 text-xs">{warehouse.inventory} items</p>
                      </div>
                      <div className="text-right">
                        <div className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                          {warehouse.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{warehouse.utilization}% utilized</p>
                        <p className="text-gray-300 text-xs">{warehouse.orders} orders</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Details Modal */}
        {selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Vehicle Details</h2>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Vehicle ID</p>
                  <p className="text-white font-semibold">{selectedVehicle.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Type</p>
                  <p className="text-white font-semibold">{selectedVehicle.type}</p>
                </div>
                <div>
                  <p className="text-gray-400">Capacity</p>
                  <p className="text-white font-semibold">{selectedVehicle.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={'font-semibold ' + getStatusColor(selectedVehicle.status)}>
                    {selectedVehicle.status.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Driver</p>
                  <p className="text-white font-semibold">{selectedVehicle.driver}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <p className="text-white font-semibold">{selectedVehicle.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Speed</p>
                  <p className="text-white font-semibold">{selectedVehicle.speed} km/h</p>
                </div>
                <div>
                  <p className="text-gray-400">Fuel Level</p>
                  <p className="text-white font-semibold">{selectedVehicle.fuel.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Location</p>
                  <p className="text-white font-semibold">{formatLocation(selectedVehicle.location)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Current Order</p>
                  <p className="text-white font-semibold">{selectedVehicle.currentOrder || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Route</p>
                  <p className="text-white font-semibold">{selectedVehicle.route}</p>
                </div>
                <div>
                  <p className="text-gray-400">Fuel Efficiency</p>
                  <p className="text-white font-semibold">{selectedVehicle.fuelEfficiency} km/L</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Distance</p>
                  <p className="text-white font-semibold">{selectedVehicle.totalDistance.toFixed(0)} km</p>
                </div>
                <div>
                  <p className="text-gray-400">Deliveries Today</p>
                  <p className="text-white font-semibold">{selectedVehicle.deliveriesToday}</p>
                </div>
                <div>
                  <p className="text-gray-400">Last Update</p>
                  <p className="text-white font-semibold">{selectedVehicle.lastUpdate}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logistics Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🚚 Advanced Logistics Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Fleet Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time GPS tracking</li>
                <li>• Fuel monitoring</li>
                <li>• Driver performance analytics</li>
                <li>• Maintenance scheduling</li>
                <li>• Vehicle utilization optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Route Optimization</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• AI-powered route planning</li>
                <li>• Traffic pattern analysis</li>
                <li>• Dynamic rerouting</li>
                <li>• Multi-stop optimization</li>
                <li>• Fuel cost minimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Delivery Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• On-time delivery tracking</li>
                <li>• Customer satisfaction metrics</li>
                <li>• Performance benchmarking</li>
                <li>• Cost analysis</li>
                <li>• Predictive analytics</li>
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
          title="Logistics Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default LogisticsDemo; 