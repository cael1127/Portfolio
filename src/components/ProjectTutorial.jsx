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
        return 'text-green-400 bg-green-900/20';
      case 'intermediate':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'advanced':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-blue-400 bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* 30-second Summary */}
      {summary && (
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-800/50">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <span>⚡</span>
            <span>30-second Summary</span>
          </h2>
          <div className="text-gray-300 leading-relaxed">
            {summary}
          </div>
        </div>
      )}

      {/* Project Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">DIFFICULTY</div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </div>
        </div>
        {timeEstimate && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">TIME</div>
            <div className="text-white font-semibold">{timeEstimate}</div>
          </div>
        )}
        {keyConcepts.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="text-gray-400 text-sm mb-1">KEY CONCEPTS</div>
            <div className="text-white font-semibold">{keyConcepts.length} concepts</div>
          </div>
        )}
      </div>

      {/* Key Concepts */}
      {keyConcepts.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🧠</span>
            <span>Key Concepts</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {keyConcepts.map((concept, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <div>
                  {typeof concept === 'string' ? (
                    <span className="text-gray-300">{concept}</span>
                  ) : (
                    <>
                      <div className="text-white font-medium">{concept.name}</div>
                      {concept.description && (
                        <div className="text-gray-400 text-sm">{concept.description}</div>
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
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>📚</span>
            <span>Step-by-Step Guide</span>
          </h3>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {step.title || step.name}
                  </h4>
                </div>
                {step.description && (
                  <p className="text-gray-300 mb-3 ml-11">{step.description}</p>
                )}
                {step.code && (
                  <div className="ml-11 mb-3">
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                      <code className="text-sm text-gray-300">{step.code}</code>
                    </pre>
                  </div>
                )}
                {step.steps && (
                  <ul className="ml-11 space-y-2">
                    {step.steps.map((subStep, subIndex) => (
                      <li key={subIndex} className="text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
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
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>⚙️</span>
            <span>Setup Instructions</span>
          </h3>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {setupInstructions}
          </div>
        </div>
      )}

      {/* Deployment Guide */}
      {deploymentGuide && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🚀</span>
            <span>Deployment Guide</span>
          </h3>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {deploymentGuide}
          </div>
        </div>
      )}

      {/* Troubleshooting */}
      {troubleshooting && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🔧</span>
            <span>Troubleshooting</span>
          </h3>
          <div className="space-y-4">
            {Array.isArray(troubleshooting) ? (
              troubleshooting.map((item, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <div className="font-semibold text-white mb-1">{item.issue}</div>
                  <div className="text-gray-300 text-sm">{item.solution}</div>
                </div>
              ))
            ) : (
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
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

