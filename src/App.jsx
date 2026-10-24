
function App() {
    return (
        <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
            <div className="mx-auto max-w-5xl">
                <p className="mb-3 font-medium tracking-widest text-sky-400">
                    YOUR WEATHER COMPANION
                </p>

                <h1 className="text-4xl font-bold sm:text-6xl">
                    SkyCast Weather
                </h1>

                <p className="mt-4 text-lg text-slate-300">
                    Discover the weather. Plan your day.
                </p>

                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
                    <p className="text-slate-400">Current weather</p>
                    <p className="mt-3 text-2xl font-semibold">
                        Your forecast starts here
                    </p>
                    <p className="mt-2 text-slate-400">
                        Search for a city to get started.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default App;
