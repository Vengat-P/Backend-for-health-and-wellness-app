import User from "../Models/authSchema.js";
import Fitness from "../Models/fitnessSchema.js";
import Goal from "../Models/goalSchema.js";
import Nutrition from "../Models/nutritionSchema.js";

//create goal
export const createGoal = async (req, res) => {
  try {
    const { goal } = req.body;

    const userData = await User.findOne({ _id: req.user._id });
    const fitnessData = await Fitness.find({ user: userData._id  });
    const nutritionData = await Nutrition.find({ user: userData._id  });
    console.log(fitnessData)
    console.log(nutritionData)
    // Total calories burned = (Exercise duration in minutes) * (MET value * 3.5 * weight in kg) / 200
    const goals = new Goal({
      user: req.user._id,
      fitness: [fitnessData],
      nutrition: [nutritionData],
      goal,
    });
    //save the details of new user
    await goals.save();
    res.status(200).json({ message: "fitness Log Created Successfully", goal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get all goals
export const getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json({
      message: "fitness logs fetched successfully",
      data: goals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update goal
export const updateGoal = async (req, res) => {
  try {
    const { goalId } = req.params.id;
    const { description, deadline, status } = req.body;
    const goal = await Goal.findByIdAndUpdate(
      goalId,
      { description, deadline, status },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ message: "Goal Not Found" });
    }
    res.status(200).json({ message: "Goal Updated Successfully", data: goal });
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
