const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

const mongoDbConnection = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    throw new Error("MongoDB connection error");
  }
};

module.exports = mongoDbConnection;
