import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/karigarlink";
    await mongoose.connect(mongoURI);
    console.log("Database Connected Successfully ✅");
  } catch (error) {
    console.error("Database Connection Failed ❌", error.message);
    process.exit(1);
  }
};

export default connectDB;