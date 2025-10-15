import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const RestaurantAppDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('menu');
  const [orderHistory, setOrderHistory] = useState([]);

  const sampleMenu = [
      {
        id: 1,
        name: 'Margherita Pizza',
        category: 'Pizza',
      price: 12.99,
        description: 'Fresh mozzarella, tomato sauce, basil',
      image: '🍕',
        preparationTime: 15,
      calories: 850,
      dietary: ['Vegetarian']
      },
      {
        id: 2,
      name: 'Caesar Salad',
      category: 'Salads',
      price: 8.99,
      description: 'Romaine lettuce, croutons, parmesan, Caesar dressing',
      image: '🥗',
      preparationTime: 10,
      calories: 320,
      dietary: ['Gluten-Free Option']
    },
    {
      id: 3,
        name: 'Grilled Salmon',
        category: 'Main Course',
      price: 18.99,
      description: 'Atlantic salmon with vegetables and rice',
      image: '🐟',
        preparationTime: 20,
      calories: 580,
      dietary: ['Gluten-Free', 'High Protein']
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      category: 'Desserts',
      price: 6.99,
      description: 'Warm chocolate cake with vanilla ice cream',
      image: '🍰',
        preparationTime: 12,
      calories: 650,
      dietary: ['Vegetarian']
    },
    {
      id: 5,
      name: 'Classic Burger',
      category: 'Burgers',
      price: 14.99,
      description: 'Beef patty, lettuce, tomato, cheese, special sauce',
      image: '🍔',
      preparationTime: 18,
      calories: 920,
      dietary: []
    },
    {
      id: 6,
      name: 'Iced Latte',
      category: 'Beverages',
      price: 4.99,
      description: 'Cold espresso with milk and ice',
      image: '☕',
        preparationTime: 5,
      calories: 120,
      dietary: ['Vegetarian']
    }
  ];

  const categories = ['all', 'Pizza', 'Salads', 'Main Course', 'Burgers', 'Desserts', 'Beverages'];

  useEffect(() => {
    setMenuItems(sampleMenu);
    setOrderHistory([
      {
        id: 1,
        date: '2024-01-15',
        items: 3,
        total: 42.97,
        status: 'Delivered'
      },
      {
        id: 2,
        date: '2024-01-10',
        items: 2,
        total: 27.98,
        status: 'Delivered'
      }
    ]);
  }, []);

  const filteredMenu = menuItems.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

  const handleAddToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// Restaurant Ordering System with Real-time Updates

const RestaurantApp = () => {
  const [orders, setOrders] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to real-time order tracking
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('order_update', (order) => {
      updateOrderStatus(order);
    });

    newSocket.on('delivery_location', (location) => {
      updateDeliveryLocation(location);
    });

    return () => newSocket.close();
  }, []);

  return <div>{/* Restaurant UI */}</div>;
};

// Backend - Express.js with MongoDB
const express = require('express');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const twilio = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();

