function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#Humidity");
    humidityElement.innerHTML = response.data.temperature.humidity + "%";

    let windspeedElement = document.querySelector("#Windspeed");
    windspeedElement.innerHTML = response.data.wind.speed + " mph";


    let date = new Date(response.data.time * 1000);
    let dateString = date.toLocaleString(); 

    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formatDate(date);

    let iconElement = document.querySelector("#icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    
}

function formatDate(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    let hours = date.getHours();
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes; 

    let period = hours >= 12 ? 'pm' : 'am'; 
    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${day} ${hours}:${minutes} ${period}`;
}







function searchCity(city) {
    let apiKey = "fftb054daebc038f2o6666f4739b3ef3";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit (event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Detroit");