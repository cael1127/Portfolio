import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  Environment, 
  Float, 
  Text,
  OrbitControls,
  useTexture,
  Box,
  RoundedBox,
  MeshDistortMaterial,
  Sparkles
} from '@react-three/drei';
import * as THREE from 'three';

// TheDropStore-style 3D Product Card
const DropStoreCard = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  position = [0, 0, 0], 
  onClick,
  color = '#059669',
  size = [3.5, 2.5, 0.1],
  price = null,
  status = null,
  rating = null
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        scale={hovered ? 1.15 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card Background */}
        <RoundedBox args={size} radius={0.15} smoothness={4}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.4 : 0.1}
            radius={1}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Status Badge */}
        {status && (
          <Text
            position={[-size[0]/2 + 0.3, size[1]/2 - 0.2, size[2] / 2 + 0.01]}
            fontSize={0.08}
            color={status === 'hot' ? '#DC2626' : status === 'new' ? '#059669' : '#D97706'}
            anchorX="left"
            anchorY="top"
          >
            {status.toUpperCase()}
          </Text>
        )}

        {/* Icon */}
        <Text
          position={[0, 0.8, size[2] / 2 + 0.01]}
          fontSize={0.6}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.3, size[2] / 2 + 0.01]}
          fontSize={0.18}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Subtitle */}
        <Text
          position={[0, 0.1, size[2] / 2 + 0.01]}
          fontSize={0.12}
          color="#E5E7EB"
          anchorX="center"
          anchorY="middle"
        >
          {subtitle}
        </Text>

        {/* Description */}
        <Text
          position={[0, -0.2, size[2] / 2 + 0.01]}
          fontSize={0.08}
          color="#9CA3AF"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {description}
        </Text>

        {/* Price */}
        {price && (
          <Text
            position={[0, -0.6, size[2] / 2 + 0.01]}
            fontSize={0.15}
            color="#10B981"
            anchorX="center"
            anchorY="middle"
          >
            ${price}
          </Text>
        )}

        {/* Rating */}
        {rating && (
          <Text
            position={[0, -0.8, size[2] / 2 + 0.01]}
            fontSize={0.1}
            color="#F59E0B"
            anchorX="center"
            anchorY="middle"
          >
            {'⭐'.repeat(rating)}
          </Text>
        )}

        {/* Hover effect */}
        {hovered && (
          <Sparkles
            count={15}
            scale={[size[0] * 1.2, size[1] * 1.2, size[2] * 1.2]}
            size={2}
            speed={0.3}
            color={color}
          />
        )}
      </group>
    </Float>
  );
};

