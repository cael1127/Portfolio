import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const WhiteboardDemo = () => {
  const [whiteboards, setWhiteboards] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedWhiteboard, setSelectedWhiteboard] = useState(null);
  const [whiteboardStats, setWhiteboardStats] = useState({
    totalWhiteboards: 0,
    activeUsers: 0,
    totalElements: 0,
    averageSessionTime: 0,
    collaborationScore: 0,
    realTimeSync: 0,
    dailyCreations: 0,
    monthlyCollaborations: 0
  });

  // Canvas references
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Drawing state
  const [drawingMode, setDrawingMode] = useState('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#000000');
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);

  // Deterministic Whiteboard System Implementation
  const whiteboardSystem = {
    // Deterministic drawing algorithm
    drawElement: (context, element, isPreview = false) => {
      if (!context) return;
      
      context.save();
      context.strokeStyle = element.color;
      context.lineWidth = element.size;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      
      if (isPreview) {
        context.globalAlpha = 0.6;
      }
      
      switch (element.type) {
        case 'pen':
        case 'brush':
          context.beginPath();
          context.moveTo(element.points[0].x, element.points[0].y);
          element.points.forEach(point => {
            context.lineTo(point.x, point.y);
          });
          context.stroke();
          break;
          
        case 'line':
          context.beginPath();
          context.moveTo(element.start.x, element.start.y);
          context.lineTo(element.end.x, element.end.y);
          context.stroke();
          break;
          
        case 'rectangle':
          const rectWidth = element.end.x - element.start.x;
          const rectHeight = element.end.y - element.start.y;
          context.strokeRect(element.start.x, element.start.y, rectWidth, rectHeight);
          break;
          
        case 'circle':
          const radius = Math.sqrt(
            Math.pow(element.end.x - element.start.x, 2) + 
            Math.pow(element.end.y - element.start.y, 2)
          );
          context.beginPath();
          context.arc(element.start.x, element.start.y, radius, 0, 2 * Math.PI);
          context.stroke();
          break;
          
        case 'text':
          context.font = `${element.size * 3}px Arial`;
          context.fillStyle = element.color;
          context.fillText(element.text, element.start.x, element.start.y);
          break;
      }
      
      context.restore();
    },

    // Deterministic undo/redo system
    undo: (history, currentStep) => {
      if (currentStep <= 0) return { history, currentStep: 0 };
      
      const newStep = currentStep - 1;
      return { history, currentStep: newStep };
    },

    redo: (history, currentStep) => {
      if (currentStep >= history.length - 1) return { history, currentStep: history.length - 1 };
      
      const newStep = currentStep + 1;
      return { history, currentStep: newStep };
    },

    // Deterministic collaboration algorithm
    mergeCollaborativeChanges: (localChanges, remoteChanges, timestamp) => {
      // Sort changes by timestamp and user ID for deterministic merging
      const allChanges = [...localChanges, ...remoteChanges].sort((a, b) => {
        if (a.timestamp !== b.timestamp) {
          return new Date(a.timestamp) - new Date(b.timestamp);
        }
        return a.userId.localeCompare(b.userId);
      });
      
      // Remove duplicates based on element ID and timestamp
      const uniqueChanges = [];
      const seen = new Set();
      
      allChanges.forEach(change => {
        const key = `${change.elementId}_${change.timestamp}_${change.userId}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueChanges.push(change);
        }
      });
      
      return uniqueChanges;
    },

    // Deterministic element optimization
    optimizeElements: (elements) => {
      if (!elements || elements.length === 0) return elements;
      
      return elements.map(element => {
        // Optimize pen/brush strokes by removing redundant points
        if (element.type === 'pen' || element.type === 'brush') {
          const optimizedPoints = this.optimizeStroke(element.points);
          return { ...element, points: optimizedPoints };
        }
        
        return element;
      });
    },

    // Optimize stroke by removing redundant points
    optimizeStroke: (points) => {
      if (points.length <= 2) return points;
      
      const optimized = [points[0]];
      const tolerance = 2; // Minimum distance between points
      
      for (let i = 1; i < points.length - 1; i++) {
        const prev = optimized[optimized.length - 1];
        const current = points[i];
        const next = points[i + 1];
        
        // Calculate distance from current point to line segment
        const distance = this.pointToLineDistance(current, prev, next);
        
        if (distance > tolerance) {
          optimized.push(current);
        }
      }
      
      optimized.push(points[points.length - 1]);
      return optimized;
    },

    // Calculate point to line distance
    pointToLineDistance: (point, lineStart, lineEnd) => {
      const A = point.x - lineStart.x;
      const B = point.y - lineStart.y;
      const C = lineEnd.x - lineStart.x;
      const D = lineEnd.y - lineStart.y;
      
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      
      if (lenSq === 0) {
        return Math.sqrt(A * A + B * B);
      }
      
      const param = dot / lenSq;
      let xx, yy;
      
      if (param < 0) {
        xx = lineStart.x;
        yy = lineStart.y;
      } else if (param > 1) {
        xx = lineEnd.x;
        yy = lineEnd.y;
      } else {
        xx = lineStart.x + param * C;
        yy = lineStart.y + param * D;
      }
      
      const dx = point.x - xx;
      const dy = point.y - yy;
      
      return Math.sqrt(dx * dx + dy * dy);
    },

    // Deterministic project organization
    organizeProjects: (projects, whiteboards) => {
      if (!projects || projects.length === 0) return [];
      
      return projects.map(project => {
        const projectWhiteboards = whiteboards.filter(wb => wb.projectId === project.id);
        const totalElements = projectWhiteboards.reduce((sum, wb) => sum + wb.elementCount, 0);
        const activeCollaborators = new Set(
          projectWhiteboards.flatMap(wb => wb.collaborators)
        ).size;
        
        // Calculate project health score
        const healthScore = this.calculateProjectHealth(
          projectWhiteboards.length,
          totalElements,
          activeCollaborators,
          project.lastActivity
        );
        
        return {
          ...project,
          whiteboardCount: projectWhiteboards.length,
          totalElements,
          activeCollaborators,
          healthScore,
          recommendations: this.generateProjectRecommendations(healthScore, projectWhiteboards.length)
        };
      });
    },

    // Calculate project health score
    calculateProjectHealth: (whiteboardCount, elementCount, collaborators, lastActivity) => {
      let score = 0;
      
      // Whiteboard count (30 points)
      score += Math.min(30, whiteboardCount * 5);
      
      // Element count (25 points)
      score += Math.min(25, elementCount / 10);
      
      // Collaborators (25 points)
      score += Math.min(25, collaborators * 5);
      
      // Activity (20 points)
      const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 20 - daysSinceActivity);
      
      return Math.round(score);
    },

    // Generate project recommendations
    generateProjectRecommendations: (healthScore, whiteboardCount) => {
      const recommendations = [];
      
      if (healthScore < 50) {
        recommendations.push('Schedule team collaboration session');
        recommendations.push('Review and update project goals');
      }
      
      if (whiteboardCount < 3) {
        recommendations.push('Create additional whiteboards for different aspects');
        recommendations.push('Consider breaking down complex ideas');
      }
      
      if (healthScore < 30) {
        recommendations.push('Reassess project viability');
        recommendations.push('Increase team engagement');
      }
      
      return recommendations;
    },

    // Deterministic user activity tracking
    trackUserActivity: (users, whiteboards, timeWindow) => {
      if (!users || users.length === 0) return [];
      
      const now = Date.now();
      const windowMs = timeWindow * 60 * 60 * 1000; // Convert hours to milliseconds
      
      return users.map(user => {
        const userWhiteboards = whiteboards.filter(wb => 
          wb.collaborators.includes(user.id)
        );
        
        const recentActivity = userWhiteboards.filter(wb => 
          (now - new Date(wb.lastModified).getTime()) < windowMs
        );
        
        const totalElements = userWhiteboards.reduce((sum, wb) => sum + wb.elementCount, 0);
        const collaborationScore = this.calculateCollaborationScore(
          userWhiteboards.length,
          recentActivity.length,
          totalElements
        );
        
        return {
          ...user,
          activeWhiteboards: recentActivity.length,
          totalElements,
          collaborationScore,
          lastSeen: user.lastSeen || new Date().toISOString(),
          status: recentActivity.length > 0 ? 'active' : 'idle'
        };
      });
    },

    // Calculate collaboration score
    calculateCollaborationScore: (totalWhiteboards, activeWhiteboards, totalElements) => {
      let score = 0;
      
      // Active participation (40 points)
      score += Math.min(40, (activeWhiteboards / Math.max(1, totalWhiteboards)) * 40);
      
      // Content contribution (35 points)
      score += Math.min(35, (totalElements / 100) * 35);
      
      // Consistency (25 points)
      const consistency = activeWhiteboards > 0 ? 25 : 0;
      score += consistency;
      
      return Math.round(score);
    }
  };

  // Canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [brushColor, brushSize]);

  // Drawing functions
  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lastPointRef.current = { x, y };
    
    if (drawingMode === 'pen' || drawingMode === 'brush') {
      const element = {
        id: Date.now(),
        type: drawingMode,
        color: brushColor,
        size: brushSize,
        points: [{ x, y }],
        timestamp: new Date().toISOString(),
        userId: 'current-user'
      };
      
      setCanvasHistory(prev => [...prev, element]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const draw = (e) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (drawingMode === 'pen' || drawingMode === 'brush') {
      const currentElement = canvasHistory[currentStep];
      if (currentElement) {
        const updatedElement = {
          ...currentElement,
          points: [...currentElement.points, { x, y }]
        };
        
        const newHistory = [...canvasHistory.slice(0, currentStep), updatedElement];
        setCanvasHistory(newHistory);
        
        // Redraw canvas
        redrawCanvas(newHistory);
      }
    }
    
    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  };

  const redrawCanvas = (history) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw all elements
    history.forEach(element => {
      whiteboardSystem.drawElement(context, element);
    });
  };

  // Generate deterministic sample data
  const generateSampleData = () => {
    const baseTime = Date.now();
    
    // Generate projects
    const projectNames = ['Product Design', 'Architecture Plan', 'Marketing Strategy', 'Software Architecture'];
    const projects = projectNames.map((name, index) => ({
      id: index + 1,
      name,
      description: `${name} project for collaborative development`,
      status: index < 3 ? 'active' : 'completed',
      createdAt: new Date(baseTime - (index * 86400000)).toISOString(),
      lastActivity: new Date(baseTime - (index * 3600000)).toISOString(),
      collaborators: [`user-${index + 1}`, `user-${(index + 2) % 4 + 1}`]
    }));
    
    // Generate whiteboards
    const whiteboards = [];
    projects.forEach(project => {
      const boardCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < boardCount; i++) {
        whiteboards.push({
          id: whiteboards.length + 1,
          name: `${project.name} - Board ${i + 1}`,
          projectId: project.id,
          elementCount: 50 + Math.floor(Math.random() * 200),
          collaborators: project.collaborators,
          status: 'active',
          createdAt: new Date(baseTime - (i * 3600000)).toISOString(),
          lastModified: new Date(baseTime - (i * 1800000)).toISOString(),
          createdBy: project.collaborators[0]
        });
      }
    });
    
    // Generate users
    const userNames = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson'];
    const activeUsers = userNames.map((name, index) => ({
      id: `user-${index + 1}`,
      name,
      email: `${name.toLowerCase().replace(' ', '.')}@company.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      lastSeen: new Date(baseTime - (index * 300000)).toISOString(),
      status: index < 3 ? 'online' : 'away'
    }));
    
    // Calculate statistics
    const totalWhiteboards = whiteboards.length;
    const activeUsersCount = activeUsers.filter(u => u.status === 'online').length;
    const totalElements = whiteboards.reduce((sum, wb) => sum + wb.elementCount, 0);
    const averageSessionTime = 45; // minutes
    const collaborationScore = 78;
    const realTimeSync = 95;
    const dailyCreations = Math.floor(totalWhiteboards * 0.3);
    const monthlyCollaborations = totalWhiteboards * 2;
    
    setProjects(projects);
    setWhiteboards(whiteboards);
    setActiveUsers(activeUsers);
    setWhiteboardStats({
      totalWhiteboards,
      activeUsers: activeUsersCount,
      totalElements,
      averageSessionTime,
      collaborationScore,
      realTimeSync,
      dailyCreations,
      monthlyCollaborations
    });
    
    return { projects, whiteboards, activeUsers, whiteboardStats };
  };

  // Run whiteboard algorithms
  const runWhiteboardAlgorithms = (data) => {
    const { projects, whiteboards, activeUsers } = data;
    
    // Organize projects
    const organizedProjects = whiteboardSystem.organizeProjects(projects, whiteboards);
    
    // Track user activity
    const userActivity = whiteboardSystem.trackUserActivity(activeUsers, whiteboards, 24);
    
    // Update state
    setProjects(organizedProjects);
    setActiveUsers(userActivity);
    
    return { organizedProjects, userActivity };
  };

  // Initialize demo
  useEffect(() => {
    const sampleData = generateSampleData();
    const results = runWhiteboardAlgorithms(sampleData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 overflow-x-hidden">
              <div className="max-w-7xl mx-auto">
          <div className="mb-8 snap-section">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">🖼️ Collaborative Whiteboard Platform</h1>
          <p className="text-gray-300 text-lg">
            Real-time collaborative whiteboard with deterministic drawing algorithms, project organization, and user activity tracking
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Whiteboard Canvas */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600 snap-section">
              <h2 className="text-2xl font-bold mb-4">Interactive Whiteboard</h2>
              
              {/* Drawing Tools */}
              <div className="mb-4 flex gap-4 items-center">
                <select
                  value={drawingMode}
                  onChange={(e) => setDrawingMode(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600"
                >
                  <option value="pen">Pen</option>
                  <option value="brush">Brush</option>
                  <option value="line">Line</option>
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                  <option value="text">Text</option>
                </select>
                
                <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  className="w-12 h-10 rounded border border-gray-600"
                />
                
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-gray-400">{brushSize}px</span>
                
                <button
                  onClick={() => {
                    if (currentStep > 0) {
                      const { currentStep: newStep } = whiteboardSystem.undo(canvasHistory, currentStep);
                      setCurrentStep(newStep);
                      redrawCanvas(canvasHistory.slice(0, newStep + 1));
                    }
                  }}
                  disabled={currentStep <= 0}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 px-3 py-2 rounded text-sm"
                >
                  Undo
                </button>
                
                <button
                  onClick={() => {
                    if (currentStep < canvasHistory.length - 1) {
                      const { currentStep: newStep } = whiteboardSystem.redo(canvasHistory, currentStep);
                      setCurrentStep(newStep);
                      redrawCanvas(canvasHistory.slice(0, newStep + 1));
                    }
                  }}
                  disabled={currentStep >= canvasHistory.length - 1}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 px-3 py-2 rounded text-sm"
                >
                  Redo
                </button>
              </div>
              
              {/* Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="border border-gray-600 rounded-lg bg-white cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Draw on the canvas using the tools above | {canvasHistory.length} elements created</p>
              </div>
            </div>

            {/* Projects Overview */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600 snap-section">
              <h2 className="text-2xl font-bold mb-4">Projects Overview</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-white">{project.name}</div>
                        <div className="text-sm text-gray-300">{project.description}</div>
                        <div className="text-xs text-gray-400">
                          {project.whiteboardCount} whiteboards | {project.totalElements} elements
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          project.healthScore >= 70 ? 'text-green-400' :
                          project.healthScore >= 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {project.healthScore}
                        </div>
                        <div className="text-sm text-gray-400">Health Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Whiteboard Statistics */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Platform Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Whiteboards:</span>
                  <span className="text-blue-400">{whiteboardStats.totalWhiteboards}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Users:</span>
                  <span className="text-green-400">{whiteboardStats.activeUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Elements:</span>
                  <span className="text-yellow-400">{whiteboardStats.totalElements}</span>
                </div>
                <div className="flex justify-between">
                  <span>Collaboration Score:</span>
                  <span className="text-purple-400">{whiteboardStats.collaborationScore}%</span>
                </div>
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Active Users</h3>
              <div className="space-y-3">
                {activeUsers.slice(0, 6).map(user => (
                  <div key={user.id} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-gray-400">{user.activeWhiteboards} active boards</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded ${
                          user.status === 'online' ? 'bg-green-900 text-green-400' :
                          user.status === 'away' ? 'bg-yellow-900 text-yellow-400' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {user.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Viewer */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-600">
              <h3 className="text-xl font-bold mb-4">Implementation</h3>
              <button
                onClick={() => setShowCodeViewer(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors"
              >
                📖 View Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {showCodeViewer && (
        <CodeViewer
          isOpen={showCodeViewer}
          onClose={() => setShowCodeViewer(false)}
          title="Whiteboard Implementation"
          code={`
// Deterministic Whiteboard System Implementation
class WhiteboardSystem {
  // Deterministic drawing algorithm
  drawElement(context, element, isPreview = false) {
    if (!context) return;
    
    context.save();
    context.strokeStyle = element.color;
    context.lineWidth = element.size;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    
    if (isPreview) {
      context.globalAlpha = 0.6;
    }
    
    switch (element.type) {
      case 'pen':
      case 'brush':
        context.beginPath();
        context.moveTo(element.points[0].x, element.points[0].y);
        element.points.forEach(point => {
          context.lineTo(point.x, point.y);
        });
        context.stroke();
        break;
        
      case 'line':
        context.beginPath();
        context.moveTo(element.start.x, element.start.y);
        context.lineTo(element.end.x, element.end.y);
        context.stroke();
        break;
        
      case 'rectangle':
        const rectWidth = element.end.x - element.start.x;
        const rectHeight = element.end.y - element.start.y;
        context.strokeRect(element.start.x, element.start.y, rectWidth, rectHeight);
        break;
        
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(element.end.x - element.start.x, 2) + 
          Math.pow(element.end.y - element.start.y, 2)
        );
        context.beginPath();
        context.arc(element.start.x, element.start.y, radius, 0, 2 * Math.PI);
        context.stroke();
        break;
    }
    
    context.restore();
  }

  // Deterministic undo/redo system
  undo(history, currentStep) {
    if (currentStep <= 0) return { history, currentStep: 0 };
    
    const newStep = currentStep - 1;
    return { history, currentStep: newStep };
  }

  redo(history, currentStep) {
    if (currentStep >= history.length - 1) return { history, currentStep: history.length - 1 };
    
    const newStep = currentStep + 1;
    return { history, currentStep: newStep };
  }

  // Deterministic collaboration algorithm
  mergeCollaborativeChanges(localChanges, remoteChanges, timestamp) {
    // Sort changes by timestamp and user ID for deterministic merging
    const allChanges = [...localChanges, ...remoteChanges].sort((a, b) => {
      if (a.timestamp !== b.timestamp) {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
      return a.userId.localeCompare(b.userId);
    });
    
    // Remove duplicates based on element ID and timestamp
    const uniqueChanges = [];
    const seen = new Set();
    
    allChanges.forEach(change => {
      const key = \`\${change.elementId}_\${change.timestamp}_\${change.userId}\`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueChanges.push(change);
      }
    });
    
    return uniqueChanges;
  }

  // Deterministic element optimization
  optimizeElements(elements) {
    if (!elements || elements.length === 0) return elements;
    
    return elements.map(element => {
      // Optimize pen/brush strokes by removing redundant points
      if (element.type === 'pen' || element.type === 'brush') {
        const optimizedPoints = this.optimizeStroke(element.points);
        return { ...element, points: optimizedPoints };
      }
      
      return element;
    });
  }

  // Calculate project health score
  calculateProjectHealth(whiteboardCount, elementCount, collaborators, lastActivity) {
    let score = 0;
    
    // Whiteboard count (30 points)
    score += Math.min(30, whiteboardCount * 5);
    
    // Element count (25 points)
    score += Math.min(25, elementCount / 10);
    
    // Collaborators (25 points)
    score += Math.min(25, collaborators * 5);
    
    // Activity (20 points)
    const daysSinceActivity = (Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 20 - daysSinceActivity);
    
    return Math.round(score);
  }
}
          `}
        />
      )}
    </div>
  );
};

export default WhiteboardDemo;