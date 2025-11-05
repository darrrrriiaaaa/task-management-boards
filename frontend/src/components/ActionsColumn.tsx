import { useEffect, useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "../app/store.ts";
import { createColumn, deleteColumn, updateColumn } from "../features/columnSlice.ts";

import editIcon from "../img/setting.png";
import deleteIcon from "../img/delete.png";

interface ColumnProps {
    boardId: string;
    column?: {_id: string; title: string}
}

const ActionsColumn: React.FC<ColumnProps> = ({boardId, column}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isExisting = !!column;

    const [title, setTitle] = useState("");
    const [editing, setEditing] = useState(!isExisting);

    useEffect(() => {
        if (column) {
            setTitle(column.title);
            setEditing(false);
        }
    }, [column]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if(!title.trim()) return;

        if (isExisting && column) {
            dispatch(updateColumn({id: column._id, data: {title}}));
        } else {
            dispatch(createColumn({title, boardId}));
            setTitle("");
        }
    };

    const handleDelete = () => {
        if (column && window.confirm("Do you want to delete this column?")) {
            dispatch(deleteColumn(column._id));
        }
    }

    if (isExisting && editing) {
        return (
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input type="text" placeholder="Column title" value={title} onChange={(e) => setTitle(e.target.value)} required className="flex-1 border border-emerald-50 rounded-md px-3 py-2 w-3/4"/>
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
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <input type="text" placeholder="Column title" value={title} onChange={(e) => setTitle(e.target.value)} required className="flex-1 border border-emerald-50 rounded-md px-3 py-2"/>
            <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 transition">Add Column</button>
        </form>
    );
};

export default ActionsColumn;