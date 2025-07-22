import React, { useState } from 'react';
import TrendingProjects from './TrendingProjects';
import DemoOrganizer from './DemoOrganizer';

const Projects = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('demos');

  const tabs = [
    { id: 'demos', label: 'Live Demos', icon: '🎮' },
    { id: 'trending', label: 'Trending Projects', icon: '🔥' },
    { id: 'portfolio', label: 'Portfolio Projects', icon: '💼' }
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
              <span className="mr-2">{tab.icon}</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Tailwind CSS</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">JavaScript</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Solidity</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Web3.js</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">IoT</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">ML</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">GPS</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">HIPAA</span>
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
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">APIs</span>
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">Data Viz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h3 className="text-2xl font-bold text-white mb-4">🛠️ Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Frontend Development</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• React.js & Next.js</li>
                    <li>• TypeScript & JavaScript</li>
                    <li>• Tailwind CSS & Styled Components</li>
                    <li>• Redux & Context API</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Backend & APIs</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Node.js & Express</li>
                    <li>• Python & Django</li>
                    <li>• RESTful APIs & GraphQL</li>
                    <li>• Database Design</li>
                    <li>• Authentication & Security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">AI & Machine Learning</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• TensorFlow & PyTorch</li>
                    <li>• Computer Vision</li>
                    <li>• Natural Language Processing</li>
                    <li>• Predictive Analytics</li>
                    <li>• Data Science</li>
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