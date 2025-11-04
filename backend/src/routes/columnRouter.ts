import { Router } from "express";
import { createColumn, deleteColumn, getColumnsFromBoard, updateColumn } from "../controllers/columnController";

const router = Router();
router.post("/", createColumn);
router.get("/board/:boardId", getColumnsFromBoard);
router.patch("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;