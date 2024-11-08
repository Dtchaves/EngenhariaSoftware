from flask import Blueprint, make_response, request, jsonify, session
from flask_cors import cross_origin
from flask_login import login_user, logout_user, login_required, current_user
from api.models import db, Doctor, Patient, Admin
from api.constants import UNAUTHORIZED_CODE, FORBIDDEN_CODE, SUCCESS_CODE, INVALID_CREDENTIALS_MESSAGE

auth = Blueprint('auth', __name__)

# @auth.before_request
# def restrict_access():
#     if not current_user.is_authenticated:
#         return jsonify({"message": "Login required"}), UNAUTHORIZED_CODE
    
#     restricted_paths = {
#         "patient": ["/doctors", "/admin"],
#         "doctor": ["/admin"],
#         "admin": []
#     }

#     if any(request.path.startswith(path) for path in restricted_paths.get(current_user.role, [])):
#         return jsonify({"message": "Unauthorized access"}), FORBIDDEN_CODE

# # Patient registration
# @auth.route('/register/patient', methods=['POST'])
# def register_patient():
#     data = request.json
#     patient = Patient(name=data['name'], email=data['email'], age=data['age'])
#     patient.set_password(data['password'])
#     patient.role = 'patient'
#     db.session.add(patient)
#     db.session.commit()
#     return jsonify({'message': 'Patient registered successfully'}), SUCCESS_CODE

# # Doctor registration
# @auth.route('/register/doctor', methods=['POST'])
# def register_doctor():
#     data = request.json
#     doctor = Doctor(name=data['name'], crm=data['crm'], specialization=data['specialization'])
#     doctor.set_password(data['password'])
#     doctor.role = 'doctor'
#     db.session.add(doctor)
#     db.session.commit()
#     return jsonify({'message': 'Doctor registered successfully'}), SUCCESS_CODE

# @auth.route('/register/admin', methods=['POST'])
# def register_admin():
#     data = request.json
#     admin = Admin(email=data['email'])
#     admin.set_password(data['password'])
#     admin.role = 'admin'
#     db.session.add(admin)
#     db.session.commit()
#     return jsonify({'message': 'Admin registered successfully'}), SUCCESS_CODE

@auth.route('/check', methods=['GET'])
@login_required
def check_authentication():
    return jsonify({'authenticated': True, 'user': {'id': current_user.id, 'name': current_user.name, 'role': str(current_user.role.value)}}), SUCCESS_CODE

# Login for patients, doctors, and admins
@auth.route('/login', methods=['POST'])
@cross_origin(methods=['POST'], supports_credentials=True)
def login():
    data = request.json
    user = None
    user_role = data['role']

    if user_role == 'Patient':
        user = Patient.query.filter_by(email=data['email']).first()
    elif user_role == 'Doctor':
        user = Doctor.query.filter_by(crm=data['crm']).first()
    elif user_role == 'Admin':
        user = Admin.query.filter_by(email=data['email']).first()

    if user and user.check_password(data['password']):
        login_user(user)
        print(session)
        response = make_response(jsonify({
            'message': f'Welcome {user.name}',
            'role': str(user_role)
        }))
        return response, SUCCESS_CODE
        
    return jsonify({'message': INVALID_CREDENTIALS_MESSAGE}), UNAUTHORIZED_CODE

# Admin login (if separate from user login)
@auth.route('/login/admin', methods=['POST'])
def login_admin():
    data = request.json
    admin = Admin.query.filter_by(email=data['email']).first()
    if admin and admin.check_password(data['password']):
        login_user(admin)
        return jsonify({'message': 'Admin logged in successfully'}), SUCCESS_CODE
    return jsonify({'message': INVALID_CREDENTIALS_MESSAGE}), UNAUTHORIZED_CODE

# Logout route
@auth.route('/logout', methods=['POST'])
@cross_origin(methods=['POST'], supports_credentials=True)
@login_required
def logout():
    print(current_user)
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), SUCCESS_CODE

