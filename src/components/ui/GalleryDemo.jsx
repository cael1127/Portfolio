import React, { useState } from 'react';

export default function GalleryDemo({ title }) {
  const [filter, setFilter] = useState('all');
  const items = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: title + ' Item #' + (i + 1),
    img: `https://placehold.co/200x200/14b8a6/fff?text=${encodeURIComponent(title.charAt(0))}${i + 1}`,
    type: i % 2 === 0 ? 'Type A' : 'Type B',
  }));
  const filtered = filter === 'all' ? items : items.filter(x => x.type === filter);
  
  return (
    <div className="w-full">
      <div className="mb-4 flex gap-2">
        <button className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setFilter('all')}>All</button>
        <button className={`px-3 py-1 rounded ${filter === 'Type A' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setFilter('Type A')}>Type A</button>
        <button className={`px-3 py-1 rounded ${filter === 'Type B' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300'}`} onClick={() => setFilter('Type B')}>Type B</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-gray-800 border border-gray-600 rounded-lg p-2 flex flex-col items-center">
            <img src={item.img} alt={item.name} className="rounded mb-2" />
            <div className="text-white text-sm font-medium mb-1">{item.name}</div>
            <div className="text-xs text-gray-400">{item.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 