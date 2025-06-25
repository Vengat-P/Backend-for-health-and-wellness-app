import User from "../Models/authSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../utils/mailer.js";

//config dotenv
dotenv.config();

// register new user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      gender,
    });
    //save the details of new user
    await newUser.save();

    res
      .status(200)
      .json({ message: "User Registered Successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user details
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.password = undefined;
    user.token = undefined;
    res.status(200).json({
      message: "fitness logs fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update user details
export const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, gender, height, weight, age } = req.body;
    // for men BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // for women BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    const bmr =
      gender.toLowerCase() === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, gender, height, weight, age, bmr },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ message: "User Info Updated Successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;
    await user.save();
    res.status(200).json({
      message: "User LoggedIn Successfully",
      token: token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //email send part
    await sendEmail(
      user.email,
      "Password Reset Link",
      `You are receiving this because you have requested the reset password for your account.
      Please click the following link or paste it into your browser to complete the process
      https://fit2go.netlify.app/reset-password/${user._id}/${token}
      please ignore you have not requested for reset password.`
    );
    res.status(200).json({ message: "Email Sent Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reset password

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({ message: "Invalid token" });
    }
    //hash new password
    const hashPassword = await bcrypt.hash(password, 10);
    //update password in database
    const updateUser = await User.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "Password resetted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
