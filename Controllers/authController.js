import User from "../Models/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import req from "express/lib/request.js";

//config dotenv
dotenv.config()

// register new user

export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name,email,password: hashPassword});
        //save the details of new user 
        await newUser.save();

        res.status(200).json({message: "User Registered Successfully",data: newUser})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}