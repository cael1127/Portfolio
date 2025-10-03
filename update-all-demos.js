const fs = require('fs');
const path = require('path');

// Enhanced demo configurations for all remaining demos
const allDemoConfigs = {
  'ResumeAnalyzerDemo': {
    category: 'AI/ML',
    description: 'AI-powered resume analysis with skill extraction, candidate scoring, and intelligent recommendations using natural language processing.',
    technologies: [
      { name: "Natural Language Processing", description: "Text analysis and understanding", tags: ["NLP", "Text Processing", "AI"] },
      { name: "Machine Learning", description: "Pattern recognition and scoring", tags: ["ML", "Classification", "Scoring"] },
      { name: "React", description: "Interactive user interface", tags: ["UI", "Components", "State"] }
    ],
    concepts: [
      { name: "Text Analysis", description: "Extracting information from text", example: "Identifying skills and experience from resume text" },
      { name: "Scoring Algorithm", description: "Quantifying candidate quality", example: "Weighted scoring based on multiple factors" }
    ],
    features: ["Skill extraction", "Candidate scoring", "Recommendations", "Resume parsing"]
  },
  'PortfolioBuilderDemo': {
    category: 'Web Development',
    description: 'Dynamic portfolio builder with drag-and-drop interface, real-time preview, and customizable templates.',
    technologies: [
      { name: "React DnD", description: "Drag and drop functionality", tags: ["DnD", "UI", "Interactions"] },
      { name: "CSS Grid", description: "Layout system", tags: ["Layout", "Responsive", "Grid"] },
      { name: "Local Storage", description: "Client-side data persistence", tags: ["Storage", "Persistence", "Data"] }
    ],
    concepts: [
      { name: "Drag and Drop", description: "Interactive element manipulation", example: "Moving components around the layout" },
      { name: "Template System", description: "Reusable design patterns", example: "Pre-built portfolio layouts" }
    ],
    features: ["Drag and drop", "Real-time preview", "Templates", "Export functionality"]
  },
  'LogisticsDemo': {
    category: 'Business',
    description: 'Supply chain management system with route optimization, inventory tracking, and delivery monitoring.',
    technologies: [
      { name: "Algorithm Optimization", description: "Route and logistics optimization", tags: ["Algorithms", "Optimization", "Routing"] },
      { name: "Data Visualization", description: "Supply chain visualization", tags: ["Charts", "Maps", "Visualization"] },
      { name: "Real-time Updates", description: "Live tracking and monitoring", tags: ["Real-time", "Tracking", "Updates"] }
    ],
    concepts: [
      { name: "Route Optimization", description: "Finding optimal delivery paths", example: "Minimizing travel time and distance" },
      { name: "Inventory Management", description: "Tracking stock levels", example: "Real-time inventory updates" }
    ],
    features: ["Route optimization", "Inventory tracking", "Delivery monitoring", "Real-time updates"]
  },
  'DeepfakeDetectionDemo': {
    category: 'AI/ML',
    description: 'Advanced deepfake detection using computer vision and machine learning to identify manipulated media.',
    technologies: [
      { name: "Computer Vision", description: "Image and video analysis", tags: ["CV", "Image Processing", "Detection"] },
      { name: "Deep Learning", description: "Neural network models", tags: ["AI", "Neural Networks", "Classification"] },
      { name: "TensorFlow", description: "Machine learning framework", tags: ["ML", "Framework", "Models"] }
    ],
    concepts: [
      { name: "Deepfake Detection", description: "Identifying manipulated media", example: "Analyzing facial features for authenticity" },
      { name: "Computer Vision", description: "Processing visual data", example: "Extracting features from images/videos" }
    ],
    features: ["Deepfake detection", "Video analysis", "Confidence scoring", "Real-time processing"]
  },
  'AquacultureDemo': {
    category: 'IoT/Agriculture',
    description: 'Smart aquaculture monitoring system with water quality sensors, fish health tracking, and automated feeding.',
    technologies: [
      { name: "IoT Sensors", description: "Environmental monitoring", tags: ["IoT", "Sensors", "Monitoring"] },
      { name: "Data Analytics", description: "Pattern recognition and insights", tags: ["Analytics", "Data", "Insights"] },
      { name: "Real-time Dashboard", description: "Live monitoring interface", tags: ["Dashboard", "Real-time", "UI"] }
    ],
    concepts: [
      { name: "IoT Integration", description: "Connecting physical sensors", example: "Water temperature and pH monitoring" },
      { name: "Predictive Analytics", description: "Forecasting based on data", example: "Predicting fish health issues" }
    ],
    features: ["Water quality monitoring", "Fish health tracking", "Automated alerts", "Data visualization"]
  },
  'SnakeAIDemo': {
    category: 'AI/ML',
    description: 'AI-powered Snake game with machine learning algorithms for optimal gameplay and pathfinding strategies.',
    technologies: [
      { name: "Game AI", description: "Artificial intelligence for games", tags: ["AI", "Games", "Algorithms"] },
      { name: "Pathfinding", description: "Finding optimal routes", tags: ["Algorithms", "Pathfinding", "Optimization"] },
      { name: "Canvas API", description: "Game rendering", tags: ["Canvas", "Graphics", "Rendering"] }
    ],
    concepts: [
      { name: "Game AI", description: "AI for game decision making", example: "Choosing optimal moves in Snake" },
      { name: "Pathfinding Algorithms", description: "Finding best routes", example: "A* algorithm for optimal paths" }
    ],
    features: ["AI gameplay", "Pathfinding", "Score optimization", "Learning algorithms"]
  },
  'SmartCityDemo': {
    category: 'Smart Cities',
    description: 'Smart city infrastructure management with traffic optimization, energy monitoring, and citizen services.',
    technologies: [
      { name: "IoT Networks", description: "Connected city infrastructure", tags: ["IoT", "Networks", "Infrastructure"] },
      { name: "Data Analytics", description: "City data analysis", tags: ["Analytics", "Big Data", "Insights"] },
      { name: "Real-time Processing", description: "Live data processing", tags: ["Real-time", "Streaming", "Processing"] }
    ],
    concepts: [
      { name: "Smart Infrastructure", description: "Connected city systems", example: "Traffic lights and sensors" },
      { name: "Data Integration", description: "Combining multiple data sources", example: "Traffic, weather, and energy data" }
    ],
    features: ["Traffic optimization", "Energy monitoring", "Citizen services", "Real-time data"]
  },
  'RestaurantAppDemo': {
    category: 'Food Service',
    description: 'Complete restaurant management system with online ordering, table management, and kitchen operations.',
    technologies: [
      { name: "Real-time Updates", description: "Live order and table status", tags: ["Real-time", "Updates", "Sync"] },
      { name: "Order Management", description: "Processing and tracking orders", tags: ["Orders", "Management", "Tracking"] },
      { name: "Payment Integration", description: "Secure payment processing", tags: ["Payments", "Security", "Integration"] }
    ],
    concepts: [
      { name: "Order Management", description: "Processing customer orders", example: "From order placement to delivery" },
      { name: "Table Management", description: "Restaurant seating optimization", example: "Assigning and tracking tables" }
    ],
    features: ["Online ordering", "Table management", "Kitchen operations", "Payment processing"]
  },
  'HealthcareDemo': {
    category: 'Healthcare',
    description: 'Healthcare management system with patient records, appointment scheduling, and medical data visualization.',
    technologies: [
      { name: "Data Security", description: "HIPAA-compliant data handling", tags: ["Security", "Privacy", "Compliance"] },
      { name: "Medical Data", description: "Healthcare information systems", tags: ["Healthcare", "Data", "Records"] },
      { name: "Scheduling", description: "Appointment management", tags: ["Scheduling", "Calendar", "Management"] }
    ],
    concepts: [
      { name: "Patient Records", description: "Managing medical information", example: "Secure patient data storage" },
      { name: "Appointment Scheduling", description: "Managing medical appointments", example: "Calendar-based scheduling system" }
    ],
    features: ["Patient records", "Appointment scheduling", "Medical data", "Secure access"]
  },
  'GamePlatformDemo': {
    category: 'Gaming',
    description: 'Multiplayer gaming platform with real-time gameplay, leaderboards, and social features.',
    technologies: [
      { name: "WebSocket", description: "Real-time communication", tags: ["Real-time", "WebSocket", "Multiplayer"] },
      { name: "Game Engine", description: "Game logic and rendering", tags: ["Games", "Engine", "Rendering"] },
      { name: "Social Features", description: "User interaction and community", tags: ["Social", "Community", "Features"] }
    ],
    concepts: [
      { name: "Multiplayer Gaming", description: "Real-time multiplayer games", example: "Synchronized gameplay across players" },
      { name: "Leaderboards", description: "Player ranking systems", example: "Tracking and displaying player scores" }
    ],
    features: ["Multiplayer gameplay", "Real-time sync", "Leaderboards", "Social features"]
  },
  'FraudDetectionDemo': {
    category: 'AI/ML',
    description: 'AI-powered fraud detection system with real-time transaction monitoring and risk assessment.',
    technologies: [
      { name: "Machine Learning", description: "Pattern recognition for fraud", tags: ["ML", "AI", "Detection"] },
      { name: "Real-time Processing", description: "Live transaction analysis", tags: ["Real-time", "Streaming", "Analysis"] },
      { name: "Risk Assessment", description: "Scoring and evaluation", tags: ["Risk", "Scoring", "Assessment"] }
    ],
    concepts: [
      { name: "Fraud Detection", description: "Identifying suspicious activities", example: "Analyzing transaction patterns" },
      { name: "Risk Scoring", description: "Quantifying fraud probability", example: "Numerical risk assessment" }
    ],
    features: ["Real-time detection", "Risk scoring", "Transaction monitoring", "Alert system"]
  },
  'FinancialDemo': {
    category: 'Finance',
    description: 'Financial dashboard with portfolio management, market analysis, and investment tracking.',
    technologies: [
      { name: "Financial APIs", description: "Market data integration", tags: ["APIs", "Financial", "Data"] },
      { name: "Data Visualization", description: "Financial charts and graphs", tags: ["Charts", "Visualization", "Finance"] },
      { name: "Portfolio Management", description: "Investment tracking", tags: ["Portfolio", "Investments", "Tracking"] }
    ],
    concepts: [
      { name: "Portfolio Management", description: "Tracking investments", example: "Monitoring stock performance" },
      { name: "Market Analysis", description: "Analyzing market trends", example: "Technical and fundamental analysis" }
    ],
    features: ["Portfolio tracking", "Market analysis", "Investment tools", "Real-time data"]
  },
  'AIAssistantDemo': {
    category: 'AI/ML',
    description: 'Intelligent AI assistant with natural language processing, task automation, and conversational interface.',
    technologies: [
      { name: "Natural Language Processing", description: "Understanding human language", tags: ["NLP", "AI", "Language"] },
      { name: "Conversational AI", description: "Dialog systems", tags: ["Chatbot", "Conversation", "AI"] },
      { name: "Task Automation", description: "Automating user tasks", tags: ["Automation", "Tasks", "Productivity"] }
    ],
    concepts: [
      { name: "Conversational AI", description: "Natural language interaction", example: "Understanding and responding to queries" },
      { name: "Task Automation", description: "Automating repetitive tasks", example: "Scheduling and reminders" }
    ],
    features: ["Natural language processing", "Task automation", "Conversational interface", "Smart responses"]
  },
  'AIAgentsDemo': {
    category: 'AI/ML',
    description: 'Multi-agent AI system with autonomous agents, coordination protocols, and distributed decision making.',
    technologies: [
      { name: "Multi-Agent Systems", description: "Distributed AI agents", tags: ["AI", "Agents", "Distributed"] },
      { name: "Coordination", description: "Agent communication", tags: ["Coordination", "Communication", "Protocols"] },
      { name: "Autonomous Systems", description: "Self-directed agents", tags: ["Autonomous", "AI", "Decision Making"] }
    ],
    concepts: [
      { name: "Multi-Agent Systems", description: "Multiple AI agents working together", example: "Coordinated decision making" },
      { name: "Agent Communication", description: "Inter-agent messaging", example: "Protocols for agent interaction" }
    ],
    features: ["Multi-agent coordination", "Autonomous decision making", "Distributed systems", "Agent communication"]
  },
  'SocialNetworkDemo': {
    category: 'Social',
    description: 'Social networking platform with user profiles, content sharing, and real-time interactions.',
    technologies: [
      { name: "Social Features", description: "User interaction and sharing", tags: ["Social", "Sharing", "Interaction"] },
      { name: "Real-time Updates", description: "Live social interactions", tags: ["Real-time", "Social", "Updates"] },
      { name: "Content Management", description: "User-generated content", tags: ["Content", "Management", "User Generated"] }
    ],
    concepts: [
      { name: "Social Networking", description: "User connections and interactions", example: "Friend networks and social graphs" },
      { name: "Content Sharing", description: "User-generated content", example: "Posts, images, and media sharing" }
    ],
    features: ["User profiles", "Content sharing", "Real-time interactions", "Social features"]
  },
  'MERNExpenseTrackerDemo': {
    category: 'Full-Stack',
    description: 'Full-stack expense tracking application with MongoDB, Express, React, and Node.js.',
    technologies: [
      { name: "MERN Stack", description: "MongoDB, Express, React, Node.js", tags: ["Full-Stack", "MERN", "JavaScript"] },
      { name: "MongoDB", description: "NoSQL database", tags: ["Database", "NoSQL", "Document"] },
      { name: "Express.js", description: "Backend framework", tags: ["Backend", "API", "Server"] }
    ],
    concepts: [
      { name: "Full-Stack Development", description: "Complete application stack", example: "Frontend, backend, and database" },
      { name: "RESTful APIs", description: "API design and implementation", example: "CRUD operations for expenses" }
    ],
    features: ["Expense tracking", "User authentication", "Data visualization", "CRUD operations"]
  },
  'BookstoreAPIDemo': {
    category: 'Backend',
    description: 'RESTful API for bookstore management with CRUD operations, data validation, and error handling.',
    technologies: [
      { name: "REST API", description: "RESTful web services", tags: ["API", "REST", "Web Services"] },
      { name: "Data Validation", description: "Input validation and sanitization", tags: ["Validation", "Security", "Data"] },
      { name: "Error Handling", description: "Robust error management", tags: ["Errors", "Handling", "Robustness"] }
    ],
    concepts: [
      { name: "RESTful Design", description: "REST API principles", example: "HTTP methods and status codes" },
      { name: "Data Validation", description: "Ensuring data integrity", example: "Input validation and sanitization" }
    ],
    features: ["CRUD operations", "Data validation", "Error handling", "API documentation"]
  },
  'RAGChatbotDemo': {
    category: 'AI/ML',
    description: 'Retrieval-Augmented Generation chatbot with context awareness and intelligent responses.',
    technologies: [
      { name: "RAG Architecture", description: "Retrieval-Augmented Generation", tags: ["AI", "RAG", "NLP"] },
      { name: "Vector Databases", description: "Semantic search and retrieval", tags: ["Vector", "Search", "Semantic"] },
      { name: "Language Models", description: "Large language models", tags: ["LLM", "AI", "Generation"] }
    ],
    concepts: [
      { name: "RAG Architecture", description: "Combining retrieval and generation", example: "Searching knowledge base before generating responses" },
      { name: "Context Awareness", description: "Maintaining conversation context", example: "Remembering previous interactions" }
    ],
    features: ["Context awareness", "Knowledge retrieval", "Intelligent responses", "Source attribution"]
  },
  'InteractiveResumeDemo': {
    category: 'Web Development',
    description: 'Interactive resume with dynamic content, animations, and engaging user experience.',
    technologies: [
      { name: "Interactive Design", description: "Engaging user interactions", tags: ["UI", "Interactions", "Animation"] },
      { name: "Animation", description: "Smooth transitions and effects", tags: ["Animation", "CSS", "Transitions"] },
      { name: "Responsive Design", description: "Mobile-friendly layout", tags: ["Responsive", "Mobile", "Layout"] }
    ],
    concepts: [
      { name: "Interactive Design", description: "Engaging user experience", example: "Hover effects and animations" },
      { name: "Progressive Enhancement", description: "Enhancing basic functionality", example: "Adding animations to static content" }
    ],
    features: ["Interactive elements", "Smooth animations", "Responsive design", "Engaging UX"]
  },
  'SentimentAnalysisDemo': {
    category: 'AI/ML',
    description: 'Text sentiment analysis with emotion detection, polarity scoring, and real-time processing.',
    technologies: [
      { name: "Sentiment Analysis", description: "Text emotion analysis", tags: ["NLP", "Sentiment", "Emotion"] },
      { name: "Natural Language Processing", description: "Text understanding", tags: ["NLP", "Text", "Processing"] },
      { name: "Machine Learning", description: "Pattern recognition", tags: ["ML", "AI", "Classification"] }
    ],
    concepts: [
      { name: "Sentiment Analysis", description: "Determining emotional tone", example: "Positive, negative, or neutral sentiment" },
      { name: "Text Classification", description: "Categorizing text content", example: "Classifying emotions in text" }
    ],
    features: ["Sentiment analysis", "Emotion detection", "Real-time processing", "Text classification"]
  }
};

