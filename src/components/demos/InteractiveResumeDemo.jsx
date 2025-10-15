import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const InteractiveResumeDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [activeSection, setActiveSection] = useState('experience');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const resumeData = {
    personal: {
      name: 'Jane Developer',
      title: 'Senior Full-Stack Engineer',
      email: 'jane@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'janedeveloper.com',
      github: 'github.com/janedeveloper',
      linkedin: 'linkedin.com/in/janedeveloper',
      summary: 'Passionate full-stack engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.'
    },
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        period: '2020 - Present',
        location: 'San Francisco, CA',
        description: 'Lead development of microservices architecture serving 10M+ users',
        achievements: [
          'Architected and implemented microservices platform reducing latency by 40%',
          'Led team of 6 engineers in building real-time analytics dashboard',
          'Reduced infrastructure costs by 30% through optimization',
          'Mentored junior developers and conducted code reviews'
        ],
        technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL', 'Redis']
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full-Stack Developer',
        period: '2018 - 2020',
        location: 'Remote',
        description: 'Built and scaled e-commerce platform from 0 to 1M users',
        achievements: [
          'Developed responsive web application using React and TypeScript',
          'Implemented payment processing with Stripe integration',
          'Built REST API serving 100K+ requests/day',
          'Optimized database queries reducing response time by 60%'
        ],
        technologies: ['React', 'TypeScript', 'Express', 'MongoDB', 'Stripe']
      },
      {
        id: 3,
        company: 'Digital Agency',
        position: 'Junior Developer',
        period: '2016 - 2018',
        location: 'New York, NY',
        description: 'Developed client websites and web applications',
        achievements: [
          'Built 15+ responsive websites for enterprise clients',
          'Implemented custom CMS using WordPress and React',
          'Collaborated with designers to create pixel-perfect UIs',
          'Maintained and improved existing codebases'
        ],
        technologies: ['JavaScript', 'React', 'WordPress', 'PHP', 'MySQL']
      }
    ],
    skills: {
      frontend: [
        { name: 'React', level: 95, years: 6 },
        { name: 'TypeScript', level: 90, years: 4 },
        { name: 'Next.js', level: 85, years: 3 },
        { name: 'Vue.js', level: 75, years: 2 }
      ],
      backend: [
        { name: 'Node.js', level: 90, years: 6 },
        { name: 'Express', level: 90, years: 6 },
        { name: 'Python', level: 80, years: 4 },
        { name: 'GraphQL', level: 85, years: 3 }
      ],
      database: [
        { name: 'PostgreSQL', level: 85, years: 5 },
        { name: 'MongoDB', level: 90, years: 6 },
        { name: 'Redis', level: 80, years: 4 }
      ],
      cloud: [
        { name: 'AWS', level: 85, years: 5 },
        { name: 'Docker', level: 90, years: 4 },
        { name: 'Kubernetes', level: 75, years: 2 }
      ]
    },
    education: [
      {
        degree: 'BS in Computer Science',
        school: 'University of California',
        period: '2012 - 2016',
        gpa: '3.8/4.0',
        achievements: ['Dean\'s List', 'CS Department Award']
      }
    ],
    projects: [
      {
        name: 'Open Source Contribution',
        description: 'Active contributor to React ecosystem',
        stats: '500+ commits, 50+ PRs merged'
      },
      {
        name: 'Tech Blog',
        description: 'Writing about web development and architecture',
        stats: '100K+ monthly readers'
      }
    ]
  };

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D } from '@react-three/drei';

