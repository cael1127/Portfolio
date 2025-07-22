import React, { useState } from 'react';

const WhiteboardProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    canvasManager: `// Collaborative Canvas Manager
class CanvasManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.tools = new Map();
    this.brush = {
      color: '#000000',
      size: 2,
      type: 'pen'
    };
    this.history = [];
    this.collaborators = new Map();
    this.sync = new SyncManager();
  }

  initializeCanvas(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    
    // Set canvas properties
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    
    // Initialize tools
    this.initializeTools();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  initializeTools() {
    this.tools.set('pen', {
      name: 'Pen',
      icon: '✏️',
      draw: (ctx, points) => this.drawPath(ctx, points)
    });

    this.tools.set('brush', {
      name: 'Brush',
      icon: '🖌️',
      draw: (ctx, points) => this.drawBrush(ctx, points)
    });

    this.tools.set('eraser', {
      name: 'Eraser',
      icon: '🧽',
      draw: (ctx, points) => this.erasePath(ctx, points)
    });

    this.tools.set('rectangle', {
      name: 'Rectangle',
      icon: '⬜',
      draw: (ctx, start, end) => this.drawRectangle(ctx, start, end)
    });

    this.tools.set('circle', {
      name: 'Circle',
      icon: '⭕',
      draw: (ctx, start, end) => this.drawCircle(ctx, start, end)
    });
  }

  setupEventListeners() {
    let isDrawing = false;
    let currentPath = [];

    this.canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      currentPath = [];
      const point = this.getMousePos(e);
      currentPath.push(point);
      
      this.ctx.beginPath();
      this.ctx.moveTo(point.x, point.y);
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      
      const point = this.getMousePos(e);
      currentPath.push(point);
      
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    });

    this.canvas.addEventListener('mouseup', () => {
      if (!isDrawing) return;
      isDrawing = false;
      
      // Save to history
      this.saveToHistory({
        type: 'path',
        tool: this.brush.type,
        points: currentPath,
        color: this.brush.color,
        size: this.brush.size
      });

      // Sync with collaborators
      this.sync.broadcastDrawing({
        type: 'path',
        tool: this.brush.type,
        points: currentPath,
        color: this.brush.color,
        size: this.brush.size
      });
    });
  }

  drawPath(ctx, points) {
    if (points.length < 2) return;
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.stroke();
  }

  drawBrush(ctx, points) {
    if (points.length < 2) return;
    
    ctx.globalCompositeOperation = 'source-over';
    
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 1) {
        const steps = Math.ceil(distance / 2);
        for (let j = 0; j < steps; j++) {
          const t = j / steps;
          const x = points[i - 1].x + dx * t;
          const y = points[i - 1].y + dy * t;
          
          ctx.beginPath();
          ctx.arc(x, y, this.brush.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  erasePath(ctx, points) {
    ctx.globalCompositeOperation = 'destination-out';
    this.drawPath(ctx, points);
    ctx.globalCompositeOperation = 'source-over';
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  saveToHistory(action) {
    this.history.push(action);
    
    // Limit history size
    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  undo() {
    if (this.history.length === 0) return;
    
    this.history.pop();
    this.redrawCanvas();
  }

  redrawCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.history.forEach(action => {
      this.replayAction(action);
    });
  }

  replayAction(action) {
    const tool = this.tools.get(action.tool);
    if (!tool) return;

    this.ctx.strokeStyle = action.color;
    this.ctx.lineWidth = action.size;
    this.ctx.fillStyle = action.color;

    if (action.type === 'path') {
      tool.draw(this.ctx, action.points);
    }
  }
}`,
    
    syncManager: `// Real-time Collaboration Sync Manager
class SyncManager {
  constructor() {
    this.socket = null;
    this.roomId = null;
    this.userId = null;
    this.collaborators = new Map();
    this.pendingActions = [];
  }

  connect(roomId, userId) {
    this.roomId = roomId;
    this.userId = userId;
    
    this.socket = new WebSocket(\`ws://localhost:3001/whiteboard/\${roomId}\`);
    
    this.socket.onopen = () => {
      this.sendMessage({
        type: 'join',
        userId: userId,
        roomId: roomId
      });
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };

    this.socket.onclose = () => {
      console.log('Connection closed');
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.pendingActions.push(message);
    }
  }

  handleMessage(message) {
    switch (message.type) {
      case 'user_joined':
        this.addCollaborator(message.userId, message.userData);
        break;
      case 'user_left':
        this.removeCollaborator(message.userId);
        break;
      case 'drawing_action':
        this.handleDrawingAction(message);
        break;
      case 'cursor_update':
        this.updateCursor(message);
        break;
      case 'sync_request':
        this.sendCanvasState();
        break;
      case 'canvas_state':
        this.loadCanvasState(message.state);
        break;
    }
  }

  addCollaborator(userId, userData) {
    this.collaborators.set(userId, {
      id: userId,
      name: userData.name,
      color: userData.color,
      cursor: { x: 0, y: 0 },
      isActive: true
    });

    this.emit('collaborator_joined', { userId, userData });
  }

  removeCollaborator(userId) {
    this.collaborators.delete(userId);
    this.emit('collaborator_left', { userId });
  }

  broadcastDrawing(action) {
    this.sendMessage({
      type: 'drawing_action',
      userId: this.userId,
      roomId: this.roomId,
      action: action,
      timestamp: Date.now()
    });
  }

  handleDrawingAction(message) {
    if (message.userId === this.userId) return;

    // Apply the drawing action
    this.applyDrawingAction(message.action);
    
    // Update collaborator cursor
    if (message.action.points && message.action.points.length > 0) {
      const lastPoint = message.action.points[message.action.points.length - 1];
      this.updateCollaboratorCursor(message.userId, lastPoint);
    }
  }

  applyDrawingAction(action) {
    const tool = this.tools.get(action.tool);
    if (!tool) return;

    this.ctx.strokeStyle = action.color;
    this.ctx.lineWidth = action.size;
    this.ctx.fillStyle = action.color;

    if (action.type === 'path') {
      tool.draw(this.ctx, action.points);
    }
  }

  updateCursor(userId, position) {
    const collaborator = this.collaborators.get(userId);
    if (collaborator) {
      collaborator.cursor = position;
      this.emit('cursor_updated', { userId, position });
    }
  }

  sendCanvasState() {
    this.sendMessage({
      type: 'canvas_state',
      userId: this.userId,
      roomId: this.roomId,
      state: this.history
    });
  }

  loadCanvasState(state) {
    this.history = state;
    this.redrawCanvas();
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}`,
    
    toolManager: `// Drawing Tools Manager
class ToolManager {
  constructor() {
    this.tools = new Map();
    this.activeTool = 'pen';
    this.colors = [
      '#000000', '#FF0000', '#00FF00', '#0000FF',
      '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
    ];
    this.brushSizes = [1, 2, 4, 8, 16, 32];
  }

  registerTool(toolId, toolConfig) {
    this.tools.set(toolId, {
      id: toolId,
      name: toolConfig.name,
      icon: toolConfig.icon,
      draw: toolConfig.draw,
      options: toolConfig.options || {}
    });
  }

  setActiveTool(toolId) {
    if (this.tools.has(toolId)) {
      this.activeTool = toolId;
      this.emit('tool_changed', { toolId });
    }
  }

  getActiveTool() {
    return this.tools.get(this.activeTool);
  }

  setBrushColor(color) {
    this.brushColor = color;
    this.emit('color_changed', { color });
  }

  setBrushSize(size) {
    this.brushSize = size;
    this.emit('size_changed', { size });
  }

  // Advanced drawing tools
  drawShape(ctx, shapeType, startPoint, endPoint) {
    switch (shapeType) {
      case 'rectangle':
        return this.drawRectangle(ctx, startPoint, endPoint);
      case 'circle':
        return this.drawCircle(ctx, startPoint, endPoint);
      case 'line':
        return this.drawLine(ctx, startPoint, endPoint);
      case 'triangle':
        return this.drawTriangle(ctx, startPoint, endPoint);
      default:
        return null;
    }
  }

  drawRectangle(ctx, start, end) {
    const width = end.x - start.x;
    const height = end.y - start.y;
    
    ctx.beginPath();
    ctx.rect(start.x, start.y, width, height);
    ctx.stroke();
  }

  drawCircle(ctx, start, end) {
    const radius = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    
    ctx.beginPath();
    ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawLine(ctx, start, end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  drawTriangle(ctx, start, end) {
    const width = end.x - start.x;
    const height = end.y - start.y;
    
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(start.x + width, start.y + height);
    ctx.lineTo(start.x - width, start.y + height);
    ctx.closePath();
    ctx.stroke();
  }

  // Text tool
  addText(ctx, text, position, options = {}) {
    const fontSize = options.fontSize || 16;
    const fontFamily = options.fontFamily || 'Arial';
    
    ctx.font = \`\${fontSize}px \${fontFamily}\`;
    ctx.fillStyle = options.color || this.brushColor;
    ctx.fillText(text, position.x, position.y);
  }

  // Selection tool
  selectArea(ctx, start, end) {
    const width = end.x - start.x;
    const height = end.y - start.y;
    
    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(start.x, start.y, width, height);
    ctx.setLineDash([]);
  }
}`,
    
    dashboardComponent: `// React Whiteboard Dashboard
import React, { useState, useEffect, useRef } from 'react';

const WhiteboardDashboard = () => {
  const canvasRef = useRef(null);
  const [canvasManager, setCanvasManager] = useState(null);
  const [activeTool, setActiveTool] = useState('pen');
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [collaborators, setCollaborators] = useState([]);
  const [roomId, setRoomId] = useState('room-1');

  useEffect(() => {
    if (canvasRef.current) {
      const manager = new CanvasManager();
      manager.initializeCanvas(canvasRef.current);
      setCanvasManager(manager);

      // Connect to collaboration room
      const syncManager = new SyncManager();
      syncManager.connect(roomId, 'user-' + Math.random().toString(36).substr(2, 9));
    }
  }, []);

  const tools = [
    { id: 'pen', name: 'Pen', icon: '✏️' },
    { id: 'brush', name: 'Brush', icon: '🖌️' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'text', name: 'Text', icon: '📝' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
  ];

  const sizes = [1, 2, 4, 8, 16, 32];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Collaborative Whiteboard
        </h1>
        
        <div className="flex gap-6">
          {/* Toolbar */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 w-64">
            <h3 className="text-lg font-semibold text-white mb-4">Tools</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Drawing Tools</h4>
                <div className="grid grid-cols-3 gap-2">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id)}
                      className={'p-2 rounded border ' + (
                        activeTool === tool.id
                          ? 'bg-green-600 border-green-400'
                          : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                      )}
                    >
                      <span className="text-lg">{tool.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setBrushColor(color)}
                      className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Size</h4>
                <select
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-600 rounded-lg bg-white"
            />
          </div>

          {/* Collaborators */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 w-48">
            <h3 className="text-lg font-semibold text-white mb-4">Collaborators</h3>
            <div className="space-y-2">
              {collaborators.map(collaborator => (
                <div key={collaborator.id} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: collaborator.color }}
                  />
                  <span className="text-sm text-gray-300">{collaborator.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎨 Collaborative Whiteboard</h1>
          <p className="text-gray-300 text-lg">
            Real-time collaborative drawing platform with advanced tools and multi-user synchronization
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={'px-4 py-2 rounded-lg transition-colors ' + (
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Collaborative Whiteboard is a real-time drawing platform that enables multiple users 
                  to collaborate on digital canvases simultaneously. It features advanced drawing tools, 
                  real-time synchronization, and seamless collaboration across different devices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time collaborative drawing</li>
                    <li>• Advanced drawing tools and shapes</li>
                    <li>• Multi-user synchronization</li>
                    <li>• Cross-platform compatibility</li>
                    <li>• Drawing history and undo/redo</li>
                    <li>• Export and sharing capabilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for user interface</li>
                    <li>• HTML5 Canvas for drawing</li>
                    <li>• WebSocket for real-time sync</li>
                    <li>• WebRTC for peer-to-peer</li>
                    <li>• Canvas API for graphics</li>
                    <li>• Real-time collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">🎨 Drawing Tools</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Pen and brush tools</li>
                    <li>• Shape drawing (rectangles, circles)</li>
                    <li>• Text tool with custom fonts</li>
                    <li>• Eraser and selection tools</li>
                    <li>• Color palette and brush sizes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">👥 Collaboration</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Real-time multi-user drawing</li>
                    <li>• Live cursor tracking</li>
                    <li>• User presence indicators</li>
                    <li>• Room-based collaboration</li>
                    <li>• Conflict resolution</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">💾 History & Sync</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Drawing history management</li>
                    <li>• Undo/redo functionality</li>
                    <li>• Canvas state synchronization</li>
                    <li>• Action replay system</li>
                    <li>• Auto-save capabilities</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📤 Export & Share</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• PNG/JPEG export</li>
                    <li>• PDF generation</li>
                    <li>• Share via links</li>
                    <li>• Cloud storage integration</li>
                    <li>• Version control</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Canvas Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.canvasManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Sync Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.syncManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Tool Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.toolManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js interface</li>
                      <li>• HTML5 Canvas rendering</li>
                      <li>• Real-time drawing tools</li>
                      <li>• Tool palette and controls</li>
                      <li>• Responsive design</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Backend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• WebSocket server</li>
                      <li>• Real-time synchronization</li>
                      <li>• Room management</li>
                      <li>• User session handling</li>
                      <li>• Canvas state persistence</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">User Input</p>
                      <p className="text-gray-300 text-sm">Drawing actions from user interface</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Action Processing</p>
                      <p className="text-gray-300 text-sm">Canvas updates and history management</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">Real-time Sync</p>
                      <p className="text-gray-300 text-sm">Broadcast to all connected users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the collaborative whiteboard in action. The demo showcases real-time drawing, 
                multi-user collaboration, and advanced drawing tools with seamless synchronization.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Whiteboard Demo</h3>
                  <button
                    onClick={() => setCurrentPage('whiteboard')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full collaborative whiteboard with real-time drawing, 
                  multi-user collaboration, and advanced drawing tools.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhiteboardProjectPage; 