import React from 'react';

const DemoReadme = ({ problem, approach, highlights = [], repoLink }) => {
  return (
    <div className="mt-6 bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h3 className="text-xl font-semibold mb-3">README (short)</h3>
      <div className="text-gray-300 text-sm leading-relaxed">
        <p className="mb-3"><span className="text-gray-400">Problem:</span> {problem}</p>
        <p className="mb-3"><span className="text-gray-400">Approach:</span> {approach}</p>
        {highlights.length > 0 && (
          <div className="mb-3">
            <div className="text-gray-400 mb-1">Highlights:</div>
            <ul className="list-disc pl-5 space-y-1">
              {highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-emerald-300 text-sm">View repository →</a>
        )}
      </div>
    </div>
  );
};

export default DemoReadme;


