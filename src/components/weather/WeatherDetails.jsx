
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

const getWeatherRecommendation = (current) => {
    const {
        weather_code,
        temperature_2m,
        apparent_temperature,
        relative_humidity_2m,
        wind_speed_10m,
    } = current;

    // Severe weather conditions
    if (weather_code >= 95) {
        return {
            icon: '⛈️',
            title: 'Stay Safe Indoors',
            message:
                'Thunderstorms are expected. Avoid outdoor activities, stay away from open areas, and take shelter in a safe place.',
        };
    }

    // Heavy rain
    if (
        [65, 67, 82, 86, 99].includes(weather_code) ||
        weather_code === 82
    ) {
        return {
            icon: '🌧️',
            title: 'Avoid Outdoor Activities',
            message:
                'Heavy precipitation is expected. Carry appropriate rain protection and avoid unnecessary travel.',
        };
    }

    // Rain and drizzle
    if (
        (weather_code >= 51 && weather_code <= 67) ||
        (weather_code >= 80 && weather_code <= 82)
    ) {
        return {
            icon: '☔',
            title: 'Carry an Umbrella',
            message:
                'Rain or drizzle is expected. Take an umbrella or raincoat before heading outside.',
        };
    }

    // Snow
    if (
        (weather_code >= 71 && weather_code <= 77) ||
        (weather_code >= 85 && weather_code <= 86)
    ) {
        return {
            icon: '❄️',
            title: 'Dress Warmly',
            message:
                'Snow is expected. Wear warm layers, suitable footwear, and be careful on slippery surfaces.',
        };
    }

    // Fog
    if (weather_code === 45 || weather_code === 48) {
        return {
            icon: '🌫️',
            title: 'Be Careful While Traveling',
            message:
                'Fog may reduce visibility. Drive slowly, maintain a safe distance, and use appropriate lights.',
        };
    }

    // Strong wind
    if (wind_speed_10m >= 30) {
        return {
            icon: '💨',
            title: 'Watch Out for Strong Winds',
            message:
                'Wind speeds are high. Secure loose outdoor items and be cautious around trees and exposed areas.',
        };
    }

    // High temperature
    if (apparent_temperature >= 35 || temperature_2m >= 35) {
        return {
            icon: '🥵',
            title: 'Stay Cool and Hydrated',
            message:
                'It feels very hot outside. Drink plenty of water, wear light clothing, and avoid prolonged sun exposure.',
        };
    }

    // Cold temperature
    if (apparent_temperature <= 10 || temperature_2m <= 10) {
        return {
            icon: '🧥',
            title: 'Keep Yourself Warm',
            message:
                'The temperature is quite cold. Wear warm clothing and consider an extra layer when going outside.',
        };
    }

    // High humidity
    if (relative_humidity_2m >= 80) {
        return {
            icon: '💧',
            title: 'Stay Comfortable',
            message:
                'Humidity is high, so it may feel warmer than usual. Wear breathable clothing and stay hydrated.',
        };
    }

    // Pleasant weather
    if (weather_code <= 2) {
        return {
            icon: '🌤️',
            title: 'Great Weather to Go Outside',
            message:
                'Conditions look pleasant. It is a good time for a walk or outdoor activities. Enjoy your day!',
        };
    }

    return {
        icon: '🌥️',
        title: 'Have a Comfortable Day',
        message:
            'Conditions look relatively calm. Enjoy your day and check the forecast before planning outdoor activities.',
    };
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

    const recommendation = getWeatherRecommendation(current);

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
                    <p className="text-sm text-slate-400">Feels like</p>
                    <p className="mt-2 text-2xl font-semibold">
                        {Math.round(current.apparent_temperature)}°C
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Humidity</p>
                    <p className="mt-2 text-2xl font-semibold">
                        {current.relative_humidity_2m}%
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Wind speed</p>
                    <p className="mt-2 text-2xl font-semibold">
                        {current.wind_speed_10m} km/h
                    </p>
                </div>
            </div>

            {/* Weather recommendation */}
            <div className="mt-6 rounded-2xl border border-sky-400/20 bg-linear-to-br from-sky-400/10 to-blue-500/5 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-2xl">
                        {recommendation.icon}
                    </div>

                    <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
                            Weather Recommendation
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-white">
                            {recommendation.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-300">
                            {recommendation.message}
                        </p>
                    </div>
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
