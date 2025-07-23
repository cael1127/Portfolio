import React, { useState, useEffect } from 'react';

const PortfolioBuilderDemo = () => {
  const [templates, setTemplates] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalTemplates: 0,
    activeProjects: 0,
    averageRating: 0,
    deploymentSuccess: 0
  });

  // Initialize portfolio builder data
  useEffect(() => {
    const initialTemplates = [
      {
        id: 1,
        name: 'Modern Developer',
        category: 'Technology',
        status: 'active',
        rating: 4.8,
        downloads: 1247,
        lastUpdate: '1 minute ago',
        alerts: [],
        features: ['Responsive Design', 'Dark Mode', 'Animations', 'SEO Optimized'],
        preview: {
          sections: 8,
          components: 24,
          loadTime: 1.2,
          mobileScore: 95
        },
        customization: {
          colors: 12,
          fonts: 8,
          layouts: 6,
          animations: 15
        }
      },
      {
        id: 2,
        name: 'Creative Artist',
        category: 'Creative',
        status: 'active',
        rating: 4.6,
        downloads: 892,
        lastUpdate: '2 minutes ago',
        alerts: [],
        features: ['Portfolio Gallery', 'Video Backgrounds', 'Creative Animations', 'Social Integration'],
        preview: {
          sections: 6,
          components: 18,
          loadTime: 1.8,
          mobileScore: 88
        },
        customization: {
          colors: 15,
          fonts: 12,
          layouts: 8,
          animations: 22
        }
      },
      {
        id: 3,
        name: 'Business Professional',
        category: 'Business',
        status: 'warning',
        rating: 4.4,
        downloads: 567,
        lastUpdate: 'Just now',
        alerts: ['Template update available', 'Performance optimization needed'],
        features: ['Contact Forms', 'Analytics Integration', 'Professional Layout', 'Fast Loading'],
        preview: {
          sections: 5,
          components: 16,
          loadTime: 0.9,
          mobileScore: 92
        },
        customization: {
          colors: 8,
          fonts: 6,
          layouts: 4,
          animations: 10
        }
      }
    ];
    setTemplates(initialTemplates);
    setSystemStats({
      totalTemplates: initialTemplates.length,
      activeProjects: 156,
      averageRating: 4.6,
      deploymentSuccess: 98.5
    });
  }, []);

  // Simulate real-time template updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTemplates(prevTemplates => prevTemplates.map(template => {
        const newTemplate = {
          ...template,
          downloads: template.downloads + Math.floor(Math.random() * 5),
          lastUpdate: 'Just now'
        };

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newTemplate.downloads > 1000 && template.downloads <= 1000) {
          newAlerts.push('Popular template milestone');
        }
        if (newTemplate.preview.loadTime > 2) {
          newAlerts.push('Performance optimization needed');
        }
        if (newTemplate.preview.mobileScore < 90) {
          newAlerts.push('Mobile optimization required');
        }

        newTemplate.alerts = newAlerts;
        newTemplate.status = newAlerts.length > 2 ? 'critical' : 
                            newAlerts.length > 0 ? 'warning' : 'active';
        
        return newTemplate;
      }));

      setSystemStats(prev => ({
        ...prev,
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3),
        averageRating: Math.max(4.0, Math.min(5.0, prev.averageRating + (Math.random() - 0.5) * 0.1))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Generate current project data
  useEffect(() => {
    const newProject = {
      id: 1,
      name: 'John Doe Portfolio',
      template: 'Modern Developer',
      status: 'in-progress',
      progress: 75,
      lastSaved: '2 minutes ago',
      sections: [
        { name: 'Hero Section', status: 'completed', components: 3 },
        { name: 'About Me', status: 'completed', components: 2 },
        { name: 'Skills', status: 'in-progress', components: 1 },
        { name: 'Projects', status: 'pending', components: 0 },
        { name: 'Contact', status: 'pending', components: 0 }
      ],
      analytics: {
        pageViews: 1247,
        uniqueVisitors: 892,
        bounceRate: 23.5,
        avgSessionTime: '2:34'
      }
    };
    setCurrentProject(newProject);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = templates.flatMap(template => 
        template.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          template: template.name,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 6000);

    return () => clearInterval(interval);
  }, [templates]);

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

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎨 Portfolio Builder Platform</h1>
          <p className="text-gray-300 text-lg">
            Drag-and-drop website builder with professional templates, real-time preview, and deployment analytics
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Templates</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalTemplates}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Projects</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.activeProjects}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Rating</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageRating.toFixed(1)}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">✅</div>
            <h3 className="text-xl font-semibold text-white mb-2">Deployment Success</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.deploymentSuccess}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Template Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Template Gallery</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all ' + (
                      selectedTemplate?.id === template.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{template.name}</h3>
                        <p className="text-gray-400 text-sm">{template.category} • ⭐ {template.rating}</p>
                        <p className={'text-sm ' + getStatusColor(template.status)}>
                          {template.status}
                        </p>
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(template.status)}>
                          {template.status}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(template.status)}>
                          {template.alerts.length} alerts
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{template.lastUpdate}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Downloads</p>
                        <p className="text-white font-semibold">{template.downloads.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Features</p>
                        <p className="text-white">{template.features.length}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Performance Score</span>
                        <span>{template.preview.mobileScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            template.preview.mobileScore > 90 ? 'bg-green-500' : 
                            template.preview.mobileScore > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: template.preview.mobileScore + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Project & Alerts */}
          <div className="space-y-6">
            {/* Current Project */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📝 Current Project</h2>
              {currentProject ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold">{currentProject.name}</h3>
                    <p className="text-blue-200 text-sm">Template: {currentProject.template}</p>
                    <p className="text-gray-300 text-xs">{currentProject.lastSaved}</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Progress</span>
                      <span className={'font-semibold ' + getProgressColor(currentProject.progress)}>
                        {currentProject.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={'h-2 rounded-full ' + (
                          currentProject.progress >= 80 ? 'bg-green-500' : 
                          currentProject.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        )}
                                                  style={{ width: currentProject.progress + '%' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-300 text-sm">Sections:</p>
                    {currentProject.sections.map((section, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">{section.name}</span>
                        <span className={'px-2 py-1 rounded ' + (
                          section.status === 'completed' ? 'bg-green-600 text-white' :
                          section.status === 'in-progress' ? 'bg-yellow-600 text-white' :
                          'bg-gray-600 text-white'
                        )}>
                          {section.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">📝</div>
                  <p className="text-gray-300">No active project</p>
                </div>
              )}
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
                          <p className="text-white font-semibold">{alert.template}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
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
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Builder Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Create New Project
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Preview Project
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Deploy Website
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Template Details */}
        {selectedTemplate && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedTemplate.name} Details</h2>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Template Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Category</span>
                    <span className="text-lg font-semibold text-white">{selectedTemplate.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Rating</span>
                    <span className="text-lg font-semibold text-white">⭐ {selectedTemplate.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Downloads</span>
                    <span className="text-lg font-semibold text-white">{selectedTemplate.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status</span>
                    <span className={'px-2 py-1 rounded text-sm ' + getStatusBg(selectedTemplate.status)}>
                      {selectedTemplate.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Sections</span>
                    <span className="text-lg font-semibold text-white">{selectedTemplate.preview.sections}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Components</span>
                    <span className="text-lg font-semibold text-white">{selectedTemplate.preview.components}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Load Time</span>
                    <span className="text-lg font-semibold text-white">{selectedTemplate.preview.loadTime}s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Mobile Score</span>
                    <span className={'text-lg font-semibold ' + (
                      selectedTemplate.preview.mobileScore > 90 ? 'text-green-400' : 'text-yellow-400'
                    )}>
                      {selectedTemplate.preview.mobileScore}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">✨ Features</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  {selectedTemplate.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Builder Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🚀 Advanced Portfolio Builder Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Drag & Drop Editor</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Visual page builder</li>
                <li>• Component library</li>
                <li>• Real-time preview</li>
                <li>• Responsive design</li>
                <li>• Custom animations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Template System</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Professional templates</li>
                <li>• Category filtering</li>
                <li>• Customization options</li>
                <li>• Version control</li>
                <li>• Template marketplace</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Deployment & Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• One-click deployment</li>
                <li>• Performance monitoring</li>
                <li>• SEO optimization</li>
                <li>• Analytics integration</li>
                <li>• Backup & restore</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderDemo; 