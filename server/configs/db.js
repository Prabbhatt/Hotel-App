import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("========== MONGO DEBUG ==========");
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
    console.log(
      "URI preview:",
      process.env.MONGODB_URI
        ? process.env.MONGODB_URI.substring(0, 40) + "..."
        : "NOT FOUND"
    );

    await mongoose.connect(
      `${process.env.MONGODB_URI}/hotel-booking`
    );

    console.log("✅ Database Connected");
    console.log("Ready State:", mongoose.connection.readyState);
    console.log("================================");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(error);
  }
};

export default connectDB;