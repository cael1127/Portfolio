import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Stars, 
  Text3D, 
  Float, 
  Sparkles,
  useTexture,
  MeshDistortMaterial,
  MeshReflectorMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// Floating Project Cards Component
const ProjectCard = ({ position, rotation, scale, title, description, icon, color, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={hovered ? scale.map(s => s * 1.1) : scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card Background */}
        <mesh>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.3 : 0.1}
            radius={1}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Icon */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.05}
          position={[0, 0.3, 0.06]}
          curveSegments={12}
        >
          {icon}
          <meshStandardMaterial color="white" />
        </Text3D>
        
        {/* Title */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.15}
          height={0.02}
          position={[0, 0, 0.06]}
          curveSegments={12}
        >
          {title}
          <meshStandardMaterial color="white" />
        </Text3D>
        
        {/* Description */}
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.08}
          height={0.01}
          position={[0, -0.3, 0.06]}
          curveSegments={12}
        >
          {description}
          <meshStandardMaterial color="lightgray" />
        </Text3D>
      </group>
    </Float>
  );
};

// Floating Navigation Menu
const NavigationMenu = ({ onNavigate }) => {
  const menuItems = [
    { title: 'Home', icon: '🏠', position: [-8, 2, 0], color: '#4F46E5' },
    { title: 'Projects', icon: '💼', position: [-4, 2, 0], color: '#059669' },
    { title: 'Skills', icon: '⚡', position: [0, 2, 0], color: '#DC2626' },
    { title: 'Contact', icon: '📧', position: [4, 2, 0], color: '#7C3AED' },
    { title: 'About', icon: '👤', position: [8, 2, 0], color: '#EA580C' }
  ];

  return (
    <group position={[0, 4, 0]}>
      {menuItems.map((item, index) => (
        <ProjectCard
          key={index}
          position={item.position}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          title={item.title}
          description=""
          icon={item.icon}
          color={item.color}
          onClick={() => onNavigate(item.title.toLowerCase())}
        />
      ))}
    </group>
  );
};

// Floating Project Showcase
const ProjectShowcase = ({ onProjectClick }) => {
  const projects = [
    {
      title: 'AI Fraud Detection',
      description: 'ML-powered security',
      icon: '🔍',
      position: [-6, -2, 0],
      color: '#DC2626'
    },
    {
      title: 'Healthcare Analytics',
      description: 'Patient monitoring',
      icon: '🏥',
      position: [-2, -2, 0],
      color: '#059669'
    },
    {
      title: 'Financial Platform',
      description: 'Trading algorithms',
      icon: '💰',
      position: [2, -2, 0],
      color: '#7C3AED'
    },
    {
      title: 'Smart City IoT',
      description: 'Urban monitoring',
      icon: '🏙️',
      position: [6, -2, 0],
      color: '#4F46E5'
    }
  ];

  return (
    <group position={[0, -2, 0]}>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          position={project.position}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          title={project.title}
          description={project.description}
          icon={project.icon}
          color={project.color}
          onClick={() => onProjectClick(project.title)}
        />
      ))}
    </group>
  );
};

// Floating Skills Orbs
const SkillsOrbs = () => {
  const skills = [
    { name: 'React', icon: '⚛️', position: [-8, 0, 0], color: '#61DAFB' },
    { name: 'Node.js', icon: '🟢', position: [-4, 0, 0], color: '#339933' },
    { name: 'Python', icon: '🐍', position: [0, 0, 0], color: '#3776AB' },
    { name: 'AI/ML', icon: '🤖', position: [4, 0, 0], color: '#FF6B6B' },
    { name: 'Blockchain', icon: '🔗', position: [8, 0, 0], color: '#F7931E' }
  ];

  return (
    <group position={[0, 0, 0]}>
      {skills.map((skill, index) => (
        <Float key={index} speed={2} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={skill.position}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <MeshDistortMaterial
              color={skill.color}
              speed={3}
              distort={0.4}
              radius={1}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.2}
            height={0.02}
            position={[skill.position[0], skill.position[1] - 0.8, skill.position[2]]}
            curveSegments={12}
          >
            {skill.name}
            <meshStandardMaterial color="white" />
          </Text3D>
        </Float>
      ))}
    </group>
  );
};

// Central Hero Section
const HeroSection = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Platform */}
      <mesh ref={meshRef} position={[0, -1, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <MeshReflectorMaterial
          color="#1F2937"
          metalness={0.8}
          roughness={0.2}
          mirror={0.5}
        />
      </mesh>
      
      {/* Hero Text */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.8}
          height={0.1}
          position={[-2, 1, 0]}
          curveSegments={12}
        >
          CAEL FINDLEY
          <meshStandardMaterial color="#10B981" />
        </Text3D>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.4}
          height={0.05}
          position={[-1.5, 0.2, 0]}
          curveSegments={12}
        >
          SOFTWARE ENGINEER
          <meshStandardMaterial color="#6B7280" />
        </Text3D>
      </Float>
      
      {/* Sparkles Effect */}
      <Sparkles count={100} scale={10} size={2} speed={0.3} />
    </group>
  );
};

// Main 3D Scene Component
const Scene3D = ({ onNavigate, onProjectClick }) => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Stars Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Scene Components */}
      <HeroSection />
      <NavigationMenu onNavigate={onNavigate} />
      <ProjectShowcase onProjectClick={onProjectClick} />
      <SkillsOrbs />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={30}
        minDistance={5}
      />
    </>
  );
};

export default Scene3D; 