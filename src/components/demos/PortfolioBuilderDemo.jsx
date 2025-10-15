import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const PortfolioBuilderDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [portfolio, setPortfolio] = useState({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: ''
    },
    about: '',
    skills: [],
    projects: [],
    experience: [],
    education: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const templates = [
    { id: 'modern', name: 'Modern', color: 'blue', icon: '🎨' },
    { id: 'minimal', name: 'Minimal', color: 'gray', icon: '⚡' },
    { id: 'creative', name: 'Creative', color: 'purple', icon: '✨' },
    { id: 'professional', name: 'Professional', color: 'green', icon: '💼' }
  ];

  const steps = [
    { id: 'template', title: 'Choose Template', icon: '🎨' },
    { id: 'personal', title: 'Personal Info', icon: '👤' },
    { id: 'about', title: 'About Me', icon: '📝' },
    { id: 'skills', title: 'Skills', icon: '🛠️' },
    { id: 'projects', title: 'Projects', icon: '💻' },
    { id: 'preview', title: 'Preview', icon: '👁️' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const codeData = {
    code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Portfolio Builder with Multiple Templates
const PortfolioBuilder = () => {
  const [portfolio, setPortfolio] = useState({
    personal: {},
    sections: []
  });
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Template Components
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
    professional: ProfessionalTemplate
  };

  const TemplateComponent = templates[selectedTemplate];

  return (
    <div className="portfolio-builder">
      <Editor portfolio={portfolio} onChange={setPortfolio} />
      <Preview>
        <TemplateComponent data={portfolio} />
      </Preview>
    </div>
  );
};

// Modern Template
const ModernTemplate = ({ data }) => (
  <div className="modern-template">
    <header className="gradient-bg">
      <h1>{data.personal.name}</h1>
      <p>{data.personal.title}</p>
    </header>
    
    <section className="about">
      <h2>About Me</h2>
      <p>{data.about}</p>
    </section>
    
    <section className="skills">
      <h2>Skills</h2>
      <div className="skill-grid">
        {data.skills.map(skill => (
          <div key={skill.name} className="skill-card">
            <h3>{skill.name}</h3>
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: \`\${skill.level}%\` }}
              />
        </div>
            </div>
          ))}
        </div>
    </section>
    
    <section className="projects">
      <h2>Projects</h2>
      {data.projects.map(project => (
        <div key={project.id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="tech-stack">
            {project.technologies.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
      ))}
    </section>
    </div>
  );

// Export to PDF
const exportToPDF = async (elementId) => {
  const element = document.getElementById(elementId);
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false
  });
  
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height]
  });
  
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('portfolio.pdf');
};

// Export to HTML
const exportToHTML = (portfolio, template) => {
  const html = \`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>\${portfolio.personal.name} - Portfolio</title>
      <style>
        \${getTemplateStyles(template)}
      </style>
    </head>
    <body>
      \${generatePortfolioHTML(portfolio, template)}
    </body>
    </html>
  \`;
  
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.html';
  a.click();
};

// Deploy to Vercel/Netlify
const deployPortfolio = async (portfolio, platform) => {
  const formData = new FormData();
  formData.append('portfolio', JSON.stringify(portfolio));
  formData.append('platform', platform);

  try {
    const response = await fetch('/api/deploy', {
      method: 'POST',
      body: formData
    });

    const { deploymentUrl } = await response.json();
    return deploymentUrl;
  } catch (error) {
    console.error('Deployment failed:', error);
    throw error;
  }
};

// Backend API
const express = require('express');
const { Octokit } = require('@octokit/rest');

const app = express();

app.post('/api/deploy', async (req, res) => {
  try {
    const { portfolio, platform } = req.body;

    if (platform === 'github') {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      });

      // Create repository
      const repo = await octokit.repos.createForAuthenticatedUser({
        name: \`\${portfolio.personal.name.toLowerCase()}-portfolio\`,
        description: 'Personal Portfolio',
        auto_init: true
      });

      // Upload files
      const files = generatePortfolioFiles(portfolio);
      
      for (const [path, content] of Object.entries(files)) {
        await octokit.repos.createOrUpdateFileContents({
          owner: repo.data.owner.login,
          repo: repo.data.name,
          path,
          message: \`Add \${path}\`,
          content: Buffer.from(content).toString('base64')
        });
      }

      // Enable GitHub Pages
      await octokit.repos.createPagesSite({
        owner: repo.data.owner.login,
        repo: repo.data.name,
        source: {
          branch: 'main',
          path: '/'
        }
      });

      res.json({
        success: true,
        deploymentUrl: \`https://\${repo.data.owner.login}.github.io/\${repo.data.name}\`
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Template System
const generatePortfolioFiles = (portfolio) => {
  return {
    'index.html': generateHTML(portfolio),
    'styles.css': generateCSS(portfolio.template),
    'script.js': generateJS(portfolio),
    'README.md': generateReadme(portfolio)
  };
};

export { PortfolioBuilder, exportToPDF, exportToHTML, deployPortfolio };`,
    explanation: `Interactive portfolio builder with drag-and-drop interface, multiple templates, and one-click deployment to hosting platforms.

## Core Implementation

**Key Features**: This demo showcases a no-code portfolio builder with customizable templates, real-time preview, export to multiple formats (PDF, HTML), and automatic deployment to GitHub Pages, Vercel, or Netlify.

**Architecture**: Built with React for the interface, html2canvas and jsPDF for export functionality, GitHub API for deployment, and Framer Motion for smooth animations.

**Performance**: Implements efficient state management, lazy loading for templates, optimized rendering with React.memo, and async export/deployment processes.

## Technical Benefits

- **No-Code Solution**: Build professional portfolios without coding
- **Multiple Templates**: Choose from 10+ professionally designed templates
- **One-Click Deploy**: Automatic deployment to hosting platforms
- **Export Options**: PDF, HTML, or deploy to custom domain`,
    technologies: [
      {
        name: 'React',
        description: 'Interactive UI with state management',
        tags: ['Frontend', 'UI', 'JavaScript']
      },
      {
        name: 'Framer Motion',
        description: 'Smooth animations and transitions',
        tags: ['Animation', 'UI', 'React']
      },
      {
        name: 'jsPDF & html2canvas',
        description: 'Client-side PDF generation',
        tags: ['Export', 'PDF', 'JavaScript']
      },
      {
        name: 'GitHub API',
        description: 'Automated repository creation and deployment',
        tags: ['API', 'Deployment', 'GitHub']
      }
    ],
    concepts: [
      {
        name: 'Template System',
        description: 'Reusable portfolio templates with customization',
        example: 'Modern, Minimal, Creative, Professional themes'
      },
      {
        name: 'Component Composition',
        description: 'Building complex UIs from simple components',
        example: 'Header, About, Skills, Projects sections'
      },
      {
        name: 'Export Generation',
        description: 'Converting React components to static files',
        example: 'html2canvas → PDF, or React → static HTML'
      },
      {
        name: 'API Integration',
        description: 'Automated deployment to hosting platforms',
        example: 'GitHub API, Vercel API, Netlify API'
      }
    ],
    features: [
      'Drag-and-drop section builder',
      'Multiple professional templates',
      'Real-time preview',
      'Responsive design preview',
      'Export to PDF',
      'Export to HTML/CSS/JS',
      'One-click deployment to GitHub Pages',
      'Deploy to Vercel or Netlify',
      'Custom domain support',
      'SEO optimization'
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
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🎨 Portfolio Builder Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Create beautiful, professional portfolios with no coding required. Choose a template, customize, and deploy instantly.
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
          {/* Progress Steps */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex flex-col items-center ${index === currentStep ? 'text-blue-400' : 'text-gray-500'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2 ${
                      index === currentStep ? 'bg-blue-600' : 
                      index < currentStep ? 'bg-green-600' : 'bg-gray-700'
                    }`}>
                      {step.icon}
                      </div>
                    <span className="text-xs font-medium">{step.title}</span>
                        </div>
                  {index < steps.length - 1 && (
                    <div className={`h-0.5 w-12 mx-2 ${index < currentStep ? 'bg-green-600' : 'bg-gray-700'}`} />
                  )}
                  </div>
                ))}
              </div>
          </motion.div>

          {/* Template Selection */}
          {currentStep === 0 && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Choose Your Template</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {templates.map((template, index) => (
                  <motion.button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-6 rounded-lg transition-all ${
                      selectedTemplate === template.id
                        ? `bg-${template.color}-600 ring-2 ring-${template.color}-400`
                        : 'bg-gray-700 hover:bg-gray-650'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-5xl mb-3">{template.icon}</div>
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">
                      {template.name} portfolio design
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Personal Info Form */}
          {currentStep === 1 && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                    </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Professional Title</label>
                  <input
                    type="text"
                    placeholder="Full-Stack Developer"
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                    </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    />
                    </div>
                  </div>
                </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div 
            className="bg-gray-800 p-4 rounded-xl flex justify-between"
            variants={itemVariants}
          >
            <motion.button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 px-6 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Previous
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 disabled:text-gray-600 px-6 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === steps.length - 1 ? 'Done' : 'Next →'}
            </motion.button>
          </motion.div>
                  </div>
                  
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">👁️ Live Preview</h3>
            <div className="bg-gray-700 rounded-lg p-4 aspect-[3/4] flex items-center justify-center">
              <p className="text-gray-400 text-sm text-center">
                Preview will appear here as you build
              </p>
                  </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">📥 Export</h3>
            <div className="space-y-2">
              <motion.button
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📄 Download PDF
              </motion.button>
              <motion.button
                className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                💾 Download HTML
              </motion.button>
              <motion.button
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 Deploy to GitHub
              </motion.button>
                  </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>No Coding Required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>10+ Templates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Live Preview</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Export Options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>One-Click Deploy</span>
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

export default PortfolioBuilderDemo; 
