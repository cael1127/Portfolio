import React, { useState } from "react";
export default function BlockchainGovernanceDemo() {
  const [proposal, setProposal] = useState('');
  const [voting, setVoting] = useState(false);
  const [result, setResult] = useState(null);
  const submitProposal = async () => {
    setVoting(true);
    try {
      const res = await fetch('http://localhost:4000/api/submit-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proposal })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ message: 'Error submitting proposal.' });
    }
    setVoting(false);
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">DAO Proposal Submission</h3>
      <textarea className="w-full px-3 py-2 rounded bg-gray-800 text-white mb-4" placeholder="Enter your proposal..." value={proposal} onChange={e => setProposal(e.target.value)} rows={4} />
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={submitProposal} disabled={voting}>{voting ? 'Submitting...' : 'Submit Proposal'}</button>
      {result && (
        <div className="mt-4 p-4 bg-gray-700 rounded text-white">
          <h4 className="text-lg font-semibold mb-2">Proposal Result</h4>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
} 