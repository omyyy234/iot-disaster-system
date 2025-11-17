const runPythonScript = require("../utils/pythonRunner");

exports.predictHazard = async (req, res) => {
  try {
    console.log("Received data:", req.body);

    // 1️⃣ Run your Python prediction script
    const result = await runPythonScript(req.body);

    // 2️⃣ Add human-readable risk label
    const riskLabel = result.risk_flag === 1 ? "High Risk" : "Low Risk";

    // 3️⃣ Send back full response
    res.json({
      ...result,
      risk_label: riskLabel,
    });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
};
