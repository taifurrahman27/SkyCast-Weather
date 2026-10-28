const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

async function fetchWeather(url) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing. Check your .env file.");
  }

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather.");
  }

  return data;
}

export async function getWeather(city) {
  const params = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: "metric",
  });

  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

  return fetchWeather(url);
}

export async function getWeatherByCoordinates(latitude, longitude) {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    appid: API_KEY,
    units: "metric",
  });

  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`;

  return fetchWeather(url);
}
