const apikey = "42cf1d7df46cc75fc9aef42b03f02592";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const todaysWeather = document.querySelector(".todaysWeather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);
  var data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.main.wind.speed + " mph";

  if (data.weather[0].main == "Clouds") {
    todaysWeather.src = "Images/clouds.png";
  } else if (data.weather[0].main == "Rain") {
    todaysWeather.src = "Images/rain.png";
  } else if (data.weather[0].main == "Sunny") {
    todaysWeather.src = "Images/sun.png";
  } else if (data.weather[0].main == "Clear") {
    todaysWeather.src = "Images/clearSun.png";
  } else if (data.weather[0].main == "Drizzle") {
    todaysWeather.src = "Images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    todaysWeather.src = "Images/fog.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
