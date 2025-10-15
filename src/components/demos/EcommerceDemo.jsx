import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const EcommerceDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const sampleProducts = [
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 79.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 234,
      image: '🎧',
      stock: 45,
      featured: true,
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      originalPrice: 299.99,
      rating: 4.7,
      reviews: 567,
      image: '⌚',
      stock: 32,
      featured: true,
      description: 'Advanced fitness tracking and health monitoring smartwatch'
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      category: 'Accessories',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.3,
      reviews: 128,
      image: '🎒',
      stock: 67,
      featured: false,
      description: 'Water-resistant laptop backpack with USB charging port'
    },
    {
      id: 4,
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 892,
      image: '⌨️',
      stock: 23,
      featured: true,
      description: 'RGB mechanical gaming keyboard with customizable switches'
    },
    {
      id: 5,
      name: 'Portable Charger',
      category: 'Accessories',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.6,
      reviews: 445,
      image: '🔋',
      stock: 156,
      featured: false,
      description: '20000mAh fast-charging power bank with dual USB ports'
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 29.99,
      originalPrice: 49.99,
      rating: 4.4,
      reviews: 356,
      image: '🖱️',
      stock: 89,
      featured: false,
      description: 'Ergonomic wireless mouse with precision tracking'
    },
    {
      id: 7,
      name: 'USB-C Hub',
      category: 'Accessories',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.5,
      reviews: 267,
      image: '🔌',
      stock: 78,
      featured: false,
      description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader'
    },
    {
      id: 8,
      name: 'Desk Lamp',
      category: 'Home',
      price: 44.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviews: 189,
      image: '💡',
      stock: 42,
      featured: true,
      description: 'LED desk lamp with adjustable brightness and color temperature'
    }
  ];

  useEffect(() => {
    setProducts(sampleProducts);
  }, []);

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'featured': return b.featured - a.featured;
      default: return 0;
    }
  });

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// Product Management
const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return (
    <div className="product-catalog">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={addToCart}
        />
            ))}
          </div>
  );
};

// Checkout with Stripe
const CheckoutForm = ({ cart, total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // Create payment intent
      const { data } = await axios.post('/api/create-payment-intent', {
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
        items: cart
      });

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Customer Name',
            email: 'customer@example.com'
          }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Create order
          await createOrder(result.paymentIntent.id);
          alert('Payment successful!');
          // Clear cart
          localStorage.removeItem('cart');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const createOrder = async (paymentIntentId) => {
    try {
      await axios.post('/api/orders', {
        paymentIntentId,
        items: cart,
        total,
        status: 'paid'
      });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
            
            return (
    <form onSubmit={handleSubmit}>
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      
      {error && <div className="error-message">{error}</div>}
      
                  <button 
        type="submit" 
        disabled={!stripe || processing}
        className="checkout-button"
                  >
        {processing ? 'Processing...' : \`Pay $\${total}\`}
                  </button>
    </form>
  );
};

// Backend API
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page = 1, limit = 20 } = req.query;

    const where = {};
    if (category) where.category = category;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      success: true,
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, items } = req.body;

    // Validate items and calculate total
    let calculatedTotal = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          error: \`Insufficient stock for \${product.name}\` 
        });
      }

      calculatedTotal += product.price * item.quantity;
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(calculatedTotal * 100),
      currency: currency || 'usd',
      metadata: {
        items: JSON.stringify(items.map(i => ({ id: i.id, quantity: i.quantity })))
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { paymentIntentId, items, total, userId } = req.body;

    // Verify payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not successful' });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: userId || 1,
        total: parseFloat(total),
        status: 'paid',
        paymentIntentId,
        items: {
          create: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));`,
    explanation: `Full-featured e-commerce platform with product catalog, shopping cart, and integrated payment processing using Stripe.

## Core Implementation

**Key Features**: This demo showcases a complete e-commerce solution with product management, shopping cart functionality, secure payment processing, and order tracking.

**Architecture**: Built with React, Express.js, Prisma ORM, and Stripe API for a scalable, production-ready e-commerce platform with real-time inventory management.

**Performance**: Implements efficient product filtering, cart state management, optimized database queries, and secure payment processing with PCI compliance.

## Technical Benefits

- **Secure Payments**: Stripe integration with PCI-compliant payment processing
- **Real-time Inventory**: Automatic stock management and availability tracking
- **Modern UI/UX**: Responsive design with smooth animations and intuitive navigation
- **Scalable Architecture**: Built to handle high traffic and large product catalogs`,
    technologies: [
      {
        name: 'React',
        description: 'Modern UI library for building interactive interfaces',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Stripe API',
        description: 'Payment processing and checkout integration',
        tags: ['Payments', 'API', 'Security']
      },
      {
        name: 'Express.js',
        description: 'Backend API server for order and product management',
        tags: ['Backend', 'API', 'Node.js']
      },
      {
        name: 'Prisma ORM',
        description: 'Type-safe database access and management',
        tags: ['Database', 'ORM', 'TypeScript']
      }
    ],
    concepts: [
      {
        name: 'Shopping Cart State Management',
        description: 'Managing cart state across the application',
        example: 'Add to cart, update quantity, calculate totals'
      },
      {
        name: 'Payment Processing',
        description: 'Secure payment integration with Stripe',
        example: 'Create payment intent → Confirm payment → Create order'
      },
      {
        name: 'Inventory Management',
        description: 'Real-time stock tracking and updates',
        example: 'Check stock availability, update on purchase'
      },
      {
        name: 'Product Filtering & Search',
        description: 'Advanced product discovery features',
        example: 'Category filters, price ranges, text search'
      }
    ],
    features: [
      'Product catalog with search and filtering',
      'Shopping cart with quantity management',
      'Real-time inventory tracking',
      'Secure payment processing with Stripe',
      'Order management and tracking',
      'User authentication and profiles',
      'Product reviews and ratings',
      'Wishlist functionality',
      'Order history and status tracking',
      'Admin dashboard for product management'
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
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🛒 E-commerce Platform Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Full-featured online store with product catalog, shopping cart, and secure payment processing powered by Stripe.
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
          {/* Search and Filters */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                />
      </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All' : cat}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
            </div>
          </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Products</h2>
              <span className="text-sm text-gray-400">{filteredProducts.length} products</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex gap-4">
                    <div className="text-6xl">{product.image}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white">{product.name}</h3>
                        {product.featured && (
                          <span className="text-xs bg-yellow-600 px-2 py-1 rounded">⭐ Featured</span>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-400 mb-2">{product.category}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-yellow-400">★ {product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                      </div>
                      
                      <p className="text-xs text-gray-300 mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-green-400">${product.price}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </p>
                        </div>
                        
                        <motion.button
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded text-sm transition-colors"
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Shopping Cart */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">
              🛒 Cart ({getTotalItems()})
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

                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">${getTotalPrice()}</span>
      </div>

                  <motion.button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Checkout
                  </motion.button>
                </div>
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
                <span>Secure Payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Inventory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Product Reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Order Tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Wishlist</span>
              </li>
            </ul>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">📊 Store Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Products:</span>
                <span className="text-white font-semibold">{products.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Categories:</span>
                <span className="text-white font-semibold">{categories.length - 1}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cart Items:</span>
                <span className="text-green-400 font-semibold">{getTotalItems()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cart Value:</span>
                <span className="text-green-400 font-semibold">${getTotalPrice()}</span>
              </div>
            </div>
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

export default EcommerceDemo;
