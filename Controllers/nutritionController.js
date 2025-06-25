import User from "../Models/authSchema.js";
import Nutrition from "../Models/nutritionSchema.js";
import cron from "node-cron"
import sendEmail from "../utils/mailer.js";

//create nutrition log

export const createNutritionLog = async (req, res) => {
  try {
    const {
      food,
      carbohydrate,
      protein,
      fat,
      vitamin,
      minerals,
      nutritiongoal,
    } = req.body;
//Calories from food intake carbohydrate * 4,protien*4,fat*9
    const nutritionLog = new Nutrition({
      user: req.user._id,
      food,
      carbohydrate,
      protein,
      fat,
      vitamin,
      minerals,
      calories: carbohydrate * 4 + protein * 4 + fat * 9,
      nutritiongoal,
    });
    await nutritionLog.save();
    res
      .status(200)
      .json({ message: "Nutrition Log Created Successfully", nutritionLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all nutrition logs details
export const getAllLogs = async (req, res) => {
  try {
    const nutritionLogs = await Nutrition.find({ user: req.user._id });
    res.status(200).json({
      message: "Nutrition Logs Fetched Successfully",
      data: nutritionLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get single nutrition log details
export const getNutritionLog = async (req, res) => {
  try {
    const nutritionLogId = req.params.id;
    const nutritionLog = await Nutrition.findOne({ _id: nutritionLogId });
    res.status(200).json({
      message: "fitness log fetched successfully",
      data: nutritionLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update nutrition log details
export const updateNutritionLog = async (req, res) => {
  try {
    const nutritionLogId = req.params.id;
    const {
      food,
      carbohydrate,
      protein,
      fat,
      vitamin,
      minerals,
      nutritiongoal,
    } = req.body;
    const nutritionLog = await Nutrition.findByIdAndUpdate(
      nutritionLogId,
      {
        food,
        carbohydrate,
        protein,
        fat,
        vitamin,
        minerals,
        calories: carbohydrate * 4 + protein * 4 + fat * 9,
        nutritiongoal,
      },
      { new: true }
    );
    if (!nutritionLog) {
      return res.status(404).json({ message: "Nutrition Log Not Found" });
    }
    res.status(200).json({
      message: "Nutrition Log Updated Successfully",
      data: nutritionLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete nutrition log
export const deleteNutritionLog = async (req, res) => {
  try {
    const nutritionLogId = req.params.id;
    const nutritionLog = await Nutrition.findByIdAndDelete(nutritionLogId);
    if (!nutritionLog) {
      res.status(404).json({ message: "Nutrition Log Not Found" });
    }
    res.status(200).json({
      message: "Nutrition Log Deleted Successfully",
      data: nutritionLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//reminder for intake foods
cron.schedule('0 10 * * *',async()=>{
  try {
    const users = await User.find()
    for(const user of users){
      await sendEmail(
        user.email,
        "Nutrition Reminder",
        `Don't forgot to take Food Intake `
      )
    }
  } catch (error) {
    console.log(error)
  }
})
cron.schedule('0 14 * * *',async()=>{
  try {
    const users = await User.find()
    for(const user of users){
      await sendEmail(
        user.email,
        "Nutrition Reminder",
        `Don't forgot to take Food Intake `
      )
    }
  } catch (error) {
    console.log(error)
  }
})
cron.schedule('0 17 * * *',async()=>{
  try {
    const users = await User.find()
    for(const user of users){
      await sendEmail(
        user.email,
        "Nutrition Reminder",
        `Don't forgot to take some nutrients `
      )
    }
  } catch (error) {
    console.log(error)
  }
})
cron.schedule('0 21 * * *',async()=>{
  try {
    const users = await User.find()
    for(const user of users){
      await sendEmail(
        user.email,
        "Nutrition Reminder",
        `Don't forgot to take Food Intake `
      )
    }
  } catch (error) {
    console.log(error)
  }
})