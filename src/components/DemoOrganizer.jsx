import React, { useState } from 'react';
import AnimatedCard from './AnimatedCard';
import FloatingParticles from './FloatingParticles';

const DemoOrganizer = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const demoCategories = {
    'ai-ml': {
      name: '🤖 AI & Machine Learning',
      description: 'Artificial intelligence and machine learning applications',
      demos: [
        {
          id: 'fraud-detection',
          name: '🕵️ Fraud Detection System',
          description: 'AI-powered financial fraud detection with real-time analysis',
          icon: '🕵️',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
          features: ['Real-time analysis', 'Pattern recognition', 'Risk scoring']
        },
        {
          id: 'deepfake-detection',
          name: '🎭 Deepfake Detection',
          description: 'Advanced deepfake detection using computer vision',
          icon: '🎭',
          difficulty: 'Advanced',
          technologies: ['Python', 'OpenCV', 'TensorFlow'],
          features: ['Face analysis', 'Video processing', 'Confidence scoring'],
          hasProjectPage: true
        },
        {
          id: 'resumeanalyzer',
          name: '📄 AI Resume Analyzer',
          description: 'Intelligent resume analysis with skill matching',
          icon: '📄',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'Machine Learning'],
          features: ['Skill extraction', 'Candidate scoring', 'Recommendations'],
          hasProjectPage: true
        },
        {
          id: 'aiassistant',
          name: '🤖 AI Assistant',
          description: 'Intelligent conversational AI with natural language processing',
          icon: '🤖',
          difficulty: 'Intermediate',
          technologies: ['React', 'NLP', 'API Integration'],
          features: ['Natural conversations', 'Context awareness', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'snake-ai',
          name: '🐍 Snake AI with Reinforcement Learning',
          description: 'AI learns to play Snake using neural networks and genetic algorithms',
          icon: '🐍',
          difficulty: 'Advanced',
          technologies: ['Python', 'Neural Networks', 'Genetic Algorithms'],
          features: ['Reinforcement Learning', 'Real-time training', 'Performance metrics'],
          hasProjectPage: true
        },
        {
          id: 'ai-agents',
          name: '🧠 AI Agents in Pure Python',
          description: 'Multi-agent system with different AI behaviors and coordination',
          icon: '🧠',
          difficulty: 'Advanced',
          technologies: ['Python', 'Multi-Agent Systems', 'Behavior Trees'],
          features: ['Agent coordination', 'Behavior patterns', 'Environment simulation'],
          hasProjectPage: true
        },
        {
          id: 'sentiment-analysis',
          name: '😊 Sentiment Analysis with Transformers',
          description: 'Advanced sentiment analysis using VADER, Transformers, and NLTK',
          icon: '😊',
          difficulty: 'Intermediate',
          technologies: ['Python', 'Transformers', 'NLTK', 'VADER'],
          features: ['Text analysis', 'Sentiment scoring', 'Detailed breakdowns'],
          hasProjectPage: true
        }
      ]
    },
    'blockchain': {
      name: '⛓️ Blockchain & Web3',
      description: 'Decentralized applications and blockchain technology',
      demos: [
        {
          id: 'blockchain',
          name: '🔗 Blockchain Supply Chain',
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
      name: '🎨 Frontend & Web Development',
      description: 'Modern frontend applications and web development',
      demos: [
        {
          id: 'interactive-resume',
          name: '📝 Interactive Resume Web App',
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
          name: '🤖 RAG Chatbot with Next.js',
          description: 'Retrieval-Augmented Generation chatbot with context awareness',
          icon: '🤖',
          difficulty: 'Advanced',
          technologies: ['Next.js', 'LangChain', 'OpenAI'],
          features: ['Context awareness', 'Source attribution', 'Smart responses'],
          hasProjectPage: true
        },
        {
          id: 'bookstore-api',
          name: '📚 Bookstore REST API',
          description: 'Complete REST API for bookstore management',
          icon: '📚',
          difficulty: 'Intermediate',
          technologies: ['Express.js', 'REST API', 'CRUD Operations'],
          features: ['Full CRUD', 'Data validation', 'Error handling'],
          hasProjectPage: true
        },
        {
          id: 'mern-expense-tracker',
          name: '💰 MERN Expense Tracker',
          description: 'Full-stack expense tracker with MongoDB and React',
          icon: '💰',
          difficulty: 'Intermediate',
          technologies: ['MERN Stack', 'MongoDB', 'Express', 'React'],
          features: ['Real-time stats', 'Category breakdown', 'Data visualization'],
          hasProjectPage: true
        },
        {
          id: 'social-network',
          name: '🌐 Mini Social Network',
          description: 'Social media platform with user authentication and posts',
          icon: '🌐',
          difficulty: 'Intermediate',
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
          name: '🐟 Smart Aquaculture',
          description: 'AI-powered aquaculture monitoring with predictive analytics',
          icon: '🐟',
          difficulty: 'Advanced',
          technologies: ['IoT Sensors', 'React', 'Machine Learning'],
          features: ['Real-time monitoring', 'Predictive analytics', 'Water quality'],
          hasProjectPage: true
        },
        {
          id: 'smart-city',
          name: '🏙️ Smart City Infrastructure',
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
          name: '🚚 Smart Logistics Platform',
          description: 'AI-powered fleet management and route optimization',
          icon: '🚚',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'GPS Integration'],
          features: ['Route optimization', 'Fleet tracking', 'Predictive analytics'],
          hasProjectPage: true
        },
        {
          id: 'healthcare',
          name: '🏥 Healthcare Analytics',
          description: 'AI-powered patient monitoring and medical analytics',
          icon: '🏥',
          difficulty: 'Advanced',
          technologies: ['React', 'AI/ML', 'HIPAA Compliance'],
          features: ['Patient monitoring', 'Predictive diagnostics', 'Medical alerts'],
          hasProjectPage: true
        },
        {
          id: 'financial',
          name: '📊 Financial Analytics Platform',
          description: 'Advanced financial analysis and portfolio management',
          icon: '📊',
          difficulty: 'Advanced',
          technologies: ['React', 'Financial APIs', 'Data Visualization'],
          features: ['Portfolio management', 'Market analysis', 'Risk assessment'],
          hasProjectPage: true
        },
        {
          id: 'restaurantapp',
          name: '🍽️ Restaurant Management System',
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
          name: '🖼️ Collaborative Whiteboard',
          description: 'Real-time collaborative drawing and design platform',
          icon: '🖼️',
          difficulty: 'Intermediate',
          technologies: ['React', 'Canvas API', 'WebRTC'],
          features: ['Real-time collaboration', 'Drawing tools', 'Project management'],
          hasProjectPage: true
        },
        {
          id: 'portfoliobuilder',
          name: '🏗️ Portfolio Builder',
          description: 'Drag-and-drop website builder for portfolios',
          icon: '🏗️',
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
          name: '🎮 Multiplayer Gaming Platform',
          description: 'Interactive multiplayer gaming with real-time features',
          icon: '🎮',
          difficulty: 'Intermediate',
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
    <div className="min-h-screen bg-gray-900 text-white p-6 relative overflow-x-hidden">
      <FloatingParticles />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8 snap-section">
          <AnimatedCard delay={0} direction="down" className="mb-4">
            <h1 className="text-4xl font-bold text-green-400">Demo Collection</h1>
          </AnimatedCard>
          <AnimatedCard delay={100} direction="down" className="mb-4">
            <p className="text-gray-300 text-lg">
              Explore our comprehensive collection of interactive demos organized by category
            </p>
          </AnimatedCard>
        </div>

        {/* Search and Filter */}
        <AnimatedCard delay={200} direction="up" className="mb-8 snap-section">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="🔍 Search demos by name, technology, or feature..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchSuggestions(e.target.value.length > 0);
                  if (e.target.value.length > 0) {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 500);
                  }
                }}
                onFocus={() => setShowSearchSuggestions(searchTerm.length > 0)}
                onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-green-500/20"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {isLoading ? '⏳' : '🔍'}
              </div>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowSearchSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              )}
              
              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-400">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                      <span className="ml-2">Searching...</span>
                    </div>
                  ) : (
                    <>
                      {/* Quick Filters */}
                      <div className="p-3 border-b border-gray-600">
                        <div className="text-xs text-gray-400 mb-2">Quick Filters:</div>
                        <div className="flex flex-wrap gap-2">
                          {['AI/ML', 'Blockchain', 'Web3', 'React', 'Python'].map((filter) => (
                            <button
                              key={filter}
                              onClick={() => {
                                setSearchTerm(filter);
                                setShowSearchSuggestions(false);
                              }}
                              className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Search Results Preview */}
                      <div className="p-3">
                        <div className="text-xs text-gray-400 mb-2">Found {filteredDemos.length} results:</div>
                        {filteredDemos.slice(0, 3).map((demo) => (
                          <button
                            key={demo.id}
                            onClick={() => {
                              setSearchTerm(demo.name);
                              setShowSearchSuggestions(false);
                            }}
                            className="w-full text-left p-2 hover:bg-gray-700 rounded transition-colors"
                          >
                            <div className="flex items-center">
                              <span className="mr-2">{demo.icon}</span>
                              <div>
                                <div className="text-sm text-white font-medium">{demo.name}</div>
                                <div className="text-xs text-gray-400">{demo.description}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={'px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group ' + (
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/30'
                )}
              >
                <span className="relative z-10">✨ All Demos</span>
                {selectedCategory === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
                )}
              </button>
              {Object.entries(demoCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={'px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group ' + (
                    selectedCategory === key
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-500/30'
                  )}
                >
                  <span className="relative z-10">{category.name.split(' ')[0]}</span>
                  {selectedCategory === key && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Category Overview */}
        {selectedCategory === 'all' && (
          <div className="mb-8 snap-section">
            <h2 className="text-2xl font-bold text-white mb-6">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(demoCategories).map(([key, category], index) => (
                <AnimatedCard
                  key={key}
                  delay={index * 50}
                  direction="up"
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
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
                </AnimatedCard>
              ))}
            </div>
          </div>
        )}

        {/* Demos Grid */}
        <AnimatedCard delay={100} direction="up" className="mb-8 snap-section">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'all' ? 'All Demos' : demoCategories[selectedCategory]?.name}
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-gray-400">{filteredDemos.length} demos found</p>
              {searchTerm && (
                <span className="text-sm text-green-400 bg-green-900/20 px-2 py-1 rounded">
                  Searching: "{searchTerm}"
                </span>
              )}
            </div>
          </div>

          {filteredDemos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No demos found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm 
                  ? `No demos match "${searchTerm}". Try adjusting your search terms.`
                  : 'No demos available in this category.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemos.map((demo, index) => (
                <AnimatedCard
                  key={demo.id}
                  delay={index * 75}
                  direction="up"
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-all cursor-pointer group relative hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden"
                >
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
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
                      <div className="text-3xl mr-3 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12">{demo.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                          {demo.name}
                        </h3>
                        <div className={'px-2 py-1 rounded text-xs font-medium transition-all duration-300 ' + getDifficultyBg(demo.difficulty)}>
                          {demo.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 group-hover:scale-110">
                      →
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors">{demo.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {demo.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs group-hover:bg-gray-500 transition-all duration-300 hover:scale-105"
                          style={{ transitionDelay: `${index * 50}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2 group-hover:text-gray-300 transition-colors">Key Features</h4>
                    <ul className="space-y-1">
                      {demo.features.slice(0, 3).map((feature, index) => (
                        <li 
                          key={index} 
                          className="text-gray-300 text-xs flex items-center group-hover:text-gray-200 transition-all duration-300"
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <span className="text-green-400 mr-1 group-hover:scale-110 transition-transform duration-300">•</span>
                          {feature}
                        </li>
                      ))}
                      {demo.features.length > 3 && (
                        <li className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">+{demo.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>
                  
                  {demo.hasProjectPage && (
                    <div className="mt-4 pt-4 border-t border-gray-600 group-hover:border-green-400/50 transition-colors">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage(demo.id + '-demo');
                        }}
                        className="text-green-400 hover:text-green-300 text-xs font-semibold group-hover:scale-105 transition-transform duration-300"
                      >
                        View Project Details →
                      </button>
                    </div>
                  )}
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </AnimatedCard>

        {/* Quick Stats */}
        <AnimatedCard delay={200} direction="up" className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all snap-section">
          <h2 className="text-2xl font-bold text-white mb-4">Demo Statistics</h2>
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
              Test Navigation to Blockchain Demo
            </button>
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default DemoOrganizer; 