from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user, logout_user, login_required, current_user
from api.schemas import doctor_schema, doctors_schema
from api.models import db, Doctor, UserRole

routes = Blueprint('doctor_routes', __name__)

# Create a new doctor
@routes.route('/doctors', methods=['POST'])
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

# Get a specific doctor by ID
@routes.route('/doctors/<id>', methods=['GET'])
def get_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if doctor:
            return make_response(doctor_schema.jsonify(doctor), 200)
        return make_response(jsonify({'message': 'Doctor not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 400)

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

# Delete a doctor
@routes.route('/doctors/<id>', methods=['DELETE'])
def delete_doctor(id):
    try:
        doctor = Doctor.query.get(id)
        if not doctor:
            return make_response(jsonify({'message': 'Doctor not found'}), 404)

        db.session.delete(doctor)
        db.session.commit()
        return make_response(jsonify({'message': 'Doctor deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)