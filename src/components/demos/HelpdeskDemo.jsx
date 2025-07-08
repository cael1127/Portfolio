import React, { useState } from "react";
export default function HelpdeskDemo() {
  const [tickets, setTickets] = useState([
    { id: 1, title: 'Login Issue', status: 'Open', priority: 'High' },
    { id: 2, title: 'Password Reset', status: 'In Progress', priority: 'Medium' },
    { id: 3, title: 'Feature Request', status: 'Closed', priority: 'Low' }
  ]);
  const [newTicket, setNewTicket] = useState('');
  const addTicket = () => {
    if (newTicket.trim()) {
      setTickets([...tickets, { id: tickets.length + 1, title: newTicket, status: 'Open', priority: 'Medium' }]);
      setNewTicket('');
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">Helpdesk System</h3>
      <div className="mb-4">
        <input type="text" placeholder="New ticket..." value={newTicket} onChange={e => setNewTicket(e.target.value)} className="bg-gray-800 text-white rounded px-2 py-1 w-full mb-2" />
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={addTicket}>Add Ticket</button>
      </div>
      <div className="space-y-2">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-gray-800 border border-gray-600 rounded p-3">
            <div className="text-white font-bold">{ticket.title}</div>
            <div className="text-gray-400 text-sm">Status: {ticket.status} | Priority: {ticket.priority}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 