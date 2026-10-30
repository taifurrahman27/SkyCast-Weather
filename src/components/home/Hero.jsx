const Hero = ({ location, onOpenModal }) => {
    return (
        <section className="relative isolate overflow-hidden rounded-3xl border border-sky-400/10 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 px-6 py-12 shadow-2xl shadow-sky-950/20 sm:px-10 sm:py-16 lg:px-14">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Decorative Weather Icon */}
            <div className="pointer-events-none absolute right-8 top-8 hidden opacity-10 sm:block lg:right-16 lg:top-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.7"
                    className="h-40 w-40 text-sky-300 lg:h-52 lg:w-52"
                >
                    <circle cx="12" cy="12" r="4" />
                    <path
                        strokeLinecap="round"
                        d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative max-w-2xl">

                {/* Eyebrow */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/5 px-4 py-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                        Your personal weather companion
                    </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Every day,
                    <br />
                    <span className="bg-linear-to-r from-sky-300 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                        under the sky.
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                    Discover the weather around you and make every day
                    count. Get real-time weather insights to plan your
                    next adventure with confidence.
                </p>

                {/* Location Button */}
                <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={onOpenModal}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 px-6 py-4 font-semibold text-white shadow-xl shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:from-sky-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"
                            />
                            <circle cx="12" cy="10" r="2.5" />
                        </svg>

                        <span>
                            {location ? 'Change Location' : 'Choose Your Location'}
                        </span>

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </button>

                    {location && (
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                            <span className="text-sky-400">📍</span>
                            <div>
                                <p className="text-xs text-slate-500">
                                    Selected location
                                </p>
                                <p className="max-w-48 truncate text-sm font-medium text-slate-200">
                                    {location}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Highlight */}
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-2">
                        <span className="text-sky-400">✦</span>
                        Simple weather insights
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="text-sky-400">✦</span>
                        Your location, your forecast
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
