const express = require('express');
const tuyaRoutes = require('../routes/tuyaRoutes');
const weatherRoutes = require('../routes/weatherRoutes');
const { logRequest } = require('../utils/logUtil');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequest);

//Routes
app.use('/tuya', tuyaRoutes);
app.use('/weather', weatherRoutes);

module.exports = app;
