import React from 'react';
import ProjectLayout from '../components/ProjectLayout';
import AICodeGenerationDemo from '../components/demos/AICodeGenerationDemo';

const AICodeGenerationDemoPage = ({ setCurrentPage }) => {
  return (
    <ProjectLayout
      title="AI Code Generation Assistant"
      subtitle="Multi-model code generation with GPT-4, Claude, and CodeLlama"
      emoji="🤖"
      onBack={() => setCurrentPage('demo-organizer')}
      next={{ label: 'ML Training Dashboard', onClick: () => setCurrentPage('ml-training-dashboard-demo') }}
      demo={<AICodeGenerationDemo />}
      overview="Advanced AI-powered code generation system that leverages multiple AI models to generate production-ready code. The system supports GPT-4, Claude 3, CodeLlama, and GitHub Copilot, allowing developers to compare outputs and choose the best solution for their needs."
      role="Full-stack development, AI API integration, multi-model orchestration, code formatting, and UI/UX design"
      stack={["React", "OpenAI API", "Anthropic API", "CodeLlama", "Python", "Node.js", "Express"]}
      challenges={[
        "Integrating multiple AI APIs with different authentication methods",
        "Handling API rate limits and errors gracefully",
        "Parsing and formatting code from various AI response formats",
        "Implementing context-aware code generation with history",
        "Optimizing API calls for faster response times"
      ]}
      results={[
        "Successfully integrated 4 different AI models",
        "Achieved average code generation time of 2-3 seconds",
        "Implemented code history tracking for reuse",
        "Built intuitive UI for comparing model outputs",
        "Added syntax highlighting and code formatting"
      ]}
      problem="Developers spend significant time writing boilerplate code and implementing common patterns. An AI-powered code generation system could accelerate development by providing instant, high-quality code suggestions based on natural language prompts."
      approach="Built a comprehensive code generation system that integrates multiple AI models, allowing developers to compare outputs and choose the best solution. Implemented context-aware generation, code history, and real-time preview capabilities."
      highlights={[
        "Multi-model support (GPT-4, Claude, CodeLlama, Copilot)",
        "Real-time code generation with preview",
        "Code history and reuse functionality",
        "Context-aware prompt engineering",
        "Syntax highlighting and formatting",
        "Error handling and retry logic"
      ]}
      tutorialSummary="In this project, you'll build an AI code generation assistant that integrates multiple AI models (GPT-4, Claude, CodeLlama) to generate code from natural language prompts. The system includes model comparison, code history, and real-time preview capabilities."
      difficulty="Advanced"
      timeEstimate="90 min"
      keyConcepts={[
        { name: "AI API Integration", description: "Connecting to OpenAI, Anthropic, and other AI services" },
        { name: "Prompt Engineering", description: "Crafting effective prompts for code generation" },
        { name: "Code Parsing", description: "Extracting and formatting code from AI responses" },
        { name: "Multi-Model Orchestration", description: "Managing multiple AI services and comparing outputs" }
      ]}
      tutorialSteps={[
        {
          title: "Setup and API Configuration",
          description: "Set up API keys and configure connections to AI services",
          steps: [
            "Create accounts on OpenAI, Anthropic, and other services",
            "Generate API keys and store them securely",
            "Set up environment variables for API keys",
            "Create API client classes for each service"
          ],
          code: `// .env file
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GITHUB_TOKEN=ghp_...

// api-clients.js
class OpenAIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openai.com/v1';
  }
  
  async generateCode(prompt) {
    // Implementation
  }
}`
        },
        {
          title: "Implement Code Generation Logic",
          description: "Create the core code generation functionality",
          steps: [
            "Build prompt templates for different code types",
            "Implement API request handling with error retry",
            "Add response parsing to extract code blocks",
            "Implement code formatting and validation"
          ],
          code: `async function generateCode(prompt, model) {
  const systemPrompt = 'You are an expert code generator...';
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];
  
  const response = await fetch(\`\${API_URL}/chat/completions\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, messages })
  });
  
  return await response.json();
}`
        },
        {
          title: "Build UI Components",
          description: "Create the user interface for code generation",
          steps: [
            "Design model selection interface",
            "Build prompt input with suggestions",
            "Create code preview component",
            "Implement generation history display"
          ]
        },
        {
          title: "Add Advanced Features",
          description: "Enhance the system with additional capabilities",
          steps: [
            "Implement code history and favorites",
            "Add multi-model comparison view",
            "Create code export functionality",
            "Add syntax highlighting and formatting"
          ]
        }
      ]}
      setupInstructions={`1. Install dependencies:
npm install react openai anthropic

2. Set up environment variables:
Create a .env file with your API keys

3. Start the development server:
npm start

4. Configure API clients:
Update the API client classes with your credentials`}
      deploymentGuide={`1. Build the production bundle:
npm run build

2. Deploy to your hosting platform:
- Netlify: Connect your GitHub repo
- Vercel: Deploy with vercel CLI
- AWS: Use Amplify or S3 + CloudFront

3. Set environment variables in your hosting platform

4. Configure API rate limiting and security`}
      troubleshooting={[
        {
          issue: "API rate limit errors",
          solution: "Implement exponential backoff retry logic and request queuing"
        },
        {
          issue: "Code parsing fails",
          solution: "Add robust regex patterns to extract code blocks from markdown responses"
        },
        {
          issue: "Slow generation times",
          solution: "Implement request caching and parallel model requests where possible"
        }
      ]}
    />
  );
};

export default AICodeGenerationDemoPage;

