
import { Routes, Route, Link } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';


function App() {
    return (
        <main className="min-h-screen bg-slate-950 p-8 text-white">
            <nav className="mb-8 flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}

export default App;
