import React from 'react';
import Reveal from './Reveal';
import CaseStudy from './CaseStudy';
import ProjectThumb from './ProjectThumb';
import DemoReadme from './DemoReadme';

const ProjectLayout = ({ 
  title, 
  subtitle, 
  emoji, 
  onBack, 
  next, 
  children, 
  demo, 
  overview, 
  role, 
  stack, 
  challenges, 
  results,
  problem,
  approach,
  highlights 
}) => {
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
                <li><a href="#demo" className="hover:text-white">Live Demo</a></li>
                <li><a href="#code" className="hover:text-white">Code & Skills</a></li>
                <li><a href="#overview" className="hover:text-white">Overview</a></li>
                <li><a href="#role" className="hover:text-white">My Role</a></li>
                <li><a href="#tech-stack" className="hover:text-white">Tech Stack</a></li>
                <li><a href="#challenges" className="hover:text-white">Challenges</a></li>
                <li><a href="#results" className="hover:text-white">Results</a></li>
              </ul>
            </nav>
          </aside>
          <div className="space-y-8">
            {/* Live Demo Section */}
            <Reveal>
              <div id="demo" className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <ProjectThumb emoji={emoji} accent="#10b981" />
                  <div>
                    <h2 className="text-xl font-semibold">Live Demo</h2>
                    <p className="text-gray-400 text-sm">Interactive demonstration of the project</p>
                  </div>
                </div>
                {demo || children}
              </div>
            </Reveal>

            {/* Code & Skills Section */}
            <Reveal delay={150}>
              <div id="code" className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Code & Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-green-400">Key Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {stack?.map((tech, index) => (
                        <span key={index} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 text-blue-400">Code Highlights</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {highlights?.map((highlight, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-blue-400">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Overview Section */}
            <Reveal delay={250}>
              <div id="overview" className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">{overview}</p>
              </div>
            </Reveal>

            {/* Case Study Section */}
            <Reveal delay={350}>
              <div id="role">
                <CaseStudy
                  overview={overview}
                  role={role}
                  stack={stack}
                  challenges={challenges}
                  results={results}
                />
              </div>
            </Reveal>

            {/* Demo Readme Section */}
            {problem && approach && (
              <Reveal delay={450}>
                <div id="approach">
                  <DemoReadme
                    problem={problem}
                    approach={approach}
                    highlights={highlights}
                  />
                </div>
              </Reveal>
            )}

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


