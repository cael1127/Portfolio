import React, { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size with proper aspect ratio
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual size in memory (scaled for device pixel ratio)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Reset transform and scale context to match device pixel ratio
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      
      // Set display size (CSS pixels)
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      return rect;
    };
    // Enhanced Particle class with better physics
    class Particle {
      constructor() {
        const rect = canvas.getBoundingClientRect();
        this.x = Math.random() * (rect.width || window.innerWidth);
        this.y = Math.random() * (rect.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.hue = Math.random() * 60 + 160; // Teal to green range
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.originalSize = this.size;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const rect = canvas.getBoundingClientRect();

        // Wrap around edges with smooth transition
        if (this.x > rect.width + 10) this.x = -10;
        if (this.x < -10) this.x = rect.width + 10;
        if (this.y > rect.height + 10) this.y = -10;
        if (this.y < -10) this.y = rect.height + 10;

        // Enhanced breathing effect with pulse
        this.pulse += this.pulseSpeed;
        this.size = this.originalSize + Math.sin(this.pulse) * 0.5;
        this.opacity = Math.max(0.15, Math.min(0.5, this.opacity + Math.sin(this.pulse * 2) * 0.01));
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        
        // Add glow effect
        ctx.shadowColor = `hsl(${this.hue}, 70%, 60%)`;
        ctx.shadowBlur = 8;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Remove shadow for performance
        ctx.shadowBlur = 0;
        ctx.restore();
      }
    }

    // Create particles - reduced for better performance
    let particles = [];
    const createParticles = () => {
      const rect = canvas.getBoundingClientRect();
      particles = Array.from({ length: 30 }, () => {
        const p = new Particle();
        p.x = Math.random() * (rect.width || window.innerWidth);
        p.y = Math.random() * (rect.height || window.innerHeight);
        return p;
      });
    };

    resizeCanvas();
    createParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    // Animation loop
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Enhanced connections with gradient and performance optimization
      const maxConnections = 3; // Limit connections per particle for performance
      
      particles.forEach((particle, i) => {
        let connectionCount = 0;
        particles.slice(i + 1).forEach(otherParticle => {
          if (connectionCount >= maxConnections) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100 && distance > 20) {
            connectionCount++;
            ctx.save();
            
            // Create gradient connection
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${(100 - distance) / 100 * 0.25})`);
            gradient.addColorStop(1, `hsla(${otherParticle.hue}, 70%, 60%, ${(100 - distance) / 100 * 0.25})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.4;
            ctx.lineCap = 'round';
            ctx.globalAlpha = (100 - distance) / 100 * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  );
};

export default FloatingParticles;
