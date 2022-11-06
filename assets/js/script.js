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

        })
    
}

// Displays the current weather for the location based on the day the user uses the website
function displayCurrentWeather(weatherData){

    const currentWeather = weatherData.current;

    document.getElementById('temperature-value').textContent = 'Temperature: ' + `${currentWeather.temp}` + ' °C';
    document.getElementById('humidity-value').textContent = "Humidity :" + `${currentWeather.humidity}` + ' %';
    document.getElementById('wind-speed-value').textContent = 'Wind Speed: '  + `${currentWeather.wind-speed}` + ' km/h';

}

searchBtn.addEventListener('click', getLocation);