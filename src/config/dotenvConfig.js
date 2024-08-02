const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function loadEnvVariables() {
  const dotenvPath = path.resolve(__dirname, '../../.env');
  
  if (fs.existsSync(dotenvPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(dotenvPath));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  } else {
    console.error('The .env file not found.', dotenvPath);
  }
}

loadEnvVariables();

const config = {
  serverPort: process.env.SERVER_PORT || 5000,
  tuyaDeviceId: process.env.TUYA_DEVICE_ID,
  web3ProviderUrl: process.env.WEB3_PROVIDER_URL,
  contractOwner: process.env.NET_NAME,
  apiKey: process.env.HG_WEATHER_KEY,
  tuyaAccessKey: process.env.TUYA_ACCESS_ID,
  tuyaSecretKey: process.env.TUYA_ACCESS_SECRET,
};

module.exports = config;
