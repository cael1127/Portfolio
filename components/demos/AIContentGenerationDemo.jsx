import React, { useState } from "react";
export default function AIContentGenerationDemo() {
  const [content, setContent] = useState('');
  const [generated, setGenerated] = useState('');
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      setGenerated(data.result || 'Sample AI-generated content.');
    } catch (err) {
      setGenerated('Error generating content.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">AI Content Generator</h3>
      <textarea className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-4" placeholder="Type a prompt..." value={content} onChange={e => setContent(e.target.value)} rows={3} />
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={generateContent} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</button>
      {generated && <div className="mt-4 p-4 bg-gray-700 rounded text-white">{generated}</div>}
    </div>
  );
} 