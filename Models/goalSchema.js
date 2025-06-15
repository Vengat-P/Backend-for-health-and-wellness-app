import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fitness:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fitness",
    required: true,
  },
  nutrition:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nutrition",
    required: true,
  },
  goal: {
    type: String,
    enum: ["muscle gain", "weight lose"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
