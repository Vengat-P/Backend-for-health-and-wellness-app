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
    res
      .status(200)
      .json({
        message: "fitness logs fetched successfully",
        data: fitnessLogs,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
