const axios = require('axios');

// LLM Provider configurations
const providers = {
  openai: {
    name: 'OpenAI',
    url: 'https://api.openai.com/v1/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }),
    body: (messages, model = 'gpt-3.5-turbo') => ({
      model,
      messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false
    }),
    extractResponse: (response) => response.data.choices[0].message.content
  },
  
  anthropic: {
    name: 'Anthropic',
    url: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey) => ({
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    }),
    body: (messages, model = 'claude-3-sonnet-20240229') => ({
      model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      max_tokens: 500,
      temperature: 0.7
    }),
    extractResponse: (response) => response.data.content[0].text
  },
  
  // Add more providers here
  local: {
    name: 'Local LLM',
    url: process.env.LOCAL_LLM_URL || 'http://localhost:11434/api/chat',
    headers: () => ({
      'Content-Type': 'application/json'
    }),
    body: (messages, model = 'llama2') => ({
      model,
      messages,
      stream: false
    }),
    extractResponse: (response) => response.data.message.content
  }
};

// Get the configured provider
function getProvider() {
  const providerName = process.env.LLM_PROVIDER || 'openai';
  return providers[providerName];
}

// Call the LLM API
async function callLLM(messages) {
  const provider = getProvider();
  const apiKey = process.env[`${process.env.LLM_PROVIDER || 'OPENAI'}_API_KEY`];
  
  if (!apiKey && provider.name !== 'Local LLM') {
    throw new Error(`No API key found for ${provider.name}`);
  }
  
  try {
    const response = await axios.post(provider.url, provider.body(messages), {
      headers: provider.headers(apiKey)
    });
    
    return provider.extractResponse(response);
  } catch (error) {
    console.error(`${provider.name} API Error:`, error.response?.data || error.message);
    throw error;
  }
}

module.exports = { callLLM, getProvider }; 