// 3D Interactive Resume Component
const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="interactive-resume">
      {/* Hero Section with 3D Name */}
      <section className="hero-3d">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={1}
            height={0.2}
            curveSegments={12}
          >
            Your Name
            <meshNormalMaterial />
          </Text3D>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>

      {/* Animated Timeline */}
      <section className="experience-timeline">
        <h2>Experience</h2>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="timeline-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="timeline-marker" />
            <div className="timeline-content">
              <h3>{exp.position}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.period}</p>
              <ul>
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Interactive Skills Visualization */}
      <section className="skills-interactive">
        <h2>Skills</h2>
        <div className="skills-graph">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-bar"
              initial={{ width: 0 }}
              whileInView={{ width: \`\${skill.level}%\` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Parallax Projects Section */}
      <section className="projects-parallax">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [0, -50 * (index + 1)]
            );

            return (
              <motion.div
                key={project.id}
                className="project-card"
                style={{ y }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Animated Contact Form */}
      <section className="contact-animated">
        <h2>Get In Touch</h2>
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.input
            type="text"
            placeholder="Your Name"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            placeholder="Your Email"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            placeholder="Your Message"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

// Advanced Features

// PDF Generation
import { jsPDF } from 'jspdf';

const generatePDF = (resumeData) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.text(resumeData.personal.name, 20, 20);
  doc.setFontSize(14);
  doc.text(resumeData.personal.title, 20, 30);
  
  // Experience
  let y = 50;
  doc.setFontSize(16);
  doc.text('Experience', 20, y);
  y += 10;
  
  resumeData.experience.forEach(exp => {
    doc.setFontSize(12);
    doc.text(\`\${exp.position} at \${exp.company}\`, 20, y);
    y += 6;
    doc.setFontSize(10);
    doc.text(exp.period, 20, y);
    y += 6;
    
    exp.achievements.forEach(achievement => {
      doc.text(\`• \${achievement}\`, 25, y);
      y += 6;
    });
    
    y += 5;
  });
  
  doc.save('resume.pdf');
};

// Analytics Tracking
const trackResumeInteraction = (section) => {
  // Track which sections viewers spend time on
  analytics.track('resume_section_view', {
    section,
    timestamp: new Date(),
    duration: performance.now()
  });
};

// Export as JSON (for ATS systems)
const exportResumeJSON = (resumeData) => {
  const json = {
    basics: {
      name: resumeData.personal.name,
      label: resumeData.personal.title,
      email: resumeData.personal.email,
      phone: resumeData.personal.phone,
      website: resumeData.personal.website,
      summary: resumeData.personal.summary,
      location: {
        city: resumeData.personal.location
      }
    },
    work: resumeData.experience.map(exp => ({
      company: exp.company,
      position: exp.position,
      startDate: exp.period.split('-')[0].trim(),
      endDate: exp.period.split('-')[1].trim(),
      summary: exp.description,
      highlights: exp.achievements
    })),
    skills: Object.entries(resumeData.skills).flatMap(([category, skills]) =>
      skills.map(skill => ({
        name: skill.name,
        level: skill.level,
        keywords: [category]
      }))
    )
  };
  
  return JSON.stringify(json, null, 2);
};

export { InteractiveResume, generatePDF, exportResumeJSON };`,
    explanation: `Interactive digital resume with animations, 3D elements, and dynamic visualizations to showcase professional experience in an engaging way.

## Core Implementation

**Key Features**: This demo showcases an interactive resume builder with smooth animations, skill visualizations, timeline effects, and export capabilities (PDF, JSON).

**Architecture**: Built with React, Framer Motion for animations, Three.js for 3D elements, and jsPDF for export functionality.

**Performance**: Implements efficient rendering, lazy loading, scroll-based animations, and optimized asset delivery for smooth user experience.

## Technical Benefits

- **Engaging Visuals**: Smooth animations and 3D elements
- **Multi-Format Export**: PDF, JSON (ATS-compatible), HTML
- **Mobile Responsive**: Optimized for all device sizes
- **Analytics Integration**: Track viewer engagement and behavior`,
    technologies: [
      {
        name: 'React',
        description: 'Component-based UI library',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Framer Motion',
        description: 'Production-ready animation library',
        tags: ['Animation', 'UI', 'React']
      },
      {
        name: 'Three.js',
        description: '3D graphics library for the web',
        tags: ['3D', 'Graphics', 'WebGL']
      },
      {
        name: 'jsPDF',
        description: 'Client-side PDF generation',
        tags: ['PDF', 'Export', 'JavaScript']
      }
    ],
    concepts: [
      {
        name: 'Scroll-Based Animations',
        description: 'Animations triggered by scroll position',
        example: 'useScroll, useTransform from Framer Motion'
      },
      {
        name: 'Component Composition',
        description: 'Building complex UIs from simple components',
        example: 'Reusable section components with consistent styling'
      },
      {
        name: '3D Web Graphics',
        description: 'Rendering 3D content in the browser',
        example: 'Three.js with React Three Fiber'
      },
      {
        name: 'Data Visualization',
        description: 'Visual representation of skills and experience',
        example: 'Progress bars, timelines, skill charts'
      }
    ],
    features: [
      'Animated section transitions',
      '3D name and visual elements',
      'Interactive skill visualizations',
      'Timeline-based experience display',
      'Parallax scrolling effects',
      'Export to PDF format',
      'Export to JSON (ATS-compatible)',
      'Mobile-responsive design',
      'Dark/light theme support',
      'Print-optimized layout'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-4">📄 Interactive Resume Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Modern, interactive digital resume with smooth animations, skill visualizations, and professional presentation.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💻</span>
            View Implementation
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-[1fr,320px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="space-y-6">
          {/* Personal Info */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{resumeData.personal.name}</h2>
                <p className="text-xl text-blue-400 mb-4">{resumeData.personal.title}</p>
                <p className="text-gray-300 leading-relaxed">{resumeData.personal.summary}</p>
          </div>
              <div className="text-6xl">👨‍💻</div>
        </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{resumeData.personal.email}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{resumeData.personal.phone}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{resumeData.personal.location}</span>
                  </div>
                </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>{resumeData.personal.website}</span>
                  </div>
                <div className="flex items-center gap-2">
                  <span>💼</span>
                  <span>{resumeData.personal.linkedin}</span>
                    </div>
                <div className="flex items-center gap-2">
                  <span>💻</span>
                  <span>{resumeData.personal.github}</span>
                    </div>
                  </div>
                  </div>
          </motion.div>

          {/* Experience */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6">💼 Experience</h3>
            
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="border-l-2 border-blue-600 pl-4 relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full" />
                  
                  <div className="flex justify-between items-start mb-2">
                        <div>
                      <h4 className="text-xl font-bold text-white">{exp.position}</h4>
                      <p className="text-blue-400">{exp.company} • {exp.location}</p>
                        </div>
                    <span className="text-sm text-gray-400">{exp.period}</span>
                        </div>
                  
                  <p className="text-gray-300 mb-3">{exp.description}</p>
                  
                  <ul className="space-y-2 mb-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="text-sm text-gray-300 flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="text-xs bg-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                        </div>
                </motion.div>
              ))}
                  </div>
          </motion.div>

          {/* Skills */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6">🛠️ Skills</h3>
            
              <div className="space-y-6">
              {Object.entries(resumeData.skills).map(([category, skills], catIndex) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 capitalize">{category}</h4>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setSelectedSkill(skill)}
                        onMouseLeave={() => setSelectedSkill(null)}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-gray-400">{skill.years} years</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                        </div>
                  </div>
                ))}
                  </div>
          </motion.div>

          {/* Education & Projects */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">🎓 Education</h3>
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold text-white">{edu.degree}</h4>
                  <p className="text-blue-400">{edu.school}</p>
                  <p className="text-sm text-gray-400">{edu.period}</p>
                  <p className="text-sm text-gray-300 mt-2">GPA: {edu.gpa}</p>
                  <div className="mt-2 space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <p key={i} className="text-sm text-gray-300">• {achievement}</p>
                    ))}
                  </div>
                </motion.div>
                ))}
                  </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">🚀 Projects</h3>
              <div className="space-y-4">
                {resumeData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-700 p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-bold text-white mb-1">{project.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                    <p className="text-xs text-blue-400">{project.stats}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">📥 Export</h3>
            <div className="space-y-2">
              <motion.button
                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📄 Download PDF
              </motion.button>
              <motion.button
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📋 Copy Link
              </motion.button>
              <motion.button
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📊 Export JSON
              </motion.button>
          </div>
          </motion.div>

          {/* Skill Detail */}
          {selectedSkill && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-blue-400">Skill Detail</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="font-semibold">{selectedSkill.name}</span>
            </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Proficiency:</span>
                  <span className="font-semibold text-green-400">{selectedSkill.level}%</span>
            </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-semibold">{selectedSkill.years} years</span>
          </div>
        </div>
            </motion.div>
          )}

          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Smooth Animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Interactive Skills</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>PDF Export</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Mobile Responsive</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Print Optimized</span>
              </li>
            </ul>
          </motion.div>
      </div>
      </motion.div>

      {/* CodeViewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default InteractiveResumeDemo;
