const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getSubjects } = require("../controllers/subjectController");

// Protected route
router.get("/", authMiddleware, getSubjects);

module.exports = router;
