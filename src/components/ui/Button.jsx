import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ' +
  'transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

const variants = {
  primary:
    'bg-[var(--accent)] text-[var(--accent-fg)] hover:brightness-110',
  secondary:
    'bg-transparent text-[var(--text)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-[var(--surface)]',
  ghost:
    'bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
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
