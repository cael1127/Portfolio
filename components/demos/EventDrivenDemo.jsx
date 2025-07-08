import React, { useState, useEffect } from "react";
export default function EventDrivenDemo() {
  const [events, setEvents] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const eventTypes = ['User Login', 'Data Update', 'System Alert', 'Payment Processed'];
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 2000);
    return () => clearInterval(interval);
  }, [isRunning, eventTypes]);
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Event-Driven Architecture</h3>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 mb-4" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop Events' : 'Start Events'}
      </button>
      <div className="space-y-2">
        {events.map(event => (
          <div key={event.id} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="text-white font-bold">{event.type}</div>
            <div className="text-gray-400 text-sm">{event.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 