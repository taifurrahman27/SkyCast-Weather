
import { Link } from 'react-router';

const features = [
    {
        icon: '🌤️',
        title: 'Live Weather Updates',
        description:
            'Explore current weather conditions and stay informed about the temperature, humidity, and wind speed.',
    },
    {
        icon: '📍',
        title: 'Location Based Weather',
        description:
            'Search for any city or use your current location to get relevant local weather information.',
    },
    {
        icon: '💡',
        title: 'Smart Recommendations',
        description:
            'Get helpful suggestions based on current weather conditions so you can plan your day better.',
    },
];

const About = () => {
    return (
        <main className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:py-20">
            <div className="mx-auto max-w-6xl">
                {/* Hero Section */}
                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-slate-900 via-slate-900 to-sky-950 px-6 py-16 text-center sm:px-12 sm:py-24">
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-300">
                            <span>☀️</span>
                            About Our Project
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
                            Weather Made
                            <span className="block text-sky-400">
                                Simple & Smarter.
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            SkyCast Weather helps you explore weather
                            conditions, discover useful insights, and plan
                            your day with confidence. Stay one step ahead
                            of the weather, wherever you go.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/"
                                className="rounded-xl bg-sky-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-1 hover:bg-sky-400"
                            >
                                Explore Weather →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="mt-20 grid items-center gap-10 md:grid-cols-2">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                            Our Purpose
                        </p>

                        <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                            Making everyday weather easier to understand.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-400">
                            Whether you're planning a trip, heading to work,
                            or simply deciding what to wear, knowing the
                            weather matters. SkyCast brings essential weather
                            information together in one clean and easy-to-use
                            experience.
                        </p>

                        <Link
                            to="/"
                            className="mt-8 inline-flex items-center gap-2 font-semibold text-sky-400 transition hover:gap-3 hover:text-sky-300"
                        >
                            Check your local weather
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl border border-sky-400/10 bg-linear-to-br from-sky-500/10 to-indigo-500/10 p-10">
                        <div className="absolute h-48 w-48 rounded-full bg-sky-400/10 blur-3xl" />

                        <div className="relative text-center">
                            <div className="text-8xl">🌤️</div>
                            <p className="mt-6 text-xl font-semibold">
                                Your Day, Your Forecast
                            </p>
                            <p className="mt-2 text-sm text-slate-400">
                                Stay informed. Stay prepared.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mt-24">
                    <div className="text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
                            What We Offer
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Everything You Need to Stay Prepared
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                            Useful weather tools designed to make your
                            everyday planning easier.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {features.map((feature) => (
                            <article
                                key={feature.title}
                                className="group rounded-2xl border border-white/10 bg-white/3 p-7 transition duration-300 hover:-translate-y-2 hover:border-sky-400/30 hover:bg-sky-400/5"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400/10 text-3xl transition group-hover:scale-110">
                                    {feature.icon}
                                </div>

                                <h3 className="mt-6 text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="mt-24 rounded-3xl border border-sky-400/20 bg-linear-to-r from-sky-500/10 to-indigo-500/10 px-6 py-12 text-center sm:px-12">
                    <h2 className="text-3xl font-bold">
                        Ready to Explore the Weather?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                        Discover your local weather and get helpful
                        recommendations for the day ahead.
                    </p>

                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 font-semibold text-white transition hover:bg-sky-400"
                    >
                        Get Started
                        <span aria-hidden="true">→</span>
                    </Link>
                </section>
            </div>
        </main>
    );
};

export default About;
