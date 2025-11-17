const { spawn } = require("child_process");

function runPythonScript(data) {
    return new Promise((resolve, reject) => {
        const py = spawn("python", ["./python_scripts/predict.py", JSON.stringify(data)]);

        let result = "";
        let errorOutput = "";

        py.stdout.on("data", (chunk) => (result += chunk));
        py.stderr.on("data", (chunk) => (errorOutput += chunk));

        py.on("close", () => {
            if (errorOutput) return reject(errorOutput);

            try {
                resolve(JSON.parse(result));
            } catch (err) {
                reject("Invalid JSON from Python");
            }
        });
    });
}

module.exports = runPythonScript;
