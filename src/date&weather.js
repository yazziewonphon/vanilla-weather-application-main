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

function showWeather(response) {
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let temperature = Math.round(fahrenheitTemperature);
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

  fahrenheitTemperature = response.data.main.temp;

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
  let cityInputElement = document.querySelector(".enter-a-city-search");
  searchNewCity(cityInputElement.value);
}
let searchForm = document.querySelector(".d-flex");
searchForm.addEventListener("submit", handleSubmit);

function convertCelcius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  let celcius = (currentTemperature - 32 * 5) / 9;
  currentTemperature.innerHTML = Math.round(celcius);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector(".d-flex");
form.addEventListener("submit", search);

let celciusUnit = document.querySelector("#celcius-link");
celciusUnit.addEventListener("click", convertCelcius);

let fahrenheitUnit = document.querySelector("#fahrenheit-link");
fahrenheitUnit.addEventListener("click", convertFahrenheit);

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
