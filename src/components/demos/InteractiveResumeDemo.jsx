import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const InteractiveResumeDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'Cael Findley',
      title: 'Full-Stack Developer & AI Engineer',
      email: 'findleytechs@gmail.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/caelfindley',
      github: 'github.com/cael1127'
    },
    about: 'Passionate full-stack developer with expertise in AI/ML, modern web technologies, and creating innovative digital experiences. Specialized in React, Python, and cutting-edge technologies.',
    experience: [
      {
        id: 1,
        company: 'Tech Innovations Inc.',
        position: 'Senior Full-Stack Developer',
        duration: '2023 - Present',
        description: 'Led development of AI-powered applications using React, Node.js, and Python. Implemented machine learning models and real-time collaboration features.',
        achievements: [
          'Reduced application load time by 40% through optimization',
          'Implemented AI chatbot with 95% user satisfaction',
          'Mentored 5 junior developers'
        ]
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        duration: '2022 - 2023',
        description: 'Built responsive web applications and interactive dashboards using React and modern CSS frameworks.',
        achievements: [
          'Developed 10+ reusable component libraries',
          'Improved user engagement by 60%',
          'Implemented real-time data visualization'
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2022',
        gpa: '3.9/4.0'
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'TensorFlow', 'Three.js', 'MongoDB', 'AWS', 'Docker'],
      soft: ['Leadership', 'Problem Solving', 'Team Collaboration', 'Communication', 'Project Management'],
      languages: ['JavaScript', 'Python', 'TypeScript', 'SQL', 'HTML/CSS']
    },
    projects: [
      {
        id: 1,
        name: 'AI-Powered Portfolio',
        description: 'Interactive 3D portfolio with AI chatbot and real-time collaboration features.',
        tech: ['React', 'Three.js', 'Python', 'TensorFlow'],
        link: 'github.com/cael1127/portfolio'
      },
      {
        id: 2,
        name: 'Snake AI with Reinforcement Learning',
        description: 'Neural network learns to play Snake through genetic algorithms and evolution.',
        tech: ['Python', 'PyTorch', 'Neural Networks', 'Genetic Algorithms'],
        link: 'github.com/cael1127/snake-ai'
      },
      {
        id: 3,
        name: 'RAG Chatbot',
        description: 'Retrieval-Augmented Generation chatbot using LangChain and OpenAI.',
        tech: ['Next.js', 'LangChain', 'OpenAI', 'Vector Databases'],
        link: 'github.com/cael1127/rag-chatbot'
      }
    ]
  });

  const [editData, setEditData] = useState(resumeData);

  useEffect(() => {
    setEditData(resumeData);
  }, [resumeData]);

  const handleSave = () => {
    setResumeData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(resumeData);
    setIsEditing(false);
  };

  const updateField = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const codeExample = `// Interactive Resume Web App with React

import React, { useState, useEffect } from 'react';
import './Resume.css';

const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'Cael Findley',
      title: 'Full-Stack Developer & AI Engineer',
      email: 'findleytechs@gmail.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/caelfindley',
      github: 'github.com/cael1127'
    },
    about: 'Passionate full-stack developer with expertise in AI/ML...',
    experience: [
      {
        id: 1,
        company: 'Tech Innovations Inc.',
        position: 'Senior Full-Stack Developer',
        duration: '2023 - Present',
        description: 'Led development of AI-powered applications...',
        achievements: [
          'Reduced application load time by 40%',
          'Implemented AI chatbot with 95% satisfaction',
          'Mentored 5 junior developers'
        ]
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'TensorFlow'],
      soft: ['Leadership', 'Problem Solving', 'Communication'],
      languages: ['JavaScript', 'Python', 'TypeScript']
    },
    projects: [
      {
        id: 1,
        name: 'AI-Powered Portfolio',
        description: 'Interactive 3D portfolio with AI features',
        tech: ['React', 'Three.js', 'Python'],
        link: 'github.com/cael1127/portfolio'
      }
    ]
  });

  const [editData, setEditData] = useState(resumeData);

  // Save changes
  const handleSave = () => {
    setResumeData(editData);
    setIsEditing(false);
  };

  // Update field
  const updateField = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="resume-container">
      {/* Header */}
      <header className="resume-header">
        <div className="header-content">
          <h1 className="name">{resumeData.personal.name}</h1>
          <h2 className="title">{resumeData.personal.title}</h2>
          <div className="contact-info">
            <span>📧 {resumeData.personal.email}</span>
            <span>📱 {resumeData.personal.phone}</span>
            <span>📍 {resumeData.personal.location}</span>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? 'Cancel' : 'Edit Resume'}
        </button>
      </header>

      {/* Navigation */}
      <nav className="resume-nav">
        {['about', 'experience', 'skills', 'projects', 'education'].map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={\`nav-button \${activeSection === section ? 'active' : ''}\`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </nav>

      {/* Content Sections */}
      <main className="resume-content">
        {activeSection === 'about' && (
          <section className="about-section">
            <h3>About Me</h3>
            {isEditing ? (
              <textarea
                value={editData.about}
                onChange={(e) => updateField('about', 'about', e.target.value)}
                className="edit-textarea"
              />
            ) : (
              <p>{resumeData.about}</p>
            )}
          </section>
        )}

        {activeSection === 'experience' && (
          <section className="experience-section">
            <h3>Work Experience</h3>
            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="experience-item">
                <div className="experience-header">
                  <h4>{exp.position}</h4>
                  <span className="company">{exp.company}</span>
                  <span className="duration">{exp.duration}</span>
                </div>
                {isEditing ? (
                  <textarea
                    value={editData.experience[index].description}
                    onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
                    className="edit-textarea"
                  />
                ) : (
                  <p>{exp.description}</p>
                )}
                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="skills-section">
            <h3>Skills</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Technical Skills</h4>
                <div className="skill-tags">
                  {resumeData.skills.technical.map(skill => (
                    <span key={skill} className="skill-tag technical">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h4>Soft Skills</h4>
                <div className="skill-tags">
                  {resumeData.skills.soft.map(skill => (
                    <span key={skill} className="skill-tag soft">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="skill-category">
                <h4>Programming Languages</h4>
                <div className="skill-tags">
                  {resumeData.skills.languages.map(lang => (
                    <span key={lang} className="skill-tag language">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'projects' && (
          <section className="projects-section">
            <h3>Projects</h3>
            <div className="projects-grid">
              {resumeData.projects.map(project => (
                <div key={project.id} className="project-card">
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(tech => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={\`https://\${project.link}\`} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Project →
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'education' && (
          <section className="education-section">
            <h3>Education</h3>
            {resumeData.education.map(edu => (
              <div key={edu.id} className="education-item">
                <h4>{edu.degree}</h4>
                <p className="school">{edu.school}</p>
                <p className="year-gpa">{edu.year} • GPA: {edu.gpa}</p>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Save Button */}
      {isEditing && (
        <div className="save-controls">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

// CSS Styling
const styles = \`
.resume-container {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.resume-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.header-content h2 {
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.contact-info {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.edit-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.resume-nav {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.nav-button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-button.active {
  background: #667eea;
  color: white;
}

.nav-button:hover:not(.active) {
  background: #e9ecef;
}

.resume-content {
  padding: 2rem;
}

.resume-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: #2d3748;
}

.experience-item {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.experience-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #2d3748;
}

.company {
  font-weight: 500;
  color: #667eea;
}

.duration {
  font-size: 0.9rem;
  color: #718096;
}

.achievements {
  margin: 1rem 0 0 0;
  padding-left: 1.5rem;
}

.achievements li {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.skill-category h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #2d3748;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.skill-tag.technical {
  background: #e6fffa;
  color: #234e52;
}

.skill-tag.soft {
  background: #fef5e7;
  color: #744210;
}

.skill-tag.language {
  background: #e6f3ff;
  color: #2a4365;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-card h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.project-card p {
  color: #4a5568;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: #5a67d8;
}

.edit-textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
}

.save-controls {
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
}

.save-button {
  background: #48bb78;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-button:hover {
  background: #38a169;
}

@media (max-width: 768px) {
  .resume-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .resume-nav {
    flex-wrap: wrap;
  }
  
  .nav-button {
    flex: 1 1 50%;
  }
  
  .experience-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
\`;

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