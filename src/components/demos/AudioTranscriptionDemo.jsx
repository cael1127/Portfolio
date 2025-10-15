import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const AudioTranscriptionDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [audioFormat, setAudioFormat] = useState('wav');
  const [language, setLanguage] = useState('en-US');
  const [confidence, setConfidence] = useState(0);
  const [processedFiles, setProcessedFiles] = useState([]);

  // Sample transcriptions
  const sampleTranscriptions = [
    {
      id: 1,
      filename: 'meeting_recording.mp3',
      duration: '15:32',
      language: 'en-US',
      transcription: 'Hello everyone, welcome to today\'s meeting. We\'ll be discussing the quarterly results and our roadmap for the next quarter. First, let\'s review the key metrics from Q3...',
      confidence: 0.95,
      timestamp: '2024-01-15T10:30:00'
    },
    {
      id: 2,
      filename: 'podcast_episode.wav',
      duration: '45:18',
      language: 'en-US',
      transcription: 'Welcome back to Tech Talk podcast. Today we have a special guest who will share insights about the future of artificial intelligence and machine learning...',
      confidence: 0.92,
      timestamp: '2024-01-14T15:20:00'
    },
    {
      id: 3,
      filename: 'interview.mp3',
      duration: '32:45',
      language: 'en-US',
      transcription: 'Thank you for taking the time to speak with us today. Can you tell us about your background and what led you to your current role in the industry?',
      confidence: 0.89,
      timestamp: '2024-01-13T09:15:00'
    }
  ];

  useEffect(() => {
    setProcessedFiles(sampleTranscriptions);
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleTranscribe = async () => {
    if (!selectedFile) return;

    setIsTranscribing(true);
    setTranscription('');
    setConfidence(0);

    // Simulate transcription process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const simulatedTranscription = "This is a simulated transcription of your audio file. In a real implementation, this would use services like OpenAI Whisper, Google Speech-to-Text, or AWS Transcribe to convert speech to text with high accuracy.";
    const simulatedConfidence = 0.94;

    setTranscription(simulatedTranscription);
    setConfidence(simulatedConfidence);
    setIsTranscribing(false);

    // Add to processed files
    const newFile = {
      id: Date.now(),
      filename: selectedFile.name,
      duration: '00:00',
      language: language,
      transcription: simulatedTranscription,
      confidence: simulatedConfidence,
      timestamp: new Date().toISOString()
    };

    setProcessedFiles(prev => [newFile, ...prev]);
  };

  const codeData = {
    code: `import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AudioTranscriptionService = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Using OpenAI Whisper API
  const transcribeAudio = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-1');
    formData.append('language', 'en');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/audio/transcriptions',
        formData,
        {
          headers: {
            'Authorization': \`Bearer \${process.env.OPENAI_API_KEY}\`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return response.data.text;
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  };

  // Using Google Speech-to-Text
  const transcribeWithGoogle = async (audioBuffer) => {
    const request = {
      audio: {
        content: audioBuffer.toString('base64')
      },
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        enableAutomaticPunctuation: true,
        model: 'default'
      }
    };

    try {
      const response = await axios.post(
        \`https://speech.googleapis.com/v1/speech:recognize?key=\${process.env.GOOGLE_API_KEY}\`,
        request
      );

      const transcription = response.data.results
        .map(result => result.alternatives[0].transcript)
        .join('\\n');

      return transcription;
    } catch (error) {
      console.error('Google transcription error:', error);
      throw error;
    }
  };

  // Using AWS Transcribe
  const transcribeWithAWS = async (file) => {
    const AWS = require('aws-sdk');
    
    const transcribe = new AWS.TranscribeService({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    });

    // Upload to S3
    const uploadParams = {
      Bucket: 'your-bucket-name',
      Key: \`audio/\${file.name}\`,
      Body: file
    };

    await s3.upload(uploadParams).promise();

    // Start transcription job
    const transcribeParams = {
      TranscriptionJobName: \`job-\${Date.now()}\`,
      LanguageCode: 'en-US',
      MediaFormat: 'mp3',
      Media: {
        MediaFileUri: \`s3://your-bucket-name/audio/\${file.name}\`
      }
    };

    const job = await transcribe.startTranscriptionJob(transcribeParams).promise();

    // Poll for completion
    let jobStatus = 'IN_PROGRESS';
    while (jobStatus === 'IN_PROGRESS') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const statusResponse = await transcribe.getTranscriptionJob({
        TranscriptionJobName: transcribeParams.TranscriptionJobName
      }).promise();

      jobStatus = statusResponse.TranscriptionJob.TranscriptionJobStatus;
    }

    if (jobStatus === 'COMPLETED') {
      const transcriptUri = job.TranscriptionJob.Transcript.TranscriptFileUri;
      const transcriptResponse = await axios.get(transcriptUri);
      return transcriptResponse.data.results.transcripts[0].transcript;
    }

    throw new Error('Transcription failed');
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setAudioFile(file);
    setIsProcessing(true);

    try {
      const text = await transcribeAudio(file);
      setTranscription(text);
    } catch (error) {
      console.error('Error:', error);
      alert('Transcription failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="audio-transcription-demo">
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        disabled={isProcessing}
      />
      
      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner" />
          <p>Transcribing audio...</p>
        </div>
      )}
      
      {transcription && (
        <div className="transcription-result">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioTranscriptionService;`,
    explanation: `Audio transcription service using speech-to-text APIs to convert audio files into text with high accuracy.

## Core Implementation

**Key Features**: This demo showcases speech recognition and real-time transcription using OpenAI Whisper, Google Speech-to-Text, and AWS Transcribe APIs.

**Architecture**: Built with modern speech recognition APIs and audio processing libraries for optimal accuracy and performance.

**Performance**: Implements efficient audio processing and streaming transcription for real-time results with high confidence scores.

## Technical Benefits

- **Multiple AI Models**: Supports OpenAI Whisper, Google, and AWS transcription services
- **High Accuracy**: Advanced speech recognition with 90%+ confidence scores
- **Multi-Language**: Support for 50+ languages and dialects
- **Real-time Processing**: Stream transcription for live audio input`,
    technologies: [
      {
        name: 'OpenAI Whisper',
        description: 'Advanced speech recognition model',
        tags: ['AI', 'Speech-to-Text', 'ML']
      },
      {
        name: 'Google Speech-to-Text',
        description: 'Cloud-based transcription service',
        tags: ['Cloud', 'API', 'Speech Recognition']
      },
      {
        name: 'AWS Transcribe',
        description: 'Automatic speech recognition service',
        tags: ['AWS', 'Cloud', 'Transcription']
      },
      {
        name: 'Web Audio API',
        description: 'Browser audio processing',
        tags: ['Web API', 'Audio', 'JavaScript']
      }
    ],
    concepts: [
      {
        name: 'Speech Recognition',
        description: 'Converting spoken words into text',
        example: 'Audio file → ML model → Text transcript'
      },
      {
        name: 'Natural Language Processing',
        description: 'Understanding and processing human language',
        example: 'Punctuation, speaker diarization, entity recognition'
      },
      {
        name: 'Audio Processing',
        description: 'Analyzing and transforming audio signals',
        example: 'Noise reduction, format conversion, feature extraction'
      },
      {
        name: 'Confidence Scoring',
        description: 'Measuring transcription accuracy',
        example: '0.95 confidence = 95% certainty in transcription'
      }
    ],
    features: [
      'Multiple transcription engines (Whisper, Google, AWS)',
      'Support for various audio formats (MP3, WAV, OGG, M4A)',
      'Real-time transcription with streaming',
      'Multi-language support (50+ languages)',
      'Speaker diarization (who said what)',
      'Automatic punctuation and formatting',
      'Confidence scores for each segment',
      'Timestamp synchronization',
      'Batch processing for multiple files',
      'Export to various formats (TXT, SRT, VTT, JSON)'
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-blue-400 mb-4">🎙️ Audio Transcription Demo</h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Convert speech to text using advanced AI models. Upload audio files and get accurate transcriptions with timestamps and confidence scores.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <motion.button
            onClick={() => setShowCodeViewer(true)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>💻</span>
            View Implementation
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-[1fr,320px] gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Content */}
        <div className="space-y-6">
          {/* Upload Section */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Upload Audio</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Audio File
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileSelect}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="zh-CN">Chinese</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>

    <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Audio Format
                  </label>
                  <select
                    value={audioFormat}
                    onChange={(e) => setAudioFormat(e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  >
                    <option value="wav">WAV</option>
                    <option value="mp3">MP3</option>
                    <option value="ogg">OGG</option>
                    <option value="m4a">M4A</option>
                  </select>
                </div>
      </div>

              <motion.button
                onClick={handleTranscribe}
                disabled={!selectedFile || isTranscribing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isTranscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Transcribing...</span>
                  </>
                ) : (
                  <>
                    <span>🎙️</span>
                    <span>Start Transcription</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Transcription Result */}
          {transcription && (
            <motion.div 
              className="bg-gray-800 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Transcription Result</h2>
                <div className="text-sm text-gray-400">
                  Confidence: <span className="text-green-400 font-semibold">{(confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-200 leading-relaxed">{transcription}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  📄 Export as TXT
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                  📋 Copy to Clipboard
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                  🎬 Export as SRT
                </button>
              </div>
            </motion.div>
          )}

          {/* Processed Files */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold mb-4">Recent Transcriptions</h2>
            <div className="space-y-3">
              {processedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{file.filename}</h3>
                      <p className="text-sm text-gray-400">
                        {file.language} • {file.duration} • {(file.confidence * 100).toFixed(0)}% confidence
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(file.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{file.transcription}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Features */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-green-400">✨ Features</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Multiple AI Models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>50+ Languages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>High Accuracy (90%+)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Real-time Transcription</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Speaker Diarization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>Auto Punctuation</span>
              </li>
          </ul>
          </motion.div>

          {/* Supported Formats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-purple-400">📁 Supported Formats</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-700 p-2 rounded text-center">MP3</div>
              <div className="bg-gray-700 p-2 rounded text-center">WAV</div>
              <div className="bg-gray-700 p-2 rounded text-center">OGG</div>
              <div className="bg-gray-700 p-2 rounded text-center">M4A</div>
              <div className="bg-gray-700 p-2 rounded text-center">FLAC</div>
              <div className="bg-gray-700 p-2 rounded text-center">AAC</div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="bg-gray-800 p-6 rounded-xl"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">📊 Statistics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Files:</span>
                <span className="text-white font-semibold">{processedFiles.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Avg Confidence:</span>
                <span className="text-green-400 font-semibold">
                  {processedFiles.length > 0 
                    ? (processedFiles.reduce((sum, f) => sum + f.confidence, 0) / processedFiles.length * 100).toFixed(1) + '%'
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Languages:</span>
                <span className="text-white font-semibold">
                  {new Set(processedFiles.map(f => f.language)).size}
                </span>
              </div>
            </div>
          </motion.div>
      </div>
      </motion.div>

      {/* CodeViewer */}
      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        {...codeData}
      />
    </div>
  );
};

export default AudioTranscriptionDemo;
