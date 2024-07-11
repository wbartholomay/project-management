from flask import Flask, request
import pandas as pd
import pickle

app = Flask(__name__)
with open("python/model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/', methods = ["POST"])
def generate_result():
    body = request.json


    team_size = body.get("teamSize")
    budget = body.get("budget")
    workload = body.get("workload")

    X = pd.DataFrame([{"teamSize" : team_size , "budget" : budget, "workload" : workload}])

    predicted_completion_time = model.predict(X)[0]

    # return {}

    return {"daysToComplete" : int(predicted_completion_time)}

if __name__ == "__main__":
    app.run(debug=True)