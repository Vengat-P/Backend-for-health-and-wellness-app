import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  exercises: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
  },
  calories:{
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

export default Fitness;
