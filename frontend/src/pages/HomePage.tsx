import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchBoards, setCurrentBoard } from "../features/boardSlice.ts";
import { RootState, AppDispatch } from "../app/store.ts";

import type { Column } from "../features/columnSlice.ts";
import { useNavigate } from "react-router-dom";
import AddBoard from "../components/ActionsBoard.tsx";

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {boards, currentBoard} = useSelector((state: RootState) => state.boards);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6">Boards</h2>
            {boards.length === 0 ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="flex flex-wrap gap-10 mb-6">
                    {boards.map((b) => (
                        <button key={b._id} onClick={() => navigate(`/board/${b._id}`)} className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">
                            {b.name}
                        </button>
                    ))}
                </div>
            )}
            <AddBoard />
        </div>
    )
}

export default HomePage;