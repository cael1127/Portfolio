const express = require('express');
const cors = require('cors');
const { callLLM, getProvider } = require('./llm-providers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// LLM API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, conversationHistory } = req.body;

    // Prepare the conversation for the LLM
    const systemPrompt = `You are ACF, an AI assistant for Cael Findley's portfolio website. 

${context}

Your role is to help visitors navigate the portfolio, answer questions about Cael's work, skills, and services. Be helpful, professional, and conversational. Always provide accurate information based on the portfolio context provided.

Respond naturally and conversationally, as if you're having a real conversation with someone exploring the portfolio.`;

    // Format conversation history for the LLM
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Add the current message
    const messages = [
      { role: 'system', content: systemPrompt },
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    // Call the LLM using the provider system
    const response = await callLLM(messages);

    res.json({ response });
  } catch (error) {
    console.error('LLM API Error:', error);
    
    // Fallback response if LLM API fails
    const fallbackResponse = "I'm having trouble connecting to my AI brain right now. Please try again in a moment, or you can explore the portfolio directly using the navigation menu above.";
    
    res.status(500).json({ 
      error: 'Failed to get AI response',
      response: fallbackResponse
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const provider = getProvider();
  res.json({ 
    status: 'OK', 
    message: 'ACF AI Assistant API is running',
    provider: provider.name
  });
});

app.listen(PORT, () => {
  const provider = getProvider();
  console.log(`ACF AI Assistant API running on port ${PORT}`);
  console.log(`Using LLM Provider: ${provider.name}`);
  console.log('Make sure to set your API key in the .env file');
});

module.exports = app; 