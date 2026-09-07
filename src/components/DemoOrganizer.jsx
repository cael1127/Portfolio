import React, { useState, useMemo, useEffect, useRef } from 'react';
import AnimatedCard from './AnimatedCard';
import FloatingParticles from './FloatingParticles';
import GlassCard from './reactbits/GlassCard';
import EnhancedCard from './reactbits/EnhancedCard';
import BounceCard from './reactbits/BounceCard';
import SpotlightCard from './reactbits/SpotlightCard';
import ScrollReveal from './reactbits/ScrollReveal';
import GlareHover from './reactbits/GlareHover';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon, categoryIcons } from '../utils/iconMapping';

const DemoOrganizer = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'compact'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'name', 'difficulty', 'newest'
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const categoryMenuRef = useRef(null);

  // Close category menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target)) {
        setCategoryMenuOpen(false);
      }
    };

    if (categoryMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoryMenuOpen]);

  // Curated set of demos/projects for maximum impressiveness.
  // Keep this list tight: every item should be something you'd happily discuss in an interview.
  const demoCategories = {
    'ai-ml': {
      name: 'AI & Machine Learning',
      description: 'Artificial intelligence and machine learning applications',
      iconKey: 'ai-ml',
      demos: [
        {
          id: 'fraud-detection',
          name: 'Fraud Detection System',
          description: 'AI-powered financial fraud detection with real-time analysis',
          iconKey: 'fraud-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'Scikit-learn'],
          features: ['Real-time analysis', 'Pattern recognition', 'Risk scoring']
        },
        {
          id: 'deepfake-detection',
          name: 'Deepfake Detection',
          description: 'Advanced deepfake detection using computer vision',
          iconKey: 'deepfake-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'OpenCV', 'TensorFlow'],
          features: ['Face analysis', 'Video processing', 'Confidence scoring'],
          hasProjectPage: true
        },
        {
          id: 'snake-ai',
          name: 'Snake AI with Reinforcement Learning',
          description: 'AI learns to play Snake using neural networks and genetic algorithms',
          iconKey: 'snake-ai',
          difficulty: 'Advanced',
          technologies: ['Python', 'Neural Networks', 'Genetic Algorithms'],
          features: ['Reinforcement Learning', 'Real-time training', 'Performance metrics'],
          hasProjectPage: true
        },
        {
          id: 'ai-agents',
          name: 'AI Agents in Pure Python',
          description: 'Multi-agent system with different AI behaviors and coordination',
          iconKey: 'ai-agents',
          difficulty: 'Advanced',
          technologies: ['Python', 'Multi-Agent Systems', 'Behavior Trees'],
          features: ['Agent coordination', 'Behavior patterns', 'Environment simulation'],
          hasProjectPage: true
        },
        {
          id: 'sentiment-analysis',
          name: 'Sentiment Analysis with Transformers',
          description: 'Advanced sentiment analysis using VADER, Transformers, and NLTK',
          iconKey: 'sentiment-analysis',
          difficulty: 'Intermediate',
          technologies: ['Python', 'Transformers', 'NLTK', 'VADER'],
          features: ['Text analysis', 'Sentiment scoring', 'Detailed breakdowns'],
          hasProjectPage: true
        },
        {
          id: 'object-detection',
          name: 'Real-time Object Detection',
          description: 'Live webcam detection with bounding boxes and confidence',
          iconKey: 'object-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'TensorFlow', 'OpenCV'],
          features: ['Live detection', 'Bounding boxes', 'Confidence heatmap'],
          hasProjectPage: true
        },
        {
          id: 'audio-transcription',
          name: 'Audio Transcription',
          description: 'Accurate audio-to-text with timestamps and speaker segments',
          iconKey: 'audio-transcription',
          difficulty: 'Intermediate',
          technologies: ['Python', 'ASR', 'WebAudio'],
          features: ['Upload audio', 'Timestamps', 'Export SRT'],
          hasProjectPage: true
        }
      ]
    },
    'devops': {
      name: 'DevOps & Infrastructure',
      description: 'CI/CD, containerization, orchestration, and infrastructure as code',
      iconKey: 'devops',
      demos: [
        {
          id: 'cicd-pipeline',
          name: 'CI/CD Pipeline with GitHub Actions',
          description: 'Automated testing, deployment, and monitoring',
          iconKey: 'cicd-pipeline',
          difficulty: 'Intermediate',
          technologies: ['GitHub Actions', 'YAML', 'Docker', 'Node.js'],
          features: ['Automated build', 'Testing', 'Deployment', 'Monitoring'],
          hasProjectPage: true
        },
        {
          id: 'docker-platform',
          name: 'Docker Containerization Platform',
          description: 'Multi-stage builds, orchestration, and production deployment',
          iconKey: 'docker-platform',
          difficulty: 'Intermediate',
          technologies: ['Docker', 'Docker Compose', 'Multi-stage Builds', 'Health Checks'],
          features: ['Containerization', 'Orchestration', 'Health checks', 'Volume management'],
          hasProjectPage: true
        },
        {
          id: 'kubernetes-management',
          name: 'Kubernetes Cluster Management',
          description: 'Deployment, service mesh, auto-scaling, and monitoring',
          iconKey: 'kubernetes-management',
          difficulty: 'Advanced',
          technologies: ['Kubernetes', 'Kubectl', 'Helm', 'Prometheus'],
          features: ['Deployment management', 'Auto-scaling', 'Service discovery', 'Monitoring'],
          hasProjectPage: true
        },
        {
          id: 'terraform-iac',
          name: 'Infrastructure as Code (Terraform)',
          description: 'AWS/GCP infrastructure provisioning, state management, and modules',
          iconKey: 'terraform-iac',
          difficulty: 'Advanced',
          technologies: ['Terraform', 'AWS', 'GCP', 'HCL'],
          features: ['Infrastructure as code', 'State management', 'Modules', 'Multi-cloud'],
          hasProjectPage: true
        }
      ]
    },
    'security': {
      name: 'Security & Cybersecurity',
      description: 'Vulnerability assessment, penetration testing, encryption, and monitoring',
      iconKey: 'security',
      demos: [
        {
          id: 'vulnerability-scanner',
          name: 'Vulnerability Scanner',
          description: 'Automated scanning, risk assessment, reporting, and remediation guides',
          iconKey: 'vulnerability-scanner',
          difficulty: 'Advanced',
          technologies: ['Python', 'Nmap', 'CVE Database', 'OWASP'],
          features: ['Automated scanning', 'SQL injection detection', 'XSS detection', 'Security headers'],
          hasProjectPage: true
        },
        {
          id: 'penetration-testing',
          name: 'Penetration Testing Framework',
          description: 'Reconnaissance, exploitation, post-exploitation, and reporting',
          iconKey: 'penetration-testing',
          difficulty: 'Advanced',
          technologies: ['Python', 'Nmap', 'SQLMap', 'Metasploit'],
          features: ['Reconnaissance', 'Vulnerability assessment', 'Exploitation', 'Reporting'],
          hasProjectPage: true
        },
        {
          id: 'encryption-system',
          name: 'Encryption & Key Management System',
          description: 'AES/RSA encryption, key rotation, secure storage, and API integration',
          iconKey: 'encryption-system',
          difficulty: 'Advanced',
          technologies: ['Python', 'Cryptography', 'AES', 'RSA'],
          features: ['Symmetric encryption', 'Asymmetric encryption', 'Key rotation', 'Secure storage'],
          hasProjectPage: true
        },
        {
          id: 'security-monitoring',
          name: 'Security Monitoring Dashboard',
          description: 'Real-time threat detection, log analysis, alerting, and incident response',
          iconKey: 'security-monitoring',
          difficulty: 'Advanced',
          technologies: ['Python', 'ELK Stack', 'Splunk', 'SIEM'],
          features: ['Threat detection', 'Log analysis', 'Alerting', 'Incident response'],
          hasProjectPage: true
        },
        {
          id: 'waf',
          name: 'Web Application Firewall (WAF)',
          description: 'Request filtering, rate limiting, SQL injection protection, and XSS blocking',
          iconKey: 'waf',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Express', 'React', 'Rule Engine'],
          features: ['Request filtering', 'Rate limiting', 'SQL injection protection', 'XSS blocking', 'IP whitelisting'],
          hasProjectPage: true
        },
        {
          id: 'siem',
          name: 'SIEM/Log Analysis System',
          description: 'Real-time log ingestion, threat detection, alerting, and dashboard visualization',
          iconKey: 'siem',
          difficulty: 'Advanced',
          technologies: ['Python', 'ELK Stack', 'React', 'WebSocket'],
          features: ['Real-time log ingestion', 'Threat detection', 'Alerting', 'Dashboard visualization', 'Log correlation'],
          hasProjectPage: true
        },
        {
          id: 'api-security-gateway',
          name: 'API Security Gateway',
          description: 'API authentication, authorization, rate limiting, and request validation',
          iconKey: 'api-security-gateway',
          difficulty: 'Advanced',
          technologies: ['Node.js', 'Express', 'JWT', 'OAuth2', 'Rate Limiting'],
          features: ['API authentication', 'Authorization', 'Rate limiting', 'Request validation', 'API key management'],
          hasProjectPage: true
        },
        {
          id: 'phishing-detection',
          name: 'Phishing Detection System',
          description: 'Email analysis, URL scanning, domain reputation checking, and ML-based classification',
          iconKey: 'phishing-detection',
          difficulty: 'Advanced',
          technologies: ['Python', 'Machine Learning', 'NLP', 'React'],
          features: ['Email analysis', 'URL scanning', 'Domain reputation', 'ML-based classification', 'Threat scoring'],
          hasProjectPage: true
        },
        {
          id: 'owasp-scanner',
          name: 'OWASP Top 10 Security Scanner',
          description: 'Automated vulnerability scanning with OWASP Top 10 coverage and detailed reporting',
          iconKey: 'owasp-scanner',
          difficulty: 'Advanced',
          technologies: ['Python', 'OWASP ZAP', 'React'],
          features: ['Automated vulnerability scanning', 'OWASP Top 10 coverage', 'Detailed reporting', 'Remediation recommendations'],
          hasProjectPage: true
        },
        {
          id: 'network-traffic-analyzer',
          name: 'Network Traffic Analyzer',
          description: 'Packet capture, protocol analysis, anomaly detection, and traffic visualization',
          iconKey: 'network-traffic-analyzer',
          difficulty: 'Advanced',
          technologies: ['Python', 'Scapy', 'React', 'WebSocket'],
          features: ['Packet capture', 'Protocol analysis', 'Anomaly detection', 'Traffic visualization', 'Real-time monitoring'],
          hasProjectPage: true
        },
        {
          id: 'ids',
          name: 'Network Intrusion Detection System (IDS)',
          description: 'Signature-based detection, anomaly detection, and alert generation',
          iconKey: 'ids',
          difficulty: 'Advanced',
          technologies: ['Python', 'Snort', 'Network Analysis'],
          features: ['Signature-based detection', 'Anomaly detection', 'Alert generation', 'Network monitoring'],
          hasProjectPage: true
        },
        {
          id: 'threat-intelligence',
          name: 'Threat Intelligence Platform',
          description: 'IOC collection, threat feed aggregation, and reputation checking',
          iconKey: 'threat-intelligence',
          difficulty: 'Advanced',
          technologies: ['Python', 'Threat Feeds', 'API Integration'],
          features: ['IOC collection', 'Threat feed aggregation', 'Reputation checking', 'Threat analysis'],
          hasProjectPage: true
        }
      ]
    },
  };

  const getDemoRouteId = (demo) => {
    if (demo.routeId) {
      return demo.routeId;
    }

    const isExternalWebsite = demo.id.includes('-project');
    return isExternalWebsite ? demo.id : `${demo.id}-demo`;
  };

  const allDemos = useMemo(() => {
    return Object.entries(demoCategories).flatMap(([categoryKey, category]) => 
      category.demos.map(demo => ({ ...demo, category: category.name, categoryKey }))
    );
  }, []);

  // Get all unique technologies for filtering
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    allDemos.forEach(demo => {
      demo.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [allDemos]);

  const filteredDemos = useMemo(() => {
    let filtered = allDemos.filter(demo => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || demo.categoryKey === selectedCategory;
      
      // Search filter
      const matchesSearch = searchTerm === '' || 
                           demo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demo.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'all' || demo.difficulty === selectedDifficulty;
      
      // Technology filter
      const matchesTechnologies = selectedTechnologies.length === 0 || 
                                  selectedTechnologies.some(tech => demo.technologies.includes(tech));
      
      return matchesCategory && matchesSearch && matchesDifficulty && matchesTechnologies;
    });

    // Sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0));
        break;
      case 'newest':
        // For now, just reverse the array (can be enhanced with actual dates)
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [allDemos, selectedCategory, searchTerm, selectedDifficulty, selectedTechnologies, sortBy]);


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-[var(--accent)]';
      case 'Intermediate': return 'text-[var(--accent)]';
      case 'Advanced': return 'text-[var(--accent)]';
      default: return 'text-[var(--muted)]';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-[var(--accent)]';
      case 'Intermediate': return 'bg-[var(--accent)]';
      case 'Advanced': return 'bg-[var(--accent)]';
      default: return 'bg-[var(--border-strong)]';
    }
  };

  // Helper function to render icon
  const renderIcon = (iconKey, type = 'demo', size = 24, className = '') => {
    if (!iconKey) return null;
    const IconComponent = getIcon(iconKey, type);
    if (!IconComponent) {
      console.warn('Icon not found for:', iconKey, type);
      return null;
    }
    return <IconComponent className={className} size={size} />;
  };

  const renderDemoCard = (demo, index, categoryKey = 'grid') => {
    const routeId = getDemoRouteId(demo);

    if (viewMode === 'list') {
      return (
        <motion.div
          key={`${demo.id}-${categoryKey}-${index}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          className="cursor-pointer"
        >
          <EnhancedCard
            tilt={false}
            magnetic={false}
            gradientBorder={true}
            glow={true}
            className="h-full"
            onClick={() => {
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <SpotlightCard
              className="p-3 sm:p-4 relative overflow-hidden group h-full"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <button
                className="absolute inset-0 w-full h-full bg-transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{ zIndex: 1 }}
              />
              <div className="flex items-center gap-2 sm:gap-4 relative" style={{ zIndex: 2 }}>
                <div className="flex-shrink-0 text-[var(--accent)]">{renderIcon(demo.iconKey || demo.id, 'demo', 20)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1">
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--text)] truncate">{demo.name}</h3>
                    <div className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${getDifficultyBg(demo.difficulty)}`}>
                      {demo.difficulty}
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-[11px] sm:text-sm mb-2 line-clamp-1">{demo.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {demo.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={`${demo.id}-tech-${idx}`}
                        className="bg-[var(--surface-2)] text-[var(--text)] px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {demo.technologies.length > 4 && (
                      <span className="text-[var(--muted)] text-[10px] sm:text-xs">+{demo.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
                <div className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all hidden sm:block">
                  →
                </div>
              </div>
            </SpotlightCard>
          </EnhancedCard>
        </motion.div>
      );
    }

    if (viewMode === 'compact') {
      return (
        <motion.div
          key={`${demo.id}-${categoryKey}-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
          className="cursor-pointer"
        >
          <EnhancedCard
            tilt={false}
            magnetic={false}
            gradientBorder={true}
            glow={false}
            className="h-full"
            onClick={() => {
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <SpotlightCard
              className="p-2 sm:p-4 relative overflow-hidden group h-full"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <button
                className="absolute inset-0 w-full h-full bg-transparent"
                onClick={(event) => {
                  event.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                style={{ zIndex: 1 }}
              />
              <div className="relative" style={{ zIndex: 2 }}>
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <div className="text-[var(--accent)]">{renderIcon(demo.iconKey || demo.id, 'demo', 16)}</div>
                  <h3 className="text-[11px] sm:text-sm font-semibold text-[var(--text)] truncate flex-1">{demo.name}</h3>
                </div>
                <div className={`inline-block px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium mb-1 sm:mb-2 ${getDifficultyBg(demo.difficulty)}`}>
                  {demo.difficulty}
                </div>
                <p className="text-[var(--muted)] text-[10px] sm:text-xs line-clamp-2 mb-1 sm:mb-2">{demo.description}</p>
                <div className="flex flex-wrap gap-1">
                  {demo.technologies.slice(0, 2).map((tech, idx) => (
                    <span
                      key={`${demo.id}-tech-${idx}`}
                      className="bg-[var(--surface-2)] text-[var(--text)] px-1 sm:px-1.5 py-0.5 rounded text-[9px] sm:text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {demo.technologies.length > 2 && (
                    <span className="text-[var(--muted)] text-[9px] sm:text-xs">+{demo.technologies.length - 2}</span>
                  )}
                </div>
              </div>
            </SpotlightCard>
          </EnhancedCard>
        </motion.div>
      );
    }

    // Default grid view
    return (
      <motion.div
        key={`${demo.id}-${categoryKey}-${index}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="cursor-pointer"
      >
        <EnhancedCard
          tilt={false}
          magnetic={false}
          gradientBorder={true}
          glow={true}
          className="h-full"
          onClick={() => {
            setCurrentPage(routeId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <SpotlightCard
            className="p-3 sm:p-6 relative overflow-hidden group h-full"
            spotlightColor="rgba(34, 197, 94, 0.3)"
          >
          <button
            className="absolute inset-0 w-full h-full bg-transparent"
            onClick={(event) => {
              event.stopPropagation();
              setCurrentPage(routeId);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            style={{ zIndex: 1 }}
          />

          <div className="flex items-start justify-between mb-2 sm:mb-4 relative" style={{ zIndex: 2 }}>
            <div className="flex items-center flex-1 min-w-0">
              <div className="mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110 text-[var(--accent)] flex-shrink-0">{renderIcon(demo.iconKey || demo.id, 'demo', 20)}</div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-lg font-semibold text-[var(--text)] transition-colors truncate">
                  {demo.name}
                </h3>
                <div className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium transition-all duration-300 ${getDifficultyBg(demo.difficulty)}`}>
                  {demo.difficulty}
                </div>
              </div>
            </div>
            <div className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0 hidden sm:block">
              →
            </div>
          </div>

          <p className="text-[var(--text)] text-[11px] sm:text-sm mb-2 sm:mb-4 transition-colors line-clamp-2">{demo.description}</p>

          <div className="mb-2 sm:mb-4">
            <h4 className="text-[10px] sm:text-sm font-semibold text-[var(--muted)] mb-1 sm:mb-2 transition-colors">Technologies</h4>
            <div className="flex flex-wrap gap-1">
              {demo.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={`${demo.id}-tech-${idx}`}
                  className="bg-[var(--border-strong)] text-[var(--text)] px-1 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs transition-all duration-300 hover:scale-105"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {tech}
                </span>
              ))}
              {demo.technologies.length > 3 && (
                <span className="text-[var(--muted)] text-[10px] sm:text-xs">+{demo.technologies.length - 3}</span>
              )}
            </div>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-[var(--muted)] mb-2 transition-colors">Key Features</h4>
            <ul className="space-y-1">
              {demo.features.slice(0, 3).map((feature, idx) => (
                <li
                  key={`${demo.id}-feature-${idx}`}
                  className="text-[var(--text)] text-xs flex items-center transition-all duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <span className="text-[var(--accent)] mr-1 transition-transform duration-300">•</span>
                  {feature}
                </li>
              ))}
              {demo.features.length > 3 && (
                <li className="text-[var(--muted)] text-xs transition-colors">+{demo.features.length - 3} more features</li>
              )}
            </ul>
          </div>

          {demo.hasProjectPage && (
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-[var(--border-strong)] transition-colors">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage(routeId);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="text-[var(--accent)] hover:text-[var(--accent)] text-[10px] sm:text-xs font-semibold transition-transform duration-300"
              >
                View Details →
              </button>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--surface-2)]">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </SpotlightCard>
        </EnhancedCard>
      </motion.div>
    );
  };

  const showCategorySections = selectedCategory === 'all' && searchTerm.trim() === '';

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 py-6 sm:p-6 relative overflow-x-hidden overflow-y-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingParticles />
      </div>
      <div className="max-w-7xl mx-auto relative z-10 pb-8">
        {/* Header */}
        <div className="mb-8 snap-section">
          <AnimatedCard delay={0} direction="down" className="mb-4">
            <h1 className="text-4xl font-bold text-[var(--accent)]">Demo Collection</h1>
          </AnimatedCard>
          <AnimatedCard delay={100} direction="down" className="mb-4">
            <p className="text-[var(--text)] text-lg">
              Explore our comprehensive collection of interactive demos organized by category
            </p>
          </AnimatedCard>
        </div>

        {/* Search and Filter */}
        <AnimatedCard delay={200} direction="up" className="mb-8 snap-section" hover={false}>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search demos by name, technology, or feature..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSearchSuggestions(e.target.value.length > 0);
                    if (e.target.value.length > 0) {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 500);
                    }
                  }}
                  onFocus={() => setShowSearchSuggestions(searchTerm.length > 0)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
                  className="w-full p-3 pl-10 rounded-lg bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[var(--accent)]/20"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setShowSearchSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                
                {/* Search Suggestions */}
                {showSearchSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--surface)] border border-[var(--border-strong)] rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                    {isLoading ? (
                      <div className="p-4 text-center text-[var(--muted)]">
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full"></div>
                        <span className="ml-2">Searching...</span>
                      </div>
                    ) : (
                      <>
                        {/* Quick Filters */}
                        <div className="p-3 border-b border-[var(--border-strong)]">
                          <div className="text-xs text-[var(--muted)] mb-2">Quick Filters:</div>
                          <div className="flex flex-wrap gap-2">
                            {['AI/ML', 'Blockchain', 'React', 'Python', 'Node.js'].map((filter) => (
                              <button
                                key={filter}
                                onClick={() => {
                                  setSearchTerm(filter);
                                  setShowSearchSuggestions(false);
                                }}
                                className="px-2 py-1 text-xs bg-[var(--surface-2)] hover:bg-[var(--border-strong)] text-[var(--text)] rounded transition-colors"
                              >
                                {filter}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* Search Results Preview */}
                        <div className="p-3">
                          <div className="text-xs text-[var(--muted)] mb-2">Found {filteredDemos.length} results:</div>
                          {filteredDemos.slice(0, 3).map((demo) => {
                            const routeId = getDemoRouteId(demo);
                            return (
                              <button
                                key={demo.id}
                                onClick={() => {
                                  setSearchTerm('');
                                  setShowSearchSuggestions(false);
                                  setCurrentPage(routeId);
                                  window.scrollTo({ top: 0, behavior: 'instant' });
                                }}
                                className="w-full text-left p-2 hover:bg-[var(--surface-2)] rounded transition-colors"
                              >
                              <div className="flex items-center">
                                <span className="mr-2 text-[var(--accent)]">{renderIcon(demo.iconKey || demo.id, 'demo', 20)}</span>
                                  <div>
                                    <div className="text-sm text-[var(--text)] font-medium">{demo.name}</div>
                                    <div className="text-xs text-[var(--muted)]">{demo.description}</div>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Filters and View Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Category Filters - Hamburger Menu */}
              <div className="relative" ref={categoryMenuRef}>
                <button
                  onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory !== 'all'
                      ? 'bg-[var(--accent)] text-[var(--text)] shadow-lg shadow-green-500/30'
                      : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="hidden sm:inline">
                    {selectedCategory === 'all' 
                      ? 'Categories' 
                      : demoCategories[selectedCategory]?.name || 'Categories'}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${categoryMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Category Dropdown Menu */}
                <AnimatePresence>
                  {categoryMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-[var(--surface)] border border-[var(--border-strong)] rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
                    >
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setCategoryMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 mb-1 ${
                          selectedCategory === 'all'
                            ? 'bg-[var(--accent)] text-[var(--text)]'
                            : 'text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>All Demos</span>
                          {selectedCategory === 'all' && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                      {Object.entries(demoCategories).map(([key, category]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSelectedCategory(key);
                            setCategoryMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 mb-1 ${
                            selectedCategory === key
                              ? 'bg-[var(--accent)] text-[var(--text)]'
                              : 'text-[var(--text)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-[var(--accent)]">{renderIcon(category.iconKey || key, 'category', 16)}</span>
                              <span>{category.name}</span>
                            </div>
                            {selectedCategory === key && (
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <p className="text-xs text-[var(--muted)] mt-1 ml-6">{category.demos.length} demos</p>
                        </button>
                      ))}
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Mode and Sort Controls */}
              <div className="flex gap-3 items-center">
                {/* Difficulty Filter */}
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="all">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border-strong)] text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  <option value="default">Default</option>
                  <option value="name">Name</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode Switcher */}
                <div className="flex gap-1 bg-[var(--surface)] p-1 rounded-lg border border-[var(--border-strong)]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                    title="Grid View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                    title="List View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('compact')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'compact' ? 'bg-[var(--accent)] text-[var(--text)]' : 'text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                    title="Compact View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Technology Filter Chips */}
            {selectedTechnologies.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-[var(--muted)]">Filtered by:</span>
                {selectedTechnologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTechnologies(prev => prev.filter(t => t !== tech))}
                    className="px-3 py-1 bg-[var(--accent)] text-[var(--text)] rounded-full text-sm flex items-center gap-2 hover:bg-[var(--accent-deep)] transition-colors"
                  >
                    {tech}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedTechnologies([])}
                  className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Popular Technologies */}
            {selectedCategory === 'all' && searchTerm === '' && (
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-sm text-[var(--muted)] mb-3">Popular Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Python', 'Node.js', 'TypeScript', 'TensorFlow', 'Docker', 'MongoDB', 'AWS'].map((tech) => {
                    const isSelected = selectedTechnologies.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedTechnologies(prev => prev.filter(t => t !== tech));
                          } else {
                            setSelectedTechnologies(prev => [...prev, tech]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          isSelected
                            ? 'bg-[var(--accent)] text-[var(--text)]'
                            : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border-strong)]'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </AnimatedCard>

         {/* Category Overview */}
         {selectedCategory === 'all' && searchTerm.trim() === '' && (
           <div className="mb-8 snap-section">
             <h2 className="text-2xl font-bold text-[var(--text)] mb-6">Categories</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {Object.entries(demoCategories).map(([key, category], index) => (
                 <BounceCard
                   key={key}
                   delay={index * 0.05}
                   className="cursor-pointer"
                   onClick={() => setSelectedCategory(key)}
                 >
                   <GlareHover intensity={0.6}>
                     <GlassCard className="p-6 hover:border-[var(--accent)] transition-all" glow>
                      <div className="flex items-center mb-4">
                        <div className="mr-3 text-[var(--accent)]">{renderIcon(category.iconKey || key, 'category', 32)}</div>
                         <div>
                           <h3 className="text-lg font-semibold text-[var(--text)]">{category.name}</h3>
                           <p className="text-[var(--muted)] text-sm">{category.demos.length} demos</p>
                         </div>
                       </div>
                       <p className="text-[var(--text)] text-sm">{category.description}</p>
                     </GlassCard>
                   </GlareHover>
                 </BounceCard>
               ))}
             </div>
           </div>
         )}

        {/* Demos Showcase */}
        <div className="mb-8 snap-section">
          <AnimatedCard delay={100} direction="up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--text)]">
                {selectedCategory === 'all' ? 'All Demos' : demoCategories[selectedCategory]?.name}
              </h2>
              <div className="flex items-center gap-4">
                <p className="text-[var(--muted)]">{filteredDemos.length} {filteredDemos.length === 1 ? 'demo' : 'demos'} found</p>
                {searchTerm && (
                  <span className="text-sm text-[var(--accent)] bg-[var(--accent-soft)]/20 px-2 py-1 rounded">
                    Searching: "{searchTerm}"
                  </span>
                )}
              </div>
            </div>
          </AnimatedCard>

          {filteredDemos.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-2">No demos found</h3>
              <p className="text-[var(--muted)] mb-4">
                {searchTerm
                  ? `No demos match "${searchTerm}". Try adjusting your search terms.`
                  : 'No demos available in this category.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-[var(--accent)] hover:bg-[var(--accent-deep)] text-[var(--text)] px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : showCategorySections ? (
            <div className="space-y-12">
              {Object.entries(demoCategories).map(([key, category], index) => (
                <section key={key} className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text)] flex items-center gap-2">
                        <span className="text-[var(--accent)]">{renderIcon(category.iconKey || key, 'category', 24)}</span>
                        <span>{category.name}</span>
                        <span className="text-sm text-[var(--muted)]">{category.demos.length} demos</span>
                      </h3>
                      <p className="text-[var(--muted)] text-sm max-w-2xl">{category.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCategory(key)}
                      className="self-start px-4 py-2 rounded-lg border border-[var(--border-strong)] text-sm text-[var(--text)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors"
                    >
                      View all demos
                    </button>
                  </div>

                  <div className={
                    viewMode === 'list' 
                      ? 'space-y-3' 
                      : viewMode === 'compact'
                      ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4'
                      : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6'
                  } style={{ isolation: 'isolate' }}>
                    {category.demos.slice(0, viewMode === 'compact' ? 5 : 3).map((demo, idx) => renderDemoCard(demo, idx, key))}
                  </div>

                  {category.demos.length > (viewMode === 'compact' ? 5 : 3) && (
                    <div className="text-right">
                      <button
                        onClick={() => setSelectedCategory(key)}
                        className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        Explore {category.demos.length - (viewMode === 'compact' ? 5 : 3)} more →
                      </button>
                    </div>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <div className={
              viewMode === 'list' 
                ? 'space-y-3' 
                : viewMode === 'compact'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4'
                : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6'
            } style={{ isolation: 'isolate' }}>
              {filteredDemos.map((demo, index) => renderDemoCard(demo, index, selectedCategory))}
            </div>
          )}
        </div>

         {/* Quick Stats */}
         <ScrollReveal delay={0.2} direction="up" className="snap-section">
           <GlareHover intensity={0.4}>
             <GlassCard className="bg-gradient-to-br from-[var(--accent-soft)]/50 via-purple-800/50 to-[var(--accent-deep)]/50 p-6 border-[var(--accent)] hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 transition-all" glow>
               <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Demo Statistics</h2>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="text-center">
                   <div className="text-3xl font-bold text-[var(--accent)]">{allDemos.length}</div>
                   <div className="text-[var(--text)] text-sm">Total Demos</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-[var(--accent)]">{Object.keys(demoCategories).length}</div>
                   <div className="text-[var(--text)] text-sm">Categories</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-[var(--accent)]">
                     {allDemos.filter(demo => demo.difficulty === 'Advanced').length}
                   </div>
                   <div className="text-[var(--text)] text-sm">Advanced Projects</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-[var(--accent)]">
                     {new Set(allDemos.flatMap(demo => demo.technologies)).size}
                   </div>
                   <div className="text-[var(--text)] text-sm">Technologies Used</div>
                 </div>
               </div>
             </GlassCard>
           </GlareHover>
         </ScrollReveal>
      </div>
    </div>
  );
};

export default DemoOrganizer; 