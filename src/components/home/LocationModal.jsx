const LocationModal = ({
    isOpen,
    city,
    error,
    isLoading,
    isLocating,
    onCityChange,
    onCitySubmit,
    onCurrentLocation,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
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
                        onClick={onClose}
                        disabled={isLoading || isLocating}
                        aria-label="Close location modal"
                        className="rounded-lg p-2 text-xl text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        ×
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onCurrentLocation}
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

                <form onSubmit={onCitySubmit}>
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
                        onChange={(event) => onCityChange(event.target.value)}
                        placeholder="e.g. Dhaka, London, Tokyo"
                        autoFocus
                        autoComplete="address-level2"
                        disabled={isLoading || isLocating}
                        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 disabled:opacity-60"
                    />

                    {error && (
                        <p role="alert" className="mt-3 text-sm text-red-400">
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
    );
};

export default LocationModal;
