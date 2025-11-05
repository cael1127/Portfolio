import React, { useRef, useEffect } from 'react';

const GlareHover = ({ children, className = '', intensity = 0.5, ...props }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const angle = Math.atan2(
        e.clientY - (rect.top + rect.height / 2),
        e.clientX - (rect.left + rect.width / 2)
      );

      const glareX = 50 + Math.cos(angle) * 50;
      const glareY = 50 + Math.sin(angle) * 50;

      container.style.setProperty('--glare-x', `${glareX}%`);
      container.style.setProperty('--glare-y', `${glareY}%`);
      container.style.setProperty('--glare-angle', `${angle}rad`);
    };

    const handleMouseLeave = () => {
      container.style.setProperty('--glare-x', '50%');
      container.style.setProperty('--glare-y', '50%');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        '--intensity': intensity,
      }}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-10"
        style={{
          background: `linear-gradient(
            calc(var(--glare-angle, 0rad) + 45deg),
            transparent 30%,
            rgba(255, 255, 255, calc(0.3 * var(--intensity))) 50%,
            transparent 70%
          )`,
          backgroundPosition: 'var(--glare-x, 50%) var(--glare-y, 50%)',
          backgroundSize: '200% 200%',
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0';
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default GlareHover;

