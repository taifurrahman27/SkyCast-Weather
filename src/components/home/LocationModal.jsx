import { useEffect } from 'react';

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
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape' && !isLoading && !isLocating) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, isLoading, isLocating, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !isLoading &&
                    !isLocating
                ) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="location-modal-title"
                className="relative w-full max-w-md overflow-hidden rounded-3xl border border-sky-400/10 bg-linear-to-b from-slate-900 to-slate-950 p-6 shadow-2xl shadow-sky-950/30 sm:p-8"
            >
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

                <div className="relative">
                    {/* Modal Header */}
                    <div className="mb-7 flex items-start justify-between gap-4">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-3 py-1.5">
                                <span className="h-2 w-2 rounded-full bg-sky-400" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                                    Welcome to SkyCast
                                </span>
                            </div>

                            <h2
                                id="location-modal-title"
                                className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                            >
                                Where are you today?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Find the weather around you or explore
                                conditions in any city.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading || isLocating}
                            aria-label="Close location modal"
                            className="rounded-xl border border-white/10 bg-white/5 p-2 text-xl text-slate-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            ×
                        </button>
                    </div>

                    {/* Current Location */}
                    <button
                        type="button"
                        onClick={onCurrentLocation}
                        disabled={isLocating || isLoading}
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 px-4 py-4 font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-sky-400 hover:to-blue-500 hover:shadow-sky-500/30 disabled:cursor-wait disabled:opacity-60"
                    >
                        {isLocating || isLoading ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5 transition-transform group-hover:scale-110"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21s8-4.5 8-11a8 8 0 1 0-16 0c0 6.5 8 11 8 11Z"
                                />
                                <circle cx="12" cy="10" r="2.5" />
                            </svg>
                        )}

                        <span>
                            {isLocating
                                ? 'Finding your location...'
                                : isLoading
                                    ? 'Loading weather...'
                                    : 'Use my current location'}
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs font-medium uppercase tracking-widest text-slate-500">
                            Or search manually
                        </span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* City Search */}
                    <form onSubmit={onCitySubmit}>
                        <label
                            htmlFor="city"
                            className="mb-2 block text-sm font-semibold text-slate-300"
                        >
                            Enter a city name
                        </label>

                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path
                                    strokeLinecap="round"
                                    d="m16 16 4 4"
                                />
                            </svg>

                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(event) =>
                                    onCityChange(event.target.value)
                                }
                                placeholder="e.g. Dhaka, London, Tokyo"
                                autoFocus
                                autoComplete="address-level2"
                                disabled={isLoading || isLocating}
                                className="w-full rounded-xl border border-white/10 bg-slate-950 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10 disabled:opacity-60"
                            />
                        </div>

                        {error && (
                            <p
                                role="alert"
                                aria-live="polite"
                                className="mt-3 rounded-xl border border-red-400/20 bg-red-400/5 px-3 py-2.5 text-sm text-red-400"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || isLocating}
                            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-semibold text-white transition-all duration-200 hover:border-sky-400/30 hover:bg-sky-400/10 hover:text-sky-300 disabled:cursor-wait disabled:opacity-50"
                        >
                            {isLoading ? 'Getting weather...' : 'Explore Weather'}
                        </button>
                    </form>

                    {/* Footer Note */}
                    <div className="mt-6 flex items-start justify-center gap-2 text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="mt-0.5 h-4 w-4 shrink-0 text-slate-500"
                        >
                            <rect
                                width="16"
                                height="12"
                                x="4"
                                y="9"
                                rx="2"
                            />
                            <path
                                strokeLinecap="round"
                                d="M8 9V6a4 4 0 1 1 8 0v3"
                            />
                        </svg>

                        <p className="text-xs leading-5 text-slate-500">
                            Your location is only accessed with your
                            browser's permission.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LocationModal;
