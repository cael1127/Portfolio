import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Sparkles, 
  MeshDistortMaterial,
  Box,
  Sphere,
  Cylinder,
  Torus,
  RoundedBox,
  Text,
  Html,
  useTexture,
  MeshReflectorMaterial
} from '@react-three/drei';
import * as THREE from 'three';

// 3D Button Component
export const Button3D = ({ 
  children, 
  position = [0, 0, 0], 
  onClick, 
  color = '#4F46E5',
  size = [2, 0.5, 0.2],
  hoverColor = '#6366F1',
  textColor = 'white',
  icon = null
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.05);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
    onClick?.();
  };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Button Background */}
        <RoundedBox
          args={size}
          radius={0.1}
          smoothness={4}
        >
          <MeshDistortMaterial
            color={hovered ? hoverColor : color}
            speed={2}
            distort={hovered ? 0.2 : 0.05}
            radius={1}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Glow effect */}
        {hovered && (
          <Sparkles
            count={10}
            scale={[size[0] * 1.5, size[1] * 1.5, size[2] * 1.5]}
            size={2}
            speed={0.5}
            color={hoverColor}
          />
        )}

        {/* Text */}
        <Text
          position={[0, 0, size[2] / 2 + 0.01]}
          fontSize={0.2}
          color={textColor}
          anchorX="center"
          anchorY="middle"
        >
          {children}
        </Text>

        {/* Icon if provided */}
        {icon && (
          <Text
            position={[-size[0] / 2 + 0.3, 0, size[2] / 2 + 0.01]}
            fontSize={0.15}
            color={textColor}
            anchorX="center"
            anchorY="middle"
          >
            {icon}
          </Text>
        )}
      </group>
    </Float>
  );
};

// 3D Card Component
export const Card3D = ({ 
  title, 
  description, 
  icon, 
  position = [0, 0, 0], 
  onClick,
  color = '#059669',
  size = [2.5, 1.8, 0.1]
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group
        ref={meshRef}
        position={position}
        scale={hovered ? 1.1 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card Background */}
        <RoundedBox args={size} radius={0.1} smoothness={4}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.3 : 0.1}
            radius={1}
            transparent
            opacity={0.8}
          />
        </RoundedBox>

        {/* Icon */}
        <Text
          position={[0, 0.4, size[2] / 2 + 0.01]}
          fontSize={0.4}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.1, size[2] / 2 + 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          position={[0, -0.2, size[2] / 2 + 0.01]}
          fontSize={0.08}
          color="lightgray"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {description}
        </Text>

        {/* Hover effect */}
        {hovered && (
          <Sparkles
            count={8}
            scale={[size[0] * 1.2, size[1] * 1.2, size[2] * 1.2]}
            size={1.5}
            speed={0.3}
            color={color}
          />
        )}
      </group>
    </Float>
  );
};

// 3D Navigation Menu
export const Navigation3D = ({ onNavigate, position = [0, 0, 0] }) => {
  const menuItems = [
    { title: 'Home', icon: '🏠', color: '#4F46E5', action: () => onNavigate('home') },
    { title: 'Projects', icon: '💼', color: '#059669', action: () => onNavigate('demo-organizer') },
    { title: 'Skills', icon: '⚡', color: '#DC2626', action: () => onNavigate('freelancing') },
    { title: 'Contact', icon: '📧', color: '#7C3AED', action: () => onNavigate('contact') }
  ];

  return (
    <group position={position}>
      {menuItems.map((item, index) => (
        <Button3D
          key={item.title}
          position={[index * 2.5 - 3.75, 0, 0]}
          onClick={item.action}
          color={item.color}
          size={[2, 0.4, 0.15]}
        >
          {item.title}
        </Button3D>
      ))}
    </group>
  );
};

