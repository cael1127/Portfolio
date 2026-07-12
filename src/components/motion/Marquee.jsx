import React from 'react';

/**
 * Infinite CSS marquee. Duplicates children once for a seamless -50% loop.
 * Pauses on hover; respects reduced-motion.
 */
export default function Marquee({ children, duration = 32, reverse = false, className = '' }) {
  const items = React.Children.toArray(children);

  return (
    <div className={`marquee-track overflow-hidden ${className}`}>
      <div
        className={`marquee ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}
