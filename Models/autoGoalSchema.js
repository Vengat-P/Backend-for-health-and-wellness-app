import mongoose from "mongoose";

const autoGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    enum:["Pending","Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AutoGoal = mongoose.model("AutoGoal", autoGoalSchema);

export default AutoGoal;
