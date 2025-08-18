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

  // Deterministic Logistics System Implementation
  const logisticsSystem = {
    // Deterministic route optimization using Nearest Neighbor algorithm
    optimizeRoute: (startPoint, destinations, vehicleCapacity) => {
      if (!destinations || destinations.length === 0) return [];
      
      const unvisited = [...destinations];
      const route = [startPoint];
      let currentPoint = startPoint;
      let currentLoad = 0;
      
      while (unvisited.length > 0) {
        // Find nearest unvisited destination
        let nearestIndex = 0;
        let minDistance = Infinity;
        
        for (let i = 0; i < unvisited.length; i++) {
          const distance = calculateDistance(currentPoint, unvisited[i]);
          if (distance < minDistance && currentLoad + unvisited[i].weight <= vehicleCapacity) {
            minDistance = distance;
            nearestIndex = i;
          }
        }
        
        // If no destination fits capacity, return to warehouse
        if (minDistance === Infinity) {
          route.push(startPoint);
          currentLoad = 0;
          currentPoint = startPoint;
          continue;
        }
        
        // Add nearest destination to route
        const nextPoint = unvisited.splice(nearestIndex, 1)[0];
        route.push(nextPoint);
        currentLoad += nextPoint.weight;
        currentPoint = nextPoint;
      }
      
      // Return to warehouse
      route.push(startPoint);
      
      return route;
    },

    // Deterministic vehicle assignment using Hungarian algorithm (simplified)
    assignVehiclesToOrders: (vehicles, orders) => {
      if (!vehicles || !orders || vehicles.length === 0 || orders.length === 0) return [];
      
      const assignments = [];
      const availableVehicles = [...vehicles];
      const pendingOrders = [...orders];
      
      // Sort orders by priority and deadline
      pendingOrders.sort((a, b) => {
        if (a.priority !== b.priority) return b.priority - a.priority;
        return new Date(a.deadline) - new Date(b.deadline);
      });
      
      // Sort vehicles by capacity and efficiency
      availableVehicles.sort((a, b) => {
        if (a.capacity !== b.capacity) return b.capacity - a.capacity;
        return b.fuelEfficiency - a.fuelEfficiency;
      });
      
      // Assign orders to vehicles
      pendingOrders.forEach(order => {
        const suitableVehicle = availableVehicles.find(vehicle => 
          vehicle.capacity >= order.weight && 
          vehicle.status === 'available' &&
          calculateDistance(vehicle.currentLocation, order.pickupLocation) < 100 // Max 100km
        );
        
        if (suitableVehicle) {
          assignments.push({
            vehicleId: suitableVehicle.id,
            orderId: order.id,
            pickupLocation: order.pickupLocation,
            deliveryLocation: order.deliveryLocation,
            estimatedTime: calculateDeliveryTime(suitableVehicle, order),
            route: logisticsSystem.optimizeRoute(
              suitableVehicle.currentLocation,
              [order.pickupLocation, order.deliveryLocation],
              suitableVehicle.capacity
            )
          });
          
          // Mark vehicle as assigned
          suitableVehicle.status = 'assigned';
        }
      });
      
      return assignments;
    },

    // Deterministic fuel consumption calculation
    calculateFuelConsumption: (vehicle, distance, load) => {
      const baseConsumption = vehicle.baseFuelConsumption || 0.1; // L/km
      const loadFactor = 1 + (load / vehicle.capacity) * 0.3; // 30% increase for full load
      const speedFactor = vehicle.currentSpeed > 80 ? 1.2 : vehicle.currentSpeed > 60 ? 1.1 : 1.0;
      const terrainFactor = 1.0; // Simplified, could be based on route terrain
      
      return distance * baseConsumption * loadFactor * speedFactor * terrainFactor;
    },

    // Deterministic delivery time calculation
    calculateDeliveryTime: (vehicle, order) => {
      const distance = calculateDistance(order.pickupLocation, order.deliveryLocation);
      const baseSpeed = vehicle.maxSpeed || 60; // km/h
      const loadFactor = 1 - (order.weight / vehicle.capacity) * 0.2; // Speed reduction with load
      const trafficFactor = 0.8; // Simplified traffic consideration
      const weatherFactor = 1.0; // Simplified weather consideration
      
      const effectiveSpeed = baseSpeed * loadFactor * trafficFactor * weatherFactor;
      const travelTime = distance / effectiveSpeed; // hours
      
      // Add loading/unloading time
      const loadingTime = order.weight / 100; // 1 hour per 100kg
      
      return travelTime + loadingTime;
    },

    // Deterministic warehouse optimization
    optimizeWarehouseLayout: (warehouses, orders) => {
      if (!warehouses || warehouses.length === 0) return warehouses;
      
      return warehouses.map(warehouse => {
        // Calculate optimal inventory levels based on order patterns
        const relevantOrders = orders.filter(order => 
          calculateDistance(warehouse.location, order.pickupLocation) < 50 // Within 50km
        );
        
        const demandByCategory = {};
        relevantOrders.forEach(order => {
          if (!demandByCategory[order.category]) demandByCategory[order.category] = 0;
          demandByCategory[order.category] += order.weight;
        });
        
        // Calculate safety stock (20% of average demand)
        const safetyStock = {};
        Object.entries(demandByCategory).forEach(([category, demand]) => {
          safetyStock[category] = demand * 0.2;
        });
        
        // Optimize storage allocation
        const storageAllocation = {};
        const totalStorage = warehouse.capacity;
        let allocatedStorage = 0;
        
        Object.entries(demandByCategory).forEach(([category, demand]) => {
          const requiredStorage = demand + safetyStock[category];
          if (allocatedStorage + requiredStorage <= totalStorage) {
            storageAllocation[category] = requiredStorage;
            allocatedStorage += requiredStorage;
          } else {
            storageAllocation[category] = totalStorage - allocatedStorage;
            allocatedStorage = totalStorage;
          }
        });
        
        return {
          ...warehouse,
          optimalInventory: safetyStock,
          storageAllocation,
          utilizationRate: (allocatedStorage / totalStorage) * 100
        };
      });
    },

    // Deterministic predictive maintenance
    predictMaintenance: (vehicle, usageData) => {
      const maintenanceSchedule = {
        oilChange: 10000, // km
        tireRotation: 15000, // km
        brakeInspection: 20000, // km
        majorService: 50000 // km
      };
      
      const nextMaintenance = {};
      Object.entries(maintenanceSchedule).forEach(([service, interval]) => {
        const lastService = vehicle.lastService[service] || 0;
        const nextService = lastService + interval;
        const remainingDistance = nextService - vehicle.odometer;
        
        nextMaintenance[service] = {
          nextService,
          remainingDistance,
          urgency: remainingDistance < 1000 ? 'Critical' : 
                  remainingDistance < 3000 ? 'High' : 
                  remainingDistance < 5000 ? 'Medium' : 'Low'
        };
      });
      
      return nextMaintenance;
    },

    // Deterministic cost optimization
    optimizeCosts: (vehicles, routes, fuelPrice) => {
      let totalCost = 0;
      const costBreakdown = {
        fuel: 0,
        maintenance: 0,
        labor: 0,
        insurance: 0
      };
      
      // Calculate fuel costs
      routes.forEach(route => {
        const distance = calculateRouteDistance(route);
        const vehicle = vehicles.find(v => v.id === route.vehicleId);
        if (vehicle) {
          const fuelConsumption = logisticsSystem.calculateFuelConsumption(vehicle, distance, route.totalLoad);
          costBreakdown.fuel += fuelConsumption * fuelPrice;
        }
      });
      
      // Calculate maintenance costs
      vehicles.forEach(vehicle => {
        const maintenanceCost = vehicle.odometer * 0.01; // $0.01 per km
        costBreakdown.maintenance += maintenanceCost;
      });
      
      // Calculate labor costs
      const totalHours = routes.reduce((sum, route) => sum + route.estimatedTime, 0);
      costBreakdown.labor = totalHours * 25; // $25 per hour
      
      // Calculate insurance costs
      costBreakdown.insurance = vehicles.length * 1200; // $1200 per vehicle per year
      
      totalCost = Object.values(costBreakdown).reduce((sum, cost) => sum + cost, 0);
      
      return {
        totalCost,
        costBreakdown,
        costPerKm: totalCost / routes.reduce((sum, route) => sum + calculateRouteDistance(route), 0),
        recommendations: logisticsSystem.generateCostRecommendations(costBreakdown)
      };
    },

    // Generate cost optimization recommendations
    generateCostRecommendations: (costBreakdown) => {
      const recommendations = [];
      
      if (costBreakdown.fuel > costBreakdown.maintenance * 2) {
        recommendations.push('Consider fuel-efficient vehicles or route optimization');
      }
      
      if (costBreakdown.maintenance > costBreakdown.labor * 0.5) {
        recommendations.push('Implement preventive maintenance schedule');
      }
      
      if (costBreakdown.labor > costBreakdown.fuel * 3) {
        recommendations.push('Optimize routes to reduce delivery time');
      }
      
      return recommendations;
    }
  };

  // Helper Functions
  const calculateDistance = (point1, point2) => {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const calculateRouteDistance = (route) => {
    let totalDistance = 0;
    for (let i = 0; i < route.route.length - 1; i++) {
      totalDistance += calculateDistance(route.route[i], route.route[i + 1]);
    }
    return totalDistance;
  };

  const calculateDeliveryTime = (vehicle, order) => {
    return logisticsSystem.calculateDeliveryTime(vehicle, order);
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const baseTime = Date.now();
    
    // Generate warehouses
    const warehouses = [
      { id: 1, name: 'Central Hub', location: { x: 0, y: 0 }, capacity: 10000, utilization: 75 },
      { id: 2, name: 'North Depot', location: { x: 50, y: 100 }, capacity: 8000, utilization: 60 },
      { id: 3, name: 'South Center', location: { x: -30, y: -80 }, capacity: 12000, utilization: 85 }
    ];
    
    // Generate vehicles
    const vehicleTypes = ['Truck', 'Van', 'Pickup'];
    const vehicles = Array.from({ length: 10 }, (_, index) => {
      const type = vehicleTypes[index % vehicleTypes.length];
      const capacity = type === 'Truck' ? 5000 : type === 'Van' ? 2000 : 1000;
      const baseFuelConsumption = type === 'Truck' ? 0.15 : type === 'Van' ? 0.08 : 0.05;
      
      return {
        id: index + 1,
        name: `${type} ${index + 1}`,
        type,
        capacity,
        currentLoad: 0,
        fuel: 80 + (index * 2), // Deterministic fuel levels
        status: index < 7 ? 'available' : 'maintenance',
        currentLocation: {
          x: (index % 3 - 1) * 40,
          y: Math.floor(index / 3) * 60
        },
        maxSpeed: type === 'Truck' ? 70 : type === 'Van' ? 80 : 90,
        fuelEfficiency: 1 / baseFuelConsumption,
        baseFuelConsumption,
        odometer: 50000 + (index * 10000),
        lastService: {
          oilChange: 45000 + (index * 5000),
          tireRotation: 40000 + (index * 8000),
          brakeInspection: 35000 + (index * 10000),
          majorService: 20000 + (index * 25000)
        }
      };
    });
    
    // Generate orders
    const orderCategories = ['Electronics', 'Clothing', 'Food', 'Furniture'];
    const orders = Array.from({ length: 25 }, (_, index) => {
      const category = orderCategories[index % orderCategories.length];
      const weight = category === 'Furniture' ? 200 + (index * 50) :
                    category === 'Electronics' ? 50 + (index * 10) :
                    category === 'Clothing' ? 20 + (index * 5) : 100 + (index * 20);
      
      return {
        id: index + 1,
        customer: `Customer ${index + 1}`,
        category,
        weight,
        priority: index % 5 === 0 ? 3 : index % 3 === 0 ? 2 : 1,
        pickupLocation: {
          x: (index % 5 - 2) * 30,
          y: (Math.floor(index / 5) - 2) * 40
        },
        deliveryLocation: {
          x: (index % 7 - 3) * 25,
          y: (Math.floor(index / 7) - 2) * 35
        },
        deadline: new Date(baseTime + (index * 3600000)).toISOString(),
        status: index < 15 ? 'pending' : 'in_transit'
      };
    });
    
    // Generate routes
    const routes = logisticsSystem.assignVehiclesToOrders(vehicles, orders.slice(0, 15));
    
    // Calculate fleet stats
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.status === 'available').length;
    const totalOrders = orders.length;
    const averageDeliveryTime = routes.reduce((sum, route) => sum + route.estimatedTime, 0) / routes.length;
    const fuelEfficiency = vehicles.reduce((sum, v) => sum + v.fuelEfficiency, 0) / vehicles.length;
    const totalDistance = routes.reduce((sum, route) => sum + calculateRouteDistance(route), 0);
    const onTimeDeliveries = Math.floor(totalOrders * 0.85); // 85% on-time rate
    const activeRoutes = routes.length;
    
    setWarehouses(warehouses);
    setVehicles(vehicles);
    setOrders(orders);
    setRoutes(routes);
    setFleetStats({
      totalVehicles,
      activeVehicles,
      totalOrders,
      averageDeliveryTime: Math.round(averageDeliveryTime * 100) / 100,
      fuelEfficiency: Math.round(fuelEfficiency * 100) / 100,
      totalDistance: Math.round(totalDistance),
      onTimeDeliveries,
      activeRoutes
    });
    
    return { warehouses, vehicles, orders, routes, fleetStats };
  };

  // Run logistics algorithms
  const runLogisticsAlgorithms = (data) => {
    const { vehicles, orders, warehouses } = data;
    
    // Optimize warehouse layout
    const optimizedWarehouses = logisticsSystem.optimizeWarehouseLayout(warehouses, orders);
    
    // Predict maintenance for vehicles
    const maintenancePredictions = vehicles.map(vehicle => ({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      predictions: logisticsSystem.predictMaintenance(vehicle, {})
    }));
    
    // Optimize costs
    const costOptimization = logisticsSystem.optimizeCosts(vehicles, routes, 1.5); // $1.50/L fuel
    
    // Update warehouses with optimization results
    setWarehouses(optimizedWarehouses);
    
    return { optimizedWarehouses, maintenancePredictions, costOptimization };
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const results = runLogisticsAlgorithms(sampleData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">🚚 Smart Logistics Platform</h1>
          <p className="text-gray-300 text-lg">
            AI-powered fleet management with deterministic route optimization, predictive maintenance, and cost analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fleet Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Fleet Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{fleetStats.totalVehicles}</div>
                  <div className="text-sm text-gray-400">Total Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{fleetStats.activeVehicles}</div>
                  <div className="text-sm text-gray-400">Active Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{fleetStats.totalOrders}</div>
                  <div className="text-sm text-gray-400">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{fleetStats.activeRoutes}</div>
                  <div className="text-sm text-gray-400">Active Routes</div>
                </div>
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Vehicle Fleet</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {vehicles.slice(0, 6).map(vehicle => (
                  <div key={vehicle.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{vehicle.name}</div>
                        <div className="text-sm text-gray-300">{vehicle.type}</div>
                        <div className="text-xs text-gray-400">
                          Capacity: {vehicle.capacity}kg | Odometer: {vehicle.odometer.toLocaleString()}km
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm px-2 py-1 rounded ${
                          vehicle.status === 'available' ? 'bg-green-900 text-green-400' :
                          vehicle.status === 'maintenance' ? 'bg-red-900 text-red-400' :
                          'bg-yellow-900 text-yellow-400'
                        }`}>
                          {vehicle.status}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Fuel: {vehicle.fuel}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Routes */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold mb-4">Active Routes</h2>
              <div className="space-y-3">
                {routes.slice(0, 5).map(route => (
                  <div key={route.vehicleId} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-white">Vehicle {route.vehicleId}</div>
                        <div className="text-sm text-gray-300">Order {route.orderId}</div>
                        <div className="text-xs text-gray-400">
                          {route.pickupLocation.x.toFixed(1)}, {route.pickupLocation.y.toFixed(1)} → 
                          {route.deliveryLocation.x.toFixed(1)}, {route.deliveryLocation.y.toFixed(1)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-400">{route.estimatedTime.toFixed(1)}h</div>
                        <div className="text-xs text-gray-400">
                          Distance: {calculateRouteDistance(route).toFixed(1)}km
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Avg Delivery Time:</span>
                  <span className="text-blue-400">{fleetStats.averageDeliveryTime}h</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuel Efficiency:</span>
                  <span className="text-green-400">{fleetStats.fuelEfficiency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Distance:</span>
                  <span className="text-yellow-400">{fleetStats.totalDistance}km</span>
                </div>
                <div className="flex justify-between">
                  <span>On-Time Rate:</span>
                  <span className="text-purple-400">
                    {Math.round((fleetStats.onTimeDeliveries / fleetStats.totalOrders) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Warehouses */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Warehouses</h3>
              <div className="space-y-3">
                {warehouses.map(warehouse => (
                  <div key={warehouse.id} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{warehouse.name}</div>
                        <div className="text-gray-400">{warehouse.utilization}% utilized</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400">{warehouse.capacity.toLocaleString()}kg</div>
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
          title="Logistics System Implementation"
          code={`
// Deterministic Logistics System Implementation
class LogisticsSystem {
  // Deterministic route optimization using Nearest Neighbor algorithm
  optimizeRoute(startPoint, destinations, vehicleCapacity) {
    if (!destinations || destinations.length === 0) return [];
    
    const unvisited = [...destinations];
    const route = [startPoint];
    let currentPoint = startPoint;
    let currentLoad = 0;
    
    while (unvisited.length > 0) {
      // Find nearest unvisited destination
      let nearestIndex = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < unvisited.length; i++) {
        const distance = this.calculateDistance(currentPoint, unvisited[i]);
        if (distance < minDistance && currentLoad + unvisited[i].weight <= vehicleCapacity) {
          minDistance = distance;
          nearestIndex = i;
        }
      }
      
      // If no destination fits capacity, return to warehouse
      if (minDistance === Infinity) {
        route.push(startPoint);
        currentLoad = 0;
        currentPoint = startPoint;
        continue;
      }
      
      // Add nearest destination to route
      const nextPoint = unvisited.splice(nearestIndex, 1)[0];
      route.push(nextPoint);
      currentLoad += nextPoint.weight;
      currentPoint = nextPoint;
    }
    
    // Return to warehouse
    route.push(startPoint);
    return route;
  }

  // Deterministic vehicle assignment
  assignVehiclesToOrders(vehicles, orders) {
    if (!vehicles || !orders || vehicles.length === 0 || orders.length === 0) return [];
    
    const assignments = [];
    const availableVehicles = [...vehicles];
    const pendingOrders = [...orders];
    
    // Sort orders by priority and deadline
    pendingOrders.sort((a, b) => {
      if (a.priority !== b.priority) return b.priority - a.priority;
      return new Date(a.deadline) - new Date(b.deadline);
    });
    
    // Sort vehicles by capacity and efficiency
    availableVehicles.sort((a, b) => {
      if (a.capacity !== b.capacity) return b.capacity - a.capacity;
      return b.fuelEfficiency - a.fuelEfficiency;
    });
    
    // Assign orders to vehicles
    pendingOrders.forEach(order => {
      const suitableVehicle = availableVehicles.find(vehicle => 
        vehicle.capacity >= order.weight && 
        vehicle.status === 'available' &&
        this.calculateDistance(vehicle.currentLocation, order.pickupLocation) < 100
      );
      
      if (suitableVehicle) {
        assignments.push({
          vehicleId: suitableVehicle.id,
          orderId: order.id,
          pickupLocation: order.pickupLocation,
          deliveryLocation: order.deliveryLocation,
          estimatedTime: this.calculateDeliveryTime(suitableVehicle, order),
          route: this.optimizeRoute(
            suitableVehicle.currentLocation,
            [order.pickupLocation, order.deliveryLocation],
            suitableVehicle.capacity
          )
        });
        
        suitableVehicle.status = 'assigned';
      }
    });
    
    return assignments;
  }

  // Deterministic fuel consumption calculation
  calculateFuelConsumption(vehicle, distance, load) {
    const baseConsumption = vehicle.baseFuelConsumption || 0.1;
    const loadFactor = 1 + (load / vehicle.capacity) * 0.3;
    const speedFactor = vehicle.currentSpeed > 80 ? 1.2 : vehicle.currentSpeed > 60 ? 1.1 : 1.0;
    
    return distance * baseConsumption * loadFactor * speedFactor;
  }

  // Deterministic delivery time calculation
  calculateDeliveryTime(vehicle, order) {
    const distance = this.calculateDistance(order.pickupLocation, order.deliveryLocation);
    const baseSpeed = vehicle.maxSpeed || 60;
    const loadFactor = 1 - (order.weight / vehicle.capacity) * 0.2;
    const trafficFactor = 0.8;
    
    const effectiveSpeed = baseSpeed * loadFactor * trafficFactor;
    const travelTime = distance / effectiveSpeed;
    const loadingTime = order.weight / 100;
    
    return travelTime + loadingTime;
  }
}
          `}
        />
      )}
    </div>
  );
};

export default LogisticsDemo; 