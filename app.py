from flask import Flask, render_template, send_from_directory, request, jsonify,make_response
from flask_cors import CORS, cross_origin
import boto3
import backend.piechart as piechart
import os

app = Flask(__name__ , static_folder='../front-end/build', static_url_path='') 
cors = CORS(app)

@app.route('/board')
@cross_origin()
def Welcome():
    return "Welcome to the Game Board!!!"

@app.route('/board/piechart/')
@cross_origin()
def GeneratePie():
    data = request.args.get('data')
    colors = request.args.get('colors')
    wedge = request.args.get('wedge')
    piechart.GeneratePie(data, colors, wedge)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))