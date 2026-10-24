
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="border-b border-white/10 px-6 py-4">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-xl font-bold text-sky-400">
                        SkyCast Weather
                    </h1>
                </div>
            </header>

            {/* Page content */}
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 px-6 py-4">
                <p className="text-center text-sm text-slate-400">
                    © {new Date().getFullYear()} SkyCast Weather. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default MainLayout;
