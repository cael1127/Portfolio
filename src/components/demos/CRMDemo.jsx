import React, { useState } from "react";
export default function CRMDemo() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Acme Corp', stage: 0 },
    { id: 2, name: 'Beta LLC', stage: 0 },
    { id: 3, name: 'Gamma Inc', stage: 0 },
  ]);
  const stages = ['Lead', 'Contacted', 'Proposal', 'Won'];
  function advance(id) {
    setLeads(ls => ls.map(l => l.id === id && l.stage < stages.length - 1 ? { ...l, stage: l.stage + 1 } : l));
  }
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">CRM Pipeline</h3>
      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage, i) => (
          <div key={i} className="bg-gray-800 border border-gray-600 rounded-lg p-2 min-h-[120px]">
            <div className="text-teal-400 font-bold mb-2 text-center">{stage}</div>
            {leads.filter(l => l.stage === i).map(l => (
              <div key={l.id} className="bg-gray-700 rounded p-2 mb-2 flex items-center justify-between">
                <span className="text-white text-sm">{l.name}</span>
                {i < stages.length - 1 && <button className="ml-2 text-xs bg-teal-600 text-white px-2 py-1 rounded" onClick={() => advance(l.id)}>→</button>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 