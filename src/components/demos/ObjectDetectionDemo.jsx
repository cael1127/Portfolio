import React, { useMemo, useRef, useEffect, useState } from 'react';
import CodeViewer from '../CodeViewer';

const sampleDetections = [
  { id: 'person', score: 0.98, box: { x: 40, y: 30, w: 120, h: 160 }, color: '#10B981' },
  { id: 'bottle', score: 0.92, box: { x: 200, y: 70, w: 60, h: 120 }, color: '#06B6D4' },
  { id: 'laptop', score: 0.88, box: { x: 300, y: 90, w: 180, h: 110 }, color: '#F59E0B' },
];

const overlayAlgorithm = `// Deterministic overlay for demo purposes
function drawDetections(ctx, detections){
  ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
  detections.forEach(det => {
    const { x,y,w,h } = det.box;
    ctx.strokeStyle = det.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
    const label = det.id + ' ' + Math.round(det.score*100) + '%';
    ctx.fillStyle = det.color;
    ctx.font = '12px ui-sans-serif, -apple-system';
    const tw = ctx.measureText(label).width + 8;
    ctx.fillRect(x, Math.max(0,y-16), tw, 16);
    ctx.fillStyle = '#0f172a';
    ctx.fillText(label, x+4, Math.max(10, y-4));
  });
}
`;

const ObjectDetectionDemo = () => {
  const canvasRef = useRef(null);
  const [openCode, setOpenCode] = useState(false);

  const detections = useMemo(() => sampleDetections, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // background placeholder
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // grid
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    for (let x=0;x<canvas.width;x+=20){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke(); }
    for (let y=0;y<canvas.height;y+=20){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke(); }
    // draw detections deterministically
    detections.forEach(det => {
      const { x,y,w,h } = det.box;
      ctx.strokeStyle = det.color;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      const label = `${det.id} ${Math.round(det.score*100)}%`;
      ctx.fillStyle = det.color;
      ctx.font = '12px ui-sans-serif, -apple-system';
      const tw = ctx.measureText(label).width + 8;
      ctx.fillRect(x, Math.max(0,y-16), tw, 16);
      ctx.fillStyle = '#0f172a';
      ctx.fillText(label, x+4, Math.max(10, y-4));
    });
  }, [detections]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Live Overlay (Deterministic)</h3>
        <button onClick={() => setOpenCode(true)} className="text-primary hover:text-emerald-300 text-sm">View code</button>
      </div>
      <canvas ref={canvasRef} width={520} height={300} className="w-full max-w-[520px] rounded-lg border border-gray-800 bg-gray-900" />
      <div className="mt-4 text-sm text-gray-400">No webcam required. This demo renders deterministic detections to showcase overlay logic employers can read.</div>
      <CodeViewer isOpen={openCode} onClose={() => setOpenCode(false)} code={overlayAlgorithm} language="javascript" title="Overlay algorithm" />
    </div>
  );
};

export default ObjectDetectionDemo;


