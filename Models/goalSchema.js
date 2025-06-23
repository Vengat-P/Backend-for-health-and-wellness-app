import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  goal:{
    type: String,
    required: true,
  },
  from:{
    type:Date,
  },
  to:{
    type:Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
