import React, { useState } from "react";
export default function HelpdeskDemo() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Cannot login', status: 'Open' },
    { id: 2, title: 'VPN not working', status: 'Closed' },
  ]);
  const [newTicket, setNewTicket] = useState('');
  function submit() {
    if (!newTicket.trim()) return;
    setTickets(t => [...t, { id: t.length + 1, title: newTicket, status: 'Open' }]);
    setNewTicket('');
  }
  function close(id) {
    setTickets(t => t.map(ticket => ticket.id === id ? { ...ticket, status: 'Closed' } : ticket));
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Security Helpdesk</h3>
      <div className="mb-4">
        <input className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white mb-2" placeholder="New ticket..." value={newTicket} onChange={e => setNewTicket(e.target.value)} />
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 w-full" onClick={submit}>Submit Ticket</button>
      </div>
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id} className="flex items-center justify-between mb-2">
              <span className="text-white">{ticket.title}</span>
              <span className={`ml-2 text-xs font-bold ${ticket.status === 'Open' ? 'text-red-400' : 'text-green-400'}`}>{ticket.status}</span>
              {ticket.status === 'Open' && <button className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded" onClick={() => close(ticket.id)}>Close</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 