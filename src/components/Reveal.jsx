import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Reveal = ({ 
  children, 
  className = '', 
  delay = 0, 
  y = 16, 
  x = 0,
  scale = 1,
  duration = 0.6,
  stagger = 0,
  direction = 'up'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: y, x: 0, scale: scale };
      case 'down': return { y: -y, x: 0, scale: scale };
      case 'left': return { y: 0, x: x, scale: scale };
      case 'right': return { y: 0, x: -x, scale: scale };
      case 'scale': return { y: 0, x: 0, scale: 0.8 };
      case 'fade': return { y: 0, x: 0, scale: 1 };
      default: return { y: y, x: 0, scale: scale };
    }
  };

  const getFinalPosition = () => {
    return { y: 0, x: 0, scale: 1 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getFinalPosition() : getInitialPosition()}
      transition={{
        duration: duration * 0.6,
        delay: delay * 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: stagger * 0.5
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;


