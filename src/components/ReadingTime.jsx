import React, { useMemo } from 'react';

const ReadingTime = ({ content }) => {
  const readingTime = useMemo(() => {
    if (!content) return 0;
    
    // Remove HTML tags for accurate word count
    const textContent = content.replace(/<[^>]*>/g, '');
    const words = textContent.trim().split(/\s+/).length;
    // Average reading speed: 200 words per minute
    const minutes = Math.ceil(words / 200);
    return minutes;
  }, [content]);

  return (
    <span className="flex items-center gap-1">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {readingTime} {readingTime === 1 ? 'min' : 'mins'} read
    </span>
  );
};

export default ReadingTime;
