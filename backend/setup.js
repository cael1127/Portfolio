const fs = require('fs');
const path = require('path');

console.log('ACF AI Assistant Setup');
console.log('========================\n');

// Available providers
const providers = [
  { name: 'OpenAI', key: 'OPENAI_API_KEY', env: 'LLM_PROVIDER=openai' },
  { name: 'Anthropic', key: 'ANTHROPIC_API_KEY', env: 'LLM_PROVIDER=anthropic' },
  { name: 'Local LLM', key: 'LOCAL_LLM_URL', env: 'LLM_PROVIDER=local' }
];

console.log('Available LLM Providers:');
providers.forEach((provider, index) => {
  console.log(`${index + 1}. ${provider.name}`);
});

console.log('\nTo set up your LLM provider:');
console.log('1. Choose a provider from the list above');
console.log('2. Get your API key from the provider\'s website');
console.log('3. Update the .env file with your configuration');
console.log('\nExample .env file:');
console.log('PORT=3002');
console.log('LLM_PROVIDER=openai');
console.log('OPENAI_API_KEY=your_api_key_here');
console.log('\nFor local LLM (Ollama):');
console.log('PORT=3002');
console.log('LLM_PROVIDER=local');
console.log('LOCAL_LLM_URL=http://localhost:11434/api/chat');

console.log('\nNote: Make sure to restart the server after updating the .env file'); 