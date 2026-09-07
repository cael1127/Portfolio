import React, { useState } from 'react';

const LogisticsProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    fleetManagement: `// Fleet Management System
class FleetManager {
  constructor() {
    this.vehicles = new Map();
    this.routes = new Map();
    this.drivers = new Map();
    this.optimizer = new RouteOptimizer();
  }

  addVehicle(vehicleId, vehicleData) {
    this.vehicles.set(vehicleId, {
      id: vehicleId,
      type: vehicleData.type,
      capacity: vehicleData.capacity,
      currentLocation: vehicleData.location,
      status: 'available',
      driver: null,
      currentRoute: null
    });
  }

  optimizeRoute(vehicleId, destinations) {
    const vehicle = this.vehicles.get(vehicleId);
    if (!vehicle) return null;

    const optimizedRoute = this.optimizer.calculateOptimalRoute(
      vehicle.currentLocation,
      destinations,
      vehicle.capacity
    );

    return optimizedRoute;
  }

  updateVehicleLocation(vehicleId, location) {
    const vehicle = this.vehicles.get(vehicleId);
    if (vehicle) {
      vehicle.currentLocation = location;
      this.emit('locationUpdate', { vehicleId, location });
    }
  }
}`,
    
    routeOptimizer: `// Route Optimization Engine
class RouteOptimizer {
  constructor() {
    this.algorithms = {
      genetic: new GeneticAlgorithm(),
      antColony: new AntColonyOptimization(),
      nearestNeighbor: new NearestNeighborAlgorithm()
    };
  }

  calculateOptimalRoute(startLocation, destinations, capacity) {
    const algorithm = this.selectAlgorithm(destinations.length);
    return algorithm.optimize(startLocation, destinations, capacity);
  }

  selectAlgorithm(destinationCount) {
    if (destinationCount <= 10) return this.algorithms.nearestNeighbor;
    if (destinationCount <= 50) return this.algorithms.antColony;
    return this.algorithms.genetic;
  }
}`,
    
    realTimeTracking: `// Real-time Tracking System
class RealTimeTracker {
  constructor() {
    this.trackedVehicles = new Map();
    this.geofences = new Map();
    this.alerts = new Map();
  }

  startTracking(vehicleId, updateCallback) {
    const tracker = {
      vehicleId,
      lastUpdate: new Date(),
      currentLocation: null,
      speed: 0,
      heading: 0,
      status: 'tracking'
    };

    this.trackedVehicles.set(vehicleId, tracker);
    
    // Simulate GPS updates
    setInterval(() => {
      this.updateVehicleLocation(vehicleId, updateCallback);
    }, 5000);
  }

  updateVehicleLocation(vehicleId, callback) {
    const tracker = this.trackedVehicles.get(vehicleId);
    if (!tracker) return;

    // Simulate GPS data
    const newLocation = this.simulateGPSUpdate(tracker.currentLocation);
    tracker.currentLocation = newLocation;
    tracker.lastUpdate = new Date();

    // Check geofences
    this.checkGeofences(vehicleId, newLocation);

    // Emit update
    callback && callback(tracker);
  }

  simulateGPSUpdate(currentLocation) {
    if (!currentLocation) {
      return { lat: 40.7128, lng: -74.0060 }; // NYC
    }

    // Simulate movement
    const latChange = (Math.random() - 0.5) * 0.001;
    const lngChange = (Math.random() - 0.5) * 0.001;

    return {
      lat: currentLocation.lat + latChange,
      lng: currentLocation.lng + lngChange
    };
  }
}`,
    
    dashboardComponent: `// React Logistics Dashboard
import React, { useState, useEffect } from 'react';

const LogisticsDashboard = () => {
  const [fleet, setFleet] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fleetManager = new FleetManager();
    const tracker = new RealTimeTracker();

    // Initialize fleet
    const mockFleet = [
      { id: 'V001', type: 'Truck', capacity: 5000, status: 'active' },
      { id: 'V002', type: 'Van', capacity: 2000, status: 'active' },
      { id: 'V003', type: 'Truck', capacity: 3000, status: 'maintenance' }
    ];

    setFleet(mockFleet);

    // Start tracking
    mockFleet.forEach(vehicle => {
      tracker.startTracking(vehicle.id, (data) => {
        setFleet(prev => prev.map(v => 
          v.id === vehicle.id ? { ...v, ...data } : v
        ));
      });
    });

    // Update analytics
    const interval = setInterval(() => {
      setAnalytics({
        totalVehicles: fleet.length,
        activeVehicles: fleet.filter(v => v.status === 'active').length,
        totalDistance: Math.random() * 1000,
        fuelEfficiency: 85 + Math.random() * 10
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--accent)] mb-8">
          Smart Logistics Platform
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleet.map(vehicle => (
            <div key={vehicle.id} className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
              <h3 className="text-lg font-semibold text-[var(--text)]">{vehicle.id}</h3>
              <p className="text-[var(--muted)]">{vehicle.type}</p>
              <p className="text-[var(--accent)]">Capacity: {vehicle.capacity}kg</p>
              <p className="text-[var(--accent)]">Status: {vehicle.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-[var(--accent)] hover:text-[var(--accent)] mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-[var(--accent)] mb-4">🚚 Smart Logistics Platform</h1>
          <p className="text-[var(--text)] text-lg">
            AI-powered fleet management and route optimization with real-time tracking and predictive analytics
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-[var(--text)]'
                  : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Project Overview</h2>
                <p className="text-[var(--text)] leading-relaxed">
                  The Smart Logistics Platform is a comprehensive fleet management solution that combines AI-powered route optimization, 
                  real-time GPS tracking, and predictive analytics to streamline supply chain operations and reduce delivery costs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Optimize delivery routes</li>
                    <li>• Real-time fleet tracking</li>
                    <li>• Reduce fuel consumption</li>
                    <li>• Improve delivery times</li>
                    <li>• Predictive maintenance</li>
                    <li>• Cost optimization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• React.js for dashboard</li>
                    <li>• Node.js backend API</li>
                    <li>• GPS tracking integration</li>
                    <li>• Machine learning algorithms</li>
                    <li>• Real-time WebSocket</li>
                    <li>• Map APIs integration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🚚 Fleet Management</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Vehicle tracking and monitoring</li>
                    <li>• Driver assignment and management</li>
                    <li>• Maintenance scheduling</li>
                    <li>• Fuel consumption tracking</li>
                    <li>• Performance analytics</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🗺️ Route Optimization</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• AI-powered route calculation</li>
                    <li>• Traffic-aware routing</li>
                    <li>• Multi-stop optimization</li>
                    <li>• Real-time route updates</li>
                    <li>• Cost optimization</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">📊 Analytics Dashboard</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Real-time fleet overview</li>
                    <li>• Performance metrics</li>
                    <li>• Cost analysis</li>
                    <li>• Predictive insights</li>
                    <li>• Custom reporting</li>
                  </ul>
                </div>
                
                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">🔔 Alert System</h3>
                  <ul className="space-y-2 text-[var(--text)]">
                    <li>• Geofence alerts</li>
                    <li>• Maintenance reminders</li>
                    <li>• Route deviation alerts</li>
                    <li>• Fuel level warnings</li>
                    <li>• Performance notifications</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Fleet Management System</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.fleetManagement}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Route Optimization Engine</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.routeOptimizer}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Real-time Tracking</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.realTimeTracking}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Dashboard Component</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <pre className="text-[var(--accent)] text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• React.js dashboard</li>
                      <li>• Real-time map visualization</li>
                      <li>• Interactive route planning</li>
                      <li>• Fleet status monitoring</li>
                      <li>• Analytics reporting</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Backend Layer</h3>
                  <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border-strong)]">
                    <ul className="space-y-2 text-[var(--text)]">
                      <li>• Node.js API server</li>
                      <li>• Route optimization engine</li>
                      <li>• GPS data processing</li>
                      <li>• Real-time tracking</li>
                      <li>• Analytics processing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <h3 className="text-lg font-semibold text-[var(--accent)] mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">1</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">GPS Data Collection</p>
                      <p className="text-[var(--text)] text-sm">Real-time GPS coordinates from vehicles</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">2</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Route Optimization</p>
                      <p className="text-[var(--text)] text-sm">AI algorithms calculate optimal routes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--text)] text-sm">3</div>
                    <div>
                      <p className="text-[var(--text)] font-semibold">Dashboard Updates</p>
                      <p className="text-[var(--text)] text-sm">Real-time updates to the dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--accent)] mb-4">Live Demo</h2>
              <p className="text-[var(--text)] mb-6">
                Experience the logistics platform in action. The demo showcases real-time fleet tracking, 
                route optimization, and comprehensive logistics management.
              </p>
              
              <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text)]">Interactive Logistics Demo</h3>
                  <button
                    onClick={() => setCurrentPage('logistics')}
                    className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-[var(--text)] text-sm">
                  Click "Launch Demo" to experience the full logistics platform with real-time fleet tracking, 
                  route optimization, and comprehensive logistics management.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogisticsProjectPage; 