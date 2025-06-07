import mongoose from "mongoose";
import dotenv from "dotenv";

//dotenv configuration
dotenv.config();

//connection string

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongo DB Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
