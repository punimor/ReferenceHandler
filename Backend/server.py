from flask import Flask
import flask
import json
from flask import request

from PaperParser import DocumentParser
from PaperScorer import PaperScorer

app = Flask(__name__)
@app.route('/upload', methods=['POST'])
def file_recieved():
    assert(request.method == 'POST')
    bytesdata = request.get_data()
    strdata = bytes.decode(bytesdata) 
    print(type(strdata))
    print(request)
    jdata = json.loads(strdata)
    document = DocumentParser(jdata)
    rate_words = PaperScorer(document.papers, filename="desired_scores.txt")


    resp = flask.Response()
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.data = json.dumps(rate_words.get_scored_papers())
    return resp