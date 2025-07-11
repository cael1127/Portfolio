import React, { useState } from 'react';

const ResumeAnalyzerDemo = () => {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        score: 82,
        strengths: ['Strong technical skills', 'Relevant experience', 'Good use of keywords'],
        suggestions: ['Add more leadership examples', 'Include more quantifiable achievements', 'Tailor summary for target job']
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 rounded-xl p-6 shadow-lg border border-green-700 mt-8">
      <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">AI Resume Analyzer (Demo)</h3>
      <p className="text-gray-300 mb-6 text-center text-sm">Upload your resume and get instant AI-powered feedback. <span className="text-yellow-400">(Demo only, real AI coming soon!)</span></p>
      <div className="flex flex-col gap-4 items-center">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-700 file:text-white hover:file:bg-green-600"
          onChange={handleFileChange}
        />
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium disabled:opacity-50"
          onClick={handleAnalyze}
          disabled={!fileName || loading}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
      {fileName && (
        <div className="mt-4 text-gray-400 text-sm">Selected file: <span className="text-white">{fileName}</span></div>
      )}
      {result && (
        <div className="mt-6 bg-gray-900 rounded-lg p-4 border border-green-800">
          <div className="text-lg font-semibold text-green-400 mb-2">Score: {result.score}%</div>
          <div className="mb-2">
            <span className="font-semibold text-white">Strengths:</span>
            <ul className="list-disc ml-6 text-gray-300">
              {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-white">Suggestions:</span>
            <ul className="list-disc ml-6 text-gray-300">
              {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerDemo; 