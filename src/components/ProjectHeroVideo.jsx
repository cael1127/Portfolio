import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../utils/heroScene';

// Looping ambient background video for a project's case-study header.
// Falls back to no video (just the gradient) when reduced motion is preferred.
export default function ProjectHeroVideo({ src, children }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(!prefersReducedMotion());
  }, []);

  return (
    <div className="relative h-full min-h-[220px] w-full overflow-hidden">
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          src={src}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 35%, var(--surface) 105%)' }}
      />
      {children && <div className="relative z-10 h-full">{children}</div>}
    </div>
  );
}