// MongoDB Schemas
const menuItemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  ingredients: [String],
  allergens: [String],
  preparationTime: Number,
  available: { type: Boolean, default: true },
  images: [String],
  nutritionInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerId: mongoose.Schema.Types.ObjectId,
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number,
    specialInstructions: String,
    price: Number
  }],
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number,
  deliveryAddress: {
    street: String,
    city: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentIntent: String,
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  rating: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethodId } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItemId);
      
      if (!menuItem || !menuItem.available) {
        return res.status(400).json({ 
          error: \`Item \${menuItem?.name || 'unknown'} is not available\` 
        });
      }

      subtotal += menuItem.price * item.quantity;
      
      orderItems.push({
        menuItem: menuItem._id,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions,
        price: menuItem.price
      });
    }

    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = 4.99;
    const total = subtotal + tax + deliveryFee;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      metadata: {
        orderType: 'restaurant'
      }
    });

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment failed' });
    }

    // Create order
    const order = new Order({
      orderNumber: generateOrderNumber(),
      customerId: req.user._id,
      items: orderItems,
      subtotal,
      tax,
      deliveryFee,
      total,
      deliveryAddress,
      paymentIntent: paymentIntent.id,
      estimatedDeliveryTime: calculateETA(deliveryAddress),
      status: 'confirmed'
    });

    await order.save();

    // Send SMS confirmation
    await twilio.messages.create({
      body: \`Order \${order.orderNumber} confirmed! Estimated delivery: \${order.estimatedDeliveryTime}\`,
      to: req.user.phone,
      from: process.env.TWILIO_PHONE
    });

    // Notify kitchen
    io.to('kitchen').emit('new_order', order);

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Order Status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        ...(status === 'delivered' && { actualDeliveryTime: new Date() })
      },
      { new: true }
    );

    // Real-time update to customer
    io.to(\`order-\${order._id}\`).emit('order_update', {
      status,
      message: getStatusMessage(status)
    });

    // Send SMS update
    const customer = await User.findById(order.customerId);
    await twilio.messages.create({
      body: getStatusMessage(status),
      to: customer.phone,
      from: process.env.TWILIO_PHONE
    });

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Real-time Delivery Tracking
app.get('/api/orders/:id/track', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Get delivery driver location (if assigned)
    const driverLocation = await getDriverLocation(order._id);

    res.json({
      order,
      driverLocation,
      estimatedArrival: calculateArrival(driverLocation, order.deliveryAddress)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Table Reservation System
app.post('/api/reservations', async (req, res) => {
  try {
    const { date, time, partySize, specialRequests } = req.body;

    // Check availability
    const available = await checkTableAvailability(date, time, partySize);

    if (!available) {
      return res.status(400).json({ error: 'No tables available for this time' });
    }

    const reservation = new Reservation({
      customerId: req.user._id,
      date,
      time,
      partySize,
      specialRequests,
      status: 'confirmed'
    });

    await reservation.save();

    // Send confirmation
    await sendReservationConfirmation(req.user, reservation);

    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper Functions
function generateOrderNumber() {
  return \`ORD-\${Date.now()}\`;
}

function calculateETA(address) {
  // Calculate based on distance and current orders
  const preparationTime = 20; // minutes
  const deliveryTime = 30; // minutes
  return new Date(Date.now() + (preparationTime + deliveryTime) * 60000);
}

function getStatusMessage(status) {
  const messages = {
    confirmed: 'Your order has been confirmed!',
    preparing: 'Your food is being prepared',
    ready: 'Your order is ready for pickup!',
    out_for_delivery: 'Your order is on the way!',
    delivered: 'Your order has been delivered. Enjoy!'
  };
  return messages[status];
}

app.listen(3000, () => console.log('Restaurant API running'));`,
    explanation: `Complete restaurant ordering system with menu management, online ordering, payment processing, real-time order tracking, and table reservations.

## Core Implementation

**Key Features**: This demo showcases a full-featured restaurant app with digital menu, cart management, Stripe payments, SMS notifications, real-time order tracking, and table reservation system.

**Architecture**: Built with React frontend, Express.js backend, MongoDB for data storage, Socket.io for real-time updates, Stripe for payments, and Twilio for SMS notifications.

**Performance**: Implements efficient order processing, real-time status updates via WebSocket, optimized menu queries with caching, and sub-second checkout experience.

## Technical Benefits

- **Real-time Updates**: Live order status and delivery tracking
- **Payment Integration**: Secure Stripe payment processing
- **SMS Notifications**: Automated order updates via Twilio
- **Scalable Architecture**: Handles high order volumes`,
    technologies: [
      {
        name: 'React',
        description: 'Interactive menu and ordering interface',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Socket.io',
        description: 'Real-time order status updates',
        tags: ['WebSocket', 'Real-time', 'Node.js']
      },
      {
        name: 'Stripe',
        description: 'Payment processing and checkout',
        tags: ['Payments', 'API', 'Security']
      },
      {
        name: 'Twilio',
        description: 'SMS notifications for order updates',
        tags: ['SMS', 'Notifications', 'API']
      }
    ],
    concepts: [
      {
        name: 'Order Management',
        description: 'Complete order lifecycle tracking',
        example: 'Pending → Confirmed → Preparing → Delivering → Delivered'
      },
      {
        name: 'Real-time Tracking',
        description: 'Live order and delivery updates',
        example: 'WebSocket events for status changes'
      },
      {
        name: 'Payment Processing',
        description: 'Secure online payment handling',
        example: 'Stripe Payment Intents API'
      },
      {
        name: 'Notification System',
        description: 'Multi-channel order updates',
        example: 'Push notifications, SMS, email'
      }
    ],
    features: [
      'Digital menu with categories and filtering',
      'Shopping cart with quantity management',
      'Secure payment with Stripe',
      'Real-time order tracking',
      'SMS notifications for order updates',
      'Delivery address management',
      'Order history and reordering',
      'Table reservation system',
      'Special instructions for items',
      'Nutrition and allergen information'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🍽️ Restaurant App Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Complete restaurant ordering system with menu management, online ordering, real-time tracking, and payment processing.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💻</span>
            View Implementation
          </motion.button>
          </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-[1fr,320px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="space-y-6">
          {/* Tabs */}
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex gap-2">
          <button
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'menu' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                🍽️ Menu
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                📦 Orders
          </button>
        </div>
          </motion.div>

          {/* Menu View */}
          {activeTab === 'menu' && (
            <>
              {/* Categories */}
              <motion.div 
                className="bg-gray-800 p-4 rounded-xl"
                variants={itemVariants}
              >
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-650'
                      }`}
                    >
                      {category === 'all' ? 'All' : category}
                    </button>
                  ))}
          </div>
              </motion.div>

              {/* Menu Items */}
              <motion.div 
                className="bg-gray-800 p-6 rounded-xl"
                variants={itemVariants}
              >
                <h2 className="text-2xl font-bold mb-4">Menu</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredMenu.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="bg-gray-700 p-4 rounded-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex gap-4">
                        <div className="text-5xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-xs text-gray-400 mb-2">{item.description}</p>
                          <div className="flex items-center gap-2 mb-2 text-xs">
                            <span className="bg-gray-600 px-2 py-1 rounded">⏱️ {item.preparationTime}min</span>
                            <span className="bg-gray-600 px-2 py-1 rounded">🔥 {item.calories}cal</span>
                      </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-green-400">${item.price}</span>
                            <motion.button
                              onClick={() => handleAddToCart(item)}
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Add to Cart
                            </motion.button>
                      </div>
                      </div>
                    </div>
                    </motion.div>
                ))}
              </div>
              </motion.div>
            </>
          )}

          {/* Orders View */}
          {activeTab === 'orders' && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-4">Order History</h2>
              
              <div className="space-y-3">
                {orderHistory.map((order, index) => (
                  <motion.div
                    key={order.id}
                    className="bg-gray-700 p-4 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">Order #{order.id}</h3>
                        <p className="text-sm text-gray-400">{order.date} • {order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">${order.total}</p>
                        <span className="text-xs bg-green-600 px-2 py-1 rounded">{order.status}</span>
                        </div>
                      </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
            </div>

        {/* Sidebar - Cart */}
        <div className="space-y-6">
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl sticky top-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">
              🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.image}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">${item.price}</p>
                        </div>
                <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                >
                  ✕
                </button>
              </div>
              
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="bg-gray-600 hover:bg-gray-500 w-6 h-6 rounded flex items-center justify-center text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="bg-gray-600 hover:bg-gray-500 w-6 h-6 rounded flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                    </div>
                        <span className="text-sm font-bold text-green-400">
                          ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-700 pt-4 space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span>${getTotalPrice()}</span>
                        </div>
                      <div className="flex justify-between">
                    <span className="text-gray-400">Delivery:</span>
                    <span>$4.99</span>
                      </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">${(parseFloat(getTotalPrice()) + 4.99).toFixed(2)}</span>
                    </div>
                  </div>
                  
                <motion.button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Online Ordering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Secure Payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>SMS Notifications</span>
              </li>
              </ul>
          </motion.div>
            </div>
      </motion.div>

      {/* CodeViewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default RestaurantAppDemo; 
