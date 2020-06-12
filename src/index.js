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
  dayTime.innerHTML = `${weekDay} ${hours}:${minutes}`;
}
showDayTime(now);

function showCity() {
  event.preventDefault();
  let city = document.querySelector("#city");
  let showedCity = document.querySelector(".CityName");
  showedCity.innerHTML = city.value;
  setCity(city.value);
}
let searchCity = document.querySelector("#searchCity");
searchCity.addEventListener("submit", showCity);
searchCity.addEventListener("click", showCity);

function setCity(city) {
  let apiKey = "b502e3f5d51eafa682fcf63b13086eef";
  let apiCityTemperature = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCityTemperature).then(showTemperature);
}

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
}
function showTemperature(response) {
  let temperature = document.querySelector(".TemperatureNow");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let minTemperature = document.querySelector("#minTemperatureToday");
  minTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  let maxTemperature = document.querySelector("#maxTemperatureToday");
  maxTemperature.innerHTML = `${Math.round(response.data.main.temp_max)}`;
}