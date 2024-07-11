from flask import Flask, request
import pickle

app = Flask(__name__)
with open("model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/model', methods = ["GET"])
def generate_result():
    body = request.args
    
