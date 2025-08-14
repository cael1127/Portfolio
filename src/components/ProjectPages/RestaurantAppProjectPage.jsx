import React, { useState } from 'react';

const RestaurantAppProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    orderManagement: `// Restaurant Order Management System
class OrderManager {
  constructor() {
    this.orders = new Map();
    this.menu = new Map();
    this.kitchen = new KitchenManager();
    this.payment = new PaymentProcessor();
  }

  createOrder(orderData) {
    const orderId = this.generateOrderId();
    const order = {
      id: orderId,
      customerId: orderData.customerId,
      items: orderData.items,
      total: this.calculateTotal(orderData.items),
      status: 'pending',
      createdAt: new Date(),
      estimatedTime: this.estimatePreparationTime(orderData.items),
      specialInstructions: orderData.specialInstructions || ''
    };

    this.orders.set(orderId, order);
    
    // Send to kitchen
    this.kitchen.addOrder(order);
    
    // Process payment
    this.payment.processPayment(order);
    
    return order;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.get(orderId);
    if (!order) return false;

    order.status = status;
    order.updatedAt = new Date();

    // Notify customer of status change
    this.notifyCustomer(order.customerId, {
      type: 'order_update',
      orderId: orderId,
      status: status
    });

    return true;
  }

  calculateTotal(items) {
    return items.reduce((total, item) => {
      const menuItem = this.menu.get(item.id);
      return total + (menuItem.price * item.quantity);
    }, 0);
  }

  estimatePreparationTime(items) {
    let totalTime = 0;
    
    items.forEach(item => {
      const menuItem = this.menu.get(item.id);
      totalTime += menuItem.preparationTime * item.quantity;
    });

    return Math.ceil(totalTime / 60); // Return in minutes
  }

  getOrderHistory(customerId) {
    return Array.from(this.orders.values())
      .filter(order => order.customerId === customerId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }
}`,
    
    kitchenManager: `// Kitchen Management System
class KitchenManager {
  constructor() {
    this.orders = new Map();
    this.stations = new Map();
    this.chefs = new Map();
    this.inventory = new InventoryManager();
  }

  addOrder(order) {
    this.orders.set(order.id, {
      ...order,
      assignedStation: null,
      assignedChef: null,
      startTime: null,
      completionTime: null
    });

    this.assignOrderToStation(order.id);
  }

  assignOrderToStation(orderId) {
    const order = this.orders.get(orderId);
    if (!order) return;

    // Find available station
    const availableStation = this.findAvailableStation(order.items);
    if (!availableStation) {
      // Queue order for later assignment
      this.queueOrder(orderId);
      return;
    }

    // Assign chef
    const availableChef = this.findAvailableChef(availableStation.type);
    if (!availableChef) {
      this.queueOrder(orderId);
      return;
    }

    // Assign order
    order.assignedStation = availableStation.id;
    order.assignedChef = availableChef.id;
    order.startTime = new Date();

    // Update station and chef status
    availableStation.currentOrder = orderId;
    availableChef.currentOrder = orderId;

    // Start preparation
    this.startPreparation(orderId);
  }

  findAvailableStation(items) {
    const requiredStations = this.getRequiredStations(items);
    
    for (const station of this.stations.values()) {
      if (station.isAvailable && requiredStations.includes(station.type)) {
        return station;
      }
    }
    
    return null;
  }

  getRequiredStations(items) {
    const stations = new Set();
    
    items.forEach(item => {
      const menuItem = this.menu.get(item.id);
      if (menuItem.station) {
        stations.add(menuItem.station);
      }
    });
    
    return Array.from(stations);
  }

  startPreparation(orderId) {
    const order = this.orders.get(orderId);
    if (!order) return;

    // Simulate preparation time
    const preparationTime = order.estimatedTime * 60 * 1000; // Convert to milliseconds
    
    setTimeout(() => {
      this.completeOrder(orderId);
    }, preparationTime);
  }

  completeOrder(orderId) {
    const order = this.orders.get(orderId);
    if (!order) return;

    order.status = 'ready';
    order.completionTime = new Date();

    // Update station and chef status
    const station = this.stations.get(order.assignedStation);
    const chef = this.chefs.get(order.assignedChef);
    
    if (station) station.currentOrder = null;
    if (chef) chef.currentOrder = null;

    // Process next queued order
    this.processQueuedOrders();
  }
}`,
    
    inventoryManager: `// Inventory Management System
class InventoryManager {
  constructor() {
    this.items = new Map();
    this.suppliers = new Map();
    this.orders = new Map();
    this.alerts = new Map();
  }

  addItem(itemData) {
    this.items.set(itemData.id, {
      id: itemData.id,
      name: itemData.name,
      category: itemData.category,
      currentStock: itemData.initialStock || 0,
      minStock: itemData.minStock || 10,
      maxStock: itemData.maxStock || 100,
      unit: itemData.unit || 'units',
      cost: itemData.cost || 0,
      supplier: itemData.supplier || null,
      lastUpdated: new Date()
    });
  }

  updateStock(itemId, quantity, operation = 'add') {
    const item = this.items.get(itemId);
    if (!item) return false;

    if (operation === 'add') {
      item.currentStock += quantity;
    } else if (operation === 'subtract') {
      item.currentStock = Math.max(0, item.currentStock - quantity);
    }

    item.lastUpdated = new Date();

    // Check if reorder is needed
    this.checkReorderNeeded(itemId);

    return true;
  }

  checkReorderNeeded(itemId) {
    const item = this.items.get(itemId);
    if (!item) return;

    if (item.currentStock <= item.minStock) {
      this.createReorderAlert(itemId);
    }
  }

  createReorderAlert(itemId) {
    const item = this.items.get(itemId);
    if (!item) return;

    const alert = {
      id: 'alert-' + itemId + '-' + Date.now(),
      type: 'low_stock',
      itemId: itemId,
      itemName: item.name,
      currentStock: item.currentStock,
      minStock: item.minStock,
      priority: item.currentStock === 0 ? 'critical' : 'warning',
      createdAt: new Date(),
      resolved: false
    };

    this.alerts.set(alert.id, alert);
    this.notifyManager(alert);
  }

  createPurchaseOrder(itemId, quantity) {
    const item = this.items.get(itemId);
    if (!item) return null;

    const order = {
      id: 'po-' + Date.now(),
      itemId: itemId,
      itemName: item.name,
      quantity: quantity,
      supplier: item.supplier,
      cost: item.cost * quantity,
      status: 'pending',
      createdAt: new Date(),
      expectedDelivery: this.calculateExpectedDelivery(item.supplier)
    };

    this.orders.set(order.id, order);
    return order;
  }

  calculateExpectedDelivery(supplierId) {
    const supplier = this.suppliers.get(supplierId);
    if (!supplier) return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days default

    const deliveryTime = supplier.averageDeliveryTime || 3; // days
    return new Date(Date.now() + deliveryTime * 24 * 60 * 60 * 1000);
  }

  getInventoryReport() {
    const report = {
      totalItems: this.items.size,
      lowStockItems: 0,
      outOfStockItems: 0,
      totalValue: 0,
      categories: {}
    };

    this.items.forEach(item => {
      if (item.currentStock <= item.minStock) {
        report.lowStockItems++;
      }
      if (item.currentStock === 0) {
        report.outOfStockItems++;
      }
      
      report.totalValue += item.currentStock * item.cost;
      
      if (!report.categories[item.category]) {
        report.categories[item.category] = 0;
      }
      report.categories[item.category]++;
    });

    return report;
  }
}`,
    
    dashboardComponent: `// React Restaurant Dashboard
import React, { useState, useEffect } from 'react';

const RestaurantDashboard = () => {
  const [restaurantData, setRestaurantData] = useState({
    orders: [],
    inventory: {},
    sales: {},
    staff: {}
  });

  useEffect(() => {
    const orderManager = new OrderManager();
    const kitchenManager = new KitchenManager();
    const inventoryManager = new InventoryManager();

    // Initialize restaurant data
    const mockOrders = [
      { id: 'ORD-001', status: 'preparing', items: 3, total: 45.50 },
      { id: 'ORD-002', status: 'ready', items: 2, total: 28.75 },
      { id: 'ORD-003', status: 'pending', items: 4, total: 62.00 }
    ];

    const mockInventory = {
      totalItems: 150,
      lowStockItems: 5,
      outOfStockItems: 2,
      totalValue: 2500
    };

    const mockSales = {
      today: 1250.50,
      week: 8750.25,
      month: 32500.00
    };

    setRestaurantData({
      orders: mockOrders,
      inventory: mockInventory,
      sales: mockSales,
      staff: { active: 8, total: 12 }
    });

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRestaurantData(prev => ({
        ...prev,
        orders: prev.orders.map(order => 
          order.status === 'preparing' && Math.random() > 0.7
            ? { ...order, status: 'ready' }
            : order
        )
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Restaurant Management System
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-400">Active Orders</h3>
            <p className="text-2xl font-bold text-white">
              {restaurantData.orders.filter(o => o.status !== 'completed').length}
            </p>
            <p className="text-sm text-gray-400">Currently processing</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-green-400">Today's Sales</h3>
            <p className="text-2xl font-bold text-white">
              ${restaurantData.sales.today?.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">Revenue</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-purple-400">Inventory</h3>
            <p className="text-2xl font-bold text-white">
              {restaurantData.inventory.totalItems}
            </p>
            <p className="text-sm text-gray-400">Total items</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-yellow-400">Staff</h3>
            <p className="text-2xl font-bold text-white">
              {restaurantData.staff.active}/{restaurantData.staff.total}
            </p>
            <p className="text-sm text-gray-400">Active/Total</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Orders</h3>
          <div className="space-y-2">
            {restaurantData.orders.map(order => (
              <div key={order.id} className="flex justify-between items-center">
                <span className="text-white">{order.id}</span>
                <span className="text-green-400">${order.total}</span>
                <span className={'text-sm px-2 py-1 rounded ' + (
                  order.status === 'ready' ? 'bg-green-600' :
                  order.status === 'preparing' ? 'bg-yellow-600' :
                  'bg-gray-600'
                )}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🍽️ Restaurant Management System</h1>
          <p className="text-gray-300 text-lg">
            Comprehensive restaurant management with order processing, kitchen management, and inventory tracking
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Restaurant Management System is a comprehensive solution that streamlines restaurant operations 
                  including order management, kitchen coordination, inventory tracking, and customer service to 
                  enhance efficiency and improve customer experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Streamline order processing</li>
                    <li>• Optimize kitchen workflow</li>
                    <li>• Manage inventory efficiently</li>
                    <li>• Improve customer service</li>
                    <li>• Track sales and analytics</li>
                    <li>• Reduce operational costs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for restaurant interface</li>
                    <li>• Node.js backend API</li>
                    <li>• Real-time order tracking</li>
                    <li>• Inventory management system</li>
                    <li>• Payment processing integration</li>
                    <li>• Analytics and reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📋 Order Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time order processing</li>
                    <li>• Order status tracking</li>
                    <li>• Special instructions handling</li>
                    <li>• Payment processing</li>
                    <li>• Order history management</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">👨‍🍳 Kitchen Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Station assignment</li>
                    <li>• Chef workload management</li>
                    <li>• Preparation time tracking</li>
                    <li>• Order prioritization</li>
                    <li>• Kitchen workflow optimization</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">📦 Inventory Management</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time stock tracking</li>
                    <li>• Low stock alerts</li>
                    <li>• Supplier management</li>
                    <li>• Purchase order automation</li>
                    <li>• Cost tracking and analysis</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📊 Analytics</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Sales performance tracking</li>
                    <li>• Customer analytics</li>
                    <li>• Menu performance analysis</li>
                    <li>• Staff productivity metrics</li>
                    <li>• Financial reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Order Management System</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.orderManagement}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Kitchen Management</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.kitchenManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Inventory Management</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.inventoryManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js restaurant interface</li>
                      <li>• Real-time order dashboard</li>
                      <li>• Kitchen display system</li>
                      <li>• Customer ordering interface</li>
                      <li>• Mobile-responsive design</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Backend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Node.js API server</li>
                      <li>• Order processing engine</li>
                      <li>• Kitchen management system</li>
                      <li>• Inventory tracking</li>
                      <li>• Payment processing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">Order Placement</p>
                      <p className="text-gray-300 text-sm">Customer places order through interface</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Kitchen Assignment</p>
                      <p className="text-gray-300 text-sm">Order assigned to available kitchen station</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">Order Completion</p>
                      <p className="text-gray-300 text-sm">Real-time updates and customer notification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the restaurant management system in action. The demo showcases order processing, 
                kitchen management, inventory tracking, and comprehensive restaurant analytics.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Restaurant Demo</h3>
                  <button
                    onClick={() => setCurrentPage('restaurantapp')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full restaurant management system with order processing, 
                  kitchen management, inventory tracking, and comprehensive analytics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantAppProjectPage; 