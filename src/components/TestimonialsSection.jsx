import React from 'react';

const TestimonialsSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 border-t border-[var(--border)]">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">What clients say</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <figure className="bg-[var(--surface)]/60 border border-[var(--border)] rounded-xl p-6">
          <blockquote className="text-[var(--text)]">“Delivered fast, communicated clearly, and the product exceeded expectations.”</blockquote>
          <figcaption className="mt-4 text-sm text-[var(--muted)]">Founder, Education Platform</figcaption>
        </figure>
        <figure className="bg-[var(--surface)]/60 border border-[var(--border)] rounded-xl p-6">
          <blockquote className="text-[var(--text)]">“Strong engineering instincts with a designer’s eye for detail.”</blockquote>
          <figcaption className="mt-4 text-sm text-[var(--muted)]">CTO, SaaS Startup</figcaption>
        </figure>
        <figure className="bg-[var(--surface)]/60 border border-[var(--border)] rounded-xl p-6">
          <blockquote className="text-[var(--text)]">“Proactive, reliable, and results‑oriented. Would hire again.”</blockquote>
          <figcaption className="mt-4 text-sm text-[var(--muted)]">Ops Lead, Logistics</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default TestimonialsSection;


