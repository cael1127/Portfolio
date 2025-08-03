import React, { useState, useEffect } from 'react';
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

  // Sample code for the demo
  const demoCode = `/**
 * Collaborative Whiteboard Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a real-time collaborative whiteboard
 * with drawing tools, user management, and project organization.
 */

import React, { useState, useEffect, useRef } from 'react';

const WhiteboardDemo = () => {
  const [whiteboards, setWhiteboards] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [drawingMode, setDrawingMode] = useState('pen');
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#000000');
  
  // Canvas reference for drawing
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawingRef = useRef(false);
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = brushColor;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, [brushColor, brushSize]);

  // Drawing functions
  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  // Whiteboard management
  const createWhiteboard = (projectId) => {
    const newBoard = {
      id: Date.now(),
      name: 'New Whiteboard',
      projectId,
      elements: 0,
      collaborators: 1,
      status: 'active',
      createdAt: new Date().toISOString(),
      createdBy: 'Current User'
    };
    setWhiteboards(prev => [newBoard, ...prev]);
  };

  const updateWhiteboard = (boardId, updates) => {
    setWhiteboards(prev => prev.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    ));
  };

  const deleteWhiteboard = (boardId) => {
    setWhiteboards(prev => prev.filter(board => board.id !== boardId));
  };

  // User management
  const addUser = (userData) => {
    setActiveUsers(prev => [...prev, { ...userData, id: Date.now() }]);
  };

  const removeUser = (userId) => {
    setActiveUsers(prev => prev.filter(user => user.id !== userId));
  };

  // Project management
  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      createdAt: new Date().toISOString(),
      status: 'active'
    };
    setProjects(prev => [...prev, newProject]);
  };

  // Real-time collaboration simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWhiteboards(prev => prev.map(board => ({
        ...board,
        elements: board.elements + Math.floor(Math.random() * 5),
        lastUpdate: 'Just now'
      })));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Tool selection
  const tools = [
    { id: 'pen', name: 'Pen', icon: '✏️' },
    { id: 'highlighter', name: 'Highlighter', icon: '🖍️' },
    { id: 'eraser', name: 'Eraser', icon: '🧽' },
    { id: 'shapes', name: 'Shapes', icon: '⬜' },
    { id: 'text', name: 'Text', icon: 'T' },
    { id: 'sticky', name: 'Sticky Note', icon: '📝' }
  ];

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">🎨 Collaborative Whiteboard</h1>
            <p className="text-gray-400">Real-time collaborative drawing and design platform</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">🛠️ Tools</h3>
            <div className="space-y-2">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setDrawingMode(tool.id)}
                  className={`w-full p-2 rounded text-left transition-colors ${
                    drawingMode === tool.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{tool.icon}</span>
                  {tool.name}
                </button>
              ))}
            </div>

            {/* Color Palette */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">🎨 Colors</h4>
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

            {/* Brush Size */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">📏 Size</h4>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs text-gray-400">{brushSize}px</span>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border border-gray-300 rounded cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>

          {/* Whiteboard List */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">📋 Whiteboards</h3>
              <div className="space-y-2">
                {whiteboards.map((board) => (
                  <div key={board.id} className="p-3 bg-gray-700 rounded">
                    <h4 className="font-semibold">{board.name}</h4>
                    <p className="text-gray-300 text-sm">{board.elements} elements</p>
                    <p className="text-gray-400 text-xs">{board.collaborators} collaborators</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">👥 Active Users</h3>
              <div className="space-y-2">
                {activeUsers.map((user) => (
                  <div key={user.id} className="p-3 bg-gray-700 rounded">
                    <h4 className="font-semibold">{user.username}</h4>
                    <p className="text-gray-300 text-sm">Working on {user.currentBoard}</p>
                    <p className="text-gray-400 text-xs">{user.sessionTime} minutes</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardDemo;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">🎨 Collaborative Whiteboard</h1>
            <p className="text-gray-400">Real-time collaborative drawing and design platform</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Whiteboard List */}
          <div className="space-y-4">
            {whiteboards.map((board) => (
              <div key={board.id} className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold">{board.name}</h3>
                <p className="text-gray-300 text-sm">{board.elements} elements</p>
                <p className="text-gray-400 text-xs">{board.collaborators} collaborators</p>
              </div>
            ))}
          </div>
          
          {/* Active Users */}
          <div className="space-y-4">
            {activeUsers.map((user) => (
              <div key={user.id} className="p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-gray-300 text-sm">Working on {user.currentBoard}</p>
                <p className="text-gray-400 text-xs">{user.sessionTime} minutes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardDemo;`;

  useEffect(() => {
    // Initialize whiteboard data
    const initialWhiteboards = [
      {
        id: 1,
        name: 'Product Design Sprint',
        project: 'Mobile App Redesign',
        elements: 156,
        collaborators: 8,
        status: 'active',
        lastUpdate: 'Just now',
        createdBy: 'Sarah Johnson',
        createdAt: '2024-01-15',
        features: ['Real-time Drawing', 'Sticky Notes', 'Shapes', 'Text Tools', 'Image Upload'],
        tools: ['Pen', 'Highlighter', 'Shapes', 'Text', 'Sticky Notes', 'Images'],
        collaboration: {
          activeUsers: 5,
          totalEdits: 234,
          lastEdit: '2 minutes ago',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 45,
          elementsCreated: 156,
          comments: 23,
          exports: 5
        }
      },
      {
        id: 2,
        name: 'Architecture Planning',
        project: 'Office Building Design',
        elements: 89,
        collaborators: 4,
        status: 'active',
        lastUpdate: '1 minute ago',
        createdBy: 'Mike Chen',
        createdAt: '2024-01-12',
            features: ['Floor Plans', 'Annotations', 'Measurements', 'Layers'],
    tools: ['Pen', 'Shapes', 'Text', 'Measurements', 'Layers'],
        collaboration: {
          activeUsers: 3,
          totalEdits: 156,
          lastEdit: 'Just now',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 32,
          elementsCreated: 89,
          comments: 12,
          exports: 3
        }
      },
      {
        id: 3,
        name: 'Marketing Strategy',
        project: 'Q1 Campaign Planning',
        elements: 234,
        collaborators: 6,
        status: 'active',
        lastUpdate: '3 minutes ago',
        createdBy: 'Emily Rodriguez',
        createdAt: '2024-01-10',
        features: ['Mind Maps', 'Flowcharts', 'Templates', 'Branding', 'Charts'],
        tools: ['Pen', 'Shapes', 'Text', 'Templates', 'Charts', 'Images'],
        collaboration: {
          activeUsers: 4,
          totalEdits: 445,
          lastEdit: '5 minutes ago',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 67,
          elementsCreated: 234,
          comments: 34,
          exports: 8
        }
      },
      {
        id: 4,
        name: 'Software Architecture',
        project: 'Microservices Design',
        elements: 123,
        collaborators: 5,
        status: 'active',
        lastUpdate: '5 minutes ago',
        createdBy: 'David Kim',
        createdAt: '2024-01-08',
        features: ['UML Diagrams', 'Flowcharts', 'Code Blocks', 'Annotations', 'Version Control'],
        tools: ['Pen', 'Shapes', 'Text', 'UML Tools', 'Code Blocks', 'Versioning'],
        collaboration: {
          activeUsers: 3,
          totalEdits: 289,
          lastEdit: '8 minutes ago',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 28,
          elementsCreated: 123,
          comments: 18,
          exports: 4
        }
      },
      {
        id: 5,
        name: 'Creative Brainstorming',
        project: 'New Product Ideas',
        elements: 78,
        collaborators: 7,
        status: 'active',
        lastUpdate: '10 minutes ago',
        createdBy: 'Lisa Wang',
        createdAt: '2024-01-05',
        features: ['Brainstorming Tools', 'Idea Mapping', 'Voting', 'Templates', 'Export'],
        tools: ['Pen', 'Sticky Notes', 'Shapes', 'Voting', 'Templates', 'Export'],
        collaboration: {
          activeUsers: 6,
          totalEdits: 167,
          lastEdit: '12 minutes ago',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 54,
          elementsCreated: 78,
          comments: 29,
          exports: 6
        }
      }
    ];

    const initialActiveUsers = [
      {
        id: 1,
        username: 'Sarah Johnson',
        avatar: '👩‍💻',
        currentBoard: 'Product Design Sprint',
        status: 'drawing',
        lastActivity: 'Just now',
        sessionTime: 45,
        tools: ['Pen', 'Shapes', 'Text'],
        cursorPosition: { x: 245, y: 156 }
      },
      {
        id: 2,
        username: 'Mike Chen',
        avatar: '👨‍🏗️',
        currentBoard: 'Architecture Planning',
        status: 'annotating',
        lastActivity: '1 minute ago',
        sessionTime: 32,
        tools: ['Pen', 'Measurements', 'Layers'],
        cursorPosition: { x: 189, y: 234 }
      },
      {
        id: 3,
        username: 'Emily Rodriguez',
        avatar: '👩‍💼',
        currentBoard: 'Marketing Strategy',
        status: 'typing',
        lastActivity: '2 minutes ago',
        sessionTime: 67,
        tools: ['Text', 'Charts', 'Templates'],
        cursorPosition: { x: 312, y: 89 }
      },
      {
        id: 4,
        username: 'David Kim',
        avatar: '👨‍💻',
        currentBoard: 'Software Architecture',
        status: 'drawing',
        lastActivity: '3 minutes ago',
        sessionTime: 28,
        tools: ['Pen', 'UML Tools', 'Code Blocks'],
        cursorPosition: { x: 156, y: 278 }
      },
      {
        id: 5,
        username: 'Lisa Wang',
        avatar: '👩‍🎨',
        currentBoard: 'Creative Brainstorming',
        status: 'sticky-notes',
        lastActivity: '5 minutes ago',
        sessionTime: 54,
        tools: ['Sticky Notes', 'Voting', 'Templates'],
        cursorPosition: { x: 423, y: 145 }
      }
    ];

    const initialProjects = [
      {
        id: 1,
        name: 'Mobile App Redesign',
        category: 'Product Design',
        whiteboards: 3,
        collaborators: 12,
        status: 'active',
        progress: 75,
        deadline: '2024-02-15',
        createdBy: 'Sarah Johnson'
      },
      {
        id: 2,
        name: 'Office Building Design',
        category: 'Architecture',
        whiteboards: 2,
        collaborators: 8,
        status: 'active',
        progress: 60,
        deadline: '2024-03-01',
        createdBy: 'Mike Chen'
      },
      {
        id: 3,
        name: 'Q1 Campaign Planning',
        category: 'Marketing',
        whiteboards: 4,
        collaborators: 15,
        status: 'active',
        progress: 85,
        deadline: '2024-01-31',
        createdBy: 'Emily Rodriguez'
      },
      {
        id: 4,
        name: 'Microservices Design',
        category: 'Software Development',
        whiteboards: 2,
        collaborators: 6,
        status: 'active',
        progress: 40,
        deadline: '2024-02-28',
        createdBy: 'David Kim'
      },
      {
        id: 5,
        name: 'New Product Ideas',
        category: 'Innovation',
        whiteboards: 1,
        collaborators: 10,
        status: 'active',
        progress: 30,
        deadline: '2024-02-10',
        createdBy: 'Lisa Wang'
      }
    ];

    setWhiteboards(initialWhiteboards);
    setActiveUsers(initialActiveUsers);
    setProjects(initialProjects);
  }, []);

  useEffect(() => {
    // Simulate real-time whiteboard updates
    const interval = setInterval(() => {
      // Update whiteboards
      setWhiteboards(prev => prev.map(board => ({
        ...board,
        elements: board.elements + Math.floor(Math.random() * 3),
        lastUpdate: 'Just now'
      })));

      // Update active users
      setActiveUsers(prev => prev.map(user => ({
        ...user,
        sessionTime: user.sessionTime + 1,
        lastActivity: 'Just now'
      })));

      // Update whiteboard stats
      setWhiteboardStats(prev => ({
        totalWhiteboards: whiteboards.length,
        activeUsers: activeUsers.length,
        totalElements: whiteboards.reduce((sum, board) => sum + board.elements, 0),
        averageSessionTime: Math.floor(activeUsers.reduce((sum, user) => sum + user.sessionTime, 0) / activeUsers.length),
        collaborationScore: Math.max(70, Math.min(100, prev.collaborationScore + (Math.random() - 0.5) * 5)),
        realTimeSync: Math.max(95, Math.min(100, prev.realTimeSync + (Math.random() - 0.5) * 2)),
        dailyCreations: Math.floor(Math.random() * 20) + 30,
        monthlyCollaborations: prev.monthlyCollaborations + Math.random() * 50
      }));
    }, 7000);

    return () => clearInterval(interval);
  }, [whiteboards, activeUsers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'archived': return 'text-gray-400';
      case 'shared': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'archived': return 'bg-gray-600';
      case 'shared': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'drawing': return 'text-blue-400';
      case 'typing': return 'text-green-400';
      case 'annotating': return 'text-yellow-400';
      case 'sticky-notes': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getUserStatusBg = (status) => {
    switch (status) {
      case 'drawing': return 'bg-blue-600';
      case 'typing': return 'bg-green-600';
      case 'annotating': return 'bg-yellow-600';
      case 'sticky-notes': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    if (progress >= 40) return 'text-blue-400';
    return 'text-red-400';
  };

  const getProgressBg = (progress) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 60) return 'bg-yellow-600';
    if (progress >= 40) return 'bg-blue-600';
    return 'bg-red-600';
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-indigo-400 mb-4">🖼️ Advanced Whiteboard Platform</h1>
            <p className="text-gray-300 text-lg">
              Collaborative whiteboard platform with real-time drawing, project management, and comprehensive analytics
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Whiteboard Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-6 rounded-xl border border-indigo-800">
            <div className="text-3xl mb-2">🖼️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Whiteboards</h3>
            <p className="text-3xl font-bold text-indigo-400">{whiteboardStats.totalWhiteboards}</p>
            <p className="text-indigo-300 text-sm">{whiteboardStats.dailyCreations} created today</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-400">{whiteboardStats.activeUsers}</p>
            <p className="text-green-300 text-sm">{formatTime(whiteboardStats.averageSessionTime)} avg session</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Elements</h3>
            <p className="text-3xl font-bold text-blue-400">{formatNumber(whiteboardStats.totalElements)}</p>
            <p className="text-blue-300 text-sm">{whiteboardStats.collaborationScore.toFixed(1)}% collaboration</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Sync</h3>
            <p className="text-3xl font-bold text-purple-400">{whiteboardStats.realTimeSync.toFixed(1)}%</p>
            <p className="text-purple-300 text-sm">{formatNumber(whiteboardStats.monthlyCollaborations)} collaborations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Whiteboard Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-6 rounded-xl border border-indigo-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🖼️ Whiteboard Management</h2>
                <div className="text-sm text-indigo-300">Real-time updates every 7s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {whiteboards.map((whiteboard) => (
                  <div
                    key={whiteboard.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedWhiteboard?.id === whiteboard.id
                        ? 'border-indigo-400 bg-indigo-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedWhiteboard(whiteboard)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{whiteboard.name}</h3>
                        <p className="text-indigo-200 text-sm">{whiteboard.project} • {whiteboard.createdBy}</p>
                        <p className="text-indigo-200 text-xs">{whiteboard.features.length} features • {whiteboard.tools.length} tools</p>
                        <p className="text-gray-300 text-xs">{whiteboard.createdAt} • {whiteboard.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(whiteboard.status)}>
                          {whiteboard.status.toUpperCase()}
                        </div>
                        <p className="text-white text-lg font-semibold mt-1">{whiteboard.elements}</p>
                        <p className="text-gray-300 text-xs">{whiteboard.collaborators} collaborators</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Active Users</p>
                        <p className="text-white font-semibold">{whiteboard.collaboration.activeUsers}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Edits</p>
                        <p className="text-white font-semibold">{whiteboard.collaboration.totalEdits}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Session Time</p>
                        <p className="text-white font-semibold">{whiteboard.analytics.sessionTime}m</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Collaboration</span>
                        <span>{whiteboard.collaboration.activeUsers}/{whiteboard.collaborators} users</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            whiteboard.collaboration.activeUsers / whiteboard.collaborators > 0.7 ? 'bg-green-500' : 
                            whiteboard.collaboration.activeUsers / whiteboard.collaborators > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: Math.min((whiteboard.collaboration.activeUsers / whiteboard.collaborators) * 100, 100) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Whiteboard Analytics */}
          <div className="space-y-6">
            {/* Active Users */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Active Users</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {activeUsers.map((user) => (
                  <div key={user.id} className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <p className="text-white font-semibold">{user.username}</p>
                          <p className="text-green-200 text-sm">{user.currentBoard}</p>
                          <p className="text-green-200 text-xs">{user.tools.join(', ')}</p>
                          <p className="text-gray-300 text-xs">{user.lastActivity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getUserStatusBg(user.status)}>
                          {user.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{formatTime(user.sessionTime)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📁 Projects</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{project.name}</p>
                        <p className="text-blue-200 text-sm">{project.category}</p>
                        <p className="text-blue-200 text-xs">{project.whiteboards} whiteboards</p>
                        <p className="text-gray-300 text-xs">By {project.createdBy}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getProgressBg(project.progress)}>
                          {project.progress}%
                        </div>
                        <p className="text-white text-xs mt-1">{project.collaborators} users</p>
                        <p className="text-gray-300 text-xs">{project.deadline}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚡ Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>➕</span>
                    <span>Create Whiteboard</span>
                  </div>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>👥</span>
                    <span>Invite Collaborators</span>
                  </div>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📊</span>
                    <span>View Analytics</span>
                  </div>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📤</span>
                    <span>Export Board</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Whiteboard Details Modal */}
        {selectedWhiteboard && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Whiteboard Details</h2>
                <button
                  onClick={() => setSelectedWhiteboard(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">Whiteboard Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Project:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.project}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created By:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={'font-semibold ' + getStatusColor(selectedWhiteboard.status)}>
                        {selectedWhiteboard.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Update:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.lastUpdate}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Analytics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Session Time:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.analytics.sessionTime}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Elements Created:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.analytics.elementsCreated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Comments:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.analytics.comments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exports:</span>
                      <span className="text-white font-semibold">{selectedWhiteboard.analytics.exports}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-blue-400 mb-3 mt-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWhiteboard.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 mt-4">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWhiteboard.tools.map((tool, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Whiteboard Features */}
        <div className="mt-8 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 p-6 rounded-xl border border-indigo-800">
          <h2 className="text-2xl font-bold text-white mb-4">🖼️ Advanced Whiteboard Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Drawing Tools</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time drawing</li>
                <li>• Multiple brush types</li>
                <li>• Shape recognition</li>
                <li>• Text annotations</li>
                <li>• Image uploads</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Collaboration</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Multi-user editing</li>
                <li>• Live cursors</li>
                <li>• Version control</li>
                <li>• Comments & feedback</li>
                <li>• Export options</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-400 mb-2">Project Management</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Board organization</li>
                <li>• Template library</li>
                <li>• Progress tracking</li>
                <li>• Team permissions</li>
                <li>• Analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Whiteboard Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default WhiteboardDemo; 