// const DeviceRegistry = artifacts.require("DeviceRegistry");
// //const Malicious = artifacts.require("Malicious");

// module.exports = async function (deployer) {
//   await deployer.deploy(DeviceRegistry);
//   const deviceRegistry = await DeviceRegistry.deployed();
  
//   const deviceRegistryAddress = deviceRegistry.address;

//   await deployer.deploy(deviceRegistryAddress);
//   //await deployer.deploy(Malicious, deviceRegistryAddress);
// };

const deviceRegistry = artifacts.require("DeviceRegistry");

module.exports = function (deployer) {
  deployer.deploy(deviceRegistry);
};