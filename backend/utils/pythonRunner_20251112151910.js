const { spawn } = require("child_process");

async function runPythonScript(inputData) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      "./python_scripts/predict.py",
      JSON.stringify(inputData),
    ]);

    let dataToSend = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      dataToSend += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error("Python error:", errorOutput);
        reject(new Error(`Python process exited with code ${code}`));
      } else {
        try {
          const parsedData = JSON.parse(dataToSend);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

module.exports = runPythonScript;
