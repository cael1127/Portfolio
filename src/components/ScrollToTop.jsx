import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
                      <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-teal-600 hover:bg-teal-700 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center animate-scroll-bounce"
                aria-label="Scroll to top"
              >
          <span className="text-xl">↑</span>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
