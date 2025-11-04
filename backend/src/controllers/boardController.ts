import { Request, Response } from "express";
import Board from "../models/Board";

// controller for creating board
export const createBoard = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const board = await Board.create({name});
        res.status(201).json(board);
    } catch (error) {
        res.status(500).json({message: "Error creating board!"});
    }
};

// controller for getting all existing boards
export const getAllBoards = async (req: Request, res: Response) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error)
    {
        res.status(500).json({message: "Error getting all boards!"});
    }
}

// controller for getting board by id
export const getBoard = async(req: Request, res: Response) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) return res.status(404).json({message: "Board not found!"});
        res.json(board);
    } catch (error) {
        res.status(500).json({message: "Error getting board!"});
    }
};

// controller for updating board
export const updateBoard = async(req: Request, res: Response) => {
    try {
        const board = await Board.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(board);
    } catch(error) {
        res.status(500).json({message: "Board updated successfully!"});
    }
}

// controller for deleting board by id
export const deleteBoard = async(req: Request, res: Response) => {
    try {
        await Board.findByIdAndDelete(req.params.id);
        res.json({message: "Board deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Error deleting board!"});
    }
};