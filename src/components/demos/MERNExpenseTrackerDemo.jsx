import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const MERNExpenseTrackerDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });
  const [stats, setStats] = useState({
    totalSpent: 0,
    monthlyAverage: 0,
    topCategory: '',
    transactionCount: 0
  });

  const sampleExpenses = [
    {
      id: 1,
      description: 'Grocery Shopping',
      amount: 125.50,
      category: 'Food',
      date: '2024-01-15',
      paymentMethod: 'Credit Card',
      recurring: false
    },
    {
      id: 2,
      description: 'Electric Bill',
      amount: 89.00,
      category: 'Utilities',
      date: '2024-01-14',
      paymentMethod: 'Auto-pay',
      recurring: true
    },
    {
      id: 3,
      description: 'Netflix Subscription',
      amount: 15.99,
      category: 'Entertainment',
      date: '2024-01-12',
      paymentMethod: 'Credit Card',
      recurring: true
    },
    {
      id: 4,
      description: 'Gas Station',
      amount: 45.00,
      category: 'Transportation',
      date: '2024-01-11',
      paymentMethod: 'Debit Card',
      recurring: false
    },
    {
      id: 5,
      description: 'Restaurant Dinner',
      amount: 67.80,
      category: 'Food',
      date: '2024-01-10',
      paymentMethod: 'Credit Card',
      recurring: false
    },
    {
      id: 6,
      description: 'Internet Service',
      amount: 59.99,
      category: 'Utilities',
      date: '2024-01-09',
      paymentMethod: 'Auto-pay',
      recurring: true
    },
    {
      id: 7,
      description: 'Gym Membership',
      amount: 49.99,
      category: 'Health',
      date: '2024-01-08',
      paymentMethod: 'Credit Card',
      recurring: true
    },
    {
      id: 8,
      description: 'Coffee Shop',
      amount: 12.50,
      category: 'Food',
      date: '2024-01-07',
      paymentMethod: 'Cash',
      recurring: false
    }
  ];

  const sampleCategories = ['Food', 'Utilities', 'Entertainment', 'Transportation', 'Health', 'Shopping', 'Other'];

  useEffect(() => {
    setExpenses(sampleExpenses);
    setCategories(sampleCategories);

    const totalSpent = sampleExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryTotals = {};
    
    sampleExpenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });

    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b
    );

    setStats({
      totalSpent,
      monthlyAverage: (totalSpent / 1).toFixed(2),
      topCategory,
      transactionCount: sampleExpenses.length
    });
  }, []);

  const filteredExpenses = expenses.filter(expense => {
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    return matchesCategory;
  });

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category || !newExpense.date) {
      return;
    }

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      paymentMethod: 'Manual Entry',
      recurring: false
    };

    setExpenses(prev => [expense, ...prev]);
    setNewExpense({ description: '', amount: '', category: '', date: '' });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: 'bg-green-600',
      Utilities: 'bg-blue-600',
      Entertainment: 'bg-purple-600',
      Transportation: 'bg-yellow-600',
      Health: 'bg-red-600',
      Shopping: 'bg-pink-600',
      Other: 'bg-gray-600'
    };
    return colors[category] || 'bg-gray-600';
  };

  const codeData = {
    code: `// MERN Stack Expense Tracker

// Backend - Express.js API
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// MongoDB Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  createdAt: { type: Date, default: Date.now }
});

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  paymentMethod: String,
  recurring: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  limit: Number,
  period: { type: String, enum: ['monthly', 'weekly', 'yearly'] },
  startDate: Date
});

const User = mongoose.model('User', userSchema);
const Expense = mongoose.model('Expense', expenseSchema);
const Budget = mongoose.model('Budget', budgetSchema);

// Auth Middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) throw new Error();
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      email,
      password: hashedPassword,
      name
    });
    
    await user.save();
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    res.status(201).json({ user: { id: user._id, email, name }, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Get all expenses with filtering and pagination
app.get('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      startDate, 
      endDate,
      minAmount,
      maxAmount
    } = req.query;

    const query = { userId: req.user._id };
    
    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    const skip = (page - 1) * limit;

    const [expenses, total] = await Promise.all([
      Expense.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Expense.countDocuments(query)
    ]);

    res.json({
      expenses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Create expense
app.post('/api/expenses', authMiddleware, async (req, res) => {
  try {
    const { description, amount, category, date, paymentMethod, recurring } = req.body;
    
    const expense = new Expense({
      userId: req.user._id,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      paymentMethod,
      recurring
    });
    
    await expense.save();

    // Check budget alerts
    const budget = await Budget.findOne({
      userId: req.user._id,
      category,
      period: 'monthly'
    });

    if (budget) {
      const monthExpenses = await Expense.aggregate([
        {
          $match: {
            userId: req.user._id,
            category,
            date: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$amount' }
          }
        }
      ]);

      const totalSpent = monthExpenses[0]?.total || 0;

      if (totalSpent > budget.limit) {
        // Send budget alert notification
        await sendBudgetAlert(req.user, category, totalSpent, budget.limit);
      }
    }

    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

// Get expense analytics
app.get('/api/expenses/analytics', authMiddleware, async (req, res) => {
  try {
    const { period = 'month' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    // Aggregate expenses by category
    const categoryBreakdown = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    // Calculate total and average
    const total = categoryBreakdown.reduce((sum, cat) => sum + cat.total, 0);
    const average = total / categoryBreakdown.length || 0;

    // Get spending trend
    const trend = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id,
          date: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            day: { $dayOfMonth: '$date' }
          },
          total: { $sum: '$amount' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ]);
    
    res.json({
      categoryBreakdown,
        total,
        average,
      trend
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Frontend - React Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchAnalytics();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses', {
        headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/expenses/analytics', {
        headers: { Authorization: \`Bearer \${localStorage.getItem('token')}\` }
      });
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="expense-tracker">
      {/* Expense list and charts */}
    </div>
  );
};`,
    explanation: `Full-stack expense tracking application built with MongoDB, Express, React, and Node.js with comprehensive budget management features.

## Core Implementation

**Key Features**: This demo showcases a complete MERN stack expense tracker with user authentication, expense categorization, budget alerts, and detailed analytics with charts.

**Architecture**: Built with MongoDB for data storage, Express.js for REST API, React for frontend, and Node.js for backend, following MVC architecture patterns.

**Performance**: Implements efficient MongoDB aggregation pipelines, JWT authentication, pagination for large datasets, and optimized queries for analytics.

## Technical Benefits

- **Full MERN Stack**: Complete implementation of all MERN technologies
- **Real-time Analytics**: Instant expense insights and category breakdowns
- **Budget Alerts**: Automated notifications when spending exceeds limits
- **Secure Auth**: JWT-based authentication with bcrypt password hashing`,
    technologies: [
      {
        name: 'MongoDB',
        description: 'NoSQL database for flexible data storage',
        tags: ['Database', 'NoSQL', 'MongoDB']
      },
      {
        name: 'Express.js',
        description: 'Fast, minimalist web framework',
        tags: ['Backend', 'API', 'Node.js']
      },
      {
        name: 'React',
        description: 'Component-based UI library',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Node.js',
        description: 'JavaScript runtime for server-side',
        tags: ['Backend', 'JavaScript', 'Runtime']
      }
    ],
    concepts: [
      {
        name: 'RESTful API Design',
        description: 'HTTP methods for CRUD operations',
        example: 'GET /api/expenses, POST /api/expenses, DELETE /api/expenses/:id'
      },
      {
        name: 'JWT Authentication',
        description: 'Stateless authentication with tokens',
        example: 'Authorization: Bearer <token>'
      },
      {
        name: 'MongoDB Aggregation',
        description: 'Complex data processing and analytics',
        example: '$group, $match, $sort for category totals'
      },
      {
        name: 'MVC Architecture',
        description: 'Separation of concerns in application structure',
        example: 'Models (schemas), Views (React), Controllers (routes)'
      }
    ],
    features: [
      'User authentication with JWT',
      'Expense CRUD operations',
      'Category-based expense tracking',
      'Budget setting and alerts',
      'Monthly/weekly/yearly analytics',
      'Expense filtering and search',
      'Recurring expense management',
      'Data visualization with charts',
      'Export to CSV/PDF',
      'Mobile-responsive design'
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
        <h1 className="text-3xl font-bold text-blue-400 mb-4">💰 MERN Expense Tracker Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Full-stack expense tracking application with budget management, analytics, and beautiful visualizations.
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
          {/* Add Expense Form */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="Description"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  placeholder="Amount"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <select
                    value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <input
                    type="date"
                    value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
            <motion.button
              onClick={handleAddExpense}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add Expense
            </motion.button>
          </motion.div>

          {/* Filter */}
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </motion.div>

        {/* Expenses List */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Recent Expenses</h2>
            
            <div className="space-y-3">
              {filteredExpenses.map((expense, index) => (
                <motion.div
                  key={expense.id}
                  className="bg-gray-700 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white">{expense.description}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(expense.category)}`}>
                          {expense.category}
                        </span>
                        {expense.recurring && (
                          <span className="text-xs px-2 py-1 rounded bg-purple-600">
                            Recurring
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(expense.date).toLocaleDateString()} • {expense.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-red-400">
                        ${expense.amount.toFixed(2)}
                      </span>
                    <button
                        onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                        ✕
                    </button>
                  </div>
                </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">📊 Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Spent:</span>
                <span className="text-red-400 font-bold">${stats.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Avg:</span>
                <span className="text-white font-semibold">${stats.monthlyAverage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Top Category:</span>
                <span className="text-blue-400 font-semibold">{stats.topCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Transactions:</span>
                <span className="text-white font-semibold">{stats.transactionCount}</span>
              </div>
            </div>
          </motion.div>

        {/* Category Breakdown */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">📈 By Category</h3>
            <div className="space-y-2 text-sm">
            {categories.map(category => {
                const categoryExpenses = expenses.filter(e => e.category === category);
                const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
                const percentage = stats.totalSpent > 0 ? (total / stats.totalSpent * 100).toFixed(1) : 0;

                if (categoryExpenses.length === 0) return null;

  return (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-400">{category}</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={getCategoryColor(category).replace('bg-', 'bg-') + ' h-2 rounded-full'}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                </div>
              );
            })}
          </div>
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
                <span>User Authentication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Budget Alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Category Analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Recurring Expenses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Export Reports</span>
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

export default MERNExpenseTrackerDemo; 
