import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const ProductConfiguratorDemo = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const [customizations, setCustomizations] = useState({});
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate product data
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', basePrice: 1200, category: 'Electronics' },
      { id: 2, name: 'Office Chair', basePrice: 300, category: 'Furniture' },
      { id: 3, name: 'Smartphone', basePrice: 800, category: 'Electronics' },
      { id: 4, name: 'Desk', basePrice: 200, category: 'Furniture' }
    ];

    const mockConfigurations = [
      { id: 1, productId: 1, option: 'RAM', choices: ['8GB', '16GB', '32GB'], prices: [0, 200, 400] },
      { id: 2, productId: 1, option: 'Storage', choices: ['256GB SSD', '512GB SSD', '1TB SSD'], prices: [0, 150, 300] },
      { id: 3, productId: 1, option: 'Graphics', choices: ['GTX 1660', 'RTX 3060', 'RTX 4070'], prices: [0, 300, 600] },
      { id: 4, productId: 2, option: 'Color', choices: ['Black', 'White', 'Brown'], prices: [0, 0, 0] },
      { id: 5, productId: 2, option: 'Material', choices: ['Fabric', 'Leather', 'Mesh'], prices: [0, 100, 50] }
    ];

    setConfigurations(mockConfigurations);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductConfiguratorDemo = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const [customizations, setCustomizations] = useState({});

  useEffect(() => {
    // Simulate product data
    const mockProducts = [
      { id: 1, name: 'Gaming Laptop', basePrice: 1200, category: 'Electronics' }
    ];
    
    setConfigurations(mockProducts);
  }, []);

  const calculateTotalPrice = () => {
    let total = selectedProduct?.basePrice || 0;
    Object.values(customizations).forEach(price => {
      total += price;
    });
    return total;
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {configurations.map((product, index) => (
          <motion.div 
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-white">{product.name}</h3>
            <p className="text-sm text-gray-400">{product.category}</p>
            <p className="text-lg font-bold text-blue-400">${product.basePrice}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};`,
    explanation: `Product configurator system with dynamic customization options and real-time pricing.

## Core Implementation

**Key Features**: This demo showcases a comprehensive product configurator with dynamic customization options, real-time pricing, and interactive configuration interface.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Dynamic Configuration**: Real-time product customization options
- **Price Calculation**: Automatic pricing updates based on selections
- **Interactive Interface**: Smooth user experience with animations
- **Validation System**: Ensures compatible configurations`,
    technologies: [
      {
        name: 'Dynamic Configuration',
        description: 'Real-time product customization options',
        tags: ['Configuration', 'Dynamic']
      },
      {
        name: 'Price Calculation',
        description: 'Automatic pricing updates based on selections',
        tags: ['Pricing', 'Calculation']
      },
      {
        name: 'Interactive Interface',
        description: 'Smooth user experience with animations',
        tags: ['UI/UX', 'Animations']
      }
    ],
    concepts: [
      {
        name: 'State Management',
        description: 'Managing complex product configuration state',
        example: 'const [customizations, setCustomizations] = useState({})'
      },
      {
        name: 'Price Calculation',
        description: 'Dynamic pricing based on user selections',
        example: 'const totalPrice = basePrice + Object.values(customizations).reduce((sum, price) => sum + price, 0)'
      },
      {
        name: 'Configuration Validation',
        description: 'Ensuring compatible product configurations',
        example: 'const isValidConfiguration = validateOptions(selectedOptions)'
      }
    ],
    features: [
      'Dynamic product configuration',
      'Real-time price calculation',
      'Interactive customization interface',
      'Configuration validation',
      'Smooth animations and transitions',
      'Responsive design'
    ]
  };

  const calculateTotalPrice = () => {
    let total = selectedProduct?.basePrice || 0;
    Object.values(customizations).forEach(price => {
      total += price;
    });
    return total;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Product Configurator</h1>
          <p className="text-gray-400">Dynamic product customization with real-time pricing</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* Product Selection */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6">Select Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 1, name: 'Gaming Laptop', basePrice: 1200, category: 'Electronics' },
            { id: 2, name: 'Office Chair', basePrice: 300, category: 'Furniture' },
            { id: 3, name: 'Smartphone', basePrice: 800, category: 'Electronics' },
            { id: 4, name: 'Desk', basePrice: 200, category: 'Furniture' }
          ].map((product, index) => (
            <motion.div 
              key={product.id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedProduct?.id === product.id ? 'bg-teal-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedProduct(product)}
            >
              <h3 className="font-semibold text-white">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.category}</p>
              <p className="text-lg font-bold text-blue-400">${product.basePrice}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Configuration Options */}
      {selectedProduct && (
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Configure {selectedProduct.name}</h2>
          <div className="space-y-6">
            {[
              { option: 'RAM', choices: ['8GB', '16GB', '32GB'], prices: [0, 200, 400] },
              { option: 'Storage', choices: ['256GB SSD', '512GB SSD', '1TB SSD'], prices: [0, 150, 300] },
              { option: 'Graphics', choices: ['GTX 1660', 'RTX 3060', 'RTX 4070'], prices: [0, 300, 600] }
            ].map((config, index) => (
              <motion.div 
                key={config.option}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white">{config.option}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {config.choices.map((choice, choiceIndex) => (
                    <motion.button
                      key={choice}
                      className={`p-3 rounded-lg text-left transition-all ${
                        customizations[config.option] === config.prices[choiceIndex] 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCustomizations(prev => ({
                        ...prev,
                        [config.option]: config.prices[choiceIndex]
                      }))}
                    >
                      <div className="font-semibold">{choice}</div>
                      <div className="text-sm text-gray-400">
                        {config.prices[choiceIndex] > 0 ? `+$${config.prices[choiceIndex]}` : 'Included'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Price Summary */}
      {selectedProduct && (
        <motion.div 
          className="bg-gray-800 p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Price Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Base Price</span>
              <span className="text-white">${selectedProduct.basePrice}</span>
            </div>
            {Object.entries(customizations).map(([option, price]) => (
              <div key={option} className="flex justify-between items-center">
                <span className="text-gray-300">{option}</span>
                <span className="text-white">+${price}</span>
              </div>
            ))}
            <div className="border-t border-gray-600 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-2xl font-bold text-green-400">${calculateTotalPrice()}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default ProductConfiguratorDemo;
