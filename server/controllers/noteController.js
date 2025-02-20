import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const { userId } = req;
  const { title, content } = req.body;
  try {
    const newNote = new Note({ title, content, userId });
    await newNote.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getNotes = async (req, res) => {
  const { userId } = req;
  try {
    const notes = await Note.find({ userId }).select("title content");
    res.status(200).json(notes);
  } catch (error) {
    res.sentStatus(500);
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id).select("title content");
    if (!note) {
      return res.sendStatus(404);
    }

    res.status(200).json(note);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const deleteNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
