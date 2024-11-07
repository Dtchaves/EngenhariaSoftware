import os
from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user, logout_user, login_required, current_user
import numpy as np
import torch
from api.schemas import patient_schema, patients_schema
from api.models import ExamResult, UserRole, db, Patient
from api.utils import allowed_file, load_model, make_prediction, save_file
from PIL import Image
from api.config import Config

routes = Blueprint('patient_routes', __name__)
model = load_model(Config.MODEL_PATH)
# model = load_model('/home/rafaelmg/Documents/EngenhariaSoftware/server/models/MoEGateC.pt')

# Create a new patient
@routes.route('/patient', methods=['POST'])
def create_patient():
    try:
        name = request.json['name']
        age = request.json['age']
        email = request.json['email']
        doctor_id = request.json['doctor_id']
        password = request.json['password']

        new_patient = Patient(name=name, age=age, email=email, doctor_id=doctor_id)
        new_patient.set_password(password)
        db.session.add(new_patient)
        db.session.commit()

        return make_response(patient_schema.jsonify(new_patient), 201)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all patients
@routes.route('/patients', methods=['GET'])
def get_patients():
    try:
        patients = Patient.query.all()
        return make_response(patients_schema.jsonify(patients), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get a specific patient by ID
@routes.route('/patient/<id>', methods=['GET'])
@login_required
def get_patient(id):
    try:
        patient = Patient.query.get(id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        return make_response(patient_schema.jsonify(patient), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Update a patient
@routes.route('/patient/<id>', methods=['PUT'])
def update_patient(id):
    try:
        patient = Patient.query.get(id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)

        patient.name = request.json['name']
        patient.age = request.json['age']
        patient.email = request.json['email']
        patient.doctor_id = request.json['doctor_id']

        db.session.commit()
        return make_response(patient_schema.jsonify(patient), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete a patient
@routes.route('/patient/<id>', methods=['DELETE'])
def delete_patient(id):
    try:
        patient = Patient.query.get(id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)

        db.session.delete(patient)
        db.session.commit()
        return make_response(jsonify({'message': 'Patient deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@routes.route('/temp_route', methods=['POST'])
@login_required
def upload_exam(patient_id):
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Only patients can upload exams'}), 403)

        file = request.files.get('file')
        if not file or not allowed_file(file.filename, Config.ALLOWED_EXTENSIONS):
            return make_response(jsonify({'message': 'File not found or invalid file type'}), 400)

        filepath = save_file(file, Config.UPLOAD_FOLDER)
        
        img = Image.open(filepath)
        img_tensor = torch.from_numpy(np.array(img)).float().unsqueeze(0)
        result = make_prediction(model, img_tensor)

        result_data = {'result': result.item()}
        
        # Query the patient object
        patient = Patient.query.get(patient_id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        
        exam_result = ExamResult(patient_id=patient_id, doctor_id=patient.doctor.id, result=result_data)
        db.session.add(exam_result)
        db.session.commit()

        return make_response(jsonify({'message': 'File uploaded successfully', 'result': result_data}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)