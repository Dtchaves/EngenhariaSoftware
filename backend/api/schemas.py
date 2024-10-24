from flask_marshmallow import Marshmallow
from app.models import Doctor, Patient

ma = Marshmallow()

class DoctorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Doctor

doctor_schema = DoctorSchema()
doctors_schema = DoctorSchema(many=True)

class PatientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Patient

patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)
