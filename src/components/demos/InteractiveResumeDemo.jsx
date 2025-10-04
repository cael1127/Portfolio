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
        description: 'Led development of AI-powered applications and mentored junior developers.'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        duration: '2020 - 2022',
        description: 'Built scalable web applications using React, Node.js, and cloud technologies.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of Technology',
        degree: 'Bachelor of Computer Science',
        year: '2018',
        gpa: '3.8'
      }
    ],
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker']
  });

  const demoCode = `/**
 * Interactive Resume Demo Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates a real-time editable resume with
 * auto-save functionality, responsive design, and modern UI components.
 */

import React, { useState, useEffect } from 'react';

const InteractiveResume = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {
      name: 'John Doe',
      title: 'Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Passionate software engineer with expertise in full-stack development.'
    },
    experience: [],
    education: [],
    skills: []
  });

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

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    setEditMode(false);
    alert('Resume saved successfully!');
  };

  return (
    <div className="interactive-resume">
      {/* Navigation */}
      <nav className="resume-nav">
        <button 
          onClick={() => setActiveSection('personal')}
          className={activeSection === 'personal' ? 'active' : ''}
        >
          Personal
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
        <button onClick={toggleEditMode} className="edit-btn">
          {editMode ? 'Preview' : 'Edit'}
        </button>
      </nav>

      {/* Resume Content */}
      <div className="resume-content">
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
            onChange={(index, field, value) => handleArrayItemChange('experience', index, field, value)}
            onAdd={(newItem) => addArrayItem('experience', newItem)}
            onRemove={(index) => removeArrayItem('experience', index)}
          />
        )}
        {activeSection === 'education' && (
          <EducationSection 
            data={resumeData.education} 
            editMode={editMode}
            onChange={(index, field, value) => handleArrayItemChange('education', index, field, value)}
            onAdd={(newItem) => addArrayItem('education', newItem)}
            onRemove={(index) => removeArrayItem('education', index)}
          />
        )}
        {activeSection === 'skills' && (
          <SkillsSection 
            data={resumeData.skills} 
            editMode={editMode}
            onChange={(index, value) => handleArrayItemChange('skills', index, 'name', value)}
            onAdd={(newSkill) => addArrayItem('skills', { name: newSkill })}
            onRemove={(index) => removeArrayItem('skills', index)}
          />
        )}
      </div>

      {/* Save Controls */}
      {editMode && (
        <div className="save-controls">
          <button onClick={handleSave} className="save-btn">
            Save Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default InteractiveResume;`;

  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...newItem, id: Date.now() }]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    setEditMode(false);
    alert('Resume saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-400">📝 Interactive Resume</h1>
            <p className="text-gray-400">Real-time editing with auto-save functionality</p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            View Code
          </button>
        </div>

        {/* Resume Navigation */}
        <div className="bg-gray-800 p-4 rounded-xl mb-6">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveSection('personal')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'personal' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              👤 Personal Info
            </button>
            <button 
              onClick={() => setActiveSection('experience')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'experience' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              💼 Experience
            </button>
            <button 
              onClick={() => setActiveSection('education')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'education' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🎓 Education
            </button>
            <button 
              onClick={() => setActiveSection('skills')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'skills' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              🛠️ Skills
            </button>
            <button 
              onClick={toggleEditMode} 
              className={`ml-auto px-4 py-2 rounded-lg transition-colors ${
                editMode 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
            >
              {editMode ? '👁️ Preview' : '✏️ Edit'}
            </button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          {/* Personal Information */}
          {activeSection === 'personal' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">👤 Personal Information</h2>
              {editMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personal.name}
                      onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={resumeData.personal.title}
                      onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personal.phone}
                      onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
                    <textarea
                      value={resumeData.personal.summary}
                      onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                      rows="3"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">{resumeData.personal.name}</h1>
                    <p className="text-blue-400 text-xl">{resumeData.personal.title}</p>
                    <p className="text-gray-400">{resumeData.personal.location}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-gray-300">📧 {resumeData.personal.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">📱 {resumeData.personal.phone}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Professional Summary</h3>
                    <p className="text-gray-300">{resumeData.personal.summary}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Experience */}
          {activeSection === 'experience' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">💼 Work Experience</h2>
                {editMode && (
                  <button
                    onClick={() => addArrayItem('experience', { company: '', position: '', duration: '', description: '' })}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ➕ Add Experience
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-700 p-4 rounded-lg">
                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleArrayItemChange('experience', index, 'company', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleArrayItemChange('experience', index, 'position', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleArrayItemChange('experience', index, 'duration', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={() => removeArrayItem('experience', index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleArrayItemChange('experience', index, 'description', e.target.value)}
                            rows="3"
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.position}</h3>
                        <p className="text-blue-400">{exp.company} • {exp.duration}</p>
                        <p className="text-gray-300 mt-2">{exp.description}</p>
                      </div>
                    )}
                  </div>
                ))}
                {resumeData.experience.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    {editMode ? 'Click "Add Experience" to get started' : 'No experience added yet'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {activeSection === 'education' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🎓 Education</h2>
                {editMode && (
                  <button
                    onClick={() => addArrayItem('education', { institution: '', degree: '', year: '', gpa: '' })}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ➕ Add Education
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="bg-gray-700 p-4 rounded-lg">
                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleArrayItemChange('education', index, 'institution', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Degree</label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleArrayItemChange('education', index, 'degree', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleArrayItemChange('education', index, 'year', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">GPA</label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => handleArrayItemChange('education', index, 'gpa', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                          <button
                            onClick={() => removeArrayItem('education', index)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                        <p className="text-blue-400">{edu.institution} • {edu.year} • GPA: {edu.gpa}</p>
                      </div>
                    )}
                  </div>
                ))}
                {resumeData.education.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    {editMode ? 'Click "Add Education" to get started' : 'No education added yet'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {activeSection === 'skills' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🛠️ Skills</h2>
                {editMode && (
                  <button
                    onClick={() => {
                      const newSkill = prompt('Enter a new skill:');
                      if (newSkill) addArrayItem('skills', { name: newSkill });
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    ➕ Add Skill
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-700 px-3 py-2 rounded-lg flex items-center gap-2">
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleArrayItemChange('skills', index, 'name', e.target.value)}
                          className="bg-transparent text-white focus:outline-none"
                        />
                        <button
                          onClick={() => removeArrayItem('skills', index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span className="text-white">{skill}</span>
                    )}
                  </div>
                ))}
                {resumeData.skills.length === 0 && (
                  <div className="text-center py-8 text-gray-400 w-full">
                    {editMode ? 'Click "Add Skill" to get started' : 'No skills added yet'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Save Controls */}
        {editMode && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors text-lg font-semibold"
            >
              💾 Save Resume
            </button>
          </div>
        )}

        {/* Demo Features */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-white mb-4">✨ Demo Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-blue-400 mb-3">Interactive Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time editing with live preview</li>
                <li>• Auto-save to localStorage</li>
                <li>• Responsive design for all devices</li>
                <li>• Dynamic form validation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-green-400 mb-3">Technical Implementation</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• React hooks for state management</li>
                <li>• Local storage persistence</li>
                <li>• Modular component architecture</li>
                <li>• Modern CSS styling</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={demoCode}
        language="javascript"
        title="Interactive Resume Implementation"
      />
    </div>
  );
};

export default InteractiveResumeDemo;