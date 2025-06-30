import User from "../Models/authSchema.js";
import Goal from "../Models/goalSchema.js";
import cron from "node-cron";
import sendEmail from "../utils/mailer.js";
import AutoGoal from "../Models/autoGoalSchema.js";


cron.schedule("0 0 * * *", async () => {
  try {
    const users = await User.find();
    for (const user of users) {
      const goalData = await Goal.find({ user: user._id });
      for (const singleGoal of goalData) {
        await createAutoGoal(singleGoal, user);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
export const createAutoGoal = async (singleGoal, user) => {
  const today = new Date();
  console.log(today);
  if (today >= singleGoal.from && today <= singleGoal.to) {
    const autogoal = new AutoGoal({
      user: user._id,
      goal: singleGoal.goal,
    });
    await autogoal.save();
    console.log(autogoal);
  } else {
    console.log("Chcek Goal period");
  }
};
// get all goals
export const getAllGoals = async (req, res) => {
  try {
    const goals = await AutoGoal.find({ user: req.user._id });
    res.status(200).json({
      message: "All Goals fetched successfully",
      data: goals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get single goal details
export const getGoalLog = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goalLog = await AutoGoal.findOne({ _id: goalId });
    // console.log(goalLog);
    res.status(200).json({
      message: "Goal  fetched successfully",
      data: goalLog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update goal
export const updateGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    let { goal, status } = req.body;
    const goalLog = await AutoGoal.findByIdAndUpdate(
      goalId,
      { goal, status },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal Not Found" });
    }
    res
      .status(200)
      .json({ message: "Goal Updated Successfully", data: goalLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete goal
export const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await AutoGoal.findByIdAndDelete(goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goal Not Found" });
    }
    res.status(200).json({ message: "Goal Deleted Successfully", data: goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
