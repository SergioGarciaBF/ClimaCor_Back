const Web3 = require('web3');
const fs = require('fs');
const DeviceRegistry = JSON.parse(fs.readFileSync('../smartcontract/build/contracts/DeviceRegistry.json', 'utf8'));

//Your RPC endpoint of the blockchain instance
const providerUrl = 'http://127.0.0.1:8545';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

web3.eth.net.isListening()
  .then(() => console.log('Connected to the Ethereum node'))
  .catch(e => console.log('Connection error:', e));

  const init = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      const contractAddress = DeviceRegistry.networks[networkId].address;
  
      if (!contractAddress) {
        throw new Error(`The contract is not deployed on the network with ID ${networkId}.`);
      }
  
      const contract = new web3.eth.Contract(DeviceRegistry.abi, contractAddress);
      return { web3, contract };
    } catch (error) {
      console.error('Error initializing web3 and contract:', error);
      throw error;
    }
  };

module.exports = init;

