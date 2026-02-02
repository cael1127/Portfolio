import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// Parallax component
export const Parallax = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Reveal on scroll component
export const RevealOnScroll = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '',
  amount = 0.3
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount });

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 },
    scale: { scale: 0.8, opacity: 0 },
    fade: { opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={directions[direction] || directions.up}
      animate={isInView ? { x: 0, y: 0, scale: 1, opacity: 1 } : directions[direction] || directions.up}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Sticky section component
export const StickySection = ({ children, className = '', offset = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`sticky top-0 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Scroll progress component for sections
export const SectionProgress = ({ className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-1 bg-gradient-to-r from-teal-500 to-emerald-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};
