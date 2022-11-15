const WEATHER_BASE_API_URL = "https://api.openweathermap.org";
const WEATHER_API_KEY = "272b68b95d1c42ff7655c2f715fa4879";
var MAX_FORECAST = 6;

const weatherLocation = document.getElementById('weatherLocation');
const searchBtn = document.getElementById('search');


// Returns the location once the user has submitted one
function getLocation(){

    var userInput = weatherLocation.value;
    if(userInput === ''){
        window.alert("Please enter a location");
    }else{
        findLocation(userInput);
    }

}

// Finds the location the the user has submitted
function findLocation(search){

    // the URL are now var variables so that they can be updated globally throughout the application
    var apiURL = `${WEATHER_BASE_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
    // This helps us access the weather information for the location inputted
    fetch(
        apiURL
    )
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            // Stores the location information into an array, in case there are more than one with the same name not displayed to the screen

            const myLocation = data[0];

            console.log("Pressed");

            console.log(myLocation);

            displayWeather(myLocation);

        })
    
}

// Displays the current weather for the location based on the day the user uses the website
function displayCurrentWeather(weatherData){

    var currentData = weatherData.current;

    document.getElementById('temp-value').textContent = `Temperature: ${currentData.temp}°F`;
    document.getElementById('humid-value').textContent = `Humidity: ${currentData.humidity}%`;
    document.getElementById('wind-value').textContent = `Wind Speed: ${currentData.wind_speed}km/h`;

}

// 
function getWeather(lat, lon){
    // var queryURL = `${WEATHER_BASE_API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`
    fetch(
        queryURL
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayCurrentWeather(data);

        displayWeatherForecast(data);
    })
}

function displayWeatherForecast(weatherData){

    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    // This loop generates the weather forecast for the next five days
    for(var i = 1; i < MAX_FORECAST; i++){
        var dailyForecast = weatherData.daily[i]
        var day = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB' ,{weekday: 'long'});
        var temp = `${dailyForecast.temp.day}°`;
        var humidity = `${dailyForecast.humidity}%`;
        var wind = `${dailyForecast.wind_speed}km/h`;


        var nextForecast = document.createElement('div');
        nextForecast.classList.add('forecast-list');
        nextForecast.innerHTML = `<div class="weather-info">
        <div>
            <span>${day}</span>
        </div>
        <div class="temperature">
            <span>${temp}</span>
        </div>
        <div class="humidity">
            <span>${humidity}</span>
        </div>
        <div class="wind-speed">
            <span>${wind}</span>
        </div>
    </div>`
    forecastList.appendChild(nextForecast);
    }
}

function displayWeather(weatherData){
    // Displays the name of the city and the country of the location inputted by the user
    document.getElementById('weatherLocation').textContent = `${weatherData.name}, ${weatherData.country}`;

    // Retrieves the latitude and longitude of the location submitted
    getWeather(weatherData.lat, weatherData.lon);
}



searchBtn.addEventListener('click', getLocation);