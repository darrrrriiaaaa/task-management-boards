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

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({ id: card?._id || ""});

    if (isExisting && editing) {
        return (
            <form onSubmit={handleSubmit} ref={setNodeRef} {...attributes}>
                <input type="text" placeholder="Card title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Card description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditing(false)}>Cancel</button>
            </form> 
        )
    }

    if (isExisting && !editing) {
        return (
            <section ref={setNodeRef} {...attributes} {...listeners}>
                <p>{title}</p>
                <p>{description}</p>
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </section>
        )
    }
    
    return (
                <form onSubmit={handleSubmit} ref={setNodeRef}>
                    <input type="text" placeholder="Card title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Card description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button type="submit">Add Card</button>
                </form>
    )
}

export default ActionsCard;