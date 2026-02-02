import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveGradientText = ({ text, className = '' }) => {
  const textRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  const springConfig = { damping: 50, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const xPos = ((e.clientX - rect.left) / rect.width) * 100;
        const yPos = ((e.clientY - rect.top) / rect.height) * 100;
        mouseX.set(xPos);
        mouseY.set(yPos);
        setGradientPosition({ x: xPos, y: yPos });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.span
      ref={textRef}
      className={`relative ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, #10b981 0%, #14b8a6 30%, #06b6d4 60%, #3b82f6 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
        display: 'inline-block',
        filter: 'brightness(1.1)',
        backgroundSize: '200% 200%',
      }}
      animate={{
        backgroundPosition: [
          '0% 0%',
          '100% 100%',
          '0% 0%'
        ]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {text}
    </motion.span>
  );
};

export default InteractiveGradientText;
