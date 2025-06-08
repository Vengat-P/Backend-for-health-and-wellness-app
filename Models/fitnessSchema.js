import mongoose from "mongoose";

const fitnessSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    exercises:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required:true,
    },
    distance:{
        type: Number,
    }

})