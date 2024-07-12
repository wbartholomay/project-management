import sys
import pickle
import pandas as pd
from sklearn.linear_model import LogisticRegression

if __name__ == '__main__':
    team_size = int(sys.argv[1])
    budget = int(sys.argv[2])
    workload = int(sys.argv[3])

    with open("model.pkl", "rb") as file:
        model = pickle.load(file)

    X = pd.DataFrame({"teamSize" : [team_size], "budget" : [budget], "workload": [workload]})
    pred = model.predict(X)
    print(pred[0])
