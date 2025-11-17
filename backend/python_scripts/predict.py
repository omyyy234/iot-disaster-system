import os
import joblib
import json
import sys
import pandas as pd

# Get the folder where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Full path to the ML model
model_path = os.path.join(script_dir, "rf_multi_hazard_model_actual.pkl")

# Load ML model
model = joblib.load(model_path)  # now it will always find the model

# Read input JSON from command line argument
input_json = json.loads(sys.argv[1])
df = pd.DataFrame([input_json])

# Predict
risk_flag = int(model.predict(df)[0])
risk_score = float(model.predict_proba(df)[0][1])

# Return JSON
print(json.dumps({
    "risk_flag": risk_flag,
    "risk_score": risk_score
}))
