import React, { useState, useEffect } from 'react';

const WhiteboardDemo = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalProjects: 0,
    activeUsers: 0,
    averageSessionTime: 0,
    collaborationRate: 0
  });

  // Initialize whiteboard data
  useEffect(() => {
    const initialProjects = [
      {
        id: 1,
        name: 'Product Architecture',
        creator: 'Sarah Johnson',
        status: 'active',
        participants: 4,
        lastUpdate: '2 minutes ago',
        alerts: [],
        details: {
          type: 'Architecture',
          elements: 24,
          layers: 3,
          version: 'v2.1'
        },
        analytics: {
          sessionTime: 45,
          collaborationScore: 92,
          elementsAdded: 18,
          comments: 12
        }
      },
      {
        id: 2,
        name: 'UI/UX Design',
        creator: 'Mike Chen',
        status: 'active',
        participants: 3,
        lastUpdate: '1 minute ago',
        alerts: [],
        details: {
          type: 'Design',
          elements: 31,
          layers: 5,
          version: 'v1.8'
        },
        analytics: {
          sessionTime: 32,
          collaborationScore: 88,
          elementsAdded: 25,
          comments: 8
        }
      },
      {
        id: 3,
        name: 'System Flow',
        creator: 'Alex Rodriguez',
        status: 'warning',
        participants: 6,
        lastUpdate: 'Just now',
        alerts: ['High complexity', 'Multiple editors'],
        details: {
          type: 'Flowchart',
          elements: 47,
          layers: 7,
          version: 'v3.2'
        },
        analytics: {
          sessionTime: 78,
          collaborationScore: 76,
          elementsAdded: 42,
          comments: 23
        }
      }
    ];
    setProjects(initialProjects);
    setSystemStats({
      totalProjects: 89,
      activeUsers: 12,
      averageSessionTime: 52.3,
      collaborationRate: 85.7
    });
  }, []);

  // Simulate real-time project updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prevProjects => prevProjects.map(project => {
        const newProject = {
          ...project,
          participants: project.participants + Math.floor((Math.random() - 0.5) * 2),
          lastUpdate: 'Just now'
        };

        // Update analytics
        newProject.analytics = {
          ...project.analytics,
          sessionTime: project.analytics.sessionTime + Math.floor(Math.random() * 5),
          elementsAdded: project.analytics.elementsAdded + Math.floor(Math.random() * 3),
          collaborationScore: Math.max(60, Math.min(98, project.analytics.collaborationScore + (Math.random() - 0.5) * 2))
        };

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newProject.analytics.sessionTime > 60) {
          newAlerts.push('Long session detected');
        }
        if (newProject.analytics.elementsAdded > 40) {
          newAlerts.push('High complexity');
        }
        if (newProject.participants > 5) {
          newAlerts.push('Multiple editors');
        }

        newProject.alerts = newAlerts;
        newProject.status = newAlerts.length > 2 ? 'critical' : 
                          newAlerts.length > 0 ? 'warning' : 'active';
        
        return newProject;
      }));

      setSystemStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 5) + 10,
        averageSessionTime: Math.max(30, Math.min(80, prev.averageSessionTime + (Math.random() - 0.5) * 2))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate active users data
  useEffect(() => {
    const newUsers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Creator',
        status: 'online',
        lastActivity: '2 minutes ago',
        tools: ['Pen', 'Shape', 'Text'],
        sessionTime: '45 min'
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Editor',
        status: 'online',
        lastActivity: '1 minute ago',
        tools: ['Eraser', 'Select', 'Move'],
        sessionTime: '32 min'
      },
      {
        id: 3,
        name: 'Alex Rodriguez',
        role: 'Viewer',
        status: 'away',
        lastActivity: '5 minutes ago',
        tools: ['View', 'Comment'],
        sessionTime: '18 min'
      }
    ];
    setActiveUsers(newUsers);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = projects.flatMap(project => 
        project.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          project: project.name,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, [projects]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'away': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎨 Collaborative Whiteboard</h1>
          <p className="text-gray-300 text-lg">
            Real-time collaborative drawing platform with advanced tools, version control, and team coordination
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalProjects}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeUsers}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Session</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageSessionTime.toFixed(0)}m</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-2">Collaboration Rate</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.collaborationRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Project Management</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedProject?.id === project.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                        <p className="text-gray-400 text-sm">by {project.creator} • {project.lastUpdate}</p>
                        <p className={'text-sm ' + getStatusColor(project.status)}>
                          {project.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(project.status)}>
                          {project.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{project.participants} participants</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Elements</p>
                        <p className="text-white font-semibold">{project.details.elements}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Layers</p>
                        <p className="text-white">{project.details.layers}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Collaboration Score</span>
                        <span>{project.analytics.collaborationScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            project.analytics.collaborationScore > 90 ? 'bg-green-500' : 
                            project.analytics.collaborationScore > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${project.analytics.collaborationScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Users & Alerts */}
          <div className="space-y-6">
            {/* Active Users */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Active Users</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {activeUsers.map((user) => (
                  <div key={user.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{user.name}</p>
                        <p className="text-blue-200 text-sm">{user.role} • {user.sessionTime}</p>
                        <p className={'text-gray-300 text-xs ' + getUserStatusColor(user.status)}>
                          {user.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-300">{user.tools.length} tools</div>
                        <p className="text-gray-300 text-xs mt-1">{user.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.tools.map((tool, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 System Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.project}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Whiteboard Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  New Project
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Share Project
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Export Canvas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        {selectedProject && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedProject.name} Details</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Project Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Creator</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.creator}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Type</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.details.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Version</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.details.version}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={'px-2 py-1 rounded text-sm ' + getStatusBg(selectedProject.status)}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Analytics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Session Time</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.analytics.sessionTime} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Elements Added</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.analytics.elementsAdded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Comments</span>
                    <span className="text-lg font-semibold text-white">{selectedProject.analytics.comments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Collaboration Score</span>
                    <span className={`text-lg font-semibold ${
                      selectedProject.analytics.collaborationScore > 90 ? 'text-green-400' : 
                      selectedProject.analytics.collaborationScore > 80 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedProject.analytics.collaborationScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Canvas Preview */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">🎨 Canvas Preview</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p className="text-gray-600 font-semibold">{selectedProject.name}</p>
                    <p className="text-gray-500 text-sm">{selectedProject.details.elements} elements • {selectedProject.details.layers} layers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Whiteboard Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced Whiteboard Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Drawing Tools</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Freehand drawing</li>
                <li>• Shape tools</li>
                <li>• Text & annotations</li>
                <li>• Color palette</li>
                <li>• Layer management</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Collaboration</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time sync</li>
                <li>• Multi-user editing</li>
                <li>• Version control</li>
                <li>• Comments & feedback</li>
                <li>• Export options</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Analytics & Insights</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Session tracking</li>
                <li>• User activity</li>
                <li>• Performance metrics</li>
                <li>• Usage patterns</li>
                <li>• Collaboration scores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardDemo; 