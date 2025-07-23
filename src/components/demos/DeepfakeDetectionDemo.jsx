import React, { useState, useEffect } from 'react';
import CodeViewer from '../CodeViewer';

const DeepfakeDetectionDemo = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [stats, setStats] = useState({
    totalAnalyzed: 0,
    deepfakesDetected: 0,
    accuracy: 96.8,
    averageConfidence: 0
  });

  // Sample code for the demo
  const demoCode = `import React, { useState, useEffect } from 'react';
import { analyzeImage } from './deepfakeDetection';

const DeepfakeDetectionDemo = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  
  const analyzeImage = async (imageData) => {
    const result = {
      id: Date.now(),
      imageUrl: imageData.url,
      confidence: Math.random() * 100,
      isDeepfake: Math.random() > 0.7,
      analysisTime: Math.random() * 2000 + 500,
      features: {
        faceConsistency: Math.random() * 100,
        textureAnalysis: Math.random() * 100,
        lightingConsistency: Math.random() * 100,
        geometricAccuracy: Math.random() * 100
      }
    };
    
    setAnalysisResults(prev => [result, ...prev]);
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload and Analysis */}
        <div className="space-y-4">
          <div className="p-4 border-2 border-dashed border-gray-600 rounded-lg">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          
          {currentAnalysis && (
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3>Analysis Results</h3>
              <p>Confidence: {currentAnalysis.confidence.toFixed(1)}%</p>
              <p>Result: {currentAnalysis.isDeepfake ? 'DEEPFAKE' : 'AUTHENTIC'}</p>
            </div>
          )}
        </div>
        
        {/* Analysis History */}
        <div className="space-y-3">
          {analysisResults.map((result) => (
            <div key={result.id} className="p-3 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Image #{result.id}</span>
                <span className={result.isDeepfake ? 'text-red-400' : 'text-green-400'}>
                  {result.isDeepfake ? 'DEEPFAKE' : 'AUTHENTIC'}
                </span>
              </div>
              <p>Confidence: {result.confidence.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeepfakeDetectionDemo;`;

  useEffect(() => {
    // Simulate real-time deepfake analysis
    const interval = setInterval(() => {
      const newAnalysis = {
        id: Date.now(),
        imageUrl: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
        confidence: Math.random() * 100,
        isDeepfake: Math.random() > 0.7, // 30% chance of deepfake
        analysisTime: Math.random() * 2000 + 500,
        timestamp: new Date().toLocaleTimeString(),
        features: {
          faceConsistency: Math.random() * 100,
          textureAnalysis: Math.random() * 100,
          lightingConsistency: Math.random() * 100,
          geometricAccuracy: Math.random() * 100,
          colorGradients: Math.random() * 100,
          noisePatterns: Math.random() * 100
        },
        metadata: {
          imageSize: `${Math.floor(Math.random() * 2000) + 500}x${Math.floor(Math.random() * 1500) + 300}`,
          fileSize: `${(Math.random() * 5 + 0.5).toFixed(1)}MB`,
          format: ['JPEG', 'PNG', 'WebP'][Math.floor(Math.random() * 3)],
          compression: Math.floor(Math.random() * 50) + 50
        }
      };

      setAnalysisResults(prev => [newAnalysis, ...prev.slice(0, 9)]);
      setCurrentAnalysis(newAnalysis);

      // Update stats
      setStats(prev => ({
        totalAnalyzed: prev.totalAnalyzed + 1,
        deepfakesDetected: prev.deepfakesDetected + (newAnalysis.isDeepfake ? 1 : 0),
        accuracy: Math.max(90, prev.accuracy - (Math.random() * 0.2)),
        averageConfidence: (prev.averageConfidence * prev.totalAnalyzed + newAnalysis.confidence) / (prev.totalAnalyzed + 1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getConfidenceColor = (confidence) => {
    if (confidence > 80) return 'text-green-400';
    if (confidence > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence > 80) return 'bg-green-600';
    if (confidence > 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Code Viewer Button */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-green-400 mb-4">🎭 AI Deepfake Detection System</h1>
            <p className="text-gray-300 text-lg">
              Advanced computer vision and machine learning for real-time deepfake detection and analysis
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

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">Images Analyzed</h3>
            <p className="text-3xl font-bold text-green-400">{stats.totalAnalyzed.toLocaleString()}</p>
            <p className="text-green-300 text-sm">Real-time processing</p>
          </div>
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-6 rounded-xl border border-red-800">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="text-xl font-semibold text-white mb-2">Deepfakes Detected</h3>
            <p className="text-3xl font-bold text-red-400">{stats.deepfakesDetected}</p>
            <p className="text-red-300 text-sm">{((stats.deepfakesDetected / stats.totalAnalyzed) * 100).toFixed(1)}% rate</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-2">Detection Accuracy</h3>
            <p className="text-3xl font-bold text-blue-400">{stats.accuracy.toFixed(1)}%</p>
            <p className="text-blue-300 text-sm">ML Model Performance</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-2">Avg Confidence</h3>
            <p className="text-3xl font-bold text-purple-400">{stats.averageConfidence.toFixed(1)}%</p>
            <p className="text-purple-300 text-sm">Analysis confidence</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Analysis */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-green-900 via-teal-800 to-cyan-800 p-6 rounded-xl border border-green-800">
              <h2 className="text-2xl font-bold text-white mb-6">🔍 Live Analysis</h2>
              {currentAnalysis ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Image Display */}
                  <div>
                    <div className="relative">
                      <img 
                        src={currentAnalysis.imageUrl} 
                        alt="Analysis Sample" 
                        className="w-full h-64 object-cover rounded-lg border border-gray-600"
                      />
                      <div className="absolute top-2 right-2">
                        <div className={'px-2 py-1 rounded text-xs font-medium ' + (
                          currentAnalysis.isDeepfake ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                        )}>
                          {currentAnalysis.isDeepfake ? 'DEEPFAKE' : 'AUTHENTIC'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Metadata */}
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Size</p>
                        <p className="text-white font-semibold">{currentAnalysis.metadata.imageSize}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Format</p>
                        <p className="text-white font-semibold">{currentAnalysis.metadata.format}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">File Size</p>
                        <p className="text-white font-semibold">{currentAnalysis.metadata.fileSize}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Compression</p>
                        <p className="text-white font-semibold">{currentAnalysis.metadata.compression}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white mb-2">Analysis Results</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300">Confidence Score</span>
                            <span className={'font-semibold ' + getConfidenceColor(currentAnalysis.confidence)}>
                              {currentAnalysis.confidence.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={'h-2 rounded-full transition-all ' + getConfidenceBg(currentAnalysis.confidence)}
                              style={{ width: currentAnalysis.confidence + '%' }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300">Analysis Time</span>
                            <span className="text-white font-semibold">{currentAnalysis.analysisTime.toFixed(0)}ms</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300">Result</span>
                            <span className={'font-semibold ' + (currentAnalysis.isDeepfake ? 'text-red-400' : 'text-green-400')}>
                              {currentAnalysis.isDeepfake ? 'DEEPFAKE DETECTED' : 'AUTHENTIC IMAGE'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature Analysis */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Feature Analysis</h3>
                      <div className="space-y-2">
                        {Object.entries(currentAnalysis.features).map(([feature, score]) => (
                          <div key={feature}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300 text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="text-white text-sm font-semibold">{score.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full"
                                style={{ width: score + '%' }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔄</div>
                  <p className="text-gray-300">Initializing analysis...</p>
                </div>
              )}
            </div>
          </div>

          {/* Analysis History */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <h2 className="text-2xl font-bold text-white mb-4">📋 Analysis History</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {analysisResults.map((result) => (
                  <div key={result.id} className="bg-blue-800/50 p-3 rounded-lg border border-blue-600">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">Image #{result.id.toString().slice(-4)}</p>
                        <p className="text-blue-200 text-sm">{result.timestamp}</p>
                        <p className={'text-xs font-medium ' + (result.isDeepfake ? 'text-red-400' : 'text-green-400')}>
                          {result.isDeepfake ? 'DEEPFAKE' : 'AUTHENTIC'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={'px-2 py-1 rounded text-xs ' + getConfidenceBg(result.confidence)}>
                          {result.confidence.toFixed(1)}%
                        </div>
                        <p className="text-gray-300 text-xs mt-1">{result.analysisTime.toFixed(0)}ms</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detection Methods */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h2 className="text-2xl font-bold text-white mb-4">🔬 Detection Methods</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Face Consistency</span>
                  <span className="text-white font-semibold">98.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Texture Analysis</span>
                  <span className="text-white font-semibold">94.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Lighting Patterns</span>
                  <span className="text-white font-semibold">96.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Geometric Accuracy</span>
                  <span className="text-white font-semibold">97.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-200">Color Gradients</span>
                  <span className="text-white font-semibold">93.4%</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
              <h2 className="text-2xl font-bold text-white mb-4">⚙️ Analysis Controls</h2>
              <div className="space-y-3">
                <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                  Upload Image
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Batch Analysis
                </button>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Features Section */}
        <div className="mt-8 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
          <h2 className="text-2xl font-bold text-white mb-4">🤖 Advanced AI Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Computer Vision</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Face landmark detection</li>
                <li>• Texture pattern analysis</li>
                <li>• Lighting consistency checks</li>
                <li>• Geometric distortion detection</li>
                <li>• Color gradient analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Machine Learning</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Deep neural networks</li>
                <li>• Transfer learning models</li>
                <li>• Ensemble methods</li>
                <li>• Real-time inference</li>
                <li>• Adaptive learning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Analysis Tools</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Batch processing</li>
                <li>• Confidence scoring</li>
                <li>• Detailed reporting</li>
                <li>• API integration</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      {showCodeViewer && (
        <CodeViewer
          code={demoCode}
          language="jsx"
          title="Deepfake Detection Demo Code"
          onClose={() => setShowCodeViewer(false)}
        />
      )}
    </div>
  );
};

export default DeepfakeDetectionDemo; 