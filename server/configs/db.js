import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("===== CONNECT DB START =====");
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);

    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Mongo Connection Error:", error);
  }
};

export default connectDB;