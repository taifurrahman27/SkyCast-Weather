const WeatherDetails = ({ weather, coordinates }) => {
    return (
        <div className="mt-8">
            {/* Main temperature */}
            <div className="flex flex-wrap items-center gap-4">
                {weather.weather?.[0]?.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description || 'Current weather'}
                        className="h-24 w-24"
                    />
                )}

                <div>
                    <p className="text-5xl font-bold">
                        {Math.round(weather.main.temp)}°C
                    </p>

                    <p className="mt-2 capitalize text-slate-300">
                        {weather.weather?.[0]?.description ||
                            'Weather information unavailable'}
                    </p>
                </div>
            </div>

            {/* Weather details */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Feels like</p>
                    <p className="mt-2 text-2xl font-semibold">
                        {Math.round(weather.main.feels_like)}°C
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Humidity</p>
                    <p className="mt-2 text-2xl font-semibold">
                        {weather.main.humidity}%
                    </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Wind speed</p>
                    <p className="mt-2 text-2xl font-semibold">
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
    );
};

export default WeatherDetails;
