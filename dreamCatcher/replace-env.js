const fs = require('fs');
const path = require('path');
require('dotenv').config(); 

const envFilePath = path.join(__dirname, 'src/environments/environment.ts');
const prodEnvFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

// Define the content for the environment files
const content = `
  export const environment = {
    production: false,
    googleMapsApiKey: '${apiKey}'
  };
`;

const prodContent = `
  export const environment = {
    production: true,
    googleMapsApiKey: '${apiKey}'
  };
`;

// Ensure the directory exists
const envDir = path.dirname(envFilePath);
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Write or create the development environment file
if (!fs.existsSync(envFilePath)) {
  console.log(`Creating file: ${envFilePath}`);
}
fs.writeFileSync(envFilePath, content);

// Write or create the production environment file
if (!fs.existsSync(prodEnvFilePath)) {
  console.log(`Creating file: ${prodEnvFilePath}`);
}
fs.writeFileSync(prodEnvFilePath, prodContent);

console.log('Environment files updated with API key.');