// TheDropStore-style 3D Button
const DropStoreButton = ({ 
  children, 
  position = [0, 0, 0], 
  onClick, 
  color = '#059669',
  size = [2.5, 0.6, 0.2],
  isActive = false,
  variant = 'primary' // primary, secondary, outline
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      if (hovered) {
        meshRef.current.scale.setScalar(1.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getButtonColor = () => {
    if (isActive) return '#10B981';
    if (hovered) return '#14B8A6';
    if (variant === 'outline') return 'transparent';
    return color;
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <RoundedBox args={size} radius={0.1} smoothness={4}>
          <MeshDistortMaterial
            color={getButtonColor()}
            speed={2}
            distort={hovered ? 0.2 : 0.05}
            radius={1}
            transparent
            opacity={variant === 'outline' ? 0.3 : 0.9}
          />
        </RoundedBox>

        <Text
          position={[0, 0, size[2] / 2 + 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {children}
        </Text>
      </group>
    </Float>
  );
};

// Enhanced 3D Scene Component - TheDropStore + Uplinq Hybrid
const Enhanced3DScene = ({ setCurrentPage, currentPage }) => {
  const [selectedSection, setSelectedSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const sections = [
    { id: 'home', name: 'Home', icon: '🏠', color: '#059669' },
    { id: 'store', name: 'Store', icon: '🛒', color: '#10B981' },
    { id: 'projects', name: 'Projects', icon: '💼', color: '#14B8A6' },
    { id: 'skills', name: 'Skills', icon: '⚡', color: '#0D9488' },
    { id: 'contact', name: 'Contact', icon: '📧', color: '#0F766E' }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: '🌟', color: '#059669' },
    { id: 'hot', name: 'Hot Items', icon: '🔥', color: '#DC2626' },
    { id: 'new', name: 'New Arrivals', icon: '🆕', color: '#10B981' },
    { id: 'featured', name: 'Featured', icon: '⭐', color: '#D97706' },
    { id: 'trending', name: 'Trending', icon: '📈', color: '#14B8A6' }
  ];

  const products = [
    { 
      id: 'ai-assistant-demo', 
      title: 'AI Assistant Pro', 
      subtitle: 'Advanced Chatbot',
      description: 'GPT-4 powered conversational AI with natural language processing',
      icon: '🤖', 
      color: '#059669',
      price: 299,
      status: 'hot',
      rating: 5,
      category: 'hot'
    },
    { 
      id: 'blockchain-demo', 
      title: 'DeFi Platform', 
      subtitle: 'Blockchain Solution',
      description: 'Decentralized finance application with smart contract integration',
      icon: '⛓️', 
      color: '#10B981',
      price: 499,
      status: 'new',
      rating: 4,
      category: 'new'
    },
    { 
      id: 'restaurant-app-demo', 
      title: 'Restaurant Hub', 
      subtitle: 'Food Delivery App',
      description: 'Full-stack restaurant management and delivery platform',
      icon: '🍽️', 
      color: '#14B8A6',
      price: 199,
      status: 'featured',
      rating: 5,
      category: 'featured'
    },
    { 
      id: 'game-platform-demo', 
      title: 'Game Studio', 
      subtitle: 'Gaming Platform',
      description: 'Multiplayer gaming platform with real-time collaboration',
      icon: '🎮', 
      color: '#0D9488',
      price: 399,
      status: 'trending',
      rating: 4,
      category: 'trending'
    },
    { 
      id: 'portfolio-builder-demo', 
      title: 'Portfolio Creator', 
      subtitle: 'Website Builder',
      description: 'Drag-and-drop portfolio builder with customizable templates',
      icon: '🎨', 
      color: '#0F766E',
      price: 149,
      status: 'hot',
      rating: 5,
      category: 'hot'
    },
    { 
      id: 'whiteboard-demo', 
      title: 'Collaborative Canvas', 
      subtitle: 'Whiteboard App',
      description: 'Real-time collaborative whiteboard for team brainstorming',
      icon: '✏️', 
      color: '#047857',
      price: 99,
      status: 'new',
      rating: 4,
      category: 'new'
    }
  ];

  const skills = [
    { name: 'React Pro', level: 95, icon: '⚛️', color: '#059669', price: 199, status: 'hot' },
    { name: 'Node.js Expert', level: 90, icon: '🚀', color: '#10B981', price: 179, status: 'featured' },
    { name: 'Python Master', level: 88, icon: '🐍', color: '#14B8A6', price: 159, status: 'trending' },
    { name: 'AWS Cloud', level: 85, icon: '☁️', color: '#0D9488', price: 299, status: 'hot' },
    { name: 'TypeScript Pro', level: 92, icon: '📘', color: '#0F766E', price: 189, status: 'new' },
    { name: 'Docker Expert', level: 87, icon: '🐳', color: '#047857', price: 169, status: 'featured' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const handleProjectClick = (projectId) => {
    setCurrentPage(projectId);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'home':
        return (
          <>
            {/* Hero Section */}
            <group position={[0, 8, 0]}>
              <Text
                fontSize={2}
                color="#059669"
                anchorX="center"
                anchorY="middle"
                position={[-2, 0, 0]}
              >
                Cael Findley
              </Text>
              <Text
                fontSize={0.8}
                color="#10B981"
                anchorX="center"
                anchorY="middle"
                position={[2, 0, 0]}
              >
                Software Engineer
              </Text>
            </group>

            {/* Description */}
            <group position={[0, 5, 0]}>
              <Text
                fontSize={0.3}
                color="#9CA3AF"
                anchorX="center"
                anchorY="middle"
                maxWidth={8}
              >
                Full-Stack Developer specializing in modern web technologies, 
                cloud infrastructure, and innovative solutions that drive business growth.
              </Text>
            </group>

            {/* Action Buttons */}
            <group position={[0, 2, 0]}>
              <DropStoreButton
                position={[-3, 0, 0]}
                onClick={() => setSelectedSection('store')}
                color="#10B981"
                size={[3, 0.7, 0.2]}
              >
                Browse Store
              </DropStoreButton>
              <DropStoreButton
                position={[3, 0, 0]}
                onClick={() => setCurrentPage('contact')}
                color="#059669"
                size={[3, 0.7, 0.2]}
              >
                Get In Touch
              </DropStoreButton>
            </group>
          </>
        );

      case 'store':
        return (
          <>
            {/* Section Title */}
            <group position={[0, 10, 0]}>
              <Text
                fontSize={1.5}
                color="#059669"
                anchorX="center"
                anchorY="middle"
              >
                Digital Store
              </Text>
            </group>

            {/* Search Bar */}
            <group position={[0, 8, 0]}>
              <Text
                fontSize={0.2}
                color="#9CA3AF"
                anchorX="center"
                anchorY="middle"
              >
                Search: {searchTerm || 'All products...'}
              </Text>
            </group>

            {/* Category Filter */}
            <group position={[0, 6, 0]}>
              {categories.map((category, index) => (
                <DropStoreButton
                  key={category.id}
                  position={[index * 2.5 - 5, 0, 0]}
                  onClick={() => setSelectedCategory(category.id)}
                  color={category.color}
                  isActive={selectedCategory === category.id}
                  size={[2.2, 0.5, 0.2]}
                >
                  {category.name}
                </DropStoreButton>
              ))}
            </group>

            {/* Product Grid */}
            <group position={[0, 2, 0]}>
              {filteredProducts.map((product, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                return (
                  <DropStoreCard
                    key={product.id}
                    title={product.title}
                    subtitle={product.subtitle}
                    description={product.description}
                    icon={product.icon}
                    position={[col * 4.5 - 4.5, -row * 3.5, 0]}
                    color={product.color}
                    price={product.price}
                    status={product.status}
                    rating={product.rating}
                    onClick={() => handleProjectClick(product.id)}
                  />
                );
              })}
            </group>
          </>
        );

      case 'projects':
        return (
          <>
            {/* Section Title */}
            <group position={[0, 10, 0]}>
              <Text
                fontSize={1.5}
                color="#059669"
                anchorX="center"
                anchorY="middle"
              >
                Featured Projects
              </Text>
            </group>

            {/* Project Cards Grid */}
            <group position={[0, 5, 0]}>
              {products.map((project, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                return (
                  <DropStoreCard
                    key={project.id}
                    title={project.title}
                    subtitle={project.subtitle}
                    description={project.description}
                    icon={project.icon}
                    position={[col * 4.5 - 4.5, -row * 3.5, 0]}
                    color={project.color}
                    status={project.status}
                    rating={project.rating}
                    onClick={() => handleProjectClick(project.id)}
                  />
                );
              })}
            </group>
          </>
        );

      case 'skills':
        return (
          <>
            {/* Section Title */}
            <group position={[0, 10, 0]}>
              <Text
                fontSize={1.5}
                color="#059669"
                anchorX="center"
                anchorY="middle"
              >
                Technical Skills
              </Text>
            </group>

            {/* Skills Grid */}
            <group position={[0, 5, 0]}>
              {skills.map((skill, index) => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                return (
                  <DropStoreCard
                    key={skill.name}
                    title={skill.name}
                    subtitle={`${skill.level}% Proficiency`}
                    description={`Expert level proficiency in ${skill.name}`}
                    icon={skill.icon}
                    position={[col * 4.5 - 4.5, -row * 3.5, 0]}
                    color={skill.color}
                    price={skill.price}
                    status={skill.status}
                    rating={Math.floor(skill.level / 20)}
                  />
                );
              })}
            </group>
          </>
        );

      case 'contact':
        return (
          <>
            {/* Section Title */}
            <group position={[0, 10, 0]}>
              <Text
                fontSize={1.5}
                color="#059669"
                anchorX="center"
                anchorY="middle"
              >
                Get In Touch
              </Text>
            </group>

            {/* Contact Cards */}
            <group position={[0, 5, 0]}>
              <DropStoreCard
                title="Email"
                subtitle="findleytechs@gmail.com"
                description="Send me a message for collaboration opportunities"
                icon="📧"
                position={[-4.5, 0, 0]}
                color="#059669"
                onClick={() => setCurrentPage('contact')}
              />
              <DropStoreCard
                title="LinkedIn"
                subtitle="caelfindley"
                description="Connect with me on LinkedIn for professional networking"
                icon="💼"
                position={[0, 0, 0]}
                color="#10B981"
                onClick={() => setCurrentPage('contact')}
              />
              <DropStoreCard
                title="GitHub"
                subtitle="caelfindley"
                description="Check out my open source projects and contributions"
                icon="🐙"
                position={[4.5, 0, 0]}
                color="#14B8A6"
                onClick={() => setCurrentPage('contact')}
              />
            </group>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 25], fov: 50 }}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
          
          {/* Navigation */}
          <group position={[0, 12, 0]}>
            {sections.map((section, index) => (
              <DropStoreButton
                key={section.id}
                position={[index * 2.8 - 5.6, 0, 0]}
                onClick={() => setSelectedSection(section.id)}
                color={section.color}
                isActive={selectedSection === section.id}
                size={[2.2, 0.5, 0.2]}
              >
                {section.name}
              </DropStoreButton>
            ))}
          </group>

          {/* Content */}
          {renderContent()}
        </Canvas>
      </div>
    </div>
  );
};

export default Enhanced3DScene; 