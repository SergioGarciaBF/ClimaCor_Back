require('dotenv').config();

const express = require("express");
const hgweather = require("./hgweather");
const tuya = require("./tuya");

const app = express();
const port = process.env.SERVER_PORT || 5000;

//Request log
const logRequest = (req) => {
  let msg = `[${req.method}] ${new Date()} - ${req.url}`;
  if (req.body) msg = `${msg} - body: ${JSON.stringify(req.body)}`;
  console.log(msg);
};

//Method to send commands to Tuya
const sendTuyaCommand = async (deviceId, command, value) => {
  try {
    const status = await tuya.tuyaContext().request({
      path: `/v1.0/iot-03/devices/${deviceId}/commands`,
      method: "POST",
      body: {
        commands: [{ code: command, value }],
      },
    });
    return status;
  } catch (error) {
    console.error("Error sending Tuya command:", error);
    throw error;
  }
};

//Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//GET status of the Tuya device
app.get("/tuya/status", async (req, res) => {
  logRequest(req);
  try {
    const status = await tuya.tuyaContext().deviceStatus.status({
      device_id: process.env.TUYA_DEVICE_ID,
    });
    res.status(200).json(status);
  } catch (error) {
    console.error("Error getting device status:", error);
    res.status(500).json({ error: "Failed to get device status" });
  }
});

//POST to switch the lamp on/off
app.post("/tuya/switch/:value", async (req, res) => {
  logRequest(req);
  const value = req.params.value === "true";

  try {
    const status = await sendTuyaCommand(process.env.TUYA_DEVICE_ID, "switch_led", value);
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: "Failed to switch light" });
  }
});

//POST to change lamp color
app.post("/tuya/change_color/:value", async (req, res) => {
  logRequest(req);
  try {
    const value = JSON.parse(req.params.value);
    const status = await sendTuyaCommand(process.env.TUYA_DEVICE_ID, "colour_data_v2", value);
    res.status(200).json(status);
  } catch (error) {
    console.error("Error changing color:", error);
    res.status(400).json({ error: "Invalid color value" });
  }
});

//GET to collect weather data
app.get("/weather/:city_name", async (req, res) => {
  logRequest(req);
  try {
    const value = req.params.city_name;
    const response = await hgweather.getWeather(value);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting weather data:", error);
    res.status(500).json({ error: "Failed to get weather data" });
  }
});
