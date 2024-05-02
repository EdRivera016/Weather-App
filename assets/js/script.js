// const cityInput = document.querySelector(".city-input");
// const searchButton = document.querySelector(".search-btn");
// const locationButton = document.querySelector(".location-btn");
// const currentWeatherDiv = document.querySelector(".current-weather")
// const weatherCardsDiv = document.querySelector(".weather-cards");

// const API_KEY = "a4da270a6405ac5fe687f2d99bac9ed4"; //API key for OpenWeatherMAp APi

// const createWeatherCard = (cityName, weatherItem, index) => {
//   if(index === 0) { //HTMLfor the main weather card
//     return `<div class="details">
//                 <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
//                 <h4>Temperature: ${(weatherItem.main.temp).toFixed(2)}&#176;F</h4>
//                 <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
//                 <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//             </div>
//             <div class="icon">
//                 <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon" />
//                 <h4>${weatherItem.weather[0].description}</h4>
//             </div>`;
//   } else {
//   return `<li class="card">
//             <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
//             <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather icon" />
//             <h4>Temp: ${(weatherItem.main.temp).toFixed(2)}&#176;F</h4>
//             <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
//             <h4>Humidity: ${weatherItem.main.humidity}%</h4>
//           </li>`
//   }
// }

// const storeSearchedCity = (cityName) => {
//   let searchedCities = JSON.parse(localStorage.getItem('searchedCities'))
// console.log(cityName)
//   if(!searchedCities.includes(cityName)) {
//     searchedCities.push(cityName);
//     localStorage.setItem('searchedCities', JSON.stringify(searchedCities))
//   }
// };

// const displaySearchHistory = () => {
//   const searchHistoryDiv = document.querySelector('.search-history');
//   const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

//   searchHistoryDiv.innerHTML = '';
//   searchedCities.forEach(city => {
//     const cityElement = document.createElement('div');
//     cityElement.textContent = city;
//     cityElement.classList.add('searched-city');
//     cityElement.addEventListener('click', () => getWeatherDetails(city));
//     searchHistoryDiv.appendChild(cityElement);
//   });
// };

// const getWeatherDetails = (cityName, lat, lon) => {
//   const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

//   fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
//     const uniqueForecastDays = [];
//     const fiveDaysForecast = data.list.filter(forecast => {
//       const forecastDate = new Date(forecast.dt_txt).getDate();
//       if (!uniqueForecastDays.includes(forecastDate)) {
//         return uniqueForecastDays.push(forecastDate);
//       }
//     });

//     //clear previous data
//     cityInput.value = "";
//     currentWeatherDiv.innerHTML = "";
//     weatherCardsDiv.innerHTML = "";
// //Creating weather cards and adding the to the DOM
//     fiveDaysForecast.forEach((weatherItem, index) => {
//   if (index === 0) {
//     currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//   } else {
//     weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
//   }
// });
// }).catch (() => {
//   alert("An error has occurred while fetching the weather forecast!");
// });
// }
// const getCityCoordinates = () => {
//   //Get user entered city name and remove extras spaces
//   const cityName = cityInput.value.trim();
//   if (!cityName) return; //Return if cityName is empty
//   const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&units=imperial`;

//   fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
//       if (!data.length) return alert(`No coordinates found for ${cityName}`);
//       const { name, lat, lon } = data[0];
//       getWeatherDetails(name, lat, lon);
//     })
//     .catch(() => {
//       alert("An error has occurred while fetching the coordinates!");
//     });
// }

// const getUserCoordinates = () => {
//   navigator.geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       const RESERVE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
      
//       //Get city name from coordinates using reverse geocoding API
//       fetch(RESERVE_GEOCODING_URL).then(res => res.json()).then(data => {
//         const { name } = data[0];
//         getWeatherDetails(name, latitude, longitude);
//       }).catch(() => {
//       alert("An error has occurred while fetching the coordinates!");
//     });
//     },
//     error => { // Show alert if user denied the location permission
//       if(error.code === error.PERMISSION_DENIED) {
//         alert("Geolocation request denied. Please reset location permission to grant access again.")
//       }
//     }
//   );
// }
// locationButton.addEventListener("click", getUserCoordinates);
// searchButton.addEventListener("click", getCityCoordinates);
// cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

// document.addEventListener('click', (event) => {
//   if(event.target.classList.contains('searched-city')) {
//     const cityName = event.target.textContent;
//     getWeatherDetails(cityName);
//   };
// });





























const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather")
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "a4da270a6405ac5fe687f2d99bac9ed4"; //API key for OpenWeatherMAp APi

const createWeatherCard = (cityName, weatherItem, index) => {
  if(index === 0) { //HTMLfor the main weather card
    return `<div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temperature: ${(weatherItem.main.temp).toFixed(2)}&#176;F</h4>
                <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </div>
            <div class="icon">
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather icon" />
                <h4>${weatherItem.weather[0].description}</h4>
            </div>`;
  } else {
  return `<li class="card">
            <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
            <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather icon" />
            <h4>Temp: ${(weatherItem.main.temp).toFixed(2)}&#176;F</h4>
            <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
            <h4>Humidity: ${weatherItem.main.humidity}%</h4>
          </li>`
  }
}

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
    const uniqueForecastDays = [];
    const fiveDaysForecast = data.list.filter(forecast => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecastDays.includes(forecastDate)) {
        return uniqueForecastDays.push(forecastDate);
      }
    });

    //clear previous data
    cityInput.value = "";
    currentWeatherDiv.innerHTML = "";
    weatherCardsDiv.innerHTML = "";
//Creating weather cards and adding the to the DOM
    fiveDaysForecast.forEach((weatherItem, index) => {
  if (index === 0) {
    currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
  } else {
    weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
  }
});
}).catch (() => {
  alert("An error has occurred while fetching the weather forecast!");
});
}
const getCityCoordinates = () => {
  //Get user entered city name and remove extras spaces
  const cityName = cityInput.value.trim();
  if (!cityName) return; //Return if cityName is empty
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&units=imperial`;

  fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
      if (!data.length) return alert(`No coordinates found for ${cityName}`);
      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error has occurred while fetching the coordinates!");
    });
}

const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const RESERVE_GEOCODING_URL =`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
      
      //Get city name from coordinates using reverse geocoding API
      fetch(RESERVE_GEOCODING_URL).then(res => res.json()).then(data => {
        const { name } = data[0];
        getWeatherDetails(name, latitude, longitude);
      }).catch(() => {
      alert("An error has occurred while fetching the coordinates!");
    });
    },
    error => { // Show alert if user denied the location permission
      if(error.code === error.PERMISSION_DENIED) {
        alert("Geolocation request denied. Please reset location permission to grant access again.")
      }
    }
  );
}



locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

