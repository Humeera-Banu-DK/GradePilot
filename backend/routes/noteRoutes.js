const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const noteController = require("../controllers/noteController");

// Upload note
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  noteController.uploadNote
);

// Get all notes (search & filter)
router.get("/", authMiddleware, noteController.getNotes);

// Update note
router.put("/:id", authMiddleware, noteController.updateNote);

// Delete note
router.delete("/:id", authMiddleware, noteController.deleteNote);

module.exports = router;
