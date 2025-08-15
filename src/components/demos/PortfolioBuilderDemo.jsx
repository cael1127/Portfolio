import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const PortfolioBuilderDemo = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState({});
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [builderStats, setBuilderStats] = useState({
    totalPortfolios: 0,
    activeUsers: 0,
    totalViews: 0,
    averageRating: 0,
    templatesUsed: 0,
    collaborationSessions: 0,
    dailyCreations: 0,
    monthlyViews: 0
  });

  // Sample code for the demo
  const demoCode = `/**
 * Portfolio Builder Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a drag-and-drop portfolio builder
 * with template system, responsive design, and deployment features.
 */

import React, { useState, useEffect } from 'react';

const PortfolioBuilderDemo = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolios(prev => prev.map(portfolio => ({
        ...portfolio,
        views: portfolio.views + Math.floor(Math.random() * 5),
        lastUpdate: 'Just now'
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const createPortfolio = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    const newPortfolio = {
      id: Date.now(),
      name: 'New Portfolio',
      template: template.name,
      status: 'draft',
      createdAt: new Date().toISOString()
    };
    setPortfolios(prev => [newPortfolio, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio List */}
        <div className="space-y-4">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{portfolio.name}</h3>
              <p className="text-gray-300 text-sm">{portfolio.template} template</p>
              <p className="text-gray-400 text-xs">{portfolio.views} views</p>
            </div>
          ))}
        </div>
        
        {/* Templates */}
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-gray-300 text-sm">{template.category}</p>
              <p className="text-gray-400 text-xs">⭐ {template.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderDemo;`;

  useEffect(() => {
    // Initialize portfolio builder data
    const initialPortfolios = [
      {
        id: 1,
        name: 'John Developer Portfolio',
        template: 'Modern Developer',
        status: 'published',
        views: 1247,
        rating: 4.8,
        lastUpdate: 'Just now',
        category: 'Developer',
        author: 'john_dev',
        createdAt: '2024-01-15',
        features: ['Responsive Design', 'Dark Mode', 'Project Showcase', 'Contact Form'],
        sections: ['About', 'Skills', 'Projects', 'Experience', 'Contact'],
        collaboration: {
          active: true,
          collaborators: 2,
          lastEdit: '2 minutes ago'
        },
        analytics: {
          pageViews: 1247,
          uniqueVisitors: 892,
          averageTime: 3.2,
          bounceRate: 0.28
        }
      },
      {
        id: 2,
        name: 'Sarah Designer Portfolio',
        template: 'Creative Designer',
        status: 'published',
        views: 892,
        rating: 4.9,
        lastUpdate: '1 minute ago',
        category: 'Designer',
        author: 'sarah_design',
        createdAt: '2024-01-10',
        features: ['Portfolio Gallery', 'Animation Effects', 'Social Links', 'Testimonials'],
        sections: ['About', 'Portfolio', 'Services', 'Testimonials', 'Contact'],
        collaboration: {
          active: false,
          collaborators: 1,
          lastEdit: '1 hour ago'
        },
        analytics: {
          pageViews: 892,
          uniqueVisitors: 567,
          averageTime: 4.1,
          bounceRate: 0.22
        }
      },
      {
        id: 3,
        name: 'Mike Marketing Portfolio',
        template: 'Business Professional',
        status: 'draft',
        views: 0,
        rating: 0,
        lastUpdate: '3 minutes ago',
        category: 'Marketing',
        author: 'mike_marketing',
        createdAt: '2024-01-20',
        features: ['Case Studies', 'Metrics Dashboard', 'Client Testimonials', 'Blog'],
        sections: ['About', 'Services', 'Case Studies', 'Blog', 'Contact'],
        collaboration: {
          active: true,
          collaborators: 3,
          lastEdit: 'Just now'
        },
        analytics: {
          pageViews: 0,
          uniqueVisitors: 0,
          averageTime: 0,
          bounceRate: 0
        }
      },
      {
        id: 4,
        name: 'Emma Writer Portfolio',
        template: 'Content Creator',
        status: 'published',
        views: 567,
        rating: 4.7,
        lastUpdate: '5 minutes ago',
        category: 'Writer',
        author: 'emma_writer',
        createdAt: '2024-01-08',
        features: ['Blog Integration', 'Article Showcase', 'Newsletter Signup', 'Social Media'],
        sections: ['About', 'Writing Samples', 'Blog', 'Services', 'Contact'],
        collaboration: {
          active: false,
          collaborators: 1,
          lastEdit: '2 hours ago'
        },
        analytics: {
          pageViews: 567,
          uniqueVisitors: 423,
          averageTime: 2.8,
          bounceRate: 0.35
        }
      },
      {
        id: 5,
        name: 'Alex Photographer Portfolio',
        template: 'Visual Artist',
        status: 'published',
        views: 2341,
        rating: 4.9,
        lastUpdate: '10 minutes ago',
        category: 'Photographer',
        author: 'alex_photo',
        createdAt: '2024-01-05',
        features: ['Image Gallery', 'Lightbox View', 'Booking System', 'Social Sharing'],
        sections: ['About', 'Gallery', 'Services', 'Pricing', 'Contact'],
        collaboration: {
          active: false,
          collaborators: 1,
          lastEdit: '1 day ago'
        },
        analytics: {
          pageViews: 2341,
          uniqueVisitors: 1567,
          averageTime: 5.4,
          bounceRate: 0.18
        }
      }
    ];

    const initialTemplates = [
      {
        id: 1,
        name: 'Modern Developer',
        category: 'Developer',
        rating: 4.8,
        downloads: 1247,
        price: 0,
        features: ['Responsive Design', 'Dark Mode', 'Project Showcase', 'Contact Form'],
        preview: 'modern-dev.jpg',
        lastUpdate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Creative Designer',
        category: 'Designer',
        rating: 4.9,
        downloads: 892,
        price: 29,
        features: ['Portfolio Gallery', 'Animation Effects', 'Social Links', 'Testimonials'],
        preview: 'creative-design.jpg',
        lastUpdate: '2024-01-12'
      },
      {
        id: 3,
        name: 'Business Professional',
        category: 'Business',
        rating: 4.7,
        downloads: 567,
        price: 19,
        features: ['Case Studies', 'Metrics Dashboard', 'Client Testimonials', 'Blog'],
        preview: 'business-pro.jpg',
        lastUpdate: '2024-01-10'
      },
      {
        id: 4,
        name: 'Content Creator',
        category: 'Writer',
        rating: 4.6,
        downloads: 423,
        price: 0,
        features: ['Blog Integration', 'Article Showcase', 'Newsletter Signup', 'Social Media'],
        preview: 'content-creator.jpg',
        lastUpdate: '2024-01-08'
      },
      {
        id: 5,
        name: 'Visual Artist',
        category: 'Photographer',
        rating: 4.9,
        downloads: 1567,
        price: 39,
        features: ['Image Gallery', 'Lightbox View', 'Booking System', 'Social Sharing'],
        preview: 'visual-artist.jpg',
        lastUpdate: '2024-01-05'
      }
    ];

    const initialActiveUsers = [
      {
        id: 1,
        username: 'john_dev',
        avatar: '👨‍💻',
        currentPortfolio: 'John Developer Portfolio',
        status: 'editing',
        lastActivity: 'Just now',
        sessionTime: 45,
        projects: 12
      },
      {
        id: 2,
        username: 'sarah_design',
        avatar: '👩‍🎨',
        currentPortfolio: 'Sarah Designer Portfolio',
        status: 'viewing',
        lastActivity: '2 minutes ago',
        sessionTime: 23,
        projects: 8
      },
      {
        id: 3,
        username: 'mike_marketing',
        avatar: '👨‍💼',
        currentPortfolio: 'Mike Marketing Portfolio',
        status: 'editing',
        lastActivity: 'Just now',
        sessionTime: 67,
        projects: 15
      },
      {
        id: 4,
        username: 'emma_writer',
        avatar: '👩‍💻',
        currentPortfolio: 'Emma Writer Portfolio',
        status: 'idle',
        lastActivity: '5 minutes ago',
        sessionTime: 12,
        projects: 6
      },
      {
        id: 5,
        username: 'alex_photo',
        avatar: '👨‍📷',
        currentPortfolio: 'Alex Photographer Portfolio',
        status: 'viewing',
        lastActivity: '1 minute ago',
        sessionTime: 34,
        projects: 20
      }
    ];

    setPortfolios(initialPortfolios);
    setTemplates(initialTemplates);
    setActiveUsers(initialActiveUsers);
  }, []);

  useEffect(() => {
    // Simulate real-time portfolio builder updates
    const interval = setInterval(() => {
      // Update portfolios
      setPortfolios(prev => prev.map(portfolio => ({
        ...portfolio,
        views: portfolio.status === 'published' ? portfolio.views + Math.floor(Math.random() * 3) : portfolio.views,
        lastUpdate: 'Just now'
      })));

      // Update active users
      setActiveUsers(prev => prev.map(user => ({
        ...user,
        sessionTime: user.sessionTime + 1,
        lastActivity: 'Just now'
      })));

      // Update builder stats
      setBuilderStats(prev => ({
        totalPortfolios: portfolios.length,
        activeUsers: activeUsers.length,
        totalViews: portfolios.reduce((sum, p) => sum + p.views, 0),
        averageRating: portfolios.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / Math.max(1, portfolios.filter(p => p.rating > 0).length),
        templatesUsed: templates.length,
        collaborationSessions: activeUsers.filter(u => u.status === 'editing').length,
        dailyCreations: Math.floor(Math.random() * 50) + 20,
        monthlyViews: prev.monthlyViews + Math.random() * 1000
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [portfolios, activeUsers, templates]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-400';
      case 'draft': return 'text-yellow-400';
      case 'archived': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'published': return 'bg-green-600';
      case 'draft': return 'bg-yellow-600';
      case 'archived': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const getUserStatusColor = (status) => {
    switch (status) {
      case 'editing': return 'text-blue-400';
      case 'viewing': return 'text-green-400';
      case 'idle': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getUserStatusBg = (status) => {
    switch (status) {
      case 'editing': return 'bg-blue-600';
      case 'viewing': return 'bg-green-600';
      case 'idle': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
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
            <h1 className="text-4xl font-bold text-blue-400 mb-4">🎨 Advanced Portfolio Builder</h1>
            <p className="text-gray-300 text-lg">
              Professional portfolio creation platform with templates, collaboration, and real-time analytics
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

        {/* Builder Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Portfolios</h3>
            <p className="text-3xl font-bold text-blue-400">{builderStats.totalPortfolios}</p>
            <p className="text-blue-300 text-sm">{builderStats.dailyCreations} created today</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-400">{builderStats.activeUsers}</p>
            <p className="text-green-300 text-sm">{builderStats.collaborationSessions} collaborating</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">👁️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-purple-400">{formatNumber(builderStats.totalViews)}</p>
            <p className="text-purple-300 text-sm">{formatNumber(builderStats.monthlyViews)} monthly</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Rating</h3>
            <p className="text-3xl font-bold text-yellow-400">{builderStats.averageRating.toFixed(1)}</p>
            <p className="text-yellow-300 text-sm">{builderStats.templatesUsed} templates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🎨 Portfolio Management</h2>
                <div className="text-sm text-blue-300">Real-time updates every 4s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {portfolios.map((portfolio) => (
                  <div
                    key={portfolio.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedPortfolio?.id === portfolio.id
                        ? 'border-blue-400 bg-blue-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedPortfolio(portfolio)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{portfolio.name}</h3>
                        <p className="text-blue-200 text-sm">{portfolio.template} • {portfolio.category}</p>
                        <p className="text-blue-200 text-xs">By {portfolio.author} • {portfolio.createdAt}</p>
                        <p className="text-gray-300 text-xs">{portfolio.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(portfolio.status)}>
                          {portfolio.status.toUpperCase()}
                        </div>
                        <p className="text-white text-lg font-semibold mt-1">{formatNumber(portfolio.views)}</p>
                        <p className="text-gray-300 text-xs">⭐ {portfolio.rating}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Sections</p>
                        <p className="text-white font-semibold">{portfolio.sections.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Features</p>
                        <p className="text-white font-semibold">{portfolio.features.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Collaboration</p>
                        <p className="text-white font-semibold">{portfolio.collaboration.collaborators}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Analytics</span>
                        <span>{portfolio.analytics.uniqueVisitors} unique visitors</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + (
                            portfolio.analytics.bounceRate < 0.3 ? 'bg-green-500' : 
                            portfolio.analytics.bounceRate < 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: Math.max((1 - portfolio.analytics.bounceRate) * 100, 10) + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Analytics */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-4">📋 Templates</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {templates.map((template) => (
                  <div key={template.id} className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{template.name}</p>
                        <p className="text-green-200 text-sm">{template.category}</p>
                        <p className="text-green-200 text-xs">{template.features.length} features</p>
                        <p className="text-gray-300 text-xs">{template.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">⭐ {template.rating}</p>
                        <p className="text-green-300 text-xs">{formatNumber(template.downloads)} downloads</p>
                        <p className="text-gray-300 text-xs">{template.price === 0 ? 'Free' : '$' + template.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Users */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Active Users</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {activeUsers.map((user) => (
                  <div key={user.id} className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <p className="text-white font-semibold">{user.username}</p>
                          <p className="text-purple-200 text-sm">{user.currentPortfolio}</p>
                          <p className="text-purple-200 text-xs">{user.projects} projects</p>
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

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚡ Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>➕</span>
                    <span>Create New Portfolio</span>
                  </div>
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📋</span>
                    <span>Browse Templates</span>
                  </div>
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>👥</span>
                    <span>Invite Collaborators</span>
                  </div>
                </button>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <span>📊</span>
                    <span>View Analytics</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Details Modal */}
        {selectedPortfolio && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Portfolio Details</h2>
                <button
                  onClick={() => setSelectedPortfolio(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Portfolio Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Template:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.template}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={'font-semibold ' + getStatusColor(selectedPortfolio.status)}>
                        {selectedPortfolio.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Author:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.author}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.createdAt}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Analytics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Page Views:</span>
                      <span className="text-white font-semibold">{formatNumber(selectedPortfolio.analytics.pageViews)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Unique Visitors:</span>
                      <span className="text-white font-semibold">{formatNumber(selectedPortfolio.analytics.uniqueVisitors)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Time:</span>
                      <span className="text-white font-semibold">{selectedPortfolio.analytics.averageTime}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Bounce Rate:</span>
                      <span className="text-white font-semibold">{(selectedPortfolio.analytics.bounceRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-purple-400 mb-3 mt-4">Sections</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPortfolio.sections.map((section, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                        {section}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3 mt-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPortfolio.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Builder Features */}
        <div className="mt-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Portfolio Builder Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Template System</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Professional templates</li>
                <li>• Customizable themes</li>
                <li>• Responsive design</li>
                <li>• SEO optimization</li>
                <li>• Mobile-first approach</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Collaboration Tools</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time editing</li>
                <li>• Version control</li>
                <li>• Comment system</li>
                <li>• Team permissions</li>
                <li>• Live preview</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Analytics & Insights</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Visitor tracking</li>
                <li>• Performance metrics</li>
                <li>• A/B testing</li>
                <li>• Conversion tracking</li>
                <li>• SEO analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        code={demoCode}
        language="jsx"
        title="Portfolio Builder Demo Code"
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
      />
    </div>
  );
};

export default PortfolioBuilderDemo; 