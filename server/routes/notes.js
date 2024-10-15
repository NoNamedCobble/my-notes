import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  deleteNoteById,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);

router.get("/", getNotes);

router.get("/:id", getNoteById);

router.delete("/:id", deleteNoteById);

export default router;
