import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import BoardPage from "./pages/BoardPage.tsx";

function App() {
    return (
        <Router>
            <header className="bg-emerald-900 text-white p-4 mb-6 shadow-md">
                <NavLink to="/" className="text-2xl font-semibold hover:text-emerald-50 transition">Task Management Boards</NavLink>
            </header>
            <main className="max-w-11/12 mx-auto px-4 py-6 bg-emerald-50">
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/board/:id" element={<BoardPage />} />
                </Routes>
            </main>
            <footer className="flex flex-col items-center text-sm py-4 text-gray-600">
                <p>Author: Dariia V., <a href="https://github.com/darrrrriiaaaa" className="font-semibold">github</a></p>
                <p>Thanks IncodeGroup for this idea.</p>
            </footer>
        </Router>
    )
}

export default App;