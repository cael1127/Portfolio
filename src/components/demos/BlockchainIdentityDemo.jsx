import React, { useState } from "react";
export default function BlockchainIdentityDemo() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [verified, setVerified] = useState(false);
  function next() {
    if (step === 0 && name.trim()) setStep(1);
    else if (step === 1) { setVerified(true); setStep(2); }
  }
  return (
    <div className="w-full max-w-xs mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Decentralized Identity Verification</h3>
      {step === 0 && (
        <>
          <input className="w-full mb-3 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={next}>Next</button>
        </>
      )}
      {step === 1 && (
        <>
          <p className="text-white">Verifying identity...</p>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={next}>Verify</button>
        </>
      )}
      {step === 2 && (
        <>
          <p className="text-white">Identity verified!</p>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={next}>Done</button>
        </>
      )}
    </div>
  );
} 