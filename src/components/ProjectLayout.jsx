import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';
import CaseStudy from './CaseStudy';
import ProjectThumb from './ProjectThumb';
import DemoReadme from './DemoReadme';
import ProjectTutorial from './ProjectTutorial';
import GlassCard from './reactbits/GlassCard';
import ScrollReveal from './reactbits/ScrollReveal';
import GlareHover from './reactbits/GlareHover';

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
  highlights,
  // New tutorial props
  tutorialSummary,
  difficulty,
  timeEstimate,
  keyConcepts,
  tutorialSteps,
  setupInstructions,
  deploymentGuide,
  troubleshooting
}) => {
  // Scroll to top when component mounts
  useEffect(() => {
    // Use instant scroll for immediate positioning
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Also ensure it happens after a brief delay to catch any late-rendering content
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">←</span>
              <span>Back to work</span>
            </motion.button>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-[220px,1fr] gap-6 items-start">
          <aside className="hidden lg:block sticky top-24 self-start">
            <motion.nav 
              className="text-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-gray-400 uppercase tracking-wide mb-2">On this page</div>
              <ul className="space-y-2 text-gray-300">
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#demo" className="hover:text-white transition-colors">Live Demo</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#code" className="hover:text-white transition-colors">Code & Skills</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#overview" className="hover:text-white transition-colors">Overview</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#role" className="hover:text-white transition-colors">My Role</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#challenges" className="hover:text-white transition-colors">Challenges</a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a href="#results" className="hover:text-white transition-colors">Results</a>
                </motion.li>
                {(tutorialSummary || tutorialSteps) && (
                  <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400 }}>
                    <a href="#tutorial" className="hover:text-white transition-colors">Tutorial</a>
                  </motion.li>
                )}
              </ul>
            </motion.nav>
          </aside>
          <div className="space-y-8">
            {/* Live Demo Section */}
            <ScrollReveal delay={0} direction="up">
              <GlareHover intensity={0.3}>
                <GlassCard className="p-4 sm:p-6" glow>
                  <div id="demo" className="overflow-x-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <ProjectThumb emoji={emoji} accent="#10b981" />
                      <div>
                        <h2 className="text-xl font-semibold">Live Demo</h2>
                        <p className="text-gray-400 text-sm">Interactive demonstration of the project</p>
                      </div>
                    </div>
                    <div className="w-full max-w-full min-h-[400px] p-4 sm:p-6 bg-gray-900/30 rounded-lg border border-gray-700/50 overflow-x-auto">
                      {demo || children}
                    </div>
                  </div>
                </GlassCard>
              </GlareHover>
            </ScrollReveal>

            {/* Code & Skills Section */}
            <ScrollReveal delay={0.15} direction="up">
              <GlassCard className="p-4 sm:p-6" glow>
                <div id="code">
                <h2 className="text-xl font-semibold mb-4">Code & Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3 text-green-400">Key Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {stack?.map((tech, index) => (
                        <motion.span 
                          key={index} 
                          className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(34, 197, 94, 0.3)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3 text-blue-400">Code Highlights</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {highlights?.map((highlight, index) => (
                        <motion.li 
                          key={index} 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ x: 4 }}
                        >
                          <span className="text-blue-400">•</span>
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Overview Section */}
            <ScrollReveal delay={0.25} direction="up">
              <GlassCard className="p-4 sm:p-6" glow>
                <div id="overview">
                  <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed">{overview}</p>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Case Study Section */}
            <ScrollReveal delay={0.35} direction="up">
              <div id="role">
                <CaseStudy
                  overview={overview}
                  role={role}
                  stack={stack}
                  challenges={challenges}
                  results={results}
                />
              </div>
            </ScrollReveal>

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

            {/* Tutorial Section - Blended Format */}
            {(tutorialSummary || tutorialSteps || keyConcepts) && (
              <Reveal delay={500}>
                <div id="tutorial">
                  <ProjectTutorial
                    summary={tutorialSummary}
                    difficulty={difficulty}
                    timeEstimate={timeEstimate}
                    keyConcepts={keyConcepts}
                    steps={tutorialSteps}
                    setupInstructions={setupInstructions}
                    deploymentGuide={deploymentGuide}
                    troubleshooting={troubleshooting}
                  />
                </div>
              </Reveal>
            )}

            {next && (
              <motion.div 
                className="mt-10 pt-6 border-t border-gray-800 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-gray-400 text-sm">Next project</span>
                <motion.button 
                  onClick={next.onClick} 
                  className="text-green-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-2"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {next.label} <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;


