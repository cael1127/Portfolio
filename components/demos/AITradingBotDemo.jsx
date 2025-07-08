import React, { useState } from "react";
export default function AITradingBotDemo() {
  const [running, setRunning] = useState(false);
  const [profit, setProfit] = useState(0);
  function run() {
    setRunning(true);
    setProfit(0);
    let p = 0;
    let i = 0;
    const interval = setInterval(() => {
      p += (Math.random() - 0.45) * 100;
      setProfit(p);
      i++;
      if (i > 20) { setRunning(false); clearInterval(interval); }
    }, 500);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">AI Trading Bot Simulator</h3>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4" onClick={run} disabled={running}>{running ? 'Running...' : 'Run Bot'}</button>
      <div className="text-white mb-2">Profit: <span className={`font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>{profit.toFixed(2)} USD</span></div>
      {/* You can add a chart here if needed */}
    </div>
  );
} 