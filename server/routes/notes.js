import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  deleteNoteById,
} from "../controllers/noteController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.get("/:id", authMiddleware, getNoteById);

router.delete("/:id", authMiddleware, deleteNoteById);

export default router;
