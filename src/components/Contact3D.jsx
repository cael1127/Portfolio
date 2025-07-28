import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Float, Text } from '@react-three/drei';
import { 
  Button3D, 
  Card3D, 
  FloatingParticles, 
  LoadingSpinner3D,
  InteractiveCube3D,
  AnimatedSphere3D
} from './3DUIElements';

const Contact3D = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      title: 'Email',
      value: 'findleytechs@gmail.com',
      icon: '📧',
      color: '#4F46E5',
      action: () => window.open('mailto:findleytechs@gmail.com')
    },
    {
      title: 'LinkedIn',
      value: 'Cael Findley',
      icon: '💼',
      color: '#0077B5',
      action: () => window.open('https://linkedin.com/in/cael-findley', '_blank')
    },
    {
      title: 'GitHub',
      value: 'github.com/caelfindley',
      icon: '🐙',
      color: '#333',
      action: () => window.open('https://github.com/caelfindley', '_blank')
    },
    {
      title: 'Phone',
      value: '+1 (555) 123-4567',
      icon: '📱',
      color: '#25D366',
      action: () => window.open('tel:+15551234567')
    }
  ];

  const skills = [
    { name: 'Frontend', icon: '⚛️', level: 95, color: '#61DAFB' },
    { name: 'Backend', icon: '🚀', level: 90, color: '#339933' },
    { name: 'Cloud', icon: '☁️', level: 85, color: '#FF9900' },
    { name: 'AI/ML', icon: '🤖', level: 82, color: '#FF6B6B' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            <Canvas>
              <LoadingSpinner3D color="#4F46E5" />
            </Canvas>
          </div>
          <p className="text-white text-xl">Sending Message...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
          <Environment preset="night" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <FloatingParticles count={30} color="#4F46E5" />
          
          {/* Title */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group position={[0, 8, 0]}>
              <Text
                fontSize={0.8}
                color="#4F46E5"
                anchorX="center"
                anchorY="middle"
                position={[-3, 0, 0]}
              >
                Get In Touch
              </Text>
            </group>
          </Float>

          {/* Contact Methods */}
          <group position={[0, 5, 0]}>
            {contactMethods.map((method, index) => (
              <Card3D
                key={method.title}
                title={method.title}
                description={method.value}
                icon={method.icon}
                position={[index * 3 - 4.5, 0, 0]}
                color={method.color}
                onClick={method.action}
              />
            ))}
          </group>

          {/* Skills Section */}
          <group position={[0, 0, 0]}>
            {skills.map((skill, index) => (
              <Card3D
                key={skill.name}
                title={skill.name}
                description={`Level ${skill.level}%`}
                icon={skill.icon}
                position={[index * 3 - 4.5, 0, 0]}
                color={skill.color}
              />
            ))}
          </group>

          {/* Interactive 3D Elements */}
          <group position={[0, -4, 0]}>
            <InteractiveCube3D
              position={[-4, 0, 0]}
              color="#FF6B6B"
              onClick={() => window.open('mailto:findleytechs@gmail.com')}
            />
            <AnimatedSphere3D
              position={[0, 0, 0]}
              color="#4ECDC4"
            />
            <InteractiveCube3D
              position={[4, 0, 0]}
              color="#9B59B6"
              onClick={() => window.open('https://github.com/caelfindley', '_blank')}
            />
          </group>

          {/* Back Button */}
          <group position={[0, -8, 0]}>
            <Button3D
              position={[0, 0, 0]}
              onClick={() => setCurrentPage('home')}
              color="#DC2626"
              icon="🏠"
              size={[2.5, 0.5, 0.2]}
            >
              Back to Home
            </Button3D>
          </group>
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ready to work together? Let's discuss your next project!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-lg p-8 backdrop-blur-sm bg-opacity-80">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-4">Thank you for reaching out. I'll get back to you soon!</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 text-white"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-teal-500 text-white resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-8 backdrop-blur-sm bg-opacity-80">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactMethods.map((method) => (
                    <div
                      key={method.title}
                      className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                      onClick={method.action}
                    >
                      <div className="text-2xl mr-4">{method.icon}</div>
                      <div>
                        <h3 className="font-semibold">{method.title}</h3>
                        <p className="text-gray-400">{method.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-8 backdrop-blur-sm bg-opacity-80">
                <h2 className="text-2xl font-bold mb-6">Skills Overview</h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-700 rounded-full h-2 mr-3">
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: skill.color
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg backdrop-blur-sm bg-opacity-80"
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact3D; 