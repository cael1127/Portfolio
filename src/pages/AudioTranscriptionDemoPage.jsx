import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import AudioTranscriptionDemo from '../components/demos/AudioTranscriptionDemo';

const AudioTranscriptionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Audio Transcription"
      subtitle="Audio-to-text with timestamps"
      emoji="🎙️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'E-commerce Storefront', onClick: () => setCurrentPage('ecommerce-demo') }}
      demo={<AudioTranscriptionDemo />}
      overview="Advanced audio transcription system that converts speech to text with precise timestamps and speaker identification. The system handles various audio formats and provides export capabilities for different use cases including meeting transcripts, interviews, and content creation."
      role="Full-stack development, API integration, audio processing, and user experience design"
      stack={["Web Audio API", "Speech Recognition", "React", "Node.js", "FFmpeg", "WebRTC"]}
      challenges={[
        "Handling various audio formats and quality levels",
        "Achieving accurate timestamp synchronization",
        "Implementing speaker diarization",
        "Managing large audio file processing"
      ]}
      results={[
        "Real-time transcription with 95%+ accuracy",
        "Precise timestamp generation",
        "Speaker identification and separation",
        "Multiple export formats (SRT, VTT, TXT)"
      ]}
      problem="Create an audio transcription system that can accurately convert speech to text with precise timestamps and speaker identification, suitable for meeting recordings, interviews, and content creation workflows."
      approach="Implemented a deterministic demo that showcases the transcription workflow without requiring actual audio processing. Used realistic sample data to demonstrate timestamp accuracy, speaker diarization, and export formatting capabilities."
      highlights={[
        "File upload with drag-and-drop interface",
        "Real-time transcription display",
        "Speaker identification with color coding",
        "Timestamp precision to the second",
        "Export functionality for multiple formats",
        "Responsive design for mobile and desktop"
      ]}
    />
  );
};

export default AudioTranscriptionDemoPage;


