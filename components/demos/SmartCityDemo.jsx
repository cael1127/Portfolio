import React, { useState } from "react";
export default function SmartCityDemo() {
  const [sensors, setSensors] = useState([
    { name: 'Traffic Light #1', status: 'Green', location: 'Main St & 5th Ave' },
    { name: 'Air Quality Sensor', status: 'Good', location: 'Central Park' },
    { name: 'Smart Parking', status: 'Available', location: 'Downtown Garage' },
    { name: 'Street Light #15', status: 'On', location: 'Riverside Blvd' }
  ]);
  const toggleSensor = (index) => {
    setSensors(sensors.map((sensor, i) => {
      if (i !== index) return sensor;
      const statusMap = {
        'Green': 'Red',
        'Red': 'Green',
        'Good': 'Moderate',
        'Moderate': 'Good',
        'Available': 'Occupied',
        'Occupied': 'Available',
        'On': 'Off',
        'Off': 'On'
      };
      return { ...sensor, status: statusMap[sensor.status] || sensor.status };
    }));
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Smart City IoT</h3>
      <div className="space-y-3">
        {sensors.map((sensor, index) => (
          <div key={sensor.name} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-bold">{sensor.name}</div>
                <div className="text-gray-400 text-sm">{sensor.location}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  sensor.status === 'Green' || sensor.status === 'Good' || sensor.status === 'Available' || sensor.status === 'On'
                    ? 'bg-green-600 text-white'
                    : sensor.status === 'Red' || sensor.status === 'Moderate' || sensor.status === 'Occupied' || sensor.status === 'Off'
                    ? 'bg-red-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}>
                  {sensor.status}
                </span>
                <button 
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => toggleSensor(index)}
                >
                  Toggle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 