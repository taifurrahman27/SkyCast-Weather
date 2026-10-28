
import { useState } from 'react';
import {
    getWeather,
    getWeatherByCoordinates,
} from '../services/weather.js';

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

                setCoordinates({ latitude, longitude });
                setIsLoading(true);

                try {
                    const data = await getWeatherByCoordinates(
                        latitude,
                        longitude,
                    );

                    setWeather(data);
                    setLocation(data.name);
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
                {/* Hero */}
                <section className="py-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                        Your personal weather companion
                    </p>

                    <h1 className="text-4xl font-bold sm:text-6xl">
                        SkyCast Weather
                    </h1>

                    <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                        Check the weather and plan your day with SkyCast.
                        Get ready for whatever the sky has in store.
                    </p>

                    <button
                        type="button"
                        onClick={openLocationModal}
                        className="mt-8 rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                    >
                        {location ? `Location: ${location}` : 'Choose Your Location'}
                    </button>
                </section>

                {/* Weather forecast */}
                <section
                    aria-labelledby="forecast-heading"
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
                >
                    <h2
                        id="forecast-heading"
                        className="text-2xl font-semibold"
                    >
                        Your local forecast
                    </h2>

                    {isLoading && (
                        <p className="mt-4 text-sky-400" role="status">
                            Loading weather data...
                        </p>
                    )}

                    {weatherError && (
                        <p className="mt-4 text-red-400" role="alert">
                            {weatherError}
                        </p>
                    )}

                    {!isLoading && !weather && !weatherError && (
                        <p className="mt-2 text-slate-400">
                            Choose a location to get started.
                        </p>
                    )}

                    {weather && !isLoading && (
                        <div className="mt-6">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-lg text-slate-300">
                                        {weather.name}
                                        {weather.sys?.country
                                            ? `, ${weather.sys.country}`
                                            : ''}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Current weather
                                    </p>
                                </div>

                                {weather.weather?.[0]?.icon && (
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                        className="h-20 w-20"
                                    />
                                )}
                            </div>

                            <div className="mt-2">
                                <p className="text-5xl font-bold">
                                    {Math.round(weather.main.temp)}°C
                                </p>

                                <p className="mt-2 capitalize text-slate-300">
                                    {weather.weather?.[0]?.description ||
                                        'Weather information unavailable'}
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                                    <p className="text-sm text-slate-400">
                                        Feels like
                                    </p>
                                    <p className="mt-2 text-xl font-semibold">
                                        {Math.round(weather.main.feels_like)}°C
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                                    <p className="text-sm text-slate-400">
                                        Humidity
                                    </p>
                                    <p className="mt-2 text-xl font-semibold">
                                        {weather.main.humidity}%
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                                    <p className="text-sm text-slate-400">
                                        Wind speed
                                    </p>
                                    <p className="mt-2 text-xl font-semibold">
                                        {weather.wind.speed} m/s
                                    </p>
                                </div>
                            </div>

                            <p className="mt-6 text-xs text-slate-500">
                                {coordinates
                                    ? 'Weather retrieved using your current coordinates.'
                                    : 'Weather retrieved for your selected city.'}
                            </p>
                        </div>
                    )}
                </section>
            </div>

            {/* Location modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closeLocationModal();
                        }
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="location-modal-title"
                        className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8"
                    >
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
                                    Welcome to SkyCast
                                </p>

                                <h2
                                    id="location-modal-title"
                                    className="mt-2 text-2xl font-bold text-white"
                                >
                                    Where are you today?
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Choose a city or let us find your current location.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeLocationModal}
                                disabled={isLoading || isLocating}
                                aria-label="Close location modal"
                                className="rounded-lg p-2 text-xl text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                ×
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleCurrentLocation}
                            disabled={isLocating || isLoading}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60"
                        >
                            <span aria-hidden="true">◎</span>
                            {isLocating
                                ? 'Finding your location...'
                                : isLoading
                                    ? 'Loading weather...'
                                    : 'Use my current location'}
                        </button>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-xs uppercase tracking-wider text-slate-500">
                                Or enter a city
                            </span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <form onSubmit={handleCitySubmit}>
                            <label
                                htmlFor="city"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                City name
                            </label>

                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(event) => {
                                    setCity(event.target.value);
                                    setError('');
                                }}
                                placeholder="e.g. Dhaka, London, Tokyo"
                                autoFocus
                                autoComplete="address-level2"
                                disabled={isLoading || isLocating}
                                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:opacity-60"
                            />

                            {error && (
                                <p
                                    role="alert"
                                    className="mt-3 text-sm text-red-400"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || isLocating}
                                className="mt-4 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15 disabled:cursor-wait disabled:opacity-60"
                            >
                                {isLoading ? 'Loading weather...' : 'Get Weather'}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                            Your browser will ask permission before sharing your
                            location.
                        </p>
                    </section>
                </div>
            )}
        </main>
    );
};

export default Home;
