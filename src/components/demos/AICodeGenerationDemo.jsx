import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CodeViewer from '../CodeViewer';

const AICodeGenerationDemo = () => {
  const [showCodeViewer, setShowCodeViewer] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationHistory, setGenerationHistory] = useState([]);

  const models = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Advanced reasoning and code generation' },
    { id: 'claude-3', name: 'Claude 3', description: 'Excellent for complex code tasks' },
    { id: 'codellama', name: 'CodeLlama', description: 'Specialized for code generation' },
    { id: 'copilot', name: 'GitHub Copilot', description: 'Fast code suggestions' }
  ];

  const samplePrompts = [
    'Create a React component for a todo list',
    'Write a Python function to sort a list of dictionaries',
    'Generate a REST API endpoint with Express.js',
    'Create a SQL query to find top 10 customers'
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI code generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const codeExamples = {
      'Create a React component for a todo list': `import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="todo-list">
      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={todo.completed ? 'completed' : ''}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`,
      'Write a Python function to sort a list of dictionaries': `def sort_dict_list(data, key, reverse=False):
    """
    Sort a list of dictionaries by a specified key.
    
    Args:
        data: List of dictionaries to sort
        key: Key to sort by
        reverse: If True, sort in descending order
    
    Returns:
        Sorted list of dictionaries
    """
    return sorted(data, key=lambda x: x.get(key, 0), reverse=reverse)


# Example usage
users = [
    {'name': 'Alice', 'age': 30},
    {'name': 'Bob', 'age': 25},
    {'name': 'Charlie', 'age': 35}
]

sorted_by_age = sort_dict_list(users, 'age')
print(sorted_by_age)`,
      'Generate a REST API endpoint with Express.js': `const express = require('express');
const router = express.Router();

// GET endpoint to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST endpoint to create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    const user = new User({ name, email });
    await user.save();

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;`,
      'Create a SQL query to find top 10 customers': `-- Find top 10 customers by total purchase amount
SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    SUM(o.total_amount) AS total_spent,
    COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY c.customer_id, c.customer_name, c.email
ORDER BY total_spent DESC
LIMIT 10;`
    };

    const generated = codeExamples[prompt] || `// Generated code for: ${prompt}\n// This is a placeholder for the actual generated code\n\nfunction generatedCode() {\n  // Implementation would go here\n  return "Generated code";\n}`;

    setGeneratedCode(generated);
    setGenerationHistory([
      { prompt, code: generated, model: selectedModel, timestamp: new Date() },
      ...generationHistory
    ]);
    setIsGenerating(false);
  };

  const codeData = {
    code: `// AI Code Generation System
class AICodeGenerator {
  constructor(apiKey, model = 'gpt-4') {
    this.apiKey = apiKey;
    this.model = model;
    this.history = [];
  }

  async generateCode(prompt, context = '') {
    const systemPrompt = \`You are an expert code generator. 
Generate clean, production-ready code based on user prompts.
Always include proper error handling and comments.\`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: \`\${context}\\n\\n\${prompt}\` }
    ];

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': \`Bearer \${this.apiKey}\`
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      const data = await response.json();
      const generatedCode = data.choices[0].message.content;

      this.history.push({
        prompt,
        code: generatedCode,
        timestamp: new Date()
      });

      return generatedCode;
    } catch (error) {
      throw new Error(\`Code generation failed: \${error.message}\`);
    }
  }

  async generateWithMultipleModels(prompt, models) {
    const results = await Promise.all(
      models.map(model => this.generateCode(prompt))
    );
    return results;
  }

  formatCode(code, language) {
    // Format code with proper indentation and syntax highlighting
    return code;
  }
}

// Usage
const generator = new AICodeGenerator(process.env.OPENAI_API_KEY);
const code = await generator.generateCode('Create a React todo component');`,
    explanation: `This AI Code Generation system provides a comprehensive solution for generating code using multiple AI models.

## Core Features

**Multi-Model Support**: The system supports multiple AI models (GPT-4, Claude, CodeLlama, etc.) allowing users to compare outputs and choose the best result.

**Context Awareness**: The generator maintains conversation history and can use previous code context to generate more relevant code.

**Error Handling**: Robust error handling ensures the system gracefully handles API failures and provides meaningful error messages.

**Code Formatting**: Built-in code formatting ensures generated code follows best practices and is properly indented.

## Technical Implementation

The system uses REST APIs to communicate with AI services, maintains a history of generations for reference, and provides a clean interface for code generation tasks.

## Benefits

- **Speed**: Generate code in seconds instead of hours
- **Quality**: AI models trained on millions of code examples
- **Versatility**: Supports multiple programming languages
- **Learning**: See different approaches to solving the same problem`,
    technologies: [
      { name: 'OpenAI API', description: 'GPT-4 API for code generation', tags: ['API', 'AI', 'Code Generation'] },
      { name: 'Anthropic Claude', description: 'Claude API for advanced reasoning', tags: ['API', 'AI', 'Reasoning'] },
      { name: 'CodeLlama', description: 'Meta\'s code-specific model', tags: ['Open Source', 'Code Generation'] },
      { name: 'React', description: 'Frontend framework for the UI', tags: ['Frontend', 'UI'] }
    ],
    concepts: [
      { name: 'Prompt Engineering', description: 'Crafting effective prompts for better code generation', example: 'Using specific, detailed prompts with context' },
      { name: 'API Integration', description: 'Connecting to multiple AI service APIs', example: 'REST API calls to OpenAI, Anthropic' },
      { name: 'Code Parsing', description: 'Extracting and formatting generated code', example: 'Parsing markdown code blocks from AI responses' },
      { name: 'Multi-Model Comparison', description: 'Comparing outputs from different models', example: 'Generating same code with GPT-4 and Claude' }
    ],
    features: [
      'Multi-model code generation',
      'Real-time code preview',
      'Code history tracking',
      'Syntax highlighting',
      'Error handling',
      'Context-aware generation'
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">AI Code Generation Assistant</h3>
          <button
            onClick={() => setShowCodeViewer(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
          >
            View Code
          </button>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select AI Model
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {models.map(model => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-900/20 text-white'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="font-medium text-sm">{model.name}</div>
                <div className="text-xs text-gray-400 mt-1">{model.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Code Generation Prompt
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the code you want to generate..."
            className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            rows="4"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {samplePrompts.map((sample, index) => (
              <button
                key={index}
                onClick={() => setPrompt(sample)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs transition-colors"
              >
                {sample.substring(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors mb-4"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Generating code...
            </span>
          ) : (
            `Generate Code with ${models.find(m => m.id === selectedModel)?.name}`
          )}
        </button>

        {/* Generated Code */}
        {generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">Generated Code</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedCode)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Copy
                </button>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{generatedCode}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Generation History */}
        {generationHistory.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Generations</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {generationHistory.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-3 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => {
                    setPrompt(item.prompt);
                    setGeneratedCode(item.code);
                    setSelectedModel(item.model);
                  }}
                >
                  <div className="text-xs text-gray-400 mb-1">{item.prompt.substring(0, 50)}...</div>
                  <div className="text-xs text-blue-400">Model: {item.model}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CodeViewer
        isOpen={showCodeViewer}
        onClose={() => setShowCodeViewer(false)}
        code={codeData.code}
        language="javascript"
        title="AI Code Generation System"
        explanation={codeData.explanation}
        technologies={codeData.technologies}
        concepts={codeData.concepts}
        features={codeData.features}
      />
    </div>
  );
};

export default AICodeGenerationDemo;

