import React from 'react';

const InspirationSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 border-t border-[var(--border)]">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Inspiration</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="https://www.jameswilliams.design/" target="_blank" rel="noopener noreferrer" className="group block bg-[var(--surface)]/60 hover:bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">🧭</div>
            <div className="text-[var(--muted)] group-hover:text-[var(--muted)]">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">James Williams</h3>
          <p className="text-[var(--muted)] text-sm">Clean typography, flowing latest work</p>
        </a>
        <a href="https://webflow.com/blog/web-developer-portfolio-examples" target="_blank" rel="noopener noreferrer" className="group block bg-[var(--surface)]/60 hover:bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">🧩</div>
            <div className="text-[var(--muted)] group-hover:text-[var(--muted)]">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">Clarity & structure</h3>
          <p className="text-[var(--muted)] text-sm">Simple navigation and concise content</p>
        </a>
        <a href="https://careerfoundry.com/en/blog/web-development/web-developer-portfolio/" target="_blank" rel="noopener noreferrer" className="group block bg-[var(--surface)]/60 hover:bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border)] rounded-xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-10">
            <div className="text-3xl">✨</div>
            <div className="text-[var(--muted)] group-hover:text-[var(--muted)]">↗</div>
          </div>
          <h3 className="text-lg font-semibold mb-1">Micro‑interactions</h3>
          <p className="text-[var(--muted)] text-sm">Tasteful motion and engagement</p>
        </a>
      </div>
    </div>
  );
};

export default InspirationSection;


