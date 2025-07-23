import React, { useState, useEffect } from 'react';

const ResumeAnalyzerDemo = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalResumes: 0,
    analyzedToday: 0,
    averageScore: 0,
    matchRate: 0
  });

  // Initialize resume analyzer data
  useEffect(() => {
    const initialResumes = [
      {
        id: 1,
        candidate: 'Sarah Johnson',
        position: 'Senior Software Engineer',
        status: 'analyzed',
        score: 87,
        lastUpdate: '2 minutes ago',
        alerts: [],
        details: {
          experience: '8 years',
          education: 'MS Computer Science',
          skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
          languages: ['JavaScript', 'Python', 'Java', 'SQL'],
          certifications: ['AWS Certified Developer', 'Google Cloud Professional']
        },
        analysis: {
          skillsMatch: 92,
          experienceRelevance: 88,
          educationFit: 85,
          overallScore: 87,
          recommendations: ['Add more cloud experience', 'Include project metrics']
        }
      },
      {
        id: 2,
        candidate: 'Mike Chen',
        position: 'Data Scientist',
        status: 'analyzed',
        score: 94,
        lastUpdate: '1 minute ago',
        alerts: [],
        details: {
          experience: '5 years',
          education: 'PhD Statistics',
          skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning', 'R'],
          languages: ['Python', 'R', 'SQL', 'JavaScript'],
          certifications: ['Google Cloud Professional Data Engineer']
        },
        analysis: {
          skillsMatch: 96,
          experienceRelevance: 92,
          educationFit: 98,
          overallScore: 94,
          recommendations: ['Excellent profile', 'Consider for interview']
        }
      },
      {
        id: 3,
        candidate: 'Alex Rodriguez',
        position: 'Frontend Developer',
        status: 'warning',
        score: 72,
        lastUpdate: 'Just now',
        alerts: ['Missing key skills', 'Limited experience'],
        details: {
          experience: '2 years',
          education: 'BS Computer Science',
          skills: ['HTML', 'CSS', 'JavaScript', 'React'],
          languages: ['JavaScript', 'HTML', 'CSS'],
          certifications: []
        },
        analysis: {
          skillsMatch: 68,
          experienceRelevance: 65,
          educationFit: 75,
          overallScore: 72,
          recommendations: ['Add more frameworks', 'Include portfolio projects']
        }
      }
    ];
    setResumes(initialResumes);
    setSystemStats({
      totalResumes: 247,
      analyzedToday: 23,
      averageScore: 84.3,
      matchRate: 78.5
    });
  }, []);

  // Simulate real-time resume updates
  useEffect(() => {
    const interval = setInterval(() => {
      setResumes(prevResumes => prevResumes.map(resume => {
        const newResume = {
          ...resume,
          score: Math.max(60, Math.min(98, resume.score + (Math.random() - 0.5) * 3)),
          lastUpdate: 'Just now'
        };

        // Update analysis scores
        newResume.analysis = {
          ...resume.analysis,
          skillsMatch: Math.max(60, Math.min(98, resume.analysis.skillsMatch + (Math.random() - 0.5) * 2)),
          experienceRelevance: Math.max(60, Math.min(98, resume.analysis.experienceRelevance + (Math.random() - 0.5) * 2)),
          educationFit: Math.max(60, Math.min(98, resume.analysis.educationFit + (Math.random() - 0.5) * 2)),
          overallScore: Math.round((newResume.analysis.skillsMatch + newResume.analysis.experienceRelevance + newResume.analysis.educationFit) / 3)
        };

        // Generate alerts based on conditions
        const newAlerts = [];
        if (newResume.analysis.overallScore < 75) {
          newAlerts.push('Low overall score');
        }
        if (newResume.analysis.skillsMatch < 70) {
          newAlerts.push('Skills mismatch');
        }
        if (newResume.details.experience.includes('1') || newResume.details.experience.includes('2')) {
          newAlerts.push('Limited experience');
        }

        newResume.alerts = newAlerts;
        newResume.status = newAlerts.length > 2 ? 'critical' : 
                          newAlerts.length > 0 ? 'warning' : 'analyzed';
        
        return newResume;
      }));

      setSystemStats(prev => ({
        ...prev,
        analyzedToday: prev.analyzedToday + Math.floor(Math.random() * 2),
        averageScore: Math.max(70, Math.min(95, prev.averageScore + (Math.random() - 0.5) * 1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Generate analysis results for selected resume
  useEffect(() => {
    if (selectedResume) {
      const newAnalysis = {
        candidate: selectedResume.candidate,
        position: selectedResume.position,
        timestamp: new Date().toLocaleTimeString(),
        summary: {
          overallScore: selectedResume.analysis.overallScore,
          skillsMatch: selectedResume.analysis.skillsMatch,
          experienceRelevance: selectedResume.analysis.experienceRelevance,
          educationFit: selectedResume.analysis.educationFit
        },
        detailedAnalysis: {
          strengths: [
            'Strong technical background',
            'Relevant certifications',
            'Good educational foundation',
            'Industry experience'
          ],
          weaknesses: [
            'Could use more specific project examples',
            'Limited leadership experience',
            'Missing some key technologies'
          ],
          recommendations: selectedResume.analysis.recommendations
        },
        skillsAnalysis: {
          technical: selectedResume.details.skills,
          languages: selectedResume.details.languages,
          certifications: selectedResume.details.certifications,
          missing: ['Kubernetes', 'Microservices', 'CI/CD']
        }
      };
      setAnalysisResults(newAnalysis);
    }
  }, [selectedResume]);

  // Generate system alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const allAlerts = resumes.flatMap(resume => 
        resume.alerts.map(alert => ({
          id: Date.now() + Math.random(),
          candidate: resume.candidate,
          message: alert,
          severity: alert.includes('Critical') ? 'high' : 'medium',
          timestamp: new Date().toLocaleTimeString()
        }))
      );
      setAlerts(allAlerts.slice(0, 5));
    }, 7000);

    return () => clearInterval(interval);
  }, [resumes]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'analyzed': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'analyzed': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-yellow-600';
    if (score >= 70) return 'bg-orange-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">📄 AI Resume Analyzer</h1>
          <p className="text-gray-300 text-lg">
            Intelligent resume analysis with AI-powered insights, skill matching, and candidate evaluation
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Resumes</h3>
            <p className="text-3xl font-bold text-green-400">{systemStats.totalResumes}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Analyzed Today</h3>
            <p className="text-3xl font-bold text-blue-400">{systemStats.analyzedToday}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Score</h3>
            <p className="text-3xl font-bold text-purple-400">{systemStats.averageScore.toFixed(1)}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Match Rate</h3>
            <p className="text-3xl font-bold text-yellow-400">{systemStats.matchRate}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">Resume Analysis</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all ' + (
                      selectedResume?.id === resume.id
                        ? 'border-green-400 bg-green-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedResume(resume)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{resume.candidate}</h3>
                        <p className="text-gray-400 text-sm">{resume.position} • {resume.lastUpdate}</p>
                        <p className={'text-sm ' + getStatusColor(resume.status)}>
                          {resume.status}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getScoreBg(resume.score)}>
                          {resume.score}%
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{resume.alerts.length} alerts</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Experience</p>
                        <p className="text-white font-semibold">{resume.details.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Education</p>
                        <p className="text-white">{resume.details.education}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Skills Match</span>
                        <span>{resume.analysis.skillsMatch}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            resume.analysis.skillsMatch > 90 ? 'bg-green-500' : 
                            resume.analysis.skillsMatch > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: resume.analysis.skillsMatch + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Analysis Results & Alerts */}
          <div className="space-y-6">
            {/* Analysis Results */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Analysis Results</h2>
              {selectedResume ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold">{selectedResume.candidate}</h3>
                    <p className="text-blue-200 text-sm">{selectedResume.position}</p>
                    <p className={'text-lg font-bold ' + getScoreColor(selectedResume.score)}>
                      Overall Score: {selectedResume.score}/100
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Skills Match</span>
                        <span className="text-white">{selectedResume.analysis.skillsMatch}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            selectedResume.analysis.skillsMatch > 90 ? 'bg-green-500' : 
                            selectedResume.analysis.skillsMatch > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: selectedResume.analysis.skillsMatch + '%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Experience Relevance</span>
                        <span className="text-white">{selectedResume.analysis.experienceRelevance}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full ' + (
                            selectedResume.analysis.experienceRelevance > 90 ? 'bg-green-500' : 
                            selectedResume.analysis.experienceRelevance > 80 ? 'bg-yellow-500' : 'bg-red-500'
                          )}
                          style={{ width: selectedResume.analysis.experienceRelevance + '%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Education Fit</span>
                        <span className="text-white">{selectedResume.analysis.educationFit}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                                                  className={'h-2 rounded-full ' + (
                          selectedResume.analysis.educationFit > 90 ? 'bg-green-500' : 
                          selectedResume.analysis.educationFit > 80 ? 'bg-yellow-500' : 'bg-red-500'
                        )}
                                                      style={{ width: selectedResume.analysis.educationFit + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-300">Select a resume to view analysis</p>
                </div>
              )}
            </div>

            {/* System Alerts */}
            <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
              <h2 className="text-2xl font-bold text-white mb-4">🚨 Analysis Alerts</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {alerts.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <p className="text-gray-300">No active alerts</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-red-800/50 p-3 rounded-lg border border-red-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{alert.candidate}</p>
                          <p className="text-red-200 text-sm">{alert.message}</p>
                          <p className="text-gray-300 text-xs">{alert.timestamp}</p>
                        </div>
                        <div className={'px-2 py-1 rounded text-xs ' + (
                          alert.severity === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'
                        )}>
                          {alert.severity.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Analyzer Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Upload Resume
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Generate Report
                </button>
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Compare Candidates
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        {analysisResults && (
          <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Detailed Analysis: {analysisResults.candidate}</h2>
              <button
                onClick={() => setAnalysisResults(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Overall Score</span>
                    <span className={'text-lg font-semibold ' + getScoreColor(analysisResults.summary.overallScore)}>
                      {analysisResults.summary.overallScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Skills Match</span>
                    <span className="text-lg font-semibold text-white">{analysisResults.summary.skillsMatch}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Experience Relevance</span>
                    <span className="text-lg font-semibold text-white">{analysisResults.summary.experienceRelevance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Education Fit</span>
                    <span className="text-lg font-semibold text-white">{analysisResults.summary.educationFit}%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Skills Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Technical Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.skillsAnalysis.technical.map((skill, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Programming Languages:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.skillsAnalysis.languages.map((lang, index) => (
                        <span key={index} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Strengths & Weaknesses */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Strengths</h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <ul className="space-y-2">
                    {analysisResults.detailedAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-3">⚠️ Areas for Improvement</h3>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <ul className="space-y-2">
                    {analysisResults.detailedAnalysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-red-400 mr-2">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">💡 Recommendations</h3>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                <ul className="space-y-2">
                  {analysisResults.detailedAnalysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* AI Features */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced Resume Analysis Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">AI-Powered Analysis</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Natural language processing</li>
                <li>• Skill extraction & matching</li>
                <li>• Experience relevance scoring</li>
                <li>• Education fit analysis</li>
                <li>• Sentiment analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Intelligent Insights</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Automated scoring</li>
                <li>• Comparative analysis</li>
                <li>• Trend identification</li>
                <li>• Predictive modeling</li>
                <li>• Bias detection</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Reporting & Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Detailed reports</li>
                <li>• Performance metrics</li>
                <li>• Candidate ranking</li>
                <li>• Hiring insights</li>
                <li>• ROI analysis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerDemo; 