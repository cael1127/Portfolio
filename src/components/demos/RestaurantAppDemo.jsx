import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const RestaurantAppDemo = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [restaurantStats, setRestaurantStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    kitchenLoad: 0,
    tableOccupancy: 0,
    dailyCustomers: 0,
    monthlyRevenue: 0
  });

  // Sample code for the demo
  const demoCode = `/**
 * Restaurant Management System Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a complete restaurant management
 * system with order tracking, table management, and kitchen operations.
 */

import React, { useState, useEffect } from 'react';

const RestaurantAppDemo = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => ({
        ...order,
        status: order.status === 'pending' ? 'preparing' : 
                order.status === 'preparing' ? 'ready' : order.status,
        lastUpdate: 'Just now'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const placeOrder = (tableId, items) => {
    const newOrder = {
      id: Date.now(),
      tableId,
      items,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString(),
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">Order #{order.id}</h3>
              <p className="text-gray-300 text-sm">Table {order.tableId}</p>
              <p className="text-gray-400 text-xs">${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        {/* Tables */}
        <div className="space-y-4">
          {tables.map((table) => (
            <div key={table.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">Table {table.id}</h3>
              <p className="text-gray-300 text-sm">{table.status}</p>
              <p className="text-gray-400 text-xs">{table.capacity} seats</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantAppDemo;`;

  useEffect(() => {
    // Initialize restaurant data
    const initialOrders = [
      {
        id: 1,
        tableId: 5,
        customerName: 'John Smith',
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 18.99, category: 'Pizza' },
          { name: 'Caesar Salad', quantity: 1, price: 12.99, category: 'Salad' },
          { name: 'Coke', quantity: 2, price: 3.99, category: 'Beverage' }
        ],
        status: 'preparing',
        timestamp: '2:30 PM',
        total: 41.96,
        estimatedTime: 15,
        specialInstructions: 'Extra cheese on pizza',
        server: 'Sarah',
        lastUpdate: 'Just now'
      },
      {
        id: 2,
        tableId: 3,
        customerName: 'Emma Johnson',
        items: [
          { name: 'Grilled Salmon', quantity: 1, price: 24.99, category: 'Main Course' },
          { name: 'Garlic Bread', quantity: 1, price: 6.99, category: 'Appetizer' },
          { name: 'Red Wine', quantity: 1, price: 8.99, category: 'Beverage' }
        ],
        status: 'ready',
        timestamp: '2:15 PM',
        total: 40.97,
        estimatedTime: 0,
        specialInstructions: 'Salmon medium rare',
        server: 'Mike',
        lastUpdate: '1 minute ago'
      },
      {
        id: 3,
        tableId: 7,
        customerName: 'David Wilson',
        items: [
          { name: 'Pasta Carbonara', quantity: 1, price: 16.99, category: 'Pasta' },
          { name: 'Tiramisu', quantity: 1, price: 9.99, category: 'Dessert' },
          { name: 'Espresso', quantity: 1, price: 4.99, category: 'Beverage' }
        ],
        status: 'pending',
        timestamp: '2:45 PM',
        total: 31.97,
        estimatedTime: 20,
        specialInstructions: 'No mushrooms in pasta',
        server: 'Lisa',
        lastUpdate: 'Just now'
      },
      {
        id: 4,
        tableId: 2,
        customerName: 'Maria Garcia',
        items: [
          { name: 'Chicken Alfredo', quantity: 1, price: 19.99, category: 'Pasta' },
          { name: 'House Salad', quantity: 1, price: 10.99, category: 'Salad' },
          { name: 'Lemonade', quantity: 1, price: 4.99, category: 'Beverage' }
        ],
        status: 'served',
        timestamp: '2:00 PM',
        total: 35.97,
        estimatedTime: 0,
        specialInstructions: 'Dressing on the side',
        server: 'Tom',
        lastUpdate: '5 minutes ago'
      },
      {
        id: 5,
        tableId: 8,
        customerName: 'Alex Chen',
        items: [
          { name: 'Beef Burger', quantity: 2, price: 15.99, category: 'Burgers' },
          { name: 'French Fries', quantity: 1, price: 7.99, category: 'Sides' },
          { name: 'Milkshake', quantity: 2, price: 6.99, category: 'Beverage' }
        ],
        status: 'preparing',
        timestamp: '3:00 PM',
        total: 52.95,
        estimatedTime: 12,
        specialInstructions: 'Burgers medium well',
        server: 'Sarah',
        lastUpdate: 'Just now'
      }
    ];

    const initialMenu = [
      {
        id: 1,
        name: 'Margherita Pizza',
        category: 'Pizza',
        price: 18.99,
        description: 'Fresh mozzarella, tomato sauce, basil',
        available: true,
        preparationTime: 15,
        popularity: 95,
        ingredients: ['Dough', 'Mozzarella', 'Tomato Sauce', 'Basil']
      },
      {
        id: 2,
        name: 'Grilled Salmon',
        category: 'Main Course',
        price: 24.99,
        description: 'Atlantic salmon with seasonal vegetables',
        available: true,
        preparationTime: 20,
        popularity: 88,
        ingredients: ['Salmon', 'Vegetables', 'Herbs', 'Lemon']
      },
      {
        id: 3,
        name: 'Pasta Carbonara',
        category: 'Pasta',
        price: 16.99,
        description: 'Spaghetti with eggs, cheese, and pancetta',
        available: true,
        preparationTime: 12,
        popularity: 92,
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta']
      },
      {
        id: 4,
        name: 'Caesar Salad',
        category: 'Salad',
        price: 12.99,
        description: 'Romaine lettuce, croutons, parmesan cheese',
        available: true,
        preparationTime: 8,
        popularity: 85,
        ingredients: ['Romaine', 'Croutons', 'Parmesan', 'Caesar Dressing']
      },
      {
        id: 5,
        name: 'Tiramisu',
        category: 'Dessert',
        price: 9.99,
        description: 'Classic Italian dessert with coffee and mascarpone',
        available: true,
        preparationTime: 5,
        popularity: 90,
        ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Cocoa']
      }
    ];

    const initialTables = [
      {
        id: 1,
        status: 'occupied',
        capacity: 4,
        currentParty: 3,
        server: 'Sarah',
        startTime: '1:45 PM',
        estimatedEnd: '3:15 PM',
        billTotal: 67.50
      },
      {
        id: 2,
        status: 'cleaning',
        capacity: 6,
        currentParty: 0,
        server: 'Tom',
        startTime: '12:30 PM',
        estimatedEnd: '2:30 PM',
        billTotal: 89.25
      },
      {
        id: 3,
        status: 'occupied',
        capacity: 2,
        currentParty: 2,
        server: 'Mike',
        startTime: '2:15 PM',
        estimatedEnd: '3:45 PM',
        billTotal: 40.97
      },
      {
        id: 4,
        status: 'available',
        capacity: 4,
        currentParty: 0,
        server: null,
        startTime: null,
        estimatedEnd: null,
        billTotal: 0
      },
      {
        id: 5,
        status: 'occupied',
        capacity: 8,
        currentParty: 6,
        server: 'Sarah',
        startTime: '2:30 PM',
        estimatedEnd: '4:00 PM',
        billTotal: 41.96
      },
      {
        id: 6,
        status: 'reserved',
        capacity: 4,
        currentParty: 0,
        server: 'Lisa',
        startTime: '3:30 PM',
        estimatedEnd: '5:30 PM',
        billTotal: 0
      },
      {
        id: 7,
        status: 'occupied',
        capacity: 2,
        currentParty: 1,
        server: 'Lisa',
        startTime: '2:45 PM',
        estimatedEnd: '4:15 PM',
        billTotal: 31.97
      },
      {
        id: 8,
        status: 'occupied',
        capacity: 6,
        currentParty: 4,
        server: 'Sarah',
        startTime: '3:00 PM',
        estimatedEnd: '4:30 PM',
        billTotal: 52.95
      }
    ];

    const initialKitchen = [
      {
        id: 1,
        orderId: 1,
        item: 'Margherita Pizza',
        status: 'preparing',
        startTime: '2:30 PM',
        estimatedTime: 15,
        chef: 'Chef Marco',
        priority: 'normal'
      },
      {
        id: 2,
        orderId: 2,
        item: 'Grilled Salmon',
        status: 'ready',
        startTime: '2:15 PM',
        estimatedTime: 0,
        chef: 'Chef Anna',
        priority: 'high'
      },
      {
        id: 3,
        orderId: 3,
        item: 'Pasta Carbonara',
        status: 'pending',
        startTime: '2:45 PM',
        estimatedTime: 20,
        chef: 'Chef Marco',
        priority: 'normal'
      },
      {
        id: 4,
        orderId: 5,
        item: 'Beef Burger',
        status: 'preparing',
        startTime: '3:00 PM',
        estimatedTime: 12,
        chef: 'Chef Anna',
        priority: 'high'
      }
    ];

    setOrders(initialOrders);
    setMenu(initialMenu);
    setTables(initialTables);
    setKitchen(initialKitchen);
  }, []);

  useEffect(() => {
    // Simulate real-time restaurant updates
    const interval = setInterval(() => {
      // Update orders
      setOrders(prev => prev.map(order => {
        if (order.status === 'pending' && Math.random() > 0.7) {
          return { ...order, status: 'preparing', lastUpdate: 'Just now' };
        } else if (order.status === 'preparing' && Math.random() > 0.6) {
          return { ...order, status: 'ready', lastUpdate: 'Just now' };
        } else if (order.status === 'ready' && Math.random() > 0.8) {
          return { ...order, status: 'served', lastUpdate: 'Just now' };
        }
        return order;
      }));

      // Update kitchen
      setKitchen(prev => prev.map(item => {
        if (item.status === 'pending' && Math.random() > 0.7) {
          return { ...item, status: 'preparing', startTime: new Date().toLocaleTimeString() };
        } else if (item.status === 'preparing' && Math.random() > 0.6) {
          return { ...item, status: 'ready' };
        }
        return item;
      }));

      // Update restaurant stats
      setRestaurantStats(prev => ({
        totalOrders: orders.length,
        activeOrders: orders.filter(o => o.status !== 'served').length,
        totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
        averageOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length : 0,
        kitchenLoad: Math.max(20, Math.min(95, prev.kitchenLoad + (Math.random() - 0.5) * 10)),
        tableOccupancy: (tables.filter(t => t.status === 'occupied').length / tables.length) * 100,
        dailyCustomers: Math.floor(Math.random() * 50) + 100,
        monthlyRevenue: prev.monthlyRevenue + Math.random() * 1000
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [orders, tables, kitchen]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'preparing': return 'text-blue-400';
      case 'ready': return 'text-green-400';
      case 'served': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'preparing': return 'bg-blue-600';
      case 'ready': return 'bg-green-600';
      case 'served': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'occupied': return 'text-red-400';
      case 'reserved': return 'text-blue-400';
      case 'cleaning': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getTableStatusBg = (status) => {
    switch (status) {
      case 'available': return 'bg-green-600';
      case 'occupied': return 'bg-red-600';
      case 'reserved': return 'bg-blue-600';
      case 'cleaning': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getKitchenStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'preparing': return 'text-blue-400';
      case 'ready': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getKitchenStatusBg = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'preparing': return 'bg-blue-600';
      case 'ready': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-orange-400 mb-4">🍽️ Advanced Restaurant App</h1>
            <p className="text-gray-300 text-lg">
              Complete restaurant management system with order processing, table management, and real-time analytics
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

        {/* Restaurant Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 p-6 rounded-xl border border-orange-800">
            <div className="text-3xl mb-2">🍽️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Orders</h3>
            <p className="text-3xl font-bold text-orange-400">{restaurantStats.activeOrders}</p>
            <p className="text-orange-300 text-sm">{restaurantStats.totalOrders} total today</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-400">{formatCurrency(restaurantStats.totalRevenue)}</p>
            <p className="text-green-300 text-sm">{formatCurrency(restaurantStats.monthlyRevenue)} monthly</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">👨‍🍳</div>
            <h3 className="text-xl font-semibold text-white mb-2">Kitchen Load</h3>
            <p className="text-3xl font-bold text-blue-400">{restaurantStats.kitchenLoad.toFixed(1)}%</p>
            <p className="text-blue-300 text-sm">{restaurantStats.dailyCustomers} customers today</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🪑</div>
            <h3 className="text-xl font-semibold text-white mb-2">Table Occupancy</h3>
            <p className="text-3xl font-bold text-purple-400">{restaurantStats.tableOccupancy.toFixed(1)}%</p>
            <p className="text-purple-300 text-sm">{formatCurrency(restaurantStats.averageOrderValue)} avg order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 p-6 rounded-xl border border-orange-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🍽️ Order Management</h2>
                <div className="text-sm text-orange-300">Real-time updates every 5s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedOrder?.id === order.id
                        ? 'border-orange-400 bg-orange-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">Order #{order.id}</h3>
                        <p className="text-orange-200 text-sm">Table {order.tableId} • {order.customerName}</p>
                        <p className="text-orange-200 text-xs">{order.items.length} items • {order.server}</p>
                        <p className="text-gray-300 text-xs">{order.timestamp} • {order.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(order.status)}>
                          {order.status.toUpperCase()}
                        </div>
                        <p className="text-white text-lg font-semibold mt-1">{formatCurrency(order.total)}</p>
                        <p className="text-gray-300 text-xs">{order.estimatedTime}m remaining</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Items</p>
                        <p className="text-white font-semibold">{order.items.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Categories</p>
                        <p className="text-white font-semibold">{new Set(order.items.map(item => item.category)).size}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Special</p>
                        <p className="text-white font-semibold">{order.specialInstructions ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{order.status === 'pending' ? '25%' : order.status === 'preparing' ? '75%' : '100%'}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            order.status === 'served' ? 'bg-green-500' : 
                            order.status === 'ready' ? 'bg-green-500' : 
                            order.status === 'preparing' ? 'bg-blue-500' : 'bg-yellow-500'
                          )}
                          style={{ width: (order.status === 'pending' ? 25 : order.status === 'preparing' ? 75 : 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Restaurant Analytics */}
          <div className="space-y-6">
            {/* Kitchen Queue */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👨‍🍳 Kitchen Queue</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {kitchen.map((item) => (
                  <div key={item.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{item.item}</p>
                        <p className="text-blue-200 text-sm">Order #{item.orderId}</p>
                        <p className="text-blue-200 text-xs">{item.chef}</p>
                        <p className="text-gray-300 text-xs">{item.startTime}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getKitchenStatusBg(item.status)}>
                          {item.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{item.estimatedTime}m</p>
                        <p className="text-gray-300 text-xs">{item.priority}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Status */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-4">🪑 Table Status</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {tables.map((table) => (
                  <div key={table.id} className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">Table {table.id}</p>
                        <p className="text-green-200 text-sm">{table.capacity} seats</p>
                        <p className="text-green-200 text-xs">{table.currentParty} guests</p>
                        <p className="text-gray-300 text-xs">{table.server || 'Unassigned'}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getTableStatusBg(table.status)}>
                          {table.status.toUpperCase()}
                        </div>
                        {table.billTotal > 0 && (
                          <p className="text-white text-xs mt-1">{formatCurrency(table.billTotal)}</p>
                        )}
                        {table.estimatedEnd && (
                          <p className="text-gray-300 text-xs">{table.estimatedEnd}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">📋 Popular Items</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {menu.map((item) => (
                  <div key={item.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{item.name}</p>
                        <p className="text-purple-200 text-sm">{item.category}</p>
                        <p className="text-purple-200 text-xs">{item.description}</p>
                        <p className="text-gray-300 text-xs">{item.preparationTime}m prep</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{formatCurrency(item.price)}</p>
                        <p className="text-purple-300 text-xs">⭐ {item.popularity}%</p>
                        <div className={'w-2 h-2 rounded-full mt-1 ' + (item.available ? 'bg-green-400' : 'bg-red-400')}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Order ID:</span>
                      <span className="text-white font-semibold">#{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Table:</span>
                      <span className="text-white font-semibold">{selectedOrder.tableId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Customer:</span>
                      <span className="text-white font-semibold">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={'font-semibold ' + getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Server:</span>
                      <span className="text-white font-semibold">{selectedOrder.server}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white font-semibold">{selectedOrder.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Order Items</h3>
                  <div className="space-y-2 text-sm">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-semibold">{item.name}</p>
                          <p className="text-gray-300 text-xs">{item.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">x{item.quantity}</p>
                          <p className="text-gray-300 text-xs">{formatCurrency(item.price)}</p>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400 font-semibold">Total:</span>
                        <span className="text-white font-semibold">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedOrder.specialInstructions && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">Special Instructions</h3>
                      <p className="text-gray-300 text-sm">{selectedOrder.specialInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Restaurant Features */}
        <div className="mt-8 bg-gradient-to-br from-orange-900 via-orange-800 to-orange-700 p-6 rounded-xl border border-orange-800">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Restaurant Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Order Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time order tracking</li>
                <li>• Kitchen queue management</li>
                <li>• Table assignment</li>
                <li>• Special instructions</li>
                <li>• Order prioritization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Table Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Table status tracking</li>
                <li>• Reservation system</li>
                <li>• Server assignment</li>
                <li>• Turn time analytics</li>
                <li>• Capacity optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Analytics & Reporting</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Sales analytics</li>
                <li>• Popular items tracking</li>
                <li>• Kitchen performance</li>
                <li>• Customer insights</li>
                <li>• Revenue optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        code={demoCode}
        language="jsx"
        title="Restaurant App Demo Code"
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
      />
    </div>
  );
};

export default RestaurantAppDemo; 