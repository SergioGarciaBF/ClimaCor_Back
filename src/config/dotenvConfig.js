require('dotenv').config();

const config = {
  serverPort: process.env.SERVER_PORT || 5000,
  tuyaDeviceId: process.env.TUYA_DEVICE_ID,
  web3ProviderUrl: process.env.WEB3_PROVIDER_URL,
  contractOwner: process.env.NET_NAME,
  private_key: process.env.OWNER_PRIVATE_KEY,
  apiKey: process.env.HG_WEATHER_KEY,
};

module.exports = config;
