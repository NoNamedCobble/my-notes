import Note from "../models/Note.js";
import { StatusCodes } from "http-status-codes";

export const createNote = async (req, res) => {
  const { userId } = req;
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Title and content are required." });
  }

  try {
    const newNote = new Note({ title, content, userId });
    await newNote.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Note created successfully.", note: newNote });
  } catch (error) {
    console.error("CreateNoteError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req;
  try {
    const notes = await Note.find({ userId }).select("title content");
    res.status(StatusCodes.OK).json(notes);
  } catch (error) {
    console.error("GetNoteError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).select("title content");
    if (!note) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    console.error("GetNoteById: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Note not found." });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Note deleted successfully.", deletedNote });
  } catch (error) {
    console.error("DelteNoteById: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};
