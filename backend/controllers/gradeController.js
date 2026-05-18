const Subject = require("../models/Subject");

const gradePoints = {
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "E": 5,
    "F": 0,
    "Ab": 0
};


exports.calculateSGPA = async (req, res) => {
  try {
    const { grades } = req.body;
    const { semester, branch, regulation } = req.user;

    const subjects = await Subject.find({ semester, branch, regulation });

    let totalCredits = 0;
    let weightedSum = 0;

    for (const subject of subjects) {
      const grade = grades[subject.subjectCode];

      // ✅ NON-CREDIT SUBJECT (credits = 0)
      if (subject.credits === 0) {
        // Optional validation
        if (grade && !["S", "US", "U"].includes(grade)) {
          return res.status(400).json({
            message: `Invalid grade '${grade}' for non-credit subject ${subject.subjectCode}`
          });
        }
        continue; // ❌ Do NOT include in SGPA
      }

      // ❌ CREDIT SUBJECT but grade missing
      if (!grade) {
        return res.status(400).json({
          message: `Grade missing for subject ${subject.subjectCode}`
        });
      }

      // ❌ Invalid grade
      if (!gradePoints.hasOwnProperty(grade)) {
        return res.status(400).json({
          message: `Invalid grade '${grade}' for subject ${subject.subjectCode}`
        });
      }

      const point = gradePoints[grade];
      weightedSum += point * subject.credits;
      totalCredits += subject.credits;
    }

    const sgpa = (weightedSum / totalCredits).toFixed(2);
    res.json({ sgpa });

  } catch (err) {
    res.status(500).json({ message: "SGPA calculation failed" });
  }
};

exports.calculateCGPA = async (req, res) => {
  try {
    const { previousCGPA, grades } = req.body;
    const { semester, branch, regulation } = req.user;

    // 🔹 Fetch current semester subjects
    const currentSubjects = await Subject.find({
      semester,
      branch,
      regulation
    });

    let currentCredits = 0;
    let currentPoints = 0;

    for (const subject of currentSubjects) {
      // ⛔ Skip non-credit courses
      if (subject.credits === 0) continue;

      const grade = grades[subject.subjectCode];
      if (!grade) {
        return res.status(400).json({
          message: `Grade missing for subject ${subject.subjectCode}`
        });
      }

      const point = gradePoints[grade];
      if (point === undefined) {
        return res.status(400).json({
          message: `Invalid grade '${grade}' for subject ${subject.subjectCode}`
        });
      }

      currentCredits += subject.credits;
      currentPoints += subject.credits * point;
    }

    // ✅ CASE 1: FIRST SEMESTER
    if (semester === 1) {
      const cgpa = (currentPoints / currentCredits).toFixed(2);

      return res.json({
        cgpa
      });
    }

    // 🔒 CASE 2: SEMESTER > 1 → previousCGPA required
    if (previousCGPA === undefined) {
      return res.status(400).json({
        message: "Previous CGPA is required to calculate CGPA"
      });
    }

    // 🔹 Credits till previous semesters (AUTO from DB)
    const previousSubjects = await Subject.find({
      semester: { $lt: semester },
      branch,
      regulation,
      credits: { $gt: 0 }
    });

    const previousCredits = previousSubjects.reduce(
      (sum, s) => sum + s.credits,
      0
    );

    // 🔹 Final CGPA calculation
    const totalPoints =
      previousCGPA * previousCredits + currentPoints;

    const cgpa = (
      totalPoints /
      (previousCredits + currentCredits)
    ).toFixed(2);

    res.json({ cgpa });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "CGPA calculation failed"
    });
  }
};


