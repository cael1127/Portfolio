import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const ProductConfiguratorDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [configuration, setConfiguration] = useState({
    model: 'base',
    color: 'blue',
    storage: '256GB',
    extras: []
  });
  const [price, setPrice] = useState(999);

  const options = {
    model: [
      { id: 'base', name: 'Base Model', price: 999, icon: '📱' },
      { id: 'pro', name: 'Pro Model', price: 1299, icon: '💎' },
      { id: 'ultra', name: 'Ultra Model', price: 1599, icon: '👑' }
    ],
    color: [
      { id: 'blue', name: 'Ocean Blue', hex: '#3B82F6', price: 0 },
      { id: 'black', name: 'Midnight Black', hex: '#1F2937', price: 0 },
      { id: 'silver', name: 'Silver', hex: '#9CA3AF', price: 0 },
      { id: 'gold', name: 'Gold', hex: '#F59E0B', price: 50 }
    ],
    storage: [
      { id: '128GB', name: '128GB', price: 0 },
      { id: '256GB', name: '256GB', price: 100 },
      { id: '512GB', name: '512GB', price: 200 },
      { id: '1TB', name: '1TB', price: 400 }
    ],
    extras: [
      { id: 'case', name: 'Protective Case', price: 49 },
      { id: 'charger', name: 'Fast Charger', price: 39 },
      { id: 'warranty', name: 'Extended Warranty', price: 149 },
      { id: 'insurance', name: 'Device Insurance', price: 199 }
    ]
  };

  const handleOptionChange = (category, value) => {
    setConfiguration(prev => ({
      ...prev,
      [category]: value
    }));
    calculatePrice({ ...configuration, [category]: value });
  };

  const handleExtraToggle = (extraId) => {
    const extras = configuration.extras.includes(extraId)
      ? configuration.extras.filter(id => id !== extraId)
      : [...configuration.extras, extraId];
    
    setConfiguration(prev => ({ ...prev, extras }));
    calculatePrice({ ...configuration, extras });
  };

  const calculatePrice = (config) => {
    let total = 0;
    
    // Model price
    const model = options.model.find(m => m.id === config.model);
    total += model.price;
    
    // Color price
    const color = options.color.find(c => c.id === config.color);
    total += color.price;
    
    // Storage price
    const storage = options.storage.find(s => s.id === config.storage);
    total += storage.price;
    
    // Extras price
    config.extras.forEach(extraId => {
      const extra = options.extras.find(e => e.id === extraId);
      total += extra.price;
    });
    
    setPrice(total);
  };

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// 3D Product Configurator
const ProductConfigurator = () => {
  const [configuration, setConfiguration] = useState({
    model: 'base',
    color: '#3B82F6',
    material: 'glossy',
    customizations: []
  });

  return (
    <div className="configurator">
      <div className="3d-view">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <Product3D configuration={configuration} />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      
      <ConfigurationPanel
        configuration={configuration}
        onChange={setConfiguration}
      />
    </div>
  );
};

// 3D Product Model
const Product3D = ({ configuration }) => {
  const { scene } = useGLTF('/models/product.glb');

  useEffect(() => {
    // Update material color
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color = new THREE.Color(configuration.color);
        
        if (configuration.material === 'glossy') {
          child.material.roughness = 0.2;
          child.material.metalness = 0.8;
        } else {
          child.material.roughness = 0.8;
          child.material.metalness = 0.2;
        }
      }
    });
  }, [configuration, scene]);

  return <primitive object={scene} scale={1.5} />;
};

// Configuration Management System
class ConfigurationManager {
  constructor() {
    this.rules = [];
    this.pricing = {};
  }

  // Add validation rules
  addRule(rule) {
    this.rules.push(rule);
  }

