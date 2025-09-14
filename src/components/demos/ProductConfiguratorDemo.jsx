import React, { useMemo, useState } from 'react';
import CodeViewer from '../CodeViewer';

const logic = `// Deterministic variant switching without Three.js
const variants = [
  { id: 'black', label: 'Black', color: '#111827' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
  { id: 'cyan', label: 'Cyan', color: '#06b6d4' },
];
`;

const ProductConfiguratorDemo = () => {
  const variants = useMemo(()=>[
    { id: 'black', label: 'Black', color: '#111827' },
    { id: 'emerald', label: 'Emerald', color: '#10b981' },
    { id: 'cyan', label: 'Cyan', color: '#06b6d4' },
  ],[]);
  const [sel, setSel] = useState(variants[0]);
  const [openCode, setOpenCode] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Variant Configurator</h3>
        <button onClick={()=>setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
      </div>
      <div className="grid md:grid-cols-[1fr,240px] gap-6">
        <div className="h-48 rounded-xl border border-gray-800" style={{ background: `linear-gradient(135deg, ${sel.color}40, #0b1220)` }} />
        <div className="bg-gray-900 border border-gray-800 rounded p-4 text-sm">
          <div className="font-semibold mb-2">Variants</div>
          <div className="flex flex-wrap gap-2">
            {variants.map(v => (
              <button key={v.id} onClick={()=>setSel(v)} className={`px-3 py-1 rounded ${sel.id===v.id?'bg-primary/20 text-primary':'bg-gray-800 text-gray-300'}`}>{v.label}</button>
            ))}
          </div>
        </div>
      </div>
      <CodeViewer isOpen={openCode} onClose={()=>setOpenCode(false)} code={logic} language="javascript" title="Configurator logic" />
    </div>
  );
};

export default ProductConfiguratorDemo;


