import React, { useState } from "react";
export default function TelemedicineDemo() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([
    { from: 'Doctor', text: 'Hello, how can I help you today?' },
  ]);
  function send() {
    if (!msg.trim()) return;
    setChat(c => [...c, { from: 'You', text: msg }]);
    setMsg('');
    setTimeout(() => setChat(c => [...c, { from: 'Doctor', text: 'I recommend a video consultation.' }]), 1000);
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Telemedicine Chat</h3>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-2 h-48 overflow-y-auto">
        {chat.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === 'You' ? 'text-right' : 'text-left'}`}><span className={m.from === 'You' ? 'text-teal-400' : 'text-white'}>{m.from}:</span> <span className="text-gray-300">{m.text}</span></div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white" placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={send}>Send</button>
      </div>
    </div>
  );
} 