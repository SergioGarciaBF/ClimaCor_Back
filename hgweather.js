// faz as requisições para a API de clima

const BASE_URL = "https://api.hgbrasil.com";

const getWeather = async (city_name) => {
    console.log(city_name)
    const url =
    `${BASE_URL}/weather?` +
    new URLSearchParams({
      key: process.env.HG_WEATHER_KEY,
      city_name: city_name
    });
  console.log(`Requesting ${url}`);
  const response = await fetch(url).then((r) => r.json());
  return response;
};

module.exports = {getWeather}