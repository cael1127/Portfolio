import React from 'react';

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-8 scroll-mt-24">
    <h3 className="text-xl font-semibold mb-2">
      {title}
    </h3>
    <div className="text-gray-300 leading-relaxed text-sm">{children}</div>
  </section>
);

const Pill = ({ children }) => (
  <span className="px-2 py-1 rounded-full text-xs bg-gray-800 border border-gray-700 text-gray-200 mr-2 mb-2 inline-block">
    {children}
  </span>
);

const CaseStudy = ({ overview, role, stack = [], challenges = [], results = [] }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <Section id="overview" title="Overview">{overview || 'Coming soon.'}</Section>
      <Section id="role" title="My role">{role || 'Design, implementation, and delivery.'}</Section>
      <Section id="tech-stack" title="Tech stack">
        <div className="flex flex-wrap">
          {(stack.length ? stack : ['React', 'Node.js', 'Tailwind']).map((s, i) => (
            <Pill key={i}>{s}</Pill>
          ))}
        </div>
      </Section>
      <Section id="challenges" title="Challenges">
        <ul className="list-disc pl-5 space-y-1">
          {(challenges.length ? challenges : ['Performance under load', 'Clear UX for complex flows']).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Section>
      <Section id="results" title="Results">
        <ul className="list-disc pl-5 space-y-1">
          {(results.length ? results : ['Shipped on time', 'Improved lighthouse scores'] ).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default CaseStudy;


