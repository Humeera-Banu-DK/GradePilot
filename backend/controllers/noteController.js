const Note = require("../models/Note");
const Subject = require("../models/Subject");

/**
 * POST → Upload note
 */
exports.uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const { title, subjectCode } = req.body;

    const note = await Note.create({
      title,
      subjectCode,
      filePath: req.file.path,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Note upload failed" });
  }
};

/**
 * GET → All notes (search + filter)
 * Query params:
 *   semester
 *   subjectCode
 *   search
 */
exports.getNotes = async (req, res) => {
  try {
    const { semester, subjectCode, search } = req.query;
    let filter = {};

    // 🔹 Filter by semester (via subjectCode lookup)
    if (semester) {
      const subjects = await Subject.find(
        { semester: Number(semester) },
        { subjectCode: 1 }
      );

      const subjectCodes = subjects.map(s => s.subjectCode);

      if (subjectCodes.length === 0) {
        return res.json([]);
      }

      filter.subjectCode = { $in: subjectCodes };
    }

    // 🔹 Filter by subjectCode
    if (subjectCode) {
      filter.subjectCode = subjectCode;
    }

    // 🔹 Search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    const notes = await Note.find(filter)
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

/**
 * PUT → Edit note (only owner)
 */
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.uploadedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    note.title = req.body.title || note.title;
    await note.save();

    res.json({ message: "Note updated", note });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

/**
 * DELETE → Delete note (only owner)
 */
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.uploadedBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
