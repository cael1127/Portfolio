/** Shared motion tokens — ease-out, intentional presence. */

export const easeOut = [0.22, 1, 0.36, 1];
export const easeInOut = [0.45, 0, 0.55, 1];

export const duration = {
  fast: 0.15,
  base: 0.22,
  slow: 0.35,
  page: 0.28,
};

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: duration.base, ease: easeOut },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: duration.base, ease: easeOut },
};

export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.page, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.fast, ease: easeOut },
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
};

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: duration.slow, ease: easeOut },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easeOut },
  },
};

export const hoverLift = {
  whileHover: { y: -2, transition: { duration: duration.fast, ease: easeOut } },
  whileTap: { scale: 0.985, transition: { duration: 0.1 } },
};

export const lineDraw = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 0.5, ease: easeOut, delay: 0.2 },
};
