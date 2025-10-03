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
      whileHover={hover ? {
        scale: 1.05,
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;