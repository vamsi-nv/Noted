import Note from "../models/noteModel.js";

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({createdAt:-1});
    res.status(200).json({
      success: true,
      data: {
        notes,
      },
    });
  } catch (error) {
    console.log("Error getting notes : ", error);
    res.status(500).json({
      success: false,
      message: "Couldn't get notes",
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        note,
      },
    });
  } catch (error) {
    console.log("Error getting note : ", error);
    res.status(500).json({
      success: false,
      message: "Couldn't get note",
    });
  }
};

const createNewNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note created Successfully",
      data: { note: newNote },
    });
  } catch (error) {
    console.log("Error creating notes : ", error);
    res.status(500).json({
      success: false,
      message: "Couldn't create notes",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: {
        note: updatedNote,
      },
    });
  } catch (error) {
    console.log("Error updating notes : ", error);
    res.status(500).json({
      success: false,
      message: "Couldn't update note",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted Successfully",
    });
  } catch (error) {
    console.log("Error deleting notes : ", error);
    res.status(500).json({
      success: false,
      message: "Couldn't delete note",
    });
  }
};

export { getAllNotes, getNoteById, createNewNote, updateNote, deleteNote };
