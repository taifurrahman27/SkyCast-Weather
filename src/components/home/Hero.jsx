const Hero = ({ location, onOpenModal }) => {
    return (
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
                onClick={onOpenModal}
                className="mt-8 rounded-xl bg-sky-500 px-6 py-3 font-semibold transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
                {location
                    ? `Location: ${location}`
                    : 'Choose Your Location'}
            </button>
        </section>
    );
};

export default Hero;
