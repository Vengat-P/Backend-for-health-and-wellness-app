import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  exerciseses: [
    {
      exercises: {
        type: String,
        required: true,
      },
      duration:{
        type: Number,
      },
      distance:{
        type: Number
      }
    },
  ],
  nutritions: [
    {
      food: {
        type: String,
        required: true,
      },
      calories:{
        type: Number,
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
