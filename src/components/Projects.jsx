import React, { useState } from 'react';
import TrendingProjects from './TrendingProjects';
import DemoOrganizer from './DemoOrganizer';
import { getIcon } from '../utils/iconMapping';
import { HiFire, HiBriefcase } from 'react-icons/hi2';
import { FaGamepad } from 'react-icons/fa';
import Button from './ui/Button';
import { featuredRepos } from '../data/featuredRepos';
import { fetchRepoMeta } from '../utils/github';

const Projects = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('demos');
  const [repoMeta, setRepoMeta] = useState({});
  const [repoMetaError, setRepoMetaError] = useState(null);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setRepoMetaError(null);
        const results = await Promise.all(
          featuredRepos.map(async (repo) => {
            try {
              const data = await fetchRepoMeta(repo.fullName);
              return [repo.fullName, { status: 'ok', data }];
            } catch (e) {
              return [repo.fullName, { status: 'error', error: String(e?.message || e) }];
            }
          })
        );

        if (cancelled) return;
        setRepoMeta(Object.fromEntries(results));
      } catch (e) {
        if (cancelled) return;
        setRepoMetaError(String(e?.message || e));
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const tabs = [
    { id: 'demos', label: 'Live Demos', iconKey: 'game-platform', Icon: FaGamepad },
    { id: 'trending', label: 'Trending Projects', iconKey: 'financial', Icon: HiFire },
    { id: 'portfolio', label: 'Portfolio Projects', iconKey: 'business-apps', Icon: HiBriefcase }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <h2 className="text-4xl font-bold mb-8 text-[var(--accent)]">Projects</h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              size="md"
              className="px-6 py-3 rounded-lg"
            >
              <span className="mr-2 inline-flex items-center"><tab.Icon size={20} /></span>
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'demos' && (
          <DemoOrganizer setCurrentPage={setCurrentPage} />
        )}

        {activeTab === 'trending' && (
          <TrendingProjects setCurrentPage={setCurrentPage} />
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            {/* Featured GitHub Projects */}
            <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border-strong)]">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--text)]">Featured GitHub Projects</h3>
                  <p className="text-[var(--text)] mt-1">
                    Curated projects from my GitHub, enriched with live repo stats.
                  </p>
                </div>
                <Button
                  as="a"
                  href="https://github.com/cael1127?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  Browse all repos
                </Button>
              </div>

              {repoMetaError && (
                <div className="text-sm text-[var(--accent)] mb-4">
                  Couldn’t load GitHub metadata right now: {repoMetaError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredRepos.map((repo) => {
                  const meta = repoMeta[repo.fullName];
                  const data = meta?.status === 'ok' ? meta.data : null;

                  return (
                    <a
                      key={repo.fullName}
                      href={data?.html_url || `https://github.com/${repo.fullName}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group bg-[var(--bg)]/40 hover:bg-[var(--bg)]/60 p-5 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/60 transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-lg font-semibold text-[var(--text)] truncate">
                            {repo.title}
                          </div>
                          <div className="text-xs text-[var(--muted)] truncate">
                            {repo.fullName}
                          </div>
                        </div>
                        <div className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                          →
                        </div>
                      </div>

                      <div className="text-sm text-[var(--text)] mt-3 line-clamp-2">
                        {repo.blurb}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {repo.tags.map((t) => (
                          <span
                            key={`${repo.fullName}:${t}`}
                            className="text-[11px] px-2 py-1 rounded-full bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-wrap gap-x-4 gap-y-1">
                        <span>
                          {data ? `★ ${data.stargazers_count}` : meta?.status === 'error' ? '★ —' : 'Loading…'}
                        </span>
                        <span>
                          {data?.language ? data.language : meta?.status === 'error' ? 'Language —' : 'Language…'}
                        </span>
                        <span>
                          {data?.pushed_at ? `Updated ${new Date(data.pushed_at).toLocaleDateString()}` : meta?.status === 'error' ? 'Updated —' : 'Updated…'}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] p-6 rounded-xl border border-[var(--border-strong)]">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">Portfolio Projects</h3>
              <p className="text-[var(--text)] mb-6">
                A tight selection of end-to-end builds: strong UX, real constraints, and clean engineering.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Portfolio Project Cards */}

                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🔗</div>
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)]">Blockchain Supply Chain</h4>
                      <p className="text-[var(--muted)] text-sm">Solidity, Web3.js, React</p>
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-4">
                    A complete blockchain implementation for supply chain transparency with smart contracts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">Solidity</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">Web3.js</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">React</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-strong)]">
                    <Button
                      onClick={() => setCurrentPage('blockchain-demo')}
                      variant="primary"
                      className="flex-1 px-3 py-2 rounded text-sm"
                    >
                      View Project
                    </Button>
                    <Button variant="secondary" className="flex-1 px-3 py-2 rounded text-sm">
                      View Code
                    </Button>
                  </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🌊</div>
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)]">Smart Aquaculture</h4>
                      <p className="text-[var(--muted)] text-sm">IoT, React, Machine Learning</p>
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-4">
                    AI-powered aquaculture monitoring system with real-time sensor data and predictive analytics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">IoT</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">ML</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-strong)]">
                    <Button
                      onClick={() => setCurrentPage('aquaculture-demo')}
                      variant="primary"
                      className="flex-1 px-3 py-2 rounded text-sm"
                    >
                      View Project
                    </Button>
                    <Button variant="secondary" className="flex-1 px-3 py-2 rounded text-sm">
                      View Code
                    </Button>
                  </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🚚</div>
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)]">Smart Logistics</h4>
                      <p className="text-[var(--muted)] text-sm">React, AI/ML, GPS Integration</p>
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-4">
                    AI-powered fleet management and route optimization platform with real-time tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">GPS</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-strong)]">
                    <Button
                      onClick={() => setCurrentPage('logistics-demo')}
                      variant="primary"
                      className="flex-1 px-3 py-2 rounded text-sm"
                    >
                      View Project
                    </Button>
                    <Button variant="secondary" className="flex-1 px-3 py-2 rounded text-sm">
                      View Code
                    </Button>
                  </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">🏥</div>
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)]">Healthcare Analytics</h4>
                      <p className="text-[var(--muted)] text-sm">React, AI/ML, HIPAA Compliance</p>
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-4">
                    AI-powered patient monitoring and medical analytics platform with predictive diagnostics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">AI/ML</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">HIPAA</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-strong)]">
                    <Button
                      onClick={() => setCurrentPage('healthcare-demo')}
                      variant="primary"
                      className="flex-1 px-3 py-2 rounded text-sm"
                    >
                      View Project
                    </Button>
                    <Button variant="secondary" className="flex-1 px-3 py-2 rounded text-sm">
                      View Code
                    </Button>
                  </div>
                </div>

                <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">💰</div>
                    <div>
                      <h4 className="text-lg font-semibold text-[var(--text)]">Financial Analytics</h4>
                      <p className="text-[var(--muted)] text-sm">React, Financial APIs, Data Viz</p>
                    </div>
                  </div>
                  <p className="text-[var(--text)] text-sm mb-4">
                    Advanced financial analysis and portfolio management platform with real-time market data.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">APIs</span>
                    <span className="bg-[var(--border-strong)] text-[var(--text)] px-2 py-1 rounded text-xs">Data Viz</span>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-strong)]">
                    <Button
                      onClick={() => setCurrentPage('financial-demo')}
                      variant="primary"
                      className="flex-1 px-3 py-2 rounded text-sm"
                    >
                      View Project
                    </Button>
                    <Button variant="secondary" className="flex-1 px-3 py-2 rounded text-sm">
                      View Code
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Websites Section */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-blue-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)] mb-8">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">🌐 Live Websites & Deployments</h3>
              <p className="text-[var(--text)] mb-6">
                Production websites and applications currently running and serving users
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a 
                  href="https://threesistersoyster.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">Three Sisters Oyster</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">threesistersoyster.com</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://uilacademy.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">UIL Academy</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">uilacademy.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://minbod.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">MinBod</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">minbod.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://jfresume.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">JF Resume</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">jfresume.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://bapux.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">Bapux</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">bapux.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>

                <a 
                  href="https://bpawd.netlify.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[var(--accent-soft)] hover:bg-[var(--accent-deep)] p-4 rounded-lg border border-[var(--accent)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-[var(--text)]">BPAWD</h4>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <p className="text-[var(--accent)] text-sm mb-2">bpawd.netlify.app</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                    <span className="text-[var(--accent)] text-xs">Live</span>
                  </div>
                </a>
              </div>

              {/* GitHub Section */}
              <div className="mt-6 pt-6 border-t border-[var(--accent)]">
                <a 
                  href="https://github.com/cael1127" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[var(--surface)] hover:bg-[var(--surface-2)] p-4 rounded-lg border border-[var(--border-strong)] hover:border-[var(--accent)] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💻</div>
                    <div>
                      <h4 className="text-xl font-semibold text-[var(--text)] mb-1">GitHub Profile</h4>
                      <p className="text-[var(--muted)]">github.com/cael1127</p>
                      <p className="text-sm text-[var(--muted)] mt-1">View all repositories and open source contributions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--accent)] text-sm font-semibold">View Profile</span>
                    <span className="text-[var(--accent)] group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gradient-to-br from-[var(--accent-soft)] via-purple-800 to-[var(--accent-deep)] p-6 rounded-xl border border-[var(--accent)]">
              <h3 className="text-2xl font-bold text-[var(--text)] mb-4">🛠️ Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">Programming & Development</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• Java & Python</li>
                    <li>• TypeScript & JavaScript</li>
                    <li>• React.js & Next.js</li>
                    <li>• Node.js & Express</li>
                    <li>• HTML5, CSS, SQL</li>
                    <li>• RESTful APIs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">Software Engineering & DevOps</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• Version Control (Git)</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• Docker & Containerization</li>
                    <li>• Cloud Deployment (AWS, Netlify)</li>
                    <li>• API Integration</li>
                    <li>• Performance Optimization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">AI & Machine Learning</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• AI/ML Model Integration</li>
                    <li>• Predictive Analytics</li>
                    <li>• Natural Language Processing</li>
                    <li>• Intelligent Automation</li>
                    <li>• Python/Java-Based ML Pipelines</li>
                    <li>• TensorFlow & PyTorch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">IT & Systems Administration</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• Windows & Linux Server Admin</li>
                    <li>• System Configuration & Optimization</li>
                    <li>• Cloud Infrastructure</li>
                    <li>• Network Design & Maintenance</li>
                    <li>• Hardware/Software Troubleshooting</li>
                    <li>• Client-Based IT Consultation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">Cybersecurity & Infrastructure</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• Secure System & Network Design</li>
                    <li>• Access Control Protocols</li>
                    <li>• Risk Reduction Strategies</li>
                    <li>• Reliability Maintenance</li>
                    <li>• Cybersecurity Best Practices</li>
                    <li>• Enterprise-Level Network Security</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[var(--accent)] mb-3">Frontend & UI/UX</h4>
                  <ul className="space-y-1 text-[var(--text)] text-sm">
                    <li>• Responsive Web Design</li>
                    <li>• UI/UX Implementation</li>
                    <li>• Cross-Platform Development</li>
                    <li>• Mobile App Development (Expo)</li>
                    <li>• Tailwind CSS & Styled Components</li>
                    <li>• Redux & Context API</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 