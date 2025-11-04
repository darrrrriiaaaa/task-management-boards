import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "../app/store.ts";
import { createColumn } from "../features/columnSlice.ts";

interface ColumnProps {
    boardId: string;
}

const AddColumn: React.FC<ColumnProps> = ({boardId}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title.trim()) return;
        dispatch(createColumn({title, boardId}));
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Column title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <button type="submit">Add Column</button>
        </form>
    );
};

export default AddColumn;