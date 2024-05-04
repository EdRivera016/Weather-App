function initPage() {
    // Get References to various elements in the HTML 
    const city = document.getElementById("city-input");
    const search = document.getElementById("search-button");
    const clear = document.getElementById("clear-history");
    const name = document.getElementById("city-name");
    const currentPic = document.getElementById("current-pic");
    const currentTemp = document.getElementById("temperature");
    const currentHumidity = document.getElementById("humidity");
    const currentWind = document.getElementById("wind-speed");
    const currentUV = document.getElementById("UV-index");
    const history = document.getElementById("history");
    var fiveday = document.getElementById("fiveday-header");
    var todayweather = document.getElementById("today-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    // Assigning a unique API to a variable
    const APIKey = "a4da270a6405ac5fe687f2d99bac9ed4";

    // Function to fetch weather data for a given city
    function getWeather(cityName) {
        // Execute a current weather get request from open weather api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {

                todayweather.classList.remove("d-none");

                // Parse response to display current weather
                const currentDate = new Date(response.data.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                name.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                currentPic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPic.setAttribute("alt", response.data.weather[0].description);
                currentTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                
                // Get UV Index
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
                axios.get(UVQueryURL)
                    .then(function (response) {
                        let UVIndex = document.createElement("span");
                        
                        // When UV Index is good, shows green, when ok shows yellow, when bad shows red
                        if (response.data[0].value < 4 ) {
                            UVIndex.setAttribute("class", "badge badge-success");
                        }
                        else if (response.data[0].value < 8) {
                            UVIndex.setAttribute("class", "badge badge-warning");
                        }
                        else {
                            UVIndex.setAttribute("class", "badge badge-danger");
                        }
                        console.log(response.data[0].value)
                        UVIndex.innerHTML = response.data[0].value;
                        currentUV.innerHTML = "UV Index: ";
                        currentUV.append(UVIndex);
                    });
                
                // Get 5 day forecast for this city
                let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                        fiveday.classList.remove("d-none");
                        
                        //  Function to parse the response and display forecast for the next 5 da
                        const forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();

                            // Create elements to display forecast date, weather icon,temperature, and humidity
                            const forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                            // Icon for current weather
                            const forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastEls[i].append(forecastWeatherEl);

                            const forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastEls[i].append(forecastTempEl);
                           
                            const forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    // Event listener for search button to fetch weather data and update search history
    search.addEventListener("click", function () {
        const searchTerm = city.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    // Event listener for clear history button to clear History button
    clear.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        renderSearchHistory();
    })
    //function to convert temperature from Kelvin to Farhrenheit
    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }
    // Function to render search history from local storage
    function renderSearchHistory() {
        history.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            history.append(historyItem);
        }
    }
    //Render search history and fetch weather data for the last searched city if available
    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }   
}
 //Initialize the page by calling the initPage function
initPage ();