import React, { useState } from 'react';

export default function DataTableDemo({ title }) {
  const [query, setQuery] = useState('');
  const data = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: title + ' User ' + (i + 1),
    email: `user${i + 1}@example.com`,
    status: i % 3 === 0 ? 'Active' : 'Inactive',
  }));
  const filtered = data.filter(row => row.name.toLowerCase().includes(query.toLowerCase()) || row.email.toLowerCase().includes(query.toLowerCase()));
  
  return (
    <div className="w-full">
      <input
        className="mb-4 px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white w-full"
        placeholder="Search users..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <tr key={row.id} className="border-b border-gray-700">
                <td className="px-4 py-2">{row.id}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 