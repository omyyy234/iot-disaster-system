const { runPythonPrediction } = require("../utils/pythonRunner");

exports.predictHazard = async (req, res) => {
  try {
    const inputData = req.body; // JSON input from frontend
    const prediction = await runPythonPrediction(inputData);
    res.json(prediction);
  } catch (err) {
    console.error("Prediction Error:", err);
    res.status(500).json({ error: "Prediction failed" });
  }
};
