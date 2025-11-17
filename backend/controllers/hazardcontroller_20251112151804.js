const runPythonScript = require("../utils/pythonRunner");

exports.predictHazard = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    // Step 1️⃣: Run your Python script with the input JSON
    const result = await runPythonScript(req.body);

    // 🟢 Step 2️⃣: Add this line right here ↓↓↓
    const riskLabel = result.risk_flag === 1 ? "High Risk" : "Low Risk";

    // Step 3️⃣: Send back complete response to frontend
    res.json({
      ...result,
      risk_label: riskLabel,
    });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
};
