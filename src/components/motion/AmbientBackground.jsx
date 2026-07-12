import React from 'react';

/**
 * Fixed, low-intensity ambient layer: two slow-drifting accent glows plus
 * a faint film grain. Sits behind all content; respects reduced-motion via CSS.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden>
      <div className="ambient-blob ambient-blob-1" />
      <div className="ambient-blob ambient-blob-2" />
      <div className="ambient-grain" />
    </div>
  );
}
