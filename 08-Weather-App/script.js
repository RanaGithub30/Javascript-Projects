const apiKey = "YOUR_API_KEY"; // Replace with your real API key

// Icon map
const weatherIcons = {
  Clear: "fas fa-sun",
  Clouds: "fas fa-cloud",
  Rain: "fas fa-cloud-showers-heavy",
  Drizzle: "fas fa-cloud-rain",
  Thunderstorm: "fas fa-bolt",
  Snow: "fas fa-snowflake",
  Mist: "fas fa-smog",
  Smoke: "fas fa-smog",
  Haze: "fas fa-smog",
  Dust: "fas fa-smog",
  Fog: "fas fa-smog",
  Sand: "fas fa-smog",
  Ash: "fas fa-smog",
  Squall: "fas fa-wind",
  Tornado: "fas fa-wind"
};

// Background images by condition
const backgroundImages = {
  Clear: "url('https://source.unsplash.com/1600x900/?sunny,sky')",
  Clouds: "url('https://source.unsplash.com/1600x900/?cloudy,sky')",
  Rain: "url('https://source.unsplash.com/1600x900/?rain')",
  Drizzle: "url('https://source.unsplash.com/1600x900/?drizzle')",
  Thunderstorm: "url('https://source.unsplash.com/1600x900/?storm')",
  Snow: "url('https://source.unsplash.com/1600x900/?snow')",
  Mist: "url('https://source.unsplash.com/1600x900/?mist')",
  Haze: "url('https://source.unsplash.com/1600x900/?haze')",
  Fog: "url('https://source.unsplash.com/1600x900/?fog')"
};

// DOM references
const cityInput = document.getElementById("cityInput");
const resetBtn = document.getElementById("resetBtn");

// Form submission
document.getElementById('weatherForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name.");
  getWeatherData(city);
  getFiveDayForecast(city);
});

// Enable reset button on input
cityInput.addEventListener("input", () => {
  resetBtn.disabled = cityInput.value.trim() === "";
});

// Reset button
resetBtn.addEventListener("click", () => {
  cityInput.value = "";
  resetBtn.disabled = true;
  document.getElementById("cityName").textContent = "City Name";
  document.getElementById("temperature").textContent = "25°C";
  document.getElementById("description").textContent = "Partly cloudy";
  document.getElementById("humidity").textContent = "65%";
  document.getElementById("wind").textContent = "10 km/h";
  document.getElementById("weatherIcon").className = "fas fa-cloud-sun";
  document.getElementById("forecast").innerHTML = "";
  document.body.style.backgroundImage = "";
});

// Fetch current weather
function getWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").textContent = `${data.main.temp}°C`;
      document.getElementById("description").textContent = `🌤️ Weather: ${data.weather[0].description}`;
      document.getElementById("humidity").textContent = `${data.main.humidity}%`;
      document.getElementById("wind").textContent = `${data.wind.speed} km/h`;

      const weatherMain = data.weather[0].main;
      const iconClass = weatherIcons[weatherMain] || "fas fa-question-circle";
      document.getElementById("weatherIcon").className = iconClass;

      // Change background
      const bg = backgroundImages[weatherMain] || "url('https://source.unsplash.com/1600x900/?weather')";
      document.body.style.backgroundImage = bg;
    })
    .catch(err => {
      console.error(err);
      alert("Could not fetch weather data. Check city name or try again later.");
    });
}

// Fetch 5-day forecast
function getFiveDayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  axios.get(url)
    .then(response => {
      const forecastList = response.data.list;
      const forecastContainer = document.getElementById("forecast");
      forecastContainer.innerHTML = "";

      // Show one forecast per day at 12:00
      const daily = forecastList.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

      daily.forEach(day => {
        const date = new Date(day.dt_txt);
        const iconCode = day.weather[0].icon;
        const temp = day.main.temp.toFixed(1);
        const description = day.weather[0].main;

        const forecastCard = `
          <div class="card text-center mb-3 p-2" style="min-width: 120px;">
            <h6>${date.toLocaleDateString(undefined, { weekday: 'short' })}</h6>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
            <p class="mb-0">${temp}°C</p>
            <small>${description}</small>
          </div>
        `;

        forecastContainer.innerHTML += forecastCard;
      });
    })
    .catch(err => {
      console.error("Forecast error:", err);
    });
}