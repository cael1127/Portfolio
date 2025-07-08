import React from "react";
export default function ERPDemo() {
  const modules = ['Finance', 'HR', 'Inventory', 'Sales'];
  const kpis = [
    { label: 'Revenue', value: '$1.2M' },
    { label: 'Orders', value: '3,200' },
    { label: 'Inventory', value: '1,150' },
    { label: 'Employees', value: '87' },
  ];
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">ERP Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
            <div className="text-teal-400 text-lg font-bold mb-1">{kpi.value}</div>
            <div className="text-gray-300 text-xs uppercase">{kpi.label}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 justify-center">
        {modules.map((mod, i) => (
          <button key={i} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">{mod}</button>
        ))}
      </div>
    </div>
  );
} 