// Function to update a demo file
function updateDemoFile(filePath, demoName, config) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already updated (has codeData)
    if (content.includes('codeData = {')) {
      console.log(`✓ ${demoName} already updated`);
      return;
    }

    // Create the enhanced template
    const template = `  // Enhanced code data for the new CodeViewer
  const codeData = {
    code: \`// ${demoName.replace('Demo', '')} Implementation
// Add your implementation code here
\`,
    explanation: \`${config.description}

## Core Implementation

**Key Features**: This demo showcases ${config.features.slice(0, 2).join(' and ')} using modern web technologies.

**Architecture**: Built with ${config.technologies[0].name} and ${config.technologies[1]?.name || 'React'} for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Modern Technologies**: Uses cutting-edge web technologies and best practices
- **Performance Optimized**: Efficient algorithms and data structures
- **User Experience**: Intuitive interface with smooth interactions
- **Scalable Design**: Built to handle growing data and user demands\`,

    technologies: ${JSON.stringify(config.technologies, null, 6)},

    concepts: ${JSON.stringify(config.concepts, null, 6)},

    features: ${JSON.stringify(config.features, null, 6)}
  };
`;

    // Find the return statement and add template before it
    const returnIndex = content.lastIndexOf('  return (');
    if (returnIndex === -1) {
      console.log(`✗ Could not find return statement in ${demoName}`);
      return;
    }

    // Insert template before return statement
    const beforeReturn = content.substring(0, returnIndex);
    const afterReturn = content.substring(returnIndex);
    
    content = beforeReturn + template + '\n' + afterReturn;

    // Update the CodeViewer call
    content = content.replace(
      /<CodeViewer[^>]*\/>/g,
      `<CodeViewer 
          isOpen={openCode} 
          onClose={()=>setOpenCode(false)} 
          title="${demoName.replace('Demo', '')} Implementation"
          language="javascript"
          code={codeData.code}
          explanation={codeData.explanation}
          technologies={codeData.technologies}
          concepts={codeData.concepts}
          features={codeData.features}
        />`
    );

    // Add header section if not present
    if (!content.includes('Header Section')) {
      const headerSection = `    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-4">${getEmoji(config.category)} ${demoName.replace('Demo', '')} Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          ${config.description}
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setOpenCode(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>💻</span>
            View Implementation
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr,320px] gap-6">`;

      // Replace the main container
      content = content.replace(
        /<div className="grid[^>]*>/,
        headerSection
      );

      // Close the container properly
      content = content.replace(
        /<\/div>\s*<\/div>\s*{openCode/,
        `      </div>

      {openCode`
      );
    }

    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated ${demoName}`);
  } catch (error) {
    console.log(`✗ Error updating ${demoName}:`, error.message);
  }
}

function getEmoji(category) {
  const emojis = {
    'AI/ML': '🤖',
    'Web Development': '🌐',
    'Business': '💼',
    'IoT/Agriculture': '🌱',
    'Smart Cities': '🏙️',
    'Food Service': '🍽️',
    'Healthcare': '🏥',
    'Gaming': '🎮',
    'Finance': '💰',
    'Social': '👥',
    'Full-Stack': '⚡',
    'Backend': '🔧',
    'Analytics': '📊',
    'E-commerce': '🛍️',
    'Collaboration': '🤝',
    'Real-time': '⚡'
  };
  return emojis[category] || '🚀';
}

// Main execution
const demosDir = path.join(__dirname, 'src', 'components', 'demos');

console.log('Updating all demo components...\n');

Object.entries(allDemoConfigs).forEach(([demoName, config]) => {
  const filePath = path.join(demosDir, `${demoName}.jsx`);
  if (fs.existsSync(filePath)) {
    updateDemoFile(filePath, demoName, config);
  } else {
    console.log(`✗ File not found: ${demoName}.jsx`);
  }
});

console.log('\nAll demo updates complete!');
