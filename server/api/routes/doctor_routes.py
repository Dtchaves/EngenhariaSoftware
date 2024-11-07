from flask import Blueprint, request, jsonify, make_response, session
from flask_login import login_required, current_user
from api.schemas import doctor_schema, doctors_schema
from api.models import ExamResult, Patient, db, Doctor, UserRole
from api.constants import SERVER_ERROR_CODE, UNAUTHORIZED_CODE, FORBIDDEN_CODE, SUCCESS_CODE, INVALID_CREDENTIALS_MESSAGE
from api.auth import logout

routes = Blueprint('doctor_routes', __name__)

# Create a new doctor
@routes.route('/doctor', methods=['POST'])
def create_doctor():
    try:
        print(request.json)
        name = request.json['name']
        email = request.json['email']
        crm = request.json['crm']
        specialization = request.json['specialization']
        password = request.json['password']  # Get the password from the request

        new_doctor = Doctor(name=name, email=email, specialization=specialization, crm=crm)
        new_doctor.set_password(password)  # Set the password

        db.session.add(new_doctor)
        db.session.commit()

        return make_response(doctor_schema.jsonify(new_doctor), 201)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)

# Get all doctors
@routes.route('/doctors', methods=['GET'])
def get_doctors():
    try:
        doctors = Doctor.query.all()
        return make_response(doctors_schema.jsonify(doctors), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)

@routes.route('/doctor/profile', methods=['GET'])
@login_required
def get_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if doctor:
            return make_response(doctor_schema.jsonify(doctor), 200)
        return make_response(jsonify({'message': 'Doctor not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)

# Update a doctor
@routes.route('/doctor/profile', methods=['PUT'])
@login_required
def update_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), 404)

        doctor.name = request.json['name']
        doctor.specialization = request.json['specialization']
        doctor.email = request.json['email']

        db.session.commit()
        return make_response(doctor_schema.jsonify(doctor), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete doctor that is currently logged in
@routes.route('/doctor/profile', methods=['DELETE'])
@login_required
def delete_current_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), 404)

        logout()
        db.session.delete(doctor)
        db.session.commit()
        return make_response(jsonify({'message': 'Doctor deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
# View exam results for a patient (Doctor)
@routes.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/exams', methods=['GET'])
@login_required
def view_patient_exams(doctor_id, patient_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), UNAUTHORIZED_CODE)

        exams = ExamResult.query.filter_by(doctor_id=doctor_id, patient_id=patient_id).all()
        return make_response(jsonify([exam.result for exam in exams]), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), SERVER_ERROR_CODE)
    
# Get all exams from all patients
@routes.route('/doctor/patients', methods=['GET'])
@login_required
def get_all_exams():
    try:
        if current_user.role != UserRole.DOCTOR:
            return make_response(jsonify({'message': 'Unauthorized access'}), UNAUTHORIZED_CODE)

        patients = Patient.query.all()
        exams = db.session.query(ExamResult, Patient).join(Patient, ExamResult.patient_id == Patient.id).filter(ExamResult.doctor_id == current_user.id).all()

        exams_with_patients = {patient.id: {'patient_id': patient.id, 'patient_name': patient.name, 'results': []} for patient in patients}
        
        for exam in exams:
            exams_with_patients[exam.Patient.id]['results'].append(exam.ExamResult.result)

        exams_with_patients_list = list(exams_with_patients.values())
        return make_response(jsonify(exams_with_patients_list), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), SERVER_ERROR_CODE)

@routes.route('/doctor/patients/<int:patient_id>/exams/<int:exam_id>/send_result', methods=['PUT'])
@login_required
def send_exam_result(patient_id, exam_id):
    try:
        # Verifica se o usuário atual é um médico autorizado
        if current_user.role != 'doctor':
            return make_response(jsonify({'message': 'Unauthorized access'}), UNAUTHORIZED_CODE)
        
        # Recupera o exame e verifica se ele pertence ao médico atual e ao paciente especificado
        exam = ExamResult.query.filter_by(id=exam_id, patient_id=patient_id, doctor_id=current_user.id).first()
        if not exam:
            return make_response(jsonify({'message': 'Exam not found or access denied'}), 404)
        
        # Recebe a mensagem do request e atualiza o exame
        message = request.json.get('message')
        exam.message = message  # Adiciona a mensagem ao resultado do exame
        db.session.commit()
        
        return make_response(jsonify({'message': 'Result sent successfully'}), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), SERVER_ERROR_CODE)