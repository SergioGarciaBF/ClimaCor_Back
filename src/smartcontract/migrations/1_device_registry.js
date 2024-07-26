const deviceRegistry = artifacts.require("DeviceRegistry");

module.exports = function (deployer) {
  deployer.deploy(deviceRegistry);
};
