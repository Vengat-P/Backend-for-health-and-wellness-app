import Nutrition from "../Models/nutritionSchema.js";

//create nutrition log

export const createNutritionLog = async (req, res) => {
  try {
    const nutritionLog = await Nutrition.create(req.body);
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
    const nutritionLogs = await Nutrition.find();
    res.status(200).json({
      message: "Nutrition Logs Fetched Successfully",
      data: nutritionLogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//update nutrition log details
export const updateNutritionLog = async (req, res) => {
  try {
    const nutritionLogId = req.params.id;
    const { food, calories } = req.body;
    const nutritionLog = await Nutrition.findByIdAndUpdate(
      nutritionLogId,
      { food, calories },
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
    res
      .status(200)
      .json({
        message: "Nutrition Log Deleted Successfully",
        data: nutritionLog,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
