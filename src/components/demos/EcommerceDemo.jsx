import React, { useState } from "react";
export default function EcommerceDemo() {
  const [cart, setCart] = useState([]);
  const products = [
    { id: 1, name: 'Smart Watch', price: 199 },
    { id: 2, name: 'Wireless Earbuds', price: 99 },
    { id: 3, name: 'Fitness Tracker', price: 79 },
  ];
  function addToCart(p) {
    setCart(c => [...c, p]);
  }
  function checkout() {
    setCart([]);
    alert('Order placed!');
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">E-commerce Demo</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {products.map(p => (
          <div key={p.id} className="bg-gray-800 border border-gray-600 rounded-lg p-4 flex flex-col items-center">
            <div className="text-white font-medium mb-2">{p.name}</div>
            <div className="text-teal-400 font-bold mb-2">${p.price}</div>
            <button className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700" onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mt-4">
        <div className="text-white mb-2">Cart: {cart.length} item(s)</div>
        {cart.length > 0 && <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={checkout}>Checkout</button>}
      </div>
    </div>
  );
} 