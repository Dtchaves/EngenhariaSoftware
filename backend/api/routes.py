from flask import Flask, request, jsonify
from app.schemas import doctor_schema, doctors_schema, patient_schema, patients_schema
from app.models import db, Doctor, Patient, Admin, ExamResult, Message, MedicalReport
from flask_login import login_required
import torch
from PIL import Image
import io
from werkzeug.utils import secure_filename
import os
from app.util import save_file, allowed_file, load_model, make_prediction

app = Flask(__name__)
model = load_model(app.config['MODEL_PATH'])

# Create a new doctor
@app.route('/doctors', methods=['POST'])
def create_doctor():
    name = request.json['name']
    specialization = request.json['specialization']
    email = request.json['email']

    new_doctor = Doctor(name=name, specialization=specialization, email=email)
    db.session.add(new_doctor)
    db.session.commit()

    return doctor_schema.jsonify(new_doctor)

# Get all doctors
@app.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return doctors_schema.jsonify(doctors)

# Get a specific doctor by ID
@app.route('/doctors/<id>', methods=['GET'])
def get_doctor(id):
    doctor = Doctor.query.get(id)
    return doctor_schema.jsonify(doctor)

# Update a doctor
@app.route('/doctors/<id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get(id)

    doctor.name = request.json['name']
    doctor.specialization = request.json['specialization']
    doctor.email = request.json['email']

    db.session.commit()
    return doctor_schema.jsonify(doctor)

# Delete a doctor
@app.route('/doctors/<id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get(id)
    db.session.delete(doctor)
    db.session.commit()

    return jsonify({'message': 'Doctor deleted successfully'})

# Create a new patient
@app.route('/patients', methods=['POST'])
def create_patient():
    name = request.json['name']
    age = request.json['age']
    email = request.json['email']
    doctor_id = request.json['doctor_id']

    new_patient = Patient(name=name, age=age, email=email, doctor_id=doctor_id)
    db.session.add(new_patient)
    db.session.commit()

    return patient_schema.jsonify(new_patient)

# Get all patients
@app.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return patients_schema.jsonify(patients)

# Get a specific patient by ID
@app.route('/patients/<id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get(id)
    return patient_schema.jsonify(patient)

# Update a patient
@app.route('/patients/<id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)

    patient.name = request.json['name']
    patient.age = request.json['age']
    patient.email = request.json['email']
    patient.doctor_id = request.json['doctor_id']

    db.session.commit()
    return patient_schema.jsonify(patient)

# Delete a patient
@app.route('/patients/<id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get(id)
    db.session.delete(patient)
    db.session.commit()

    return jsonify({'message': 'Patient deleted successfully'})

# CRUD for Admin
@app.route('/admin', methods=['POST'])
@login_required
def create_admin():
    data = request.json
    admin = Admin(username=data['username'])
    admin.set_password(data['password'])
    admin.role = 'admin'
    db.session.add(admin)
    db.session.commit()
    return jsonify({'message': 'Admin created successfully'})

# Get all doctors
@app.route('/admin/doctors', methods=['GET'])
@login_required
def get_all_doctors():
    doctors = Doctor.query.all()
    return jsonify([doctor.name for doctor in doctors])

# Get all patients
@app.route('/admin/patients', methods=['GET'])
@login_required
def get_all_patients():
    patients = Patient.query.all()
    return jsonify([patient.name for patient in patients])

# Delete a doctor
@app.route('/admin/doctor/<id>', methods=['DELETE'])
@login_required
def delete_doctor(id):
    doctor = Doctor.query.get(id)
    if doctor:
        db.session.delete(doctor)
        db.session.commit()
        return jsonify({'message': 'Doctor deleted'})
    return jsonify({'message': 'Doctor not found'}), NOT_FOUND_CODE

# Delete a patient
@app.route('/admin/patient/<id>', methods=['DELETE'])
@login_required
def delete_patient(id):
    patient = Patient.query.get(id)
    if patient:
        db.session.delete(patient)
        db.session.commit()
        return jsonify({'message': 'Patient deleted'})
    return jsonify({'message': 'Patient not found'}), NOT_FOUND_CODE

@app.route('/patients/<int:patient_id>/upload_exam', methods=['POST'])
@login_required
def upload_exam(patient_id):
    if current_user.role != UserRole.PATIENT:
        return jsonify({'message': 'Only patients can upload exams'}), FORBIDDEN_CODE

    file = request.files.get('file')
    if not file or not allowed_file(file.filename, app.config['ALLOWED_EXTENSIONS']):
        return jsonify({'message': FILE_NOT_FOUND_MESSAGE}), BAD_REQUEST_CODE

    filepath = save_file(file, app.config['UPLOAD_FOLDER'])
    
    img = Image.open(filepath)
    img_tensor = torch.from_numpy(np.array(img)).float().unsqueeze(0)
    result = make_prediction(model, img_tensor)

    result_data = {'result': result.item()}
    exam_result = ExamResult(patient_id=patient_id, doctor_id=patient.doctor.id, result=result_data)
    db.session.add(exam_result)
    db.session.commit()

    return jsonify({'message': FILE_UPLOAD_SUCCESS, 'result': result_data})

# View all patients (Doctor)
@app.route('/doctor/<int:doctor_id>/patients', methods=['GET'])
@login_required
def get_patients(doctor_id):
    if current_user.role != 'doctor' or current_user.id != doctor_id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE
    patients = Patient.query.filter_by(doctor_id=doctor_id).all()
    return jsonify([patient.name for patient in patients])

# View exam results for a patient (Doctor)
@app.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/exams', methods=['GET'])
@login_required
def view_patient_exams(doctor_id, patient_id):
    if current_user.role != 'doctor' or current_user.id != doctor_id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE

    exams = ExamResult.query.filter_by(doctor_id=doctor_id, patient_id=patient_id).all()
    return jsonify([exam.result for exam in exams])

# Create a report for a patient (Doctor)
@app.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/report', methods=['POST'])
@login_required
def create_report(doctor_id, patient_id):
    if current_user.role != 'doctor' or current_user.id != doctor_id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE

    report = request.json['report']
    return jsonify({'message': 'Report sent to the patient'})

@app.route('/messages', methods=['POST'])
@login_required
def send_message():
    sender_id = current_user.id
    receiver_id = request.json['receiver_id']
    content = request.json['content']

    message = Message(sender_id=sender_id, receiver_id=receiver_id, content=content)
    db.session.add(message)
    db.session.commit()

    return jsonify({'message': 'Message sent'})

@app.route('/messages/<int:user_id>', methods=['GET'])
@login_required
def get_messages(user_id):
    messages = Message.query.filter(
        (Message.sender_id == current_user.id) & (Message.receiver_id == user_id) |
        (Message.receiver_id == current_user.id) & (Message.sender_id == user_id)
    ).all()
    return jsonify([{'content': msg.content, 'timestamp': msg.timestamp} for msg in messages])

@app.route('/doctor/<int:doctor_id>/report', methods=['POST'])
@login_required
def write_medical_report(doctor_id):
    if current_user.role != 'doctor' or current_user.id != doctor_id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE

    patient_email = request.json.get('patient_email')
    patient = Patient.query.filter_by(email=patient_email).first()

    if not patient or patient.doctor_id != doctor_id:
        return jsonify({'message': 'Patient not found or unauthorized'}), FORBIDDEN_CODE

    report_content = request.json.get('report_content')
    if not report_content:
        return jsonify({'message': 'Report content is required'}), BAD_REQUEST_CODE

    medical_report = MedicalReport(
        patient_id=patient.id,
        doctor_id=doctor_id,
        report_content=report_content
    )

    db.session.add(medical_report)
    db.session.commit()

    return jsonify({'message': 'Medical report submitted successfully'})

# Get all medical reports for a patient (Doctor and Patient can view)
@app.route('/reports/<int:patient_id>', methods=['GET'])
@login_required
def get_medical_reports(patient_id):
    patient = Patient.query.get_or_404(patient_id)

    if current_user.role == 'doctor' and patient.doctor_id != current_user.id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE
    elif current_user.role == 'patient' and patient.id != current_user.id:
        return jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE

    reports = MedicalReport.query.filter_by(patient_id=patient.id).all()

    return jsonify([{
        'report_content': report.report_content,
        'created_at': report.created_at
    } for report in reports])
