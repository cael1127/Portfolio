import React, { useMemo, useState } from 'react';
import CodeViewer from '../CodeViewer';

const productsData = [
  { id: 'p1', name: 'Pro Hoodie', price: 65, tag: 'apparel', description: 'Premium quality hoodie with modern design' },
  { id: 'p2', name: 'Dev Tee', price: 28, tag: 'apparel', description: 'Comfortable cotton t-shirt for developers' },
  { id: 'p3', name: 'Sticker Pack', price: 7, tag: 'swag', description: 'Collection of developer-themed stickers' },
  { id: 'p4', name: 'Desk Mat', price: 35, tag: 'gear', description: 'Large desk mat for comfortable coding' },
  { id: 'p5', name: 'Mechanical Keyboard', price: 120, tag: 'gear', description: 'High-quality mechanical keyboard' },
  { id: 'p6', name: 'Wireless Mouse', price: 45, tag: 'gear', description: 'Ergonomic wireless mouse' },
];

const EcommerceDemo = () => {
  const [tag, setTag] = useState('all');
  const [cart, setCart] = useState(new Map());
  const [openCode, setOpenCode] = useState(false);

  const products = useMemo(() => {
    return tag==='all' ? productsData : productsData.filter(p=>p.tag===tag);
  }, [tag]);

  const handleAdd = (p) => {
    const next = new Map(cart);
    next.set(p.id, (next.get(p.id)||0)+1);
    setCart(next);
  };

  const handleRemove = (productId) => {
    const next = new Map(cart);
    const currentQty = next.get(productId) || 0;
    if (currentQty > 1) {
      next.set(productId, currentQty - 1);
    } else {
      next.delete(productId);
    }
    setCart(next);
  };

  const total = useMemo(()=>{
    let sum = 0; 
    for (const [id, qty] of cart){ 
      const p=productsData.find(x=>x.id===id); 
      if(p) sum+=p.price*qty; 
    }
    return sum;
  },[cart]);

  const itemCount = useMemo(() => {
    return Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  // Enhanced code data for the new CodeViewer
  const codeData = {
    code: `// E-commerce Cart Implementation
import React, { useMemo, useState } from 'react';

const EcommerceDemo = () => {
  const [cart, setCart] = useState(new Map());
  const [tag, setTag] = useState('all');

  // Memoized product filtering for performance
  const products = useMemo(() => {
    return tag === 'all' 
      ? productsData 
      : productsData.filter(p => p.tag === tag);
  }, [tag]);

  // O(1) cart operations using Map
  const handleAdd = (product) => {
    const next = new Map(cart);
    next.set(product.id, (next.get(product.id) || 0) + 1);
    setCart(next);
  };

  const handleRemove = (productId) => {
    const next = new Map(cart);
    const currentQty = next.get(productId) || 0;
    if (currentQty > 1) {
      next.set(productId, currentQty - 1);
    } else {
      next.delete(productId);
    }
    setCart(next);
  };

  // Memoized total calculation
  const total = useMemo(() => {
    let sum = 0;
    for (const [id, qty] of cart) {
      const product = productsData.find(p => p.id === id);
      if (product) sum += product.price * qty;
    }
    return sum;
  }, [cart]);

  // Memoized item count
  const itemCount = useMemo(() => {
    return Array.from(cart.values()).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  return (
    <div className="grid md:grid-cols-[1fr,320px] gap-6">
      {/* Product Catalog */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Product Catalog</h3>
          <div className="flex items-center gap-2">
            {['all', 'apparel', 'swag', 'gear'].map(t => (
              <button 
                key={t} 
                onClick={() => setTag(t)} 
                className={\`text-sm px-3 py-1 rounded \${
                  tag === t 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }\`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-gray-800 border border-gray-700 rounded p-4">
              <div className="text-gray-200 font-medium">{product.name}</div>
              <div className="text-gray-400 text-sm mb-2">{product.description}</div>
              <div className="text-blue-400 text-lg font-semibold mb-3">
                \${product.price.toFixed(2)}
              </div>
              <button 
                onClick={() => handleAdd(product)} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart */}
      <aside className="bg-gray-900 border border-gray-800 rounded p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          🛒 Cart ({itemCount} items)
        </h4>
        
        <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
          {Array.from(cart.entries()).map(([id, qty]) => {
            const product = productsData.find(p => p.id === id);
            if (!product) return null;
            
            return (
              <div key={id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-gray-400">\${product.price.toFixed(2)} each</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleRemove(id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{qty}</span>
                  <button 
                    onClick={() => handleAdd(product)}
                    className="text-green-400 hover:text-green-300"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total</span>
            <span className="text-blue-400">\${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </aside>
    </div>
  );
};`,
    explanation: `This e-commerce demo showcases modern React patterns for building efficient shopping cart functionality with optimal performance characteristics.

## Core Implementation

**State Management**: Uses React's built-in useState with Map data structure for O(1) cart operations. The Map provides efficient key-value storage for product quantities.

**Performance Optimization**: Implements useMemo hooks for expensive calculations like total computation and product filtering. This prevents unnecessary re-renders and recalculations.

**Component Architecture**: Clean separation between product catalog and shopping cart with clear data flow and minimal prop drilling.

## Key Features

**Efficient Cart Operations**: Map-based storage enables O(1) add, remove, and update operations instead of O(n) array operations.

**Memoized Calculations**: Total and item count calculations are memoized to prevent unnecessary recalculations on every render.

**Category Filtering**: Real-time product filtering by category with smooth transitions and state management.

**Responsive Design**: Mobile-first approach with responsive grid layouts that adapt to different screen sizes.

**Interactive Controls**: Intuitive add/remove buttons with visual feedback and quantity management.

## Performance Benefits

- **Map vs Array**: Cart operations are O(1) instead of O(n)
- **Memoization**: Prevents expensive recalculations
- **Conditional Rendering**: Only renders visible products
- **Event Delegation**: Efficient event handling for cart operations`,

    technologies: [
      {
        name: "React",
        description: "Frontend framework for building interactive user interfaces",
        tags: ["Hooks", "State Management", "Components"]
      },
      {
        name: "JavaScript ES6+",
        description: "Modern JavaScript features for efficient data manipulation",
        tags: ["Map", "useMemo", "Arrow Functions"]
      },
      {
        name: "CSS Grid",
        description: "Modern CSS layout system for responsive product grids",
        tags: ["Responsive", "Grid Layout", "Flexbox"]
      },
      {
        name: "Performance Optimization",
        description: "React optimization patterns for smooth user experience",
        tags: ["Memoization", "useMemo", "useCallback"]
      }
    ],

    concepts: [
      {
        name: "Map Data Structure",
        description: "Key-value storage providing O(1) operations for cart management",
        example: "cart.set(productId, quantity) for instant updates"
      },
      {
        name: "Memoization",
        description: "Caching expensive calculations to prevent unnecessary re-renders",
        example: "useMemo(() => calculateTotal(cart), [cart])"
      },
      {
        name: "State Management",
        description: "Managing component state with React hooks for predictable updates",
        example: "const [cart, setCart] = useState(new Map())"
      },
      {
        name: "Conditional Rendering",
        description: "Rendering different UI based on application state",
        example: "products.map() with filtering based on selected category"
      },
      {
        name: "Event Handling",
        description: "Managing user interactions with efficient event handlers",
        example: "onClick handlers for add/remove cart operations"
      }
    ],

    features: [
      "O(1) cart operations using Map data structure",
      "Memoized calculations for optimal performance",
      "Real-time category filtering",
      "Responsive product grid layout",
      "Interactive quantity controls",
      "Live total calculation",
      "Smooth state transitions",
      "Mobile-optimized interface"
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🛍️ E-commerce Storefront Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Interactive shopping cart implementation showcasing modern React patterns, performance optimization, and efficient state management
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setOpenCode(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>💻</span>
            View Implementation
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,320px] gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Product Catalog</h3>
            <div className="flex items-center gap-2">
              {['all','apparel','swag','gear'].map(t => (
                <button 
                  key={t} 
                  onClick={()=>setTag(t)} 
                  className={`text-sm px-3 py-1 rounded ${
                    tag===t
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="bg-gray-800 border border-gray-700 rounded p-4">
                <div className="text-gray-200 font-medium">{p.name}</div>
                <div className="text-gray-400 text-sm mb-2">{p.description}</div>
                <div className="text-blue-400 text-lg font-semibold mb-3">${p.price.toFixed(2)}</div>
                <button 
                  onClick={()=>handleAdd(p)} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-gray-900 border border-gray-800 rounded p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            🛒 Cart ({itemCount} items)
          </h4>
          <div className="space-y-2 text-sm max-h-64 overflow-y-auto">
            {Array.from(cart.entries()).map(([id, qty])=>{
              const p=productsData.find(x=>x.id===id); 
              if(!p) return null;
              return (
                <div key={id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-gray-400">${p.price.toFixed(2)} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleRemove(id)}
                      className="text-red-400 hover:text-red-300 w-6 h-6 rounded bg-gray-700 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{qty}</span>
                    <button 
                      onClick={() => handleAdd(p)}
                      className="text-green-400 hover:text-green-300 w-6 h-6 rounded bg-gray-700 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-400">${total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </aside>
      </div>

      {openCode && (
        <CodeViewer 
          isOpen={openCode} 
          onClose={()=>setOpenCode(false)} 
          title="E-commerce Implementation"
          language="javascript"
          code={codeData.code}
          explanation={codeData.explanation}
          technologies={codeData.technologies}
          concepts={codeData.concepts}
          features={codeData.features}
        />
      )}
    </div>
  );
};

export default EcommerceDemo;


