const express = require('express');
const tuyaController = require('../controllers/tuyaController');
const router = express.Router();

router.get('/status/:deviceId', tuyaController.getDeviceStatus);
router.post('/switch/:deviceId/:value', tuyaController.switchLight);
router.post('/change_color/:deviceId/:value', tuyaController.changeColor);

module.exports = router;
