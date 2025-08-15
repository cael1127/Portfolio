const fs = require('fs');
const path = require('path');

// List of all demo files to enhance
const demoFiles = [
  'src/components/demos/BlockchainDemo.jsx',
  'src/components/demos/LogisticsDemo.jsx',
  'src/components/demos/HealthcareDemo.jsx',
  'src/components/demos/SmartCityDemo.jsx',
  'src/components/demos/FinancialDemo.jsx',
  'src/components/demos/GamePlatformDemo.jsx',
  'src/components/demos/PortfolioBuilderDemo.jsx',
  'src/components/demos/RestaurantAppDemo.jsx',
  'src/components/demos/ResumeAnalyzerDemo.jsx',
  'src/components/demos/WhiteboardDemo.jsx'
];

// Sample code templates for each demo
const demoCodeTemplates = {
  'BlockchainDemo.jsx': `import React, { useState, useEffect } from 'react';

const BlockchainDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        from: '0x' + Math.random().toString(16).substr(2, 8),
        to: '0x' + Math.random().toString(16).substr(2, 8),
        amount: Math.floor(Math.random() * 1000) + 1,
        gas: Math.floor(Math.random() * 100) + 21,
        status: Math.random() > 0.1 ? 'confirmed' : 'pending'
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction Monitor */}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{tx.amount} ETH</p>
                  <p className="text-gray-300 text-sm">{tx.from}</p>
                  <p className="text-gray-400 text-xs">{tx.to}</p>
                </div>
                <div className="text-right">
                  <div className="px-2 py-1 rounded text-xs">
                    {tx.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainDemo;`,

  'LogisticsDemo.jsx': `import React, { useState, useEffect } from 'react';

const LogisticsDemo = () => {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => ({
        ...vehicle,
        location: {
          lat: vehicle.location.lat + (Math.random() - 0.5) * 0.01,
          lng: vehicle.location.lng + (Math.random() - 0.5) * 0.01
        },
        fuel: Math.max(0, vehicle.fuel - Math.random() * 2),
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Fleet Management */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{vehicle.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Fuel</p>
                  <p className="text-white font-semibold">{vehicle.fuel.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{vehicle.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogisticsDemo;`,

  'HealthcareDemo.jsx': `import React, { useState, useEffect } from 'react';

const HealthcareDemo = () => {
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => prev.map(patient => ({
        ...patient,
        heartRate: patient.heartRate + (Math.random() - 0.5) * 10,
        bloodPressure: {
          systolic: patient.bloodPressure.systolic + (Math.random() - 0.5) * 5,
          diastolic: patient.bloodPressure.diastolic + (Math.random() - 0.5) * 3
        },
        lastUpdate: 'Just now'
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Patient Monitoring */}
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{patient.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Heart Rate</p>
                  <p className="text-white font-semibold">{patient.heartRate.toFixed(0)} bpm</p>
                </div>
                <div>
                  <p className="text-gray-400">Blood Pressure</p>
                  <p className="text-white font-semibold">{patient.bloodPressure.systolic}/{patient.bloodPressure.diastolic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareDemo;`,

  'SmartCityDemo.jsx': `import React, { useState, useEffect } from 'react';

const SmartCityDemo = () => {
  const [sensors, setSensors] = useState([]);
  const [traffic, setTraffic] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => ({
        ...sensor,
        value: sensor.value + (Math.random() - 0.5) * 5,
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sensor Data */}
        <div className="space-y-4">
          {sensors.map((sensor) => (
            <div key={sensor.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{sensor.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Value</p>
                  <p className="text-white font-semibold">{sensor.value.toFixed(1)} {sensor.unit}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{sensor.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartCityDemo;`,

  'FinancialDemo.jsx': `import React, { useState, useEffect } from 'react';

const FinancialDemo = () => {
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = {
        id: Date.now(),
        type: ['buy', 'sell'][Math.floor(Math.random() * 2)],
        symbol: ['AAPL', 'GOOGL', 'MSFT', 'TSLA'][Math.floor(Math.random() * 4)],
        amount: Math.floor(Math.random() * 1000) + 100,
        price: Math.random() * 500 + 50,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction Monitor */}
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{tx.symbol}</p>
                  <p className="text-gray-300 text-sm">{tx.type.toUpperCase()}</p>
                  <p className="text-gray-400 text-xs">\${tx.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">\${tx.amount.toFixed(2)}</p>
                  <p className="text-gray-400 text-xs">{tx.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialDemo;`,

  'GamePlatformDemo.jsx': `import React, { useState, useEffect } from 'react';

const GamePlatformDemo = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGames(prev => prev.map(game => ({
        ...game,
        players: game.players + Math.floor((Math.random() - 0.5) * 20),
        lastUpdate: 'Just now'
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Game Management */}
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{game.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Players</p>
                  <p className="text-white font-semibold">{game.players.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{game.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePlatformDemo;`,

  'PortfolioBuilderDemo.jsx': `import React, { useState, useEffect } from 'react';

const PortfolioBuilderDemo = () => {
  const [templates, setTemplates] = useState([]);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev => prev.map(project => ({
        ...project,
        views: project.views + Math.floor(Math.random() * 10),
        lastUpdate: 'Just now'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Gallery */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Views</p>
                  <p className="text-white font-semibold">{project.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-white font-semibold">{project.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderDemo;`,

  'RestaurantAppDemo.jsx': `import React, { useState, useEffect } from 'react';

const RestaurantAppDemo = () => {
  const [orders, setOrders] = useState([]);
  const [menu, setMenu] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder = {
        id: Date.now(),
        items: ['Burger', 'Pizza', 'Salad'][Math.floor(Math.random() * 3)],
        total: Math.floor(Math.random() * 50) + 10,
        status: ['pending', 'preparing', 'ready'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setOrders(prev => [newOrder, ...prev.slice(0, 9)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Management */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Order #{order.id}</p>
                  <p className="text-gray-300 text-sm">{order.items}</p>
                  <p className="text-gray-400 text-xs">{order.timestamp}</p>
                </div>
                <div className="text-right">
                                     <p className="text-white font-semibold">\${order.total.toFixed(2)}</p>
                  <div className="px-2 py-1 rounded text-xs">
                    {order.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantAppDemo;`,

  'ResumeAnalyzerDemo.jsx': `import React, { useState, useEffect } from 'react';

const ResumeAnalyzerDemo = () => {
  const [resumes, setResumes] = useState([]);
  const [analytics, setAnalytics] = useState({});
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newResume = {
        id: Date.now(),
        candidate: 'Candidate ' + Math.floor(Math.random() * 1000),
        score: Math.floor(Math.random() * 40) + 60,
        skills: ['JavaScript', 'React', 'Python'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setResumes(prev => [newResume, ...prev.slice(0, 9)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Resume Analysis */}
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">{resume.candidate}</p>
                  <p className="text-gray-300 text-sm">{resume.skills}</p>
                  <p className="text-gray-400 text-xs">{resume.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{resume.score}%</p>
                  <div className="px-2 py-1 rounded text-xs">
                    {resume.score > 80 ? 'Excellent' : resume.score > 60 ? 'Good' : 'Fair'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerDemo;`,

  'WhiteboardDemo.jsx': `import React, { useState, useEffect } from 'react';

const WhiteboardDemo = () => {
  const [sessions, setSessions] = useState([]);
  const [drawings, setDrawings] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newSession = {
        id: Date.now(),
        name: 'Session ' + Math.floor(Math.random() * 1000),
        participants: Math.floor(Math.random() * 10) + 1,
        drawings: Math.floor(Math.random() * 50) + 10,
        lastUpdate: 'Just now'
      };
      
      setSessions(prev => [newSession, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Session Management */}
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{session.name}</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-gray-400">Participants</p>
                  <p className="text-white font-semibold">{session.participants}</p>
                </div>
                <div>
                  <p className="text-gray-400">Drawings</p>
                  <p className="text-white font-semibold">{session.drawings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhiteboardDemo;`
};

