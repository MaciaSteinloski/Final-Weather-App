function displayTemperature(response) {
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  let cityElement = document.querySelector("#City");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "f46c19b5eb0ec976086ee480b8b6da29";
let City = "Seattle";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
