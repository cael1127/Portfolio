import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const EcommerceDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');

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

  const categories = useMemo(() => {
    const unique = new Set(products.map(p => p.category));
    return ['all', ...Array.from(unique)];
  }, [products]);

  const categoryCounts = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const searchable = `${product.name} ${product.description}`.toLowerCase();
      const matchesSearch = normalizedQuery === '' || searchable.includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
          return Number(b.featured) - Number(a.featured);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, selectedCategory, searchQuery, sortBy]);

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
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);

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

  const cartItemCount = getTotalItems();
  const cartValue = getTotalPrice();
  const totalVisibleProducts = filteredProducts.length;
  const isListView = viewMode === 'list';
  const displayedCategoryLabel = selectedCategory === 'all' ? 'All Products' : selectedCategory;
  const sortLabels = {
    featured: 'Featured first',
    'price-low': 'Price: Low to High',
    'price-high': 'Price: High to Low',
    rating: 'Top Rated'
  };
  const sortDescription = sortLabels[sortBy] || 'Custom';
  const hasActiveFilters =
    selectedCategory !== 'all' || searchQuery.trim() !== '' || sortBy !== 'featured';

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
            className="bg-gray-800 p-6 rounded-xl space-y-6"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
              <div className="flex-1 min-w-0">
                <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                  Search catalog
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find products, categories, or features"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-400/60"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:w-auto">
                <div className="sm:w-44">
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-400/60"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <div className="sm:w-40">
                  <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">
                    Layout
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-gray-600">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`flex-1 px-3 py-2 text-sm transition-colors ${
                        isListView
                          ? 'bg-gray-800 text-gray-400 hover:text-white'
                          : 'bg-emerald-500/20 text-emerald-200'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`flex-1 px-3 py-2 text-sm transition-colors ${
                        isListView
                          ? 'bg-emerald-500/20 text-emerald-200'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = cat === 'all' ? products.length : categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm transition-colors ${
                      isActive
                        ? 'bg-emerald-500/20 border-emerald-300 text-emerald-200 shadow-inner'
                        : 'bg-gray-700/60 border-gray-600 text-gray-300 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    {cat === 'all' ? 'All Products' : cat}
                    <span className="ml-2 text-xs text-gray-400">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">Showing</p>
                <p className="text-lg font-semibold text-white">{totalVisibleProducts}</p>
                <p className="text-xs text-gray-500">{displayedCategoryLabel}</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">Sort mode</p>
                <p className="text-lg font-semibold text-white">{sortDescription}</p>
                <p className="text-xs text-gray-500">Tailored per preference</p>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-gray-400">In cart</p>
                <p className="text-lg font-semibold text-white">{cartItemCount} items</p>
                <p className="text-xs text-gray-500">{formatCurrency(cartValue)}</p>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-between flex-col gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-gray-400">
                  Filters active. Showing curated results for your selection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSortBy('featured');
                  }}
                  className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-emerald-200"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl space-y-6"
            variants={itemVariants}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{displayedCategoryLabel}</h2>
                <p className="text-sm text-gray-400">
                  {totalVisibleProducts} {totalVisibleProducts === 1 ? 'product' : 'products'} visible • {sortDescription}
                  {searchQuery.trim() ? ` • Matching “${searchQuery.trim()}”` : ''}
                </p>
              </div>
              {filteredProducts.length > 0 && (
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    In stock
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
                    Featured
                  </span>
                </div>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-dashed border-gray-600 rounded-xl py-16 text-center">
                <p className="text-lg font-semibold text-gray-300 mb-2">No products found</p>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search to explore more of the catalog.
                </p>
              </div>
            ) : (
              <div className={isListView ? 'space-y-4' : 'grid md:grid-cols-2 gap-4'}>
                {filteredProducts.map((product, index) => {
                  const isLowStock = product.stock > 0 && product.stock <= 25;
                  return (
                    <motion.div
                      key={product.id}
                      className={`group relative border border-gray-700/70 bg-gray-900/70 rounded-xl p-5 transition-all duration-300 hover:border-emerald-400/70 hover:shadow-lg hover:shadow-emerald-500/10 ${
                        isListView ? 'flex flex-col gap-5 md:flex-row md:items-start' : 'flex flex-col gap-5'
                      }`}
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.04 }}
                      whileHover={{ translateY: -4 }}
                    >
                      <div
                        className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/10 text-4xl text-emerald-200 shadow-inner ${
                          isListView ? 'w-20 h-20 md:w-24 md:h-24' : 'w-20 h-20 self-start'
                        }`}
                      >
                        <span>{product.image}</span>
                      </div>

                      <div className={`flex-1 space-y-4 ${isListView ? 'md:pr-6' : ''}`}>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-gray-400">
                              <span>{product.category}</span>
                              {product.featured && (
                                <span className="inline-flex items-center gap-1 bg-yellow-500/20 text-yellow-200 px-2 py-0.5 rounded-full">
                                  <span>⭐</span>
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1 text-yellow-300 font-medium">
                            ★ {product.rating.toFixed(1)}
                          </span>
                          <span>•</span>
                          <span>{product.reviews.toLocaleString()} reviews</span>
                          <span>•</span>
                          <span className={product.stock === 0 ? 'text-red-300' : isLowStock ? 'text-yellow-300' : 'text-gray-400'}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>

                      <div className={`${isListView ? 'md:w-48' : 'w-full'} flex flex-col gap-3`}>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-emerald-400">
                              {formatCurrency(product.price)}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatCurrency(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.stock === 0
                              ? 'Currently unavailable'
                              : isLowStock
                                ? 'Low inventory — ships fast'
                                : 'Ready to ship today'}
                          </p>
                        </div>

                        <div className={`flex ${isListView ? 'flex-col gap-2' : 'gap-2'}`}>
                          <motion.button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            disabled={product.stock === 0}
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                              product.stock === 0
                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                : 'bg-emerald-500 text-gray-900 hover:bg-emerald-400'
                            }`}
                            whileHover={product.stock === 0 ? undefined : { scale: 1.02 }}
                            whileTap={product.stock === 0 ? undefined : { scale: 0.97 }}
                          >
                            <span>🛒</span>
                            Add to Cart
                          </motion.button>
                          <button
                            type="button"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-sm text-gray-300 hover:text-white hover:border-emerald-400 transition-colors"
                          >
                            Quick view
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
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
              🛒 Cart ({cartItemCount})
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
                          <p className="text-xs text-gray-400">{formatCurrency(item.price)}</p>
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
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="bg-gray-600 hover:bg-gray-500 w-6 h-6 rounded flex items-center justify-center text-sm"
                    >
                            −
                    </button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button 
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="bg-gray-600 hover:bg-gray-500 w-6 h-6 rounded flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                        <span className="text-sm font-bold text-green-400">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                </div>
          </div>
                  ))}
            </div>

                <div className="border-t border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">{formatCurrency(cartValue)}</span>
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
                <span className="text-emerald-300 font-semibold">{cartItemCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cart Value:</span>
                <span className="text-emerald-300 font-semibold">{formatCurrency(cartValue)}</span>
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
