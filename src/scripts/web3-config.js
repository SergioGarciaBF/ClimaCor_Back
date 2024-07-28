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
  .then(() => console.log('Connected to the Ethereum Blockchain'))
  .catch(e => {
    console.error('Ethereum Blockchain off:', e.message || e);
    process.exit(1);
  });

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

const signMessage = async (deviceId, owner) => {
  //Get private key
  const privateKey = '0x' + config.private_key;
  const signerAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  //Calculate the message hash
  const messageHash = web3.utils.soliditySha3({ type: 'string', value: deviceId }, { type: 'string', value: owner });
  //Sign the message using the generated private key
  const { signature } = web3.eth.accounts.sign(messageHash, privateKey);
  return { messageHash, signature, signerAddress };
};

module.exports = {
  initWeb3,
  signMessage,
};

