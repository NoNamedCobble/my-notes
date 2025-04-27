import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const { userId } = req;
  const { title, content, background } = req.body;
  if (!title || !content || !background) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "All fields are required." });
  }

  try {
    const newNote = new Note({ title, content, userId, background });
    await newNote.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Note created successfully.", note: { _id: newNote._id, title, content, background } });
  } catch (error) {
    console.error("CreateNoteError: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req;
  const { page = 1, search = "" } = req.query;
  const pageSize = 10;

  const query = {
    userId,
    $or: [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }],
  };

  try {
    const notes = await Note.find(query)
      .select("title content background")
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalNotes = await Note.countDocuments(query);
    const hasNextPage = page * pageSize < totalNotes;
    const nextPage = hasNextPage ? Number(page) + 1 : null;

    res.status(StatusCodes.OK).json({ nextPage, notes });
  } catch (error) {
    console.error("GetNoteError: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).select("title content background");
    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    console.error("GetNoteById: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
  }
};

export const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, content, background } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, background },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json({ message: "Note updated successfully.", note: updatedNote });
  } catch (error) {
    console.error("UpdateNoteById: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
  }
};

export const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json({ message: "Note deleted successfully.", note: deletedNote });
  } catch (error) {
    console.error("DelteNoteById: ", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
  }
};