// 3D Skill Orb
export const SkillOrb3D = ({ 
  skill, 
  icon, 
  level, 
  position = [0, 0, 0], 
  color = '#4F46E5' 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main Sphere */}
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.4 : 0.2}
            radius={1}
            transparent
            opacity={0.7}
          />
        </Sphere>

        {/* Inner Sphere */}
        <Sphere args={[0.6, 32, 32]} position={[0, 0, 0.1]}>
          <MeshDistortMaterial
            color={color}
            speed={1.5}
            distort={0.1}
            radius={0.5}
            transparent
            opacity={0.5}
          />
        </Sphere>

        {/* Icon */}
        <Text
          position={[0, 0, 0.9]}
          fontSize={0.3}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>

        {/* Skill Name */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>

        {/* Level Indicator */}
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.1}
          color="lightgray"
          anchorX="center"
          anchorY="middle"
        >
          Level {level}
        </Text>

        {/* Hover effect */}
        {hovered && (
          <Sparkles
            count={15}
            scale={[2, 2, 2]}
            size={2}
            speed={0.4}
            color={color}
          />
        )}
      </group>
    </Float>
  );
};

// 3D Progress Bar
export const ProgressBar3D = ({ 
  progress, 
  position = [0, 0, 0], 
  color = '#4F46E5',
  size = [3, 0.2, 0.1]
}) => {
  const progressRef = useRef();

  useFrame((state) => {
    if (progressRef.current) {
      progressRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1) * 0.02;
    }
  });

  return (
    <group position={position}>
      {/* Background */}
      <RoundedBox args={size} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#374151" transparent opacity={0.5} />
      </RoundedBox>

      {/* Progress Fill */}
      <RoundedBox 
        args={[size[0] * (progress / 100), size[1], size[2]]} 
        radius={0.05} 
        smoothness={4}
        position={[-(size[0] * (1 - progress / 100)) / 2, 0, 0.01]}
      >
        <MeshDistortMaterial
          color={color}
          speed={1}
          distort={0.1}
          radius={0.5}
          transparent
          opacity={0.8}
        />
      </RoundedBox>

      {/* Progress Text */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {progress}%
      </Text>
    </group>
  );
};

// 3D Floating Particles (Optimized)
export const FloatingParticles = ({ count = 50, color = '#4F46E5' }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() * 0.02;
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 20 - 10;
      const z = Math.random() * 20 - 10;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      particle.time += particle.speed;
      particle.y += Math.sin(particle.time) * 0.01;
      particle.x += Math.cos(particle.time) * 0.01;
    });
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// 3D Loading Spinner
export const LoadingSpinner3D = ({ position = [0, 0, 0], color = '#4F46E5' }) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Torus args={[1, 0.1, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.2}
          radius={1}
          transparent
          opacity={0.8}
        />
      </Torus>
      
      <Torus args={[0.7, 0.08, 16, 32]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.15}
          radius={0.7}
          transparent
          opacity={0.6}
        />
      </Torus>
    </group>
  );
};

// 3D Interactive Cube
export const InteractiveCube3D = ({ 
  position = [0, 0, 0], 
  color = '#4F46E5',
  onClick,
  size = 1
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={meshRef}
        position={position}
        scale={hovered ? 1.2 : 1}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <Box args={[size, size, size]}>
          <MeshDistortMaterial
            color={color}
            speed={2}
            distort={hovered ? 0.3 : 0.1}
            radius={1}
            transparent
            opacity={0.8}
          />
        </Box>
        
        {hovered && (
          <Sparkles
            count={20}
            scale={[size * 2, size * 2, size * 2]}
            size={2}
            speed={0.4}
            color={color}
          />
        )}
      </group>
    </Float>
  );
};

// 3D Animated Sphere
export const AnimatedSphere3D = ({ 
  position = [0, 0, 0], 
  color = '#4F46E5',
  size = 1
}) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <Sphere args={[size, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            speed={1.5}
            distort={0.2}
            radius={1}
            transparent
            opacity={0.7}
          />
        </Sphere>
      </group>
    </Float>
  );
}; 