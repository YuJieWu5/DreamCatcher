const fs = require('fs');
const path = require('path');
require('dotenv').config(); 
const envFilePath = path.join(__dirname, 'src/environments/environment.ts');
const prodEnvFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

const apiKey = process.env.GOOGLE_MAPS_API_KEY || '';

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

fs.writeFileSync(envFilePath, content);
fs.writeFileSync(prodEnvFilePath, prodContent);

console.log('Environment files updated with API key.');