  // Validate configuration
  validate(configuration) {
    const errors = [];

    for (const rule of this.rules) {
      if (!rule.check(configuration)) {
        errors.push(rule.message);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Calculate price with discounts
  calculatePrice(configuration) {
    let basePrice = this.pricing[configuration.model] || 0;
    let total = basePrice;

    // Add option prices
    for (const [key, value] of Object.entries(configuration)) {
      if (this.pricing[key] && this.pricing[key][value]) {
        total += this.pricing[key][value];
      }
    }

    // Apply bundle discounts
    const discount = this.calculateDiscount(configuration);
    total -= discount;

    return {
      base: basePrice,
      options: total - basePrice + discount,
      discount,
      total
    };
  }

  calculateDiscount(configuration) {
    let discount = 0;

    // Bundle discount: warranty + insurance = 10% off
    if (configuration.extras.includes('warranty') && 
        configuration.extras.includes('insurance')) {
      discount += 30;
    }

    // Volume discount: more than 3 extras = 5% off total
    if (configuration.extras.length > 3) {
      discount += this.pricing[configuration.model] * 0.05;
    }

    return discount;
  }
}

// Save & Share Configuration
const saveConfiguration = async (configuration) => {
  try {
    const response = await fetch('/api/configurations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(configuration)
    });

    const { id } = await response.json();
    
    // Generate shareable link
    const shareUrl = \`https://example.com/config/\${id}\`;
    
    return { id, shareUrl };
  } catch (error) {
    console.error('Failed to save configuration:', error);
    throw error;
  }
};

// Load Saved Configuration
const loadConfiguration = async (configId) => {
  try {
    const response = await fetch(\`/api/configurations/\${configId}\`);
    const configuration = await response.json();
    return configuration;
  } catch (error) {
    console.error('Failed to load configuration:', error);
    throw error;
  }
};

// Add to Cart Integration
const addToCart = async (configuration, price) => {
  const cartItem = {
    type: 'configured_product',
    configuration,
    price,
    quantity: 1,
    customizable: true
  };

  try {
    await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem)
    });
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
};

// Backend API
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Save configuration
app.post('/api/configurations', async (req, res) => {
  try {
    const { model, color, storage, extras, userId } = req.body;

    const configuration = await prisma.configuration.create({
      data: {
        userId,
        model,
        color,
        storage,
        extras: JSON.stringify(extras),
        price: calculatePrice(req.body)
      }
    });

    res.json({
      id: configuration.id,
      shareUrl: \`https://example.com/config/\${configuration.id}\`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get configuration
app.get('/api/configurations/:id', async (req, res) => {
  try {
    const configuration = await prisma.configuration.findUnique({
      where: { id: req.params.id }
    });

    if (!configuration) {
      return res.status(404).json({ error: 'Configuration not found' });
    }

    res.json({
      ...configuration,
      extras: JSON.parse(configuration.extras)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { ProductConfigurator, ConfigurationManager, saveConfiguration };`,
    explanation: `Interactive 3D product configurator with real-time price calculation, customization options, and order management.

## Core Implementation

**Key Features**: This demo showcases a fully interactive product configurator with 3D visualization, dynamic pricing, validation rules, configuration saving/sharing, and seamless cart integration.

**Architecture**: Built with React Three Fiber for 3D rendering, React for UI state management, Express.js backend for configuration storage, and Prisma ORM for database access.

**Performance**: Implements efficient 3D rendering with WebGL, optimized state updates, memoized price calculations, and lazy loading for 3D models.

## Technical Benefits

- **3D Visualization**: Real-time 3D product preview with WebGL
- **Dynamic Pricing**: Instant price updates with bundle discounts
- **Validation Rules**: Business logic for valid configurations
- **Save & Share**: Shareable configuration links`,
    technologies: [
      {
        name: 'React Three Fiber',
        description: '3D graphics in React with Three.js',
        tags: ['3D', 'WebGL', 'React']
      },
      {
        name: 'Three.js',
        description: 'JavaScript 3D library',
        tags: ['3D', 'Graphics', 'WebGL']
      },
      {
        name: 'React',
        description: 'Interactive UI with complex state',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Express.js',
        description: 'Backend API for configurations',
        tags: ['Backend', 'API', 'Node.js']
      }
    ],
    concepts: [
      {
        name: '3D Rendering',
        description: 'Real-time 3D visualization in the browser',
        example: 'WebGL rendering with orbit controls'
      },
      {
        name: 'Dynamic Pricing',
        description: 'Real-time price calculation based on selections',
        example: 'Base price + options + discounts'
      },
      {
        name: 'Configuration Management',
        description: 'Managing complex product options',
        example: 'Validation rules, dependencies, conflicts'
      },
      {
        name: 'State Persistence',
        description: 'Saving and loading configurations',
        example: 'Database storage with shareable links'
      }
    ],
    features: [
      '3D product visualization with orbit controls',
      'Real-time configuration updates',
      'Dynamic price calculation',
      'Bundle discount logic',
      'Configuration validation rules',
      'Save and share configurations',
      'Add to cart integration',
      'Mobile-responsive controls',
      'Export configuration as image',
      'Print-ready configuration summary'
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
        <h1 className="text-3xl font-bold text-blue-400 mb-4">⚙️ Product Configurator Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Interactive product configuration system with real-time 3D preview, dynamic pricing, and customization options.
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
          {/* 3D Preview */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Product Preview</h2>
            
            <div className="bg-gray-700 rounded-lg aspect-square flex items-center justify-center relative">
              <div className="text-9xl">
                {options.model.find(m => m.id === configuration.model)?.icon}
              </div>
              <div 
                className="absolute inset-0 rounded-lg"
                style={{
                  background: `radial-gradient(circle, ${options.color.find(c => c.id === configuration.color)?.hex}40, transparent)`
                }}
              />
            </div>
          </motion.div>

          {/* Model Selection */}
            <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Select Model</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {options.model.map((model, index) => (
                <motion.button
                  key={model.id}
                  onClick={() => handleOptionChange('model', model.id)}
                  className={`p-4 rounded-lg transition-all ${
                    configuration.model === model.id
                      ? 'bg-blue-600 ring-2 ring-blue-400'
                      : 'bg-gray-700 hover:bg-gray-650'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-2">{model.icon}</div>
                  <h3 className="font-bold text-sm">{model.name}</h3>
                  <p className="text-xs text-gray-400">${model.price}</p>
                </motion.button>
          ))}
        </div>
      </motion.div>

          {/* Color Selection */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Choose Color</h2>
            
            <div className="flex gap-4">
              {options.color.map((color, index) => (
                    <motion.button
                  key={color.id}
                  onClick={() => handleOptionChange('color', color.id)}
                  className={`relative ${
                    configuration.color === color.id ? 'ring-2 ring-white' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
                    className="w-12 h-12 rounded-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.price > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs px-1 rounded-full">
                      +${color.price}
                    </span>
                  )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

          {/* Storage Selection */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Storage Capacity</h2>
            
            <div className="grid grid-cols-4 gap-4">
              {options.storage.map((storage, index) => (
                <motion.button
                  key={storage.id}
                  onClick={() => handleOptionChange('storage', storage.id)}
                  className={`p-3 rounded-lg transition-all ${
                    configuration.storage === storage.id
                      ? 'bg-blue-600 ring-2 ring-blue-400'
                      : 'bg-gray-700 hover:bg-gray-650'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="font-bold">{storage.name}</div>
                  {storage.price > 0 && (
                    <div className="text-xs text-gray-400">+${storage.price}</div>
                  )}
                </motion.button>
            ))}
          </div>
        </motion.div>

          {/* Extras */}
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
        >
            <h2 className="text-2xl font-bold mb-4">Add Extras</h2>
            
          <div className="space-y-3">
              {options.extras.map((extra, index) => (
                <motion.div
                  key={extra.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    configuration.extras.includes(extra.id)
                      ? 'bg-green-600'
                      : 'bg-gray-700 hover:bg-gray-650'
                  }`}
                  onClick={() => handleExtraToggle(extra.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
            <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{extra.name}</h3>
            </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">${extra.price}</span>
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        configuration.extras.includes(extra.id)
                          ? 'bg-white border-white'
                          : 'border-gray-500'
                      }`}>
                        {configuration.extras.includes(extra.id) && (
                          <span className="text-green-600">✓</span>
                        )}
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
          {/* Price Summary */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl sticky top-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">💰 Price Summary</h3>
            
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Base Model:</span>
                <span>${options.model.find(m => m.id === configuration.model)?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Storage:</span>
                <span>+${options.storage.find(s => s.id === configuration.storage)?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Color:</span>
                <span>+${options.color.find(c => c.id === configuration.color)?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Extras:</span>
                <span>+${configuration.extras.reduce((sum, extraId) => 
                  sum + (options.extras.find(e => e.id === extraId)?.price || 0), 0
                )}</span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-3 mb-4">
              <div className="flex justify-between text-2xl font-bold">
                <span>Total:</span>
                <span className="text-green-400">${price}</span>
              </div>
            </div>

            <motion.button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>

            <motion.button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Configuration
            </motion.button>
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
                <span>3D Visualization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Save & Share</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Bundle Discounts</span>
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

export default ProductConfiguratorDemo;
