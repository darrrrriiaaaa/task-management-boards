import { Request, Response } from "express";
import { Types } from "mongoose";

import Column from "../models/Column";
import Board from "../models/Board";

// controller for creating column
export const createColumn = async (req: Request, res: Response) => {
    try {
        const {title, boardId} = req.body;
        const column = await Column.create({title, boardId});
        await Board.findByIdAndUpdate(boardId, {$push: {columns: column._id}});
        res.status(201).json(column);
    } catch (error) {
        res.status(500).json({message: "Error creating column!"});
    }
};

// controller for getting all columns from one board
export const getColumnsFromBoard = async (req: Request, res: Response) => {
    try {
        const {boardId} = req.params;
        const columns = await Column.find({
            boardId: new Types.ObjectId(boardId)
        });
        console.log("searching columns for board: ", boardId)
        res.json(columns);
    } catch (error) {
        res.status(500).json({message: "Error getting columns!"});
    }
}

// controller for updating column
export const updateColumn = async (req: Request, res: Response) => {
    try {
        const column = await Column.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(column);
    } catch(error) {
        res.status(500).json({message: "Error updating column!"});
    }
};

// controller for deleting column
export const deleteColumn = async (req: Request, res: Response) => {
    try {
        await Column.findByIdAndDelete(req.params.id);
        res.json({message: "Column deleted successfully!"});
    } catch(error) {
        res.status(500).json({message: "Error deleting column!"});
    }
};