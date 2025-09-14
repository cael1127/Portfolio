import React from 'react';

const ProjectLayout = ({ title, subtitle, emoji, onBack, next, children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="text-xl">←</span>
              <span>Back to work</span>
            </button>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold">
                <span className="mr-2">{emoji}</span>
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-400 text-sm">{subtitle}</p>
              )}
            </div>
            <div className="w-24" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="grid lg:grid-cols-[220px,1fr] gap-6 items-start">
          <aside className="hidden lg:block sticky top-24 self-start">
            <nav className="text-sm">
              <div className="text-gray-400 uppercase tracking-wide mb-2">On this page</div>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#overview" className="hover:text-white">Overview</a></li>
                <li><a href="#role" className="hover:text-white">My role</a></li>
                <li><a href="#tech-stack" className="hover:text-white">Tech stack</a></li>
                <li><a href="#challenges" className="hover:text-white">Challenges</a></li>
                <li><a href="#results" className="hover:text-white">Results</a></li>
              </ul>
            </nav>
          </aside>
          <div>
            {children}
            {next && (
              <div className="mt-10 pt-6 border-t border-gray-800 flex items-center justify-between">
                <span className="text-gray-400 text-sm">Next project</span>
                <button onClick={next.onClick} className="text-primary hover:text-emerald-300">{next.label} →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;


