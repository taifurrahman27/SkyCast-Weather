import { useState } from "react";
import { getWeather, getWeatherByCoordinates } from "../services/weather.js";

const useWeather = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  const resetErrors = () => {
    setError("");
    setWeatherError("");
  };

  const clearError = () => {
    setError("");
  };

  const handleCitySubmit = async (event, city) => {
    event.preventDefault();

    const trimmedCity = city.trim();

    if (!trimmedCity) {
      setError("Please enter a city name.");
      return false;
    }

    resetErrors();
    setIsLoading(true);

    try {
      const data = await getWeather(trimmedCity);

      setWeather(data);
      setLocation(data.name);
      setCoordinates(null);

      return true;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to fetch weather. Please try again.";

      setError(message);
      setWeatherError(message);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    resetErrors();

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        setIsLoading(true);

        try {
          const data = await getWeatherByCoordinates(latitude, longitude);

          setWeather(data);
          setLocation(data.name);
          setCoordinates({ latitude, longitude });

          setError("");
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : "Unable to fetch weather. Please try again.";

          setError(message);
          setWeatherError(message);
        } finally {
          setIsLocating(false);
          setIsLoading(false);
        }
      },
      (geoError) => {
        const messages = {
          1: "Location permission was denied. You can enter a city instead.",
          2: "Your location could not be determined. Please try again.",
          3: "Location request timed out. Please try again.",
        };

        setError(
          messages[geoError.code] ||
            "Unable to get your location. Please enter a city.",
        );

        setIsLocating(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  return {
    location,
    error,
    isLocating,
    coordinates,
    weather,
    isLoading,
    weatherError,
    handleCitySubmit,
    handleCurrentLocation,
    resetErrors,
    clearError,
  };
};

export default useWeather;
