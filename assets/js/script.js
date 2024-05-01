const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_KEY = "a4da270a6405ac5fe687f2d99bac9ed4"; //API key for OpenWeatherMAp APi

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(WEATHER_API_URL)
    .then(res => res.json())
    .then(data => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      console.log(fiveDaysForecast);
    })
    .catch(() => {
      alert("An error has occurred while fetching the weather forecast!");
    });
};

const getCityCoordinates = () => {
  //Get user entered city name and remove extras spaces
  const cityName = cityInput.value.trim();
  if (!cityName) return; //Return if cityName is empty
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&units=imperial`;

  fetch(GEOCODING_API_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error has occurred while fetching the coordinates!");
    });
};

searchButton.addEventListener("click", getCityCoordinates);
