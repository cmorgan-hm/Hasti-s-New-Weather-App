let apiKey = `3do9a264fbe8b4ta0705174c4f40d76f`;
let city = "london";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
console.log(apiUrl);

function displayTemp(response) {
  console.log(response.data);
  let degree = document.getElementById("degree");
  degree.innerHTML = Math.round(response.data.temperature.current);
  let description = document.getElementById("description");
  description.innerHTML = response.data.condition.description;
  let city = document.getElementById("city");
  city.innerHTML = response.data.city
}

axios.get(apiUrl).then(displayTemp);
