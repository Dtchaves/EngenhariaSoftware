from flask import Blueprint, Flask, request, jsonify, make_response
from api.schemas import doctor_schema, doctors_schema, patient_schema, patients_schema
from api.models import UserRole, db, Doctor, Patient, Admin, ExamResult, Message, MedicalReport
from flask_login import login_required, current_user
import torch
from PIL import Image
import io
from werkzeug.utils import secure_filename
import os
from api.utils import save_file, allowed_file, load_model, make_prediction
from api.constants import NOT_FOUND_CODE, FORBIDDEN_CODE, BAD_REQUEST_CODE, FILE_NOT_FOUND_MESSAGE, FILE_UPLOAD_SUCCESS, SUCCESS_CODE
from api.config import Config
import numpy as np

routes = Blueprint('routes', __name__)
# model = load_model(os.getenv('MODEL_PATH'))

# Create a new doctor
@routes.route('/doctors', methods=['POST'])
def create_doctor():
    try:
        name = request.json['name']
        specialization = request.json['specialization']
        email = request.json['email']

        new_doctor = Doctor(name=name, specialization=specialization, email=email)
        db.session.add(new_doctor)
        db.session.commit()

        return doctor_schema.jsonify(new_doctor)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

# Get all doctors
@routes.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors = Doctor.query.all()
        return make_response(doctors_schema.jsonify(doctors), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

# Get a specific doctor by ID
@routes.route('/doctors/<id>', methods=['GET'])
def get_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if doctor:
            return make_response(doctor_schema.jsonify(doctor), SUCCESS_CODE)
        return make_response(jsonify({'message': 'Doctor not found'}), NOT_FOUND_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

# Update a doctor
@routes.route('/doctors/<id>', methods=['PUT'])
def update_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), 404)

        doctor.name = request.json['name']
        doctor.specialization = request.json['specialization']
        doctor.email = request.json['email']

        db.session.commit()
        return make_response(doctor_schema.jsonify(doctor), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# # Delete a doctor
# @routes.route('/doctors/<id>', methods=['DELETE'])
# def delete_doctor(id):
#     try:
#         doctor = Doctor.query.get(id)
#         if not doctor:
#             return make_response(jsonify({'message': 'Doctor not found'}), 404)

#         db.session.delete(doctor)
#         db.session.commit()
#         return make_response(jsonify({'message': 'Doctor deleted successfully'}), 200)
#     except Exception as e:
#         return make_response(jsonify({'message': str(e)}), 500)

# Create a new patient
@routes.route('/patients', methods=['POST'])
def create_patient():
    try:
        name = request.json['name']
        age = request.json['age']
        email = request.json['email']
        doctor_id = request.json['doctor_id']

        new_patient = Patient(name=name, age=age, email=email, doctor_id=doctor_id)
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
@routes.route('/patients/<id>', methods=['GET'])
def get_patient(id):
    try:
        patient = Patient.query.get(id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        return make_response(patient_schema.jsonify(patient), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Update a patient
@routes.route('/patients/<id>', methods=['PUT'])
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
@routes.route('/patients/<id>', methods=['DELETE'])
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

# CRUD for Admin
@routes.route('/admin', methods=['POST'])
@login_required
def create_admin():
    try:
        data = request.json
        admin = Admin(username=data['username'])
        admin.set_password(data['password'])
        admin.role = 'admin'
        db.session.add(admin)
        db.session.commit()
        return make_response(jsonify({'message': 'Admin created successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all doctors
@routes.route('/admin/doctors', methods=['GET'])
@login_required
def get_all_doctors():
    try:
        doctors = Doctor.query.all()
        return make_response(jsonify([doctor.name for doctor in doctors]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all patients
@routes.route('/admin/patients', methods=['GET'])
@login_required
def get_all_patients():
    try:
        patients = Patient.query.all()
        return make_response(jsonify([patient.name for patient in patients]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete a doctor
@routes.route('/admin/doctor/<id>', methods=['DELETE'])
@login_required
def delete_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), 404)

        db.session.delete(doctor)
        db.session.commit()
        return make_response(jsonify({'message': 'Doctor deleted'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete a patient
@routes.route('/admin/patient/<id>', methods=['DELETE'])
@login_required
def delete_patient(id):
    try:
        patient = Patient.query.get(id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)

        db.session.delete(patient)
        db.session.commit()
        return make_response(jsonify({'message': 'Patient deleted'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# @routes.route('/patients/<int:patient_id>/upload_exam', methods=['POST'])
# @login_required
# def upload_exam(patient_id):
#     try:
#         if current_user.role != UserRole.PATIENT:
#             return make_response(jsonify({'message': 'Only patients can upload exams'}), 403)

#         file = request.files.get('file')
#         if not file or not allowed_file(file.filename, Config.ALLOWED_EXTENSIONS):
#             return make_response(jsonify({'message': 'File not found or invalid file type'}), 400)

#         filepath = save_file(file, Config.UPLOAD_FOLDER)
        
#         img = Image.open(filepath)
#         img_tensor = torch.from_numpy(np.array(img)).float().unsqueeze(0)
#         result = make_prediction(model, img_tensor)

#         result_data = {'result': result.item()}
        
#         # Query the patient object
#         patient = Patient.query.get(patient_id)
#         if not patient:
#             return make_response(jsonify({'message': 'Patient not found'}), 404)
        
#         exam_result = ExamResult(patient_id=patient_id, doctor_id=patient.doctor.id, result=result_data)
#         db.session.add(exam_result)
#         db.session.commit()

#         return make_response(jsonify({'message': 'File uploaded successfully', 'result': result_data}), 200)
#     except Exception as e:
#         return make_response(jsonify({'message': str(e)}), 500)

# View all patients (Doctor)
@routes.route('/doctor/<int:doctor_id>/patients', methods=['GET'])
@login_required
def get_patients(doctor_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)
        patients = Patient.query.filter_by(doctor_id=doctor_id).all()
        return make_response(jsonify([patient.name for patient in patients]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# View exam results for a patient (Doctor)
@routes.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/exams', methods=['GET'])
@login_required
def view_patient_exams(doctor_id, patient_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)

        exams = ExamResult.query.filter_by(doctor_id=doctor_id, patient_id=patient_id).all()
        return make_response(jsonify([exam.result for exam in exams]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Create a report for a patient (Doctor)
@routes.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/report', methods=['POST'])
@login_required
def create_report(doctor_id, patient_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)

        report = request.json['report']
        return make_response(jsonify({'message': 'Report sent to the patient'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@routes.route('/messages', methods=['POST'])
@login_required
def send_message():
    try:
        sender_id = current_user.id
        receiver_id = request.json['receiver_id']
        content = request.json['content']

        message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
        db.session.add(message)
        db.session.commit()

        return make_response(jsonify({'message': 'Message sent'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@routes.route('/messages/<int:user_id>', methods=['GET'])
@login_required
def get_messages(user_id):
    try:
        messages = Message.query.filter(
            (Message.sender_id == current_user.id) & (Message.receiver_id == user_id) |
            (Message.receiver_id == current_user.id) & (Message.sender_id == user_id)
        ).all()
        return make_response(jsonify([{'content': msg.content, 'timestamp': msg.timestamp} for msg in messages]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

@routes.route('/doctor/<int:doctor_id>/report', methods=['POST'])
@login_required
def write_medical_report(doctor_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)

        patient_email = request.json.get('patient_email')
        patient = Patient.query.filter_by(email=patient_email).first()

        if not patient or patient.doctor_id != doctor_id:
            return make_response(jsonify({'message': 'Patient not found or unauthorized'}), 403)

        report_content = request.json.get('report_content')
        if not report_content:
            return make_response(jsonify({'message': 'Report content is required'}), 400)

        medical_report = MedicalReport(
            patient_id=patient.id,
            doctor_id=doctor_id,
            report_content=report_content
        )

        db.session.add(medical_report)
        db.session.commit()

        return make_response(jsonify({'message': 'Medical report submitted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all medical reports for a patient (Doctor and Patient can view)
@routes.route('/reports/<int:patient_id>', methods=['GET'])
@login_required
def get_medical_reports(patient_id):
    try:
        patient = Patient.query.get_or_404(patient_id)

        if current_user.role == 'doctor' and patient.doctor_id != current_user.id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)
        elif current_user.role == 'patient' and patient.id != current_user.id:
            return make_response(jsonify({'message': 'Unauthorized access'}), 403)

        reports = MedicalReport.query.filter_by(patient_id=patient.id).all()

        return make_response(jsonify([{
            'report_content': report.report_content,
            'created_at': report.created_at
        } for report in reports]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)