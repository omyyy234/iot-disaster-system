const { spawn } = require("child_process");

exports.runPythonPrediction = (inputData) => {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["./python_scripts/predict.py", JSON.stringify(inputData)]);

    let dataString = "";
    py.stdout.on("data", (data) => {
      dataString += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    py.on("close", (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(dataString));
        } catch (err) {
          reject(err);
        }
      } else {
        reject(new Error(`Python process exited with code ${code}`));
      }
    });
  });
};
