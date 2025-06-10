import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

export default Nutrition;
