import React, { useState } from "react";
export default function PaymentDemo() {
  const [amount, setAmount] = useState('');
  const [paid, setPaid] = useState(false);
  function pay() {
    setPaid(true);
    setTimeout(() => setPaid(false), 1500);
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Payment Gateway</h3>
      <input className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full" onClick={pay} disabled={!amount || paid}>{paid ? 'Paid!' : 'Pay'}</button>
    </div>
  );
} 