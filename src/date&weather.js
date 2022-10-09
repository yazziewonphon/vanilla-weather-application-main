//Date & Time

let currentTime = new Date();
let date = currentTime.getDate();

let currentHours = currentTime.getHours();
currentHours = ("0" + currentHours).slice(-2);

let currentMinutes = currentTime.getMinutes();
currentMinutes = ("0" + currentMinutes).slice(-2);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];

let newTime = document.querySelector("#date-and-time");
newTime.innerHTML = `${day} ${month}, ${date} | ${currentHours}:${currentMinutes}`;

//Enter New City in Form

function search(event) {
  event.preventDefault();
  let enterCity = document.querySelector(".enter-a-city-search");
  let h2 = document.querySelector("h2");

  if (enterCity.value) {
    h2.innerHTML = `${enterCity.value}`;
  } else {
    h2.innerHTML = `Unknown city`;
    alert("Please enter a city.");
  }
}

//Format Forecast Day

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Display Forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="card monday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body monday-card">
            <h5>${formatDay(forecastDay.dt)}</h5>
            <h6>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png";
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}°</span> |
              <span class="weather-forecast-temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </p>
          </div>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Forecast API

function getForecast(coordinates) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Display New Weather & City

function showWeather(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector(".weather-condition");
  let currentCity = document.querySelector("h2");
  let weatherConditionIcon = document.querySelector(".current-weather-emoji");
  weatherConditionIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherConditionIcon.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  fahrenheitTemperature = response.data.main.temp;

  let cityName = response.data.name;
  let cityCountry = response.data.sys.country;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  description.innerHTML = response.data.weather[0].description;
  currentCity.innerHTML = `${cityName}, ${cityCountry}`;

  getForecast(response.data.coord);
  displayForecast();
}

//Weather API

function searchNewCity(city) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".enter-a-city-search");
  searchNewCity(cityInputElement.value);
}
let searchForm = document.querySelector(".d-flex");
searchForm.addEventListener("submit", handleSubmit);

//Unit Conversion

function convertCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  let celsius = (5 / 9) * (Math.round(fahrenheitTemperature) - 32);
  currentTemperature.innerHTML = Math.round(celsius);
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
}

function convertFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
}

let fahrenheitTemperature = null;

let form = document.querySelector(".d-flex");
form.addEventListener("submit", search);

let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", convertCelsius);

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

//Geolocation API

function searchCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showWeather);
}

function fetchCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}
let currentCityBtn = document.querySelector(".current-city-button");
currentCityBtn.addEventListener("click", fetchCurrentPosition);

let ghost = document.getElementById("ghost");
let cactus = document.getElementById("cactus");

function jump() {
  if (ghost.classList != "jump") {
    ghost.classList.add("jump");

    setTimeout(function () {
      ghost.classList.remove("jump");
    }, 300);
  }
}

let isAlive = setInterval(function () {
  //Get current Ghost Y position
  let ghostTop = parseInt(
    window.getComputedStyle(ghost).getPropertyPriority("top")
  );
  //Get current Cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(cactus).getPropertyPriority("left")
  );
  console.log("cactusLeft");
  //Detect Collision
  if (cactusLeft < 24 && cactusLeft > 0 && ghostTop <= 34) {
    alert("Game Over!");
    console.log("collision");
  }
}, 10);

document.addEventListener("keydown", function (event) {
  jump();
});
