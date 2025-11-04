import { Router } from "express";
import { createCard, updateCard, deleteCard, getCardsFromColumn } from "../controllers/cardController";

const router = Router();
router.post("/", createCard);
router.get("/column/:columnId", getCardsFromColumn);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);

export default router;