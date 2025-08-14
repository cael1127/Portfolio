import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const InteractiveResumeDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'Cael Findley',
      title: 'Software Engineer',
      email: 'cael.findley@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Passionate software engineer with expertise in AI/ML and full-stack development.'
    },
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        duration: '2022 - Present',
        description: 'Led development of AI-powered applications and microservices architecture.',
        achievements: ['Reduced API response time by 40%', 'Implemented CI/CD pipeline']
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'AWS'],
      soft: ['Leadership', 'Problem Solving', 'Team Collaboration'],
      languages: ['JavaScript', 'Python', 'TypeScript', 'SQL']
    },
    projects: [
      {
        id: 1,
        name: 'AI-Powered Portfolio',
        description: 'Interactive portfolio with AI chatbot and real-time collaboration features.',
        tech: ['React', 'Python', 'TensorFlow'],
        link: 'github.com/cael1127/portfolio'
      },
      {
        id: 2,
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration and analytics.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'github.com/cael1127/ecommerce'
      }
    ]
  });

  const demoCode = `/**
 * Interactive Resume Builder Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a dynamic resume builder with real-time
 * editing, form validation, and PDF export capabilities.
 */

import React, { useState, useEffect } from 'react';

const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'Cael Findley',
      title: 'Software Engineer',
      email: 'cael.findley@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Passionate software engineer with expertise in AI/ML and full-stack development.'
    },
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Software Engineer',
        duration: '2022 - Present',
        description: 'Led development of AI-powered applications and microservices architecture.',
        achievements: ['Reduced API response time by 40%', 'Implemented CI/CD pipeline']
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'TensorFlow', 'MongoDB', 'AWS'],
      soft: ['Leadership', 'Problem Solving', 'Team Collaboration'],
      languages: ['JavaScript', 'Python', 'TypeScript', 'SQL']
    }
  });

  // Handle form updates
  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle array updates (experience, education, projects)
  const handleArrayUpdate = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new item to array
  const addItem = (section) => {
    const newItem = {
      id: Date.now(),
      company: '',
      position: '',
      duration: '',
      description: '',
      achievements: []
    };

    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  // Remove item from array
  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Handle skill updates
  const handleSkillUpdate = (category, skills) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills
      }
    }));
  };

  // Export resume as PDF
  const exportResume = () => {
    const element = document.getElementById('resume-content');
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  // Auto-save functionality
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [resumeData]);

  // Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      setResumeData(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="interactive-resume">
      {/* Navigation */}
      <nav className="resume-nav">
        <button 
          onClick={() => setActiveSection('personal')}
          className={activeSection === 'personal' ? 'active' : ''}
        >
          Personal Info
        </button>
        <button 
          onClick={() => setActiveSection('experience')}
          className={activeSection === 'experience' ? 'active' : ''}
        >
          Experience
        </button>
        <button 
          onClick={() => setActiveSection('education')}
          className={activeSection === 'education' ? 'active' : ''}
        >
          Education
        </button>
        <button 
          onClick={() => setActiveSection('skills')}
          className={activeSection === 'skills' ? 'active' : ''}
        >
          Skills
        </button>
        <button 
          onClick={() => setActiveSection('projects')}
          className={activeSection === 'projects' ? 'active' : ''}
        >
          Projects
        </button>
      </nav>

      {/* Edit Mode Toggle */}
      <div className="edit-controls">
        <button 
          onClick={() => setEditMode(!editMode)}
          className="edit-toggle"
        >
          {editMode ? 'Preview Mode' : 'Edit Mode'}
        </button>
        {editMode && (
          <button onClick={exportResume} className="export-btn">
            Export PDF
          </button>
        )}
      </div>

      {/* Resume Content */}
      <div id="resume-content" className="resume-content">
        {activeSection === 'personal' && (
          <PersonalSection 
            data={resumeData.personal}
            editMode={editMode}
            onChange={(field, value) => handleInputChange('personal', field, value)}
          />
        )}

        {activeSection === 'experience' && (
          <ExperienceSection 
            data={resumeData.experience}
            editMode={editMode}
            onUpdate={(index, field, value) => handleArrayUpdate('experience', index, field, value)}
            onAdd={() => addItem('experience')}
            onRemove={(index) => removeItem('experience', index)}
          />
        )}

        {activeSection === 'skills' && (
          <SkillsSection 
            data={resumeData.skills}
            editMode={editMode}
            onUpdate={handleSkillUpdate}
          />
        )}

        {activeSection === 'projects' && (
          <ProjectsSection 
            data={resumeData.projects}
            editMode={editMode}
            onUpdate={(index, field, value) => handleArrayUpdate('projects', index, field, value)}
            onAdd={() => addItem('projects')}
            onRemove={(index) => removeItem('projects', index)}
          />
        )}
      </div>
    </div>
  );
};

// Personal Information Component
const PersonalSection = ({ data, editMode, onChange }) => {
  return (
    <div className="personal-section">
      <h2>Personal Information</h2>
      {editMode ? (
        <div className="edit-form">
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Full Name"
          />
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Job Title"
          />
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Email"
          />
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="Phone"
          />
          <input
            type="text"
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder="Location"
          />
          <textarea
            value={data.summary}
            onChange={(e) => onChange('summary', e.target.value)}
            placeholder="Professional Summary"
            rows={4}
          />
        </div>
      ) : (
        <div className="preview-content">
          <h1>{data.name}</h1>
          <h3>{data.title}</h3>
          <p>{data.email} | {data.phone} | {data.location}</p>
          <p>{data.summary}</p>
        </div>
      )}
    </div>
  );
};

// Experience Section Component
const ExperienceSection = ({ data, editMode, onUpdate, onAdd, onRemove }) => {
  return (
    <div className="experience-section">
      <h2>Work Experience</h2>
      {data.map((exp, index) => (
        <div key={exp.id} className="experience-item">
          {editMode ? (
            <div className="edit-form">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => onUpdate(index, 'company', e.target.value)}
                placeholder="Company"
              />
              <input
                type="text"
                value={exp.position}
                onChange={(e) => onUpdate(index, 'position', e.target.value)}
                placeholder="Position"
              />
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => onUpdate(index, 'duration', e.target.value)}
                placeholder="Duration"
              />
              <textarea
                value={exp.description}
                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                placeholder="Description"
                rows={3}
              />
              <button onClick={() => onRemove(index)} className="remove-btn">
                Remove
              </button>
            </div>
          ) : (
            <div className="preview-content">
              <h3>{exp.position} at {exp.company}</h3>
              <p className="duration">{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          )}
        </div>
      ))}
      {editMode && (
        <button onClick={onAdd} className="add-btn">
          Add Experience
        </button>
      )}
    </div>
  );
};

// Skills Section Component
const SkillsSection = ({ data, editMode, onUpdate }) => {
  const handleSkillChange = (category, skills) => {
    onUpdate(category, skills.split(',').map(s => s.trim()));
  };

  return (
    <div className="skills-section">
      <h2>Skills</h2>
      {editMode ? (
        <div className="edit-form">
          <div>
            <label>Technical Skills:</label>
            <input
              type="text"
              value={data.technical.join(', ')}
              onChange={(e) => handleSkillChange('technical', e.target.value)}
              placeholder="React, Node.js, Python..."
            />
          </div>
          <div>
            <label>Soft Skills:</label>
            <input
              type="text"
              value={data.soft.join(', ')}
              onChange={(e) => handleSkillChange('soft', e.target.value)}
              placeholder="Leadership, Communication..."
            />
          </div>
          <div>
            <label>Programming Languages:</label>
            <input
              type="text"
              value={data.languages.join(', ')}
              onChange={(e) => handleSkillChange('languages', e.target.value)}
              placeholder="JavaScript, Python, TypeScript..."
            />
          </div>
        </div>
      ) : (
        <div className="preview-content">
          <div>
            <h3>Technical Skills</h3>
            <div className="skills-grid">
              {data.technical.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Soft Skills</h3>
            <div className="skills-grid">
              {data.soft.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Programming Languages</h3>
            <div className="skills-grid">
              {data.languages.map(lang => (
                <span key={lang} className="skill-tag">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveResume;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">📄 Interactive Resume Web App</h1>
            <p className="text-gray-400">React and CSS with real-time editing capabilities</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-2">{resumeData.personal.name}</h1>
                <h2 className="text-xl opacity-90 mb-4">{resumeData.personal.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm opacity-80">
                  <span>📧 {resumeData.personal.email}</span>
                  <span>📱 {resumeData.personal.phone}</span>
                  <span>📍 {resumeData.personal.location}</span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-white border-opacity-30"
              >
                {isEditing ? 'Cancel' : '✏️ Edit Resume'}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex bg-gray-50 border-b">
            {['about', 'experience', 'skills', 'projects', 'education'].map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`flex-1 py-4 px-6 font-medium transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-8 text-gray-800">
            {/* About Section */}
            {activeSection === 'about' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">About Me</h3>
                {isEditing ? (
                  <textarea
                    value={editData.about}
                    onChange={(e) => updateField('about', 'about', e.target.value)}
                    className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700">{resumeData.about}</p>
                )}
              </div>
            )}

            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Work Experience</h3>
                <div className="space-y-8">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="border-l-4 border-blue-600 pl-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800">{exp.position}</h4>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{exp.duration}</span>
                      </div>
                      {isEditing ? (
                        <textarea
                          value={editData.experience[index].description}
                          onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                          className="w-full h-20 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                        />
                      ) : (
                        <p className="text-gray-700 mb-3">{exp.description}</p>
                      )}
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Skills</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.technical.map(skill => (
                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.soft.map(skill => (
                        <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Programming Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.languages.map(lang => (
                        <span key={lang} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Projects</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {resumeData.projects.map(project => (
                    <div key={project.id} className="bg-gray-50 p-6 rounded-lg border hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">{project.name}</h4>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map(tech => (
                          <span key={tech} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Project →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {activeSection === 'education' && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Education</h3>
                <div className="space-y-6">
                  {resumeData.education.map(edu => (
                    <div key={edu.id} className="border-l-4 border-green-600 pl-6">
                      <h4 className="text-xl font-semibold text-gray-800">{edu.degree}</h4>
                      <p className="text-green-600 font-medium">{edu.school}</p>
                      <p className="text-gray-500">{edu.year} • GPA: {edu.gpa}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save Controls */}
          {isEditing && (
            <div className="bg-gray-50 p-6 border-t">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-teal-400">✨ Interactive Resume Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">🎨 Frontend Features</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Real-time editing capabilities</li>
                <li>• Responsive design</li>
                <li>• Modern CSS styling</li>
                <li>• Interactive navigation</li>
                <li>• Form validation</li>
                <li>• Auto-save functionality</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">⚡ Technical Features</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• React state management</li>
                <li>• Component-based architecture</li>
                <li>• CSS Grid and Flexbox</li>
                <li>• Smooth animations</li>
                <li>• Mobile-first design</li>
                <li>• Accessibility features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeExample}
        language="javascript"
        title="Interactive Resume Implementation"
      />
    </div>
  );
};

export default InteractiveResumeDemo; 