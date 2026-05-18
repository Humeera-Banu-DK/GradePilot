const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  calculateSGPA,
  calculateCGPA
} = require("../controllers/gradeController");

router.post("/sgpa", authMiddleware, calculateSGPA);
router.post("/cgpa", authMiddleware, calculateCGPA);

module.exports = router;
