const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ---------------- SIGNUP ---------------- */
exports.signup = async (req, res) => {
  try {
    const { email, password, branch, regulation, semester } = req.body;

    if (!email || !password || !branch || !regulation || !semester) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!email.endsWith("@srit.ac.in")) {
      return res.status(400).json({
        message: "Only SRIT email IDs are allowed"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      branch,
      regulation,
      semester
    });

    res.status(201).json({
      message: "Signup successful",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
};

/* ---------------- LOGIN ---------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        branch: user.branch,
        regulation: user.regulation,
        semester: user.semester
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

/* ---------------- ME ---------------- */
exports.me = async (req, res) => {
  try {
    res.status(200).json({
      id: req.user._id,
      email: req.user.email,
      semester: req.user.semester,
      branch: req.user.branch,
      regulation: req.user.regulation
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

/* ---------------- UPDATE SEMESTER (🔥 NEW) ---------------- */
exports.updateSemester = async (req, res) => {
  try {
    const { semester } = req.body;

    if (!semester) {
      return res.status(400).json({
        message: "Semester is required"
      });
    }

    req.user.semester = semester;
    await req.user.save();

    res.status(200).json({
      message: "Semester updated successfully",
      semester: req.user.semester
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to update semester"
    });
  }
};
