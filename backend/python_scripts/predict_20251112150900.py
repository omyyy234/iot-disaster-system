import os
import joblib
import json
import sys
import pandas as pd
# Load ML model
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, "rf_multi_hazard_model.pkl")

# Load model
model = joblib.load(model_path)
# Read input JSON
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
