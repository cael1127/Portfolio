import React, { useState } from 'react';

// Freelancing data
const freelancingData = {
  company: {
    name: 'TechCraft Solutions',
    tagline: 'Enterprise Software Development & Digital Transformation',
    description: 'Specialized in building scalable, secure, and innovative software solutions for businesses of all sizes. From concept to deployment, we deliver cutting-edge technology solutions that drive growth and efficiency.',
    founded: '2025',
    clients: '50+',
    projects: '100+',
    satisfaction: '98%'
  },
  services: [
    {
      id: 'full-stack-development',
      title: 'Full-Stack Development',
      description: 'End-to-end web and mobile application development with modern technologies and best practices.',
      icon: '💻',
      upfront: '$5,000-25,000',
      monthly: '$500-2,000',
      features: [
        'React, Angular, Vue.js frontend development',
        'Node.js, Python, Java backend development',
        'Mobile app development (React Native, Flutter)',
        'Database design and optimization',
        'API development and integration',
        'Performance optimization and testing',
        'Deployment and DevOps setup',
        'Ongoing maintenance and support'
      ],
      technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes']
    },
    {
      id: 'security-consulting',
      title: 'Security Consulting',
      description: 'Comprehensive cybersecurity solutions and security architecture design.',
      icon: '🔒',
      upfront: '$10,000-40,000',
      monthly: '$1,000-4,000',
      features: [
        'Security architecture design',
        'Penetration testing and vulnerability assessment',
        'Compliance implementation (SOC2, HIPAA, PCI)',
        'Security monitoring and incident response',
        'Identity and access management',
        'Zero trust architecture implementation',
        'Security training and awareness',
        'Risk assessment and mitigation'
      ],
      technologies: ['OWASP', 'NIST', 'MITRE ATT&CK', 'SIEM', 'EDR', 'IAM']
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics & BI',
      description: 'Data-driven insights and business intelligence solutions for informed decision making.',
      icon: '📊',
      upfront: '$6,000-20,000',
      monthly: '$600-2,000',
      features: [
        'Data warehouse design and implementation',
        'ETL pipeline development',
        'Business intelligence dashboard creation',
        'Real-time analytics and reporting',
        'Data visualization and storytelling',
        'Predictive analytics and forecasting',
        'Data governance and quality assurance',
        'Performance optimization and tuning'
      ],
      technologies: ['Python', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'Snowflake']
    }
  ],
  process: [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'Understanding your business needs, technical requirements, and project scope.',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Architecture Design',
      description: 'Creating scalable, secure, and efficient technical architecture.',
      icon: '🏗️'
    },
    {
      step: 3,
      title: 'Development & Testing',
      description: 'Agile development with continuous testing and quality assurance.',
      icon: '⚡'
    },
    {
      step: 4,
      title: 'Deployment & Launch',
      description: 'Production deployment with monitoring and performance optimization.',
      icon: '🚀'
    },
    {
      step: 5,
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and maintenance to ensure optimal performance.',
      icon: '🛠️'
    }
  ]
};

export default function FreelancingPage() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    company: '',
    projectDescription: '',
    timeline: '',
    budget: ''
  });

  const handleGetQuote = (service) => {
    setSelectedService(service);
    setShowQuoteModal(true);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the quote request to your backend
    alert('Quote request submitted! We\'ll get back to you within 24 hours.');
    setShowQuoteModal(false);
    setQuoteForm({
      name: '',
      email: '',
      company: '',
      projectDescription: '',
      timeline: '',
      budget: ''
    });
  };

  return (
    <section className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold gradient-text mb-4">{freelancingData.company.name}</h1>
        <p className="text-xl text-gray-300 mb-6">{freelancingData.company.tagline}</p>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {freelancingData.company.description}
        </p>
      </div>

      {/* Company Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
          <div className="text-3xl font-bold text-teal-400 mb-2">{freelancingData.company.founded}</div>
          <div className="text-gray-300">Founded</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
          <div className="text-3xl font-bold text-teal-400 mb-2">{freelancingData.company.clients}</div>
          <div className="text-gray-300">Happy Clients</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
          <div className="text-3xl font-bold text-teal-400 mb-2">{freelancingData.company.projects}</div>
          <div className="text-gray-300">Projects Completed</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
          <div className="text-3xl font-bold text-teal-400 mb-2">{freelancingData.company.satisfaction}</div>
          <div className="text-gray-300">Client Satisfaction</div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-8 text-center">Services Offered</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancingData.services.map((service, index) => (
            <div key={service.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="mb-4">
                <div className="text-lg font-semibold text-teal-400 mb-1">Upfront Cost:</div>
                <div className="text-2xl font-bold text-teal-400 mb-2">{service.upfront}</div>
                <div className="text-lg font-semibold text-teal-400 mb-1">Monthly Service:</div>
                <div className="text-xl font-bold text-teal-400">{service.monthly}</div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {service.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {service.technologies.map((tech, i) => (
                    <span key={i} className="bg-teal-600 text-white px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleGetQuote(service)}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors font-medium"
              >
                Get Custom Quote
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-8 text-center">Our Process</h2>
        <div className="grid md:grid-cols-5 gap-6">
          {freelancingData.process.map((step, index) => (
            <div key={step.step} className="text-center">
              <div className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {step.step}
              </div>
              <div className="text-3xl mb-2">{step.icon}</div>
              <h3 className="font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-teal-600 text-white p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-xl mb-6">Let's discuss how we can help bring your vision to life</p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Schedule Consultation
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
            View Portfolio
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Get Custom Quote</h2>
                <button 
                  onClick={() => setShowQuoteModal(false)}
                  className="text-gray-400 hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedService && (
                <div className="bg-gray-700 p-4 rounded-lg mb-6 border border-gray-600">
                  <h3 className="font-semibold text-white mb-2">Selected Service:</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{selectedService.icon}</span>
                    <span className="font-medium text-gray-300">{selectedService.title}</span>
                  </div>
                  <p className="text-sm text-gray-400">{selectedService.description}</p>
                </div>
              )}

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={quoteForm.company}
                    onChange={(e) => setQuoteForm({...quoteForm, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Project Description *</label>
                  <textarea
                    required
                    rows="4"
                    value={quoteForm.projectDescription}
                    onChange={(e) => setQuoteForm({...quoteForm, projectDescription: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Describe your project requirements, goals, and any specific features you need..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Timeline</label>
                    <select
                      value={quoteForm.timeline}
                      onChange={(e) => setQuoteForm({...quoteForm, timeline: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white"
                    >
                      <option value="">Select timeline</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Ongoing">Ongoing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Budget Range</label>
                    <select
                      value={quoteForm.budget}
                      onChange={(e) => setQuoteForm({...quoteForm, budget: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-700 text-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="$5k-15k">$5,000 - $15,000</option>
                      <option value="$15k-50k">$15,000 - $50,000</option>
                      <option value="$50k-100k">$50,000 - $100,000</option>
                      <option value="$100k+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Submit Quote Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 