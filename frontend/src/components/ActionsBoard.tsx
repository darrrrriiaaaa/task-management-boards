import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../app/store.ts";
import { createBoard } from "../features/boardSlice.ts";

const AddBoard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        dispatch(createBoard({name}));
        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Board name" value={name} onChange={(e) => setName(e.target.value)} required />
            <button type="submit">Add Board</button>
        </form>
    )
};

export default AddBoard;