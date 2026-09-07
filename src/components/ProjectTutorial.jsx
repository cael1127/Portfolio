import React from 'react';

const ProjectTutorial = ({ 
  summary, 
  difficulty = 'Intermediate', 
  timeEstimate, 
  keyConcepts = [], 
  steps = [],
  setupInstructions,
  deploymentGuide,
  troubleshooting
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
      case 'easy':
        return 'text-[var(--accent)] bg-[var(--accent-soft)]/20';
      case 'intermediate':
        return 'text-[var(--accent)] bg-[var(--accent-soft)]/20';
      case 'advanced':
        return 'text-[var(--accent)] bg-[var(--accent-soft)]/20';
      default:
        return 'text-[var(--accent)] bg-[var(--accent-soft)]/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* 30-second Summary */}
      {summary && (
        <div className="bg-gradient-to-br from-[var(--accent-soft)]/30 to-[var(--accent-soft)]/30 p-6 rounded-xl border border-[var(--accent)]/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span>⚡</span>
            <span>30-second Summary</span>
          </h2>
          <div className="text-[var(--text)] leading-relaxed">
            {summary}
          </div>
        </div>
      )}

      {/* Project Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
          <div className="text-[var(--muted)] text-sm mb-1">DIFFICULTY</div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </div>
        </div>
        {timeEstimate && (
          <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
            <div className="text-[var(--muted)] text-sm mb-1">TIME</div>
            <div className="text-[var(--text)] font-semibold">{timeEstimate}</div>
          </div>
        )}
        {keyConcepts.length > 0 && (
          <div className="bg-[var(--surface)] p-4 rounded-lg border border-[var(--border)]">
            <div className="text-[var(--muted)] text-sm mb-1">KEY CONCEPTS</div>
            <div className="text-[var(--text)] font-semibold">{keyConcepts.length} concepts</div>
          </div>
        )}
      </div>

      {/* Key Concepts */}
      {keyConcepts.length > 0 && (
        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🧠</span>
            <span>Key Concepts</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyConcepts.map((concept, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-[var(--accent)] mt-1">•</span>
                <div>
                  {typeof concept === 'string' ? (
                    <span className="text-[var(--text)]">{concept}</span>
                  ) : (
                    <>
                      <div className="text-[var(--text)] font-medium">{concept.name}</div>
                      {concept.description && (
                        <div className="text-[var(--muted)] text-sm">{concept.description}</div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Tutorial */}
      {steps.length > 0 && (
        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>Step-by-Step Guide</span>
          </h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="border-l-4 border-[var(--accent)] pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-[var(--accent)] text-[var(--text)] rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-[var(--text)]">
                    {step.title || step.name}
                  </h4>
                </div>
                {step.description && (
                  <p className="text-[var(--text)] mb-3 ml-11">{step.description}</p>
                )}
                {step.code && (
                  <div className="ml-11 mb-3">
                    <pre className="bg-[var(--bg)] p-4 rounded-lg overflow-x-auto border border-[var(--border)]">
                      <code className="text-sm text-[var(--text)]">{step.code}</code>
                    </pre>
                  </div>
                )}
                {step.steps && (
                  <ul className="ml-11 space-y-2">
                    {step.steps.map((subStep, subIndex) => (
                      <li key={subIndex} className="text-[var(--text)] flex items-start gap-2">
                        <span className="text-[var(--accent)] mt-1">→</span>
                        <span>{subStep}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      {setupInstructions && (
        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⚙️</span>
            <span>Setup Instructions</span>
          </h3>
          <div className="text-[var(--text)] leading-relaxed whitespace-pre-line">
            {setupInstructions}
          </div>
        </div>
      )}

      {/* Deployment Guide */}
      {deploymentGuide && (
        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🚀</span>
            <span>Deployment Guide</span>
          </h3>
          <div className="text-[var(--text)] leading-relaxed whitespace-pre-line">
            {deploymentGuide}
          </div>
        </div>
      )}

      {/* Troubleshooting */}
      {troubleshooting && (
        <div className="bg-[var(--surface)] p-6 rounded-lg border border-[var(--border)]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🔧</span>
            <span>Troubleshooting</span>
          </h3>
          <div className="space-y-4">
            {Array.isArray(troubleshooting) ? (
              troubleshooting.map((item, index) => (
                <div key={index} className="border-l-4 border-[var(--accent)] pl-4">
                  <div className="font-semibold text-[var(--text)] mb-1">{item.issue}</div>
                  <div className="text-[var(--text)] text-sm">{item.solution}</div>
                </div>
              ))
            ) : (
              <div className="text-[var(--text)] leading-relaxed whitespace-pre-line">
                {troubleshooting}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTutorial;

