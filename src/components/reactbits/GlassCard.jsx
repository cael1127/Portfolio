import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const GlassCard = ({ children, className = '', glow = false, tilt = true, ...props }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 50 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], tilt ? ["3deg", "-3deg"] : ["0deg", "0deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], tilt ? ["-3deg", "3deg"] : ["0deg", "0deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current || !tilt) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative backdrop-blur-md bg-gray-800/40 border border-gray-700/50 rounded-xl ${className} ${
        glow && isHovered ? 'shadow-2xl shadow-teal-500/20' : 'shadow-lg'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.4) 0%, rgba(17, 24, 39, 0.4) 100%)',
        boxShadow: glow && isHovered
          ? '0 20px 60px rgba(20, 184, 166, 0.3), 0 0 40px rgba(20, 184, 166, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
          : '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;

