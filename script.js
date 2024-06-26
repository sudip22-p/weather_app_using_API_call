/*html elements*/
const searchBtn = document.getElementById("search-icon");
const inputBar = document.getElementById("search-bar");
const weatherImg = document.getElementById("weather-image");
const tempMeasure = document.getElementById("measure");
const tempDesc = document.getElementById("word-detail");
const humidPercentage = document.getElementById("humid-percentage");
const windSpeed = document.getElementById("wind-speed");

document.addEventListener('keydown', (event) => {
    inputBar.focus();
    
    // Prevent default behavior for all keys except printable characters
    if (event.key.length === 1) {
        // Allow character keys to be added to the input field
        inputBar.value += event.key;
    } else if (event.key === 'Backspace') {
        // Handle Backspace
        inputBar.value = inputBar.value.slice(0, -1);
    }

    // Prevent default action to avoid duplicating characters
    event.preventDefault();
});




/*function to change image */
function changeWeatherImg(condition){
    switch(condition){
        case 'Clouds':
            weatherImg.src="./assets/cloudy.gif";
            break;
        case 'Clear':
            weatherImg.src="./assets/clear.gif";
            break;
        case 'Rain':
            weatherImg.src="./assets/rainy.gif";
            break;
        case 'Drizzle':
            weatherImg.src="./assets/rainy.gif";
            break;
        case 'Thunderstorm':
            weatherImg.src="./assets/thunder.gif";
            break;
        case 'Snow':
            weatherImg.src="./assets/snowy.gif";
            break;
        case 'Mist':
            weatherImg.src="./assets/fog.gif";
            break;
        case 'Fog':
            weatherImg.src="./assets/fog.gif";
            break;
        case 'Smoke':
            weatherImg.src="./assets/fog.gif";
            break;
        case 'Haze':
            weatherImg.src="./assets/fog.gif";
            break;
        default:
            weatherImg.src="./assets/unknown.gif";
            break;
        
    }
}




/*function to check weather && 
async-asynchronous fnc coz to use await later on*/
async function checkWeather(cityName) {
    //if empty field
    if (cityName.trim() === "") {
        inputBar.value = "";
        inputBar.focus();
        alert("You cannot leave the field EMPTY!!!");
        return;
    }

    //key for weather api
    const apiKey = "11352f8069e00cb79af056c7764df7b6";

    //url for weather api
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        /*fetch()--fetches the url,
        await to take complete data at a time ,
         .then--after this fetches action response is generated, and 
         response.json()-convert data to string */
        const response = await fetch(url);

        if (!response.ok) {
            // If the request fails, it means there is no internet connection.
            alert('Error Occurred!! No Data Available');
            location.reload();
            return;
        }

        const weatherData = await response.json();
        console.log(weatherData.weather[0].main);

        /*changing the elements data*/
        tempMeasure.innerHTML = `${Math.round(weatherData.main.temp) - 273}<sup>o</sup>C`;
        tempDesc.innerHTML = `${weatherData.weather[0].description}`;
        humidPercentage.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

        /*for chnging weather image */
        changeWeatherImg(`${weatherData.weather[0].main}`);
    } catch (error) {
        // If there is any error.
        alert('Error Occurred!! No Data Available');
        location.reload();
        return;
    }
}



/*on click search*/
searchBtn.addEventListener("click", () => {
    weatherImg.src="./assets/loading.gif";
    setTimeout(()=>{
        checkWeather(inputBar.value);
    },1800);
});

/*on click enter on search*/
inputBar.addEventListener("keydown", (e) => {
    if(e.key === 'Enter'){
        weatherImg.src="./assets/loading.gif";
        setTimeout(()=>{
            checkWeather(inputBar.value);
        },1800);
    }
});
