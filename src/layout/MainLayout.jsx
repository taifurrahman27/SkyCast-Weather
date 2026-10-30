import { Outlet, NavLink } from 'react-router';

const MainLayout = () => {
    const navLinkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-sky-400/10 text-sky-400'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }`;

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
            <footer className="border-t border-white/10 bg-slate-950/80 px-6 py-6">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} SkyCast Weather.
                        All rights reserved.
                    </p>

                    <p className="text-xs text-slate-600">
                        Made for a brighter forecast
                        <span className="ml-1 text-sky-400">☀</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
