const fs = require('fs');
const path = require('path');

// Template for enhanced demo structure
const createEnhancedDemoTemplate = (demoName, category, description, technologies, concepts, features) => {
  return `  // Enhanced code data for the new CodeViewer
  const codeData = {
    code: \`// ${demoName} Implementation
// Add your implementation code here
\`,
    explanation: \`${description}

## Core Implementation

**Key Features**: This demo showcases [main features] using [primary technologies].

**Architecture**: [Architecture description]

**Performance**: [Performance considerations]

## Technical Benefits

- **Benefit 1**: [Description]
- **Benefit 2**: [Description]
- **Benefit 3**: [Description]\`,

    technologies: ${JSON.stringify(technologies, null, 6)},

    concepts: ${JSON.stringify(concepts, null, 6)},

    features: ${JSON.stringify(features, null, 6)}
  };
`;
};

// Demo configurations
const demoConfigs = {
  'SaaSAnalyticsDemo': {
    category: 'Analytics',
    description: 'Advanced SaaS analytics dashboard with cohort analysis, retention metrics, and real-time data visualization using deterministic algorithms.',
    technologies: [
      { name: "React", description: "Frontend framework for interactive dashboards", tags: ["Hooks", "Components", "State Management"] },
      { name: "D3.js", description: "Data visualization library for charts and graphs", tags: ["SVG", "Data Binding", "Animations"] },
      { name: "JavaScript", description: "Core implementation language", tags: ["ES6+", "Async/Await", "Data Processing"] }
    ],
    concepts: [
      { name: "Cohort Analysis", description: "Analyzing user behavior over time", example: "Tracking user retention by signup cohort" },
      { name: "Data Visualization", description: "Presenting data in visual formats", example: "Charts, graphs, and interactive elements" }
    ],
    features: ["Real-time analytics", "Cohort analysis", "Retention metrics", "Interactive charts"]
  },
  'ProductConfiguratorDemo': {
    category: 'E-commerce',
    description: '3D product configurator with real-time customization, variant switching, and interactive product visualization.',
    technologies: [
      { name: "Three.js", description: "3D graphics library for WebGL", tags: ["3D", "WebGL", "Rendering"] },
      { name: "React", description: "UI framework for interactive components", tags: ["Hooks", "State", "Components"] }
    ],
    concepts: [
      { name: "3D Rendering", description: "Creating 3D visualizations in browser", example: "WebGL-based 3D product models" },
      { name: "Product Variants", description: "Managing different product options", example: "Color, size, and feature variations" }
    ],
    features: ["3D product visualization", "Real-time customization", "Variant switching", "Interactive controls"]
  },
  'AudioTranscriptionDemo': {
    category: 'AI/ML',
    description: 'Audio transcription service with real-time speech-to-text conversion, speaker diarization, and export functionality.',
    technologies: [
      { name: "Web Audio API", description: "Browser API for audio processing", tags: ["Audio", "Real-time", "Processing"] },
      { name: "Speech Recognition", description: "Converting speech to text", tags: ["AI", "NLP", "Transcription"] }
    ],
    concepts: [
      { name: "Speech Recognition", description: "Converting audio to text", example: "Real-time transcription of speech" },
      { name: "Speaker Diarization", description: "Identifying different speakers", example: "Separating multiple speakers in audio" }
    ],
    features: ["Real-time transcription", "Speaker identification", "Export functionality", "Audio visualization"]
  },
  'ObjectDetectionDemo': {
    category: 'AI/ML',
    description: 'Real-time object detection using computer vision with bounding boxes, confidence scores, and live webcam feed.',
    technologies: [
      { name: "TensorFlow.js", description: "Machine learning library for JavaScript", tags: ["ML", "Computer Vision", "Real-time"] },
      { name: "OpenCV.js", description: "Computer vision library", tags: ["Image Processing", "Detection", "Analysis"] }
    ],
    concepts: [
      { name: "Computer Vision", description: "Processing and understanding images", example: "Detecting objects in video streams" },
      { name: "Bounding Boxes", description: "Identifying object locations", example: "Drawing rectangles around detected objects" }
    ],
    features: ["Real-time detection", "Live webcam feed", "Bounding boxes", "Confidence scoring"]
  },
  'WhiteboardDemo': {
    category: 'Collaboration',
    description: 'Interactive whiteboard with real-time drawing, collaboration features, and persistent storage.',
    technologies: [
      { name: "Canvas API", description: "HTML5 canvas for drawing", tags: ["Graphics", "Drawing", "Real-time"] },
      { name: "WebSocket", description: "Real-time communication", tags: ["Real-time", "Collaboration", "Sync"] }
    ],
    concepts: [
      { name: "Canvas Drawing", description: "Drawing on HTML5 canvas", example: "Mouse/touch drawing events" },
      { name: "Real-time Sync", description: "Synchronizing changes across users", example: "Broadcasting drawing events" }
    ],
    features: ["Real-time drawing", "Collaboration", "Persistent storage", "Multi-user support"]
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

    // Add the enhanced template
    const template = createEnhancedDemoTemplate(
      demoName.replace('Demo', ''),
      config.category,
      config.description,
      config.technologies,
      config.concepts,
      config.features
    );

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

    // Add header section
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

    fs.writeFileSync(filePath, content);
    console.log(`✓ Updated ${demoName}`);
  } catch (error) {
    console.log(`✗ Error updating ${demoName}:`, error.message);
  }
}

function getEmoji(category) {
  const emojis = {
    'Analytics': '📊',
    'E-commerce': '🛍️',
    'AI/ML': '🤖',
    'Collaboration': '👥',
    'Blockchain': '⛓️',
    'Real-time': '⚡'
  };
  return emojis[category] || '🚀';
}

// Main execution
const demosDir = path.join(__dirname, 'src', 'components', 'demos');

console.log('Updating demo components...\n');

Object.entries(demoConfigs).forEach(([demoName, config]) => {
  const filePath = path.join(demosDir, `${demoName}.jsx`);
  if (fs.existsSync(filePath)) {
    updateDemoFile(filePath, demoName, config);
  } else {
    console.log(`✗ File not found: ${demoName}.jsx`);
  }
});

console.log('\nDemo update complete!');
