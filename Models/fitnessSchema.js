import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  age: {
    type: Number,
  },
  exercises: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

export default Fitness;
