import React, { useState } from 'react';
import TrendingProjects from './TrendingProjects';
import DemoOrganizer from './DemoOrganizer';
import { getIcon } from '../utils/iconMapping';
import { HiFire, HiBriefcase } from 'react-icons/hi2';
import { FaGamepad } from 'react-icons/fa';

const Projects = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('demos');

  const tabs = [
    { id: 'demos', label: 'Live Demos', iconKey: 'game-platform', Icon: FaGamepad },
    { id: 'trending', label: 'Trending Projects', iconKey: 'financial', Icon: HiFire },
    { id: 'portfolio', label: 'Portfolio Projects', iconKey: 'business-apps', Icon: HiBriefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h2 className="text-4xl font-bold mb-8 text-green-400">Projects</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={'px-6 py-3 rounded-lg transition-colors ' + (
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              <span className="mr-2 inline-flex items-center"><tab.Icon size={20} /></span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'demos' && (
          <DemoOrganizer setCurrentPage={setCurrentPage} />
        )}

        {activeTab === 'trending' && (
          <TrendingProjects setCurrentPage={setCurrentPage} />
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4">Portfolio Projects</h3>
              <p className="text-gray-300 mb-6">
                A collection of my personal and professional projects showcasing various technologies and skills.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Portfolio Project Cards */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🌐</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Personal Portfolio</h4>
                      <p className="text-gray-400 text-sm">React, Tailwind CSS</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    A modern, responsive portfolio website showcasing my skills and projects with interactive demos.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Tailwind CSS</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">JavaScript</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🔗</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Blockchain Supply Chain</h4>
                      <p className="text-gray-400 text-sm">Solidity, Web3.js, React</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    A complete blockchain implementation for supply chain transparency with smart contracts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Solidity</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Web3.js</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button 
                      onClick={() => setCurrentPage('blockchain-demo')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🌊</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Smart Aquaculture</h4>
                      <p className="text-gray-400 text-sm">IoT, React, Machine Learning</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    AI-powered aquaculture monitoring system with real-time sensor data and predictive analytics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">IoT</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">ML</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button 
                      onClick={() => setCurrentPage('aquaculture-demo')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🚚</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Smart Logistics</h4>
                      <p className="text-gray-400 text-sm">React, AI/ML, GPS Integration</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    AI-powered fleet management and route optimization platform with real-time tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">GPS</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button 
                      onClick={() => setCurrentPage('logistics-demo')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🏥</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Healthcare Analytics</h4>
                      <p className="text-gray-400 text-sm">React, AI/ML, HIPAA Compliance</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    AI-powered patient monitoring and medical analytics platform with predictive diagnostics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">HIPAA</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button 
                      onClick={() => setCurrentPage('healthcare-demo')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-green-400 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">💰</div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">Financial Analytics</h4>
                      <p className="text-gray-400 text-sm">React, Financial APIs, Data Viz</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Advanced financial analysis and portfolio management platform with real-time market data.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">APIs</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Data Viz</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-600">
                    <button 
                      onClick={() => setCurrentPage('financial-demo')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      View Project
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm transition-colors">
                      View Code
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Websites Section */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">🌐 Live Websites & Deployments</h3>
              <p className="text-gray-300 mb-6">
                Production websites and applications currently running and serving users
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a 
                  href="https://threesistersoyster.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">Three Sisters Oyster</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">threesistersoyster.com</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://uilacademy.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">UIL Academy</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">uilacademy.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://minbod.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">MinBod</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">minbod.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://jfresume.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">JF Resume</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">jfresume.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://bapux.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">Bapux</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">bapux.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://bpawd.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg border border-blue-600 hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-white">BPAWD</h4>
                    <span className="text-blue-300 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">bpawd.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-green-300 text-xs">Live</span>
                  </div>
                </a>
              </div>

              {/* GitHub Section */}
              <div className="mt-6 pt-6 border-t border-blue-600">
                <a 
                  href="https://github.com/cael1127" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-600 hover:border-green-400 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💻</div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">GitHub Profile</h4>
                      <p className="text-gray-400">github.com/cael1127</p>
                      <p className="text-sm text-gray-500 mt-1">View all repositories and open source contributions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-semibold">View Profile</span>
                    <span className="text-green-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h3 className="text-2xl font-bold text-white mb-4">🛠️ Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Programming & Development</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Java & Python</li>
                    <li>• TypeScript & JavaScript</li>
                    <li>• React.js & Next.js</li>
                    <li>• Node.js & Express</li>
                    <li>• HTML5, CSS, SQL</li>
                    <li>• RESTful APIs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Software Engineering & DevOps</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Version Control (Git)</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• Docker & Containerization</li>
                    <li>• Cloud Deployment (AWS, Netlify)</li>
                    <li>• API Integration</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">AI & Machine Learning</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• AI/ML Model Integration</li>
                    <li>• Predictive Analytics</li>
                    <li>• Natural Language Processing</li>
                    <li>• Intelligent Automation</li>
                    <li>• Python/Java-Based ML Pipelines</li>
                    <li>• TensorFlow & PyTorch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">IT & Systems Administration</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Windows & Linux Server Admin</li>
                    <li>• System Configuration & Optimization</li>
                    <li>• Cloud Infrastructure</li>
                    <li>• Network Design & Maintenance</li>
                    <li>• Hardware/Software Troubleshooting</li>
                    <li>• Client-Based IT Consultation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Cybersecurity & Infrastructure</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Secure System & Network Design</li>
                    <li>• Access Control Protocols</li>
                    <li>• Risk Reduction Strategies</li>
                    <li>• Reliability Maintenance</li>
                    <li>• Cybersecurity Best Practices</li>
                    <li>• Enterprise-Level Network Security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Frontend & UI/UX</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Responsive Web Design</li>
                    <li>• UI/UX Implementation</li>
                    <li>• Cross-Platform Development</li>
                    <li>• Mobile App Development (Expo)</li>
                    <li>• Tailwind CSS & Styled Components</li>
                    <li>• Redux & Context API</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 