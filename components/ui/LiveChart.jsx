import React, { useRef, useEffect } from 'react';

export default function LiveChart({ title }) {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!window.Chart) return;
    const ctx = chartRef.current.getContext('2d');
    let chart;
    let data = Array.from({ length: 20 }, () => Math.random() * 100);
    chart = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 20 }, (_, i) => i + 1),
        datasets: [{
          label: title + ' (Simulated)',
          data: data,
          borderColor: '#14b8a6',
          backgroundColor: 'rgba(20,184,166,0.2)',
          tension: 0.3,
        }],
      },
      options: {
        animation: false,
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: { x: { ticks: { color: '#fff' } }, y: { ticks: { color: '#fff' } } },
      },
    });
    const interval = setInterval(() => {
      data.push(Math.random() * 100);
      data.shift();
      chart.data.datasets[0].data = data;
      chart.update();
    }, 1000);
    return () => { chart.destroy(); clearInterval(interval); };
  }, [title, window.Chart]);
  
  return <canvas ref={chartRef} width={600} height={200} />;
} 