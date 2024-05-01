const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");

const API_key = "a4da270a6405ac5fe687f2d99bac9ed4"; //API key for OpenWeatherMAp APi

const getCityCoordinates = () => {
    //Get user entered city name and remove extras spaces
    const cityName = cityInput.value.trim();
    if(!cityName) return; //Return if cityName is empty
    const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_key}`;

    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        console.log(data)
    }).catch(() => {
        alert("An error has occurred while fetching the coordinates!");
    });

}

searchButton.addEventListener("click", getCityCoordinates);