
import WeatherDetails from '../weather/WeatherDetails';

const WeatherDisplay = ({
    weather,
    location,
    coordinates,
    isLoading,
    weatherError,
    onOpenModal,
}) => {
    return (
        <section
            aria-labelledby="forecast-heading"
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
        >
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2
                        id="forecast-heading"
                        className="text-2xl font-semibold"
                    >
                        Your Local Weather
                    </h2>

                    <p className="mt-2 text-slate-400">
                        {weather
                            ? `${weather.name}${weather.country ? `, ${weather.country}` : ''}`
                            : 'Current conditions and weather details'}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onOpenModal}
                    className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2 font-semibold text-sky-300 transition hover:bg-sky-400/20"
                >
                    {location ? 'Change Location' : 'Select Location'}
                </button>
            </div>

            {isLoading && (
                <p className="mt-6 text-sky-400" role="status">
                    Loading weather data...
                </p>
            )}

            {weatherError && (
                <p className="mt-4 text-red-400" role="alert">
                    {weatherError}
                </p>
            )}

            {weather ? (
                <WeatherDetails
                    weather={weather}
                    coordinates={coordinates}
                />
            ) : (
                !isLoading && (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-10 text-center sm:px-8">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/10">
                            <span
                                className="text-4xl text-sky-400"
                                aria-hidden="true"
                            >
                                ☀
                            </span>
                        </div>

                        <h3 className="mt-5 text-xl font-semibold">
                            {weatherError
                                ? 'Weather Unavailable'
                                : 'Your Weather Starts Here'}
                        </h3>

                        <p className="mx-auto mt-2 max-w-md leading-7 text-slate-400">
                            {weatherError
                                ? 'Check your internet connection, then choose a location to try again.'
                                : 'Select your city or use your current location to view the temperature, humidity, wind speed, and current conditions.'}
                        </p>

                        <button
                            type="button"
                            onClick={onOpenModal}
                            className="mt-6 rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400"
                        >
                            Choose Your Location
                        </button>
                    </div>
                )
            )}
        </section>
    );
};

export default WeatherDisplay;
