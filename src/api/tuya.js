const tuyaConnector = require('@tuya/tuya-connector-nodejs');
const config = require('../config/dotenvConfig');

function tuyaContext () {
    return new tuyaConnector.TuyaContext({
        baseUrl: "https://openapi.tuyaus.com/",
        accessKey: config.tuyaAccessKey,
        secretKey: config.tuyaSecretKey,
    });
}

module.exports = {tuyaContext}