// Function to enhance a demo file
function enhanceDemoFile(filePath) {
  const fileName = path.basename(filePath);
  const demoName = fileName.replace('.jsx', '');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add CodeViewer import if not already present
    if (!content.includes("import CodeViewer from '../CodeViewer'")) {
      content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport CodeViewer from '../CodeViewer';"
      );
    }
    
    // Add showCodeViewer state if not present
    if (!content.includes('showCodeViewer')) {
      content = content.replace(
        'const [',
        'const [showCodeViewer, setShowCodeViewer] = useState(false);\n  const ['
      );
    }
    
    // Add demo code template
    const demoCode = demoCodeTemplates[fileName];
    if (demoCode && !content.includes('demoCode')) {
      const codeTemplate = `  // Sample code for the demo
  const demoCode = \`${demoCode}\`;`;
      
      // Find a good place to insert the demo code (after state declarations)
      const stateMatch = content.match(/const \[.*?\] = useState\([^)]*\);/);
      if (stateMatch) {
        const insertIndex = content.lastIndexOf(stateMatch[0]) + stateMatch[0].length;
        content = content.slice(0, insertIndex) + '\n\n' + codeTemplate + content.slice(insertIndex);
      }
    }
    
    // Add code viewer button to header
    if (!content.includes('View Code')) {
      const headerPattern = /<div className="mb-8">\s*<h1[^>]*>.*?<\/h1>\s*<p[^>]*>.*?<\/p>\s*<\/div>/s;
      const headerReplacement = `<div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🎯 ${demoName.replace(/([A-Z])/g, ' $1').trim()}</h1>
            <p className="text-gray-300 text-lg">
              Interactive demo with real-time data and advanced features
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>CD</span>
            <span>View Code</span>
          </button>
        </div>`;
      
      content = content.replace(headerPattern, headerReplacement);
    }
    
    // Add CodeViewer component at the end
    if (!content.includes('CodeViewer')) {
      const endPattern = /(\s*<\/div>\s*\);\s*}\s*;\s*\n\s*export default \w+;)/;
      const codeViewerComponent = `

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="${demoName.replace(/([A-Z])/g, ' $1').trim()} Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}`;
      
      content = content.replace(endPattern, codeViewerComponent + '$1');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Enhanced ${fileName}`);
    
  } catch (error) {
    console.error(`❌ Error enhancing ${fileName}:`, error.message);
  }
}

// Enhance all demo files
console.log('Starting demo enhancement...\n');

demoFiles.forEach(enhanceDemoFile);

console.log('\n🎉 Demo enhancement completed!'); 