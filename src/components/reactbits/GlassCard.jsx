import React from 'react';

const GlassCard = ({ children, className = '', glow = false, ...props }) => {
  return (
    <div
      className={`relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl ${className} ${
        glow ? 'shadow-lg shadow-white/5' : ''
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        boxShadow: glow
          ? '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 20px rgba(255, 255, 255, 0.1)'
          : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;

