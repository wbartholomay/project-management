import sys
import pickle
import pandas as pd
from sklearn.linear_model import LogisticRegression

if __name__ == '__main__':
    #take command line input for features
    team_size = int(sys.argv[1])
    budget = int(sys.argv[2])
    workload = int(sys.argv[3])

    #load model
    with open("model.pkl", "rb") as file:
        model = pickle.load(file)

    #load data into dataframe
    X = pd.DataFrame({"teamSize" : [team_size], "budget" : [budget], "workload": [workload]})
    #predict result
    pred = model.predict(X)
    #output prediction
    print(pred[0])
