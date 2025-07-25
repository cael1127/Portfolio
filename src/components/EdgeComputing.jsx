import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const EdgeComputing = () => {
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
    
    // Initialize IoT device connections
    await initializeDeviceConnections(node);
    
    // Start real-time processing
    await startRealTimeProcessing(node);
    
    return node;
  };
  
  // IoT Device Management
  const registerIoTDevice = async (deviceConfig) => {
    const device = {
      id: deviceConfig.id,
      type: deviceConfig.type,
      capabilities: deviceConfig.capabilities,
      location: deviceConfig.location,
      status: 'registering'
    };
    
    // Establish MQTT connection
    const mqttClient = MQTT.connect('mqtt://edge-broker.local');
    
    // Subscribe to device topics
    mqttClient.subscribe(\`device/\${device.id}/data\`);
    mqttClient.subscribe(\`device/\${device.id}/status\`);
    
    // Handle incoming data
    mqttClient.on('message', (topic, message) => {
      processDeviceData(device.id, JSON.parse(message));
    });
    
    return device;
  };
  
  // Real-time Data Processing
  const processDeviceData = async (deviceId, data) => {
    // Preprocess data at edge
    const preprocessedData = await preprocessData(data);
    
    // Run local ML inference
    const model = await loadEdgeModel('sensor_analysis');
    const prediction = await model.predict(preprocessedData);
    
    // Send results to cloud if needed
    if (prediction.confidence > 0.8) {
      await sendToCloud(deviceId, prediction);
    }
    
    // Update local analytics
    updateLocalAnalytics(deviceId, prediction);
  };
  
  // Distributed Computing
  const distributeComputation = async (task) => {
    const availableNodes = edgeNodes.filter(node => node.status === 'online');
    
    // Load balancing algorithm
    const selectedNode = selectOptimalNode(availableNodes, task);
    
    // Deploy computation to edge node
    const result = await deployToEdge(selectedNode, task);
    
    return result;
  };
  
  // Edge AI/ML Processing
  const runEdgeInference = async (modelName, inputData) => {
    // Load optimized model for edge
    const model = await loadOptimizedModel(modelName);
    
    // Run inference with edge constraints
    const result = await model.infer(inputData, {
      batchSize: 1,
      useGPU: false,
      precision: 'int8'
    });
    
    return result;
  };
  
  // Data Stream Management
  const createDataStream = async (source, destination, config) => {
    const stream = {
      id: generateStreamId(),
      source: source,
      destination: destination,
      config: config,
      status: 'creating'
    };
    
    // Establish real-time connection
    const connection = await establishStreamConnection(stream);
    
    // Start data flow
    await startDataFlow(connection);
    
    return stream;
  };
  
  // Edge Analytics
  const runEdgeAnalytics = async (data) => {
    // Local data aggregation
    const aggregatedData = await aggregateData(data);
    
    // Run analytics algorithms
    const analytics = await performAnalytics(aggregatedData);
    
    // Generate insights
    const insights = await generateInsights(analytics);
    
    return insights;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          🌐 Edge Computing Platform
        </h1>
        
        {/* Edge Node Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Edge Nodes</h3>
            <p className="text-3xl font-bold">{edgeNodes.length}</p>
            <p className="text-blue-300 text-sm">Distributed globally</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">IoT Devices</h3>
            <p className="text-3xl font-bold">{iotDevices.length}</p>
            <p className="text-green-300 text-sm">Connected sensors</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Data Streams</h3>
            <p className="text-3xl font-bold">{dataStreams.length}</p>
            <p className="text-purple-300 text-sm">Real-time flows</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-900 to-yellow-700 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Processing Power</h3>
            <p className="text-3xl font-bold">2.4 TFLOPS</p>
            <p className="text-yellow-300 text-sm">Distributed compute</p>
          </div>
        </div>
        
        {/* Edge Node Management */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">🏢 Edge Nodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {edgeNodes.map(node => (
              <div key={node.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{node.name}</h3>
                  <span className={\`px-2 py-1 rounded text-xs \${node.status === 'online' ? 'bg-green-600' : 'bg-yellow-600'}\`}>
                    {node.status}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{node.location}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>CPU:</span>
                    <span className="text-blue-400">{node.cpu}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-green-400">{node.memory}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bandwidth:</span>
                    <span className="text-purple-400">{node.bandwidth} Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Devices:</span>
                    <span>{node.devices}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* IoT Device Management */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">📡 IoT Devices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {iotDevices.slice(0, 10).map(device => (
              <div key={device.id} className="bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">{device.name}</h3>
                  <span className={\`px-1 py-0.5 rounded text-xs \${device.status === 'active' ? 'bg-green-600' : 'bg-red-600'}\`}>
                    {device.status}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{device.type}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Battery:</span>
                    <span className="text-green-400">{device.battery}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signal:</span>
                    <span className="text-blue-400">{device.signal}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Rate:</span>
                    <span className="text-purple-400">{device.dataRate} bps</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Data Streams */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">🌊 Data Streams</h2>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {dataStreams.map(stream => (
              <div key={stream.id} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{stream.name}</h3>
                    <p className="text-gray-400 text-sm">{stream.type} stream</p>
                  </div>
                  <span className={\`px-2 py-1 rounded text-xs \${stream.status === 'active' ? 'bg-green-600' : 'bg-red-600'}\`}>
                    {stream.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Source</p>
                    <p className="text-blue-400">{stream.source}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Destination</p>
                    <p className="text-green-400">{stream.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Data Rate</p>
                    <p className="text-purple-400">{stream.dataRate} bps</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Latency</p>
                    <p className="text-yellow-400">{stream.latency} ms</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgeComputing;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-blue-400 mb-2">🌐 Edge Computing Platform</h1>
              <p className="text-gray-400">IoT device management, real-time processing, and distributed computing</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 View Code
            </button>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Edge Nodes</p>
                <p className="text-3xl font-bold text-white">{edgeNodes.length}</p>
                <p className="text-blue-400 text-sm">Distributed globally</p>
              </div>
              <div className="text-4xl">🏢</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">IoT Devices</p>
                <p className="text-3xl font-bold text-white">{iotDevices.length}</p>
                <p className="text-green-400 text-sm">Connected sensors</p>
              </div>
              <div className="text-4xl">📡</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Data Streams</p>
                <p className="text-3xl font-bold text-white">{dataStreams.length}</p>
                <p className="text-purple-400 text-sm">Real-time flows</p>
              </div>
              <div className="text-4xl">🌊</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Processing Power</p>
                <p className="text-3xl font-bold text-white">2.4 TFLOPS</p>
                <p className="text-yellow-400 text-sm">Distributed compute</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Edge Node Management */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">🏢 Edge Nodes</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {edgeNodes.map((node) => (
                <div key={node.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{node.name}</h3>
                      <p className="text-gray-400 text-sm">{node.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      node.status === 'online' ? 'bg-green-600' : 
                      node.status === 'warning' ? 'bg-yellow-600' : 'bg-red-600'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">CPU Usage</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              node.cpu > 80 ? 'bg-red-500' : 
                              node.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${node.cpu}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold">{node.cpu}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Memory Usage</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              node.memory > 80 ? 'bg-red-500' : 
                              node.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${node.memory}%` }}
                          ></div>
                        </div>
                        <span className="text-white font-semibold">{node.memory}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                    <div>
                      <p className="text-gray-400">Bandwidth</p>
                      <p className="text-blue-400 font-semibold">{node.bandwidth} Mbps</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Latency</p>
                      <p className="text-green-400 font-semibold">{node.latency} ms</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Devices</p>
                      <p className="text-purple-400 font-semibold">{node.devices}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IoT Device Management */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">📡 IoT Devices</h2>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {iotDevices.slice(0, 12).map((device) => (
                <div key={device.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-semibold">{device.name}</h3>
                      <p className="text-gray-400 text-sm">{device.type}</p>
                      <p className="text-gray-500 text-xs">{device.manufacturer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      device.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {device.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Battery:</span>
                      <span className={`font-semibold ${
                        device.battery > 50 ? 'text-green-400' : 
                        device.battery > 20 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {device.battery}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Signal:</span>
                      <span className={`font-semibold ${
                        device.signal > 80 ? 'text-green-400' : 
                        device.signal > 50 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {device.signal}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Data Rate:</span>
                      <span className="text-blue-400 font-semibold">{device.dataRate} bps</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Streams */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">🌊 Data Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataStreams.map((stream) => (
              <div key={stream.id} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{stream.name}</h3>
                    <p className="text-gray-400 text-sm">{stream.type} stream</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    stream.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {stream.status}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Source:</span>
                    <span className="text-blue-400">{stream.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination:</span>
                    <span className="text-green-400">{stream.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Data Rate:</span>
                    <span className="text-purple-400">{stream.dataRate} bps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latency:</span>
                    <span className="text-yellow-400">{stream.latency} ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Quality:</span>
                    <span className={`font-semibold ${
                      stream.quality > 90 ? 'text-green-400' : 
                      stream.quality > 70 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {stream.quality}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Edge Computing Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">🏢 Edge Node Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Distributed computing</li>
                <li>• Load balancing</li>
                <li>• Resource optimization</li>
                <li>• Fault tolerance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">📡 IoT Device Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Device registration</li>
                <li>• Real-time monitoring</li>
                <li>• Remote configuration</li>
                <li>• Security protocols</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">🌊 Data Stream Processing</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time analytics</li>
                <li>• Stream processing</li>
                <li>• Data filtering</li>
                <li>• Quality monitoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">🤖 Edge AI/ML</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Local inference</li>
                <li>• Model optimization</li>
                <li>• Federated learning</li>
                <li>• Edge training</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        {showCodeViewer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Edge Computing Code</h3>
                <button
                  onClick={() => setShowCodeViewer(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <CodeViewer code={demoCode} language="javascript" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EdgeComputing; 