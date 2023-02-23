function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

return days[day];

}

function displayForecast(response) {
    //console.log(response.data.daily);
 let forecast = response.data.daily;
  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="forecast-container">
        <div class="row" >`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
<div class="col-2"> 
  <div class="weather-forecast-date">
  ${formatDay(forecastDay.time)}
  </div>
  <div class="weather-forecast-icon">
  <img src="images/${forecastDay.condition.icon}.gif" alt="" width="40px">
  </div>
  <span class="weather-forecast-max">
  ${Math.round(forecastDay.temperature.maximum)}°
</span> 
  <span class="weather-forecast-min">
  ${Math.round(forecastDay.temperature.minimum)}°
</span>
</div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div> </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  //console.log(response.data);
  globalThis.degree = document.getElementById("degree");
  degree.innerHTML = Math.round(response.data.temperature.current);
  globalThis.degreeCelsius = Math.round(response.data.temperature.current);
  let description = document.getElementById("description");
  description.innerHTML = response.data.condition.description;
  let city = document.getElementById("city");
  city.innerHTML = response.data.city;
  let humidity = document.getElementById("humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.getElementById("wind");
  wind.innerHTML = response.data.wind.speed;
  let dateElement = document.getElementById("comment");
  dateElement.innerHTML = displayDate(response.data.time * 1000);
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.city;
  let backgroundPattern = response.data.condition.icon;
  let background = document.getElementById("background");
  background.className = "";
  background.classList.add(backgroundPattern);
  celsius.classList.add("active");
}

function start(city) {
  let apiKey = `3do9a264fbe8b4ta0705174c4f40d76f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  //console.log(apiUrlForecast);

  axios.get(apiUrl).then(displayTemp);
  axios.get(apiUrlForecast).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  globalThis.cityInput = document.getElementById("city-input");
  start(cityInput.value);
  globalThis.city = cityInput.value;
}

let form = document.getElementById("search-form");
form.addEventListener("submit", search);

function convertUnitF(event) {
  event.preventDefault();
  let fahrenheitTemp = degreeCelsius * 9.5 + 32;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  degree.innerHTML = fahrenheitTemp;
}

function convertUnitS(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  degree.innerHTML = degreeCelsius;
}
let celsius = document.getElementById("celsius");
let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", convertUnitF);

celsius.addEventListener("click", convertUnitS);

start("Berlin");
celsius.classList.add("active");
