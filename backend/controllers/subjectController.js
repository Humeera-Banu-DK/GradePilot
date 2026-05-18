const Subject = require("../models/Subject");

// GET subjects for logged-in student
exports.getSubjects = async (req, res) => {
  try {
    const { semester, branch, regulation } = req.user;

    const subjects = await Subject.find({
      semester,
      branch,
      regulation
    }).sort({ subjectCode: 1 });

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
