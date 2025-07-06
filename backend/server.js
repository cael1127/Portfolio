import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { migrate } from './migrate.js';
import { scanNetwork } from './scanner.js';
import fetch from 'node-fetch';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Mock data for helpdesk portal
let tickets = [
  {
    id: 1,
    title: 'Printer not working',
    description: 'The office printer is showing error code E-04',
    category: 'Hardware',
    priority: 'High',
    status: 'Open',
    assignedTo: 'John Smith',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Email access issue',
    description: 'Cannot access Outlook from mobile device',
    category: 'Software',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah Johnson',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const agents = [
  { id: 1, name: 'John Smith', ticketsResolved: 45, avgResolutionTime: '2.3 hours' },
  { id: 2, name: 'Sarah Johnson', ticketsResolved: 38, avgResolutionTime: '1.8 hours' },
  { id: 3, name: 'Mike Davis', ticketsResolved: 52, avgResolutionTime: '2.1 hours' }
];

const knowledgeBase = [
  {
    id: 1,
    question: 'How to reset network password?',
    answer: 'Go to portal.company.com/password-reset and follow the instructions.',
    category: 'Account Management'
  },
  {
    id: 2,
    question: 'Printer error E-04 troubleshooting',
    answer: 'Check paper tray, clear any paper jams, and restart the printer.',
    category: 'Hardware'
  },
  {
    id: 3,
    question: 'VPN connection issues',
    answer: 'Ensure you have the latest VPN client installed and check your internet connection.',
    category: 'Network'
  }
];

// Helpdesk API endpoints
app.get('/api/tickets', (req, res) => {
  res.json(tickets);
});

app.post('/api/tickets', (req, res) => {
  const { title, description, category, priority } = req.body;
  const newTicket = {
    id: tickets.length + 1,
    title,
    description,
    category,
    priority,
    status: 'Open',
    assignedTo: 'Unassigned',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  res.json(newTicket);
});

app.get('/api/agents', (req, res) => {
  res.json(agents);
});

app.get('/api/knowledge-base', (req, res) => {
  res.json(knowledgeBase);
});

// Store scan history
let scanHistory = [];

// Network scanner API endpoints
app.post('/api/scan', async (req, res) => {
  try {
    const { targets } = req.body;
    const scanResult = await scanNetwork(targets || ['192.168.1.1', '192.168.1.10', '192.168.1.100']);
    scanHistory.unshift(scanResult);
    if (scanHistory.length > 10) scanHistory = scanHistory.slice(0, 10); // Keep last 10 scans
    res.json(scanResult);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/scan-results', (req, res) => {
  res.json(scanHistory);
});

// Simulate sensor data
function generateSensorData() {
  return {
    temperature: +(20 + Math.random() * 5).toFixed(2),
    salinity: +(30 + Math.random() * 2).toFixed(2),
    ph: +(7 + Math.random() * 0.5).toFixed(2),
    timestamp: Date.now(),
  };
}

// Broadcast sensor data every second
setInterval(() => {
  const data = generateSensorData();
  io.emit('sensorData', data);
}, 1000);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

app.get('/', (req, res) => {
  res.send('Aquaculture Sensor Data API is running.');
});

app.post('/api/migrate', async (req, res) => {
  try {
    const result = await migrate();
    res.json({ status: 'success', message: result });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Zero Trust Auth (mock)
let sessions = {};

function calculateRisk({ username, device, location }) {
  let risk = 10;
  if (username === 'admin') risk += 40;
  if (device !== 'desktop') risk += 20;
  if (location !== 'US') risk += 30;
  return risk;
}

app.post('/api/auth/login', (req, res) => {
  const { username, password, device = 'desktop', location = 'US' } = req.body;
  // Simulate password check
  if (!username || !password) return res.status(400).json({ status: 'error', message: 'Missing credentials' });
  const risk = calculateRisk({ username, device, location });
  const sessionId = Math.random().toString(36).slice(2);
  const mfaRequired = risk >= 50;
  sessions[sessionId] = { username, risk, mfaRequired, authenticated: !mfaRequired };
  res.json({ sessionId, risk, mfaRequired, authenticated: !mfaRequired });
});

app.post('/api/auth/mfa', (req, res) => {
  const { sessionId, code } = req.body;
  if (!sessions[sessionId]) return res.status(400).json({ status: 'error', message: 'Invalid session' });
  // Simulate MFA code check
  if (code === '123456') {
    sessions[sessionId].authenticated = true;
    return res.json({ status: 'success', authenticated: true });
  } else {
    return res.status(401).json({ status: 'error', message: 'Invalid MFA code' });
  }
});

app.get('/api/auth/session', (req, res) => {
  const { sessionid } = req.query;
  if (!sessions[sessionid]) return res.status(404).json({ status: 'error', message: 'Session not found' });
  res.json(sessions[sessionid]);
});

// Chatbot FAQ and responses
const chatbotData = {
  faqs: [
    {
      question: "How do I place an order?",
      answer: "You can place an order through our website, by calling us at 1-800-OYSTERS, or by emailing orders@threesisters.com. We accept all major credit cards and offer secure online payment processing.",
      intent: "order"
    },
    {
      question: "What are your shipping options?",
      answer: "We offer overnight shipping for fresh oysters and 2-3 day shipping for frozen products. All orders are shipped with ice packs to maintain freshness. Shipping costs vary by location and order size.",
      intent: "shipping"
    },
    {
      question: "How long do oysters stay fresh?",
      answer: "Fresh oysters should be consumed within 7-10 days of harvest when properly refrigerated. Frozen oysters can last up to 6 months in the freezer. Always check the harvest date on the package.",
      intent: "freshness"
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the continental United States due to food safety regulations. We're working on expanding our international shipping options.",
      intent: "international"
    },
    {
      question: "What's your return policy?",
      answer: "We guarantee the freshness of our oysters. If you're not satisfied with your order, please contact us within 24 hours of delivery for a full refund or replacement.",
      intent: "returns"
    },
    {
      question: "Are your oysters sustainable?",
      answer: "Yes! We practice sustainable aquaculture methods that protect the environment and ensure the long-term health of our oyster beds. We're certified by the Marine Stewardship Council.",
      intent: "sustainability"
    }
  ],
  greetings: [
    "Hello! How can I help you today?",
    "Hi there! Welcome to Three Sisters Oyster Company. What can I assist you with?",
    "Welcome! I'm here to help with any questions about our oysters and services."
  ],
  fallbacks: [
    "I'm not sure I understand. Could you rephrase that?",
    "I don't have information about that specific topic. Would you like to speak with a human representative?",
    "Let me connect you with one of our customer service representatives who can better assist you."
  ]
};

function findIntent(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('purchase')) return 'order';
  if (lowerMessage.includes('ship') || lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) return 'shipping';
  if (lowerMessage.includes('fresh') || lowerMessage.includes('expire') || lowerMessage.includes('last')) return 'freshness';
  if (lowerMessage.includes('international') || lowerMessage.includes('abroad') || lowerMessage.includes('country')) return 'international';
  if (lowerMessage.includes('return') || lowerMessage.includes('refund') || lowerMessage.includes('money back')) return 'returns';
  if (lowerMessage.includes('sustainable') || lowerMessage.includes('environment') || lowerMessage.includes('eco')) return 'sustainability';
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) return 'greeting';
  return 'unknown';
}

app.post('/api/chatbot', (req, res) => {
  const { message, handoff = false } = req.body;
  
  if (handoff) {
    return res.json({
      type: 'handoff',
      message: 'Connecting you to a human representative... Please wait while we transfer your call.',
      agent: 'Sarah Johnson',
      waitTime: '2-3 minutes'
    });
  }

  const intent = findIntent(message);
  let response;

  if (intent === 'greeting') {
    response = {
      type: 'message',
      message: chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)],
      suggestions: ['How do I place an order?', 'What are your shipping options?', 'Are your oysters sustainable?']
    };
  } else if (intent !== 'unknown') {
    const faq = chatbotData.faqs.find(f => f.intent === intent);
    response = {
      type: 'message',
      message: faq.answer,
      suggestions: ['How long do oysters stay fresh?', 'Do you ship internationally?', 'What\'s your return policy?']
    };
  } else {
    response = {
      type: 'message',
      message: chatbotData.fallbacks[Math.floor(Math.random() * chatbotData.fallbacks.length)],
      suggestions: ['Speak to human', 'How do I place an order?', 'What are your shipping options?']
    };
  }

  // Simulate typing delay
  setTimeout(() => {
    res.json(response);
  }, 1000 + Math.random() * 2000);
});

// Predictive Maintenance AI (mock)
const equipment = [
  {
    id: 1,
    name: 'Water Pump Station A',
    type: 'Pump',
    location: 'North Bay',
    lastMaintenance: '2024-01-15',
    sensorData: {
      temperature: 45.2,
      vibration: 0.8,
      pressure: 2.1,
      flowRate: 150.5,
      runtime: 720
    },
    failureProbability: 0.15,
    status: 'Normal',
    recommendations: ['Schedule maintenance within 2 weeks', 'Monitor vibration levels']
  },
  {
    id: 2,
    name: 'Oxygen Generator B',
    type: 'Generator',
    location: 'South Bay',
    lastMaintenance: '2024-02-01',
    sensorData: {
      temperature: 52.8,
      vibration: 1.2,
      pressure: 1.8,
      flowRate: 120.3,
      runtime: 680
    },
    failureProbability: 0.45,
    status: 'Warning',
    recommendations: ['Immediate maintenance required', 'Check bearing condition', 'Replace filters']
  },
  {
    id: 3,
    name: 'Filter System C',
    type: 'Filter',
    location: 'East Bay',
    lastMaintenance: '2024-01-20',
    sensorData: {
      temperature: 38.5,
      vibration: 0.3,
      pressure: 3.2,
      flowRate: 95.7,
      runtime: 450
    },
    failureProbability: 0.08,
    status: 'Normal',
    recommendations: ['Continue monitoring', 'Next maintenance in 3 weeks']
  },
  {
    id: 4,
    name: 'Heating System D',
    type: 'Heater',
    location: 'West Bay',
    lastMaintenance: '2024-01-10',
    sensorData: {
      temperature: 78.9,
      vibration: 1.8,
      pressure: 1.5,
      flowRate: 85.2,
      runtime: 890
    },
    failureProbability: 0.72,
    status: 'Critical',
    recommendations: ['Emergency maintenance needed', 'Replace heating elements', 'Check electrical connections']
  }
];

function predictFailure(sensorData) {
  // Mock ML prediction algorithm
  let risk = 0;
  
  // Temperature factor (higher temp = higher risk)
  if (sensorData.temperature > 70) risk += 0.4;
  else if (sensorData.temperature > 50) risk += 0.2;
  
  // Vibration factor
  if (sensorData.vibration > 1.5) risk += 0.3;
  else if (sensorData.vibration > 1.0) risk += 0.15;
  
  // Pressure factor
  if (sensorData.pressure < 1.0 || sensorData.pressure > 3.0) risk += 0.2;
  
  // Runtime factor (longer runtime = higher risk)
  if (sensorData.runtime > 800) risk += 0.25;
  else if (sensorData.runtime > 600) risk += 0.1;
  
  // Add some randomness for demo
  risk += (Math.random() - 0.5) * 0.1;
  
  return Math.max(0, Math.min(1, risk));
}

app.post('/api/predict-maintenance', (req, res) => {
  const { equipmentId, sensorData } = req.body;
  
  const failureProbability = predictFailure(sensorData);
  const status = failureProbability > 0.6 ? 'Critical' : 
                 failureProbability > 0.3 ? 'Warning' : 'Normal';
  
  let recommendations = [];
  if (failureProbability > 0.6) {
    recommendations = ['Emergency maintenance required', 'Shutdown recommended', 'Contact technician immediately'];
  } else if (failureProbability > 0.3) {
    recommendations = ['Schedule maintenance soon', 'Monitor closely', 'Check for unusual sounds'];
  } else {
    recommendations = ['Continue normal operation', 'Next maintenance as scheduled'];
  }
  
  res.json({
    equipmentId,
    failureProbability: Math.round(failureProbability * 100) / 100,
    status,
    recommendations,
    predictedFailureDate: failureProbability > 0.5 ? 
      new Date(Date.now() + (7 - failureProbability * 10) * 24 * 60 * 60 * 1000).toISOString() : null
  });
});

app.get('/api/equipment-status', (req, res) => {
  // Update equipment with fresh predictions
  const updatedEquipment = equipment.map(eq => ({
    ...eq,
    failureProbability: predictFailure(eq.sensorData),
    status: predictFailure(eq.sensorData) > 0.6 ? 'Critical' : 
            predictFailure(eq.sensorData) > 0.3 ? 'Warning' : 'Normal'
  }));
  
  res.json(updatedEquipment);
});

app.get('/api/maintenance-recommendations', (req, res) => {
  const recommendations = equipment
    .filter(eq => eq.failureProbability > 0.3)
    .map(eq => ({
      equipmentId: eq.id,
      equipmentName: eq.name,
      priority: eq.failureProbability > 0.6 ? 'High' : 'Medium',
      failureProbability: eq.failureProbability,
      recommendations: eq.recommendations,
      estimatedCost: eq.failureProbability > 0.6 ? '$2,000 - $5,000' : '$500 - $1,500'
    }))
    .sort((a, b) => b.failureProbability - a.failureProbability);
  
  res.json(recommendations);
});

// Sales Forecasting Model (mock)
const historicalSales = [
  // 2023 data with seasonal patterns
  { month: '2023-01', sales: 12500, region: 'Northeast' },
  { month: '2023-02', sales: 11800, region: 'Northeast' },
  { month: '2023-03', sales: 14200, region: 'Northeast' },
  { month: '2023-04', sales: 15800, region: 'Northeast' },
  { month: '2023-05', sales: 17200, region: 'Northeast' },
  { month: '2023-06', sales: 18900, region: 'Northeast' },
  { month: '2023-07', sales: 20100, region: 'Northeast' },
  { month: '2023-08', sales: 19500, region: 'Northeast' },
  { month: '2023-09', sales: 16800, region: 'Northeast' },
  { month: '2023-10', sales: 14500, region: 'Northeast' },
  { month: '2023-11', sales: 13200, region: 'Northeast' },
  { month: '2023-12', sales: 15800, region: 'Northeast' },
  // 2024 data
  { month: '2024-01', sales: 13100, region: 'Northeast' },
  { month: '2024-02', sales: 12400, region: 'Northeast' },
  { month: '2024-03', sales: 14800, region: 'Northeast' },
  { month: '2024-04', sales: 16400, region: 'Northeast' },
  { month: '2024-05', sales: 17800, region: 'Northeast' },
  { month: '2024-06', sales: 19500, region: 'Northeast' },
  { month: '2024-07', sales: 20700, region: 'Northeast' },
  { month: '2024-08', sales: 20100, region: 'Northeast' },
  { month: '2024-09', sales: 17400, region: 'Northeast' },
  { month: '2024-10', sales: 15100, region: 'Northeast' },
  { month: '2024-11', sales: 13800, region: 'Northeast' },
  { month: '2024-12', sales: 16400, region: 'Northeast' },
  // Add data for other regions
  ...Array.from({ length: 24 }, (_, i) => ({
    month: `2023-${String(Math.floor(i/12) + 1).padStart(2, '0')}`,
    sales: Math.floor(8000 + Math.random() * 4000 + Math.sin(i * 0.5) * 2000),
    region: 'Southeast'
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    month: `2023-${String(Math.floor(i/12) + 1).padStart(2, '0')}`,
    sales: Math.floor(6000 + Math.random() * 3000 + Math.sin(i * 0.5) * 1500),
    region: 'West Coast'
  }))
];

function generateForecast(historicalData, months = 12) {
  const forecasts = [];
  const lastYear = historicalData.slice(-12);
  const growthRate = 0.05; // 5% annual growth
  const seasonalFactors = [0.8, 0.75, 0.9, 1.0, 1.1, 1.2, 1.3, 1.25, 1.05, 0.9, 0.8, 0.95]; // Seasonal adjustments

  for (let i = 0; i < months; i++) {
    const month = i % 12;
    const baseSales = lastYear[month].sales;
    const seasonalFactor = seasonalFactors[month];
    const growthFactor = Math.pow(1 + growthRate, Math.floor(i / 12) + 1);
    const randomFactor = 0.9 + Math.random() * 0.2; // ±10% randomness
    
    const forecastSales = Math.round(baseSales * seasonalFactor * growthFactor * randomFactor);
    
    forecasts.push({
      month: `2025-${String(month + 1).padStart(2, '0')}`,
      sales: forecastSales,
      confidence: 0.85 - (i * 0.02), // Decreasing confidence for further predictions
      type: 'forecast'
    });
  }
  
  return forecasts;
}

app.get('/api/sales-history', (req, res) => {
  res.json(historicalSales);
});

app.get('/api/sales-forecast', (req, res) => {
  const forecast = generateForecast(historicalSales, 12);
  res.json({
    forecast,
    accuracy: 0.87,
    model: 'Seasonal ARIMA with Holiday Adjustments',
    lastUpdated: new Date().toISOString()
  });
});

app.get('/api/regional-forecast', (req, res) => {
  const regions = ['Northeast', 'Southeast', 'West Coast'];
  const regionalForecasts = regions.map(region => {
    const regionalData = historicalSales.filter(d => d.region === region);
    const forecast = generateForecast(regionalData, 6);
    return {
      region,
      currentSales: regionalData[regionalData.length - 1].sales,
      forecast: forecast.slice(0, 6),
      growthRate: Math.random() * 0.1 + 0.02, // 2-12% growth
      marketShare: Math.random() * 0.3 + 0.2 // 20-50% market share
    };
  });
  
  res.json(regionalForecasts);
});

// Environmental Impact Dashboard (mock)
const waterQualityData = [
  { date: '2024-01-01', ph: 7.2, temperature: 12.5, salinity: 32.1, dissolvedOxygen: 8.4, turbidity: 2.1, status: 'Good' },
  { date: '2024-01-15', ph: 7.1, temperature: 11.8, salinity: 31.8, dissolvedOxygen: 8.2, turbidity: 2.3, status: 'Good' },
  { date: '2024-02-01', ph: 7.3, temperature: 10.2, salinity: 32.5, dissolvedOxygen: 8.6, turbidity: 1.8, status: 'Excellent' },
  { date: '2024-02-15', ph: 7.0, temperature: 9.5, salinity: 32.8, dissolvedOxygen: 8.8, turbidity: 1.5, status: 'Excellent' },
  { date: '2024-03-01', ph: 7.4, temperature: 11.2, salinity: 31.9, dissolvedOxygen: 8.3, turbidity: 2.0, status: 'Good' },
  { date: '2024-03-15', ph: 7.2, temperature: 13.8, salinity: 31.5, dissolvedOxygen: 8.1, turbidity: 2.5, status: 'Good' },
  { date: '2024-04-01', ph: 7.5, temperature: 15.2, salinity: 31.2, dissolvedOxygen: 7.9, turbidity: 2.8, status: 'Fair' },
  { date: '2024-04-15', ph: 7.3, temperature: 16.8, salinity: 30.8, dissolvedOxygen: 7.7, turbidity: 3.1, status: 'Fair' },
  { date: '2024-05-01', ph: 7.6, temperature: 18.5, salinity: 30.5, dissolvedOxygen: 7.5, turbidity: 3.3, status: 'Fair' },
  { date: '2024-05-15', ph: 7.4, temperature: 20.2, salinity: 30.2, dissolvedOxygen: 7.3, turbidity: 3.5, status: 'Fair' },
  { date: '2024-06-01', ph: 7.7, temperature: 22.1, salinity: 29.8, dissolvedOxygen: 7.1, turbidity: 3.8, status: 'Poor' },
  { date: '2024-06-15', ph: 7.5, temperature: 23.8, salinity: 29.5, dissolvedOxygen: 6.9, turbidity: 4.0, status: 'Poor' }
];

const harvestYieldData = [
  { month: '2023-01', yield: 8500, oysters: 425000, efficiency: 0.78, sustainability: 0.92 },
  { month: '2023-02', yield: 8200, oysters: 410000, efficiency: 0.76, sustainability: 0.91 },
  { month: '2023-03', yield: 9200, oysters: 460000, efficiency: 0.82, sustainability: 0.93 },
  { month: '2023-04', yield: 10500, oysters: 525000, efficiency: 0.85, sustainability: 0.94 },
  { month: '2023-05', yield: 11800, oysters: 590000, efficiency: 0.88, sustainability: 0.95 },
  { month: '2023-06', yield: 13200, oysters: 660000, efficiency: 0.91, sustainability: 0.96 },
  { month: '2023-07', yield: 14500, oysters: 725000, efficiency: 0.93, sustainability: 0.97 },
  { month: '2023-08', yield: 13800, oysters: 690000, efficiency: 0.90, sustainability: 0.96 },
  { month: '2023-09', yield: 12200, oysters: 610000, efficiency: 0.87, sustainability: 0.95 },
  { month: '2023-10', yield: 10800, oysters: 540000, efficiency: 0.84, sustainability: 0.94 },
  { month: '2023-11', yield: 9500, oysters: 475000, efficiency: 0.81, sustainability: 0.93 },
  { month: '2023-12', yield: 8800, oysters: 440000, efficiency: 0.79, sustainability: 0.92 },
  { month: '2024-01', yield: 8700, oysters: 435000, efficiency: 0.80, sustainability: 0.93 },
  { month: '2024-02', yield: 8400, oysters: 420000, efficiency: 0.78, sustainability: 0.92 },
  { month: '2024-03', yield: 9400, oysters: 470000, efficiency: 0.83, sustainability: 0.94 },
  { month: '2024-04', yield: 10700, oysters: 535000, efficiency: 0.86, sustainability: 0.95 },
  { month: '2024-05', yield: 12000, oysters: 600000, oysters: 0.89, sustainability: 0.96 },
  { month: '2024-06', yield: 13400, oysters: 670000, efficiency: 0.92, sustainability: 0.97 }
];

const sustainabilityMetrics = {
  carbonFootprint: {
    current: 2.3, // tons CO2 per ton of oysters
    target: 1.8,
    trend: 'decreasing',
    reduction: 0.4
  },
  waterUsage: {
    current: 150, // liters per kg of oysters
    target: 120,
    trend: 'decreasing',
    reduction: 20
  },
  wasteRecycling: {
    current: 85, // percentage
    target: 95,
    trend: 'increasing',
    improvement: 10
  },
  biodiversity: {
    current: 92, // biodiversity index
    target: 95,
    trend: 'stable',
    improvement: 3
  },
  energyEfficiency: {
    current: 78, // percentage
    target: 85,
    trend: 'increasing',
    improvement: 7
  }
};

app.get('/api/water-quality', (req, res) => {
  // Add real-time data simulation
  const currentData = {
    ...waterQualityData[waterQualityData.length - 1],
    date: new Date().toISOString().split('T')[0],
    ph: +(7.2 + Math.random() * 0.6).toFixed(1),
    temperature: +(20 + Math.random() * 5).toFixed(1),
    salinity: +(30 + Math.random() * 3).toFixed(1),
    dissolvedOxygen: +(7.0 + Math.random() * 2).toFixed(1),
    turbidity: +(2.5 + Math.random() * 2).toFixed(1)
  };
  
  // Determine status based on values
  if (currentData.dissolvedOxygen < 6.5 || currentData.turbidity > 4.0) {
    currentData.status = 'Poor';
  } else if (currentData.dissolvedOxygen < 7.5 || currentData.turbidity > 3.0) {
    currentData.status = 'Fair';
  } else if (currentData.dissolvedOxygen < 8.0 || currentData.turbidity > 2.5) {
    currentData.status = 'Good';
  } else {
    currentData.status = 'Excellent';
  }
  
  res.json({
    current: currentData,
    historical: waterQualityData,
    alerts: currentData.status === 'Poor' ? ['Low dissolved oxygen levels detected', 'High turbidity warning'] : []
  });
});

app.get('/api/harvest-yields', (req, res) => {
  res.json({
    data: harvestYieldData,
    currentMonth: harvestYieldData[harvestYieldData.length - 1],
    yearToDate: harvestYieldData.slice(-6).reduce((sum, item) => sum + item.yield, 0),
    projectedAnnual: Math.round(harvestYieldData.slice(-6).reduce((sum, item) => sum + item.yield, 0) * 2)
  });
});

app.get('/api/sustainability-metrics', (req, res) => {
  res.json(sustainabilityMetrics);
});

app.get('/api/environmental-trends', (req, res) => {
  const trends = {
    waterQuality: {
      trend: 'stable',
      change: '+2.3%',
      period: 'Last 6 months',
      factors: ['Improved filtration systems', 'Reduced runoff', 'Better monitoring']
    },
    harvestEfficiency: {
      trend: 'improving',
      change: '+8.7%',
      period: 'Last 12 months',
      factors: ['Optimized growing conditions', 'Better seed quality', 'Enhanced feeding protocols']
    },
    sustainability: {
      trend: 'improving',
      change: '+5.2%',
      period: 'Last 12 months',
      factors: ['Renewable energy adoption', 'Waste reduction programs', 'Eco-friendly packaging']
    }
  };
  
  res.json(trends);
});

// Data scraping endpoints
let scrapedEnvironmentalData = [];
let scrapedSalesData = [];

// Environmental data scraping
app.post('/api/scrape-environmental-data', async (req, res) => {
  try {
    console.log('Starting environmental data scraping...');
    
    // Simulate scraping from multiple sources
    const sources = [
      'https://api.example.com/water-quality',
      'https://data.gov/environmental/ocean-temp',
      'https://marine-api.org/salinity-data'
    ];
    
    const scrapedData = [];
    
    for (let i = 0; i < sources.length; i++) {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Generate realistic scraped data
        const data = {
          source: sources[i],
          timestamp: new Date().toISOString(),
          data: {
            waterTemperature: +(15 + Math.random() * 10).toFixed(1),
            salinity: +(30 + Math.random() * 5).toFixed(1),
            ph: +(7.0 + Math.random() * 1.0).toFixed(2),
            dissolvedOxygen: +(6.5 + Math.random() * 3.0).toFixed(1),
            turbidity: +(1.0 + Math.random() * 4.0).toFixed(1),
            nitrate: +(0.1 + Math.random() * 0.5).toFixed(3),
            phosphate: +(0.01 + Math.random() * 0.1).toFixed(3)
          },
          status: 'success'
        };
        
        scrapedData.push(data);
        console.log(`Scraped data from ${sources[i]}`);
        
      } catch (error) {
        console.log(`Failed to scrape from ${sources[i]}: ${error.message}`);
        scrapedData.push({
          source: sources[i],
          timestamp: new Date().toISOString(),
          error: error.message,
          status: 'failed'
        });
      }
    }
    
    scrapedEnvironmentalData = scrapedData;
    
    res.json({
      status: 'success',
      message: 'Environmental data scraping completed',
      newData: scrapedData.map(item => ({
        id: Math.random().toString(36).substr(2, 9),
        source: item.source,
        timestamp: item.timestamp,
        data: item.data || {},
        status: item.status
      })),
      waterQuality: {
        current: {
          ph: +(7.2 + Math.random() * 0.6).toFixed(1),
          temperature: +(20 + Math.random() * 5).toFixed(1),
          salinity: +(30 + Math.random() * 3).toFixed(1),
          dissolvedOxygen: +(7.0 + Math.random() * 2).toFixed(1),
          turbidity: +(2.5 + Math.random() * 2).toFixed(1),
          date: new Date().toISOString().split('T')[0],
          status: 'Good'
        }
      },
      harvestYields: {
        currentMonth: {
          yield: Math.round(12000 + Math.random() * 3000),
          efficiency: +(0.85 + Math.random() * 0.1).toFixed(2)
        }
      },
      sustainability: {
        wasteRecycling: {
          current: Math.round(85 + Math.random() * 10)
        }
      }
    });
    
  } catch (error) {
    console.error('Environmental scraping error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Environmental data scraping failed',
      error: error.message
    });
  }
});

