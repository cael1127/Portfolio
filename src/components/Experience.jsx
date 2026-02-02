import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getIcon } from '../utils/iconMapping';
import { HiBriefcase, HiCog, FaJava, FaPython } from 'react-icons/hi2';
import { FaJava as FaJavaIcon, FaPython as FaPythonIcon } from 'react-icons/fa';

const Experience = () => {
  const workHistory = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Self (Freelance)',
      location: 'Port Lavaca, TX',
      period: 'May 2020 - Current',
      iconKey: 'business-apps',
      responsibilities: [
        'Develop responsive, modern websites and web applications for a variety of clients, including portfolios, e-commerce, and educational platforms',
        'Build secure back-end systems, dynamic front-end interfaces, and full-stack solutions integrating APIs, cloud services, and databases',
        'Utilize best practices in software architecture, performance optimization, and security compliance',
        'Maintain, update, and scale multiple live projects to ensure reliability, user experience, and security',
        'Review code, debug problems, and correct issues',
        'Discuss project progress with customers, collect feedback on different stages and directly address concerns',
        'Provide software application engineering and maintenance for development lifecycle',
        'Use NodeJS, ORM and SQL/No-SQL to develop and manage databases',
        'Work with back-end developers to design APIs',
        'Design and develop forward-thinking systems that meet user needs and improve productivity',
        'Document software development methodologies in technical manuals to be used by IT personnel in future projects',
        'Collaborate with fellow engineers to evaluate software and hardware interfaces'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'JavaScript', 'SQL', 'NoSQL', 'RESTful APIs', 'Cloud Services']
    },
    {
      id: 2,
      title: 'Senior Software Engineer & IT Specialist',
      company: 'Three Sisters Oyster Co.',
      location: 'Port Lavaca, TX, USA',
      period: 'March 2025 - January 2026',
      iconKey: 'three-sisters-oyster-project',
      responsibilities: [
        'Manage and maintain the full digital infrastructure, including internal IT systems and customer-facing platforms',
        'Lead the design, development, and deployment of dynamic websites, mobile-friendly applications, and software tools',
        'Oversee network security, system updates, and comprehensive troubleshooting',
        'Implement scalable technology solutions supporting long-term business growth and efficiency',
        'Collaborate with cross-functional teams to align technology strategies with business objectives',
        'Analyze proposed technical solutions based on customer requirements',
        'Develop robust, scalable, modular and API-centric infrastructures',
        'Deliver unit-tested systems within customer-prescribed timeframes',
        'Correct, modify and upgrade software to improve performance',
        'Prove successful working within tight deadlines and a fast-paced environment',
        'Create proofs of concept for innovative new solutions'
      ],
      technologies: ['Full-Stack Development', 'IT Infrastructure', 'Network Security', 'System Administration', 'Cloud Deployment']
    },
    {
      id: 3,
      title: 'Contracted IT Specialist',
      company: 'CSD (Freelance / Client-Based)',
      location: 'Port Lavaca, TX',
      period: 'October 2022 - October 2025',
      iconKey: 'devops',
      responsibilities: [
        'Provide on-demand IT support and system administration for multiple clients, addressing hardware, software, and network issues',
        'Perform system maintenance, updates, and troubleshooting to ensure seamless client operations',
        'Configure, monitor, and optimize networks, servers, and cloud-based systems for maximum efficiency and security',
        'Offer technical consultation for business IT infrastructure and workflow automation',
        'Monitor systems in operation and input commands to troubleshoot areas',
        'Maintain servers and systems to keep networks fully operational during peak periods'
      ],
      technologies: ['Windows Server', 'Linux Server', 'Network Administration', 'System Configuration', 'Cloud Infrastructure', 'Troubleshooting']
    }
  ];

  const certifications = [
    {
      id: 1,
      name: 'IT Certified - Java',
      iconKey: 'java',
      Icon: FaJavaIcon,
      description: 'Java Programming Certification'
    },
    {
      id: 2,
      name: 'IT Certified - Python',
      iconKey: 'python',
      Icon: FaPythonIcon,
      description: 'Python Programming Certification'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-green-400">Experience & Certifications</h2>
        </motion.div>

        {/* Work History Timeline */}
        <div className="mb-12">
          <motion.h3
            className="text-2xl font-semibold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Work History
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-600 via-green-600 to-emerald-600"></div>

            <div className="space-y-8">
              {workHistory.map((job, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: true, amount: 0.3 });
                const slideDirection = index % 2 === 0 ? -50 : 50;
                
                return (
                <motion.div
                  key={job.id}
                  ref={ref}
                  className="relative pl-20"
                  initial={{ opacity: 0, x: slideDirection }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: slideDirection }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 bg-teal-600 rounded-full border-4 border-gray-900 z-10"></div>

                  <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-teal-600 p-3 rounded-lg text-white">
                        {(() => {
                          const IconComponent = getIcon(job.iconKey, 'demo');
                          return IconComponent ? <IconComponent size={24} /> : null;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-1">{job.title}</h4>
                        <p className="text-teal-400 font-medium mb-1">{job.company}</p>
                        <p className="text-gray-400 text-sm mb-1">{job.location}</p>
                        <p className="text-gray-500 text-sm">{job.period}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-300 mb-2">Key Responsibilities:</h5>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-teal-500 mt-1">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-teal-600/20 text-teal-300 px-3 py-1 rounded-full text-xs border border-teal-600/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <motion.div
          className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-8 rounded-xl border border-green-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Certifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-gradient-to-br from-green-800 via-teal-700 to-cyan-700 p-6 rounded-lg border border-green-700 hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + cert.id * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-white">
                    {cert.Icon ? <cert.Icon size={32} /> : (() => {
                      const IconComponent = getIcon(cert.iconKey, 'demo');
                      return IconComponent ? <IconComponent size={32} /> : null;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">{cert.name}</h4>
                    <p className="text-gray-300 text-sm">{cert.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
