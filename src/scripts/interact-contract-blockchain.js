const { initWeb3, signMessage } = require('./web3-config');

const registerDevice = async (deviceId, owner) => {
  try {
    const { web3, contract } = await initWeb3();
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerDevice(deviceId, owner).send({ from: accounts[0] });
    console.log('Device registered successfully');
  } catch (error) {
    console.error('Error registering device:', error);
  }
};

const checkDeviceAuthentication = async (deviceId, owner) => {
  try {
    const { contract } = await initWeb3();
    //const { messageHash, signature, signerAddress } = await signMessage(deviceId, owner);
    //const isAuthenticated = await contract.methods.authenticateDevice(deviceId, owner, messageHash, signature).send({ from: signerAddress });
    const isAuthenticated = await contract.methods.authenticateDevice(deviceId, owner).call();
    console.log("isAuthenticated - ", isAuthenticated);
    return isAuthenticated;
  } catch (error) {
    console.error('Error checking device authentication:', error);
    throw error;
  }
};

const isDeviceRegistered = async (deviceId) => {
  try {
    const { contract } = await initWeb3();
    const isRegistered = await contract.methods.isDeviceRegistered(deviceId).call();
    return isRegistered;
  } catch (error) {
    console.error('Error checking device registration:', error);
  }
};

module.exports = {
  registerDevice,
  isDeviceRegistered,
  checkDeviceAuthentication
};
