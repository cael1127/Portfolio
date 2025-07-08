import React, { useState } from 'react';

export default function ChatbotDemo({ title }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Welcome to the ${title} demo!` }
  ]);
  const [input, setInput] = useState('');
  
  function send() {
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { from: 'user', text: input }, { from: 'bot', text: `You said: ${input}` }]);
    setInput('');
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 h-64 overflow-y-auto mb-2 flex flex-col">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.from === 'bot' ? 'text-teal-400' : 'text-white text-right'}`}>{msg.text}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
        />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700" onClick={send}>Send</button>
      </div>
    </div>
  );
} 