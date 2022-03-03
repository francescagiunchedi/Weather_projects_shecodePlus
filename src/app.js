function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let iconDescriptionElement = document.querySelector("#icon");
  celsius = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsius;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDescriptionElement.setAttribute("alt", response.data.weather[0].main);
}
function search(city) {
  let apiKey = "4ff86370e362a341be667316345b71fc";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(api).then(showTemperature);
}

function inputSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  search(cityInput.value);
}

function convertToFarenhait(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.remove("active");
  farenhaitTemperature.classList.add("active");
  temperatureElement.innerHTML = Math.round((celsius * 9) / 5 + 32);
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.add("active");
  farenhaitTemperature.classList.remove("active");
  temperatureElement.innerHTML = celsius;
}

let celsius = null;

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", inputSearch);

let farenhaitTemperature = document.querySelector("#farenhait-temp");
farenhaitTemperature.addEventListener("click", convertToFarenhait);
let celsiusTemperature = document.querySelector("#celsius-temp");
celsiusTemperature.addEventListener("click", convertToCelsius);

search("london");
