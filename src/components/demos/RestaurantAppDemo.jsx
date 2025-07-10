import React, { useState, useEffect } from 'react';

const RestaurantAppDemo = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([
    { id: 1, table: 'A1', items: ['Burger', 'Fries'], status: 'pending', time: '2 min ago' },
    { id: 2, table: 'B3', items: ['Pizza', 'Salad'], status: 'preparing', time: '5 min ago' },
    { id: 3, table: 'C2', items: ['Pasta', 'Wine'], status: 'ready', time: '8 min ago' },
    { id: 4, table: 'A4', items: ['Steak', 'Mashed Potatoes'], status: 'pending', time: '1 min ago' },
  ]);
  const [inventory, setInventory] = useState([
    { item: 'Beef', quantity: 45, unit: 'lbs', alert: false },
    { item: 'Chicken', quantity: 32, unit: 'lbs', alert: false },
    { item: 'Tomatoes', quantity: 8, unit: 'lbs', alert: true },
    { item: 'Lettuce', quantity: 12, unit: 'heads', alert: false },
    { item: 'Potatoes', quantity: 25, unit: 'lbs', alert: false },
    { item: 'Cheese', quantity: 15, unit: 'lbs', alert: false },
  ]);
  const [staff, setStaff] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Chef', status: 'on-shift', hours: 8 },
    { id: 2, name: 'Mike Chen', role: 'Server', status: 'on-shift', hours: 6 },
    { id: 3, name: 'Emma Davis', role: 'Host', status: 'off-shift', hours: 0 },
    { id: 4, name: 'Alex Rodriguez', role: 'Kitchen Helper', status: 'on-shift', hours: 4 },
  ]);
  const [loyaltyCustomers, setLoyaltyCustomers] = useState([
    { name: 'John Smith', points: 1250, tier: 'Gold', visits: 15 },
    { name: 'Lisa Brown', points: 850, tier: 'Silver', visits: 8 },
    { name: 'David Wilson', points: 420, tier: 'Bronze', visits: 4 },
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateInventory = (itemName, newQuantity) => {
    setInventory(inventory.map(item => 
      item.item === itemName ? { ...item, quantity: newQuantity, alert: newQuantity < 10 } : item
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🍽️ Restaurant Management App</h1>
          <p className="text-gray-400">Complete restaurant management solution</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'orders', name: 'Orders', icon: '📋' },
            { id: 'inventory', name: 'Inventory', icon: '📦' },
            { id: 'staff', name: 'Staff', icon: '👥' },
            { id: 'loyalty', name: 'Loyalty', icon: '🎁' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📋 Active Orders</h2>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-semibold">Table {order.table}</h3>
                        <p className="text-gray-400 text-sm">{order.time}</p>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className="mb-3">
                      {order.items.map((item, index) => (
                        <span key={index} className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm mr-2 mb-1">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-all"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-all"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-all"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📊 Order Analytics</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">12</div>
                  <div className="text-gray-400 text-sm">Orders Today</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">$1,247</div>
                  <div className="text-gray-400 text-sm">Revenue Today</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">8.5</div>
                  <div className="text-gray-400 text-sm">Avg. Order Time</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">4.2</div>
                  <div className="text-gray-400 text-sm">Avg. Rating</div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Popular Items</h3>
                <div className="space-y-2">
                  {['Burger (15 orders)', 'Pizza (12 orders)', 'Pasta (8 orders)', 'Salad (6 orders)'].map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.split(' (')[0]}</span>
                      <span className="text-gray-400">{item.split('(')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📦 Inventory Management</h2>
              <div className="space-y-3">
                {inventory.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg ${item.alert ? 'bg-red-900 border border-red-600' : 'bg-gray-800'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium">{item.item}</h3>
                        <p className="text-gray-400 text-sm">{item.quantity} {item.unit}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.alert && <span className="text-red-400 text-sm">⚠️ Low Stock</span>}
                        <button
                          onClick={() => updateInventory(item.item, item.quantity + 5)}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 transition-all"
                        >
                          +5
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📈 Inventory Analytics</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Stock Alerts</h3>
                  <div className="text-red-400 text-sm">• Tomatoes: 8 lbs (Low stock)</div>
                  <div className="text-yellow-400 text-sm">• Chicken: 32 lbs (Monitor)</div>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Usage This Week</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Beef</span>
                      <span className="text-gray-400">-12 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Chicken</span>
                      <span className="text-gray-400">-8 lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tomatoes</span>
                      <span className="text-gray-400">-15 lbs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Tab */}
        {activeTab === 'staff' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">👥 Staff Management</h2>
              <div className="space-y-3">
                {staff.map(employee => (
                  <div key={employee.id} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{employee.name}</h3>
                        <p className="text-gray-400 text-sm">{employee.role}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm ${employee.status === 'on-shift' ? 'text-green-400' : 'text-gray-400'}`}>
                          {employee.status === 'on-shift' ? '🟢 On Shift' : '⚫ Off Shift'}
                        </div>
                        <div className="text-gray-400 text-sm">{employee.hours}h today</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📅 Schedule</h2>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="text-white font-semibold mb-3">Today's Schedule</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sarah Johnson</span>
                    <span className="text-gray-400">6:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Mike Chen</span>
                    <span className="text-gray-400">11:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Alex Rodriguez</span>
                    <span className="text-gray-400">2:00 PM - 10:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Labor Cost</h3>
                <div className="text-2xl font-bold text-green-400 mb-1">$847</div>
                <div className="text-gray-400 text-sm">This week</div>
              </div>
            </div>
          </div>
        )}

        {/* Loyalty Tab */}
        {activeTab === 'loyalty' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">🎁 Loyalty Program</h2>
              <div className="space-y-3">
                {loyaltyCustomers.map((customer, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-semibold">{customer.name}</h3>
                        <p className="text-gray-400 text-sm">{customer.tier} Member</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-semibold">{customer.points} pts</div>
                        <div className="text-gray-400 text-sm">{customer.visits} visits</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">📊 Loyalty Analytics</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">247</div>
                  <div className="text-gray-400 text-sm">Total Members</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">1,847</div>
                  <div className="text-gray-400 text-sm">Points Redeemed</div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">Rewards Available</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Free Appetizer</span>
                    <span className="text-gray-400">500 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">50% Off Entrée</span>
                    <span className="text-gray-400">1000 pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Free Dessert</span>
                    <span className="text-gray-400">750 pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantAppDemo; 