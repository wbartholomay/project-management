from flask import Flask, request
import pandas as pd
import pickle

app = Flask(__name__)
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/model', methods = ["GET"])
def generate_result():
    body = request.args

    X = pd.DataFrame({"teamSize" : body.get("teamSize"), "budget" : body.get("budget"), "workload" : body.get("workload")})

    predicted_completion_time = model.predict(X)

    return {"daysToComplete" : predicted_completion_time}

if __name__ == 