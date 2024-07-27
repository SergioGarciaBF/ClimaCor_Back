const { isDeviceRegistered, checkDeviceAuthentication } = require('../scripts/interact-contract-blockchain');
const { sendTuyaCommand } = require('../services/tuyaService');
const config = require('../config/dotenvConfig');

const getDeviceStatus = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const owner = config.contractOwner;

    const isRegistered = await isDeviceRegistered(deviceId);
    if (!isRegistered) {
      return res.status(403).json({ error: "Device not registered in the blockchain" });
    }

    const isAuthenticated = await checkDeviceAuthentication(deviceId, owner);
    if (!isAuthenticated) {
      return res.status(403).json({ error: "Device not authenticated in the blockchain" });
    }

    const status = await sendTuyaCommand(deviceId, null, null);
    res.status(200).json(status);
  } catch (error) {
    console.error("Error getting device status:", error);
    res.status(500).json({ error: "Failed to get device status" });
  }
};

const switchLight = async (req, res) => {
  const value = req.params.value === "true";
  const deviceId = req.params.deviceId;
  const owner = config.contractOwner;

  try {
    const isRegistered = await isDeviceRegistered(deviceId);
    if (!isRegistered) {
      return res.status(403).json({ error: "Device not registered in the blockchain" });
    }

    const isAuthenticated = await checkDeviceAuthentication(deviceId, owner);
    if (!isAuthenticated) {
      return res.status(403).json({ error: "Device not authenticated in the blockchain" });
    }

    const status = await sendTuyaCommand(deviceId, "switch_led", value);
    res.status(200).json(status);
  } catch (error) {
    console.error("Error switching light:", error);
    res.status(500).json({ error: "Failed to switch light" });
  }
};

const changeColor = async (req, res) => {
  try {
    const value = JSON.parse(req.params.value);
    const deviceId = req.params.deviceId;
    const owner = config.contractOwner;

    const isRegistered = await isDeviceRegistered(deviceId);
    if (!isRegistered) {
      return res.status(403).json({ error: "Device not registered in the blockchain" });
    }

    const isAuthenticated = await checkDeviceAuthentication(deviceId, owner);
    if (!isAuthenticated) {
      return res.status(403).json({ error: "Device not authenticated in the blockchain" });
    }

    const status = await sendTuyaCommand(deviceId, "colour_data_v2", value);
    res.status(200).json(status);
  } catch (error) {
    console.error("Error changing color:", error);
    res.status(400).json({ error: "Invalid color value" });
  }
};

module.exports = {
  getDeviceStatus,
  switchLight,
  changeColor,
};
