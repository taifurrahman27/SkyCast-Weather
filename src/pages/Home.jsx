
import { useState } from 'react';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [city, setCity] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const [isLocating, setIsLocating] = useState(false);

    const handleCitySubmit = (event) => {
        event.preventDefault();

        const trimmedCity = city.trim();

        if (!trimmedCity) {
            setError('Please enter a city name.');
            return;
        }

        setLocation(trimmedCity);
        setError('');
        setIsModalOpen(false);

        // Connect your weather API here.
        console.log('Selected city:', trimmedCity);
    };

    const handleCurrentLocation = () => {
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                const currentLocation = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                };

                setLocation('Current location');
                setIsLocating(false);
                setIsModalOpen(false);

                // Use these coordinates with your weather API.
                console.log('Current coordinates:', currentLocation);
            },
            (geoError) => {
                setIsLocating(false);

                const messages = {
                    1: 'Location permission was denied. You can enter a city instead.',
                    2: 'Your location could not be determined. Please try again.',
                    3: 'Location request timed out. Please try again.',
                };

                setError(
                    messages[geoError.code] ||
                    'Unable to get your location. Please enter a city.',
                );
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
                        onClick={() => {
                            setError('');
                            setIsModalOpen(true);
                        }}
                        className="mt-8 rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400"
                    >
                        {location ? `Location: ${location}` : 'Choose Your Location'}
                    </button>
                </section>

                <section className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold">Your local forecast</h2>
                    <p className="mt-2 text-slate-400">
                        {location
                            ? `Your selected location is ${location}.`
                            : 'Choose a location to get started.'}
                    </p>
                </section>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setIsModalOpen(false);
                            setError('');
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
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setError('');
                                }}
                                aria-label="Close location modal"
                                className="rounded-lg p-2 text-xl text-slate-400 hover:bg-white/10 hover:text-white"
                            >
                                ×
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleCurrentLocation}
                            disabled={isLocating}
                            className="flex w-full items-center justify-center gap-3 rounded-xl bg-sky-500 px-4 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-wait disabled:opacity-60"
                        >
                            <span aria-hidden="true">◎</span>
                            {isLocating ? 'Finding your location…' : 'Use my current location'}
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
                                type="text"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                placeholder="e.g. Dhaka, London, Tokyo"
                                autoFocus
                                className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                            />

                            {error && (
                                <p role="alert" className="mt-3 text-sm text-red-400">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="mt-4 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/15"
                            >
                                Continue with city
                            </button>
                        </form>

                        <p className="mt-5 text-center text-xs leading-5 text-slate-500">
                            Your browser will ask permission before sharing your location.
                        </p>
                    </section>
                </div>
            )}
        </main>
    );
};

export default Home;
