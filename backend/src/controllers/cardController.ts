import { Request, Response } from "express";
import Card from "../models/Card";
import Column from "../models/Column";

// controller for creating card
export const createCard = async (req: Request, res: Response) => {
    try {
        const {title, description, columnId} = req.body;
        const card = await Card.create({title, description, columnId});
        await Column.findByIdAndUpdate(columnId, {$push: {cards: card._id}});
        res.status(201).json(card);
    } catch (error) {
        res.status(500).json({message: "Error creating card!"});
    }
};

// controller for getting cards from one column
export const getCardsFromColumn = async (req: Request, res: Response) => {
    try {
        const {columnId} = req.params;
        const cards = await Card.find({columnId});
        res.json(cards);
    } catch(error) {
        res.status(500).json({message: "Error getting cards!"});
    }
};

// controller for updating card by id
export const updateCard = async (req: Request, res: Response) => {
    try {
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(card);
    } catch (error) {
        res.status(500).json({message: "Error updating card!"});
    }
}

// controller for deleting card by id
export const deleteCard = async(req: Request, res: Response) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.json({message: "Card deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Error deleting card!"});
    }
};