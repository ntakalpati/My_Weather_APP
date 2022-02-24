let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = (now.getHours() < 10 ? "0" : "") + now.getHours();
let min = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
document.querySelector("#day").innerHTML = `${day} ${hour}:${min}`;

/* Display City, temperature, humidity, wind speed, Description*/
function showTemperature(response) {
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempe").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humi").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

/* Search City */
function citySearch(city) {
  let apiKey = "ebdbb6fd43e2e58449d1d839449c5958";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

/* Click on Submit button for city */

function submitClick(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  citySearch(city);
}

function showPosition(position) {
  /*let lon = position.coords.longitude;
  let lat = position.coords.latitude;*/
  let apiKey = "ebdbb6fd43e2e58449d1d839449c5958";
  /*let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;*/
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  /*axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);*/
  axios.get(apiUrl).then(showTemperature);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchbtn = document.querySelector("#btn-search");
searchbtn.addEventListener("click", submitClick);

let currentbtn = document.querySelector("#cbtn");
currentbtn.addEventListener("click", showCurrent);

citySearch("Dallas");

let ftemp = document.querySelector("#fahrenheit");
ftemp.addEventListener("click", function (event) {
  event.preventDefault();
  let tem = document.querySelector("#tempe");
  tem.innerHTML = tem * (9 / 5) + 32;
});

let ctemp = document.querySelector("#celsius");
ctemp.addEventListener("click", function (event) {
  event.preventDefault();
  document.querySelector("#tempe").innerHTML = "19";
});
