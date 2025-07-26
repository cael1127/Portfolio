import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Environment, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Floating Navigation Panel
const NavigationPanel = ({ position, onNavigate, currentPage }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const pages = [
    { id: 'home', name: 'Home', color: '#10b981' },
    { id: 'demo-organizer', name: 'Projects', color: '#3b82f6' },
    { id: 'resume-builder', name: 'Resume', color: '#8b5cf6' },
    { id: 'freelancing', name: 'Services', color: '#f59e0b' },
    { id: 'contact', name: 'Contact', color: '#ef4444' }
  ];

  return (
    <group position={position}>
      {pages.map((page, index) => (
        <Float key={page.id} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh
            ref={meshRef}
            position={[index * 2.5 - 5, 0, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => onNavigate(page.id)}
            scale={currentPage === page.id ? 1.2 : 1}
          >
            <boxGeometry args={[1.5, 0.8, 0.1]} />
            <meshStandardMaterial 
              color={currentPage === page.id ? page.color : '#374151'} 
              transparent 
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[index * 2.5 - 5, 0, 0.1]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {page.name}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// Floating Skill Orbs
const SkillOrb = ({ position, skill, level, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <Text
        position={[position[0], position[1] - 0.8, position[2]]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill}
      </Text>
      <Text
        position={[position[0], position[1] - 1, position[2]]}
        fontSize={0.15}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
      >
        Level {level}
      </Text>
    </Float>
  );
};

// Project Showcase
const ProjectShowcase = ({ position, project, onSelect }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(project.id)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial 
          color={hovered ? '#10b981' : '#1f2937'} 
          transparent 
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[position[0], position[1] + 1, position[2] + 0.1]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
      <Text
        position={[position[0], position[1] + 0.5, position[2] + 0.1]}
        fontSize={0.15}
        color="#9ca3af"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.description}
      </Text>
    </Float>
  );
};

// Contact Information Panel
const ContactPanel = ({ position }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const contactInfo = [
    { type: 'Email', value: 'findleytechs@gmail.com', color: '#10b981' },
    { type: 'Phone', value: '+1 (361) 920-6493', color: '#3b82f6' },
    { type: 'LinkedIn', value: 'linkedin.com/in/caelfindley', color: '#0ea5e9' },
    { type: 'GitHub', value: 'github.com/cael1127', color: '#6b7280' },
    { type: 'Instagram', value: '@findleytech', color: '#ec4899' }
  ];

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color="#1f2937" transparent opacity={0.9} />
      </mesh>
      <Text
        position={[0, 1.2, 0.1]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Contact Me
      </Text>
      {contactInfo.map((info, index) => (
        <Text
          key={info.type}
          position={[-1.5, 0.5 - index * 0.4, 0.1]}
          fontSize={0.2}
          color={info.color}
          anchorX="left"
          anchorY="middle"
        >
          {info.type}: {info.value}
        </Text>
      ))}
    </group>
  );
};

// Main 3D Scene Component
const Scene3D = ({ currentPage, onNavigate }) => {
  const skills = [
    { name: 'React', level: 95, color: '#61dafb', position: [-8, 2, 0] },
    { name: 'Node.js', level: 90, color: '#68a063', position: [-6, 4, 2] },
    { name: 'Python', level: 88, color: '#3776ab', position: [-4, 6, -2] },
    { name: 'AWS', level: 85, color: '#ff9900', position: [-2, 8, 0] },
    { name: 'Docker', level: 82, color: '#2496ed', position: [0, 10, 2] },
    { name: 'TypeScript', level: 88, color: '#3178c6', position: [2, 8, -2] },
    { name: 'GraphQL', level: 80, color: '#e535ab', position: [4, 6, 0] },
    { name: 'Machine Learning', level: 85, color: '#ff6b6b', position: [6, 4, 2] },
    { name: 'Cybersecurity', level: 83, color: '#ff4757', position: [8, 2, -2] }
  ];

  const projects = [
    { id: 'aquaculture', name: 'Aquaculture System', description: 'IoT monitoring platform', position: [-6, -2, 0] },
    { id: 'blockchain', name: 'Blockchain Demo', description: 'Supply chain tracking', position: [-2, -2, 0] },
    { id: 'ai-assistant', name: 'AI Assistant', description: 'LLM-powered chatbot', position: [2, -2, 0] },
    { id: 'logistics', name: 'Smart Logistics', description: 'AI optimization platform', position: [6, -2, 0] }
  ];

  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={50}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
        
        {/* Navigation Panel */}
        <NavigationPanel 
          position={[0, -8, 0]} 
          onNavigate={onNavigate} 
          currentPage={currentPage} 
        />
        
        {/* Skill Orbs */}
        {skills.map((skill) => (
          <SkillOrb
            key={skill.name}
            position={skill.position}
            skill={skill.name}
            level={skill.level}
            color={skill.color}
          />
        ))}
        
        {/* Project Showcase */}
        {projects.map((project) => (
          <ProjectShowcase
            key={project.id}
            position={project.position}
            project={project}
            onSelect={onNavigate}
          />
        ))}
        
        {/* Contact Panel */}
        <ContactPanel position={[0, 8, 0]} />
        
        {/* Floating Particles */}
        <ParticleField />
      </Canvas>
    </div>
  );
};

// Particle Field for Atmosphere
const ParticleField = () => {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      const time = Date.now() * 0.0001;
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push({ x, y, z, time });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particles.forEach((particle, i) => {
        const mesh = particlesRef.current.children[i];
        if (mesh) {
          mesh.position.x = particle.x + Math.sin(state.clock.elapsedTime + particle.time) * 2;
          mesh.position.y = particle.y + Math.cos(state.clock.elapsedTime + particle.time) * 2;
          mesh.position.z = particle.z + Math.sin(state.clock.elapsedTime * 0.5 + particle.time) * 2;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#10b981" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export default Scene3D; 