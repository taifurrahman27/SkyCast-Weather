import { useState } from 'react';

import {
    getWeather,
    getWeatherByCoordinates,
} from '../services/weather.js';

import Hero from '../components/home/Hero';
import WeatherDisplay from '../components/home/WeatherDisplay';
import LocationModal from '../components/home/LocationModal';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [city, setCity] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [weatherError, setWeatherError] = useState('');

    const openLocationModal = () => {
        setError('');
        setWeatherError('');
        setIsModalOpen(true);
    };

    const closeLocationModal = () => {
        if (isLoading || isLocating) return;

        setIsModalOpen(false);
        setError('');
    };

    const handleCityChange = (value) => {
        setCity(value);
        setError('');
    };

    const handleCitySubmit = async (event) => {
        event.preventDefault();

        const trimmedCity = city.trim();

        if (!trimmedCity) {
            setError('Please enter a city name.');
            return;
        }

        setError('');
        setWeatherError('');
        setIsLoading(true);

        try {
            const data = await getWeather(trimmedCity);

            setWeather(data);
            setLocation(data.name);
            setCoordinates(null);
            setIsModalOpen(false);
            setCity('');
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Unable to fetch weather. Please try again.';

            setError(message);
            setWeatherError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCurrentLocation = () => {
        setError('');
        setWeatherError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const { latitude, longitude } = coords;

                setIsLoading(true);

                try {
                    const data = await getWeatherByCoordinates(
                        latitude,
                        longitude,
                    );

                    setWeather(data);
                    setLocation(data.name);
                    setCoordinates({ latitude, longitude });
                    setIsModalOpen(false);
                    setError('');
                } catch (err) {
                    const message =
                        err instanceof Error
                            ? err.message
                            : 'Unable to fetch weather. Please try again.';

                    setError(message);
                    setWeatherError(message);
                } finally {
                    setIsLocating(false);
                    setIsLoading(false);
                }
            },
            (geoError) => {
                const messages = {
                    1: 'Location permission was denied. You can enter a city instead.',
                    2: 'Your location could not be determined. Please try again.',
                    3: 'Location request timed out. Please try again.',
                };

                setError(
                    messages[geoError.code] ||
                    'Unable to get your location. Please enter a city.',
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

    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-5xl">
                <Hero
                    location={location}
                    onOpenModal={openLocationModal}
                />

                <WeatherDisplay
                    weather={weather}
                    location={location}
                    coordinates={coordinates}
                    isLoading={isLoading}
                    weatherError={weatherError}
                    onOpenModal={openLocationModal}
                />
            </div>

            <LocationModal
                isOpen={isModalOpen}
                city={city}
                error={error}
                isLoading={isLoading}
                isLocating={isLocating}
                onCityChange={handleCityChange}
                onCitySubmit={handleCitySubmit}
                onCurrentLocation={handleCurrentLocation}
                onClose={closeLocationModal}
            />
        </main>
    );
};

export default Home;
