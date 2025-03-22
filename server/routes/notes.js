import express from "express";
import { createNote, deleteNoteById, getNoteById, getNotes, updateNoteById } from "../controllers/noteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.get("/:id", authMiddleware, getNoteById);

router.put("/:id", authMiddleware, updateNoteById);

router.delete("/:id", authMiddleware, deleteNoteById);

export default router;
