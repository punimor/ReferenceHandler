from flask import Flask
import flask
import json
from flask import request

from PaperSorter import *

app = Flask(__name__)

# @app.route("/")
# def helloooo():
#     return "Helloooo World!"

# @app.route("/", methods=['GET', 'POST'])
# def hello():
#     username = request.args.get('username')
#     password = request.args.get('password')
#     return ("asdfdsf", username, password)

@app.route('/upload', methods=['POST'])
def file_recieved():
    assert(request.method == 'POST')
    strdata = request.get_data()
    jdata = json.loads(strdata)

    resp = flask.Response()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.data = "server returned", json.dumps(data)
    return resp

# # filename_document = "filip_research.txt"
# # filename_required = "minimum_requirements.txt"
# # filename_desired  = "desired_scores.txt"

# # paperSorter = PaperSorter(filename_document, filename_required, filename_desired)

# # print(len(paperSorter.get_ratings()))
# # print(*["Score:   {}\nTitle:   {}\nLink:    {}\nReasons: {}".format(paper.sections["title"], paper.score, paper.sections["link"], paper.score_matches) for paper in paperSorter.get_ratings()], sep="\n\n")