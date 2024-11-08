from flask import Blueprint, request, jsonify, make_response, session
from flask_login import login_required, current_user
from api.schemas import doctor_schema, doctors_schema, patient_schema, patients_schema
from api.models import ExamResult, Patient, db, Doctor, UserRole
from api.constants import BAD_REQUEST_CODE, CREATED_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE, UNAUTHORIZED_CODE, FORBIDDEN_CODE, SUCCESS_CODE, INVALID_CREDENTIALS_MESSAGE
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

        return make_response(doctor_schema.jsonify(new_doctor), CREATED_CODE)
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

@routes.route('/doctor/profile', methods=['GET'])
@login_required
def get_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if doctor:
            return make_response(doctor_schema.jsonify(doctor), SUCCESS_CODE)
        return make_response(jsonify({'message': 'Doctor not found'}), NOT_FOUND_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

# Update a doctor
@routes.route('/doctor/profile', methods=['PUT'])
@login_required
def update_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), NOT_FOUND_CODE)

        doctor.name = request.json['name']
        doctor.specialization = request.json['specialization']
        doctor.email = request.json['email']

        db.session.commit()
        return make_response(doctor_schema.jsonify(doctor), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

# Delete doctor that is currently logged in
@routes.route('/doctor/profile', methods=['DELETE'])
@login_required
def delete_current_doctor():
    try:
        doctor = Doctor.query.get(current_user.id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), NOT_FOUND_CODE)

        logout()
        db.session.delete(doctor)
        db.session.commit()
        return make_response(jsonify({'message': 'Doctor deleted successfully'}), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)
    
# View exam results for a patient (Doctor)
@routes.route('/doctor/<int:doctor_id>/patient/<int:patient_id>/exams', methods=['GET'])
@login_required
def view_patient_exams(doctor_id, patient_id):
    try:
        if current_user.role != 'doctor' or current_user.id != doctor_id:
            return make_response(jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE)

        exams = ExamResult.query.filter_by(doctor_id=doctor_id, patient_id=patient_id).all()
        return make_response(jsonify([exam.result for exam in exams]), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), SERVER_ERROR_CODE)
    
# # Get all patients from a doctor
# @routes.route('/doctor/patients', methods=['GET'])
# @login_required
# def get_all_patients():
#     try:
#         if current_user.role != UserRole.DOCTOR:
#             return make_response(jsonify({'message': 'Unauthorized access'}), UNAUTHORIZED_CODE)

#         patients = Patient.query.filter_by(doctor_id=current_user.id).all()
#         return make_response(jsonify([patient.to_dict() for patient in patients]), SUCCESS_CODE)
#     except Exception as e:
#         return make_response(jsonify({'message': str(e)}), SERVER_ERROR_CODE)

# Get all exams from all patients
@routes.route('/doctor/patients/exams', methods=['GET'])
@login_required
def get_all_exams():
    try:
        if current_user.role != UserRole.DOCTOR:
            return make_response(jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE)

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
            return make_response(jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE)
        
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

#Rota para pegar todos os pacientes de um médico
@routes.route('/doctor/patients', methods=['GET'])
@login_required
def get_patients():
    try:
        if current_user.role != UserRole.DOCTOR:
            return make_response(jsonify({'message': 'Acesso não autorizado'}), FORBIDDEN_CODE)
        
        patients = Patient.query.filter_by(doctor_id=current_user.id).all()
        return make_response(jsonify(patients_schema.dump(patients)), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)

#Rota para pegar todos os exames de um paciente
@routes.route('/doctor/patient/<int:patient_id>', methods=['GET'])
@login_required
def get_patient_exams(patient_id):
    try:
        if current_user.role != 'doctor':
            return make_response(jsonify({'message': 'Unauthorized access'}), FORBIDDEN_CODE)
        
        patient = Patient.query.filter_by(patient_id=patient_id, doctor_id=current_user.id)
        
        if not patient:
            return make_response(jsonify({'message': 'Paciente não encontrado'}), NOT_FOUND_CODE)
        
        exams = ExamResult.query.filter_by(patient_id=patient_id, doctor_id=current_user.id).all()
        
        exams_data = [
            {**exam.to_dict(), "patient_name": patient.name} for exam in exams
        ]
        
        return make_response(
            jsonify({
                "patient": patient_schema.jsonify(patient),
                "exams": exams_data
            }), SUCCESS_CODE
        )
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)
