import React from 'react';
import { motion } from 'framer-motion';
import { easeOut } from '../../utils/motion';

/**
 * Line/word reveal: each word rises from behind a mask.
 * ease-out, no bounce — considered, not decorative.
 */
export default function WordReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  duration = 0.6,
}) {
  const words = String(text).split(' ');
  const MotionTag = motion.create ? motion.create(Tag) : motion[Tag] || motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate="visible"
      aria-label={text}
      variants={{
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        hidden: {},
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="reveal-mask" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              visible: { y: '0%', transition: { duration, ease: easeOut } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </MotionTag>
  );
}
