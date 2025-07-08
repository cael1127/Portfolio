import React, { useState } from "react";
export default function MicroservicesDemo() {
  const [services, setServices] = useState([
    { name: 'User Service', status: 'Healthy', latency: '45ms' },
    { name: 'Payment Service', status: 'Healthy', latency: '120ms' },
    { name: 'Inventory Service', status: 'Warning', latency: '300ms' },
    { name: 'Notification Service', status: 'Healthy', latency: '80ms' }
  ]);
  const toggleService = (index) => {
    setServices(services.map((service, i) => 
      i === index 
        ? { ...service, status: service.status === 'Healthy' ? 'Down' : 'Healthy' }
        : service
    ));
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Microservices Health</h3>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={service.name} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-bold">{service.name}</div>
                <div className="text-gray-400 text-sm">Latency: {service.latency}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  service.status === 'Healthy' ? 'bg-green-600 text-white' : 
                  service.status === 'Warning' ? 'bg-yellow-600 text-white' : 
                  'bg-red-600 text-white'
                }`}>
                  {service.status}
                </span>
                <button 
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => toggleService(index)}
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