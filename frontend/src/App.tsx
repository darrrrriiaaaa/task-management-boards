import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import BoardPage from "./pages/BoardPage.tsx";

function App() {
    return (
        <Router>
            <header className="bg-emerald-900 text-white p-4 mb-6 shadow-md">
                <NavLink to="/" className="text-2xl font-semibold hover:text-emerald-50 transition">Task Management Boards</NavLink>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-6">
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/board/:id" element={<BoardPage />} />
                </Routes>
            </main>
        </Router>
    )
}

export default App;