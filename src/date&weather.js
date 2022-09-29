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
  "Saturday"
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
  "Dec"
];
let month = months[currentTime.getMonth()];

let newTime = document.querySelector("#date-and-time");
newTime.innerHTML = `${day} ${month}, ${date} | ${currentHours}:${currentMinutes}`;

function search(event) {
  event.preventDefault();
  let enterCity = document.querySelector(".enter-a-city-search");
  let h2 = document.querySelector("h2");

  if (enterCity.value) {
    h2.innerHTML = `${enterCity.value}`;
  } else {
    h2.innerHTML = `Unkown city`;
    alert("Please enter a city.");
  }
}

let form = document.querySelector(".d-flex");
form.addEventListener("submit", search);

function convertCelcius(event) {
  event.preventDefault();
  let tempCelcius = document.querySelector("#celcius-link");
  let currentTemperature = document.querySelector("#temperature");
  let celcius = Math.round(((66 - 32) * 5) / 9);
  if (tempCelcius) {
    currentTemperature.innerHTML = `${celcius}`;
  }
}

function convertFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#fahrenheit-link");
  let currentTemperature = document.querySelector("#temperature");
  if (tempFahrenheit) {
    currentTemperature.innerHTML = `66`;
  }
}

let celciusUnit = document.querySelector("#celcius-link");
celciusUnit.addEventListener("click", convertCelcius);

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

function showWeather(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
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
  let cityName = response.data.name;
  let cityCountry = response.data.sys.country;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} mph`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;
  currentCity.innerHTML = `${cityName}, ${cityCountry}`;
}

function searchNewCity(city) {
  let apiKey = "281450ec88936f4fa8ee9864682b49a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".enter-a-city-search").value;
  searchNewCity(city);
}
let searchForm = document.querySelector(".d-flex");
searchForm.addEventListener("submit", handleSubmit);

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
