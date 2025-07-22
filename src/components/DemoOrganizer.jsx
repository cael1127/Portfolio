import React, { useState } from 'react';

const DemoOrganizer = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const demoCategories = {
    'ai-ml': {
      name: '🤖 AI & Machine Learning',
      description: 'Artificial intelligence and machine learning applications',
      demos: [
        {
          id: 'fraud-detection',
          name: 'Fraud Detection System',
          description: 'AI-powered financial fraud detection with real-time analysis',
          icon: '🔍',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
          features: ['Real-time analysis', 'Pattern recognition', 'Risk scoring']
        },
        {
          id: 'deepfake-detection',
          name: 'Deepfake Detection',
          description: 'Advanced deepfake detection using computer vision',
          icon: '🎭',
          difficulty: 'Advanced',
          technologies: ['Python', 'OpenCV', 'TensorFlow'],
          features: ['Face analysis', 'Video processing', 'Confidence scoring']
        },
        {
          id: 'resumeanalyzer',
          name: 'AI Resume Analyzer',
          description: 'Intelligent resume analysis with skill matching',
          icon: '📄',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'Machine Learning'],
          features: ['Skill extraction', 'Candidate scoring', 'Recommendations']
        },
        {
          id: 'aiassistant',
          name: 'AI Assistant',
          description: 'Intelligent conversational AI with natural language processing',
          icon: '💬',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'API Integration'],
          features: ['Natural conversations', 'Context awareness', 'Smart responses']
        }
      ]
    },
    'blockchain': {
      name: '🔗 Blockchain & Web3',
      description: 'Decentralized applications and blockchain technology',
      demos: [
        {
          id: 'blockchain',
          name: 'Blockchain Supply Chain',
          description: 'Complete blockchain implementation with smart contracts',
          icon: '🔗',
          difficulty: 'Advanced',
          technologies: ['Solidity', 'Web3.js', 'React'],
          features: ['Smart contracts', 'Transaction mining', 'Supply chain tracking'],
          hasProjectPage: true
        }
      ]
    },
    'iot-sensors': {
      name: '📡 IoT & Sensor Systems',
      description: 'Internet of Things and sensor monitoring applications',
      demos: [
        {
          id: 'aquaculture',
          name: 'Smart Aquaculture',
          description: 'AI-powered aquaculture monitoring with predictive analytics',
          icon: '🌊',
          difficulty: 'Advanced',
          technologies: ['IoT Sensors', 'React', 'Machine Learning'],
          features: ['Real-time monitoring', 'Predictive analytics', 'Water quality'],
          hasProjectPage: true
        },
        {
          id: 'smartcity',
          name: 'Smart City Infrastructure',
          description: 'Comprehensive smart city monitoring and management',
          icon: '🏙️',
          difficulty: 'Advanced',
          technologies: ['IoT', 'React', 'Data Analytics'],
          features: ['Traffic management', 'Energy monitoring', 'Infrastructure']
        }
      ]
    },
    'business-apps': {
      name: '💼 Business Applications',
      description: 'Enterprise and business management solutions',
      demos: [
        {
          id: 'logistics',
          name: 'Smart Logistics Platform',
          description: 'AI-powered fleet management and route optimization',
          icon: '🚚',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'GPS Integration'],
          features: ['Route optimization', 'Fleet tracking', 'Predictive analytics']
        },
        {
          id: 'healthcare',
          name: 'Healthcare Analytics',
          description: 'AI-powered patient monitoring and medical analytics',
          icon: '🏥',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'HIPAA Compliance'],
          features: ['Patient monitoring', 'Predictive diagnostics', 'Medical alerts'],
          hasProjectPage: true
        },
        {
          id: 'financial',
          name: 'Financial Analytics Platform',
          description: 'Advanced financial analysis and portfolio management',
          icon: '💰',
          difficulty: 'Advanced',
          technologies: ['React', 'Financial APIs', 'Data Visualization'],
          features: ['Portfolio management', 'Market analysis', 'Risk assessment']
        },
        {
          id: 'restaurantapp',
          name: 'Restaurant Management System',
          description: 'Complete restaurant management and ordering platform',
          icon: '🍽️',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Real-time updates'],
          features: ['Order management', 'Inventory tracking', 'Analytics']
        }
      ]
    },
    'creative-tools': {
      name: '🎨 Creative & Development Tools',
      description: 'Creative applications and development tools',
      demos: [
        {
          id: 'whiteboard',
          name: 'Collaborative Whiteboard',
          description: 'Real-time collaborative drawing and design platform',
          icon: '🎨',
          difficulty: 'Intermediate',
          technologies: ['React', 'Canvas API', 'WebRTC'],
          features: ['Real-time collaboration', 'Drawing tools', 'Project management']
        },
        {
          id: 'portfoliobuilder',
          name: 'Portfolio Builder',
          description: 'Drag-and-drop website builder for portfolios',
          icon: '🌐',
          difficulty: 'Intermediate',
          technologies: ['React', 'Drag & Drop', 'Template System'],
          features: ['Visual editor', 'Template library', 'Deployment']
        }
      ]
    },
    'entertainment': {
      name: '🎮 Entertainment & Gaming',
      description: 'Gaming and entertainment applications',
      demos: [
        {
          id: 'gameplatform',
          name: 'Multiplayer Gaming Platform',
          description: 'Interactive multiplayer gaming with real-time features',
          icon: '🎮',
          difficulty: 'Advanced',
          technologies: ['React', 'WebSocket', 'Game Engine'],
          features: ['Multiplayer games', 'Real-time chat', 'Leaderboards']
        }
      ]
    }
  };

  const allDemos = Object.values(demoCategories).flatMap(category => 
    category.demos.map(demo => ({ ...demo, category: category.name }))
  );

  const filteredDemos = allDemos.filter(demo => {
    const matchesCategory = selectedCategory === 'all' || 
      Object.keys(demoCategories).find(key => demoCategories[key].demos.includes(demo));
    const matchesSearch = demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎯 Demo Collection</h1>
          <p className="text-gray-300 text-lg">
            Explore our comprehensive collection of interactive demos organized by category
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search demos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All Demos
              </button>
              {Object.entries(demoCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === key
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Overview */}
        {selectedCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">📂 Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(demoCategories).map(([key, category]) => (
                <div
                  key={key}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-colors cursor-pointer"
                  onClick={() => setSelectedCategory(key)}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{category.name.split(' ')[0]}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{category.name.split(' ').slice(1).join(' ')}</h3>
                      <p className="text-gray-400 text-sm">{category.demos.length} demos</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Demos Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'all' ? 'All Demos' : demoCategories[selectedCategory]?.name}
            </h2>
            <p className="text-gray-400">{filteredDemos.length} demos found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemos.map((demo) => (
              <div
                key={demo.id}
                className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-all cursor-pointer group"
                onClick={() => setCurrentPage(demo.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{demo.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {demo.name}
                      </h3>
                      <div className={`px-2 py-1 rounded text-xs ${getDifficultyBg(demo.difficulty)}`}>
                        {demo.difficulty}
                      </div>
                    </div>
                  </div>
                  <button className="text-green-400 hover:text-green-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </button>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{demo.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-1">
                    {demo.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {demo.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-gray-300 text-xs flex items-center">
                        <span className="text-green-400 mr-1">•</span>
                        {feature}
                      </li>
                    ))}
                    {demo.features.length > 3 && (
                      <li className="text-gray-400 text-xs">+{demo.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>
                
                {demo.hasProjectPage && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage(demo.id + '-project');
                      }}
                      className="text-green-400 hover:text-green-300 text-xs font-semibold"
                    >
                      📋 View Project Details →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">📊 Demo Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{allDemos.length}</div>
              <div className="text-gray-300 text-sm">Total Demos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{Object.keys(demoCategories).length}</div>
              <div className="text-gray-300 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {allDemos.filter(demo => demo.difficulty === 'Advanced').length}
              </div>
              <div className="text-gray-300 text-sm">Advanced Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {new Set(allDemos.flatMap(demo => demo.technologies)).size}
              </div>
              <div className="text-gray-300 text-sm">Technologies Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOrganizer; 