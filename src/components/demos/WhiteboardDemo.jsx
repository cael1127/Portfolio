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

  `;

  // Initialize data
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
        project: 'Q4 Campaign Planning',
        elements: 203,
        collaborators: 6,
        status: 'active',
        lastUpdate: 'Just now',
        createdBy: 'Emily Rodriguez',
        createdAt: '2024-01-10',
        features: ['Mind Maps', 'Flowcharts', 'Presentations', 'Collaboration'],
        tools: ['Pen', 'Shapes', 'Text', 'Sticky Notes', 'Images'],
        collaboration: {
          activeUsers: 4,
          totalEdits: 445,
          lastEdit: 'Just now',
          syncStatus: 'synced'
        },
        analytics: {
          sessionTime: 67,
          elementsCreated: 203,
          comments: 34,
          exports: 8
        }
      }
    ];

    const initialUsers = [
      {
        id: 1,
        username: 'Sarah Johnson',
        status: 'online',
        currentBoard: 'Product Design Sprint',
        sessionTime: 45,
        lastActivity: 'Just now',
        avatar: '👩‍💼'
      },
      {
        id: 2,
        username: 'Mike Chen',
        status: 'online',
        currentBoard: 'Architecture Planning',
        sessionTime: 32,
        lastActivity: '1 minute ago',
        avatar: '👨‍💼'
      },
      {
        id: 3,
        username: 'Emily Rodriguez',
        status: 'online',
        currentBoard: 'Marketing Strategy',
        sessionTime: 67,
        lastActivity: 'Just now',
        avatar: '👩‍🎨'
      },
      {
        id: 4,
        username: 'David Kim',
        status: 'away',
        currentBoard: 'Product Design Sprint',
        sessionTime: 23,
        lastActivity: '5 minutes ago',
        avatar: '👨‍💻'
      }
    ];

    setWhiteboards(initialWhiteboards);
    setActiveUsers(initialUsers);
    setWhiteboardStats({
      totalWhiteboards: initialWhiteboards.length,
      activeUsers: initialUsers.filter(u => u.status === 'online').length,
      totalElements: initialWhiteboards.reduce((sum, board) => sum + board.elements, 0),
      averageSessionTime: Math.round(initialUsers.reduce((sum, user) => sum + user.sessionTime, 0) / initialUsers.length),
      collaborationScore: 87.5,
      realTimeSync: 99.2,
      dailyCreations: 3,
      monthlyCollaborations: 156
    });
  }, []);

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

export default WhiteboardDemo; 