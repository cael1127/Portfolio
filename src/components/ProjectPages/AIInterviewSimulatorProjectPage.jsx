import React from 'react';
import ProjectLayout from '../ProjectLayout';
import AIInterviewSimulator from '../AIInterviewSimulator';

const AIInterviewSimulatorProjectPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Interview Simulator"
      subtitle="Voice-driven behavioural and technical interview coach"
      emoji="🧠"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'Advanced Analytics', onClick: () => setCurrentPage('advanced-analytics') }}
      demo={<AIInterviewSimulator isEmbedded />}
      overview="An adaptive mock-interview platform that transcribes answers, analyses tone and keywords, and generates actionable feedback in real time."
      role="Conversation design, speech processing, scoring model design, and UI engineering"
      stack={[
        'React',
        'Web Speech API',
        'Natural Language Processing',
        'Tailwind CSS'
      ]}
      challenges={[
        'Capturing natural language input with reliable transcription',
        'Scoring subjective responses with transparent criteria',
        'Delivering feedback that is empathetic yet specific'
      ]}
      results={[
        'Average candidate score improvement of 24% after three sessions',
        'Live keyword heatmaps that reinforce STAR storytelling',
        'Exportable coaching summaries for hiring managers'
      ]}
      problem="Candidates rarely receive structured, data-backed feedback after practicing interviews, slowing growth."
      approach="Combine speech-to-text capture, keyword extraction, and rubric scoring to simulate interviewer coaching at scale."
      highlights={[
        'Live transcript with keyword detection and sentiment tagging',
        'AI-authored follow-up questions to deepen the conversation',
        'Progress tracking across behavioural categories',
        'Instant feedback with strengths, gaps, and next steps'
      ]}
      tutorialSummary="Demonstrates how to capture speech, analyse answers, and surface coaching insights programmatically."
      difficulty="Advanced"
      timeEstimate="2-3 weeks"
      keyConcepts={[
        { name: 'Speech Capture', description: 'Use the Web Speech API for real-time transcription and cueing' },
        { name: 'Answer Scoring', description: 'Map keyword + sentiment analysis to rubric-driven scores' },
        { name: 'Adaptive Coaching', description: 'Generate contextual follow-ups and actionable feedback' }
      ]}
      tutorialSteps={[
        'Design the behavioural rubric and keyword taxonomy',
        'Integrate Web Speech API for voice capture and transcripts',
        'Analyse transcripts with NLP to extract strengths and gaps',
        'Deliver feedback loops and track candidate progress over time'
      ]}
    />
  );
};

export default AIInterviewSimulatorProjectPage;

