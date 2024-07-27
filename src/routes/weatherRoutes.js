const express = require('express');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

router.get('/:city_name', weatherController.getWeatherData);

module.exports = router;
