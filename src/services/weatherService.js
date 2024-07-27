const getWeather = async (cityName) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${cityName}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting weather data:", error);
      throw error;
    }
};
  
module.exports = {
    getWeather,
};
  