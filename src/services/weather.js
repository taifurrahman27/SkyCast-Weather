const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(city) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing.");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather.");
  }

  return data;
}

export async function getWeatherByCoordinates(latitude, longitude) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing.");
  }

  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: API_KEY,
    units: "metric",
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${params}`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch weather.");
  }

  return data;
}
