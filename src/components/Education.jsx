import React from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconMapping';
import { HiAcademicCap, HiBookOpen, HiGlobeAlt, HiCpuChip, HiChartBar, HiCodeBracket, HiCog, HiUserGroup, HiTrophy } from 'react-icons/hi2';
import { FaPlug } from 'react-icons/fa';

const Education = ({ setCurrentPage }) => {
  const education = [
    {
      id: 1,
      degree: 'High School Diploma',
      school: 'Calhoun High School',
      location: 'Port Lavaca, TX',
      period: 'Expected May 2026',
      gpa: '4.66',
      iconKey: 'education',
      Icon: HiAcademicCap,
      achievements: [
        'BigFuture National Scholar',
        'Academic Excellence Recognition',
        'Honor Roll: 2016–Present',
        'Ranked in Top 4% of Class'
      ],
      courses: [
        'AP Chemistry',
        'AP Computer Science',
        'AP World History'
      ],
      dualCredit: [
        'History 1301 & 1302',
        'English 1301 & 1302',
        'Psychology',
        'Federal Government'
      ]
    },
    {
      id: 2,
      degree: 'Associate of Science in Computer Science',
      school: 'Victoria College',
      location: 'Victoria, TX',
      period: 'Expected May 2026',
      gpa: '3.6',
      iconKey: 'education',
      Icon: HiBookOpen,
      achievements: [],
      courses: [],
      dualCredit: []
    }
  ];

  const leadership = [
    {
      id: 1,
      role: 'Network Design Team Lead',
      organization: 'Calhoun High School',
      period: '2024–2025',
      iconKey: 'network-design',
      Icon: HiGlobeAlt,
      description: 'Led team in creating enterprise network solution balancing performance, security, and cost efficiency; presented full technical documentation'
    },
    {
      id: 2,
      role: 'Head Technician for Robotics',
      organization: 'Crab Bots - FIRST Robotics',
      period: '2019–2022',
      iconKey: 'ai-assistant',
      Icon: HiCpuChip,
      description: 'Served as head technician for Crab Bots in state-level FIRST Robotics competitions'
    },
    {
      id: 3,
      role: 'Team Lead for Academics Team',
      organization: 'Calhoun High School',
      period: '2023–2025',
      iconKey: 'financial',
      Icon: HiChartBar,
      description: 'Directed computer science team to regional contests with strong peer results'
    }
  ];

  const extracurriculars = [
    {
      id: 1,
      name: 'Competitive Programming',
      iconKey: 'frontend',
      Icon: HiCodeBracket
    },
    {
      id: 2,
      name: 'Network Design',
      iconKey: 'network-design',
      Icon: FaPlug
    },
    {
      id: 3,
      name: 'Robotics',
      iconKey: 'devops',
      Icon: HiCog
    },
    {
      id: 4,
      name: 'Computer Science / Programming Club',
      iconKey: 'backend',
      Icon: HiUserGroup
    },
    {
      id: 5,
      name: 'Varsity Baseball',
      iconKey: 'sports',
      Icon: HiTrophy,
      period: '2023–2025'
    },
    {
      id: 6,
      name: 'Business Professionals of America',
      iconKey: 'academic-network-design',
      Icon: HiTrophy,
      description: 'Led team to compete at state level'
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
          <h2 className="text-4xl font-bold mb-8 text-green-400">Education & Leadership</h2>
        </motion.div>

        {/* Education Timeline */}
        <div className="mb-12">
          <motion.h3
            className="text-2xl font-semibold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Education
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-xl border border-gray-600 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-teal-600 p-3 rounded-lg text-2xl">
                    {edu.Icon ? <edu.Icon size={32} className="text-white" /> : (() => {
                      const IconComponent = getIcon(edu.iconKey, 'demo');
                      return IconComponent ? <IconComponent size={32} className="text-white" /> : null;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-1">{edu.degree}</h4>
                    <p className="text-teal-400 font-medium mb-1">{edu.school}</p>
                    <p className="text-gray-400 text-sm mb-1">{edu.location}</p>
                    <p className="text-gray-500 text-sm mb-2">{edu.period}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-600/30">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </div>

                {edu.achievements.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">Achievements:</h5>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {edu.courses.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">AP Courses:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs border border-blue-600/30"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.dualCredit.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">Dual Credit Courses:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.dualCredit.map((course, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-600/30"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Experience */}
        <div className="mb-12">
          <motion.h3
            className="text-2xl font-semibold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Leadership Experience
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {leadership.map((lead, index) => (
              <motion.div
                key={lead.id}
                className="bg-gradient-to-br from-teal-900/50 via-green-800/50 to-emerald-900/50 p-6 rounded-xl border border-teal-700/50 hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="mb-3 text-green-400">
                  {lead.Icon ? <lead.Icon size={32} /> : (() => {
                    const IconComponent = getIcon(lead.iconKey, 'demo');
                    return IconComponent ? <IconComponent size={32} /> : null;
                  })()}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{lead.role}</h4>
                <p className="text-teal-400 text-sm mb-2">{lead.organization}</p>
                <p className="text-gray-400 text-xs mb-3">{lead.period}</p>
                <p className="text-gray-300 text-sm">{lead.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extracurricular Activities */}
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-8 rounded-xl border border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Extracurricular Activities</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {extracurriculars.map((activity) => (
              <div
                key={activity.id}
                className="bg-gray-700/50 p-4 rounded-lg border border-gray-600 hover:border-teal-500 transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-400">
                    {activity.Icon ? <activity.Icon size={24} /> : (() => {
                      const IconComponent = getIcon(activity.iconKey, 'demo');
                      return IconComponent ? <IconComponent size={24} /> : null;
                    })()}
                  </span>
                  <div>
                    <h4 className="font-semibold text-white">{activity.name}</h4>
                    {activity.period && (
                      <p className="text-gray-400 text-xs">{activity.period}</p>
                    )}
                    {activity.description && (
                      <p className="text-gray-300 text-sm mt-1">{activity.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;
