import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Text } from '@react-three/drei';
import { 
  Card3D, 
  Button3D, 
  FloatingParticles, 
  LoadingSpinner3D,
  InteractiveCube3D,
  AnimatedSphere3D
} from './3DUIElements';

const DemoOrganizer3D = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'all', name: 'All Projects', icon: '🌟', color: '#4F46E5' },
    { id: 'ai', name: 'AI/ML', icon: '🤖', color: '#FF6B6B' },
    { id: 'web', name: 'Web Apps', icon: '🌐', color: '#4ECDC4' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#F7931E' },
    { id: 'game', name: 'Games', icon: '🎮', color: '#9B59B6' },
    { id: 'data', name: 'Data Science', icon: '📊', color: '#E74C3C' }
  ];

  const projects = [
    {
      id: 'blockchain-demo',
      title: 'Blockchain Platform',
      description: 'DeFi platform with smart contracts',
      category: 'blockchain',
      icon: '⛓️',
      color: '#F7931E',
      tech: ['Solidity', 'React', 'Web3.js']
    },
    {
      id: 'ai-assistant-demo',
      title: 'AI Assistant',
      description: 'Advanced chatbot with NLP',
      category: 'ai',
      icon: '🤖',
      color: '#FF6B6B',
      tech: ['Python', 'TensorFlow', 'React']
    },
    {
      id: 'restaurant-app-demo',
      title: 'Restaurant App',
      description: 'Full-stack restaurant management',
      category: 'web',
      icon: '🍽️',
      color: '#4ECDC4',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 'game-platform-demo',
      title: 'Game Platform',
      description: 'Multiplayer gaming platform',
      category: 'game',
      icon: '🎮',
      color: '#9B59B6',
      tech: ['Unity', 'C#', 'WebSocket']
    },
    {
      id: 'healthcare-demo',
      title: 'Healthcare Analytics',
      description: 'Medical data analysis platform',
      category: 'data',
      icon: '🏥',
      color: '#E74C3C',
      tech: ['Python', 'Pandas', 'React']
    },
    {
      id: 'logistics-demo',
      title: 'Logistics System',
      description: 'Supply chain optimization',
      category: 'web',
      icon: '🚚',
      color: '#3498DB',
      tech: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      id: 'portfolio-builder-demo',
      title: 'Portfolio Builder',
      description: 'Interactive portfolio creator',
      category: 'web',
      icon: '🎨',
      color: '#4F46E5',
      tech: ['React', 'Three.js', 'Tailwind']
    },
    {
      id: 'whiteboard-demo',
      title: 'Collaborative Whiteboard',
      description: 'Real-time drawing app',
      category: 'web',
      icon: '✏️',
      color: '#2ECC71',
      tech: ['Canvas API', 'WebSocket', 'React']
    },
    {
      id: 'smart-city-demo',
      title: 'Smart City Dashboard',
      description: 'IoT data visualization',
      category: 'data',
      icon: '🏙️',
      color: '#34495E',
      tech: ['React', 'D3.js', 'Node.js']
    },
    {
      id: 'fraud-detection-demo',
      title: 'Fraud Detection',
      description: 'ML-based fraud detection',
      category: 'ai',
      icon: '🕵️',
      color: '#E67E22',
      tech: ['Python', 'Scikit-learn', 'React']
    },
    {
      id: 'deepfake-detection-demo',
      title: 'Deepfake Detection',
      description: 'AI-powered media verification',
      category: 'ai',
      icon: '🎭',
      color: '#8E44AD',
      tech: ['Python', 'TensorFlow', 'OpenCV']
    },
    {
      id: 'sentiment-analysis-demo',
      title: 'Sentiment Analysis',
      description: 'Social media sentiment tracker',
      category: 'ai',
      icon: '😊',
      color: '#F39C12',
      tech: ['Python', 'NLTK', 'React']
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (projectId) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(projectId);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <Canvas>
              <LoadingSpinner3D color="#4F46E5" />
            </Canvas>
          </div>
          <p className="text-white text-xl">Loading Project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <FloatingParticles count={30} color="#4F46E5" />
          
          {/* Title */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 8, 0]}>
              <Text
                fontSize={0.8}
                color="#4F46E5"
                anchorX="center"
                anchorY="middle"
                position={[-3, 0, 0]}
              >
                My Projects
              </Text>
            </group>
          </Float>

          {/* Category Filter Buttons */}
          <group position={[0, 6, 0]}>
            {categories.map((category, index) => (
              <Button3D
                key={category.id}
                position={[index * 2.5 - 6.25, 0, 0]}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? category.color : '#374151'}
                size={[2, 0.4, 0.15]}
                icon={category.icon}
              >
                {category.name}
              </Button3D>
            ))}
          </group>

          {/* Project Cards */}
          <group position={[0, 2, 0]}>
            {filteredProjects.map((project, index) => {
              const row = Math.floor(index / 4);
              const col = index % 4;
              return (
                <Card3D
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  position={[col * 3 - 4.5, -row * 2.5, 0]}
                  color={project.color}
                  onClick={() => handleProjectClick(project.id)}
                />
              );
            })}
          </group>

          {/* Interactive 3D Elements */}
          <group position={[0, -4, 0]}>
            <InteractiveCube3D
              position={[-4, 0, 0]}
              color="#FF6B6B"
              onClick={() => setSelectedCategory('ai')}
            />
            <AnimatedSphere3D
              position={[0, 0, 0]}
              color="#4ECDC4"
            />
            <InteractiveCube3D
              position={[4, 0, 0]}
              color="#9B59B6"
              onClick={() => setSelectedCategory('game')}
            />
          </group>

          {/* Back Button */}
          <group position={[0, -8, 0]}>
            <Button3D
              position={[0, 0, 0]}
              onClick={() => setCurrentPage('home')}
              color="#DC2626"
              icon="🏠"
              size={[2.5, 0.5, 0.2]}
            >
              Back to Home
            </Button3D>
          </group>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore my portfolio of innovative projects and demos
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-opacity-80 backdrop-blur-sm'
                    : 'bg-transparent hover:bg-opacity-20'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : 'transparent',
                  borderColor: category.color,
                  borderWidth: '2px'
                }}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors cursor-pointer backdrop-blur-sm bg-opacity-80"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg backdrop-blur-sm bg-opacity-80"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoOrganizer3D; 