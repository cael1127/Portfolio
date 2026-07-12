import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin maroon reading-progress bar pinned to the top of the viewport.
 * Spring-smoothed so it glides rather than snaps.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  );
}
