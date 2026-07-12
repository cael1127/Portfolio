import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '../../utils/motion';

/**
 * Scroll-triggered reveal. Rises + fades once, on view.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  duration = 0.6,
  as = 'div',
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  );
}
