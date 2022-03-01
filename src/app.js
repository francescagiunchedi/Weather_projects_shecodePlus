function showTemperature(response) {
  console.log(response);
}
let apiKey = "4ff86370e362a341be667316345b71fc";
let apiUrl = `api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
