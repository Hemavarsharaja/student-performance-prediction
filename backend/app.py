from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
import json

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pretrained model and preprocessor
try:
    with open("models/model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("models/preprocessor.pkl", "rb") as f:
        preprocessor = pickle.load(f)
except FileNotFoundError:
    model = None
    preprocessor = None

# Request schema
class StudentData(BaseModel):
    attendance: float
    internal_marks: float
    study_hours: float
    backlogs: int
    participation: float = 3.0

# Response schema
class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    score: float

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict_performance(data: StudentData):
    if model is None or preprocessor is None:
        return {"error": "Model not loaded. Train and save the model first."}
    
    # Prepare input
    input_data = np.array([[
        data.attendance,
        data.internal_marks,
        data.study_hours,
        data.backlogs,
        data.participation
    ]])
    
    # Preprocess
    input_scaled = preprocessor.transform(input_data)
    
    # Predict
    prediction = model.predict(input_scaled)[0]
    probability = max(model.predict_proba(input_scaled)[0])
    
    # Estimate final score (simple heuristic)
    score = (data.internal_marks * 0.4 + data.attendance * 0.3 + 
             data.study_hours * 5 + data.participation * 2)
    score = min(100, max(0, score))
    
    return PredictionResponse(
        prediction="Pass" if prediction == 1 else "Fail",
        probability=float(probability),
        score=float(score)
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
