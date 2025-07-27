const fs = require('fs');
const path = require('path');

const components = [
  'RealTimeCollaboration.jsx',
  'QuantumComputingDemo.jsx', 
  'EdgeComputing.jsx',
  'BlockchainAdvanced.jsx',
  'AdvancedAnalytics.jsx'
];

components.forEach(component => {
  const filePath = path.join(__dirname, 'src', 'components', component);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the problematic template literal backticks
  content = content.replace(/export default \w+;`;\s*\n\s*return/g, 'export default $1;\n\n  return');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${component}`);
}); 