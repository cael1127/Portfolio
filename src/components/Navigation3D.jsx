import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float } from '@react-three/drei';
import { Button3D, FloatingParticles } from './3DUIElements';

const Navigation3D = ({ setCurrentPage, currentPage }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { 
      title: 'Home', 
      icon: '🏠', 
      color: '#4F46E5', 
      hoverColor: '#6366F1',
      action: () => setCurrentPage('home'),
      page: 'home'
    },
    { 
      title: 'Projects', 
      icon: '💼', 
      color: '#059669', 
      hoverColor: '#10B981',
      action: () => setCurrentPage('demo-organizer'),
      page: 'demo-organizer'
    },
    { 
      title: 'Skills', 
      icon: '⚡', 
      color: '#DC2626', 
      hoverColor: '#EF4444',
      action: () => setCurrentPage('freelancing'),
      page: 'freelancing'
    },
    { 
      title: 'Contact', 
      icon: '📧', 
      color: '#7C3AED', 
      hoverColor: '#8B5CF6',
      action: () => setCurrentPage('contact'),
      page: 'contact'
    }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-20">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={50} depth={25} count={1000} factor={2} saturation={0} fade speed={0.5} />
          <FloatingParticles count={20} color="#4F46E5" />
          
          <group position={[0, 0, 0]}>
            {menuItems.map((item, index) => (
              <Button3D
                key={item.title}
                position={[index * 2.5 - 3.75, 0, 0]}
                onClick={item.action}
                color={currentPage === item.page ? item.hoverColor : item.color}
                hoverColor={item.hoverColor}
                size={[2, 0.4, 0.15]}
                icon={item.icon}
              >
                {item.title}
              </Button3D>
            ))}
          </group>
        </Canvas>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={item.action}
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-white font-medium ${
                currentPage === item.page 
                  ? 'bg-opacity-80 backdrop-blur-sm' 
                  : 'bg-transparent hover:bg-opacity-20'
              }`}
              style={{
                backgroundColor: currentPage === item.page ? item.color : 'transparent',
                borderColor: item.color,
                borderWidth: currentPage === item.page ? '2px' : '1px'
              }}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation3D; 