import sys
import json
import os
import pandas as pd
import joblib

# ✅ Get current directory of this file
current_dir = os.path.dirname(os.path.abspath(__file__))

# ✅ Path to your trained model
model_path = os.path.join(current_dir, "rf_multi_hazard_model_actual.pkl")

# ✅ Load the model
model = joblib.load(model_path)

# ✅ Read JSON input from Node.js
input_json = json.loads(sys.argv[1])
df = pd.DataFrame([input_json])

# ✅ Predict hazard risk
risk_flag = int(model.predict(df)[0])
risk_score = float(model.predict_proba(df)[0][1])

# ✅ Print result as JSON for Node.js to capture
print(json.dumps({"risk_flag": risk_flag, "risk_score": risk_score}))
