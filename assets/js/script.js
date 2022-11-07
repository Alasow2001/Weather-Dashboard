const WEATHER_BASE_API_URL = "https://api.openweathermap.org";
const WEATHER_API_KEY = "272b68b95d1c42ff7655c2f715fa4879";
const maxForecast = 5;

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

    // This helps us access the weather information for the location inputted
    var apiURL = `${WEATHER_BASE_API_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;

    fetch(apiURL)
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

    const currentWeather = weatherData.current;

    document.getElementById('temperature-value').textContent = "Temperature: ${currentWeather.temp}°C";
    document.getElementById('humidity-value').textContent = "Humidity :${currentWeather.humidity}%";
    document.getElementById('wind-speed-value').textContent = "Wind Speed: ${currentWeather.wind-speed}km/h";

}

// 
function getWeather(lat, lon){
    var queryURL = `${WEATHER_BASE_API_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;

    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        displayCurrentWeather(data);

        displayWeatherForecast(data);
    })
}

function displayWeatherForecast(weatherData){
    // Contains access to daily forecasts
    const dailyData = weatherData.daily;

    document.getElementById('forecast').style.display = 'block';

    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    // This loop generates the weather forecast for the next five days
    for(let i = 0; i < maxForecast; i++){
        const dailyForecast = dailyData[i];
        const day = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB' ,{weekday: 'long'})
        const temp = `${dailyForecast.temp.day}°`;
        const humidity = `${dailyForecast.humidity}%`;
        const wind = `${dailyForecast.wind-speed}km/h`;


        const nextForecast = document.createElement('div');
        nextForecast.classList.add('forecast-day');
        nextForecast.innerHTML = `<div class="weather-info">
        <div class=date>
            <span>${day}</span>
        </div>
        <div class="temperature">
            <span>${temp}</span>
        </div>
        <div class="humidity">
            <span>${humidity}</span>
        </div>
        <div class="wind-speed">
            <span>${wind-speed}</span>
        </div>
    </div>`

        forecastList.appendChild(nextForecast);
    }
}

function displayWeather(weatherData){
    document.getElementById('weatherLocation').textContent = `${weatherData.lat}, ${weatherData.lon}`;

    getWeather(weatherData.lat, weatherData.lon);
}



searchBtn.addEventListener('click', getLocation);