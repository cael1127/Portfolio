import React, { useMemo, useState } from 'react';
import CodeViewer from '../CodeViewer';

const logic = `// Deterministic cohort retention calculation
function retention(cohorts){
  // cohorts: [{month: '2025-01', users:[1,2,3,4]}, ...]
  return cohorts.map(c => ({ month: c.month, d30: Math.round(c.users.length*0.6), d60: Math.round(c.users.length*0.45) }));
}
`;

const FauxChart = ({ data }) => {
  // simple svg bars
  const width = 360, height = 160, pad = 24;
  const max = Math.max(...data.flatMap(d=>[d.d30,d.d60]), 1);
  const bw = (width - pad*2) / data.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-40">
      <rect width={width} height={height} fill="#0b1220" />
      {data.map((d,i)=>{
        const h1 = (d.d30/max)*(height-pad*2);
        const h2 = (d.d60/max)*(height-pad*2);
        const x = pad + i*bw;
        return (
          <g key={i}>
            <rect x={x+4} y={height-pad-h1} width={bw/2-6} height={h1} fill="#10b981" />
            <rect x={x+bw/2+2} y={height-pad-h2} width={bw/2-6} height={h2} fill="#06b6d4" />
          </g>
        );
      })}
    </svg>
  );
};

const SaaSAnalyticsDemo = () => {
  const [openCode, setOpenCode] = useState(false);
  const data = useMemo(()=>[
    { month:'2025-01', d30: 60, d60: 45 },
    { month:'2025-02', d30: 58, d60: 44 },
    { month:'2025-03', d30: 61, d60: 46 },
    { month:'2025-04', d30: 63, d60: 47 },
  ],[]);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Cohorts & Retention</h3>
        <button onClick={()=>setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
      </div>
      <FauxChart data={data} />
      <div className="mt-3 text-sm text-gray-400">Deterministic sample cohorts. Green: D30, Cyan: D60.</div>
      <CodeViewer isOpen={openCode} onClose={()=>setOpenCode(false)} code={logic} language="javascript" title="Retention logic" />
    </div>
  );
};

export default SaaSAnalyticsDemo;


