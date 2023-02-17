let apiKey = `3do9a264fbe8b4ta0705174c4f40d76f`;
let city = "london";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
console.log(apiUrl);

function displayTemp(response) {
    
}


axios.get(apiUrl).then(displayTemp);