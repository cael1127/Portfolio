import React, { useEffect, useMemo, useRef, useState } from 'react';
import CodeViewer from '../CodeViewer';

const logic = `// BroadcastChannel-based presence and chat (no backend)
const channel = new BroadcastChannel('demo-chat');
const userId = Math.random().toString(36).slice(2,7);
channel.postMessage({ type: 'join', userId });
// keepalive ping
setInterval(()=> channel.postMessage({ type:'ping', userId }), 4000);
// handle messages
channel.onmessage = (ev) => {
  const msg = ev.data;
  // update presence and append chat messages deterministically
};
`;

const RealtimeChatDemo = () => {
  const [messages, setMessages] = useState([]);
  const [peers, setPeers] = useState(new Map());
  const [text, setText] = useState('');
  const [openCode, setOpenCode] = useState(false);
  const channelRef = useRef(null);
  const userId = useMemo(() => Math.random().toString(36).slice(2, 7), []);

  useEffect(() => {
    const ch = new BroadcastChannel('demo-chat');
    channelRef.current = ch;
    const heartbeat = setInterval(() => {
      ch.postMessage({ type: 'ping', userId, ts: Date.now() });
    }, 4000);
    ch.postMessage({ type: 'join', userId, ts: Date.now() });
    const onmessage = (ev) => {
      const msg = ev.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.type === 'join' || msg.type === 'ping') {
        setPeers(prev => {
          const next = new Map(prev);
          next.set(msg.userId, msg.ts || Date.now());
          return next;
        });
      } else if (msg.type === 'chat') {
        setMessages(prev => [...prev, msg]);
      }
    };
    ch.onmessage = onmessage;
    return () => {
      clearInterval(heartbeat);
      ch.close();
    };
  }, [userId]);

  const presence = useMemo(() => Array.from(peers.keys()).length, [peers]);

  const send = () => {
    const body = text.trim();
    if (!body) return;
    const msg = { type: 'chat', userId, body, ts: Date.now() };
    channelRef.current?.postMessage(msg);
    setMessages(prev => [...prev, msg]);
    setText('');
  };

  return (
    <div className="grid md:grid-cols-[1fr,260px] gap-6">
      <div className="bg-gray-900 border border-gray-800 rounded p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Room: demo</h3>
          <button onClick={()=>setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
        </div>
        <div className="h-60 overflow-auto bg-gray-800 border border-gray-700 rounded p-3 text-sm space-y-2">
          {messages.length === 0 ? (
            <div className="text-gray-400">Say hello to start the conversation.</div>
          ) : messages.map((m,i)=>(
            <div key={i} className="flex items-start gap-2">
              <span className="text-emerald-400">{m.userId}</span>
              <span className="text-gray-300">{m.body}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm" placeholder="Type a message..." />
          <button onClick={send} className="bg-primary/20 text-primary px-3 py-2 rounded text-sm">Send</button>
        </div>
      </div>
      <aside className="bg-gray-900 border border-gray-800 rounded p-4 text-sm">
        <div className="font-semibold mb-2">Presence</div>
        <div className="text-gray-300">Active users: {presence}</div>
        <div className="mt-2 text-gray-400">(Local-only BroadcastChannel demo)</div>
      </aside>
      <CodeViewer isOpen={openCode} onClose={()=>setOpenCode(false)} code={logic} language="javascript" title="Realtime logic" />
    </div>
  );
};

export default RealtimeChatDemo;


