import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import SentimentAnalysisDemo from '../components/demos/SentimentAnalysisDemo';

const SentimentAnalysisDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="Sentiment Analysis with Transformers"
      subtitle="Advanced sentiment analysis using VADER, Transformers, and NLTK"
      emoji="😊"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'RAG Chatbot', onClick: () => setCurrentPage('rag-chatbot-demo') }}
      demo={<SentimentAnalysisDemo />}
      overview="Advanced sentiment analysis system that uses multiple NLP techniques including VADER, Transformer models, and NLTK to analyze text sentiment. Provides detailed sentiment scores, emotion detection, and comprehensive text analysis with high accuracy."
      role="NLP engineering, sentiment analysis model integration, text processing pipeline development, and analysis dashboard implementation"
      stack={["Python", "Transformers", "NLTK", "VADER", "React", "NLP", "Text Analysis"]}
      challenges={[
        "Integrating multiple sentiment analysis models",
        "Handling context and sarcasm in text analysis",
        "Processing large volumes of text efficiently",
        "Providing accurate sentiment scores across different text types"
      ]}
      results={[
        "High-accuracy sentiment analysis with multiple models",
        "Detailed sentiment breakdowns and emotion detection",
        "Real-time text analysis and processing",
        "Comprehensive sentiment visualization",
        "Support for multiple text analysis techniques"
      ]}
      problem="Organizations need accurate sentiment analysis to understand customer feedback, social media sentiment, and text data. Single-model approaches often miss nuances, and context-aware analysis is challenging."
      approach="Built a comprehensive sentiment analysis system combining VADER for rule-based analysis, Transformer models for deep learning-based analysis, and NLTK for text processing. Created a unified interface that leverages the strengths of each approach."
      highlights={[
        "Multi-model sentiment analysis (VADER, Transformers, NLTK)",
        "Detailed sentiment scoring and emotion detection",
        "Real-time text analysis and processing",
        "Comprehensive sentiment visualization and breakdowns",
        "Context-aware sentiment analysis",
        "Support for various text types and languages"
      ]}
      tutorialSummary="Build an advanced sentiment analysis system using VADER, Transformers, and NLTK. Learn how to combine multiple NLP techniques for accurate text sentiment analysis."
      difficulty="Intermediate"
      timeEstimate="1-2 weeks"
      keyConcepts={[
        { name: "VADER", description: "Rule-based sentiment analysis tool" },
        { name: "Transformers", description: "Deep learning models for NLP" },
        { name: "NLTK", description: "Natural Language Toolkit for text processing" },
        { name: "Sentiment Scoring", description: "Quantifying text sentiment" }
      ]}
      tutorialSteps={[
        "Set up NLP libraries and models",
        "Implement VADER sentiment analysis",
        "Integrate Transformer-based sentiment models",
        "Create text processing pipeline with NLTK",
        "Build sentiment visualization and analysis dashboard"
      ]}
    />
  );
};

export default SentimentAnalysisDemoPage;