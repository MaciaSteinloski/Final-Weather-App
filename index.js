const apikey = "42cf1d7df46cc75fc9aef42b03f02592";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const todaysWeather = document.querySelector(".todaysWeather");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".todaysWeather").style.display = "none";
  } else {
    var data = await response.json();

    updateWeatherInfo(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
    document.querySelector(".description p").innerHTML =
      data.weather[0].description;

    if (data.weather[0].main == "Clouds") {
      todaysWeather.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      todaysWeather.src = "images/rain.png";
    } else if (data.weather[0].main == "Sunny") {
      todaysWeather.src = "images/sun.png";
    } else if (data.weather[0].main == "Clear") {
      todaysWeather.src = "images/clearSun.png";
    } else if (data.weather[0].main == "Drizzle") {
      todaysWeather.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      todaysWeather.src = "images/fog.png";
    }

    document.querySelector(".weatherInfo").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

function updateWeatherInfo(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + " °C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
  document.querySelector(".wind").innerHTML = data.wind.speed + " mph";

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  document.querySelector(".date-time").innerHTML = formattedDate;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
