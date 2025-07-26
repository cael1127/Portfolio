import React, { useState, useEffect } from 'react';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'Cael Findley',
      title: 'Full-Stack Software Engineer',
              email: 'findleytechs@gmail.com',
      phone: '+1 (361) 920-6493',
      location: 'Texas, United States',
      linkedin: 'linkedin.com/in/caelfindley',
      github: 'github.com/cael1127'
    },
    summary: 'Full-Stack Software Engineer specializing in modern web technologies, cloud infrastructure, and innovative solutions that drive business growth.',
    experience: [
      {
        id: 1,
        company: 'Three Sisters Oyster Company',
        position: 'Software Engineer',
        duration: '2025 - Present',
        location: 'Texas, United States',
        description: 'Developed and maintained aquaculture tracking systems, implemented cloud infrastructure, and ensured HIPAA compliance for healthcare integrations.',
        achievements: [
          'Built real-time monitoring systems for aquaculture operations',
          'Implemented cloud-native solutions using AWS and Docker',
          'Developed secure data management systems'
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Texas',
        year: '2024',
        gpa: '3.8/4.0'
      }
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'TypeScript', 'GraphQL'],
      soft: ['Problem Solving', 'Team Leadership', 'Agile Development', 'Client Communication', 'Project Management']
    },
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        year: '2024'
      },
      {
        id: 2,
        name: 'Google Cloud Professional Data Engineer',
        issuer: 'Google Cloud',
        year: '2024'
      },
      {
        id: 3,
        name: 'CompTIA Security+',
        issuer: 'CompTIA',
        year: '2024'
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Aquaculture Tracking System',
        description: 'Real-time monitoring system for aquaculture operations with IoT integration',
        technologies: ['React', 'Node.js', 'AWS', 'IoT']
      },
      {
        id: 2,
        name: 'Smart Logistics Platform',
        description: 'AI-powered logistics optimization with real-time tracking and analytics',
        technologies: ['Python', 'Machine Learning', 'React', 'PostgreSQL']
      }
    ]
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [previewMode, setPreviewMode] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [showExportModal, setShowExportModal] = useState(false);

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🎨' },
    { id: 'professional', name: 'Professional', preview: '💼' },
    { id: 'creative', name: 'Creative', preview: '✨' },
    { id: 'minimal', name: 'Minimal', preview: '📄' }
  ];

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'summary', name: 'Summary', icon: '📝' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'certifications', name: 'Certifications', icon: '🏆' },
    { id: 'projects', name: 'Projects', icon: '🚀' }
  ];

  const updateResumeData = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayField = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (section) => {
    const newItem = {
      id: Date.now(),
      ...(section === 'experience' && {
        company: '',
        position: '',
        duration: '',
        location: '',
        description: '',
        achievements: []
      }),
      ...(section === 'education' && {
        degree: '',
        institution: '',
        year: '',
        gpa: ''
      }),
      ...(section === 'certifications' && {
        name: '',
        issuer: '',
        year: ''
      }),
      ...(section === 'projects' && {
        name: '',
        description: '',
        technologies: []
      })
    };

    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={resumeData.personalInfo.name}
            onChange={(e) => updateResumeData('personalInfo', 'name', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
          <input
            type="text"
            value={resumeData.personalInfo.title}
            onChange={(e) => updateResumeData('personalInfo', 'title', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updateResumeData('personalInfo', 'email', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updateResumeData('personalInfo', 'phone', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => updateResumeData('personalInfo', 'location', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
          <input
            type="text"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updateResumeData('personalInfo', 'linkedin', e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Professional Summary</label>
      <textarea
        value={resumeData.summary}
        onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
        rows={4}
        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        placeholder="Write a compelling professional summary..."
      />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {resumeData.experience.map((exp, index) => (
        <div key={exp.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-white">Experience #{index + 1}</h3>
            <button
              onClick={() => removeArrayItem('experience', index)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateArrayField('experience', index, 'company', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateArrayField('experience', index, 'position', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
              <input
                type="text"
                value={exp.duration}
                onChange={(e) => updateArrayField('experience', index, 'duration', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateArrayField('experience', index, 'location', e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => updateArrayField('experience', index, 'description', e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      ))}
      <button
        onClick={() => addArrayItem('experience')}
        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        + Add Experience
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Technical Skills (comma-separated)</label>
        <input
          type="text"
          value={resumeData.skills.technical.join(', ')}
          onChange={(e) => setResumeData(prev => ({
            ...prev,
            skills: { ...prev.skills, technical: e.target.value.split(',').map(s => s.trim()) }
          }))}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Soft Skills (comma-separated)</label>
        <input
          type="text"
          value={resumeData.skills.soft.join(', ')}
          onChange={(e) => setResumeData(prev => ({
            ...prev,
            skills: { ...prev.skills, soft: e.target.value.split(',').map(s => s.trim()) }
          }))}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name}</h1>
        <p className="text-xl text-gray-600 mb-4">{resumeData.personalInfo.title}</p>
        <div className="flex justify-center space-x-4 text-sm text-gray-500">
          <span>{resumeData.personalInfo.email}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>•</span>
          <span>{resumeData.personalInfo.location}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Summary</h2>
        <p className="text-gray-700">{resumeData.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800">{exp.position}</h3>
              <span className="text-gray-500 text-sm">{exp.duration}</span>
            </div>
            <p className="text-gray-600 mb-1">{exp.company} • {exp.location}</p>
            <p className="text-gray-700 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b border-gray-300 pb-2">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Technical Skills</h3>
            <p className="text-gray-700">{resumeData.skills.technical.join(', ')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Soft Skills</h3>
            <p className="text-gray-700">{resumeData.skills.soft.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📄 Resume Builder</h1>
          <p className="text-gray-400">Create and customize your professional resume</p>
        </div>

        {/* Template Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🎨 Choose Template</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedTemplate === template.id
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{template.preview}</div>
                <div className="font-semibold">{template.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setPreviewMode(false)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                !previewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              ✏️ Edit Mode
            </button>
            <button
              onClick={() => setPreviewMode(true)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                previewMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              👁️ Preview Mode
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📤 Export PDF
            </button>
          </div>
        </div>

        {previewMode ? (
          renderPreview()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">📋 Sections</h2>
                <div className="space-y-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {sections.find(s => s.id === activeSection)?.icon} {sections.find(s => s.id === activeSection)?.name}
                </h2>
                
                {activeSection === 'personal' && renderPersonalInfo()}
                {activeSection === 'summary' && renderSummary()}
                {activeSection === 'experience' && renderExperience()}
                {activeSection === 'skills' && renderSkills()}
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Export Resume</h3>
              <div className="space-y-4">
                <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  📄 Export as PDF
                </button>
                <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  📄 Export as Word
                </button>
                <button className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  📄 Export as HTML
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeBuilder; 