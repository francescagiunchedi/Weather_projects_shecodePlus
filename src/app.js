function search(event) {
  event.preventDefault();
  let submitCity = document.querySelector("#search-bar");
  let cityName = document.querySelector("#search-city");
  let degreeToday = document.querySelector("#degree-today");
  let apiKey = "4ff86370e362a341be667316345b71fc";
  let unit = "metric";
  let apiUrls = "https://api.openweathermap.org/data/2.5/weather?";
  let api = `${apiUrls}q=${submitCity.value}&appid=${apiKey}&units=${unit}`;

  if (submitCity.value) {
    cityName.innerHTML = `${submitCity.value}`;
  } else {
    cityName.innerHTML = null;
    cityName.innerHTML = `Search a city`;
    degreeToday.innerHTML = ``;
  }
  axios.get(api).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let degreeToday = document.querySelector("#degree-today");
  degreeToday.innerHTML = `${temperature}`;
}

function findPosition() {
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

function showPos(response) {
  let city = response.data.name;
  let cityName = document.querySelector("#search-city");
  cityName.innerHTML = city;
}

function retrivePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "4ff86370e362a341be667316345b71fc";
  let unit = "metric";
  let apiUrls = "https://api.openweathermap.org/data/2.5/weather?";
  let api = `${apiUrls}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(api).then(showTemp);
  axios.get(api).then(showPos);
}
function todayFormat(today) {
  let days = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let timeHours = today.getHours();
  let timeMinute = ("0" + today.getMinutes()).slice(-2);
  let weekDay = days[today.getDay()];

  let mainDay = `${weekDay} ${timeHours}:${timeMinute}`;
  return mainDay;
}

let positionButton = document.querySelector("#retrive-location");
positionButton = positionButton.addEventListener("click", findPosition);
let currentDate = new Date();
let form = document.querySelector("#form-city");

let mainColumnDay = document.querySelector("#toda-date");
mainColumnDay.innerHTML = todayFormat(currentDate);

form.addEventListener("submit", search);
