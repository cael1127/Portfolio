import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ' +
  'transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ' +
  'disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-500',
  secondary:
    'bg-gray-800/60 text-white border border-gray-700 hover:bg-gray-800 hover:border-gray-600',
  ghost: 'bg-transparent text-gray-200 hover:bg-gray-800/60 border border-transparent hover:border-gray-700',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
};

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const classes = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
    .filter(Boolean)
    .join(' ');

  return <Comp className={classes} {...props} />;
}

