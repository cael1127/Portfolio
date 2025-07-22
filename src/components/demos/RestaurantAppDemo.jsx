import React, { useState, useEffect } from 'react';

const RestaurantAppDemo = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    averageOrderValue: 0,
    customerSatisfaction: 0
  });

  // Initialize restaurant app data
  useEffect(() => {
    const initialMenu = [
      {
        id: 1,
        name: 'Margherita Pizza',
        category: 'Pizza',
        price: 18.99,
        status: 'available',
        stock: 25,
        lastUpdate: '2 minutes ago',
        alerts: [],
        ingredients: ['Mozzarella', 'Tomato Sauce', 'Basil'],
        preparation: {
          time: 15,
          difficulty: 'medium',
          calories: 850,
          allergens: ['Dairy', 'Gluten']
        },
        sales: {
          today: 12,
          week: 89,
          month: 342,
          rating: 4.7
        }
      },
      {
        id: 2,
        name: 'Caesar Salad',
        category: 'Salads',
        price: 12.99,
        status: 'available',
        stock: 15,
        lastUpdate: '1 minute ago',
        alerts: [],
        ingredients: ['Romaine Lettuce', 'Parmesan', 'Croutons', 'Caesar Dressing'],
        preparation: {
          time: 8,
          difficulty: 'easy',
          calories: 320,
          allergens: ['Dairy', 'Gluten']
        },
        sales: {
          today: 8,
          week: 45,
          month: 178,
          rating: 4.5
        }
      },
      {
        id: 3,
        name: 'Pasta Carbonara',
        category: 'Pasta',
        price: 16.99,
        status: 'warning',
        stock: 8,
        lastUpdate: 'Just now',
        alerts: ['Low stock alert', 'Popular item'],
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan'],
        preparation: {
          time: 12,
          difficulty: 'medium',
          calories: 650,
          allergens: ['Eggs', 'Gluten']
        },
        sales: {
          today: 15,
          week: 67,
          month: 234,
          rating: 4.8
        }
      }
    ];
    setMenu(initialMenu);
    setSystemStats({
      totalOrders: 156,
      activeOrders: 8,
      averageOrderValue: 24.50,
      customerSatisfaction: 4.6
    });
  }, []);

  // Simulate real-time order updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => {
        const newOrders = [...prevOrders];
        
        // Add new orders randomly
        if (Math.random() > 0.7) {
          const orderTypes = ['Dine-in', 'Takeout', 'Delivery'];
          const orderStatuses = ['pending', 'preparing', 'ready', 'completed'];
          const newOrder = {
            id: Date.now() + Math.random(),
            customer: `Customer ${Math.floor(Math.random() * 100)}`,
            type: orderTypes[Math.floor(Math.random() * orderTypes.length)],
            status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
            items: [
              { name: 'Margherita Pizza', quantity: Math.floor(Math.random() * 3) + 1, price: 18.99 },
              { name: 'Caesar Salad', quantity: Math.floor(Math.random() * 2) + 1, price: 12.99 }
            ],
            total: 0,
            timestamp: new Date().toLocaleTimeString(),
            estimatedTime: Math.floor(Math.random() * 30) + 15
          };
          newOrder.total = newOrder.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          newOrders.unshift(newOrder);
        }

        // Update existing orders
        newOrders.forEach(order => {
          if (order.status === 'pending' && Math.random() > 0.8) {
            order.status = 'preparing';
          } else if (order.status === 'preparing' && Math.random() > 0.7) {
            order.status = 'ready';
          } else if (order.status === 'ready' && Math.random() > 0.6) {
            order.status = 'completed';
          }
        });

        return newOrders.slice(0, 10); // Keep only last 10 orders
      });

      setSystemStats(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 2),
        activeOrders: Math.floor(Math.random() * 5) + 5,
        averageOrderValue: Math.max(15, Math.min(35, prev.averageOrderValue + (Math.random() - 0.5) * 2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate menu updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMenu(prevMenu => prevMenu.map(item => {
        const newItem = {
          ...item,
          stock: Math.max(0, item.stock - Math.floor(Math.random() * 2)),
          lastUpdate: 'Just now'
        };

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newItem.stock < 10) {
          newAlerts.push('Low stock alert');
        }
        if (newItem.sales.today > 10) {
          newAlerts.push('High demand');
        }
        if (newItem.preparation.time > 20) {
          newAlerts.push('Long prep time');
        }

        newItem.alerts = newAlerts;
        newItem.status = newAlerts.length > 2 ? 'critical' : 
                        newAlerts.length > 0 ? 'warning' : 'available';
        
        return newItem;
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = menu.flatMap(item => 
        item.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          item: item.name,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, [menu]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'available': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'preparing': return 'text-blue-400';
      case 'ready': return 'text-green-400';
      case 'completed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getOrderStatusBg = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'preparing': return 'bg-blue-600';
      case 'ready': return 'bg-green-600';
      case 'completed': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🍽️ Restaurant Management System</h1>
          <p className="text-gray-300 text-lg">
            Comprehensive restaurant management with order processing, inventory tracking, and customer analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Orders</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Order Value</h3>
            <p className="text-3xl font-bold text-purple-400">${systemStats.averageOrderValue.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Customer Satisfaction</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.customerSatisfaction.toFixed(1)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Order Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedOrder?.id === order.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{order.customer}</h3>
                        <p className="text-gray-400 text-sm">{order.type} • {order.timestamp}</p>
                        <p className={`text-sm ${getOrderStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded text-xs ${getOrderStatusBg(order.status)}`}>
                          {order.items.length} items
                        </div>
                        <p className="text-gray-400 text-xs mt-1">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Items</p>
                        <p className="text-white font-semibold">{order.items.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Est. Time</p>
                        <p className="text-white">{order.estimatedTime} min</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Order Progress</span>
                        <span>{order.status === 'completed' ? '100%' : 
                               order.status === 'ready' ? '75%' :
                               order.status === 'preparing' ? '50%' : '25%'}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            order.status === 'completed' ? 'bg-green-500' : 
                            order.status === 'ready' ? 'bg-green-400' :
                            order.status === 'preparing' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: order.status === 'completed' ? '100%' : 
                                   order.status === 'ready' ? '75%' :
                                   order.status === 'preparing' ? '50%' : '25%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu & Alerts */}
          <div className="space-y-6">
            {/* Menu Items */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">🍽️ Menu Items</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {menu.map((item) => (
                  <div key={item.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-blue-200 text-sm">{item.category} • ${item.price}</p>
                        <p className={`text-gray-300 text-xs ${getStatusColor(item.status)}`}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-300">{item.stock} in stock</div>
                        <p className="text-gray-300 text-xs mt-1">⭐ {item.sales.rating}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 System Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.item}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Restaurant Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  New Order
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Update Menu
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Inventory Check
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Order #{selectedOrder.id} Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Order Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Customer</span>
                    <span className="text-lg font-semibold text-white">{selectedOrder.customer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Order Type</span>
                    <span className="text-lg font-semibold text-white">{selectedOrder.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={`px-2 py-1 rounded text-sm ${getOrderStatusBg(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total</span>
                    <span className="text-lg font-semibold text-white">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Order Items</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{item.name}</p>
                          <p className="text-gray-300 text-sm">Qty: {item.quantity}</p>
                          <p className="text-gray-400 text-xs">${item.price} each</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Timeline */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">📋 Order Timeline</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-white font-semibold">Order Placed</p>
                      <p className="text-gray-400 text-sm">{selectedOrder.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.status === 'preparing' || selectedOrder.status === 'ready' || selectedOrder.status === 'completed' 
                        ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="text-white font-semibold">Preparing</p>
                      <p className="text-gray-400 text-sm">Estimated: {selectedOrder.estimatedTime} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOrder.status === 'ready' || selectedOrder.status === 'completed' 
                        ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="text-white font-semibold">Ready for Pickup</p>
                      <p className="text-gray-400 text-sm">Order completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced Restaurant Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Order Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time order tracking</li>
                <li>• Multi-channel ordering</li>
                <li>• Kitchen display system</li>
                <li>• Delivery tracking</li>
                <li>• Payment processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Inventory & Menu</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Stock level monitoring</li>
                <li>• Menu customization</li>
                <li>• Ingredient tracking</li>
                <li>• Recipe management</li>
                <li>• Pricing optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytics & Reporting</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Sales analytics</li>
                <li>• Customer insights</li>
                <li>• Performance metrics</li>
                <li>• Revenue optimization</li>
                <li>• Trend analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantAppDemo; 