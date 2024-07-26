module.exports = async function(callback) {
    try {
      //Get the contract instance
      const DeviceRegistry = artifacts.require("DeviceRegistry");
      const instance = await DeviceRegistry.deployed();
  
      //Get the available accounts
      const accounts = await web3.eth.getAccounts();
  
      //Register a new device
      await instance.registerDevice("device1234", "owner123", { from: accounts[0] });
      console.log("Device successfully registered.");
  
      //Check that the device is registered
      const isRegistered = await instance.isDeviceRegistered("device1234");
      console.log("Registered Device:", isRegistered);
  
      //Authenticate the device
      const isAuthenticated = await instance.authenticateDevice("device1234", "owner123");
      console.log("Authenticated Device:", isAuthenticated);
  
    } catch (error) {
      console.error("Erro ao executar o script:", error);
    }
  
    callback();
  };
  