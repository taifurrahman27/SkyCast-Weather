
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
            <div className="text-center">
                <p className="text-8xl font-extrabold text-sky-400">404</p>

                <h1 className="mt-4 text-3xl font-bold">
                    Page not found
                </h1>

                <p className="mt-3 text-slate-400">
                    Sorry, we couldn't find the page you're looking for.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-block rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-400"
                >
                    Back to Home
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