// Sales data scraping
app.post('/api/scrape-market-data', async (req, res) => {
  try {
    console.log('Starting sales data scraping...');
    
    // Simulate scraping from multiple sources
    const sources = [
      'https://api.example.com/sales-data',
      'https://data.gov/retail-sales',
      'https://market-api.org/consumer-trends'
    ];
    
    const scrapedData = [];
    
    for (let i = 0; i < sources.length; i++) {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
        
        // Generate realistic scraped data
        const data = {
          source: sources[i],
          timestamp: new Date().toISOString(),
          data: {
            totalSales: Math.round(1000000 + Math.random() * 5000000),
            unitsSold: Math.round(10000 + Math.random() * 50000),
            averageOrderValue: Math.round(50 + Math.random() * 200),
            conversionRate: +(2.0 + Math.random() * 3.0).toFixed(2),
            customerSatisfaction: +(4.0 + Math.random() * 1.0).toFixed(1),
            returnRate: +(0.5 + Math.random() * 2.0).toFixed(2),
            topProducts: [
              { name: 'Product A', sales: Math.round(50000 + Math.random() * 100000) },
              { name: 'Product B', sales: Math.round(30000 + Math.random() * 80000) },
              { name: 'Product C', sales: Math.round(20000 + Math.random() * 60000) }
            ]
          },
          status: 'success'
        };
        
        scrapedData.push(data);
        console.log(`Scraped data from ${sources[i]}`);
        
      } catch (error) {
        console.log(`Failed to scrape from ${sources[i]}: ${error.message}`);
        scrapedData.push({
          source: sources[i],
          timestamp: new Date().toISOString(),
          error: error.message,
          status: 'failed'
        });
      }
    }
    
    scrapedSalesData = scrapedData;
    
    res.json({
      status: 'success',
      message: 'Sales data scraping completed',
      newData: scrapedData.map(item => ({
        id: Math.random().toString(36).substr(2, 9),
        source: item.source,
        timestamp: item.timestamp,
        data: item.data || {},
        status: item.status
      })),
      updatedForecast: {
        accuracy: +(0.85 + Math.random() * 0.1).toFixed(2),
        lastUpdated: new Date().toISOString(),
        forecast: Array.from({ length: 6 }, (_, i) => ({
          month: `2025-${String(i + 1).padStart(2, '0')}`,
          sales: Math.round(1500000 + Math.random() * 500000),
          confidence: +(0.8 - i * 0.05).toFixed(2)
        }))
      }
    });
    
  } catch (error) {
    console.error('Sales scraping error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Sales data scraping failed',
      error: error.message
    });
  }
});

// Get scraped data
app.get('/api/scraped/environmental', (req, res) => {
  res.json({
    data: scrapedEnvironmentalData,
    lastUpdated: scrapedEnvironmentalData.length > 0 ? scrapedEnvironmentalData[0].timestamp : null
  });
});

app.get('/api/scraped/sales', (req, res) => {
  res.json({
    data: scrapedSalesData,
    lastUpdated: scrapedSalesData.length > 0 ? scrapedSalesData[0].timestamp : null
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 