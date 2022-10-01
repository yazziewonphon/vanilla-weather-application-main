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

//Display Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");


  forecastElement.innerHTML = `<div class="row">
      <div class="col">
        <div class="card monday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body monday-card">
            <h5>Mon</h5>
            <h6>
              <i class="fa-solid fa-cloud-sun"></i>
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">81 °F</span> |
              <span class="weather-forecast-temperature-min">79 °F</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card tuesday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body tuesday-card">
            <h5>Tue</h5>
            <h6>
              <i class="fa-solid fa-sun"></i>
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">82 °F</span> |
              <span class="weather-forecast-temperature-min">80 °F</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card wednesday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body wednesday-card">
            <h5>Wed</h5>
            <h6>
              <i class="fa-solid fa-cloud-sun-rain"></i>
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">85 °F</span> |
              <span class="weather-forecast-temperature-min">80 °F</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card thursday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body thursday-card">
            <h5>Thu</h5>
            <h6>
              <i class="fa-solid fa-cloud-bolt"></i>
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">80 °F</span> |
              <span class="weather-forecast-temperature-min">78 °F</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card friday-card-border shadow p-3 mb-5 bg-body rounded">
          <div class="card-body friday-card">
            <h5>Fri</h5>
            <h6>
              <i class="fa-solid fa-cloud-bolt"></i>
            </h6>
            <p class="degrees">
              <span class="weather-forecast-temperature-max">79 °F</span> |
              <span class="weather-forecast-temperature-min">75 °F</span>
            </p>
          </div>
        </div>
      </div>
    </div>`;
  
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

   displayForecast();

  let cityName = response.data.name;
  let cityCountry = response.data.sys.country;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  description.innerHTML = response.data.weather[0].description;
  currentCity.innerHTML = `${cityName}, ${cityCountry}`;
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
