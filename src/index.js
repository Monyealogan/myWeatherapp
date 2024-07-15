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
    
    getForecast(response.data.city);
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

function getForecast(city) {
    let apiKey = "fftb054daebc038f2o6666f4739b3ef3";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios(apiUrl).then(displayForecast);
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

    return days[date.getDay()];
  }
  
  function displayForecast(response) {
    console.log(response.data);
  
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
        console.log('Day:',day);
        
        if (index < 6 ) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
      `;
        }
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  }
  
