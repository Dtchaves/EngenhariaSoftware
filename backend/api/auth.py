from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from app.models import db, Doctor, Patient, Admin
from app.constants import UNAUTHORIZED_CODE, FORBIDDEN_CODE, SUCCESS_CODE, INVALID_CREDENTIALS_MESSAGE

auth = Blueprint('auth', __name__)

@auth.before_request
def restrict_access():
    if not current_user.is_authenticated:
        return jsonify({"message": "Login required"}), UNAUTHORIZED_CODE
    
    restricted_paths = {
        "patient": ["/doctors", "/admin"],
        "doctor": ["/admin"],
        "admin": []
    }

    if any(request.path.startswith(path) for path in restricted_paths.get(current_user.role, [])):
        return jsonify({"message": "Unauthorized access"}), FORBIDDEN_CODE

# Patient registration
@auth.route('/register/patient', methods=['POST'])
def register_patient():
    data = request.json
    patient = Patient(name=data['name'], email=data['email'], age=data['age'])
    patient.set_password(data['password'])
    patient.role = 'patient'
    db.session.add(patient)
    db.session.commit()
    return jsonify({'message': 'Patient registered successfully'}), SUCCESS_CODE

# Doctor registration
@auth.route('/register/doctor', methods=['POST'])
def register_doctor():
    data = request.json
    doctor = Doctor(name=data['name'], crm=data['crm'], specialization=data['specialization'])
    doctor.set_password(data['password'])
    doctor.role = 'doctor'
    db.session.add(doctor)
    db.session.commit()
    return jsonify({'message': 'Doctor registered successfully'}), SUCCESS_CODE

# Login for patients, doctors, and admins
@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    user = None

    if 'email' in data:
        user = Patient.query.filter_by(email=data['email']).first()
    elif 'crm' in data:
        user = Doctor.query.filter_by(crm=data['crm']).first()
    elif 'username' in data:
        user = Admin.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        login_user(user)
        return jsonify({'message': f'Welcome {user.name}', 'role': user.role}), SUCCESS_CODE

    return jsonify({'message': INVALID_CREDENTIALS_MESSAGE}), UNAUTHORIZED_CODE

# Admin login (if separate from user login)
@auth.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.json
    admin = Admin.query.filter_by(username=data['username']).first()
    if admin and admin.check_password(data['password']):
        login_user(admin)
        return jsonify({'message': 'Admin logged in successfully'}), SUCCESS_CODE
    return jsonify({'message': INVALID_CREDENTIALS_MESSAGE}), UNAUTHORIZED_CODE

# Logout route
@auth.route('/logout', methods=['GET'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), SUCCESS_CODE
