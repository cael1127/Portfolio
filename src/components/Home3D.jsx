import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Text } from '@react-three/drei';
import ContactModal from './ContactModal';
import { 
  Button3D, 
  Card3D, 
  Navigation3D, 
  SkillOrb3D, 
  ProgressBar3D, 
  FloatingParticles,
  LoadingSpinner3D,
  InteractiveCube3D,
  AnimatedSphere3D
} from './3DUIElements';

const Home3D = ({ setCurrentPage }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: 'React', icon: '⚛️', level: 95, color: '#61DAFB' },
    { name: 'Node.js', icon: '🚀', level: 90, color: '#339933' },
    { name: 'Python', icon: '🐍', level: 88, color: '#3776AB' },
    { name: 'AWS', icon: '☁️', level: 85, color: '#FF9900' },
    { name: 'AI/ML', icon: '🤖', level: 82, color: '#FF6B6B' },
    { name: 'Blockchain', icon: '⛓️', level: 80, color: '#F7931E' }
  ];

  const projects = [
    { title: 'AI Assistant', description: 'Advanced AI chatbot with NLP', icon: '🤖', color: '#FF6B6B' },
    { title: 'Blockchain App', description: 'DeFi platform with smart contracts', icon: '⛓️', color: '#F7931E' },
    { title: '3D Portfolio', description: 'Interactive 3D web experience', icon: '🎨', color: '#4F46E5' },
    { title: 'Cloud Platform', description: 'Scalable cloud infrastructure', icon: '☁️', color: '#FF9900' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <Canvas>
              <LoadingSpinner3D color="#4F46E5" />
            </Canvas>
          </div>
          <p className="text-white text-xl">Loading 3D Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <FloatingParticles count={50} color="#4F46E5" />
          
          {/* Hero Section 3D */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 3, 0]}>
              <Text
                fontSize={0.8}
                color="#4F46E5"
                anchorX="center"
                anchorY="middle"
                position={[-4, 0, 0]}
              >
                Cael Findley
              </Text>
              
              <Text
                fontSize={0.3}
                color="#10B981"
                anchorX="center"
                anchorY="middle"
                position={[-2, -1, 0]}
              >
                Full-Stack Engineer
              </Text>
            </group>
          </Float>

          {/* 3D Navigation */}
          <Navigation3D 
            onNavigate={setCurrentPage} 
            position={[0, -2, 0]} 
          />

          {/* 3D Action Buttons */}
          <group position={[0, -4, 0]}>
            <Button3D
              position={[-2, 0, 0]}
              onClick={() => setCurrentPage('demo-organizer')}
              color="#059669"
              icon="💼"
            >
              View Projects
            </Button3D>
            
            <Button3D
              position={[2, 0, 0]}
              onClick={() => setShowContactModal(true)}
              color="#7C3AED"
              icon="📧"
            >
              Contact Me
            </Button3D>
          </group>

          {/* 3D Skills Section */}
          <group position={[0, -6, 0]}>
            {skills.map((skill, index) => (
              <SkillOrb3D
                key={skill.name}
                skill={skill.name}
                icon={skill.icon}
                level={skill.level}
                position={[index * 3 - 7.5, 0, 0]}
                color={skill.color}
              />
            ))}
          </group>

          {/* 3D Projects Section */}
          <group position={[0, -10, 0]}>
            {projects.map((project, index) => (
              <Card3D
                key={project.title}
                title={project.title}
                description={project.description}
                icon={project.icon}
                position={[index * 3 - 4.5, 0, 0]}
                color={project.color}
                onClick={() => setCurrentPage('demo-organizer')}
              />
            ))}
          </group>

          {/* 3D Progress Bars */}
          <group position={[0, -12, 0]}>
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

          {/* 3D Interactive Elements */}
          <group position={[0, -14, 0]}>
            <InteractiveCube3D
              position={[-3, 0, 0]}
              color="#FF6B6B"
              onClick={() => setCurrentPage('demo-organizer')}
            />
            <AnimatedSphere3D
              position={[0, 0, 0]}
              color="#4ECDC4"
            />
            <InteractiveCube3D
              position={[3, 0, 0]}
              color="#9B59B6"
              onClick={() => setShowContactModal(true)}
            />
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
              onClick={() => setShowContactModal(true)}
              className="bg-transparent border-2 border-teal-600 text-teal-400 hover:bg-teal-600 hover:text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg backdrop-blur-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <ContactModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
};

export default Home3D; 