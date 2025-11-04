import { Router } from "express";
import { createBoard, getAllBoards, getBoard, deleteBoard } from "../controllers/boardController";

const router = Router();
router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getBoard);
router.delete("/:id", deleteBoard);
export default router;