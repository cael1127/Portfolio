import React, { useState, useEffect } from "react";
export default function TradingDemo() {
  const [price, setPrice] = useState(1000 + Math.random() * 1000);
  const [qty, setQty] = useState('');
  const [orders, setOrders] = useState([]);
  function placeOrder() {
    setOrders(o => [...o, { price, qty }]);
    setQty('');
  }
  useEffect(() => {
    const interval = setInterval(() => setPrice(p => p + (Math.random() - 0.5) * 10), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Trading Platform</h3>
      <div className="mb-2">Live Price: <span className="text-teal-400 font-bold">${price.toFixed(2)}</span></div>
      <div className="flex gap-2 mb-4">
        <input className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={placeOrder} disabled={!qty}>Buy</button>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <div className="text-white mb-2">Orders:</div>
        <ul>
          {orders.map((o, i) => (
            <li key={i} className="text-gray-300 text-sm mb-1">Qty: {o.qty} @ ${o.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 