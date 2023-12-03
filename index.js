const apikey = "42cf1d7df46cc75fc9aef42b03f02592";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

let units = "metric";

async function checkWeather(city) {
  const response = await fetch(
    `${apiUrl}${city}&appid=${apikey}&units=${units}`
  );

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".todaysWeather").style.display = "none";
  } else {
    var data = await response.json();
    console.log("API Response:", data);

    updateWeatherInfo(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + (units === "metric" ? " °C" : " °F");
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " mph";
    document.querySelector(".description p").innerHTML =
      data.weather[0].description;

    const todaysWeather = document.querySelector(".todaysWeather");
    if (todaysWeather) {
      console.log("Weather condition:", data.weather[0].main);

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
      } else if (data.weather[0].main == "Broken Clouds") {
        todaysWeather.src = "images/clouds.png";
      }

      document.querySelector(".weatherInfo").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  }
}

function updateWeatherInfo(data) {
  document.querySelector(".city").innerHTML = data.name;

  const temperature =
    units === "metric" ? data.main.temp : (data.main.temp * 9) / 5 + 32;
  const roundedTemperature = Math.round(temperature);
  document.querySelector(".temp").innerHTML =
    roundedTemperature + (units === "metric" ? " °C" : " °F");
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
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  document.querySelector(".date-time").innerHTML = formattedDate;
}

document.querySelector(".search button").addEventListener("click", () => {
  const city = document.querySelector(".search input").value;
  checkWeather(city);
});

document
  .querySelector("footer")
  .insertAdjacentHTML(
    "beforeend",
    '<a href="#" onclick="toggleUnits();">Toggle Units</a>'
  );

function toggleUnits() {
  units = units === "metric" ? "imperial" : "metric";
  console.log("Units toggled to:", units);
  const city = document.querySelector(".city").innerHTML;
  checkWeather(city);
}
