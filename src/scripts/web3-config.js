require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const config = require('../config/dotenvConfig');

const contractPath = path.resolve(__dirname, '../smartcontract/build/contracts/DeviceRegistry.json');
const DeviceRegistry = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

//Your RPC endpoint of the blockchain instance
const web3 = new Web3(new Web3.providers.HttpProvider(config.web3ProviderUrl));

web3.eth.net.isListening()
  .then(() => console.log('Connected to the Ethereum node'))
  .catch(e => console.log('Connection error:', e));

const initWeb3 = async () => {
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

module.exports = initWeb3;

