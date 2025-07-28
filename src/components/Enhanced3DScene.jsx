import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  Environment, 
  Float, 
  Text,
  OrbitControls,
  useTexture
} from '@react-three/drei';
import { 
  Button3D, 
  Card3D, 
  FloatingParticles, 
  LoadingSpinner3D,
  InteractiveCube3D,
  AnimatedSphere3D,
  SkillOrb3D,
  ProgressBar3D
} from './3DUIElements';
import * as THREE from 'three';

// Enhanced 3D Scene Component
const Enhanced3DScene = ({ setCurrentPage, currentPage }) => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🌟', color: '#4F46E5' },
    { id: 'ai', name: 'AI/ML', icon: '🤖', color: '#FF6B6B' },
    { id: 'web', name: 'Web', icon: '🌐', color: '#4ECDC4' },
    { id: 'blockchain', name: 'Blockchain', icon: '⛓️', color: '#F7931E' },
    { id: 'game', name: 'Games', icon: '🎮', color: '#9B59B6' }
  ];

  const projects = [
    { id: 'ai-assistant-demo', title: 'AI Assistant', category: 'ai', icon: '🤖', color: '#FF6B6B' },
    { id: 'blockchain-demo', title: 'Blockchain App', category: 'blockchain', icon: '⛓️', color: '#F7931E' },
    { id: 'restaurant-app-demo', title: 'Restaurant App', category: 'web', icon: '🍽️', color: '#4ECDC4' },
    { id: 'game-platform-demo', title: 'Game Platform', category: 'game', icon: '🎮', color: '#9B59B6' },
    { id: 'portfolio-builder-demo', title: 'Portfolio Builder', category: 'web', icon: '🎨', color: '#4F46E5' },
    { id: 'whiteboard-demo', title: 'Whiteboard', category: 'web', icon: '✏️', color: '#2ECC71' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleProjectClick = (projectId) => {
    setCurrentPage(projectId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
          <FloatingParticles count={30} color="#4F46E5" />
          
          {/* Main Title */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 8, 0]}>
              <Text
                fontSize={1}
                color="#4F46E5"
                anchorX="center"
                anchorY="middle"
                position={[-2, 0, 0]}
              >
                Cael Findley
              </Text>
              <Text
                fontSize={0.4}
                color="#10B981"
                anchorX="center"
                anchorY="middle"
                position={[2, 0, 0]}
              >
                Portfolio
              </Text>
            </group>
          </Float>

          {/* Navigation */}
          <group position={[0, 6, 0]}>
            {categories.map((category, index) => (
              <Button3D
                key={category.id}
                position={[index * 2.5 - 5, 0, 0]}
                onClick={() => setSelectedCategory(category.id)}
                color={selectedCategory === category.id ? category.color : '#374151'}
                size={[1.8, 0.4, 0.15]}
                icon={category.icon}
              >
                {category.name}
              </Button3D>
            ))}
          </group>

          {/* Project Cards */}
          <group position={[0, 2, 0]}>
            {filteredProjects.map((project, index) => {
              const row = Math.floor(index / 3);
              const col = index % 3;
              return (
                <Card3D
                  key={project.id}
                  title={project.title}
                  description={`${project.category} project`}
                  icon={project.icon}
                  position={[col * 3 - 3, -row * 2.5, 0]}
                  color={project.color}
                  onClick={() => handleProjectClick(project.id)}
                />
              );
            })}
          </group>

          {/* Interactive Elements */}
          <group position={[0, -2, 0]}>
            <InteractiveCube3D
              position={[-4, 0, 0]}
              color="#FF6B6B"
              onClick={() => setCurrentPage('demo-organizer')}
            />
            <AnimatedSphere3D
              position={[0, 0, 0]}
              color="#4ECDC4"
            />
            <InteractiveCube3D
              position={[4, 0, 0]}
              color="#9B59B6"
              onClick={() => setCurrentPage('contact')}
            />
          </group>

          {/* Skills Section */}
          <group position={[0, -6, 0]}>
            <SkillOrb3D
              skill="React"
              icon="⚛️"
              level={95}
              position={[-4, 0, 0]}
              color="#61DAFB"
            />
            <SkillOrb3D
              skill="Node.js"
              icon="🚀"
              level={90}
              position={[-1.5, 0, 0]}
              color="#339933"
            />
            <SkillOrb3D
              skill="Python"
              icon="🐍"
              level={88}
              position={[1.5, 0, 0]}
              color="#3776AB"
            />
            <SkillOrb3D
              skill="AWS"
              icon="☁️"
              level={85}
              position={[4, 0, 0]}
              color="#FF9900"
            />
          </group>

          {/* Progress Section */}
          <group position={[0, -10, 0]}>
            <ProgressBar3D
              progress={95}
              position={[-4, 0, 0]}
              color="#4F46E5"
            />
            <Text
              fontSize={0.2}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[-4, 0.5, 0]}
            >
              Overall Progress
            </Text>
          </group>

          {/* Action Buttons */}
          <group position={[0, -12, 0]}>
            <Button3D
              position={[-2, 0, 0]}
              onClick={() => setCurrentPage('demo-organizer')}
              color="#059669"
              icon="💼"
              size={[2, 0.5, 0.2]}
            >
              View Projects
            </Button3D>
            
            <Button3D
              position={[2, 0, 0]}
              onClick={() => setCurrentPage('contact')}
              color="#7C3AED"
              icon="📧"
              size={[2, 0.5, 0.2]}
            >
              Contact Me
            </Button3D>
          </group>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Cael Findley
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Full-Stack Software Engineer & Cloud Architect
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Specializing in modern web technologies, cloud infrastructure, and innovative solutions 
            that drive business growth. From concept to deployment, I build scalable applications 
            that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('demo-organizer')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg backdrop-blur-sm bg-opacity-80"
            >
              View My Work
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-transparent border-2 border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enhanced3DScene; 