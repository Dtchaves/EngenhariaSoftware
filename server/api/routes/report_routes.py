from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from api.models import db, MedicalReport, Patient, ExamResult

routes = Blueprint('report_routes', __name__)

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