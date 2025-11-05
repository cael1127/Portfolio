import React, { useEffect, useRef } from 'react';

const BounceCard = ({ children, delay = 0, className = '', ...props }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.animation = `bounceIn 0.6s ease-out ${delay}s both`;
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`${className}`}
      style={{
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
      }}
      {...props}
    >
      {children}
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BounceCard;

