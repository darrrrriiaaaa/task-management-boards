import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../app/store.ts";
import { createBoard, deleteBoard, updateBoard } from "../features/boardSlice.ts";

import editIcon from "../img/setting.png";
import deleteIcon from "../img/delete.png";

interface BoardProps {
    board?: {_id: string; name: string}
}
const ActionsBoard: React.FC<BoardProps> = ({board}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isExisting = !!board;

    const [name, setName] = useState(board?.name || "");
    const [editing, setEditing] = useState(!isExisting);

    useEffect(() => {
        if (board) {
            setName(board.name);
            setEditing(false);
        }
    }, [board]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!name.trim()) return;

        console.log("board exists?", isExisting);
        if (isExisting && board) {
            console.log("updating...");
            dispatch(updateBoard({id: board._id, data: {name}}))
            console.log("updated!")
        } else {
            dispatch(createBoard({name}));
            setName("");
        }
    };

    const handleDelete = () => {
        if(board && window.confirm("Do you want to delete this board?")) {
            dispatch(deleteBoard(board._id));
        }
    };

    if (isExisting && editing) {
        return (
            <form onSubmit={handleSubmit} className="flex gap-3 items-center bg-white p-3 rounded-lg shadow max-w-md">
                <input type="text" placeholder="Board name" value={name} onChange={(e) => setName(e.target.value)} required className="flex-1 border border-emerald-100 rounded-md px-3 py-2" />
                <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="px-6 py-3 border border-emerald-50 rounded-lg shadow hover:bg-emerald-50 transition cursor-pointer">Cancel</button>
            </form>
           )
    }
    if (isExisting && !editing) {
        return (
            <div className="flex gap-2 items-center justify-evenly">
                <button onClick={() => setEditing(true)}>
                    <img src={editIcon} alt="Edit" className="w-5 h-5 cursor-pointer" />
                </button>
                <button onClick={handleDelete}>
                    <img src={deleteIcon} alt="Delete" className="w-5 h-5 cursor-pointer" />
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-center bg-white p-3 rounded-lg shadow max-w-md">
            <input type="text" placeholder="Board name" value={name} onChange={(e) => setName(e.target.value)} required className="flex-1 border border-emerald-100 rounded-md px-3 py-2" />
            <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition">Add Board</button>
        </form>
    )
};

export default ActionsBoard;