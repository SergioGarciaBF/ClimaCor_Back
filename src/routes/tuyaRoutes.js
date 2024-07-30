const express = require('express');
const tuyaController = require('../controllers/tuyaController');
const router = express.Router();

router.get('/status', tuyaController.getDeviceStatus);
router.post('/switch/:value', tuyaController.switchLight);
router.post('/change_color/:value', tuyaController.changeColor);

module.exports = router;
