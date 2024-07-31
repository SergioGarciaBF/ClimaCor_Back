const config = require('../config/dotenvConfig');

module.exports = async function(callback) {

  const deviceId = config.tuyaDeviceId;
  const owner = config.contractOwner;

  if (!deviceId || !owner) {
    console.error('Device ID or Owner is not defined in the configuration.');
    callback();
  }
  
  try {
    // Get the contract instance
    const DeviceRegistry = artifacts.require("DeviceRegistry");
    const instance = await DeviceRegistry.deployed();
    
    // Get the available accounts
    const accounts = await web3.eth.getAccounts();
    
    // Register a new device
    await instance.registerDevice(deviceId, owner, { from: accounts[0] });
    console.log("Device successfully registered.");
    
    // Check that the device is registered
    const isRegistered = await instance.isDeviceRegistered(deviceId);
    console.log("Registered Device:", isRegistered);
    
    // Authenticate the device (if needed)
    // const isAuthenticated = await instance.authenticateDevice("device1234", "owner123");
    // console.log("Authenticated Device:", isAuthenticated);
    
  } catch (error) {
    console.error("Error executing the script:", error);
  }

  callback();
};
