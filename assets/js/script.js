
localStorage.clear();

function findCity(cityName) {
  cityName = titleCase($("#cityName")[0].value.trim());
  const API_KEY = `a4da270a6405ac5fe687f2d99bac9ed4`;

  let apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}&units=imperial`;


  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        $("#city-name")[0].textContent =
          cityName + " (" + moment().format("M/D/YYYY") + ")";

        $("#city-list").append(
          '<button type="button" class="list-group-item list-group-item-light list-group-item-action city-name">' +
            cityName
        );

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        let latLonPair = lat.toString() + " " + lon.toString();
        localStorage.setItem(cityName, latLonPair);

        apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=${API_KEY}`;

        fetch(apiURL).then(function (newResponse) {
          if (newResponse.ok) {
            newResponse.json().then(function (newData) {
              getCurrentWeather(newData);
            });
          }
        });
      });
    } else {
      alert("Cannot find city!");
    }
  });
}

// This function gets the info for a city already in the list. It does not need to check whether the city exists as it was already checked when the city was first searched for.
function getListCity(coordinates) {
  const API_KEY = "a4da270a6405ac5fe687f2d99bac9ed4";
  apiURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coordinates[0] +
    "&lon=" +
    coordinates[1] +
    "&exclude=minutely,hourly&units=imperial&appid=" +
    API_KEY;

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getCurrentWeather(data);
      });
    }
  });
}

function getCurrentWeather(data) {
  $(".results-panel").addClass("visible");

  $("#currentIcon")[0].src =
    "http://openweathermap.org/img/wn/" +
    data.current.weather[0].icon +
    "@2x.png";
  $("#temperature")[0].textContent =
    "Temperature: " + data.current.temp.toFixed(1) + " \u2109";
  $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
  $("#wind-speed")[0].textContent =
    "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
  $("#uv-index")[0].textContent = "  " + data.current.uvi;

  if (data.current.uvi < 3) {
    $("#uv-index").removeClass("moderate severe");
    $("#uv-index").addClass("favorable");
  } else if (data.current.uvi < 6) {
    $("#uv-index").removeClass("favorable severe");
    $("#uv-index").addClass("moderate");
  } else {
    $("#uv-index").removeClass("favorable moderate");
    $("#uv-index").addClass("severe");
  }

  getFutureWeather(data);
}

function getFutureWeather(data) {
  for (var i = 0; i < 5; i++) {
    var futureWeather = {
      date: convertUnixTime(data, i),
      icon:
        "http://openweathermap.org/img/wn/" +
        data.daily[i + 1].weather[0].icon +
        "@2x.png",
      temp: data.daily[i + 1].temp.day.toFixed(1),
      humidity: data.daily[i + 1].humidity,
    };

    var currentSelector = "#day-" + i;
    $(currentSelector)[0].textContent = futureWeather.date;
    currentSelector = "#img-" + i;
    $(currentSelector)[0].src = futureWeather.icon;
    currentSelector = "#temp-" + i;
    $(currentSelector)[0].textContent =
      "Temp: " + futureWeather.temp + " \u2109";
    currentSelector = "#hum-" + i;
    $(currentSelector)[0].textContent =
      "Humidity: " + futureWeather.humidity + "%";
  }
}

// This function applies title case to a city name if there is more than one word.
function titleCase(city) {
  var updatedCity = city.toLowerCase().split(" ");
  var returnedCity = "";
  for (var i = 0; i < updatedCity.length; i++) {
    updatedCity[i] = updatedCity[i][0].toUpperCase() + updatedCity[i].slice(1);
    returnedCity += " " + updatedCity[i];
  }
  return returnedCity;
}

// This converts the UNIX time that is received from the server.
function convertUnixTime(data, index) {
  const dateObject = new Date(data.daily[index + 1].dt * 1000);

  return dateObject.toLocaleDateString();
}

$("#search-button").on("click", function (e) {
  e.preventDefault();
  const cityName = $("#cityName").val(); // Get the city name from the input field
  findCity(cityName); // Call findCity function with the city name
  $("form")[0].reset();
});

$(".city-list-box").on("click", ".city-name", function () {
  var coordinates = localStorage.getItem($(this)[0].textContent).split(" ");
  coordinates[0] = parseFloat(coordinates[0]);
  coordinates[1] = parseFloat(coordinates[1]);

  $("#city-name")[0].textContent =
    $(this)[0].textContent + " (" + moment().format("M/D/YYYY") + ")";

  getListCity(coordinates);
});

// ============================================================================================================================================


// localStorage.clear();

// function findCity() {
//   var cityName = titleCase($("#cityName")[0].value.trim());

//   var apiURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     cityName +
//     "&units=imperial&appid=d379cf3a4ed305920e4612c876a5df45";

//   fetch(apiURL).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         $("#city-name")[0].textContent =
//           cityName + " (" + moment().format("M/D/YYYY") + ")";

