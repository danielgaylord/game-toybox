from flask import Flask, render_template, send_from_directory, request, jsonify,make_response
from flask_cors import CORS, cross_origin
import backend.piechart as piechart
import backend.timeclock as timeclock
import os

app = Flask(__name__ , static_folder='frontend/build', static_url_path='') 
cors = CORS(app)

@app.route('/board')
@cross_origin()
def Welcome():
    return "Welcome to the Game Board!!!"

@app.route('/board/piechart/')
@cross_origin()
def get_pie_chart():
    data = request.args.get('data')
    colors = request.args.get('colors')
    wedge = request.args.get('wedge')
    return {'html': piechart.GeneratePie(data, colors, wedge)}

@app.route('/board/timeclockdiff/')
@cross_origin()
def get_time_clock_diff():
    start_time = request.args.get('start')
    end_time = request.args.get('end')
    return {'time': timeclock.time_between(start_time, end_time)}

@app.route('/board/timeclock/')
@cross_origin()
def get_time_clock():
    return {'time': timeclock.get_time()}

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

    # To run a development server with hot reloading (in a virtual environment):
    # - set FLASK_APP=app.py
    # - set FLASK_ENV=development
    # - flask run