import React, { useState } from "react";
export default function DeFiDemo() {
  const [deposit, setDeposit] = useState('');
  const [borrow, setBorrow] = useState('');
  const [rate, setRate] = useState(2.5 + Math.random() * 2);
  const [result, setResult] = useState(null);
  function simulate() {
    setResult({
      deposit: Number(deposit),
      borrow: Number(borrow),
      rate,
      health: 100 - Number(borrow) / (Number(deposit) + 1) * 100,
    });
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">DeFi Lending Simulator</h3>
      <div className="mb-2">Deposit: <input className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white w-24" value={deposit} onChange={e => setDeposit(e.target.value)} /></div>
      <div className="mb-2">Borrow: <input className="px-2 py-1 rounded bg-gray-800 border border-gray-600 text-white w-24" value={borrow} onChange={e => setBorrow(e.target.value)} /></div>
      <div className="mb-2">Interest Rate: <span className="text-teal-400 font-bold">{rate.toFixed(2)}%</span></div>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4" onClick={simulate}>Simulate</button>
      {result && <div className="text-white">Health Factor: <span className={`font-bold ${result.health < 50 ? 'text-red-400' : 'text-green-400'}`}>{result.health.toFixed(1)}</span></div>}
    </div>
  );
} 