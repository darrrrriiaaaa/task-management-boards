import { Router } from "express";
import { createBoard, getAllBoards, getBoard, deleteBoard, updateBoard } from "../controllers/boardController";

const router = Router();
router.post("/", createBoard);
router.get("/", getAllBoards);
router.get("/:id", getBoard);
router.patch("/:id", updateBoard);
router.delete("/:id", deleteBoard);
export default router;