import React, { useRef, useEffect, useState } from 'react';

const WhiteboardDemo = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  const startDraw = (e) => {
    setDrawing(true);
    draw(e);
  };
  const endDraw = () => setDrawing(false);
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#34d399';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl p-6 shadow-lg border border-green-700 mt-8">
      <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">Collaborative Whiteboard (Demo)</h3>
      <p className="text-gray-300 mb-4 text-center text-sm">Draw with your mouse or finger! <span className="text-yellow-400">(Real-time collaboration coming soon!)</span></p>
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-64 bg-gray-900 rounded-lg border border-green-800 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg touch-none"
            style={{ width: '100%', height: '16rem', display: 'block', background: 'transparent' }}
            onMouseDown={startDraw}
            onMouseUp={endDraw}
            onMouseOut={endDraw}
            onMouseMove={draw}
            onTouchStart={startDraw}
            onTouchEnd={endDraw}
            onTouchCancel={endDraw}
            onTouchMove={draw}
          />
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default WhiteboardDemo; 