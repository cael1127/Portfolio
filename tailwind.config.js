/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        canvas: 'var(--bg)',
        elevated: 'var(--surface)',
        ink: 'var(--text)',
        soft: 'var(--muted)',
        line: 'var(--border)',
        accent: 'var(--accent)',
      },
      fontSize: {
        mega: ['clamp(4rem, 15vw, 12rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        hero: ['clamp(3.5rem, 8vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        section: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        sub: ['1.25rem', { lineHeight: '1.4' }],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        craft: '200ms',
      },
      maxWidth: {
        content: '72rem',
        prose: '40rem',
      },
    },
  },
  plugins: [],
};
