const { getWeather } = require('../services/weatherService');

const getWeatherData = async (req, res) => {
  try {
    const cityName = req.params.city_name;
    const response = await getWeather(cityName);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting weather data:", error);
    res.status(500).json({ error: "Failed to get weather data" });
  }
};

module.exports = {
  getWeatherData,
};
