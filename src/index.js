function formatDate(response) {
  let now = new Date(response);
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
  return `${day} ${hour}:${min}`;
  console.log(`${day} ${hour}:${min}`);
}

function displayForecast() {
  let days = ["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `      
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
          <img src="http://openweathermap.org/img/wn/04n@2x.png"
            alt=""
              width="42"
          />
          <div class="weather-forecast-temperature">
            <span class="temp-max">40° </span>
            <span class="temp-min">19° </span>
          </div>
      </div>      
   `;
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

/* Display City, temperature, humidity, wind speed, Description*/
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#tempe").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humi").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celtemp = response.data.main.temp;
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

let ftemp = document.querySelector("#fahrenheit");
ftemp.addEventListener("click", function (event) {
  event.preventDefault();

  ctemp.classList.remove("active");
  ftemp.classList.add("active");

  let fahtemp = Math.round((celtemp * 9) / 5 + 32);
  document.querySelector("#tempe").innerHTML = fahtemp;
});

let ctemp = document.querySelector("#celsius");
ctemp.addEventListener("click", function (event) {
  event.preventDefault();

  ctemp.classList.add("active");
  ftemp.classList.remove("active");

  /*let temp = document.querySelector("#tempe").innerHTML;*/
  document.querySelector("#tempe").innerHTML = Math.round(celtemp);
});

let celtemp = null;

citySearch("Dallas");
displayForecast();
