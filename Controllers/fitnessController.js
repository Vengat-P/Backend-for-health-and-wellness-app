import User from "../Models/authSchema.js";
import Fitness from "../Models/fitnessSchema.js";

//create fitness log
export const createFitnessLog = async (req, res) => {
  try {
    const { exercises, duration, distance } = req.body;

    const userData = await User.findOne({ _id: req.user._id });
    console.log(userData);
    // Total calories burned = (Exercise duration in minutes) * (MET value * 3.5 * weight in kg) / 200
    const fitnessLog = new Fitness({
      user: req.user._id,
      exercises,
      duration,
      distance,
      calories: duration * ((5 * 3.5 * userData.weight) / 200),
    });
    //save the details of new user
    await fitnessLog.save();
    res
      .status(200)
      .json({ message: "fitness Log Created Successfully", data: fitnessLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get logs details
export const getAllLogs = async (req, res) => {
  try {
    const fitnessLogs = await Fitness.find({user: req.user._id});
    res.status(200).json({
      message: "fitness logs fetched successfully",
      data: fitnessLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update fitnessLog details
export const updateFitnessLog = async (req, res) => {
  try {
    const fitnessLogId = req.params.id;
    const { exercises, duration, distance } = req.body;
    const fitnessLog = await Fitness.findByIdAndUpdate(
      fitnessLogId,
      { exercises, duration, distance },
      { new: true }
    );
    if (!fitnessLog) {
      return res.status(404).json({ message: "Fitness Log Not Found" });
    }
    res
      .status(200)
      .json({ message: "Fitness Log Updated Successfully", data: fitnessLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete fitnessLog
export const deleteFitnessLog = async (req, res) => {
  try {
    const fitnessLogId = req.params.id;
    const fitnessLog = await Fitness.findByIdAndDelete(fitnessLogId);
    if (!fitnessLog) {
      return res.status(404).json({ message: "Fitness Log Not Found" });
    }
    res
      .status(200)
      .json({ message: "Fitness Log Deleted Successfully", data: fitnessLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
