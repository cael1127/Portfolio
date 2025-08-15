import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const ResumeAnalyzerDemo = () => {
  const [resumes, setResumes] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [analyzerStats, setAnalyzerStats] = useState({
    totalResumes: 0,
    activeCandidates: 0,
    averageScore: 0,
    matchRate: 0,
    processingTime: 0,
    aiAccuracy: 0,
    dailyApplications: 0,
    monthlyHires: 0
  });

  // Sample code for the demo
  const demoCode = `/**
 * AI Resume Analyzer Implementation
 * Created by Cael Findley
 * 
 * This implementation demonstrates intelligent resume analysis with
 * skill matching, candidate scoring, and AI-powered insights.
 */

import React, { useState, useEffect } from 'react';

const ResumeAnalyzerDemo = () => {
  const [resumes, setResumes] = useState([]);
  const [jobPostings, setJobPostings] = useState([]);
  const [candidates, setCandidates] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setResumes(prev => prev.map(resume => ({
        ...resume,
        score: resume.score + (Math.random() - 0.5) * 2,
        lastUpdate: 'Just now'
      })));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const analyzeResume = (resumeId) => {
    const resume = resumes.find(r => r.id === resumeId);
    console.log('Analyzing resume:', resume.name);
    // AI analysis logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume List */}
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{resume.name}</h3>
              <p className="text-gray-300 text-sm">{resume.position}</p>
              <p className="text-gray-400 text-xs">Score: {resume.score.toFixed(1)}%</p>
            </div>
          ))}
        </div>
        
        {/* Job Postings */}
        <div className="space-y-4">
          {jobPostings.map((job) => (
            <div key={job.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-300 text-sm">{job.company}</p>
              <p className="text-gray-400 text-xs">{job.applications} applications</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzerDemo;`;

  useEffect(() => {
    // Initialize resume analyzer data
    const initialResumes = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'findleytechs@gmail.com',
        position: 'Senior Software Engineer',
        score: 87.5,
        status: 'shortlisted',
        lastUpdate: 'Just now',
        experience: 8,
        skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
        education: 'MS Computer Science',
        location: 'San Francisco, CA',
        salary: 140000,
        matchRate: 92,
        aiInsights: {
          technicalSkills: 9.2,
          communication: 8.5,
          leadership: 7.8,
          cultureFit: 8.9,
          growthPotential: 8.7
        },
        analysis: {
          keywords: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
          missingSkills: ['Kubernetes', 'GraphQL'],
          strengths: ['Strong technical background', 'Good communication skills'],
          recommendations: ['Consider for senior role', 'Good culture fit']
        }
      },
      {
        id: 2,
        name: 'Michael Chen',
        email: 'findleytechs@gmail.com',
        position: 'Data Scientist',
        score: 91.2,
        status: 'interviewing',
        lastUpdate: '2 minutes ago',
        experience: 5,
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas'],
        education: 'PhD Statistics',
        location: 'New York, NY',
        salary: 120000,
        matchRate: 95,
        aiInsights: {
          technicalSkills: 9.5,
          communication: 8.2,
          leadership: 6.5,
          cultureFit: 8.1,
          growthPotential: 9.1
        },
        analysis: {
          keywords: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
          missingSkills: ['Deep Learning', 'Spark'],
          strengths: ['Excellent analytical skills', 'Strong ML background'],
          recommendations: ['Perfect for data role', 'High potential candidate']
        }
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        email: 'findleytechs@gmail.com',
        position: 'Product Manager',
        score: 78.9,
        status: 'reviewing',
        lastUpdate: '5 minutes ago',
        experience: 6,
        skills: ['Product Strategy', 'User Research', 'Agile', 'SQL', 'Figma'],
        education: 'MBA Business Administration',
        location: 'Austin, TX',
        salary: 110000,
        matchRate: 78,
        aiInsights: {
          technicalSkills: 6.8,
          communication: 9.1,
          leadership: 8.7,
          cultureFit: 8.3,
          growthPotential: 8.5
        },
        analysis: {
          keywords: ['Product Management', 'User Research', 'Strategy', 'Agile'],
          missingSkills: ['Technical Background', 'Data Analysis'],
          strengths: ['Strong leadership skills', 'Good communication'],
          recommendations: ['Consider for PM role', 'Needs technical training']
        }
      },
      {
        id: 4,
        name: 'David Kim',
        email: 'findleytechs@gmail.com',
        position: 'DevOps Engineer',
        score: 84.3,
        status: 'shortlisted',
        lastUpdate: '8 minutes ago',
        experience: 7,
        skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Linux'],
        education: 'BS Computer Engineering',
        location: 'Seattle, WA',
        salary: 130000,
        matchRate: 88,
        aiInsights: {
          technicalSkills: 9.0,
          communication: 7.5,
          leadership: 7.2,
          cultureFit: 8.0,
          growthPotential: 8.3
        },
        analysis: {
          keywords: ['DevOps', 'Cloud Infrastructure', 'Automation', 'Linux'],
          missingSkills: ['Terraform', 'Prometheus'],
          strengths: ['Strong infrastructure skills', 'Good automation experience'],
          recommendations: ['Good technical fit', 'Consider for DevOps role']
        }
      },
      {
        id: 5,
        name: 'Lisa Wang',
        email: 'findleytechs@gmail.com',
        position: 'UX Designer',
        score: 89.7,
        status: 'interviewing',
        lastUpdate: '12 minutes ago',
        experience: 4,
        skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Adobe Creative Suite'],
        education: 'BS Design',
        location: 'Los Angeles, CA',
        salary: 95000,
        matchRate: 91,
        aiInsights: {
          technicalSkills: 8.8,
          communication: 9.3,
          leadership: 6.8,
          cultureFit: 9.1,
          growthPotential: 8.9
        },
        analysis: {
          keywords: ['UX Design', 'User Research', 'Prototyping', 'Design Systems'],
          missingSkills: ['Coding Skills', 'Analytics'],
          strengths: ['Excellent design skills', 'Strong user empathy'],
          recommendations: ['Perfect for UX role', 'High culture fit']
        }
      }
    ];

    const initialJobPostings = [
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        applications: 45,
        status: 'active',
        requirements: ['React', 'Node.js', 'Python', 'AWS'],
        experience: '5+ years',
        salary: '120k-160k',
        posted: '2024-01-15',
        deadline: '2024-02-15',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Data Scientist',
        company: 'DataFlow Analytics',
        location: 'New York, NY',
        applications: 32,
        status: 'active',
        requirements: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        experience: '3+ years',
        salary: '100k-140k',
        posted: '2024-01-10',
        deadline: '2024-02-10',
        priority: 'high'
      },
      {
        id: 3,
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'Austin, TX',
        applications: 28,
        status: 'active',
        requirements: ['Product Strategy', 'User Research', 'Agile'],
        experience: '4+ years',
        salary: '110k-150k',
        posted: '2024-01-12',
        deadline: '2024-02-12',
        priority: 'medium'
      },
      {
        id: 4,
        title: 'DevOps Engineer',
        company: 'CloudScale Systems',
        location: 'Seattle, WA',
        applications: 19,
        status: 'active',
        requirements: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
        experience: '3+ years',
        salary: '120k-160k',
        posted: '2024-01-08',
        deadline: '2024-02-08',
        priority: 'medium'
      },
      {
        id: 5,
        title: 'UX Designer',
        company: 'DesignHub',
        location: 'Los Angeles, CA',
        applications: 36,
        status: 'active',
        requirements: ['Figma', 'User Research', 'Prototyping'],
        experience: '2+ years',
        salary: '80k-120k',
        posted: '2024-01-18',
        deadline: '2024-02-18',
        priority: 'low'
      }
    ];

    const initialCandidates = [
      {
        id: 1,
        name: 'Sarah Johnson',
        status: 'shortlisted',
        position: 'Senior Software Engineer',
        lastActivity: 'Just now',
        interviewStage: 'Technical Round',
        nextInterview: '2024-01-25',
        recruiter: 'John Smith',
        notes: 'Strong technical background, good communication skills'
      },
      {
        id: 2,
        name: 'Michael Chen',
        status: 'interviewing',
        position: 'Data Scientist',
        lastActivity: '2 minutes ago',
        interviewStage: 'Final Round',
        nextInterview: '2024-01-23',
        recruiter: 'Lisa Brown',
        notes: 'Excellent analytical skills, perfect for data role'
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        status: 'reviewing',
        position: 'Product Manager',
        lastActivity: '5 minutes ago',
        interviewStage: 'Initial Screening',
        nextInterview: '2024-01-26',
        recruiter: 'Mike Johnson',
        notes: 'Good leadership skills, needs technical training'
      },
      {
        id: 4,
        name: 'David Kim',
        status: 'shortlisted',
        position: 'DevOps Engineer',
        lastActivity: '8 minutes ago',
        interviewStage: 'Technical Round',
        nextInterview: '2024-01-24',
        recruiter: 'Sarah Wilson',
        notes: 'Strong infrastructure skills, good technical fit'
      },
      {
        id: 5,
        name: 'Lisa Wang',
        status: 'interviewing',
        position: 'UX Designer',
        lastActivity: '12 minutes ago',
        interviewStage: 'Portfolio Review',
        nextInterview: '2024-01-22',
        recruiter: 'Tom Davis',
        notes: 'Excellent design skills, high culture fit'
      }
    ];

    setResumes(initialResumes);
    setJobPostings(initialJobPostings);
    setCandidates(initialCandidates);
  }, []);

  useEffect(() => {
    // Simulate real-time resume analyzer updates
    const interval = setInterval(() => {
      // Update resume scores
      setResumes(prev => prev.map(resume => ({
        ...resume,
        score: Math.max(0, Math.min(100, resume.score + (Math.random() - 0.5) * 2)),
        lastUpdate: 'Just now'
      })));

      // Update analyzer stats
      setAnalyzerStats(prev => ({
        totalResumes: resumes.length,
        activeCandidates: candidates.filter(c => c.status !== 'rejected').length,
        averageScore: resumes.reduce((sum, r) => sum + r.score, 0) / resumes.length,
        matchRate: resumes.reduce((sum, r) => sum + r.matchRate, 0) / resumes.length,
        processingTime: Math.max(10, Math.min(60, prev.processingTime + (Math.random() - 0.5) * 5)),
        aiAccuracy: Math.max(85, Math.min(98, prev.aiAccuracy + (Math.random() - 0.5) * 2)),
        dailyApplications: Math.floor(Math.random() * 20) + 50,
        monthlyHires: Math.floor(Math.random() * 10) + 15
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, [resumes, candidates]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'shortlisted': return 'text-green-400';
      case 'interviewing': return 'text-blue-400';
      case 'reviewing': return 'text-yellow-400';
      case 'rejected': return 'text-red-400';
      case 'hired': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'shortlisted': return 'bg-green-600';
      case 'interviewing': return 'bg-blue-600';
      case 'reviewing': return 'bg-yellow-600';
      case 'rejected': return 'bg-red-600';
      case 'hired': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-green-600';
    if (score >= 80) return 'bg-blue-600';
    if (score >= 70) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">📄 AI Resume Analyzer</h1>
            <p className="text-gray-300 text-lg">
              Advanced resume analysis platform with AI-powered insights, candidate evaluation, and hiring analytics
            </p>
          </div>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>📄</span>
            <span>View Code</span>
          </button>
        </div>

        {/* Analyzer Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 p-6 rounded-xl border border-cyan-800">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="text-xl font-semibold text-white mb-2">Total Resumes</h3>
            <p className="text-3xl font-bold text-cyan-400">{analyzerStats.totalResumes}</p>
            <p className="text-cyan-300 text-sm">{analyzerStats.dailyApplications} today</p>
          </div>
          <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-xl font-semibold text-white mb-2">Active Candidates</h3>
            <p className="text-3xl font-bold text-green-400">{analyzerStats.activeCandidates}</p>
            <p className="text-green-300 text-sm">{analyzerStats.monthlyHires} hired this month</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Score</h3>
            <p className="text-3xl font-bold text-blue-400">{analyzerStats.averageScore.toFixed(1)}%</p>
            <p className="text-blue-300 text-sm">{analyzerStats.matchRate.toFixed(1)}% match rate</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Accuracy</h3>
            <p className="text-3xl font-bold text-purple-400">{analyzerStats.aiAccuracy.toFixed(1)}%</p>
            <p className="text-purple-300 text-sm">{analyzerStats.processingTime.toFixed(1)}s avg processing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 p-6 rounded-xl border border-cyan-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">📄 Resume Analysis</h2>
                <div className="text-sm text-cyan-300">Real-time updates every 6s</div>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={'p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ' + (
                      selectedResume?.id === resume.id
                        ? 'border-cyan-400 bg-cyan-900/30'
                        : 'border-gray-600 hover:border-gray-500'
                    )}
                    onClick={() => setSelectedResume(resume)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{resume.name}</h3>
                        <p className="text-cyan-200 text-sm">{resume.position} • {resume.location}</p>
                        <p className="text-cyan-200 text-xs">{resume.experience} years exp • {resume.education}</p>
                        <p className="text-gray-300 text-xs">{resume.email} • {resume.lastUpdate}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + getStatusBg(resume.status)}>
                          {resume.status.toUpperCase()}
                        </div>
                        <p className={'text-lg font-semibold mt-1 ' + getScoreColor(resume.score)}>
                          {resume.score.toFixed(1)}%
                        </p>
                        <p className="text-gray-300 text-xs">{resume.matchRate}% match</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Skills</p>
                        <p className="text-white font-semibold">{resume.skills.length}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Salary</p>
                        <p className="text-white font-semibold">{formatCurrency(resume.salary)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">AI Score</p>
                        <p className="text-white font-semibold">{(resume.aiInsights.technicalSkills + resume.aiInsights.communication) / 2}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Match Score</span>
                        <span>{resume.matchRate}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className={'h-2 rounded-full transition-all ' + getScoreBg(resume.score)}
                          style={{ width: resume.score + '%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hiring Analytics */}
          <div className="space-y-6">
            {/* Job Postings */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-4">💼 Job Postings</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {jobPostings.map((job) => (
                  <div key={job.id} className="bg-green-800/50 p-3 rounded-lg border border-green-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{job.title}</p>
                        <p className="text-green-200 text-sm">{job.company}</p>
                        <p className="text-green-200 text-xs">{job.location}</p>
                        <p className="text-gray-300 text-xs">{job.experience} • {job.salary}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getPriorityBg(job.priority)}>
                          {job.priority.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{job.applications} apps</p>
                        <p className="text-gray-300 text-xs">{job.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Pipeline */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">👥 Candidate Pipeline</h2>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{candidate.name}</p>
                        <p className="text-blue-200 text-sm">{candidate.position}</p>
                        <p className="text-blue-200 text-xs">{candidate.interviewStage}</p>
                        <p className="text-gray-300 text-xs">{candidate.recruiter}</p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getStatusBg(candidate.status)}>
                          {candidate.status.toUpperCase()}
                        </div>
                        <p className="text-white text-xs mt-1">{candidate.nextInterview}</p>
                        <p className="text-gray-300 text-xs">{candidate.lastActivity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">🤖 AI Insights</h2>
              <div className="space-y-3">
                <div className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Technical Skills</p>
                      <p className="text-purple-200 text-sm">Average across candidates</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">8.7/10</p>
                      <p className="text-purple-300 text-xs">Strong</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Culture Fit</p>
                      <p className="text-purple-200 text-sm">Team compatibility</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">8.4/10</p>
                      <p className="text-purple-300 text-xs">Good</p>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-800/50 p-3 rounded-lg border border-purple-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-semibold">Growth Potential</p>
                      <p className="text-purple-200 text-sm">Career advancement</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">8.2/10</p>
                      <p className="text-purple-300 text-xs">High</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Details Modal */}
        {selectedResume && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
            <div className="bg-gray-900 rounded-xl border border-gray-700 max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Resume Details</h2>
                <button
                  onClick={() => setSelectedResume(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Candidate Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white font-semibold">{selectedResume.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Position:</span>
                      <span className="text-white font-semibold">{selectedResume.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience:</span>
                      <span className="text-white font-semibold">{selectedResume.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Education:</span>
                      <span className="text-white font-semibold">{selectedResume.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white font-semibold">{selectedResume.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Salary:</span>
                      <span className="text-white font-semibold">{formatCurrency(selectedResume.salary)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">AI Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Technical Skills:</span>
                      <span className="text-white font-semibold">{selectedResume.aiInsights.technicalSkills}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Communication:</span>
                      <span className="text-white font-semibold">{selectedResume.aiInsights.communication}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Leadership:</span>
                      <span className="text-white font-semibold">{selectedResume.aiInsights.leadership}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Culture Fit:</span>
                      <span className="text-white font-semibold">{selectedResume.aiInsights.cultureFit}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Growth Potential:</span>
                      <span className="text-white font-semibold">{selectedResume.aiInsights.growthPotential}/10</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-blue-400 mb-3 mt-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3 mt-4">Keywords Found</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedResume.analysis.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Strengths</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedResume.analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-300">• {strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-3">Missing Skills</h3>
                  <ul className="space-y-1 text-sm">
                    {selectedResume.analysis.missingSkills.map((skill, index) => (
                      <li key={index} className="text-gray-300">• {skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Recommendations</h3>
                <ul className="space-y-1 text-sm">
                  {selectedResume.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-300">• {rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Resume Analyzer Features */}
        <div className="mt-8 bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700 p-6 rounded-xl border border-cyan-800">
          <h2 className="text-2xl font-bold text-white mb-4">Advanced Resume Analyzer Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">AI Analysis</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Skills extraction & matching</li>
                <li>• Experience evaluation</li>
                <li>• Culture fit assessment</li>
                <li>• Growth potential analysis</li>
                <li>• Keyword optimization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Candidate Pipeline</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Automated screening</li>
                <li>• Interview scheduling</li>
                <li>• Status tracking</li>
                <li>• Performance analytics</li>
                <li>• Hiring insights</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">Recruitment Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Time-to-hire metrics</li>
                <li>• Source effectiveness</li>
                <li>• Cost-per-hire analysis</li>
                <li>• Quality of hire tracking</li>
                <li>• Predictive hiring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <CodeViewer
        code={demoCode}
        language="jsx"
        title="Resume Analyzer Demo Code"
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
      />
    </div>
  );
};

export default ResumeAnalyzerDemo; 