import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
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
  dob: {
    type: Date,
  },
  fitnesses: [
    {
      fitness: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fitness",
        required: true,
      },
    },
  ],
  nutritions: [
    {
      nutrition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nutrition",
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
