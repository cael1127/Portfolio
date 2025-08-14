const fs = require('fs');

// Read the App.jsx file
const appContent = fs.readFileSync('App.jsx', 'utf8');

// List of demo functions to remove (these are now imported)
const demoFunctions = [
  'AIOptimizationDemo',
  'DeFiDemo', 
  'AIResearchDemo',
  'NFTMarketplaceDemo',
  'AITradingBotDemo',
  'BlockchainIdentityDemo',
  'AIContentGenerationDemo',
  'BlockchainGovernanceDemo',
  'AIPredictiveAnalyticsDemo',
  'ERPDemo',
  'EcommerceDemo',
  'CRMDemo',
  'BIDemo',
  'PaymentDemo',
  'RiskDemo',
  'TradingDemo',
  'CryptoExchangeDemo',
  'TelemedicineDemo',
  'ClinicalDemo',
  'HealthcareAnalyticsDemo',
  'MedicalImagingDemo',
  'SmartCityDemo',
  'IndustrialIoTDemo',
  'SmartHomeDemo',
  'AgriculturalIoTDemo',
  'MicroservicesDemo',
  'AnalyticsDemo',
  'ServerlessDemo',
  'EventDrivenDemo',
  'SOCDemo',
  'ZeroTrustDemo',
  'ScannerDemo',
  'HelpdeskDemo'
];

// List of large page components to remove (these are now in separate files)
const pageComponents = [
  'LiveDataDemo',
  'CloudMigrationToolset',
  'FreelancingPage'
];

// List of UI components to remove (these are now in separate files)
const uiComponents = [
  'LiveChart',
  'GalleryDemo',
  'DataTableDemo',
  'ChatbotDemo',
  'LoginDemo',
  'IoTDemo',
  'DevOpsDemo'
];

// Remove each demo function definition
let updatedContent = appContent;
demoFunctions.forEach(demoName => {
  const functionRegex = new RegExp(
    `function ${demoName}\\(\\)\\s*{[\\s\\S]*?}\\s*}`,
    'g'
  );
  updatedContent = updatedContent.replace(functionRegex, '');
});

// Remove each page component definition
pageComponents.forEach(componentName => {
  const functionRegex = new RegExp(
    `function ${componentName}\\(\\)\\s*{[\\s\\S]*?}\\s*}`,
    'g'
  );
  updatedContent = updatedContent.replace(functionRegex, '');
});

// Remove each UI component definition
uiComponents.forEach(componentName => {
  const functionRegex = new RegExp(
    `function ${componentName}\\(\\)\\s*{[\\s\\S]*?}\\s*}`,
    'g'
  );
  updatedContent = updatedContent.replace(functionRegex, '');
});

// Write the updated content back to App.jsx
fs.writeFileSync('App.jsx', updatedContent);

console.log('Removed old demo function definitions, page components, and UI components from App.jsx');
console.log(`Original size: ${(appContent.length / 1024).toFixed(2)} KB`);
console.log(`New size: ${(updatedContent.length / 1024).toFixed(2)} KB`);
console.log(`Reduced by: ${((appContent.length - updatedContent.length) / 1024).toFixed(2)} KB`); 