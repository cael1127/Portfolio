// Gradient utility functions for dynamic gradient generation

export const gradientSets = {
  teal: {
    primary: 'from-teal-500 to-emerald-500',
    secondary: 'from-teal-600 to-cyan-500',
    accent: 'from-teal-400 to-green-400',
    bg: 'bg-gradient-to-r from-teal-500 to-emerald-500'
  },
  emerald: {
    primary: 'from-emerald-500 to-green-500',
    secondary: 'from-emerald-600 to-teal-500',
    accent: 'from-emerald-400 to-cyan-400',
    bg: 'bg-gradient-to-r from-emerald-500 to-green-500'
  },
  blue: {
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-blue-600 to-indigo-500',
    accent: 'from-blue-400 to-purple-400',
    bg: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  purple: {
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-purple-600 to-indigo-500',
    accent: 'from-purple-400 to-blue-400',
    bg: 'bg-gradient-to-r from-purple-500 to-pink-500'
  }
};

export const getGradient = (type = 'teal', variant = 'primary') => {
  return gradientSets[type]?.[variant] || gradientSets.teal.primary;
};

export const getGradientColors = (type = 'teal') => {
  const colors = {
    teal: ['#14b8a6', '#10b981', '#06b6d4'],
    emerald: ['#10b981', '#059669', '#14b8a6'],
    blue: ['#3b82f6', '#06b6d4', '#6366f1'],
    purple: ['#9333ea', '#a855f7', '#ec4899']
  };
  return colors[type] || colors.teal;
};

export const createAnimatedGradient = (colors, direction = 'to right') => {
  return {
    background: `linear-gradient(${direction}, ${colors.join(', ')})`,
    backgroundSize: '200% 200%',
    animation: 'gradient-shift 3s ease infinite'
  };
};

export const gradientText = (text, gradientClass = 'from-teal-400 via-emerald-400 to-cyan-400') => {
  return `bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`;
};
