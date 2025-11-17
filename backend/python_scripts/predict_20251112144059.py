import sys
import json
import pandas as pd
import joblib

# Load ML model
model = joblib.load("rf_multi_hazard_model.pkl")  # Put your trained model here

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
