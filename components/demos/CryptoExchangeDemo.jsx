import React, { useState } from "react";
export default function CryptoExchangeDemo() {
  const [orders, setOrders] = useState([
    { price: 1000, qty: 2, side: 'buy' },
    { price: 1010, qty: 1, side: 'sell' },
  ]);
  const [side, setSide] = useState('buy');
  const [qty, setQty] = useState('');
  function placeOrder() {
    setOrders(o => [...o, { price: 1000 + Math.random() * 50, qty: Number(qty), side }]);
    setQty('');
  }
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Crypto Exchange Orderbook</h3>
      <div className="flex gap-2 mb-4">
        <select className="bg-gray-800 text-white rounded px-2 py-1" value={side} onChange={e => setSide(e.target.value)}><option>buy</option><option>sell</option></select>
        <input className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={placeOrder} disabled={!qty}>Place</button>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <div className="text-white mb-2">Orderbook:</div>
        <ul>
          {orders.map((o, i) => (
            <li key={i} className={`text-sm mb-1 ${o.side === 'buy' ? 'text-green-400' : 'text-red-400'}`}>{o.side.toUpperCase()} {o.qty} @ ${o.price.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 