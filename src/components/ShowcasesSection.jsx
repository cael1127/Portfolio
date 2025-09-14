import React from 'react';

const items = [
  { id: 'rag-chatbot-demo', title: 'RAG Chatbot', emoji: '💬', blurb: 'Context-aware assistant with source grounding.' },
  { id: 'smart-city-demo', title: 'Smart City', emoji: '🏙️', blurb: 'Real-time telemetry for traffic and energy.' },
  { id: 'whiteboard-demo', title: 'Whiteboard', emoji: '🖼️', blurb: 'Latency-optimized collaborative canvas.' },
  { id: 'blockchain-demo', title: 'Blockchain Supply', emoji: '🔗', blurb: 'On-chain transparency for supply chains.' },
  { id: 'resume-analyzer-demo', title: 'Resume Analyzer', emoji: '📄', blurb: 'NLP-powered skill extraction and scoring.' },
  { id: 'aquaculture-demo', title: 'Aquaculture', emoji: '🌊', blurb: 'IoT sensor monitoring with predictive alerts.' },
];

const ShowcasesSection = ({ onOpen }) => {
  return (
    <div className="container mx-auto px-4 py-12 border-t border-gray-800">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Showcases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <div key={it.id} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-colors">
            <div className="flex items-center justify-between mb-8">
              <div className="text-3xl">{it.emoji}</div>
              <div className="text-gray-500">→</div>
            </div>
            <h3 className="text-lg font-semibold mb-1">{it.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{it.blurb}</p>
            <button
              onClick={() => onOpen && onOpen(it.id)}
              className="text-primary hover:text-emerald-300 text-sm font-semibold"
            >
              View case →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowcasesSection;


