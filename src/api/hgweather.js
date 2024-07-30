const config = require('../config/dotenvConfig');

const BASE_URL = "https://api.hgbrasil.com";

const getWeather = async (city_name) => {
    console.log(city_name)
    const url =
    `${BASE_URL}/weather?` +
    new URLSearchParams({
      key: config.apiKey,
      city_name: city_name
    });
  console.log(`Requesting ${url}`);
  const response = await fetch(url).then((r) => r.json());
  return response;
};

module.exports = {getWeather}