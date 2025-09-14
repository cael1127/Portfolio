import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';

const logic = `// Deterministic transcript for demo purposes
function generateTranscript(){
  return [
    { t: '00:00', speaker: 'A', text: 'Welcome to the demo meeting.' },
    { t: '00:04', speaker: 'B', text: 'Agenda: roadmap and hiring updates.' },
    { t: '00:09', speaker: 'A', text: 'We shipped the analytics module last week.' },
  ];
}
`;

const AudioTranscriptionDemo = () => {
  const [transcript, setTranscript] = useState([]);
  const [openCode, setOpenCode] = useState(false);

  const handleUpload = (e) => {
    // Skip real ASR; emulate deterministic output
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setTranscript([
      { t: '00:00', speaker: 'A', text: 'Welcome to the demo meeting.' },
      { t: '00:04', speaker: 'B', text: 'Agenda: roadmap and hiring updates.' },
      { t: '00:09', speaker: 'A', text: 'We shipped the analytics module last week.' },
    ]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Audio to text (Deterministic)</h3>
        <button onClick={() => setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
      </div>
      <input type="file" accept="audio/*" onChange={handleUpload} className="mb-3 text-sm" />
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        {transcript.length === 0 ? (
          <div className="text-gray-400 text-sm">Upload an audio file to generate a sample transcript.</div>
        ) : (
          <ul className="space-y-2">
            {transcript.map((l, i) => (
              <li key={i} className="text-gray-200 text-sm">
                <span className="text-gray-500 mr-2">[{l.t}]</span>
                <span className="text-emerald-400 mr-2">{l.speaker}:</span>
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <CodeViewer isOpen={openCode} onClose={() => setOpenCode(false)} code={logic} language="javascript" title="Transcript logic" />
    </div>
  );
};

export default AudioTranscriptionDemo;


