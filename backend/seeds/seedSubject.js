require("dotenv").config();
const mongoose = require("mongoose");
const Subject = require("../models/Subject");

// import JSON data
const subjects = require("./data/cse_r23.json");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // optional: avoid duplicates
    await Subject.deleteMany({
      branch: "CSE",
      regulation: "R23"
    });

    await Subject.insertMany(subjects);

    console.log("✅ CSE R23 (Sem 1–8) subjects inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting subjects:", error);
    process.exit(1);
  }
}

seed();
