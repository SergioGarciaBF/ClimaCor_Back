
//import { getWeather } from "./hgweather";
const hgweather = require("./hgweather")
//import { TuyaContext } from "@tuya/tuya-connector-nodejs";
const tuya = require("./tuya");
// Import the express module
const express = require("express");
// Create an instance of the express application
const app = express();
// Specify a port number for the server
const port = 5000; //env --------------------------------

export const logRequest = (req) => {
  let msg = `[${req.method}] ${new Date()} - ${req.url}`;
  if (req.body) msg = `${msg} - body: ${JSON.stringify(req.body)}`;

  console.log(msg);
};

// Start the server and listen to the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//GET
app.get("/tuya/status", async (req, res) => {
  logRequest(req);
  const status = await tuya.tuyaContext().deviceStatus.status({
    device_id: process.env.TUYA_DEVICE_ID,
  });
  res.status(200).json(status);
});

//POST - Ligar/Desligar Lâmpada
app.post("/tuya/switch/:value", async (req, res) => {
  logRequest(req);
  if (!["true", "false"].includes(req.params.value)) {
    res
      .status(403)
      .json(`Invalid value '${req.params.value}' - required 'true' or 'false'`);
  } else {
    const value = JSON.parse(req.params.value);
    const status = await tuya.tuyaContext().request({
      //
      path: `/v1.0/iot-03/devices/${process.env.TUYA_DEVICE_ID}/commands`,
      method: "POST",
      body: {
        commands: [{ code: "switch_led", value }],
      },
    }); // montar uma função pra isso aqui
    if (!status.success) throw new Error();
    res.status(200).json(status);
  }
});

//POST - Mudar cor da lâmpada
app.post("/tuya/change_color/:value", async (req, res) => {
  logRequest(req);
  const value = JSON.parse(req.params.value);
  //console.log(value); //Apenas para mostrar a cor da lâmpada
  const status = await tuya.tuyaContext().request({
    path: `/v1.0/iot-03/devices/${process.env.TUYA_DEVICE_ID}/commands`,
    method: "POST",
    body: {
      commands: [{ code: "colour_data_v2", value }],
    },
  }); // montar uma função pra isso aqui
  if (!status.success) throw new Error();
  res.status(200).json(status);
});

//GET - coletar dados do clima
app.get("/weather/:city_name", async (req, res) => {
  logRequest(req);
  const value = req.params.city_name
  const response = await hgweather.getWeather(value);
  res.status(200).json(response);
});