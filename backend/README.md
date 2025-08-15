# ACF AI Assistant Backend

This is the backend API for ACF (AI Cael Findley), the AI assistant integrated into Cael's portfolio website.

## Features

- **Real LLM Integration**: Uses actual large language models for dynamic responses
- **Multiple Providers**: Support for OpenAI, Anthropic, and local LLMs
- **Conversation Memory**: Maintains context across chat sessions
- **Portfolio-Aware**: Understands Cael's work, skills, and services
- **Error Handling**: Graceful fallbacks when LLM is unavailable

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure LLM Provider

Choose one of the following options:

#### Option A: OpenAI (Recommended)
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Update `.env`:
```env
PORT=3002
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
```

#### Option B: Anthropic
1. Get an API key from [Anthropic](https://console.anthropic.com/)
2. Update `.env`:
```env
PORT=3002
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

#### Option C: Local LLM (Ollama)
1. Install [Ollama](https://ollama.ai/)
2. Run a model: `ollama run llama2`
3. Update `.env`:
```env
PORT=3002
LLM_PROVIDER=local
LOCAL_LLM_URL=http://localhost:11434/api/chat
```

### 3. Start the Server
```bash
npm start
```

## API Endpoints

### POST /api/chat
Send a message to ACF and get an AI-generated response.

**Request Body:**
```json
{
  "message": "Tell me about Cael's projects",
  "context": "Portfolio information...",
  "conversationHistory": [...]
}
```

**Response:**
```json
{
  "response": "ACF's AI-generated response..."
}
```

### GET /api/health
Check if the API is running and which LLM provider is configured.

## How It Works

1. **Frontend sends message** to `/api/chat`
2. **Backend formats conversation** with portfolio context
3. **LLM generates response** based on the conversation
4. **Response is returned** to the frontend chat widget

## Portfolio Context

ACF has access to comprehensive information about:
- Cael's background and experience
- All projects and demos
- Technical skills and certifications
- Contact information and services
- Available pages and navigation

This allows ACF to provide intelligent, context-aware responses to visitors exploring the portfolio.

## Troubleshooting

- **API Key Issues**: Make sure your API key is valid and has sufficient credits
- **Provider Errors**: Check that the correct provider is set in `.env`
- **Local LLM**: Ensure Ollama is running and the model is available
- **CORS Issues**: The frontend should be running on port 3001

## Development

Run in development mode with auto-restart:
```bash
npm run dev
``` 