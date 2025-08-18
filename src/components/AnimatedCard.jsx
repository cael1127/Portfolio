import React, { useEffect, useRef, useState } from 'react';

const AnimatedCard = ({ 
  children, 
  delay = 0, 
  direction = 'up', 
  className = '',
  onClick,
  onAnimationComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
            if (onAnimationComplete) onAnimationComplete();
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay, hasAnimated, onAnimationComplete]);

  const getTransformStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'translateX(-100px)';
        case 'right':
          return 'translateX(100px)';
        case 'up':
          return 'translateY(50px)';
        case 'down':
          return 'translateY(-50px)';
        default:
          return 'translateY(50px)';
      }
    }
    return 'translateX(0) translateY(0)';
  };

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-500 ease-out overscroll-behavior ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransformStyles(),
        filter: isVisible ? 'blur(0px)' : 'blur(1px)',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
