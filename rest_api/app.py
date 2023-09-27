#!/usr/bin/env python
# encoding: utf-8
import json
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = [
    {"name": "Page A", "uv": 4000, "pv": 2400, "amt": 2400, "time":4},
    {"name": "Page B", "uv": 3000, "pv": 1398, "amt": 2210, "time":6},
    {"name": "Page C", "uv": 2000, "pv": 9800, "amt": 2290, "time":8},
    {"name": "Page D", "uv": 8000, "pv": 2000, "amt": 2390, "time":9}
]


@app.route('/data/')
def index():
    return json.dumps(data)


app.run()
