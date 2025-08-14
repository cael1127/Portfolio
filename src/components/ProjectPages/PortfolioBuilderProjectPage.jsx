import React, { useState } from 'react';

const PortfolioBuilderProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    dragDropManager: `// Drag and Drop Component Manager
class DragDropManager {
  constructor() {
    this.draggedElement = null;
    this.dropZones = new Map();
    this.components = new Map();
    this.templates = new Map();
  }

  registerDropZone(zoneId, zoneConfig) {
    this.dropZones.set(zoneId, {
      id: zoneId,
      element: zoneConfig.element,
      acceptTypes: zoneConfig.acceptTypes || ['*'],
      onDrop: zoneConfig.onDrop,
      onDragOver: zoneConfig.onDragOver,
      onDragLeave: zoneConfig.onDragLeave
    });
  }

  registerComponent(componentId, componentConfig) {
    this.components.set(componentId, {
      id: componentId,
      type: componentConfig.type,
      element: componentConfig.element,
      draggable: componentConfig.draggable || true,
      data: componentConfig.data || {}
    });

    if (componentConfig.draggable) {
      this.makeDraggable(componentId);
    }
  }

  makeDraggable(componentId) {
    const component = this.components.get(componentId);
    if (!component) return;

    const element = component.element;
    element.draggable = true;

    element.addEventListener('dragstart', (e) => {
      this.draggedElement = component;
      e.dataTransfer.setData('text/plain', componentId);
      e.dataTransfer.effectAllowed = 'move';
      
      element.classList.add('dragging');
    });

    element.addEventListener('dragend', () => {
      element.classList.remove('dragging');
      this.draggedElement = null;
    });
  }

  setupDropZone(zoneId) {
    const zone = this.dropZones.get(zoneId);
    if (!zone) return;

    const element = zone.element;

    element.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      if (zone.onDragOver) {
        zone.onDragOver(e);
      }
      
      element.classList.add('drag-over');
    });

    element.addEventListener('dragleave', (e) => {
      if (zone.onDragLeave) {
        zone.onDragLeave(e);
      }
      
      element.classList.remove('drag-over');
    });

    element.addEventListener('drop', (e) => {
      e.preventDefault();
      element.classList.remove('drag-over');
      
      const componentId = e.dataTransfer.getData('text/plain');
      const component = this.components.get(componentId);
      
      if (component && this.canDrop(component, zone)) {
        this.handleDrop(component, zone, e);
      }
    });
  }

  canDrop(component, zone) {
    return zone.acceptTypes.includes('*') || 
           zone.acceptTypes.includes(component.type);
  }

  handleDrop(component, zone, event) {
    if (zone.onDrop) {
      zone.onDrop(component, event);
    }
    
    this.emit('component_dropped', {
      component: component,
      zone: zone,
      event: event
    });
  }

  createComponent(type, data = {}) {
    const componentId = \`component-\${Date.now()}\`;
    const element = this.createElement(type, data);
    
    this.registerComponent(componentId, {
      type: type,
      element: element,
      data: data
    });
    
    return componentId;
  }

  createElement(type, data) {
    const element = document.createElement('div');
    element.className = \`portfolio-component \${type}-component\`;
    element.dataset.type = type;
    element.dataset.id = data.id || '';
    
    switch (type) {
      case 'header':
        element.innerHTML = this.createHeaderHTML(data);
        break;
      case 'about':
        element.innerHTML = this.createAboutHTML(data);
        break;
      case 'projects':
        element.innerHTML = this.createProjectsHTML(data);
        break;
      case 'contact':
        element.innerHTML = this.createContactHTML(data);
        break;
      default:
        element.innerHTML = \`<div class="component-placeholder">\${type} Component</div>\`;
    }
    
    return element;
  }
}`,
    
    templateManager: `// Portfolio Template Manager
class TemplateManager {
  constructor() {
    this.templates = new Map();
    this.currentTemplate = null;
    this.customizations = new Map();
  }

  registerTemplate(templateId, templateConfig) {
    this.templates.set(templateId, {
      id: templateId,
      name: templateConfig.name,
      description: templateConfig.description,
      preview: templateConfig.preview,
      structure: templateConfig.structure,
      styles: templateConfig.styles,
      components: templateConfig.components || []
    });
  }

  loadTemplate(templateId) {
    const template = this.templates.get(templateId);
    if (!template) return false;

    this.currentTemplate = template;
    this.applyTemplate(template);
    
    return true;
  }

  applyTemplate(template) {
    // Clear existing content
    this.clearPortfolio();
    
    // Apply template structure
    this.applyStructure(template.structure);
    
    // Apply template styles
    this.applyStyles(template.styles);
    
    // Load template components
    this.loadComponents(template.components);
    
    this.emit('template_loaded', { template });
  }

  applyStructure(structure) {
    const container = document.getElementById('portfolio-container');
    if (!container) return;

    container.innerHTML = structure;
  }

  applyStyles(styles) {
    const styleElement = document.getElementById('portfolio-styles');
    if (!styleElement) {
      const newStyleElement = document.createElement('style');
      newStyleElement.id = 'portfolio-styles';
      document.head.appendChild(newStyleElement);
    }

    document.getElementById('portfolio-styles').textContent = styles;
  }

  loadComponents(components) {
    components.forEach(componentConfig => {
      this.createComponent(componentConfig.type, componentConfig.data);
    });
  }

  customizeComponent(componentId, customizations) {
    const component = this.components.get(componentId);
    if (!component) return;

    // Apply customizations
    Object.assign(component.data, customizations);
    
    // Update component display
    this.updateComponentDisplay(componentId);
    
    // Save customization
    this.customizations.set(componentId, customizations);
  }

  updateComponentDisplay(componentId) {
    const component = this.components.get(componentId);
    if (!component) return;

    const element = component.element;
    const data = component.data;

    switch (component.type) {
      case 'header':
        element.querySelector('.name').textContent = data.name || 'Your Name';
        element.querySelector('.title').textContent = data.title || 'Professional Title';
        break;
      case 'about':
        element.querySelector('.bio').textContent = data.bio || 'Your bio here...';
        break;
      case 'projects':
        this.updateProjectsList(element, data.projects || []);
        break;
      case 'contact':
        element.querySelector('.email').textContent = data.email || 'findleytechs@gmail.com';
        element.querySelector('.phone').textContent = data.phone || '+1 (555) 123-4567';
        break;
    }
  }

  updateProjectsList(element, projects) {
    const projectsContainer = element.querySelector('.projects-list');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projects.map(project => \`
      <div class="project-item">
        <h3>\${project.title}</h3>
        <p>\${project.description}</p>
        <div class="project-links">
          <a href="\${project.liveUrl}" target="_blank">Live Demo</a>
          <a href="\${project.githubUrl}" target="_blank">GitHub</a>
        </div>
      </div>
    \`).join('');
  }

  exportPortfolio() {
    const portfolioData = {
      template: this.currentTemplate?.id,
      customizations: Object.fromEntries(this.customizations),
      components: Array.from(this.components.values()).map(comp => ({
        type: comp.type,
        data: comp.data
      }))
    };

    return {
      html: this.generateHTML(),
      css: this.generateCSS(),
      data: portfolioData
    };
  }

  generateHTML() {
    const container = document.getElementById('portfolio-container');
    return container ? container.outerHTML : '';
  }

  generateCSS() {
    const styleElement = document.getElementById('portfolio-styles');
    return styleElement ? styleElement.textContent : '';
  }
}`,
    
    componentLibrary: `// Portfolio Component Library
class ComponentLibrary {
  constructor() {
    this.components = new Map();
    this.defaultData = new Map();
  }

  registerComponent(type, componentConfig) {
    this.components.set(type, {
      type: type,
      name: componentConfig.name,
      icon: componentConfig.icon,
      category: componentConfig.category,
      defaultData: componentConfig.defaultData || {},
      render: componentConfig.render,
      editor: componentConfig.editor
    });
  }

  getComponentTypes() {
    return Array.from(this.components.keys());
  }

  getComponentByType(type) {
    return this.components.get(type);
  }

  createComponent(type, data = {}) {
    const componentConfig = this.components.get(type);
    if (!componentConfig) return null;

    const componentData = {
      ...componentConfig.defaultData,
      ...data
    };

    return {
      id: \`component-\${Date.now()}\`,
      type: type,
      data: componentData,
      render: componentConfig.render,
      editor: componentConfig.editor
    };
  }

  // Predefined components
  initializeComponents() {
    // Header Component
    this.registerComponent('header', {
      name: 'Header',
      icon: '📋',
      category: 'layout',
      defaultData: {
        name: 'Your Name',
        title: 'Professional Title',
        subtitle: 'Brief description',
        avatar: null
      },
      render: (data) => \`
        <header class="portfolio-header">
          <div class="header-content">
            <h1 class="name">\${data.name}</h1>
            <h2 class="title">\${data.title}</h2>
            <p class="subtitle">\${data.subtitle}</p>
          </div>
          \${data.avatar ? \`<img src="\${data.avatar}" alt="Avatar" class="avatar">\` : ''}
        </header>
      \`
    });

    // About Component
    this.registerComponent('about', {
      name: 'About',
      icon: '👤',
      category: 'content',
      defaultData: {
        bio: 'Your bio here...',
        skills: ['JavaScript', 'React', 'Node.js'],
        experience: '5+ years'
      },
      render: (data) => \`
        <section class="about-section">
          <h2>About Me</h2>
          <p class="bio">\${data.bio}</p>
          <div class="skills">
            <h3>Skills</h3>
            <div class="skills-list">
              \${data.skills.map(skill => \`<span class="skill-tag">\${skill}</span>\`).join('')}
            </div>
          </div>
          <p class="experience">Experience: \${data.experience}</p>
        </section>
      \`
    });

    // Projects Component
    this.registerComponent('projects', {
      name: 'Projects',
      icon: '💼',
      category: 'content',
      defaultData: {
        title: 'Projects',
        projects: [
          {
            title: 'Sample Project',
            description: 'A sample project description',
            technologies: ['React', 'Node.js'],
            liveUrl: '#',
            githubUrl: '#'
          }
        ]
      },
      render: (data) => \`
        <section class="projects-section">
          <h2>\${data.title}</h2>
          <div class="projects-grid">
            \${data.projects.map(project => \`
              <div class="project-card">
                <h3>\${project.title}</h3>
                <p>\${project.description}</p>
                <div class="project-tech">
                  \${project.technologies.map(tech => \`<span class="tech-tag">\${tech}</span>\`).join('')}
                </div>
                <div class="project-links">
                  <a href="\${project.liveUrl}" target="_blank">Live Demo</a>
                  <a href="\${project.githubUrl}" target="_blank">GitHub</a>
                </div>
              </div>
            \`).join('')}
          </div>
        </section>
      \`
    });

    // Contact Component
    this.registerComponent('contact', {
      name: 'Contact',
      icon: '📧',
      category: 'content',
      defaultData: {
        email: 'findleytechs@gmail.com',
        phone: '+1 (555) 123-4567',
        linkedin: 'linkedin.com/in/yourprofile',
        github: 'github.com/yourusername'
      },
      render: (data) => \`
        <section class="contact-section">
          <h2>Contact</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="icon">📧</span>
              <a href="mailto:\${data.email}">\${data.email}</a>
            </div>
            <div class="contact-item">
              <span class="icon">📱</span>
              <a href="tel:\${data.phone}">\${data.phone}</a>
            </div>
            <div class="contact-item">
              <span class="icon">💼</span>
              <a href="https://\${data.linkedin}" target="_blank">LinkedIn</a>
            </div>
            <div class="contact-item">
              <span class="icon">🐙</span>
              <a href="https://\${data.github}" target="_blank">GitHub</a>
            </div>
          </div>
        </section>
      \`
    });
  }
}`,
    
    dashboardComponent: `// React Portfolio Builder Dashboard
import React, { useState, useEffect } from 'react';

const PortfolioBuilderDashboard = () => {
  const [dragDropManager, setDragDropManager] = useState(null);
  const [templateManager, setTemplateManager] = useState(null);
  const [componentLibrary, setComponentLibrary] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [portfolioData, setPortfolioData] = useState({
    components: [],
    customizations: {},
    template: null
  });

  useEffect(() => {
    const dragDrop = new DragDropManager();
    const templates = new TemplateManager();
    const library = new ComponentLibrary();

    // Initialize component library
    library.initializeComponents();

    setDragDropManager(dragDrop);
    setTemplateManager(templates);
    setComponentLibrary(library);

    // Load default template
    templates.registerTemplate('modern', {
      name: 'Modern Portfolio',
      description: 'Clean and professional design',
      structure: '<div id="portfolio-container" class="modern-template"></div>',
      styles: \`
        .modern-template {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .portfolio-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .name {
          font-size: 3rem;
          font-weight: bold;
          color: #1a1a1a;
        }
        .title {
          font-size: 1.5rem;
          color: #666;
          margin-top: 0.5rem;
        }
      \`,
      components: [
        { type: 'header', data: { name: 'Your Name', title: 'Software Developer' } },
        { type: 'about', data: { bio: 'Passionate developer with expertise in modern web technologies.' } },
        { type: 'projects', data: { title: 'Featured Projects' } },
        { type: 'contact', data: { email: 'findleytechs@gmail.com' } }
      ]
    });

    setSelectedTemplate('modern');
  }, []);

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and professional' },
    { id: 'creative', name: 'Creative', description: 'Bold and artistic' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
  ];

  const componentTypes = [
    { type: 'header', name: 'Header', icon: '📋' },
    { type: 'about', name: 'About', icon: '👤' },
    { type: 'projects', name: 'Projects', icon: '💼' },
    { type: 'contact', name: 'Contact', icon: '📧' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          Portfolio Builder
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Selection */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Templates</h3>
            <div className="space-y-2">
              {templates.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={'w-full p-3 rounded border text-left ' + (
                    selectedTemplate === template.id
                      ? 'bg-green-600 border-green-400'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                  )}
                >
                  <div className="font-semibold">{template.name}</div>
                  <div className="text-sm text-gray-400">{template.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Component Library */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Components</h3>
            <div className="space-y-2">
              {componentTypes.map(component => (
                <div
                  key={component.type}
                  draggable
                  className="p-3 bg-gray-700 border border-gray-600 rounded cursor-move hover:bg-gray-600"
                >
                  <span className="mr-2">{component.icon}</span>
                  {component.name}
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Preview</h3>
            <div className="bg-white text-black p-4 rounded min-h-96">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Your Name</h1>
                <p className="text-xl text-gray-600">Software Developer</p>
                <p className="mt-4 text-gray-700">Drag components here to build your portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};`
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setCurrentPage('projects')}
            className="text-green-400 hover:text-green-300 mb-4 flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-green-400 mb-4">🌐 Portfolio Builder</h1>
          <p className="text-gray-300 text-lg">
            Drag-and-drop website builder for creating professional portfolios with customizable templates
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={'px-4 py-2 rounded-lg transition-colors ' + (
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-4">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  The Portfolio Builder is a comprehensive drag-and-drop website creation platform that enables 
                  users to build professional portfolios using pre-designed templates and customizable components. 
                  It features an intuitive visual editor with real-time preview and export capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Visual drag-and-drop editing</li>
                    <li>• Pre-designed portfolio templates</li>
                    <li>• Customizable component library</li>
                    <li>• Real-time preview functionality</li>
                    <li>• Export to HTML/CSS</li>
                    <li>• Responsive design support</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for user interface</li>
                    <li>• HTML5 Drag and Drop API</li>
                    <li>• CSS Grid and Flexbox</li>
                    <li>• Template system</li>
                    <li>• Component library</li>
                    <li>• Export functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Core Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">🎨 Visual Editor</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Drag-and-drop interface</li>
                    <li>• Real-time preview</li>
                    <li>• Component customization</li>
                    <li>• Template selection</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">📋 Component Library</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Header components</li>
                    <li>• About sections</li>
                    <li>• Project showcases</li>
                    <li>• Contact forms</li>
                    <li>• Custom components</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">🎯 Template System</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Pre-designed templates</li>
                    <li>• Customizable layouts</li>
                    <li>• Color scheme options</li>
                    <li>• Typography settings</li>
                    <li>• Mobile optimization</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">📤 Export & Deploy</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• HTML/CSS export</li>
                    <li>• GitHub Pages integration</li>
                    <li>• Custom domain support</li>
                    <li>• SEO optimization</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Code Implementation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Drag and Drop Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dragDropManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Template Manager</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.templateManager}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Component Library</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.componentLibrary}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Dashboard Component</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.dashboardComponent}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">System Architecture</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• React.js editor interface</li>
                      <li>• Drag and drop functionality</li>
                      <li>• Real-time preview</li>
                      <li>• Component library</li>
                      <li>• Template system</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Backend Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Template management</li>
                      <li>• Component rendering</li>
                      <li>• Export generation</li>
                      <li>• File system operations</li>
                      <li>• Deployment services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Data Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">1</div>
                    <div>
                      <p className="text-white font-semibold">Template Selection</p>
                      <p className="text-gray-300 text-sm">User selects base template</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Component Assembly</p>
                      <p className="text-gray-300 text-sm">Drag and drop components</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">Export & Deploy</p>
                      <p className="text-gray-300 text-sm">Generate and deploy portfolio</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-400 mb-4">Live Demo</h2>
              <p className="text-gray-300 mb-6">
                Experience the portfolio builder in action. The demo showcases drag-and-drop editing, 
                template selection, component customization, and real-time preview functionality.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Portfolio Builder Demo</h3>
                  <button
                    onClick={() => setCurrentPage('portfoliobuilder')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full portfolio builder with drag-and-drop editing, 
                  template selection, component customization, and real-time preview.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderProjectPage; 