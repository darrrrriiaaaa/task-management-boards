import { useEffect, useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";

import { useSortable } from "@dnd-kit/sortable";

import { AppDispatch } from "../app/store.ts";
import { createCard, updateCard, deleteCard } from "../features/cardSlice.ts";

interface CardProps {
    columnId: string;
    card?: {_id: string; title: string; description?: string }
}

const ActionsCard: React.FC<CardProps> = ({columnId, card}) => {
    const dispatch = useDispatch<AppDispatch>();
    const isExisting = !!card;

    const [title, setTitle] = useState(card?.title || "");
    const [description, setDescription] = useState(card?.description || "");
    const [editing, setEditing] = useState(!isExisting);

    useEffect(() => {
        if (card) {
            setTitle(card.title);
            setDescription(card.description || "");
            setEditing(false);
        }
    }, [card]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!title.trim()) return;

        if (isExisting && card) {
            dispatch(updateCard({id: card._id, data: {title, description}}));
        } else {
            dispatch(createCard({title, description, columnId}));
            setTitle("");
            setDescription("");
        }
    };

    const handleDelete = () => {
        if(card && window.confirm("Do you want to delete this card?")) {
            dispatch(deleteCard(card._id));
        }
    }

    const {attributes, listeners, setNodeRef} = useSortable({ id: card?._id || ""});

    if (isExisting && editing) {
        return (
            <form onSubmit={handleSubmit} ref={setNodeRef} {...attributes} className="bg-white rounded-lg shadow p-3 space-y-2">
                <input type="text" placeholder="Card title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-emerald-50 rounded-md px-2 py-1 " />
                <input type="text" placeholder="Card description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-emerald-50 rounded-md px-2 py-1" />
                <button type="submit" className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="px-6 py-3 border border-emerald-50 rounded-lg shadow hover:bg-emerald-50 transition cursor-pointer">Cancel</button>
            </form> 
        )
    }

    if (isExisting && !editing) {
        return (
            <section ref={setNodeRef} {...attributes} {...listeners} className="bg-white rounded-lg shadow p-3 hover:shadow-md transition">
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-700">{description}</p>
                <button onClick={() => setEditing(true)} className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">Edit</button>
                <button onClick={handleDelete} className="px-6 py-3 border border-emerald-50 rounded-lg shadow hover:bg-emerald-50 transition cursor-pointer">Delete</button>
            </section>
        )
    }
    
    return (
                <form onSubmit={handleSubmit} ref={setNodeRef} className="bg-white/30 focus-within:bg-white rounded-lg shadow p-3 space-y-2 transition">
                    <input type="text" placeholder="Card title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-emerald-50 rounded-md px-2 py-1"/>
                    <input type="text" placeholder="Card description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-emerald-50 rounded-md px-2 py-1"/>
                    <button type="submit" className="px-6 py-3 bg-emerald-700 text-white rounded-lg shadow hover:bg-emerald-800 transition cursor-pointer">Add Card</button>
                </form>
    )
}

export default ActionsCard;