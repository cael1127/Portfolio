const { useState } = React;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [projectPage, setProjectPage] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home' },
    { name: 'Experience & Certifications', page: 'experience' },
    { name: 'Software Development', page: 'software' },
    { name: 'IT', page: 'it' },
    { name: 'Cybersecurity', page: 'cybersecurity' },
    { name: 'AI Development', page: 'ai' },
    { name: 'Data Analysis', page: 'data' },
  ];

  const contactInfo = {
    email: 'caelfindleygmail.com',
    phone: '+1 (361) 920-6493',
    github: 'https://github.com/cael1127',
    linkedin: 'https://linkedin.com/in/caelfindley ',
  };

  const experience = {
    role: 'Software Engineer',
    company: 'Three Sisters Oyster Company',
    since: '2025',
    description:
      'Developing and maintaining scalable software solutions for aquaculture data tracking, logistics management, and environmental monitoring.',
  };

  const certifications = [
    'AWS Certified Developer',
    'Google Cloud Professional Data Engineer',
    'CompTIA Security+',
    'Certified Ethical Hacker (CEH)',
    'TensorFlow Developer Certificate',
  ];

  const projects = {
    software: [
      {
        id: 'aq-track',
        title: 'Aquaculture Tracking System',
        description: 'Full-stack application for real-time oyster farm monitoring using IoT sensors and React dashboard.',
        tech: ['React', 'Node.js', 'MongoDB', 'AWS IoT'],
        features: [
          'Live sensor data visualization',
          'Alert system for abnormal readings',
          'Historical data analysis dashboard',
          'User authentication and roles',
        ],
        image: 'https://placehold.co/800x400/green/white?text=Aquaculture+Dashboard',
      },
      {
        id: 'oyster-logistics',
        title: 'Oyster Logistics Manager',
        description: 'Web app that streamlines transportation scheduling, inventory tracking, and delivery optimization.',
        tech: ['Next.js', 'Express', 'PostgreSQL', 'TailwindCSS'],
        features: [
          'Route optimization engine',
          'Inventory tracking with QR codes',
          'Delivery status updates via SMS',
          'Custom admin dashboard',
        ],
        image: ' https://placehold.co/800x400/green/white?text=Logistics+Manager',
      },
    ],
    it: [
      {
        id: 'cloud-migration',
        title: 'Cloud Migration Toolset',
        description: 'Automated scripts and CI/CD pipelines to migrate legacy systems to AWS cloud infrastructure.',
        tech: ['Python', 'Bash', 'AWS CLI', 'Docker'],
        features: [
          'Auto-scaling setup',
          'Infrastructure as Code templates',
          'Monitoring and logging integration',
          'Zero-downtime deployment strategy',
        ],
        image: ' https://placehold.co/800x400/blue/white?text=Cloud+Migration',
      },
      {
        id: 'helpdesk-portal',
        title: 'Internal IT Helpdesk Portal',
        description: 'Custom helpdesk portal for internal support ticket submission and status tracking.',
        tech: ['PHP', 'MySQL', 'Bootstrap', 'Laravel'],
        features: [
          'Ticket categorization and routing',
          'Priority-based SLA tracking',
          'Agent performance dashboard',
          'Knowledge base and FAQs',
        ],
        image: ' https://placehold.co/800x400/blue/white?text=Helpdesk+Portal',
      },
    ],
    cybersecurity: [
      {
        id: 'network-scanner',
        title: 'Network Vulnerability Scanner',
        description: 'Custom scanner that identifies vulnerabilities in internal network devices and logs findings.',
        tech: ['Python', 'Scapy', 'Flask', 'SQLite'],
        features: [
          'Port scanning and service detection',
          'Vulnerability database integration',
          'Scheduled scans and reports',
          'Integration with Slack alerts',
        ],
        image: ' https://placehold.co/800x400/blue/white?text=Vulnerability+Scanner',
      },
      {
        id: 'zero-trust-auth',
        title: 'Zero Trust Authentication Module',
        description: 'Multi-factor authentication system with adaptive risk scoring based on user behavior.',
        tech: ['Node.js', 'Passport.js', 'JWT', 'Redis'],
        features: [
          'Behavioral biometric analysis',
          'Location-based login restrictions',
          'Adaptive MFA prompts',
          'Session risk score tracking',
        ],
        image: ' https://placehold.co/800x400/blue/white?text=Zero+Trust+Auth',
      },
    ],
    ai: [
      {
        id: 'predictive-maintenance',
        title: 'Predictive Maintenance AI',
        description: 'Machine learning model trained to predict equipment failure in oyster farms based on sensor data.',
        tech: ['TensorFlow', 'Python', 'Keras', 'Pandas'],
        features: [
          'Sensor data ingestion pipeline',
          'Failure probability prediction',
          'Maintenance recommendation engine',
          'Model retraining pipeline',
        ],
        image: ' https://placehold.co/800x400/green/white?text=Predictive+Maintenance',
      },
      {
        id: 'customer-chatbot',
        title: 'Chatbot for Customer Support',
        description: 'NLP-based chatbot integrated into the company website to answer common customer questions.',
        tech: ['Dialogflow', 'React', 'Firebase', 'JavaScript'],
        features: [
          'Natural language understanding',
          'Intent recognition and routing',
          'FAQ automation',
          'Human handoff option',
        ],
        image: ' https://placehold.co/800x400/green/white?text=Customer+Chatbot',
      },
    ],
    data: [
      {
        id: 'environment-dashboard',
        title: 'Environmental Impact Dashboard',
        description: 'Interactive dashboard showing water quality trends, harvest yields, and sustainability metrics.',
        tech: ['D3.js', 'Tableau', 'Power BI', 'SQL'],
        features: [
          'Real-time water quality indicators',
          'Seasonal trend analysis',
          'Harvest yield projections',
          'Exportable report generation',
        ],
        image: ' https://placehold.co/800x400/green/white?text=Environmental+Dashboard',
      },
      {
        id: 'sales-forecasting',
        title: 'Sales Forecasting Model',
        description: 'Time series analysis tool that predicts future sales patterns based on historical data.',
        tech: ['Python', 'Pandas', 'Prophet', 'NumPy'],
        features: [
          'Historical pattern recognition',
          'Seasonality and holiday effect modeling',
          'Demand forecasting by region',
          'Integration with ERP system',
        ],
        image: ' https://placehold.co/800x400/green/white?text=Sales+Forecasting',
      },
    ],
  };

  const renderProjects = (category) =>
    projects[category].map((project) => (
      <div
        key={project.id}
        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        onClick={() => {
          setCurrentPage('project');
          setProjectPage(project);
        }}
      >
        <h3 className="text-xl font-bold text-green-800 mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, i) => (
            <span key={i} className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ));

  const renderProjectDetail = () => {
    if (!projectPage) return null;

    return (
      <section className="fade-in">
        <button
          onClick={() => {
            setCurrentPage('software');
            setProjectPage(null);
          }}
          className="mb-4 text-green-700 hover:text-green-900 underline"
        >
          ← Back to Projects
        </button>

        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-blue-800 mb-6">
          {projectPage.title}
        </h2>
        <img src={projectPage.image} alt={projectPage.title} className="w-full max-h-96 object-cover rounded-lg mb-6" />

        <p className="text-lg text-gray-700 mb-6">{projectPage.description}</p>

        <h3 className="text-2xl font-semibold text-green-700 mb-4">Technologies Used</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {projectPage.tech.map((tech, i) => (
            <span key={i} className="bg-blue-50 text-blue-900 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-green-700 mb-4">Key Features</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {projectPage.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-blue-100 text-gray-900 relative">
      {/* Fixed Background Gradient */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-green-50 via-green-100 to-blue-100"></div>

      {/* Header / Nav */}
      <header className="bg-gradient-to-r from-green-700 via-green-800 to-blue-900 sticky top-0 z-30 shadow-lg backdrop-blur-md text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-200 via-green-100 to-blue-200">Cael Findley</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      setProjectPage(null);
                    }}
                    className={`relative group px-2 py-2 font-medium transition-colors duration-300 ${
                      currentPage === link.page ? 'text-green-200' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300 ${currentPage === link.page ? 'w-full' : ''}`}></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-40"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-green-700 via-green-800 to-blue-900 shadow-lg z-30">
            <ul className="flex flex-col p-4 space-y-4">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      setCurrentPage(link.page);
                      setProjectPage(null);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 font-medium transition-colors duration-300 ${
                      currentPage === link.page ? 'text-green-200' : 'text-gray-200 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 max-w-6xl">
        {currentPage === 'home' && (
          <section className="fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-blue-800 mb-6 animate-fadeIn">
              Welcome to My Portfolio
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-10 leading-relaxed">
              I'm a passionate Software Engineer at Three Sisters Oyster Company, building robust systems that drive innovation and efficiency.
            </p>

            <h3 className="text-2xl font-semibold text-green-700 mb-6">Contact Me</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="text-green-700 underline">{contactInfo.email}</a></p>
                <p className="mb-2"><strong>Phone:</strong> {contactInfo.phone}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <p className="mb-2"><strong>GitHub:</strong> <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">caelfindley</a></p>
                <p><strong>LinkedIn:</strong> <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-700 underline">Connect with me</a></p>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'experience' && (
          <section className="fade-in">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-blue-800 mb-8">Experience & Certifications</h2>
            <div className="bg-white p-8 rounded-xl shadow-lg mb-10">
              <h3 className="text-2xl font-bold text-green-700">{experience.role}</h3>
              <p className="text-gray-600">{experience.company}, Since {experience.since}</p>
              <p className="mt-4 text-gray-700">{experience.description}</p>
            </div>

            <h3 className="text-2xl font-semibold text-green-700 mb-6">Certifications</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              {certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {['software', 'it', 'cybersecurity', 'ai', 'data'].includes(currentPage) && !projectPage && (
          <section className="fade-in">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-700 to-blue-800 mb-8 capitalize">
              {currentPage.replace(/^\w/, c => c.toUpperCase())} Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {renderProjects(currentPage)}
            </div>
          </section>
        )}

        {currentPage === 'project' && projectPage && renderProjectDetail()}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-green-700 via-green-800 to-blue-900 py-6 mt-16 text-white text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Cael Findley. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);