import React, { useState } from 'react';

const TrendingProjects = ({ setCurrentPage }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const trendingProjects = [
    {
      id: 1,
      title: "UPI Fraud Detection Using Machine Learning",
      emoji: "🔍",
      description: "Develop a system to identify and prevent fraudulent transactions in real-time using machine learning algorithms.",
      features: [
        "Real-time transaction monitoring",
        "ML-based fraud detection algorithms",
        "Pattern recognition and anomaly detection",
        "Automated alert system",
        "Transaction risk scoring"
      ],
      technologies: ["Python", "TensorFlow", "Scikit-learn", "PostgreSQL", "Redis"],
      difficulty: "Advanced",
      demoPage: "fraud-detection"
    },
    {
      id: 2,
      title: "DeepFake Face Detection Using Machine Learning",
      emoji: "🎭",
      description: "Create a model to detect manipulated facial images and videos, enhancing digital media authenticity.",
      features: [
        "Image and video analysis",
        "Deep learning-based detection",
        "Real-time processing",
        "Accuracy metrics and validation",
        "API for integration"
      ],
      technologies: ["Python", "OpenCV", "TensorFlow", "PyTorch", "Flask"],
      difficulty: "Advanced",
      demoPage: "deepfake-detection"
    },
    {
      id: 3,
      title: "AI-Based Learning Assistant Using Machine Learning",
      emoji: "🤖",
      description: "Design an intelligent assistant that personalizes learning experiences based on student interactions.",
      features: [
        "Personalized learning paths",
        "Adaptive content delivery",
        "Progress tracking and analytics",
        "Natural language processing",
        "Recommendation engine"
      ],
      technologies: ["Python", "NLP", "TensorFlow", "React", "MongoDB"],
      difficulty: "Intermediate",
      demoPage: "ai-learning-assistant"
    },
    {
      id: 4,
      title: "Disaster Management with Sentiment and Earthquake/Tsunami Prediction",
      emoji: "🌊",
      description: "Implement a system that analyzes social media sentiments and predicts natural disasters using machine learning.",
      features: [
        "Social media sentiment analysis",
        "Geographic data processing",
        "Real-time monitoring",
        "Early warning system",
        "Emergency response coordination"
      ],
      technologies: ["Python", "NLTK", "TensorFlow", "PostGIS", "Socket.IO"],
      difficulty: "Advanced",
      demoPage: "disaster-prediction"
    },
    {
      id: 5,
      title: "Prediction of Electronic Gadget Addiction of Students",
      emoji: "📱",
      description: "Develop a predictive model to assess and address gadget addiction among students.",
      features: [
        "Usage pattern analysis",
        "Behavioral prediction models",
        "Intervention recommendations",
        "Progress tracking",
        "Parent/teacher dashboard"
      ],
      technologies: ["Python", "Scikit-learn", "React", "Node.js", "MongoDB"],
      difficulty: "Intermediate",
      demoPage: "gadget-addiction-prediction"
    },
    {
      id: 6,
      title: "FutureCrop: AI-Powered Price Prediction for Agri and Vegetable Markets",
      emoji: "🌾",
      description: "Create a tool that forecasts agricultural product prices to aid farmers in decision-making.",
      features: [
        "Price trend analysis",
        "Weather data integration",
        "Market demand prediction",
        "Crop yield forecasting",
        "Mobile app for farmers"
      ],
      technologies: ["Python", "TensorFlow", "React Native", "PostgreSQL", "Redis"],
      difficulty: "Intermediate",
      demoPage: "crop-price-prediction"
    },
    {
      id: 7,
      title: "Smart Career Advisor: A Machine Learning-Based Recommendation System",
      emoji: "💼",
      description: "Design a system that suggests career paths based on individual skills and interests.",
      features: [
        "Skill assessment algorithms",
        "Career path recommendations",
        "Job market analysis",
        "Learning path suggestions",
        "Progress tracking"
      ],
      technologies: ["Python", "Scikit-learn", "React", "Node.js", "MongoDB"],
      difficulty: "Intermediate",
      demoPage: "career-advisor"
    },
    {
      id: 8,
      title: "Flood and Landslide Prediction Using Machine Learning",
      emoji: "🌧️",
      description: "Build a model to predict natural calamities, aiding in timely evacuations and resource allocation.",
      features: [
        "Weather data analysis",
        "Geographic risk assessment",
        "Real-time monitoring",
        "Evacuation planning",
        "Resource optimization"
      ],
      technologies: ["Python", "TensorFlow", "PostGIS", "React", "Socket.IO"],
      difficulty: "Advanced",
      demoPage: "flood-prediction"
    },
    {
      id: 9,
      title: "Blood Group Detection Using Image Processing and Fingerprint",
      emoji: "🩸",
      description: "Develop a system that determines blood groups through image analysis of fingerprints.",
      features: [
        "Image processing algorithms",
        "Fingerprint analysis",
        "Blood group classification",
        "High accuracy detection",
        "Medical compliance"
      ],
      technologies: ["Python", "OpenCV", "TensorFlow", "Flask", "PostgreSQL"],
      difficulty: "Advanced",
      demoPage: "blood-group-detection"
    },
    {
      id: 10,
      title: "Alzheimer's Disease Detection Using Machine Learning",
      emoji: "🧠",
      description: "Create a diagnostic tool that identifies early signs of Alzheimer's disease through data analysis.",
      features: [
        "Medical data analysis",
        "Early detection algorithms",
        "Risk assessment models",
        "Patient monitoring",
        "Healthcare integration"
      ],
      technologies: ["Python", "TensorFlow", "Scikit-learn", "React", "HIPAA"],
      difficulty: "Advanced",
      demoPage: "alzheimers-detection"
    },
    {
      id: 11,
      title: "Food Recognition and Calorie Estimation Using Machine Learning",
      emoji: "🍎",
      description: "Design an application that recognizes food items and estimates their caloric content for dietary monitoring.",
      features: [
        "Food image recognition",
        "Calorie estimation",
        "Nutritional analysis",
        "Diet tracking",
        "Health recommendations"
      ],
      technologies: ["Python", "TensorFlow", "OpenCV", "React Native", "MongoDB"],
      difficulty: "Intermediate",
      demoPage: "food-recognition"
    },
    {
      id: 12,
      title: "Cyberbullying Prediction Using Machine Learning",
      emoji: "🛡️",
      description: "Develop a model to detect and prevent cyberbullying incidents on digital platforms.",
      features: [
        "Text analysis and classification",
        "Real-time monitoring",
        "Sentiment analysis",
        "Automated moderation",
        "Safety alerts"
      ],
      technologies: ["Python", "NLTK", "TensorFlow", "React", "Socket.IO"],
      difficulty: "Intermediate",
      demoPage: "cyberbullying-detection"
    },
    {
      id: 13,
      title: "Diabetic Retinopathy Prediction Using Machine Learning",
      emoji: "👁️",
      description: "Create a system that analyzes retinal images to predict the onset of diabetic retinopathy.",
      features: [
        "Medical image analysis",
        "Disease prediction",
        "High accuracy detection",
        "Healthcare integration",
        "Patient monitoring"
      ],
      technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "HIPAA"],
      difficulty: "Advanced",
      demoPage: "diabetic-retinopathy"
    },
    {
      id: 14,
      title: "AI-Based Multi-Disease Detection Using Machine Learning",
      emoji: "🏥",
      description: "Implement a comprehensive diagnostic tool that identifies multiple diseases from patient data.",
      features: [
        "Multi-disease classification",
        "Medical data analysis",
        "Risk assessment",
        "Treatment recommendations",
        "Healthcare integration"
      ],
      technologies: ["Python", "TensorFlow", "Scikit-learn", "React", "HIPAA"],
      difficulty: "Advanced",
      demoPage: "multi-disease-detection"
    },
    {
      id: 15,
      title: "Employee Layoff Prediction Using Recurrent Neural Network",
      emoji: "📊",
      description: "Design a predictive model that assesses the likelihood of employee layoffs based on organizational data.",
      features: [
        "Employee data analysis",
        "Risk assessment models",
        "Performance metrics",
        "Predictive analytics",
        "HR dashboard"
      ],
      technologies: ["Python", "TensorFlow", "RNN", "React", "PostgreSQL"],
      difficulty: "Advanced",
      demoPage: "layoff-prediction"
    }
  ];

  return (
    <div className="bg-gray-800/60 p-8 rounded-xl mb-12">
      <h2 className="text-3xl font-bold text-white mb-8">Trending Computer Science Projects 2025</h2>
      <p className="text-gray-300 mb-8 text-lg">
        Explore the most sought-after computer science projects that combine cutting-edge technologies 
        with real-world applications. Perfect for students looking to build impressive portfolios.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-lg border border-green-800 hover:border-green-700 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{project.emoji}</div>
                              <span className={'px-2 py-1 rounded text-xs font-medium ' + (
                project.difficulty === 'Advanced' ? 'bg-red-600 text-white' :
                project.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                'bg-green-600 text-white'
              )}>
                {project.difficulty}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="mb-4">
              <h4 className="text-green-400 font-semibold text-sm mb-2">Key Features:</h4>
              <ul className="space-y-1 text-xs text-gray-300">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-400 mr-2">•</span>
                    {feature}
                  </li>
                ))}
                {project.features.length > 3 && (
                  <li className="text-green-400 text-xs">+{project.features.length - 3} more features</li>
                )}
              </ul>
            </div>
            
            <div className="mb-4">
              <h4 className="text-green-400 font-semibold text-sm mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPage(project.demoPage);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
              >
                Try Demo
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className="text-green-400 text-sm hover:text-green-300 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedProject.emoji}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                    <span className={'px-3 py-1 rounded text-sm font-medium ' + (
                      selectedProject.difficulty === 'Advanced' ? 'bg-red-600 text-white' :
                      selectedProject.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    )}>
                      {selectedProject.difficulty} Level
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {selectedProject.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-3 mt-1">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-green-600 text-white px-3 py-2 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 mt-6">Learning Outcomes</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Machine Learning and AI concepts</li>
                    <li>• Data preprocessing and analysis</li>
                    <li>• Model training and evaluation</li>
                    <li>• Real-world problem solving</li>
                    <li>• Industry-standard technologies</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => {
                    setCurrentPage(selectedProject.demoPage);
                    setSelectedProject(null);
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Try Live Demo
                </button>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingProjects; 