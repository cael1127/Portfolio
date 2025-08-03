import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const MERNExpenseTrackerDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    'Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    monthly: 0,
    average: 0,
    topCategory: ''
  });

  const demoCode = `/**
 * MERN Expense Tracker Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a full-stack expense tracker
 * using MongoDB, Express.js, React, and Node.js with real-time
 * statistics and category management.
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MERNExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    'Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 
    'Bills', 'Healthcare', 'Education', 'Other'
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    monthly: 0,
    average: 0,
    topCategory: ''
  });

  // API Base URL
  const API_BASE_URL = 'http://localhost:5000/api/expenses';

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setExpenses(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Add new expense
  const addExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;

    setIsLoading(true);
    
    try {
      const response = await axios.post(API_BASE_URL, newExpense);
      const updatedExpenses = [...expenses, response.data];
      setExpenses(updatedExpenses);
      calculateStats(updatedExpenses);
      
      setNewExpense({
        description: '',
        amount: '',
        category: 'Food & Dining',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    setIsLoading(true);
    
    try {
      await axios.delete(\`\${API_BASE_URL}/\${id}\`);
      const updatedExpenses = expenses.filter(exp => exp.id !== id);
      setExpenses(updatedExpenses);
      calculateStats(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update expense
  const updateExpense = async (id, updates) => {
    setIsLoading(true);
    
    try {
      const response = await axios.put(\`\${API_BASE_URL}/\${id}\`, updates);
      const updatedExpenses = expenses.map(exp => 
        exp.id === id ? response.data : exp
      );
      setExpenses(updatedExpenses);
      calculateStats(updatedExpenses);
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const calculateStats = (expenseList) => {
    const total = expenseList.reduce((sum, exp) => sum + exp.amount, 0);
    const monthly = expenseList.filter(exp => {
      const expDate = new Date(exp.date);
      const now = new Date();
      return expDate.getMonth() === now.getMonth() && 
             expDate.getFullYear() === now.getFullYear();
    }).reduce((sum, exp) => sum + exp.amount, 0);
    const average = expenseList.length > 0 ? total / expenseList.length : 0;
    
    const categoryTotals = {};
    expenseList.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, 'None'
    );

    setStats({ total, monthly, average, topCategory });
  };

  // Filter expenses by category
  const filteredExpenses = selectedCategory === 'All' 
    ? expenses 
    : expenses.filter(exp => exp.category === selectedCategory);

  // Load expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">💰 MERN Expense Tracker</h1>
            <p className="text-gray-400">Full-stack expense tracking with MongoDB and React</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
              <form onSubmit={(e) => { e.preventDefault(); addExpense(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <input
                      type="text"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      placeholder="Enter expense description"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {isLoading ? 'Adding...' : 'Add Expense'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Expense List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Expenses</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredExpenses.map(expense => (
                  <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      <p className="text-sm text-gray-400">{expense.category} • {expense.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-semibold">${expense.amount.toFixed(2)}</span>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400">Total</h3>
            <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-400">Monthly</h3>
            <p className="text-2xl font-bold">${stats.monthly.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400">Average</h3>
            <p className="text-2xl font-bold">${stats.average.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-400">Top Category</h3>
            <p className="text-2xl font-bold">{stats.topCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MERNExpenseTracker;`;

  // Simulate initial data
  useEffect(() => {
    const initialExpenses = [
      { id: 1, description: 'Grocery Shopping', amount: 85.50, category: 'Food & Dining', date: '2024-01-15' },
      { id: 2, description: 'Gas Station', amount: 45.00, category: 'Transportation', date: '2024-01-14' },
      { id: 3, description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', date: '2024-01-13' },
      { id: 4, description: 'Electric Bill', amount: 120.00, category: 'Bills', date: '2024-01-12' },
      { id: 5, description: 'Movie Tickets', amount: 32.00, category: 'Entertainment', date: '2024-01-11' },
      { id: 6, description: 'Coffee Shop', amount: 8.50, category: 'Food & Dining', date: '2024-01-10' },
      { id: 7, description: 'Uber Ride', amount: 25.00, category: 'Transportation', date: '2024-01-09' },
      { id: 8, description: 'Pharmacy', amount: 45.75, category: 'Healthcare', date: '2024-01-08' }
    ];
    setExpenses(initialExpenses);
    calculateStats(initialExpenses);
  }, []);

  const calculateStats = (expenseList) => {
    const total = expenseList.reduce((sum, exp) => sum + exp.amount, 0);
    const monthly = expenseList.filter(exp => {
      const expDate = new Date(exp.date);
      const now = new Date();
      return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
    }).reduce((sum, exp) => sum + exp.amount, 0);
    const average = expenseList.length > 0 ? total / expenseList.length : 0;
    
    const categoryTotals = {};
    expenseList.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, 'None'
    );

    setStats({ total, monthly, average, topCategory });
  };

  const addExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const expense = {
      id: Date.now(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date
    };

    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    calculateStats(updatedExpenses);
    
    setNewExpense({
      description: '',
      amount: '',
      category: 'Food & Dining',
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsLoading(false);
  };

  const deleteExpense = async (id) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));

    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    calculateStats(updatedExpenses);
    
    setIsLoading(false);
  };

  const filteredExpenses = selectedCategory === 'All' 
    ? expenses 
    : expenses.filter(exp => exp.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-red-500',
      'Transportation': 'bg-blue-500',
      'Entertainment': 'bg-purple-500',
      'Shopping': 'bg-pink-500',
      'Bills': 'bg-yellow-500',
      'Healthcare': 'bg-green-500',
      'Education': 'bg-indigo-500',
      'Other': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const codeExample = `// MERN Stack Expense Tracker

// Backend - Express.js Server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/expense-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Expense Schema
const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Food & Dining', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes

// GET /api/expenses - Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const { userId, category, startDate, endDate } = req.query;
    let query = {};
    
    if (userId) query.userId = userId;
    if (category && category !== 'All') query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/expenses - Create new expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { description, amount, category, date, userId } = req.body;
    
    const expense = new Expense({
      description,
      amount,
      category,
      date: date || new Date(),
      userId
    });
    
    await expense.save();
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/expenses/:id - Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ success: true, message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/expenses/stats - Get expense statistics
app.get('/api/expenses/stats', async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;
    let query = {};
    
    if (userId) query.userId = userId;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const expenses = await Expense.find(query);
    
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const average = expenses.length > 0 ? total / expenses.length : 0;
    
    const categoryTotals = {};
    expenses.forEach(exp => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    });
    
    const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
      categoryTotals[a] > categoryTotals[b] ? a : b, 'None'
    );
    
    res.json({
      success: true,
      data: {
        total,
        average,
        count: expenses.length,
        topCategory,
        categoryBreakdown: categoryTotals
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

// Frontend - React Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0]
  });
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/expenses/stats');
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;

    setLoading(true);
    try {
      await axios.post('/api/expenses', newExpense);
      setNewExpense({
        description: '',
        amount: '',
        category: 'Food & Dining',
        date: new Date().toISOString().split('T')[0]
      });
      fetchExpenses();
      fetchStats();
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(\`/api/expenses/\${id}\`);
      fetchExpenses();
      fetchStats();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Add Expense Form */}
      <form onSubmit={addExpense} className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={newExpense.description}
            onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            className="p-2 border rounded"
            step="0.01"
            required
          />
          <select
            value={newExpense.category}
            onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="Food & Dining">Food & Dining</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
            className="p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </form>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-2xl text-green-600">\${stats.total?.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Average</h3>
          <p className="text-2xl text-blue-600">\${stats.average?.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Count</h3>
          <p className="text-2xl text-purple-600">{stats.count || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold">Top Category</h3>
          <p className="text-2xl text-orange-600">{stats.topCategory || 'None'}</p>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold p-6 border-b">Expenses</h2>
        <div className="p-6">
          {expenses.map(expense => (
            <div key={expense._id} className="flex items-center justify-between py-3 border-b">
              <div>
                <h3 className="font-semibold">{expense.description}</h3>
                <p className="text-gray-600">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-red-600">\${expense.amount.toFixed(2)}</span>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">💰 MERN Expense Tracker</h1>
            <p className="text-gray-400">Full-stack application with MongoDB, Express, React, Node.js</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Add Expense Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">➕ Add New Expense</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Enter expense description..."
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Amount ($)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={addExpense}
                disabled={!newExpense.description || !newExpense.amount || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding Expense...</span>
                  </>
                ) : (
                  <>
                    <span>➕</span>
                    <span>Add Expense</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">📊 Statistics</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Total Expenses</div>
                  <div className="text-2xl font-bold text-green-400">${stats.total.toFixed(2)}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Monthly Total</div>
                  <div className="text-2xl font-bold text-blue-400">${stats.monthly.toFixed(2)}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Average per Expense</div>
                  <div className="text-2xl font-bold text-yellow-400">${stats.average.toFixed(2)}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm">Top Category</div>
                  <div className="text-2xl font-bold text-purple-400">{stats.topCategory}</div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">🔍 Filter by Category</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-teal-400">✨ MERN Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• MongoDB Database</li>
                <li>• Express.js Backend</li>
                <li>• React Frontend</li>
                <li>• Node.js Runtime</li>
                <li>• RESTful API</li>
                <li>• Real-time Updates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">📋 Expenses List</h3>
          
          {filteredExpenses.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-4">💰</div>
              <p>No expenses found</p>
              <p className="text-sm">Add your first expense to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${getCategoryColor(expense.category)}`}></div>
                    <div>
                      <div className="font-semibold text-white">{expense.description}</div>
                      <div className="text-sm text-gray-400">
                        {expense.category} • {new Date(expense.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-400">${expense.amount.toFixed(2)}</div>
                      <div className="text-xs text-gray-400">#{expense.id}</div>
                    </div>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category Breakdown */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-green-400">📈 Category Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => {
              const categoryExpenses = expenses.filter(exp => exp.category === category);
              const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
              const percentage = stats.total > 0 ? (total / stats.total * 100).toFixed(1) : 0;
              
              return (
                <div key={category} className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(category)}`}></div>
                    <span className="font-semibold text-white">{category}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">${total.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">{percentage}% of total</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeExample}
        language="javascript"
        title="MERN Expense Tracker Implementation"
      />
    </div>
  );
};

export default MERNExpenseTrackerDemo; 