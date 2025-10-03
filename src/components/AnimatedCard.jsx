import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = '',
  delay = 0,
  hover = true,
  scale = 1.02,
  duration = 0.3,
  ...props
}) => {
  return (
    <div className="relative">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: delay / 1000,
          ease: "easeOut"
        }}
        whileHover={false}
        whileTap={hover ? { scale: 0.98 } : {}}
        style={{ 
          position: 'relative',
          zIndex: 1,
          isolation: 'isolate'
        }}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedCard;