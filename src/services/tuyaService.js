const tuya = require('../api/tuya');

const sendTuyaCommand = async (deviceId, command, value) => {
  try {
    if(!command){
      const status = await tuya.tuyaContext().deviceStatus.status({
        device_id: deviceId,
      });
      return status;
    }
    else{
    const status = await tuya.tuyaContext().request({
      path: `/v1.0/iot-03/devices/${deviceId}/commands`,
      method: "POST",
      body: {
        commands: [{ code: command, value }],
      },
    });
    return status;
  }
  } catch (error) {
    console.error("Error sending Tuya command:", error);
    throw error;
  }
};
  
module.exports = {
  sendTuyaCommand
};
