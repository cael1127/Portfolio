import React, { useState, useEffect, useRef } from 'react';
import CodeViewer from '../CodeViewer';

const ThreeDPortfolioDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const sections = [
    { id: 'home', name: 'Home', color: '#10b981' },
    { id: 'about', name: 'About', color: '#3b82f6' },
    { id: 'projects', name: 'Projects', color: '#8b5cf6' },
    { id: 'skills', name: 'Skills', color: '#f59e0b' },
    { id: 'contact', name: 'Contact', color: '#ef4444' }
  ];

  const projects = [
    { name: 'AI Snake Game', tech: 'Python, PyTorch', color: '#10b981' },
    { name: '3D Portfolio', tech: 'Three.js, React', color: '#3b82f6' },
    { name: 'RAG Chatbot', tech: 'Next.js, LangChain', color: '#8b5cf6' },
    { name: 'Blockchain Demo', tech: 'Solidity, Web3', color: '#f59e0b' },
    { name: 'ML Dashboard', tech: 'TensorFlow, D3.js', color: '#ef4444' }
  ];

  const skills = [
    { name: 'React', level: 90, color: '#61dafb' },
    { name: 'Three.js', level: 85, color: '#000000' },
    { name: 'Python', level: 88, color: '#3776ab' },
    { name: 'Node.js', level: 82, color: '#339933' },
    { name: 'TensorFlow', level: 75, color: '#ff6f00' },
    { name: 'Solidity', level: 70, color: '#363636' }
  ];

  // 3D Scene Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // 3D Cube rotation
    let cubeRotation = { x: 0, y: 0, z: 0 };
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update mouse position for parallax
      const mouseX = mousePosition.x / canvas.width;
      const mouseY = mousePosition.y / canvas.height;

      // Draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw 3D cube
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cubeSize = 60;

      // Apply mouse parallax to rotation
      cubeRotation.x += 0.01 + mouseY * 0.02;
      cubeRotation.y += 0.01 + mouseX * 0.02;
      cubeRotation.z += 0.005;

      // Draw cube faces
      const faces = [
        { points: [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1]], color: '#10b981' },
        { points: [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]], color: '#3b82f6' },
        { points: [[-1, -1, -1], [-1, 1, -1], [-1, 1, 1], [-1, -1, 1]], color: '#8b5cf6' },
        { points: [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]], color: '#f59e0b' },
        { points: [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]], color: '#ef4444' },
        { points: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], color: '#06b6d4' }
      ];

      faces.forEach(face => {
        const projectedPoints = face.points.map(point => {
          // Apply 3D rotation
          let [x, y, z] = point;
          
          // Rotate around X axis
          const cosX = Math.cos(cubeRotation.x);
          const sinX = Math.sin(cubeRotation.x);
          const y1 = y * cosX - z * sinX;
          const z1 = y * sinX + z * cosX;
          
          // Rotate around Y axis
          const cosY = Math.cos(cubeRotation.y);
          const sinY = Math.sin(cubeRotation.y);
          const x2 = x * cosY + z1 * sinY;
          const z2 = -x * sinY + z1 * cosY;
          
          // Rotate around Z axis
          const cosZ = Math.cos(cubeRotation.z);
          const sinZ = Math.sin(cubeRotation.z);
          const x3 = x2 * cosZ - y1 * sinZ;
          const y3 = x2 * sinZ + y1 * cosZ;
          
          // Project to 2D
          const scale = 200 / (200 + z2);
          return {
            x: centerX + x3 * cubeSize * scale,
            y: centerY + y3 * cubeSize * scale,
            z: z2
          };
        });

        // Sort faces by depth for proper rendering
        const avgZ = projectedPoints.reduce((sum, p) => sum + p.z, 0) / projectedPoints.length;
        
        if (avgZ > -0.5) {
          ctx.fillStyle = face.color;
          ctx.beginPath();
          ctx.moveTo(projectedPoints[0].x, projectedPoints[0].y);
          for (let i = 1; i < projectedPoints.length; i++) {
            ctx.lineTo(projectedPoints[i].x, projectedPoints[i].y);
          }
          ctx.closePath();
          ctx.fill();
          
          // Add border
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Draw floating text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('3D Portfolio', centerX, centerY - 120);
      
      ctx.font = '16px Arial';
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('Interactive Three.js Experience', centerX, centerY + 120);

      time += 0.016;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsLoading(false);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition]);

  // Handle mouse movement for parallax
  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const codeExample = `// 3D Portfolio with Three.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeDPortfolio = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Create portfolio sections as 3D objects
    const sections = [
      { name: 'Home', color: 0x10b981, position: [0, 0, 0] },
      { name: 'About', color: 0x3b82f6, position: [2, 0, 0] },
      { name: 'Projects', color: 0x8b5cf6, position: [-2, 0, 0] },
      { name: 'Skills', color: 0xf59e0b, position: [0, 2, 0] },
      { name: 'Contact', color: 0xef4444, position: [0, -2, 0] }
    ];

    sections.forEach((section, index) => {
      // Create geometry
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ 
        color: section.color,
        transparent: true,
        opacity: 0.8
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(...section.position);
      cube.userData = { name: section.name, index };
      scene.add(cube);

      // Add text label
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 256;
      canvas.height = 64;
      context.fillStyle = '#ffffff';
      context.font = '24px Arial';
      context.textAlign = 'center';
      context.fillText(section.name, 128, 32);

      const texture = new THREE.CanvasTexture(canvas);
      const labelGeometry = new THREE.PlaneGeometry(1, 0.25);
      const labelMaterial = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true
      });
      const label = new THREE.Mesh(labelGeometry, labelMaterial);
      label.position.set(...section.position);
      label.position.y += 0.8;
      scene.add(label);
    });

    // Add particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate sections
      scene.children.forEach(child => {
        if (child.userData && child.userData.name) {
          child.rotation.x += 0.01;
          child.rotation.y += 0.01;
        }
      });

      // Rotate particles
      particles.rotation.y += 0.001;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      scene.children.forEach(child => {
        if (child.userData && child.userData.name) {
          child.material.opacity = 0.8;
        }
      });

      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.name) {
          object.material.opacity = 1.0;
          object.scale.setScalar(1.1);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeDPortfolio;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-teal-400">🌐 3D Portfolio Website</h1>
            <p className="text-gray-400">Interactive Three.js experience with WebGL</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 3D Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🎨 Interactive 3D Scene</h3>
              
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  onMouseMove={handleMouseMove}
                  className="w-full h-96 border border-gray-600 rounded cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
                />
                
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 rounded">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-2"></div>
                      <p className="text-gray-400">Loading 3D Scene...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-400 text-center">
                <p>Move your mouse to interact with the 3D scene</p>
                <p>Click sections to navigate through the portfolio</p>
              </div>
            </div>
          </div>

          {/* Navigation and Info */}
          <div className="space-y-6">
            {/* Section Navigation */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">🧭 Navigation</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(section.id)}
                    className={`w-full p-3 rounded-lg transition-colors text-left ${
                      currentSection === section.id
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: section.color }}
                      ></div>
                      <span className="font-medium">{section.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Section Content */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">
                📄 {sections.find(s => s.id === currentSection)?.name}
              </h3>
              
              {currentSection === 'home' && (
                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">Welcome to my 3D portfolio!</p>
                  <p className="text-gray-300">This interactive experience showcases my skills in Three.js, WebGL, and modern web development.</p>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-teal-400 font-semibold">Technologies Used:</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {['Three.js', 'WebGL', 'React', 'JavaScript'].map((tech, index) => (
                        <span key={index} className="bg-teal-600 text-white px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSection === 'projects' && (
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-700 p-3 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white">{project.name}</div>
                          <div className="text-sm text-gray-400">{project.tech}</div>
                        </div>
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: project.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentSection === 'skills' && (
                <div className="space-y-3">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${skill.level}%`,
                            backgroundColor: skill.color
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentSection === 'about' && (
                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">Passionate developer with expertise in:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>3D Graphics and WebGL</li>
                    <li>Interactive Web Experiences</li>
                    <li>Modern JavaScript Frameworks</li>
                    <li>Performance Optimization</li>
                  </ul>
                </div>
              )}

              {currentSection === 'contact' && (
                <div className="space-y-3 text-sm">
                  <p className="text-gray-300">Get in touch for collaboration:</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📧</span>
                      <span className="text-white">findleytechs@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">💼</span>
                      <span className="text-white">LinkedIn</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">🐙</span>
                      <span className="text-white">GitHub</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">✨ Features</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Interactive 3D Scene</li>
                <li>• Mouse Parallax Effects</li>
                <li>• Particle System</li>
                <li>• Smooth Animations</li>
                <li>• Responsive Design</li>
                <li>• WebGL Rendering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeExample}
        language="javascript"
        title="3D Portfolio Implementation"
      />
    </div>
  );
};

export default ThreeDPortfolioDemo; 