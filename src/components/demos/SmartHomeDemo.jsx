import React, { useState } from "react";
export default function SmartHomeDemo() {
  const [devices, setDevices] = useState([
    { name: 'Living Room Light', type: 'light', status: 'on', brightness: 80 },
    { name: 'Kitchen Thermostat', type: 'thermostat', status: 'on', temperature: 72 },
    { name: 'Security Camera', type: 'camera', status: 'on', recording: true },
    { name: 'Smart Lock', type: 'lock', status: 'locked', battery: 85 }
  ]);
  const toggleDevice = (index) => {
    setDevices(devices.map((device, i) => {
      if (i !== index) return device;
      return { ...device, status: device.status === 'on' || device.status === 'unlocked' ? 'off' : 'on' };
    }));
  };
  const adjustSetting = (index, setting, value) => {
    setDevices(devices.map((device, i) => {
      if (i !== index) return device;
      return { ...device, [setting]: value };
    }));
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Smart Home Control</h3>
      <div className="space-y-3">
        {devices.map((device, index) => (
          <div key={device.name} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white font-bold">{device.name}</div>
              <button 
                className={`text-xs px-2 py-1 rounded ${
                  device.status === 'on' || device.status === 'unlocked'
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'
                }`}
                onClick={() => toggleDevice(index)}
              >
                {device.status}
              </button>
            </div>
            <div className="text-gray-400 text-sm">
              {device.type === 'light' && (
                <div>
                  <label>Brightness: {device.brightness}%</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={device.brightness}
                    onChange={(e) => adjustSetting(index, 'brightness', parseInt(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              )}
              {device.type === 'thermostat' && (
                <div>
                  <label>Temperature: {device.temperature}°F</label>
                  <input 
                    type="range" 
                    min="60" 
                    max="80" 
                    value={device.temperature}
                    onChange={(e) => adjustSetting(index, 'temperature', parseInt(e.target.value))}
                    className="w-full mt-1"
                  />
                </div>
              )}
              {device.type === 'camera' && (
                <div>Recording: {device.recording ? 'Yes' : 'No'}</div>
              )}
              {device.type === 'lock' && (
                <div>Battery: {device.battery}%</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 