//         $("#city-list").append(
//           '<button type="button" class="list-group-item list-group-item-light list-group-item-action city-name">' +
//             cityName
//         );

//         const lat = data.coord.lat;
//         const lon = data.coord.lon;

//         var latLonPair = lat.toString() + " " + lon.toString();

//         localStorage.setItem(cityName, latLonPair);

//         apiURL =
//           "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//           lat +
//           "&lon=" +
//           lon +
//           "&exclude=minutely,hourly&units=imperial&appid=d379cf3a4ed305920e4612c876a5df45";

//         fetch(apiURL).then(function (newResponse) {
//           if (newResponse.ok) {
//             newResponse.json().then(function (newData) {
//               getCurrentWeather(newData);
//             });
//           }
//         });
//       });
//     } else {
//       alert("Cannot find city!");
//     }
//   });
// }

// // This function gets the info for a city already in the list. It does not need to check whether the city exists as it was already checked when the city was first searched for.
// function getListCity(coordinates) {
//   apiURL =
//     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//     coordinates[0] +
//     "&lon=" +
//     coordinates[1] +
//     "&exclude=minutely,hourly&units=imperial&appid=d379cf3a4ed305920e4612c876a5df45";

//   fetch(apiURL).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         getCurrentWeather(data);
//       });
//     }
//   });
// }

// function getCurrentWeather(data) {
//   $(".results-panel").addClass("visible");

//   $("#currentIcon")[0].src =
//     "http://openweathermap.org/img/wn/" +
//     data.current.weather[0].icon +
//     "@2x.png";
//   $("#temperature")[0].textContent =
//     "Temperature: " + data.current.temp.toFixed(1) + " \u2109";
//   $("#humidity")[0].textContent = "Humidity: " + data.current.humidity + "% ";
//   $("#wind-speed")[0].textContent =
//     "Wind Speed: " + data.current.wind_speed.toFixed(1) + " MPH";
//   $("#uv-index")[0].textContent = "  " + data.current.uvi;

//   if (data.current.uvi < 3) {
//     $("#uv-index").removeClass("moderate severe");
//     $("#uv-index").addClass("favorable");
//   } else if (data.current.uvi < 6) {
//     $("#uv-index").removeClass("favorable severe");
//     $("#uv-index").addClass("moderate");
//   } else {
//     $("#uv-index").removeClass("favorable moderate");
//     $("#uv-index").addClass("severe");
//   }

//   getFutureWeather(data);
// }

// function getFutureWeather(data) {
//   for (var i = 0; i < 5; i++) {
//     var futureWeather = {
//       date: convertUnixTime(data, i),
//       icon:
//         "http://openweathermap.org/img/wn/" +
//         data.daily[i + 1].weather[0].icon +
//         "@2x.png",
//       temp: data.daily[i + 1].temp.day.toFixed(1),
//       humidity: data.daily[i + 1].humidity,
//     };

//     var currentSelector = "#day-" + i;
//     $(currentSelector)[0].textContent = futureWeather.date;
//     currentSelector = "#img-" + i;
//     $(currentSelector)[0].src = futureWeather.icon;
//     currentSelector = "#temp-" + i;
//     $(currentSelector)[0].textContent =
//       "Temp: " + futureWeather.temp + " \u2109";
//     currentSelector = "#hum-" + i;
//     $(currentSelector)[0].textContent =
//       "Humidity: " + futureWeather.humidity + "%";
//   }
// }

// // This function applies title case to a city name if there is more than one word.
// function titleCase(city) {
//   var updatedCity = city.toLowerCase().split(" ");
//   var returnedCity = "";
//   for (var i = 0; i < updatedCity.length; i++) {
//     updatedCity[i] = updatedCity[i][0].toUpperCase() + updatedCity[i].slice(1);
//     returnedCity += " " + updatedCity[i];
//   }
//   return returnedCity;
// }

// // This converts the UNIX time that is received from the server.
// function convertUnixTime(data, index) {
//   const dateObject = new Date(data.daily[index + 1].dt * 1000);

//   return dateObject.toLocaleDateString();
// }

// $("#search-button").on("click", function (e) {
//   e.preventDefault();

//   findCity();

//   $("form")[0].reset();
// });

// $(".city-list-box").on("click", ".city-name", function () {
//   var coordinates = localStorage.getItem($(this)[0].textContent).split(" ");
//   coordinates[0] = parseFloat(coordinates[0]);
//   coordinates[1] = parseFloat(coordinates[1]);

//   $("#city-name")[0].textContent =
//     $(this)[0].textContent + " (" + moment().format("M/D/YYYY") + ")";

//   getListCity(coordinates);
// });

//================================================================================================================================

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
//                 <h4>Wind: ${weatherItem.wind.speed}MPH</h4>
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
//             <h4>Wind: ${weatherItem.wind.speed}MPH </h4>
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