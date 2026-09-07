import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const EdgeComputing = ({ isEmbedded = false }) => {
  const [edgeNodes, setEdgeNodes] = useState([]);
  const [iotDevices, setIotDevices] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize edge computing data
  useEffect(() => {
    const generateEdgeNodes = () => {
      const nodes = [];
      const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'São Paulo', 'Mumbai', 'Berlin', 'Toronto'];
      
      for (let i = 0; i < 8; i++) {
        nodes.push({
          id: i + 1,
          name: `Edge Node ${i + 1}`,
          location: locations[i],
          status: ['online', 'online', 'warning', 'online'][Math.floor(Math.random() * 4)],
          cpu: Math.floor(Math.random() * 40) + 60,
          memory: Math.floor(Math.random() * 30) + 70,
          bandwidth: Math.floor(Math.random() * 500) + 1000,
          latency: Math.floor(Math.random() * 20) + 5,
          devices: Math.floor(Math.random() * 50) + 10,
          dataProcessed: Math.floor(Math.random() * 1000) + 500
        });
      }
      return nodes;
    };

    const generateIoTDevices = () => {
      const devices = [];
      const types = ['sensor', 'camera', 'actuator', 'gateway', 'controller'];
      const manufacturers = ['Intel', 'Raspberry Pi', 'Arduino', 'ESP32', 'NVIDIA'];
      
      for (let i = 0; i < 25; i++) {
        devices.push({
          id: i + 1,
          name: `Device ${i + 1}`,
          type: types[Math.floor(Math.random() * types.length)],
          manufacturer: manufacturers[Math.floor(Math.random() * manufacturers.length)],
          status: Math.random() > 0.1 ? 'active' : 'inactive',
          battery: Math.floor(Math.random() * 100),
          signal: Math.floor(Math.random() * 100),
          dataRate: Math.floor(Math.random() * 1000) + 100,
          lastSeen: Date.now() - Math.random() * 3600000
        });
      }
      return devices;
    };

    const generateDataStreams = () => {
      const streams = [];
      const types = ['temperature', 'humidity', 'pressure', 'motion', 'image', 'audio'];
      
      for (let i = 0; i < 15; i++) {
        streams.push({
          id: i + 1,
          name: `${types[Math.floor(Math.random() * types.length)]}_stream_${i + 1}`,
          type: types[Math.floor(Math.random() * types.length)],
          source: `Device ${Math.floor(Math.random() * 25) + 1}`,
          destination: `Edge Node ${Math.floor(Math.random() * 8) + 1}`,
          dataRate: Math.floor(Math.random() * 1000) + 100,
          latency: Math.floor(Math.random() * 50) + 10,
          quality: Math.floor(Math.random() * 30) + 70,
          status: Math.random() > 0.05 ? 'active' : 'interrupted'
        });
      }
      return streams;
    };

    setEdgeNodes(generateEdgeNodes());
    setIotDevices(generateIoTDevices());
    setDataStreams(generateDataStreams());
  }, []);

  const demoCode = `import React, { useState, useEffect } from 'react';
import { MQTT } from 'mqtt';
import { TensorFlow } from '@tensorflow/tfjs';

const EdgeComputing = () => {
  const [edgeNodes, setEdgeNodes] = useState([]);
  const [iotDevices, setIotDevices] = useState([]);
  const [dataStreams, setDataStreams] = useState([]);
  
  // Edge Node Management
  const initializeEdgeNode = async (nodeConfig) => {
    const node = {
      id: nodeConfig.id,
      location: nodeConfig.location,
      resources: {
        cpu: nodeConfig.cpu,
        memory: nodeConfig.memory,
        storage: nodeConfig.storage
      },
      status: 'initializing'
    };
    
    // Deploy edge computing stack
    await deployEdgeStack(node);
    
    return node;
  };
  
  // IoT Device Communication
  const connectIoTDevice = async (deviceConfig) => {
    const client = MQTT.connect('mqtt://edge-node.local');
    
    client.on('connect', () => {
      client.subscribe('device/+/data');
      client.publish('device/register', JSON.stringify(deviceConfig));
    });
    
    client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      processDeviceData(data);
    });
    
    return client;
  };
  
  // Real-time Data Processing
  const processDeviceData = async (data) => {
    // Load edge ML model
    const model = await TensorFlow.loadLayersModel('/models/edge-predictor.json');
    
    // Process data locally
    const prediction = await model.predict(data);
    
    // Send results to cloud
    await sendToCloud({
      deviceId: data.deviceId,
      prediction: prediction.dataSync(),
      timestamp: Date.now()
    });
  };
  
  // Edge Analytics
  const performEdgeAnalytics = (dataStream) => {
    const analytics = {
      anomalyDetection: detectAnomalies(dataStream),
      predictiveMaintenance: predictMaintenance(dataStream),
      optimization: optimizePerformance(dataStream)
    };
    
    return analytics;
  };
  
  const containerClass = isEmbedded
    ? 'space-y-8 text-[var(--text)]'
    : 'min-h-screen bg-[var(--bg)] text-[var(--text)] p-6';

  const innerClass = isEmbedded ? 'space-y-8' : 'max-w-7xl mx-auto';

  return (
    <div className={containerClass}>
      <div className={innerClass}>
        <h1 className="text-4xl font-bold text-[var(--accent)] mb-8">
          Edge Computing Platform
        </h1>
        
        {/* Edge Computing Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            {/* Edge Nodes */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl">
                              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Edge Nodes</h2>
              <div className="space-y-4">
                {edgeNodes.map(node => (
                  <div key={node.id} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold">{node.name}</p>
                      <span className={\`text-xs px-2 py-1 rounded \${
                        node.status === 'online' ? 'bg-[var(--accent)]' :
                        node.status === 'warning' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                      }\`}>
                        {node.status}
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-sm">{node.location}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>
                        <p className="text-[var(--accent)]">CPU: {node.cpu}%</p>
                        <p className="text-[var(--accent)]">Memory: {node.memory}%</p>
                      </div>
                      <div>
                        <p className="text-[var(--accent)]">Devices: {node.devices}</p>
                        <p className="text-[var(--accent)]">Latency: {node.latency}ms</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* IoT Devices */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📱 IoT Devices</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {iotDevices.slice(0, 8).map(device => (
                  <div key={device.id} className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[var(--text)] font-semibold text-sm">{device.name}</p>
                      <span className={\`text-xs px-2 py-1 rounded \${
                        device.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                      }\`}>
                        {device.status}
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-xs">{device.type} - {device.manufacturer}</p>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-[var(--accent)]">Battery: {device.battery}%</span>
                      <span className="text-[var(--accent)]">Signal: {device.signal}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Data Streams */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl">
                            <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Data Streams</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dataStreams.map(stream => (
                <div key={stream.id} className={\`p-3 rounded-lg \${
                  stream.status === 'active' ? 'bg-[var(--accent-soft)]/50' : 'bg-[var(--accent-soft)]/50'
                }\`}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[var(--text)] font-semibold text-sm">{stream.name}</p>
                    <span className={\`text-xs px-2 py-1 rounded \${
                      stream.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                    }\`}>
                      {stream.status}
                    </span>
                  </div>
                  <p className="text-[var(--accent)] text-xs mb-1">{stream.type} stream</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[var(--accent)]">Rate: {stream.dataRate} bps</p>
                      <p className="text-[var(--accent)]">Latency: {stream.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-[var(--accent)]">Quality: {stream.quality}%</p>
                      <p className="text-[var(--accent)]">Source: {stream.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Analytics Dashboard */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-yellow-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">📈 Analytics</h2>
              <div className="space-y-4">
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Total Data Processed</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {edgeNodes.reduce((sum, node) => sum + node.dataProcessed, 0).toLocaleString()} MB
                  </p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Active Devices</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {iotDevices.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Average Latency</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {Math.round(edgeNodes.reduce((sum, node) => sum + node.latency, 0) / edgeNodes.length)}ms
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-red-800 to-[var(--accent-deep)] p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">⚠️ Alerts</h2>
              <div className="space-y-3">
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">High CPU Usage</p>
                  <p className="text-[var(--accent)] text-xs">Edge Node 3: 95% CPU utilization</p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">Device Offline</p>
                  <p className="text-[var(--accent)] text-xs">Device 12: No response for 5 minutes</p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">Low Battery</p>
                  <p className="text-[var(--accent)] text-xs">Device 8: 15% battery remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeComputing;`;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[var(--accent)] mb-2">Edge Computing Platform</h1>
              <p className="text-[var(--muted)]">Distributed computing and edge analytics for IoT and real-time processing</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-[var(--accent)] text-[var(--text)] px-4 py-2 rounded-lg hover:bg-[var(--accent-deep)] transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Edge Nodes */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">Edge Nodes</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">{edgeNodes.filter(n => n.status === 'online').length} online</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {edgeNodes.map(node => (
                  <div key={node.id} className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[var(--text)] font-semibold">{node.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        node.status === 'online' ? 'bg-[var(--accent)]' :
                        node.status === 'warning' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                      }`}>
                        {node.status}
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-sm mb-3">{node.location}</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[var(--accent)]">CPU</p>
                        <div className="w-full bg-[var(--accent-deep)] rounded-full h-2">
                          <div 
                            className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${node.cpu}%` }}
                          ></div>
                        </div>
                        <p className="text-[var(--text)] text-xs mt-1">{node.cpu}%</p>
                      </div>
                      <div>
                        <p className="text-[var(--accent)]">Memory</p>
                        <div className="w-full bg-[var(--accent-deep)] rounded-full h-2">
                          <div 
                            className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${node.memory}%` }}
                          ></div>
                        </div>
                        <p className="text-[var(--text)] text-xs mt-1">{node.memory}%</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-xs">
                      <span className="text-[var(--accent)]">{node.devices} devices</span>
                      <span className="text-[var(--accent)]">{node.latency}ms latency</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* IoT Devices */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-green-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">📱 IoT Devices</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">{iotDevices.filter(d => d.status === 'active').length} active</span>
                </div>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {iotDevices.slice(0, 8).map(device => (
                  <div key={device.id} className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-[var(--text)] font-semibold text-sm">{device.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        device.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                      }`}>
                        {device.status}
                      </span>
                    </div>
                    <p className="text-[var(--accent)] text-xs mb-2">{device.type} - {device.manufacturer}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
                        <span className="text-[var(--accent)] text-xs">{device.battery}%</span>
                      </div>
                      <span className="text-[var(--accent)] text-xs">{device.signal}% signal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Streams */}
          <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
            <div className="flex items-center justify-between mb-6">
                              <h2 className="text-2xl font-bold text-[var(--text)]">Data Streams</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                <span className="text-[var(--accent)] text-sm">{dataStreams.filter(s => s.status === 'active').length} active</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dataStreams.map(stream => (
                <div key={stream.id} className={`p-3 rounded-lg ${
                  stream.status === 'active' ? 'bg-[var(--accent-soft)]/50' : 'bg-[var(--accent-soft)]/50'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[var(--text)] font-semibold text-sm">{stream.name}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      stream.status === 'active' ? 'bg-[var(--accent)]' : 'bg-[var(--accent)]'
                    }`}>
                      {stream.status}
                    </span>
                  </div>
                  <p className="text-[var(--accent)] text-xs mb-2">{stream.type} stream</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-[var(--accent)]">Rate: {stream.dataRate} bps</p>
                      <p className="text-[var(--accent)]">Latency: {stream.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-[var(--accent)]">Quality: {stream.quality}%</p>
                      <p className="text-[var(--accent)]">Source: {stream.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Dashboard */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-yellow-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">📈 Analytics</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">Real-time</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Total Data Processed</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {edgeNodes.reduce((sum, node) => sum + node.dataProcessed, 0).toLocaleString()} MB
                  </p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Active Devices</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {iotDevices.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-4 rounded-lg">
                  <p className="text-[var(--text)] font-semibold">Average Latency</p>
                  <p className="text-[var(--accent)] text-2xl font-bold">
                    {Math.round(edgeNodes.reduce((sum, node) => sum + node.latency, 0) / edgeNodes.length)}ms
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-red-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--text)]">Alerts</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full animate-pulse"></div>
                  <span className="text-[var(--accent)] text-sm">Monitoring</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">High CPU Usage</p>
                  <p className="text-[var(--accent)] text-xs">Edge Node 3: 95% CPU utilization</p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">Device Offline</p>
                  <p className="text-[var(--accent)] text-xs">Device 12: No response for 5 minutes</p>
                </div>
                <div className="bg-[var(--accent-soft)]/50 p-3 rounded-lg">
                  <p className="text-[var(--text)] font-semibold text-sm">Low Battery</p>
                  <p className="text-[var(--accent)] text-xs">Device 8: 15% battery remaining</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-[var(--bg)] via-gray-800 to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Edge Computing</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Distributed processing nodes</li>
                <li>• Local data processing</li>
                <li>• Reduced latency and bandwidth</li>
                <li>• Offline operation capability</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">IoT Integration</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Device management and monitoring</li>
                <li>• Real-time data collection</li>
                <li>• Automated device provisioning</li>
                <li>• Battery and signal optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--accent)] mb-2">Edge Analytics</h3>
              <ul className="space-y-1 text-[var(--text)] text-sm">
                <li>• Local machine learning models</li>
                <li>• Real-time anomaly detection</li>
                <li>• Predictive maintenance</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="Edge Computing Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default EdgeComputing; 