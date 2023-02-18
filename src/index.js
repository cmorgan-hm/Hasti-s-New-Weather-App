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
  background.classList.add(backgroundPattern);
}

function start(city) {
  let apiKey = `3do9a264fbe8b4ta0705174c4f40d76f`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemp);
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
    let fahrenheitTemp = (degreeCelsius * 9.5) + 32;
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
    degree.innerHTML = fahrenheitTemp

}

function convertUnitS(event) {
    event.preventDefault();
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    degree.innerHTML = degreeCelsius
}



let fahrenheit = document.getElementById("fahrenheit");
fahrenheit.addEventListener("click", convertUnitF);

let celsius = document.getElementById("celsius");
celsius.addEventListener("click", convertUnitS);

start("Berlin");
