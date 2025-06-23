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
  carbohydrate:{
    type: Number,
  },
  protein:{
    type: Number,
  },
  fat:{
    type: Number,
  },
  vitamin:{
    type: String,
  },
  minerals:{
    type:String,
  },
  calories: {
    type: Number,
  },
  nutritiongoal:{
    type:String,
    enum:["muscle gain","weight lose"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

export default Nutrition;
