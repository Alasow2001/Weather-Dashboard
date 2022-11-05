const weatherURL = 'https://api.openweathermap.org/';
const weatherAPIKEY = '272b68b95d1c42ff7655c2f715fa4879';
const maxForecast = 5;


function getLocation(){

    var userInput = weatherLocation.value;
    if(userInput == ''){
        window.alert("Please enter a location");
    }else{
        findLocation(weatherLocation);
    }

}


function findLocation(){

    // apiKey and URL are now var variables so that they can be updated globally throughout the application
    var apiKey = '272b68b95d1c42ff7655c2f715fa4879';
    var locationURL = `https://api.openweathermap.org/data/2.5/weather?q={userInput}&appid={apiKey}`;

    fetch(locationURL)
        .then(function (response){
            return response.json;
        })
        .then(function (data){

            // Finds the first location from the list based of what the user has submitted 
            const location = data[0]

            console.log(location);

            displayWeather(location);
        })
    
}


function displayCurrentWeather(weatherData){

    var currentWeather = weatherData.current;

    document.getElementById('temperature-value').textContent = 'Temperature: ' + `${currentWeather.temp}` + ' °C';
    document.getElementById('humidity-value').textContent = "Humidity :" + `${currentWeather.humidity}` + ' %';
    document.getElementById('wind-speed-value').textContent = 'Wind Speed: '  + `${currentWeather.wind-speed}` + ' km/h';

}

function displayWeatherForecast(weatherData){

    // Contains access to daily forecasts
    const daily = weatherData.daily;

    document.getElementById('forecast').style.display = 'block';

    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    for(var i = 0; i < maxForecast; i++){
        const dailyForecast = daily[i];
        const day = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB' ,{weekday: 'long'})
        const dailyTemp = 'Temperature: ' + `${currentWeather.temp}` + ' °C';
        const dailyHumidity = "Humidity :" + `${currentWeather.humidity}` + ' %';
        const dailyWindSpeed = 'Wind Speed: '  + `${currentWeather.wind-speed}` + ' km/h';

        
        const nextForecast = document.createElement('div');
        nextForecast.classList.add('forecast-day');
        nextForecast.innerHTML = `<div class="weather-info">
        <div class=date>
            <span>${date}</span>
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
    document.getElementById('weatherLocation').textContent = `$(weatherData.name), $(weatherData.country)`;

    getWeather(weatherData.lat, weatherData.lon)
}

// Returns the weather based on the locations latitude and longitude
function getWeather(lat, lon){
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={apiKey}`;
    fetch(weatherURL)
        .then(function(response){
            return response.json;
        })
        .then(function(data){

            // displays the weather of the current day the user has submitted
            displayCurrentWeather(data);

            // displays the next five days weather
            displayWeatherForecast(data);
        })
}

const weatherLocation = document.getElementById('weatherLocation');
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', getLocation);