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

function showForecast() {
  let forecastElement = document.querySelector("#java-row");
  let forecast = `<div class="row bottom-position">`;
  let days = ["one", "two", "trhee"];

  days.forEach(function (day) {
    forecast =
      forecast +
      `
    <div class="col-md col-no-border ">
                <div class="days curved-bottom-gray">
                    <i class="bi bi-brightness-low-fill w-icon sun-icon"></i>
                  <p class="week-days" id="d1">0</p>  <p>${day}</p>
                    <h3>29°c</h3>
                </div>
    </div>`;
  });
  forecast = forecast + `</div>`;
  forecastElement.innerHTML = forecast;
}

let formElement = document.querySelector("#form");
formElement.addEventListener("submit", inputSearch);

search("london");
showForecast();
