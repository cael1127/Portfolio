import React, { useState } from "react";
export default function EventDrivenDemo() {
  const [events, setEvents] = useState([]);
  function addEvent() {
    setEvents(e => [...e, { time: new Date().toLocaleTimeString(), type: 'Event' }]);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Event Bus Visualizer</h3>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4" onClick={addEvent}>Add Event</button>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <ul>
          {events.map((e, i) => (
            <li key={i} className="text-white text-sm mb-1">{e.type} at {e.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 