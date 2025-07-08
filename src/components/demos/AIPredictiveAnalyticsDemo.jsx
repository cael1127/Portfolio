import React, { useState } from "react";
export default function AIPredictiveAnalyticsDemo() {
  const [forecast, setForecast] = useState('');
  const [forecastResult, setForecastResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/predict-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forecast })
      });
      const data = await res.json();
      setForecastResult(data);
    } catch (err) {
      setForecastResult({ prediction: 'Error predicting sales.' });
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Sales Forecast Prediction</h3>
      <input className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-4" placeholder="Enter your forecast..." value={forecast} onChange={e => setForecast(e.target.value)} />
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={predict} disabled={loading}>{loading ? 'Predicting...' : 'Predict Sales'}</button>
      {forecastResult && (
        <div className="mt-4 p-4 bg-gray-700 rounded text-white">
          <h4 className="text-lg font-semibold mb-2">Predicted Sales</h4>
          <p>{forecastResult.prediction}</p>
        </div>
      )}
    </div>
  );
} 