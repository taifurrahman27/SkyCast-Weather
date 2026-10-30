const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Get city coordinates
const getCoordinates = async (city) => {
  const params = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to find city.");
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error("City not found.");
  }

  return data.results[0];
};

// Fetch weather using coordinates
const fetchWeather = async (latitude, longitude) => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Unable to fetch weather.");
  }

  return response.json();
};

// Get weather by city name
export const getWeather = async (city) => {
  const location = await getCoordinates(city);

  const weather = await fetchWeather(location.latitude, location.longitude);

  return {
    name: location.name,
    country: location.country,
    latitude: location.latitude,
    longitude: location.longitude,
    current: weather.current,
  };
};

// Get weather using current coordinates
export const getWeatherByCoordinates = async (latitude, longitude) => {
  const weather = await fetchWeather(latitude, longitude);

  return {
    name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
    latitude,
    longitude,
    current: weather.current,
  };
};
