import User from "../Models/authSchema.js";
import Goal from "../Models/goalSchema.js";

//create goal
export const createGoal = async (req, res) => {
  try {
    const { goal,from,to } = req.body;
    
    const userData = await User.findOne({ _id: req.user._id });
    const goals = new Goal({
      user: req.user._id,
      goal,
      from,
      to,
    });
    await goals.save();
    res.status(200).json({ message: "Goal Created Successfully", goals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all goals
export const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
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
    const goalLog = await Goal.findOne({ _id: goalId });
    console.log(goalLog)
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
    const  goalId  = req.params.id;
    let { goal,status} = req.body;
    const goalLog = await Goal.findByIdAndUpdate(
      goalId,
      { goal,status },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal Not Found" });
    }
    res.status(200).json({ message: "Goal Updated Successfully", data: goalLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete goal
export const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const goal = await Goal.findByIdAndDelete(goalId);
    if (!goal) {
      return res.status(404).json({ message: "Goal Not Found" });
    }
    res.status(200).json({ message: "Goal Deleted Successfully", data: goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
