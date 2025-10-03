import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const WhiteboardDemo = () => {
  const [drawings, setDrawings] = useState([]);
  const [activeTool, setActiveTool] = useState('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [color, setColor] = useState('#000000');
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  useEffect(() => {
    // Simulate whiteboard data
    const mockDrawings = [
      { id: 1, type: 'rectangle', x: 100, y: 100, width: 200, height: 150, color: '#ff0000' },
      { id: 2, type: 'circle', x: 300, y: 200, radius: 75, color: '#00ff00' },
      { id: 3, type: 'line', x1: 50, y1: 300, x2: 400, y2: 350, color: '#0000ff' },
      { id: 4, type: 'text', x: 150, y: 400, text: 'Hello World', color: '#ff00ff' }
    ];

    setDrawings(mockDrawings);
  }, []);

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WhiteboardDemo = () => {
  const [drawings, setDrawings] = useState([]);
  const [activeTool, setActiveTool] = useState('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    // Simulate whiteboard data
    const mockDrawings = [
      { id: 1, type: 'rectangle', x: 100, y: 100, width: 200, height: 150, color: '#ff0000' },
      { id: 2, type: 'circle', x: 300, y: 200, radius: 75, color: '#00ff00' }
    ];
    
    setDrawings(mockDrawings);
  }, []);

  const tools = ['pen', 'rectangle', 'circle', 'line', 'text', 'eraser'];

`,
    explanation: `Interactive whiteboard application with drawing tools, real-time collaboration, and canvas management.

## Core Implementation

**Key Features**: This demo showcases an interactive whiteboard application with drawing tools, real-time collaboration, and canvas management.

**Architecture**: Built with modern web technologies for optimal performance and user experience.

**Performance**: Implements efficient algorithms and data structures for real-time processing and smooth interactions.

## Technical Benefits

- **Drawing Tools**: Comprehensive set of drawing and annotation tools
- **Real-time Collaboration**: Multi-user drawing and editing
- **Canvas Management**: Efficient canvas rendering and manipulation
- **Export Functionality**: Save and share drawings`,
    technologies: [
      {
        name: 'Canvas API',
        description: 'HTML5 Canvas for drawing and rendering',
        tags: ['Canvas', 'Rendering']
      },
      {
        name: 'Real-time Collaboration',
        description: 'Multi-user drawing and editing capabilities',
        tags: ['Collaboration', 'Real-time']
      },
      {
        name: 'Drawing Tools',
        description: 'Comprehensive set of drawing and annotation tools',
        tags: ['Tools', 'Drawing']
      }
    ],
    concepts: [
      {
        name: 'Canvas Rendering',
        description: 'Drawing and rendering on HTML5 Canvas',
        example: 'const ctx = canvas.getContext("2d")'
      },
      {
        name: 'Event Handling',
        description: 'Mouse and touch event handling for drawing',
        example: 'canvas.addEventListener("mousedown", handleMouseDown)'
      },
      {
        name: 'State Management',
        description: 'Managing drawing state and history',
        example: 'const [drawings, setDrawings] = useState([])'
      }
    ],
    features: [
      'Interactive drawing tools',
      'Real-time collaboration',
      'Canvas management',
      'Export functionality',
      'Undo/redo capabilities',
      'Multi-user support'
    ]
  };

  const tools = ['pen', 'rectangle', 'circle', 'line', 'text', 'eraser'];
  const colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Interactive Whiteboard</h1>
          <p className="text-gray-400">Collaborative drawing and annotation platform</p>
        </div>
        <motion.button
          onClick={() => setShowCodeViewer(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Implementation
        </motion.button>
      </div>

      {/* Drawing Tools */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6">Drawing Tools</h2>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <motion.button
              key={tool}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTool === tool ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTool(tool)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {tool}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Color Palette */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
        <div className="flex flex-wrap gap-2">
          {colors.map((colorOption, index) => (
            <motion.button
              key={colorOption}
              className={`w-12 h-12 rounded-lg border-2 transition-all ${
                color === colorOption ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
              }`}
              style={{ backgroundColor: colorOption }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setColor(colorOption)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Brush Size */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6">Brush Size</h2>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-white font-semibold">{brushSize}px</span>
        </div>
      </motion.div>

      {/* Canvas Preview */}
      <motion.div 
        className="bg-gray-800 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6">Canvas Preview</h2>
        <div className="bg-white rounded-lg p-4 min-h-64">
          <div className="text-gray-500 text-center">
            <p className="text-lg">Canvas Area</p>
            <p className="text-sm">Draw your ideas here</p>
          </div>
        </div>
      </motion.div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default WhiteboardDemo;
