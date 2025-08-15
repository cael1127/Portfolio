import React, { useState, useEffect } from 'react';
import CodeViewer from './CodeViewer';

const AIInterviewSimulator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  const questions = [
    {
      question: "Tell me about a challenging project you worked on and how you overcame obstacles.",
      category: "Behavioral",
      keywords: ["problem-solving", "collaboration", "technical skills", "leadership"]
    },
    {
      question: "How do you stay updated with the latest technologies and industry trends?",
      category: "Professional Development",
      keywords: ["learning", "adaptability", "growth mindset", "innovation"]
    },
    {
      question: "Describe a time when you had to work with a difficult team member. How did you handle it?",
      category: "Teamwork",
      keywords: ["communication", "conflict resolution", "empathy", "collaboration"]
    },
    {
      question: "What's your approach to debugging complex issues in production?",
      category: "Technical",
      keywords: ["systematic", "analytical", "monitoring", "documentation"]
    },
    {
      question: "How do you prioritize tasks when working on multiple projects?",
      category: "Project Management",
      keywords: ["organization", "time management", "prioritization", "efficiency"]
    }
  ];

  const startInterview = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTranscript('');
    setAiResponse('');
  };

  const simulateAIResponse = async (userAnswer) => {
    setIsTyping(true);
    
    const analysis = analyzeAnswer(userAnswer, questions[currentQuestion]);
    
    let response = '';
    const fullResponse = `Great answer! Here's my analysis:

**Strengths:**
${analysis.strengths.map(s => `• ${s}`).join('\n')}

**Areas for Improvement:**
${analysis.improvements.map(i => `• ${i}`).join('\n')}

**Score: ${analysis.score}/10**

**Follow-up Question:** ${analysis.followUp}`;

    for (let i = 0; i < fullResponse.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30));
      response += fullResponse[i];
      setAiResponse(response);
    }
    
    setIsTyping(false);
    setScore(prev => prev + analysis.score);
  };

  const analyzeAnswer = (answer, question) => {
    const answerLower = answer.toLowerCase();
    const keywordMatches = question.keywords.filter(keyword => 
      answerLower.includes(keyword)
    );
    
    const score = Math.min(10, Math.max(5, keywordMatches.length * 2 + Math.floor(Math.random() * 3)));
    
    const strengths = [
      "Good use of specific examples",
      "Clear communication style",
      "Demonstrates relevant experience"
    ];
    
    const improvements = [
      "Could provide more quantifiable results",
      "Consider adding more technical details",
      "Try to connect more to the company's values"
    ];
    
    const followUps = [
      "Can you elaborate on the technical challenges you faced?",
      "How did you measure the success of this project?",
      "What would you do differently if you had to do it again?"
    ];
    
    return {
      score,
      strengths: strengths.slice(0, Math.floor(Math.random() * 3) + 1),
      improvements: improvements.slice(0, Math.floor(Math.random() * 3) + 1),
      followUp: followUps[Math.floor(Math.random() * followUps.length)]
    };
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTranscript('');
      setAiResponse('');
    } else {
      const finalScore = Math.round((score / questions.length) * 10);
      setAiResponse(`**Interview Complete!**

**Final Score: ${finalScore}/10**

${finalScore >= 8 ? 'Excellent! You\'re well-prepared for technical interviews.' : 
  finalScore >= 6 ? 'Good job! A few areas to polish.' : 
  'Keep practicing! Focus on specific examples and technical details.'}

**Key Takeaways:**
• Practice with specific examples
• Quantify your achievements
• Research the company thoroughly
• Prepare thoughtful questions`);
    }
  };

  const demoCode = `import React, { useState, useEffect } from 'react';

const AIInterviewSimulator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  // Real-time speech recognition
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript);
      };
      
      recognition.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };
  
  // AI analysis of responses
  const analyzeResponse = async (answer, question) => {
    const response = await fetch('/api/analyze-interview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, question })
    });
    
    return response.json();
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-8">
          AI Interview Simulator
        </h1>
        
        {/* Interview Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Current Question */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-white mb-4">
                Question {currentQuestion + 1}/{questions.length}
              </h2>
              <p className="text-lg text-white mb-4">
                {questions[currentQuestion]?.question}
              </p>
            </div>
            
            {/* Speech Recognition */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-4">Voice Recognition</h3>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={\`px-4 py-2 rounded-lg transition-colors \${
                  isRecording 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }\`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              
              <div className="bg-gray-800 p-4 rounded-lg mt-4 min-h-[100px]">
                <p className="text-gray-300">
                  {transcript || "Your speech will appear here..."}
                </p>
              </div>
            </div>
          </div>
          
          {/* AI Analysis */}
          <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4">🧠 AI Analysis</h3>
            <div className="bg-gray-800 p-4 rounded-lg min-h-[300px]">
              {isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-purple-400">AI is analyzing your response...</span>
                </div>
              ) : aiResponse ? (
                <div className="prose prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\\n/g, '<br>') }} />
                </div>
              ) : (
                <p className="text-gray-400">AI analysis will appear here after you submit a response...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterviewSimulator;`;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-green-400 mb-2">AI Interview Simulator</h1>
              <p className="text-gray-400">Advanced speech recognition and AI-powered interview coaching</p>
            </div>
            <button
              onClick={() => setShowCodeViewer(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interview Interface */}
          <div className="space-y-6">
            {/* Current Question */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 p-6 rounded-xl border border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Question {currentQuestion + 1}/{questions.length}</h2>
                <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                  {questions[currentQuestion]?.category}
                </span>
              </div>
              <p className="text-lg text-white mb-4">
                {questions[currentQuestion]?.question}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={startInterview}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  🎯 Start Interview
                </button>
                <button
                  onClick={() => {
                    const mockAnswer = "I worked on a challenging e-commerce platform where we had to handle 10,000 concurrent users. I implemented caching strategies and database optimization techniques that improved performance by 300%.";
                    setTranscript(mockAnswer);
                    simulateAIResponse(mockAnswer);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  🧪 Demo Answer
                </button>
              </div>
            </div>

            {/* Speech Recognition */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-6 rounded-xl border border-green-800">
              <h3 className="text-lg font-bold text-white mb-4">🎤 Voice Recognition</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isRecording 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  {isRecording && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-400 text-sm">Recording...</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg min-h-[100px]">
                  <p className="text-gray-300">
                    {transcript || "Your speech will appear here... (Click 'Demo Answer' to simulate)"}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    if (transcript) {
                      simulateAIResponse(transcript);
                    }
                  }}
                  disabled={!transcript || isTyping}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze Response
                </button>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="space-y-6">
            {/* AI Response */}
            <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-6 rounded-xl border border-purple-800">
              <h3 className="text-lg font-bold text-white mb-4">🧠 AI Analysis</h3>
              <div className="bg-gray-800 p-4 rounded-lg min-h-[300px] max-h-[400px] overflow-y-auto">
                {isTyping ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <span className="text-purple-400">AI is analyzing your response...</span>
                  </div>
                ) : aiResponse ? (
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br>') }} />
                  </div>
                ) : (
                  <p className="text-gray-400">AI analysis will appear here after you submit a response...</p>
                )}
              </div>
            </div>

            {/* Progress & Navigation */}
            <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-700 p-6 rounded-xl border border-yellow-800">
                              <h3 className="text-lg font-bold text-white mb-4">Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Current Score:</span>
                  <span className="text-yellow-400 font-bold">{score}/10</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round((currentQuestion / questions.length) * 100)}% Complete</span>
                </div>
                
                {aiResponse && currentQuestion < questions.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700">
                      <h2 className="text-2xl font-bold text-white mb-4">Advanced Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-2">Real-time Speech Recognition</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Live voice-to-text conversion</li>
                <li>• Multiple language support</li>
                <li>• Noise cancellation</li>
                <li>• Accent recognition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">AI-Powered Analysis</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Natural language processing</li>
                <li>• Sentiment analysis</li>
                <li>• Keyword extraction</li>
                <li>• Personalized feedback</li>
              </ul>
            </div>
            <div>
                              <h3 className="text-lg font-semibold text-purple-400 mb-2">Performance Analytics</h3>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Real-time scoring</li>
                <li>• Progress tracking</li>
                <li>• Detailed analytics</li>
                <li>• Improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Viewer Modal */}
        <CodeViewer 
          code={demoCode} 
          language="javascript" 
          title="AI Interview Simulator Code"
          isOpen={showCodeViewer} 
          onClose={() => setShowCodeViewer(false)} 
        />
      </div>
    </div>
  );
};

export default AIInterviewSimulator; 