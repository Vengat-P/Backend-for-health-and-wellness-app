import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,

  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default:0,
  },
  bmr:{
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
