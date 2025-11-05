import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoards, setCurrentBoard } from "../features/boardSlice.ts";
import { RootState, AppDispatch } from "../app/store.ts";

import type { Column } from "../features/columnSlice.ts";
import { useNavigate } from "react-router-dom";
import ActionsBoard from "../components/ActionsBoard.tsx";

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {boards, currentBoard} = useSelector((state: RootState) => state.boards);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    const handleSearch = () => {
        const found = boards.find(b => b._id === search.trim());
        if (found) navigate(`board/${found._id}`);
        else alert("Board not found!");
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Boards</h2>
            <div>
                <input type="text" placeholder="Search board by ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="mb-6 px-4 py-2 rounded-md w-1/2 bg-white" />
                <button onClick={handleSearch} className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">Search</button>
            </div>
            {boards.length === 0 ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="flex flex-wrap gap-10 mb-6">
                    {boards.map((b) => (
                        <div key={b._id}>
                            <button key={b._id} onClick={() => navigate(`/board/${b._id}`)} className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">
                                {b.name}
                            </button>
                            <ActionsBoard key={b._id} board={b} />
                        </div>
                    ))}
                </div>
            )}
            <ActionsBoard />
        </div>
    )
}

export default HomePage;