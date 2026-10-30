
const getWeatherDescription = (code) => {
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        56: 'Light freezing drizzle',
        57: 'Dense freezing drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Heavy freezing rain',
        71: 'Slight snowfall',
        73: 'Moderate snowfall',
        75: 'Heavy snowfall',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail',
    };

    return weatherCodes[code] || 'Weather information unavailable';
};

const WeatherDetails = ({ weather, coordinates }) => {
    const current = weather.current;

    const description = getWeatherDescription(current.weather_code);

    const weatherIcon =
        current.is_day === 0
            ? current.weather_code === 0
                ? '🌙'
                : '🌃'
            : current.weather_code === 0
                ? '☀️'
                : current.weather_code <= 3
                    ? '⛅'
                    : current.weather_code >= 95
                        ? '⛈️'
                        : current.weather_code >= 71 &&
                            current.weather_code <= 86
                            ? '🌨️'
                            : current.weather_code >= 45 &&
                                current.weather_code <= 48
                                ? '🌫️'
                                : '🌧️';

    return (
        <div className="mt-8">
            {/* Main temperature */}
            <div className="flex flex-wrap items-center gap-4">
                <span
                    className="text-6xl"
                    role="img"
                    aria-label={description}
                >
                    {weatherIcon}
                </span>

                <div>
                    <p className="text-5xl font-bold">
                        {Math.round(current.temperature_2m)}°C
                    </p>

                    <p className="mt-2 capitalize text-slate-300">
                        {description}
                    </p>
                </div>
            </div>

            {/* Weather details */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">
                        Feels like
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {Math.round(current.apparent_temperature)}°C
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">
                        Humidity
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {current.relative_humidity_2m}%
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">
                        Wind speed
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        {current.wind_speed_10m} km/h
                    </p>
                </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
                {coordinates
                    ? 'Weather retrieved using your current coordinates.'
                    : 'Weather retrieved for your selected city.'}
            </p>
        </div>
    );
};

export default WeatherDetails;
