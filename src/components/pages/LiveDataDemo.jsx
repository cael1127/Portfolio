import React, { useState, useEffect, useCallback, useMemo } from 'react';

export default function LiveDataDemo() {
  const [sensorData, setSensorData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [connected, setConnected] = useState(false);
  
  // Debounce sensor data updates to prevent excessive re-renders
  const updateSensorData = useCallback((newData) => {
    setLatest(newData);
    setSensorData((prev) => [newData, ...prev.slice(0, 19)]); // keep last 20
  }, []);

  useEffect(() => {
    let socket;
    let updateTimeout;
    
    (async () => {
      const { io } = await import('https://cdn.socket.io/4.7.5/socket.io.esm.min.js');
      socket = io('http://localhost:4000');
      
      socket.on('connect', () => setConnected(true));
      socket.on('disconnect', () => setConnected(false));
      
      socket.on('sensorData', (data) => {
        // Debounce updates to prevent excessive re-renders
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
          updateSensorData(data);
        }, 100); // Update every 100ms max
      });
    })();
    
    return () => { 
      if (socket) socket.disconnect();
      clearTimeout(updateTimeout);
    };
  }, [updateSensorData]);

  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => 
    sensorData.map((d, i) => (
      <tr key={d.timestamp} className={i === 0 ? 'bg-green-50' : ''}>
        <td className="px-4 py-2">{new Date(d.timestamp).toLocaleTimeString()}</td>
        <td className="px-4 py-2">{d.temperature}</td>
        <td className="px-4 py-2">{d.salinity}</td>
        <td className="px-4 py-2">{d.ph}</td>
      </tr>
    )), [sensorData]);

  return (
    <section className="animate-fade-in">
      <h2 className="text-4xl font-bold gradient-text mb-6 leading-tight">Live Sensor Data Demo</h2>
      <p className="mb-4 text-gray-700">This page shows real-time aquaculture sensor data streamed from a Node.js backend using Socket.IO.</p>
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{connected ? 'Connected' : 'Disconnected'}</span>
      </div>
      {latest && (
        <div className="bg-teal-50 p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-green-700 mb-4">Latest Reading</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><span className="font-bold">Temperature:</span> {latest.temperature} °C</div>
            <div><span className="font-bold">Salinity:</span> {latest.salinity} ppt</div>
            <div><span className="font-bold">pH:</span> {latest.ph}</div>
            <div><span className="font-bold">Time:</span> {new Date(latest.timestamp).toLocaleTimeString()}</div>
          </div>
        </div>
      )}
      <h4 className="text-xl font-semibold text-green-700 mb-2">Recent Readings</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-emerald-50 rounded-xl shadow-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Temperature (°C)</th>
              <th className="px-4 py-2">Salinity (ppt)</th>
              <th className="px-4 py-2">pH</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    </section>
  );
} 