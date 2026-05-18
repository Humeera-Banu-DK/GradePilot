const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  signup,
  login,
  me,
  updateSemester
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, me);

// 🔥 NEW ROUTE (REQUIRED FOR PROFILE PAGE)
router.put("/update-semester", authMiddleware, updateSemester);

module.exports = router;
