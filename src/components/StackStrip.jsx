import React from 'react';

const items = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'Tailwind', 'Netlify', 'AI/LLMs', 'Security audits', 'Performance', 'Accessibility'];

const StackStrip = () => {
  return (
    <div className="container mx-auto px-4 py-12 border-t border-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Stack & services</h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 rounded-full text-sm bg-gray-800 border border-gray-700 text-gray-200">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default StackStrip;


