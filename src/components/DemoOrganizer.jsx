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
          features: ['Face analysis', 'Video processing', 'Confidence scoring'],
          hasProjectPage: true
        },
        {
          id: 'resumeanalyzer',
          name: 'AI Resume Analyzer',
          description: 'Intelligent resume analysis with skill matching',
          icon: '📄',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'Machine Learning'],
          features: ['Skill extraction', 'Candidate scoring', 'Recommendations'],
          hasProjectPage: true
        },
        {
          id: 'aiassistant',
          name: 'AI Assistant',
          description: 'Intelligent conversational AI with natural language processing',
          icon: '💬',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'API Integration'],
          features: ['Natural conversations', 'Context awareness', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'snake-ai',
          name: 'Snake AI with Reinforcement Learning',
          description: 'AI learns to play Snake using neural networks and genetic algorithms',
          icon: '🐍',
          difficulty: 'Advanced',
          technologies: ['Python', 'Neural Networks', 'Genetic Algorithms'],
          features: ['Reinforcement Learning', 'Real-time training', 'Performance metrics'],
          hasProjectPage: true
        },
        {
          id: 'ai-agents',
          name: 'AI Agents in Pure Python',
          description: 'Multi-agent system with different AI behaviors and coordination',
          icon: '🤖',
          difficulty: 'Advanced',
          technologies: ['Python', 'Multi-Agent Systems', 'Behavior Trees'],
          features: ['Agent coordination', 'Behavior patterns', 'Environment simulation'],
          hasProjectPage: true
        },
        {
          id: 'sentiment-analysis',
          name: 'Sentiment Analysis with Transformers',
          description: 'Advanced sentiment analysis using VADER, Transformers, and NLTK',
          icon: '📊',
          difficulty: 'Intermediate',
          technologies: ['Python', 'Transformers', 'NLTK', 'VADER'],
          features: ['Text analysis', 'Sentiment scoring', 'Detailed breakdowns'],
          hasProjectPage: true
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
    'frontend': {
      name: '🌐 Frontend & Web Development',
      description: 'Modern frontend applications and web development',
      demos: [
        {
          id: '3d-portfolio',
          name: '3D Portfolio Website',
          description: 'Interactive 3D portfolio using Three.js and WebGL',
          icon: '🎨',
          difficulty: 'Advanced',
          technologies: ['Three.js', 'WebGL', 'JavaScript'],
          features: ['3D graphics', 'Interactive elements', 'Smooth animations'],
          hasProjectPage: true
        },
        {
          id: 'interactive-resume',
          name: 'Interactive Resume Web App',
          description: 'Real-time editing resume with responsive design',
          icon: '📝',
          difficulty: 'Intermediate',
          technologies: ['React', 'CSS3', 'Form Validation'],
          features: ['Real-time editing', 'Responsive design', 'Auto-save'],
          hasProjectPage: true
        }
      ]
    },
    'backend': {
      name: '⚙️ Backend & Full-Stack',
      description: 'Backend APIs and full-stack applications',
      demos: [
        {
          id: 'rag-chatbot',
          name: 'RAG Chatbot with Next.js',
          description: 'Retrieval-Augmented Generation chatbot with context awareness',
          icon: '💬',
          difficulty: 'Advanced',
          technologies: ['Next.js', 'LangChain', 'OpenAI'],
          features: ['Context awareness', 'Source attribution', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'bookstore-api',
          name: 'Bookstore REST API',
          description: 'Complete REST API for bookstore management',
          icon: '📚',
          difficulty: 'Intermediate',
          technologies: ['Express.js', 'REST API', 'CRUD Operations'],
          features: ['Full CRUD', 'Data validation', 'Error handling'],
          hasProjectPage: true
        },
        {
          id: 'mern-expense-tracker',
          name: 'MERN Expense Tracker',
          description: 'Full-stack expense tracker with MongoDB and React',
          icon: '💰',
          difficulty: 'Intermediate',
          technologies: ['MERN Stack', 'MongoDB', 'Express', 'React'],
          features: ['Real-time stats', 'Category breakdown', 'Data visualization'],
          hasProjectPage: true
        },
        {
          id: 'social-network',
          name: 'Mini Social Network',
          description: 'Social media platform with user authentication and posts',
          icon: '👥',
          difficulty: 'Advanced',
          technologies: ['React', 'Node.js', 'MongoDB', 'Auth'],
          features: ['User authentication', 'Real-time posts', 'Comments & likes'],
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
          id: 'smart-city',
          name: 'Smart City Infrastructure',
          description: 'Comprehensive smart city monitoring and management',
          icon: '🏙️',
          difficulty: 'Advanced',
          technologies: ['IoT', 'React', 'Data Analytics'],
          features: ['Traffic management', 'Energy monitoring', 'Infrastructure'],
          hasProjectPage: true
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
          features: ['Route optimization', 'Fleet tracking', 'Predictive analytics'],
          hasProjectPage: true
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
          features: ['Portfolio management', 'Market analysis', 'Risk assessment'],
          hasProjectPage: true
        },
        {
          id: 'restaurantapp',
          name: 'Restaurant Management System',
          description: 'Complete restaurant management and ordering platform',
          icon: '🍽️',
          difficulty: 'Intermediate',
          technologies: ['React', 'Node.js', 'Real-time updates'],
          features: ['Order management', 'Inventory tracking', 'Analytics'],
          hasProjectPage: true
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
          features: ['Real-time collaboration', 'Drawing tools', 'Project management'],
          hasProjectPage: true
        },
        {
          id: 'portfoliobuilder',
          name: 'Portfolio Builder',
          description: 'Drag-and-drop website builder for portfolios',
          icon: '🌐',
          difficulty: 'Intermediate',
          technologies: ['React', 'Drag & Drop', 'Template System'],
          features: ['Visual editor', 'Template library', 'Deployment'],
          hasProjectPage: true
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
          features: ['Multiplayer games', 'Real-time chat', 'Leaderboards'],
          hasProjectPage: true
        }
      ]
    }
  };

  const allDemos = Object.values(demoCategories).flatMap(category => 
    category.demos.map(demo => ({ ...demo, category: category.name }))
  );

  const filteredDemos = allDemos.filter(demo => {
    const matchesCategory = selectedCategory === 'all' || 
      demoCategories[selectedCategory]?.demos.some(categoryDemo => categoryDemo.id === demo.id);
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
                className={'px-4 py-3 rounded-lg transition-colors ' + (
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                All Demos
              </button>
              {Object.entries(demoCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={'px-4 py-3 rounded-lg transition-colors ' + (
                    selectedCategory === key
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  )}
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
                className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-all cursor-pointer group relative"
              >
                <button
                  className="absolute inset-0 w-full h-full bg-transparent"
                  onClick={() => {
                    console.log('Demo clicked:', demo.id);
                    setCurrentPage(demo.id + '-demo');
                  }}
                  style={{ zIndex: 1 }}
                />
                <div className="flex items-start justify-between mb-4 relative" style={{ zIndex: 2 }}>
                  <div className="flex items-center">
                    <div className="text-3xl mr-3">{demo.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                        {demo.name}
                      </h3>
                      <div className={'px-2 py-1 rounded text-xs ' + getDifficultyBg(demo.difficulty)}>
                        {demo.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
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
                        setCurrentPage(demo.id + '-demo');
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
          
          {/* Test Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                console.log('Test button clicked - going to blockchain');
                setCurrentPage('blockchain');
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              🧪 Test Navigation to Blockchain Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOrganizer; 