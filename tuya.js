const tuyaConnector = require('@tuya/tuya-connector-nodejs')
const dotEnv = require('dotenv')
dotEnv.config()

function tuyaContext () {
    return new tuyaConnector.TuyaContext({
        baseUrl: "https://openapi.tuyaus.com/",
        accessKey: process.env.TUYA_ACCESS_ID,
        secretKey: process.env.TUYA_ACCESS_SECRET,
    });
}

module.exports = {tuyaContext}

