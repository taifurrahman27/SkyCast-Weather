import { Outlet, NavLink, Link } from 'react-router';

const MainLayout = () => {
    const navLinkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-sky-400/10 text-sky-400'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`;

    const footerLinkClass =
        'group inline-flex items-center gap-2 text-sm text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-sky-400';

    return (
        <div className="flex min-h-screen flex-col bg-slate-950 text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 shadow-lg shadow-black/10 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <NavLink to="/" className="group flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/20 transition-transform duration-300 group-hover:scale-105">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-6 w-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 19h12a4 4 0 0 0 .5-7.97A6.5 6.5 0 0 0 6 9.5a4.75 4.75 0 0 0 0 9.5Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2v2m7.07.93-1.42 1.42M4.93 4.93l1.42 1.42"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-xl font-extrabold tracking-tight text-white">
                                SkyCast
                                <span className="text-sky-400"> Weather</span>
                            </h1>
                            <p className="text-xs tracking-wide text-slate-500">
                                Your weather, simplified.
                            </p>
                        </div>
                    </NavLink>

                    {/* Navigation */}
                    <nav className="flex items-center gap-2">
                        <NavLink to="/" end className={navLinkClass}>
                            Home
                        </NavLink>

                        <NavLink to="/about" className={navLinkClass}>
                            About
                        </NavLink>
                    </nav>
                </div>
            </header>

            {/* Page Content */}
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-linear-to-b from-slate-900 to-slate-950 px-6 pt-12 pb-6">
                {/* Decorative Background */}
                <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Brand Section */}
                        <div>
                            <Link to="/" className="group inline-flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.8"
                                        className="h-6 w-6 text-white"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 19h12a4 4 0 0 0 .5-7.97A6.5 6.5 0 0 0 6 9.5a4.75 4.75 0 0 0 0 9.5Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 2v2m7.07.93-1.42 1.42M4.93 4.93l1.42 1.42"
                                        />
                                    </svg>
                                </div>

                                <span className="text-xl font-extrabold tracking-tight text-white">
                                    SkyCast <span className="text-sky-400">Weather</span>
                                </span>
                            </Link>

                            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
                                Stay ahead of the weather. Get simple and
                                reliable weather information wherever your
                                day takes you.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                                <span className="text-xs font-medium text-emerald-400">
                                    Weather updates available
                                </span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
                                Quick Links
                            </h3>

                            <ul className="space-y-4">
                                <li>
                                    <NavLink to="/" end className={footerLinkClass}>
                                        <span>→</span>
                                        Home
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/about" className={footerLinkClass}>
                                        <span>→</span>
                                        About Us
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* Explore */}
                        <div>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
                                Stay Prepared
                            </h3>

                            <p className="mb-5 max-w-xs text-sm leading-7 text-slate-400">
                                Every day is better when you're prepared.
                                Check the weather before planning your next
                                adventure.
                            </p>

                            <button
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    })
                                }
                                className="group inline-flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/5 px-4 py-2.5 text-sm font-semibold text-sky-400 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-500/10"
                            >
                                Back to top

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-4 w-4 transition-transform group-hover:-translate-y-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m5 15 7-7 7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="my-9 border-t border-white/10" />

                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} SkyCast Weather.
                            All rights reserved.
                        </p>

                        <p className="flex items-center gap-2 text-xs text-slate-500">
                            Made for a brighter forecast
                            <span className="inline-block text-amber-400 transition-transform duration-300 hover:rotate-45">
                                ☀
                            </span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
