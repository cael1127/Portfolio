import React, { useState } from 'react';

const PortfolioBuilderDemo = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [portfolioData, setPortfolioData] = useState({
    name: 'John Doe',
    title: 'Creative Designer',
    bio: 'Passionate designer with 5+ years of experience in digital art and web design.',
    projects: [
      { id: 1, title: 'Brand Identity Design', category: 'Branding', image: '🎨' },
      { id: 2, title: 'Website Redesign', category: 'Web Design', image: '💻' },
      { id: 3, title: 'Mobile App UI', category: 'UI/UX', image: '📱' },
    ],
    skills: ['Photoshop', 'Illustrator', 'Figma', 'React', 'CSS3']
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dragItem, setDragItem] = useState(null);

  const templates = [
    { id: 'modern', name: 'Modern', preview: '🎨' },
    { id: 'minimal', name: 'Minimal', preview: '⚪' },
    { id: 'creative', name: 'Creative', preview: '✨' },
    { id: 'professional', name: 'Professional', preview: '💼' },
  ];

  const handleDragStart = (e, item) => {
    setDragItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (dragItem && dragItem.id !== targetId) {
      const newProjects = [...portfolioData.projects];
      const draggedIndex = newProjects.findIndex(p => p.id === dragItem.id);
      const targetIndex = newProjects.findIndex(p => p.id === targetId);
      
      const [draggedProject] = newProjects.splice(draggedIndex, 1);
      newProjects.splice(targetIndex, 0, draggedProject);
      
      setPortfolioData({ ...portfolioData, projects: newProjects });
    }
    setDragItem(null);
  };

  const updateField = (field, value) => {
    setPortfolioData({ ...portfolioData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎨 Creative Portfolio Builder</h1>
          <p className="text-gray-400">Drag-and-drop website builder for creatives</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Builder Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <h2 className="text-xl font-semibold text-white mb-4">Builder Tools</h2>
              
              {/* Template Selection */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Choose Template</h3>
                <div className="grid grid-cols-2 gap-2">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTemplate === template.id
                          ? 'border-green-400 bg-green-800'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{template.preview}</div>
                      <div className="text-white text-sm">{template.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Edit Mode Toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                    isEditing
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {isEditing ? 'Preview Mode' : 'Edit Mode'}
                </button>
              </div>

              {/* Content Editor */}
              {isEditing && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={portfolioData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={portfolioData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Bio</label>
                    <textarea
                      value={portfolioData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      rows={3}
                      className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800">
              <div className="bg-white rounded-lg p-8 min-h-[600px]">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{portfolioData.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{portfolioData.title}</p>
                  <p className="text-gray-700 max-w-2xl mx-auto">{portfolioData.bio}</p>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolioData.projects.map((project, index) => (
                      <div
                        key={project.id}
                        draggable={isEditing}
                        onDragStart={(e) => isEditing && handleDragStart(e, project)}
                        onDragOver={(e) => isEditing && handleDragOver(e)}
                        onDrop={(e) => isEditing && handleDrop(e, project.id)}
                        className={`bg-gray-50 p-4 rounded-lg border-2 ${
                          isEditing ? 'cursor-move hover:border-green-400' : 'border-gray-200'
                        } transition-all`}
                      >
                        <div className="text-3xl mb-2">{project.image}</div>
                        <h3 className="font-semibold text-gray-800 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* E-commerce Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available for Purchase</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">🎨</div>
                      <h3 className="font-semibold text-gray-800">Custom Logo Design</h3>
                      <p className="text-green-600 font-bold mt-2">$299</p>
                      <button className="mt-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded text-sm hover:from-green-600 hover:to-teal-600 transition-all">
                        Add to Cart
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">💻</div>
                      <h3 className="font-semibold text-gray-800">Website Design</h3>
                      <p className="text-green-600 font-bold mt-2">$599</p>
                      <button className="mt-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded text-sm hover:from-green-600 hover:to-teal-600 transition-all">
                        Add to Cart
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">📱</div>
                      <h3 className="font-semibold text-gray-800">App UI Design</h3>
                      <p className="text-green-600 font-bold mt-2">$399</p>
                      <button className="mt-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded text-sm hover:from-green-600 hover:to-teal-600 transition-all">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderDemo; 