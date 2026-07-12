import React from 'react';

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-28">
    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] mb-3">
      {title}
    </h3>
    <div className="text-[var(--muted)] leading-relaxed text-[15px] md:text-base">{children}</div>
  </section>
);

const Pill = ({ children }) => (
  <span className="mr-2 mb-2 inline-block rounded border border-[var(--border)] px-2.5 py-1 font-mono text-xs text-[var(--text)]">
    {children}
  </span>
);

/**
 * Premium case study narrative:
 * Problem → Approach → Process → Challenges → Technical decisions → Outcome → Impact → Lessons
 */
const CaseStudy = ({
  overview,
  role,
  stack = [],
  challenges = [],
  results = [],
  problem,
  approach,
  process,
  technicalDecisions = [],
  impact,
  lessons = [],
}) => {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 rounded-sm">
      {problem && <Section id="problem" title="Problem">{problem}</Section>}
      {approach && <Section id="approach" title="Approach">{approach}</Section>}
      {process && (
        <Section id="process" title="Process">
          {Array.isArray(process) ? (
            <ol className="list-decimal pl-5 space-y-2">
              {process.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          ) : (
            process
          )}
        </Section>
      )}
      {(overview || role) && (
        <>
          {overview && <Section id="overview" title="Overview">{overview}</Section>}
          {role && <Section id="role" title="My role">{role}</Section>}
        </>
      )}
      <Section id="tech-stack" title="Tech stack">
        <div className="flex flex-wrap">
          {(stack.length ? stack : ['React', 'Node.js']).map((s, i) => (
            <Pill key={i}>{s}</Pill>
          ))}
        </div>
      </Section>
      {technicalDecisions.length > 0 && (
        <Section id="technical-decisions" title="Technical decisions">
          <ul className="list-disc pl-5 space-y-2">
            {technicalDecisions.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </Section>
      )}
      <Section id="challenges" title="Challenges">
        <ul className="list-disc pl-5 space-y-2">
          {(challenges.length
            ? challenges
            : ['Performance under load', 'Clear UX for complex flows']
          ).map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Section>
      <Section id="outcome" title="Outcome">
        <ul className="list-disc pl-5 space-y-2">
          {(results.length ? results : ['Shipped on time']).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Section>
      {impact && <Section id="impact" title="Impact">{impact}</Section>}
      {lessons.length > 0 && (
        <Section id="lessons" title="Lessons learned">
          <ul className="list-disc pl-5 space-y-2">
            {lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
};

export default CaseStudy;
