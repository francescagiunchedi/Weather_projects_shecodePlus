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
function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "4ff86370e362a341be667316345b71fc";
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(api).then(showForecast);
}

function forecastDayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function showForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#java-row");
  let forecast = `<div class="row bottom-position">`;

  forecastData.forEach(function (forecastDay, index) {
    if (index < 5) {
      if (index === 1 || index === 3 || index === 5) {
        forecast =
          forecast +
          `
    <div class="col-md col-no-border ">
                <div id ="bg" class="days">
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="">
                  <p class="week-days">${forecastDayFormat(forecastDay.dt)}</p>
                    <h3>${Math.round(forecastDay.temp.day)}°c</h3>
                </div>
    </div>`;
      } else {
        forecast =
          forecast +
          `
    <div class="col-md col-no-border ">
                <div id ="bg" class="days curved-bottom-gray">
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="">
                  <p class="week-days">${forecastDayFormat(forecastDay.dt)}</p>
                    <h3>${Math.round(forecastDay.temp.day)}°c</h3>
                </div>
    </div>`;
      }
    }
  });

  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let iconDescriptionElement = document.querySelector("#icon");
  celsius = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsius;
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = `(${response.data.sys.country})`;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDescriptionElement.setAttribute("alt", response.data.weather[0].main);

  getForecast(response.data.coord);
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
function getCity(location) {
  search(location.data[0].name);
}

function showLocation(position) {
  let apiKey = "4ff86370e362a341be667316345b71fc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(api).then(getCity);
}

function getP0sition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", inputSearch);

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getP0sition);

getP0sition();
