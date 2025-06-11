import Fitness from "../Models/fitnessSchema.js";

//create fitness log
export const createFitnessLog = async (req, res) => {
  try {
    const fitnessLog = await Fitness.create(req.body);
    res
      .status(200)
      .json({ message: "fitness Log Created Successfully", fitnessLog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get logs details
export const getAllLogs = async (req, res) => {
  try {
    const fitnessLogs = await Fitness.find();
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
//update user  details
export const updateUserDetail = async (req, res) => {
  try {
    const userId = req.params.id;
    const { height, weight, age } = req.body;
    const userDetail = await Fitness.findByIdAndUpdate(
      userId,
      { height, weight, age },
      { new: true }
    );
    if (!userDetail) {
      return res.status(404).json({ message: "Fitness Log Not Found" });
    }
    res
      .status(200)
      .json({ message: "Fitness Log Updated Successfully", data: userDetail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};