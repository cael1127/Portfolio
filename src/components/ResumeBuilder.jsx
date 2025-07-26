import React, { useState } from 'react';
import ContactModal from './ContactModal';

const ResumeBuilder = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeSection, setActiveSection] = useState('guide');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Resume Builder & Career Guide</h1>
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            <button
              onClick={() => setActiveSection('guide')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'guide' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Big Tech Guide
            </button>
            <button
              onClick={() => setActiveSection('builder')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'builder' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Resume Builder
            </button>
            <button
              onClick={() => setActiveSection('projects')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeSection === 'projects' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Project Ideas
            </button>
          </div>

          {/* Big Tech Internship Guide */}
          {activeSection === 'guide' && (
            <div className="bg-gray-800 rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">🚀 Guide to Building a Winning Resume for Big Tech Internships</h2>
                <p className="text-gray-300 text-lg">Freshman Edition - Break into Google, Meta, Amazon, Microsoft</p>
              </div>

              <div className="space-y-8">
                {/* Introduction */}
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-teal-400">🎯 Why This Guide?</h3>
                  <p className="text-gray-300 mb-4">
                    To break into <strong>big tech</strong>—Google, Meta, Amazon, Microsoft, etc.—your resume must survive the first filter: 
                    <strong> automated systems (ATS)</strong> that scan for the right projects and keywords.
                  </p>
                  <p className="text-gray-300">
                    This guide gives you the exact strategy and projects you need to showcase the right skills 
                    <strong> as a freshman</strong>, stand out, and land interviews.
                  </p>
                </div>

                {/* Project Selection Strategy */}
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-green-400">📌 How to Choose the Right Projects</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">🔍 Match Projects to the Job Role</h4>
                        <p className="text-gray-300">Not all projects are created equal. To pass resume screens, projects must align with the <em>technologies listed in job descriptions</em>.</p>
                        <p className="text-gray-300 mt-2">Decide on your role focus: <strong>Frontend, Backend, Full-Stack, or AI/ML</strong>.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">🤖 Use AI to Extract Keywords</h4>
                        <p className="text-gray-300">Copy a job posting from Google/Amazon/etc. and paste it into ChatGPT with:</p>
                        <div className="bg-gray-800 p-3 rounded mt-2 font-mono text-sm">
                          "Extract key skills and technologies required for this role."
                        </div>
                        <p className="text-gray-300 mt-2">Look for patterns like <strong>React</strong>, <strong>Python</strong>, <strong>NLP</strong>, <strong>REST APIs</strong>, etc.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">✍️ Optimize Your Resume with Keywords</h4>
                        <p className="text-gray-300">In each project, include:</p>
                        <ul className="text-gray-300 mt-2 space-y-1">
                          <li>✅ The tools/tech used</li>
                          <li>✅ A result or impact</li>
                          <li>✅ A link to code/demo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Categories */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-emerald-400">💼 Resume-Boosting Projects by Area</h3>
                  
                  {/* AI/ML Projects */}
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-pink-400">🧠 A. AI / ML Projects</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2">Project Title</th>
                            <th className="text-left py-2">Skills Shown</th>
                            <th className="text-left py-2">Link</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">Train an AI to Play Snake</td>
                            <td className="py-2 text-gray-300">Python, PyTorch, Pygame, RL concepts</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=L8ypSXwyBds" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">AI Agents in Pure Python</td>
                            <td className="py-2 text-gray-300">Python, agent-based design</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=bZzyPscbtI8" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">Sentiment Analysis on Amazon Reviews</td>
                            <td className="py-2 text-gray-300">NLTK, Huggingface, Transformers, Python</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=QpzMWQvxXWk" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold">Titanic Survival Predictor (Kaggle)</td>
                            <td className="py-2 text-gray-300">Pandas, scikit-learn, data cleaning</td>
                            <td className="py-2">
                              <a href="https://www.kaggle.com/competitions/titanic/discussion" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Try</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Frontend Projects */}
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-blue-400">💻 B. Frontend Projects</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2">Project Title</th>
                            <th className="text-left py-2">Skills Shown</th>
                            <th className="text-left py-2">Link</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">3D Portfolio Website</td>
                            <td className="py-2 text-gray-300">JavaScript, Three.js, WebGL</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=Q7AOvWpIVHU" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">RAG Chatbot w/ Next.js</td>
                            <td className="py-2 text-gray-300">React, LangChain.js, Vercel, OpenAI</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=d-VKYF4Zow0" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">Interactive Resume Web App</td>
                            <td className="py-2 text-gray-300">React, CSS</td>
                            <td className="py-2 text-gray-400">Build from scratch</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold">CSS Art or Animation Gallery</td>
                            <td className="py-2 text-gray-300">HTML, CSS, design creativity</td>
                            <td className="py-2 text-gray-400">Use CodePen or YouTube for inspiration</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Backend Projects */}
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-purple-400">🔧 C. Backend & Full-Stack Projects</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left py-2">Project Title</th>
                            <th className="text-left py-2">Skills Shown</th>
                            <th className="text-left py-2">Link</th>
                          </tr>
                        </thead>
                        <tbody className="space-y-2">
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">RAG Chatbot Backend</td>
                            <td className="py-2 text-gray-300">Node.js, LangChain.js</td>
                            <td className="py-2">
                              <a href="https://www.youtube.com/watch?v=d-VKYF4Zow0" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">Watch</a>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">Bookstore REST API</td>
                            <td className="py-2 text-gray-300">Express.js or FastAPI, REST principles</td>
                            <td className="py-2 text-gray-400">Search "Bookstore API Project"</td>
                          </tr>
                          <tr className="border-b border-gray-600">
                            <td className="py-2 font-semibold">Expense Tracker App (MERN)</td>
                            <td className="py-2 text-gray-300">MongoDB, Express, React, Node.js</td>
                            <td className="py-2 text-gray-400">Search "MERN Expense Tracker"</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold">Mini Social Network</td>
                            <td className="py-2 text-gray-300">Django/Express, SQL, Auth</td>
                            <td className="py-2 text-gray-400">Search "Social Media App Tutorial"</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-yellow-400">🛠️ How to Build Projects That Impress</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>🧠 Use <strong>version control</strong> (Git/GitHub)</li>
                    <li>📝 Add a <code className="bg-gray-800 px-2 py-1 rounded">README.md</code>: what it does, tech used, screenshots</li>
                    <li>🌐 Host <strong>demos</strong> on Vercel, Netlify, or Streamlit</li>
                    <li>✅ Include <strong>unit tests</strong> and well-commented code</li>
                  </ul>
                </div>

                {/* Resume Optimization */}
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">📝 Resume Optimization Checklist</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>✅ Use <strong>targeted titles</strong> (e.g., "Full-Stack Expense Tracker using MERN Stack")</li>
                    <li>✅ Mention <strong>key technologies</strong> (e.g., "Python, Huggingface, PyTorch")</li>
                    <li>✅ Show <strong>results/impact</strong> (e.g., "95% accuracy in classification task")</li>
                    <li>✅ Add <strong>GitHub/Demo links</strong></li>
                    <li>✅ Avoid vague names like "My Project"</li>
                  </ul>
                </div>

                {/* Final Thoughts */}
                <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-white">🎯 Final Thoughts: Play to the Algorithms</h3>
                  <p className="text-white">
                    Big tech internships are <strong>achievable—even in freshman year</strong>—with the right project strategy. 
                    Build <strong>intentional projects</strong>, use <strong>AI to optimize</strong>, showcase your outcomes, 
                    and host your work online. Let your projects speak for your ability.
                  </p>
                </div>

                {/* Quick Reference */}
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-cyan-400">🔗 Quick Reference: Project Links</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <a href="https://www.youtube.com/watch?v=L8ypSXwyBds" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">1. 🐍 Snake AI (Reinforcement Learning)</a>
                      <a href="https://www.youtube.com/watch?v=bZzyPscbtI8" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">2. 🤖 Pure Python AI Agents</a>
                      <a href="https://www.youtube.com/watch?v=QpzMWQvxXWk" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">3. 📝 Sentiment Analysis with Transformers</a>
                    </div>
                    <div className="space-y-2">
                      <a href="https://www.kaggle.com/competitions/titanic/discussion" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">4. 🚢 Kaggle Titanic Challenge</a>
                      <a href="https://www.youtube.com/watch?v=Q7AOvWpIVHU" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">5. 🌐 3D Portfolio Site (Three.js)</a>
                      <a href="https://www.youtube.com/watch?v=d-VKYF4Zow0" target="_blank" rel="noopener noreferrer" className="block text-teal-400 hover:text-teal-300">6. 💬 RAG Chatbot w/ Next.js</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resume Builder Tool */}
          {activeSection === 'builder' && (
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Interactive Resume Builder</h2>
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  Build a professional resume optimized for ATS systems and big tech applications.
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Get Custom Resume Help
                </button>
              </div>
            </div>
          )}

          {/* Project Ideas Database */}
          {activeSection === 'projects' && (
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-center mb-8">Project Ideas Database</h2>
              <div className="text-center">
                <p className="text-gray-300 mb-6">
                  Browse curated project ideas by skill level and technology stack.
                </p>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  Access Project Database
                </button>
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Personalized Career Guidance?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              I can help you create a winning resume, choose the right projects, and develop a strategy 
              to break into big tech companies. Let's work together to achieve your career goals.
            </p>
            <button
              onClick={() => setShowContactModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get Career Coaching
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal} 
        onClose={() => setShowContactModal(false)} 
      />
    </div>
  );
};

export default ResumeBuilder; 