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

// Function to save searched city to local storage
const saveToLocalStorage = cityName => {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!searchHistory.includes(cityName)) {
      searchHistory.push(cityName);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }
};

// Function to display search history on the webpage
const displaySearchHistory = () => {
  const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  const searchHistoryList = document.querySelector(".search-history");

  searchHistoryList.innerHTML = "";
  searchHistory.forEach(city => {
      const listItem = document.createElement("li");
      listItem.textContent = city;
      listItem.addEventListener("click", () => {
          getCityWeather(city);
      });
      searchHistoryList.appendChild(listItem);
  });
};

// Function to fetch weather details for a city
const getCityWeather = cityName => {
  // Your existing code to fetch weather details based on city name
};

// Event listener for search button
searchButton.addEventListener("click", () => {
  const cityName = cityInput.value.trim();
  if (cityName) {
      saveToLocalStorage(cityName);
      getCityWeather(cityName);
      displaySearchHistory();
  }
});

// Display search history on page load
displaySearchHistory();





























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

