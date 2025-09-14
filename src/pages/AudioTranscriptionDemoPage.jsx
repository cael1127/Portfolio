import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import Reveal from '../components/Reveal';
import CaseStudy from '../components/CaseStudy';
import ProjectThumb from '../components/ProjectThumb';
import DemoReadme from '../components/DemoReadme';
import AudioTranscriptionDemo from '../components/demos/AudioTranscriptionDemo';

const AudioTranscriptionDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Audio Transcription"
      subtitle="Audio-to-text with timestamps"
      emoji="🎙️"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'E-commerce Storefront', onClick: () => setCurrentPage('ecommerce-demo') }}
    >
      <Reveal>
        <ProjectThumb emoji="🎙️" accent="#06b6d4" />
        <AudioTranscriptionDemo />
      </Reveal>
      <Reveal delay={150}>
        <CaseStudy
          overview="Automatic speech recognition with timestamps and speaker diarization."
          role="Frontend, API integration, UX."
          stack={["ASR", "React", "Node.js"]}
          challenges={["Noisy input", "Accurate timestamps"]}
          results={["Readable transcript", "SRT export"]}
        />
      </Reveal>
      <Reveal delay={250}>
        <DemoReadme
          problem="Convert audio to text with timestamps for rapid review and export."
          approach="Mock deterministic output to showcase diarization, timestamps, and export-friendly text."
          highlights={["Upload input", "Deterministic transcript", "SRT-ready formatting"]}
        />
      </Reveal>
    </ProjectLayout>
  );
};

export default AudioTranscriptionDemoPage;


