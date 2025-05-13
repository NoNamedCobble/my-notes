import { StatusCodes } from "http-status-codes";
import Note from "../models/Note.js";
import { handleError, validateRequiredFields } from "../utils/apiUtils.js";

export const createNote = async (req, res) => {
  const { userId } = req;
  const { title, content, background } = req.body;
  if (!validateRequiredFields([title, content, background], res)) {
    return;
  }
  try {
    const newNote = new Note({ title, content, userId, background });
    await newNote.save();
    res.status(StatusCodes.CREATED).json({
      message: "Note created successfully.",
      note: { _id: newNote._id, title, content, background },
    });
  } catch (error) {
    handleError("CreateNote", error, res);
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
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    const totalNotes = await Note.countDocuments(query);
    const hasNextPage = page * pageSize < totalNotes;
    const nextPage = hasNextPage ? Number(page) + 1 : null;

    res.status(StatusCodes.OK).json({ nextPage, notes });
  } catch (error) {
    handleError("GetNotes", error, res);
  }
};

export const getNoteById = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id, userId }).select("title content background");
    if (!note) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json(note);
  } catch (error) {
    handleError("GetNoteById", error, res);
  }
};

export const updateNoteById = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;
  const { title, content, background } = req.body;
  if (!validateRequiredFields([title, content, background], res)) {
    return;
  }

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, userId },
      { title, content, background },
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json({ message: "Note updated successfully.", note: updatedNote });
  } catch (error) {
    handleError("UpdateNoteById", error, res);
  }
};

export const deleteNoteById = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });
    if (!deletedNote) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Note not found." });
    }

    res.status(StatusCodes.OK).json({ message: "Note deleted successfully.", note: deletedNote });
  } catch (error) {
    handleError("DeleteNoteById", error, res);
  }
};
