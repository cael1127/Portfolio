import React, { useState, useEffect } from 'react';

const DeepfakeDetectionDemo = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    deepfakesDetected: 0,
    accuracy: 96.8
  });

  const sampleImages = [
    { id: 1, name: 'Portrait 1', isDeepfake: false, confidence: 12.3 },
    { id: 2, name: 'Portrait 2', isDeepfake: true, confidence: 87.6 },
    { id: 3, name: 'Portrait 3', isDeepfake: false, confidence: 8.9 },
    { id: 4, name: 'Portrait 4', isDeepfake: true, confidence: 92.1 },
    { id: 5, name: 'Portrait 5', isDeepfake: false, confidence: 15.2 }
  ];

  const analyzeImage = (image) => {
    setIsAnalyzing(true);
    setCurrentImage(image);
    
    // Simulate analysis process
    setTimeout(() => {
      const result = {
        isDeepfake: image.isDeepfake,
        confidence: image.confidence,
        features: [
          'Facial symmetry analysis',
          'Texture consistency check',
          'Lighting pattern analysis',
          'Blending artifact detection',
          'Frequency domain analysis'
        ],
        details: image.isDeepfake ? 
          'Multiple artifacts detected including inconsistent lighting, texture anomalies, and blending issues.' :
          'No significant artifacts detected. Image appears to be authentic.',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      setStats(prev => ({
        ...prev,
        totalAnalyzed: prev.totalAnalyzed + 1,
        deepfakesDetected: prev.deepfakesDetected + (image.isDeepfake ? 1 : 0)
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">🎭 DeepFake Face Detection System</h1>
          <p className="text-gray-300 text-lg">
            Advanced machine learning system for detecting manipulated facial images and videos
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Images Analyzed</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalAnalyzed.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">DeepFakes Detected</h3>
            <p className="text-3xl font-bold text-red-400">{stats.deepfakesDetected}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Detection Accuracy</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.accuracy}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Analysis */}
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <h2 className="text-2xl font-bold text-white mb-6">Image Analysis</h2>
            
            {currentImage ? (
              <div className="mb-6">
                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <p className="text-white font-semibold">{currentImage.name}</p>
                    <p className="text-gray-400 text-sm">Sample Image</p>
                  </div>
                </div>
                
                {isAnalyzing ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
                    <p className="text-green-400">Analyzing image...</p>
                    <p className="text-gray-400 text-sm">Processing facial features and artifacts</p>
                  </div>
                ) : analysisResult ? (
                  <div className={`p-4 rounded-lg border ${
                    analysisResult.isDeepfake 
                      ? 'bg-red-900/50 border-red-600' 
                      : 'bg-green-900/50 border-green-600'
                  }`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">Analysis Result</h3>
                      <div className={`px-3 py-1 rounded text-sm font-medium ${
                        analysisResult.isDeepfake 
                          ? 'bg-red-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {analysisResult.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC'}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-3">{analysisResult.details}</p>
                    <p className="text-sm text-gray-400">Confidence: {analysisResult.confidence}%</p>
                    <p className="text-sm text-gray-400">Analyzed: {analysisResult.timestamp}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">📷</div>
                <p className="text-gray-300">Select an image to analyze</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {sampleImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => analyzeImage(image)}
                  disabled={isAnalyzing}
                  className={`p-3 rounded-lg border transition-colors ${
                    currentImage?.id === image.id
                      ? 'border-green-400 bg-green-900/30'
                      : 'border-gray-600 hover:border-gray-500'
                  } ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">👤</div>
                    <p className="text-white text-sm font-medium">{image.name}</p>
                    <p className="text-gray-400 text-xs">
                      {image.isDeepfake ? 'DeepFake' : 'Authentic'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Details */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <h2 className="text-2xl font-bold text-white mb-6">Detection Features</h2>
            
            {analysisResult ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Features Analyzed</h3>
                  <ul className="space-y-1">
                    {analysisResult.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300 text-sm">
                        <span className="text-blue-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Detection Methods</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Convolutional Neural Networks (CNN)</li>
                    <li>• Frequency domain analysis</li>
                    <li>• Texture consistency checks</li>
                    <li>• Facial landmark analysis</li>
                    <li>• Artifact pattern recognition</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">How It Works</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Our deep learning model analyzes multiple aspects of facial images to detect 
                    manipulation artifacts and inconsistencies that indicate deepfake generation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Key Indicators</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Inconsistent lighting patterns</li>
                    <li>• Texture anomalies</li>
                    <li>• Blending artifacts</li>
                    <li>• Facial symmetry issues</li>
                    <li>• Frequency domain artifacts</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Machine Learning</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• TensorFlow & PyTorch</li>
                <li>• Convolutional Neural Networks</li>
                <li>• Transfer Learning</li>
                <li>• Data Augmentation</li>
                <li>• Model Fine-tuning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Computer Vision</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• OpenCV</li>
                <li>• Image preprocessing</li>
                <li>• Feature extraction</li>
                <li>• Face detection</li>
                <li>• Image segmentation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Backend</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Python Flask/FastAPI</li>
                <li>• GPU acceleration</li>
                <li>• Real-time processing</li>
                <li>• RESTful APIs</li>
                <li>• Docker deployment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetectionDemo; 