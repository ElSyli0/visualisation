from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, SelectField, IntegerField, SelectMultipleField, BooleanField
from wtforms.fields.html5 import DateField
from wtforms.validators import ValidationError, InputRequired, Length, Email, EqualTo


class CatastropheFiltreForm(FlaskForm):
    eq = BooleanField("Tremblements de terre : ")
    tsu = BooleanField("Tsunamis : ")
    vol = BooleanField("Volcans : ")
    crim = BooleanField("Criminalité : ")
    submit = SubmitField("Validation")