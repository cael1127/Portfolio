import React, { useState } from 'react';

const ResumeAnalyzerProjectPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'demo', label: 'Live Demo', icon: '🎮' }
  ];

  const codeExamples = {
    resumeParser: `// Resume Parser and Analyzer
class ResumeAnalyzer {
  constructor() {
    this.parsers = new Map();
    this.analyzers = new Map();
    this.extractors = new Map();
    this.scorers = new Map();
  }

  initializeAnalyzers() {
    // Text extraction parsers
    this.parsers.set('pdf', new PDFParser());
    this.parsers.set('docx', new DocxParser());
    this.parsers.set('txt', new TextParser());

    // Content analyzers
    this.analyzers.set('skills', new SkillsAnalyzer());
    this.analyzers.set('experience', new ExperienceAnalyzer());
    this.analyzers.set('education', new EducationAnalyzer());
    this.analyzers.set('contact', new ContactAnalyzer());

    // Data extractors
    this.extractors.set('email', new EmailExtractor());
    this.extractors.set('phone', new PhoneExtractor());
    this.extractors.set('linkedin', new LinkedInExtractor());

    // Scoring systems
    this.scorers.set('skills', new SkillsScorer());
    this.scorers.set('experience', new ExperienceScorer());
    this.scorers.set('overall', new OverallScorer());
  }

  async analyzeResume(file, jobDescription = '') {
    const analysis = {
      file: file,
      extractedText: '',
      parsedData: {},
      scores: {},
      recommendations: [],
      timestamp: Date.now()
    };

    try {
      // Extract text from file
      analysis.extractedText = await this.extractText(file);
      
      // Parse structured data
      analysis.parsedData = await this.parseContent(analysis.extractedText);
      
      // Analyze against job description
      if (jobDescription) {
        analysis.scores = await this.scoreResume(analysis.parsedData, jobDescription);
        analysis.recommendations = await this.generateRecommendations(analysis);
      }

      return analysis;
    } catch (error) {
      throw new Error(\`Resume analysis failed: \${error.message}\`);
    }
  }

  async extractText(file) {
    const fileType = this.getFileType(file.name);
    const parser = this.parsers.get(fileType);
    
    if (!parser) {
      throw new Error(\`Unsupported file type: \${fileType}\`);
    }

    return await parser.extract(file);
  }

  async parseContent(text) {
    const parsedData = {
      contact: {},
      skills: [],
      experience: [],
      education: [],
      projects: []
    };

    // Extract contact information
    parsedData.contact = await this.extractContactInfo(text);
    
    // Extract skills
    parsedData.skills = await this.analyzers.get('skills').extract(text);
    
    // Extract experience
    parsedData.experience = await this.analyzers.get('experience').extract(text);
    
    // Extract education
    parsedData.education = await this.analyzers.get('education').extract(text);

    return parsedData;
  }

  async scoreResume(parsedData, jobDescription) {
    const scores = {};

    // Score skills match
    scores.skills = await this.scorers.get('skills').score(
      parsedData.skills, 
      this.extractJobSkills(jobDescription)
    );

    // Score experience relevance
    scores.experience = await this.scorers.get('experience').score(
      parsedData.experience,
      jobDescription
    );

    // Calculate overall score
    scores.overall = await this.scorers.get('overall').calculate(scores);

    return scores;
  }

  async generateRecommendations(analysis) {
    const recommendations = [];

    // Skills recommendations
    if (analysis.scores.skills < 0.7) {
      recommendations.push({
        type: 'skills',
        priority: 'high',
        message: 'Consider adding more relevant technical skills',
        suggestions: this.getSkillSuggestions(analysis)
      });
    }

    // Experience recommendations
    if (analysis.scores.experience < 0.6) {
      recommendations.push({
        type: 'experience',
        priority: 'medium',
        message: 'Highlight relevant project experience',
        suggestions: this.getExperienceSuggestions(analysis)
      });
    }

    return recommendations;
  }

  getFileType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    return extension;
  }

  extractJobSkills(jobDescription) {
    // Simple keyword extraction for job skills
    const skillKeywords = [
      'javascript', 'python', 'react', 'node.js', 'java', 'sql',
      'aws', 'docker', 'kubernetes', 'machine learning', 'ai'
    ];

    return skillKeywords.filter(skill => 
      jobDescription.toLowerCase().includes(skill)
    );
  }
}`,
    
    skillsAnalyzer: `// Skills Analysis and Matching
class SkillsAnalyzer {
  constructor() {
    this.skillCategories = {
      'programming': ['javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby'],
      'frameworks': ['react', 'angular', 'vue', 'node.js', 'django', 'flask', 'spring'],
      'databases': ['mysql', 'postgresql', 'mongodb', 'redis', 'oracle'],
      'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform'],
      'tools': ['git', 'jenkins', 'jira', 'confluence', 'figma', 'adobe']
    };
    
    this.skillPatterns = new Map();
    this.initializePatterns();
  }

  initializePatterns() {
    // Programming languages
    this.skillPatterns.set('programming', [
      /\\b(javascript|js|es6)\\b/gi,
      /\\b(python|py)\\b/gi,
      /\\b(java)\\b/gi,
      /\\b(c\\+\\+|cpp)\\b/gi,
      /\\b(c#|csharp)\\b/gi
    ]);

    // Frameworks and libraries
    this.skillPatterns.set('frameworks', [
      /\\b(react|angular|vue)\\b/gi,
      /\\b(node\\.js|nodejs)\\b/gi,
      /\\b(django|flask)\\b/gi,
      /\\b(spring|springboot)\\b/gi
    ]);

    // Databases
    this.skillPatterns.set('databases', [
      /\\b(mysql|postgresql|postgres)\\b/gi,
      /\\b(mongodb|mongo)\\b/gi,
      /\\b(redis)\\b/gi,
      /\\b(oracle|sqlserver)\\b/gi
    ]);

    // Cloud and DevOps
    this.skillPatterns.set('cloud', [
      /\\b(aws|amazon web services)\\b/gi,
      /\\b(azure|microsoft azure)\\b/gi,
      /\\b(gcp|google cloud)\\b/gi,
      /\\b(docker|kubernetes|k8s)\\b/gi
    ]);
  }

  async extract(text) {
    const skills = [];
    const categories = {};

    // Extract skills by category
    for (const [category, patterns] of this.skillPatterns) {
      const categorySkills = [];
      
      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches) {
          categorySkills.push(...matches.map(match => match.toLowerCase()));
        }
      }

      if (categorySkills.length > 0) {
        categories[category] = [...new Set(categorySkills)];
        skills.push(...categorySkills);
      }
    }

    return {
      skills: [...new Set(skills)],
      categories: categories,
      totalSkills: skills.length
    };
  }

  calculateSkillMatch(resumeSkills, jobSkills) {
    const resumeSkillSet = new Set(resumeSkills.map(skill => skill.toLowerCase()));
    const jobSkillSet = new Set(jobSkills.map(skill => skill.toLowerCase()));
    
    const intersection = new Set([...resumeSkillSet].filter(skill => jobSkillSet.has(skill)));
    const union = new Set([...resumeSkillSet, ...jobSkillSet]);
    
    return {
      matchCount: intersection.size,
      totalJobSkills: jobSkillSet.size,
      matchPercentage: intersection.size / jobSkillSet.size,
      jaccardSimilarity: intersection.size / union.size
    };
  }

  getSkillSuggestions(analysis) {
    const suggestions = [];
    const missingSkills = this.getMissingSkills(analysis);
    
    if (missingSkills.length > 0) {
      suggestions.push({
        type: 'missing_skills',
        skills: missingSkills,
        message: 'Consider adding these skills to improve your match'
      });
    }

    return suggestions;
  }

  getMissingSkills(analysis) {
    const jobSkills = analysis.jobSkills || [];
    const resumeSkills = analysis.parsedData.skills.skills || [];
    
    return jobSkills.filter(skill => 
      !resumeSkills.some(resumeSkill => 
        resumeSkill.toLowerCase().includes(skill.toLowerCase())
      )
    );
  }
}`,
    
    experienceAnalyzer: `// Experience Analysis and Scoring
class ExperienceAnalyzer {
  constructor() {
    this.experiencePatterns = [
      /(\\d{4})\\s*[-–]\\s*(\\d{4}|present|current)/gi,
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\\s+(\\d{4})\\s*[-–]\\s*(\\d{4}|present|current)/gi
    ];
    
    this.rolePatterns = [
      /(senior|lead|principal|staff|junior|associate)\\s+(developer|engineer|architect)/gi,
      /(software|full\\s*stack|front\\s*end|back\\s*end|devops|data)\\s+(developer|engineer)/gi
    ];
  }

  async extract(text) {
    const experiences = [];
    const lines = text.split('\\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const experience = this.parseExperienceLine(line, lines, i);
      
      if (experience) {
        experiences.push(experience);
      }
    }

    return {
      experiences: experiences,
      totalExperience: this.calculateTotalExperience(experiences),
      averageDuration: this.calculateAverageDuration(experiences)
    };
  }

  parseExperienceLine(line, allLines, currentIndex) {
    const experience = {
      title: '',
      company: '',
      duration: '',
      startDate: null,
      endDate: null,
      description: '',
      technologies: []
    };

    // Extract dates
    const dateMatch = line.match(this.experiencePatterns[0]) || 
                     line.match(this.experiencePatterns[1]);
    
    if (dateMatch) {
      experience.duration = dateMatch[0];
      const dates = this.parseDates(dateMatch[0]);
      experience.startDate = dates.start;
      experience.endDate = dates.end;
    }

    // Extract role title
    const roleMatch = line.match(this.rolePatterns[0]) || 
                     line.match(this.rolePatterns[1]);
    
    if (roleMatch) {
      experience.title = roleMatch[0];
    }

    // Extract company name (simple heuristic)
    const companyMatch = line.match(/at\\s+([A-Z][a-zA-Z\\s&]+)/i);
    if (companyMatch) {
      experience.company = companyMatch[1].trim();
    }

    // Extract description from following lines
    let descriptionLines = [];
    for (let j = currentIndex + 1; j < allLines.length; j++) {
      const nextLine = allLines[j];
      if (nextLine.trim() === '' || this.isNewExperience(nextLine)) {
        break;
      }
      descriptionLines.push(nextLine.trim());
    }
    experience.description = descriptionLines.join(' ');

    // Extract technologies from description
    experience.technologies = this.extractTechnologies(experience.description);

    return experience.title || experience.company ? experience : null;
  }

  parseDates(dateString) {
    const currentYear = new Date().getFullYear();
    
    if (dateString.includes('present') || dateString.includes('current')) {
      return {
        start: this.extractYear(dateString),
        end: currentYear
      };
    }

    const years = dateString.match(/\\d{4}/g);
    if (years && years.length >= 2) {
      return {
        start: parseInt(years[0]),
        end: parseInt(years[1])
      };
    }

    return { start: null, end: null };
  }

  extractYear(text) {
    const yearMatch = text.match(/\\d{4}/);
    return yearMatch ? parseInt(yearMatch[0]) : null;
  }

  isNewExperience(line) {
    return this.experiencePatterns.some(pattern => pattern.test(line));
  }

  extractTechnologies(description) {
    const techKeywords = [
      'javascript', 'python', 'react', 'node.js', 'java', 'sql',
      'aws', 'docker', 'kubernetes', 'git', 'jenkins'
    ];

    return techKeywords.filter(tech => 
      description.toLowerCase().includes(tech)
    );
  }

  calculateTotalExperience(experiences) {
    let totalYears = 0;
    
    for (const exp of experiences) {
      if (exp.startDate && exp.endDate) {
        totalYears += exp.endDate - exp.startDate;
      }
    }
    
    return totalYears;
  }

  calculateAverageDuration(experiences) {
    if (experiences.length === 0) return 0;
    
    const totalDuration = experiences.reduce((sum, exp) => {
      if (exp.startDate && exp.endDate) {
        return sum + (exp.endDate - exp.startDate);
      }
      return sum;
    }, 0);
    
    return totalDuration / experiences.length;
  }
}`,
    
    dashboardComponent: `// React Resume Analyzer Dashboard
import React, { useState, useRef } from 'react';

const ResumeAnalyzerDashboard = () => {
  const [resumeAnalyzer, setResumeAnalyzer] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    try {
      const analyzer = new ResumeAnalyzer();
      analyzer.initializeAnalyzers();
      
      const result = await analyzer.analyzeResume(file, jobDescription);
      setAnalysis(result);
      setResumeAnalyzer(analyzer);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-8">
          📄 Resume Analyzer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Upload Resume</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Job Description (Optional)
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste job description for targeted analysis..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded text-white resize-none"
                  rows="4"
                />
              </div>

              <div>
                <button
                  onClick={triggerFileUpload}
                  disabled={isAnalyzing}
                  className="w-full p-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Upload Resume'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Analysis Results</h3>
            
            {!analysis ? (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-4">📄</div>
                <p>Upload a resume to see analysis results</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Skills Analysis */}
                <div className="bg-gray-700 p-4 rounded">
                  <h4 className="font-semibold text-blue-400 mb-2">Skills Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-300">Total Skills</p>
                      <p className="text-xl font-bold">{analysis.parsedData.skills?.totalSkills || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Categories</p>
                      <p className="text-xl font-bold">{Object.keys(analysis.parsedData.skills?.categories || {}).length}</p>
                    </div>
                  </div>
                </div>

                {/* Experience Analysis */}
                <div className="bg-gray-700 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">Experience Analysis</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-300">Total Experience</p>
                      <p className="text-xl font-bold">{analysis.parsedData.experience?.totalExperience || 0} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Positions</p>
                      <p className="text-xl font-bold">{analysis.parsedData.experience?.experiences?.length || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Scores */}
                {analysis.scores && (
                  <div className="bg-gray-700 p-4 rounded">
                    <h4 className="font-semibold text-yellow-400 mb-2">Match Scores</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Skills Match</span>
                        <span className="font-bold">{Math.round(analysis.scores.skills * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience Match</span>
                        <span className="font-bold">{Math.round(analysis.scores.experience * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-green-400">
                        <span>Overall Score</span>
                        <span className="font-bold">{Math.round(analysis.scores.overall * 100)}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {analysis.recommendations && analysis.recommendations.length > 0 && (
                  <div className="bg-gray-700 p-4 rounded">
                    <h4 className="font-semibold text-red-400 mb-2">Recommendations</h4>
                    <div className="space-y-2">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-semibold">{rec.message}</p>
                          {rec.suggestions && (
                            <ul className="list-disc list-inside text-gray-300 mt-1">
                              {rec.suggestions.map((suggestion, idx) => (
                                <li key={idx}>{suggestion}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
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
          <h1 className="text-4xl font-bold text-green-400 mb-4">📄 Resume Analyzer</h1>
          <p className="text-gray-300 text-lg">
            AI-powered resume analysis with skills matching, experience evaluation, and personalized recommendations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
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
                  The Resume Analyzer is an intelligent system that uses AI and natural language processing 
                  to analyze resumes, extract key information, and provide detailed insights. It offers 
                  skills matching, experience evaluation, and personalized recommendations for career development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Key Objectives</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Automated resume parsing and analysis</li>
                    <li>• Skills extraction and categorization</li>
                    <li>• Experience evaluation and scoring</li>
                    <li>• Job description matching</li>
                    <li>• Personalized recommendations</li>
                    <li>• Career development insights</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Technical Stack</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• React.js for user interface</li>
                    <li>• Natural Language Processing</li>
                    <li>• PDF and document parsing</li>
                    <li>• AI-powered analysis</li>
                    <li>• Skills matching algorithms</li>
                    <li>• Recommendation engine</li>
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
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">📄 Document Processing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• PDF, DOCX, and TXT support</li>
                    <li>• Text extraction and parsing</li>
                    <li>• Structured data extraction</li>
                    <li>• Contact information detection</li>
                    <li>• Format validation</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">🧠 AI Analysis</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Skills extraction and categorization</li>
                    <li>• Experience timeline analysis</li>
                    <li>• Education verification</li>
                    <li>• Project portfolio analysis</li>
                    <li>• Sentiment and tone analysis</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-green-400 mb-3">🎯 Job Matching</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Skills-to-job matching</li>
                    <li>• Experience relevance scoring</li>
                    <li>• Overall fit calculation</li>
                    <li>• Competitive analysis</li>
                    <li>• Market positioning</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">💡 Recommendations</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Skills improvement suggestions</li>
                    <li>• Experience enhancement tips</li>
                    <li>• Career development guidance</li>
                    <li>• Resume optimization advice</li>
                    <li>• Learning path recommendations</li>
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
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Resume Parser</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.resumeParser}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Skills Analyzer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.skillsAnalyzer}</code>
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Experience Analyzer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <pre className="text-green-400 text-sm overflow-x-auto">
                      <code>{codeExamples.experienceAnalyzer}</code>
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
                      <li>• React.js upload interface</li>
                      <li>• Real-time analysis display</li>
                      <li>• Interactive results visualization</li>
                      <li>• File validation and processing</li>
                      <li>• Progress tracking</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Analysis Layer</h3>
                  <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                    <ul className="space-y-2 text-gray-300">
                      <li>• Document parsing engine</li>
                      <li>• NLP text analysis</li>
                      <li>• Skills extraction algorithms</li>
                      <li>• Experience timeline analysis</li>
                      <li>• Matching and scoring</li>
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
                      <p className="text-white font-semibold">Document Upload</p>
                      <p className="text-gray-300 text-sm">File validation and text extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">2</div>
                    <div>
                      <p className="text-white font-semibold">Content Analysis</p>
                      <p className="text-gray-300 text-sm">Skills, experience, and education extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm">3</div>
                    <div>
                      <p className="text-white font-semibold">Matching & Scoring</p>
                      <p className="text-gray-300 text-sm">Job description comparison and recommendations</p>
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
                Experience the resume analyzer in action. The demo showcases document parsing, 
                AI-powered analysis, skills matching, and personalized recommendations.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Interactive Resume Analyzer Demo</h3>
                  <button
                    onClick={() => setCurrentPage('resume-analyzer')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Launch Demo
                  </button>
                </div>
                <p className="text-gray-300 text-sm">
                  Click "Launch Demo" to experience the full resume analyzer with document parsing, 
                  AI-powered analysis, skills matching, and personalized recommendations.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerProjectPage; 