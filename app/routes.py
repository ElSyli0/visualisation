from app import app #, db
from flask import render_template, redirect, url_for, flash, request
from flask import jsonify
from flask import json, Response
import os
from app.forms import*
from app.models import*
from werkzeug.urls import url_parse
from sqlalchemy.exc import DatabaseError
#from flask_login import login_required, login_user, logout_user, current_user, LoginManager
import datetime
from sqlalchemy import exc
import jenkspy



# Page de garde
@app.route("/")
def home():
    #return render_template("test.html")
    return render_template("test_clean.html")
    #return render_template("view.html")

@app.route("/getVolcanoEvents")
def getVolcanoEvents():
    path = os.path.join("app", "static", "data", "volcano_events.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getVolcanoLoc")
def getVolcanoLoc():
    path = os.path.join("app", "static", "data", "volcano_locations.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getContinents")
def getContinents():
    path = os.path.join("app", "static", "data", "continents_clean.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getCountries")
def getCountries():
    path = os.path.join("app", "static", "data", "countries_continent.geojson")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getTect")
def getTect():
    path = os.path.join("app", "static", "data", "Tect.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getEarthquake")
def getEarthquake():
    path = os.path.join("app", "static", "data", "earthquakes_events.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getTsu")
def getTsu():
    path = os.path.join("app", "static", "data", "tsunamis_events.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getClasses", methods=["POST"])
def getClasses():
    val_list = request.form["val_array"]
    val_list = val_list.replace("[", "")
    val_list = val_list.replace("]", "")
    val_list = val_list.replace(",", " ")
    val_list = val_list.split()
    x = []
    for e in val_list:
        x.append(int(e))
    breaks = jenkspy.jenks_breaks(x, nb_class=4)
    print(breaks)
    if breaks[0] == breaks[1]:
        breaks = [breaks[0], breaks[2], breaks[3], breaks[4]]
        print(breaks)
        if breaks[0] == breaks[1]:
            breaks = [breaks[0], breaks[2], breaks[3]]
            print(breaks)
            return json.dumps({"length": 3, "b0":breaks[0], "b1":breaks[1], "b2":breaks[2]})
        else:
            return json.dumps({"length": 4, "b0":breaks[0], "b1":breaks[1], "b2":breaks[2], "b3":breaks[3]})
    else:
        return json.dumps({"length": 5,"b0":breaks[0], "b1":breaks[1], "b2":breaks[2], "b3":breaks[3], "b4":breaks[4]})
