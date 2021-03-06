let now = new Date();
function showDayTime(time) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[time.getDay()];
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayTime = document.querySelector("#day-time");
  dayTime.innerHTML = ` ${weekDay} ${hours}:${minutes}`;
}
showDayTime(now);

function setHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours(timestamp);
  let minutes = time.getMinutes(timestamp);
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` ${hours}:${minutes}`;
}
function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let showedCity = document.querySelector(".CityName");
  showedCity.innerHTML = city.value;
  setCity(city.value);
  getDataForecast(city.value);
}
let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", showCity);
let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", showCity);

function setCity(city) {
  let apiKey = "b502e3f5d51eafa682fcf63b13086eef";
  let apiCityTemperature = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCityTemperature).then(showTemperature);
}
setCity("Firenze");
getDataForecast("Firenze");
function findCoords() {
  navigator.geolocation.getCurrentPosition(setPosition);
}
let courrentCityButton = document.querySelector("#current-city");
courrentCityButton.addEventListener("click", findCoords);

function setPosition(position) {
  let apiKey = "b502e3f5d51eafa682fcf63b13086eef";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityHere);
}
function showCityHere(response) {
  let showedCity = document.querySelector(".CityName");
  showedCity.innerHTML = `${response.data.name}`;
  showTemperature(response);
  getDataForecast(response.data.name);
}
function showTemperature(response) {
  let temperature = document.querySelector(".TemperatureNow");
  let minTemperature = document.querySelector("#minTemperatureToday");
  let maxTemperature = document.querySelector("#maxTemperatureToday");
  let feelsLike = document.querySelector("#feelsLike");
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weatherDescription");
  let iconTodayElement = document.querySelector("#iconToday");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  minTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  maxTemperature.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)}`;
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;
  iconTodayElement.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function getDataForecast(city) {
  let apiKey = "b502e3f5d51eafa682fcf63b13086eef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showForecast(response) {
  let forecast = null;
  let ForecastElement = document.querySelector("#forecast");
  ForecastElement.innerHTML = null;

  for (index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    ForecastElement.innerHTML += `
  <div class="col-2 ForecastBox">
  <p class="ForecastHour">
            ${setHours(forecast.dt * 1000)}
          </p>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png" class= "iconDay"></img>
          <p class="RangeTemperatureDay">
            <br />
            ${Math.round(forecast.main.temp)}°
          </p>
        </div>
        </div>`;
  }
}
function showFahrenheit(event) {
  event.preventDefault();
  let celsiusUnit = document.getElementById("celsiusToday");
  celsiusUnit.classList.remove("Hidden");
  let fahrenheitUnit = document.getElementById("fahrenheitToday");
  fahrenheitUnit.classList.add("Hidden");
  let temperature = document.querySelector(".TemperatureNow");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheitToday");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let fahrenheitUnit = document.getElementById("fahrenheitToday");
  fahrenheitUnit.classList.remove("Hidden");
  let celsiusUnit = document.getElementById("celsiusToday");
  celsiusUnit.classList.add("Hidden");
  let temperature = document.querySelector(".TemperatureNow");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsiusToday");
celsiusLink.addEventListener("click", showCelsius);
