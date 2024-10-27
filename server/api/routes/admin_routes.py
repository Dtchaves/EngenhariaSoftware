from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required
from api.models import db, Admin, Doctor, Patient

routes = Blueprint('admin_routes', __name__)

# Create a new admin
@routes.route('/admins', methods=['POST'])
def create_admin():
    try:
        print('bbb')
        data = request.json
        admin = Admin(email=data['email'])
        admin.set_password(data['password'])
        db.session.add(admin)
        db.session.commit()
        return make_response(jsonify({'message': 'Admin created successfully'}), 201)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all doctors
@routes.route('/admins/doctors', methods=['GET'])
@login_required
def get_all_doctors():
    try:
        doctors = Doctor.query.all()
        return make_response(jsonify([doctor.name for doctor in doctors]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Get all patients
@routes.route('/admins/patients', methods=['GET'])
@login_required
def get_all_patients():
    try:
        patients = Patient.query.all()
        return make_response(jsonify([patient.name for patient in patients]), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete a doctor
@routes.route('/admins/doctor/<id>', methods=['DELETE'])
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
@routes.route('/admins/patient/<id>', methods=['DELETE'])
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