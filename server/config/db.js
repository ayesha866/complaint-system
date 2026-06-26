const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/onlineComplaints");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error", err);
    process.exit(1);
  }
};

module.exports = connectDB;