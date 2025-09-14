import React, { useEffect, useRef, useState } from 'react';

const Reveal = ({ children, className = '', delay = 0, y = 16 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : `opacity-0 translate-y-[${y}px]`
      }`}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
};

export default Reveal;


