import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const GradientMesh = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const xPos = e.clientX - rect.left;
        const yPos = e.clientY - rect.top;
        mouseX.set(xPos);
        mouseY.set(yPos);
        setMousePosition({ x: xPos, y: yPos });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Cursor-following spotlight */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          x: x,
          y: y,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Additional animated gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default GradientMesh;
