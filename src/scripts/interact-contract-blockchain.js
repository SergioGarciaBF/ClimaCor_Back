const init = require('./web3-config');

const main = async () => {
  try {
    const { web3, contract } = await init();

    const registerDevice = async (deviceId, owner) => {
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerDevice(deviceId, owner).send({ from: accounts[0] });
        console.log('Device registered successfully');
      } catch (error) {
        console.error('Error registering device:', error);
      }
    };

    const isDeviceRegistered = async (deviceId) => {
      try {
        const isRegistered = await contract.methods.isDeviceRegistered(deviceId).call();
        return isRegistered;
      } catch (error) {
        console.error('Error checking device registration:', error);
      }
    };

    await registerDevice('deviceTest123', 'ownerTeste');
    const registered = await isDeviceRegistered('deviceTest123');
    console.log('Device registered:', registered);

  } catch (error) {
    console.error('Error in main execution:', error);
  }
};

main();
