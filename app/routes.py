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



# Page de garde
@app.route("/")
def home():
    return render_template("view.html")

@app.route("/getVolcanoEvents")
def getVolcanoEvents():
    path = os.path.join("app", "static", "data", "volcano_events.json")
    doc = open(path, )
    res = json.load(doc)
    doc.close()
    return json.dumps(res)

@app.route("/getContinents")
def getContinents():
    path = os.path.join("app", "static", "data", "continents.json")
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
