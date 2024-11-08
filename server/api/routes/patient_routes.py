import base64
import os
from flask import Blueprint, current_app, request, jsonify, make_response, send_file, send_from_directory, url_for
from flask_login import login_user, logout_user, login_required, current_user
import numpy as np
import torch
from api.schemas import patient_schema, patients_schema, doctor_schema
from api.models import Doctor, ExamResult, MedicalReport, UserRole, db, Patient
from api.utils import allowed_file, load_model, make_prediction, save_file
from PIL import Image
from api.config import Config
from api.auth import logout
from matplotlib import pyplot as plt
import seaborn as sns
from api.constants import BAD_REQUEST_CODE, FORBIDDEN_CODE, SUCCESS_CODE


routes = Blueprint('patient_routes', __name__)
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = load_model(Config.MODEL_PATH, device)

model_images_path = 'server/static/model_output_images'
ecg_images_path = 'server/static/ecg_images'
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
@routes.route('/patient/profile', methods=['GET'])
@login_required
def get_patient():
    try:
        patient = Patient.query.get(current_user.id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        return make_response(patient_schema.jsonify(patient), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Update a patient
@routes.route('/patient/profile', methods=['PUT'])
@login_required
def update_patient():
    try:
        patient = Patient.query.get(current_user.id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)

        patient.name = request.json['name']
        patient.age = request.json['age']
        patient.email = request.json['email']

        db.session.commit()
        return make_response(patient_schema.jsonify(patient), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)

# Delete a patient
@routes.route('/patient/profile', methods=['DELETE'])
@login_required
def delete_current_patient():
    try:
        patient = Patient.query.get(current_user.id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        
        # Delete medical report and exam results that belong to the patient
        exam_results = ExamResult.query.filter_by(patient_id=current_user.id).all()
        for exam in exam_results:
            db.session.delete(exam)
            
        medical_reports = MedicalReport.query.filter_by(patient_id=current_user.id).all()
        for report in medical_reports:
            db.session.delete(report)

        logout()
        db.session.delete(patient)
        db.session.commit()
        return make_response(jsonify({'message': 'Patient deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@routes.route('/patient/doctor', methods=['GET'])
@login_required
def get_doctor():
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Acesso não autorizado'}), FORBIDDEN_CODE)
        
        doctor = Doctor.query.get(current_user.doctor_id)
        return make_response(jsonify(doctor_schema.dump(doctor)), SUCCESS_CODE)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), BAD_REQUEST_CODE)
    
def plotar_ecg_unico(dados, plot_path, segmentos=None, largura_figura=12, cor_linha='red'):
    print("")
    fig, ax = plt.subplots(figsize=(largura_figura, 2.5))  # Ajusta a altura da figura para uma única dimensão
    
    sns.set(style="whitegrid")  # Define um estilo de grade branca
    
    # Plotagem dos dados
    tempo = np.arange(len(dados)) / 1000  # Ajusta o eixo x para segundos
    
    # Plotagem dos dados
    sns.lineplot(x=tempo, y=dados, ax=ax, color=cor_linha, linewidth=2)
    ax.set_ylabel('Amplitude', fontsize=12)
    
    # Configura os ticks menores para capturar as ondas com mais detalhes
    ax.xaxis.set_major_locator(plt.MaxNLocator(20))  # Máximo de 20 ticks no eixo X
    ax.xaxis.set_minor_locator(plt.MaxNLocator(100))  # Máximo de 100 ticks menores no eixo X
    ax.yaxis.set_major_locator(plt.MaxNLocator(10))  # Máximo de 10 ticks no eixo Y
    ax.yaxis.set_minor_locator(plt.MaxNLocator(50))  # Máximo de 50 ticks menores no eixo Y
    
    ax.grid(True, which='both', linestyle='--', alpha=0.7)  # Adiciona grade principal e secundária
    
    # Melhorar a legibilidade do eixo x e y
    ax.tick_params(axis='x', rotation=45)
    ax.tick_params(axis='y', labelsize=12)
    
    # Adiciona um rótulo comum para o eixo X na parte inferior da figura
    ax.set_xlabel('Tempo em segundos', fontsize=12)

    # Adiciona segmentos, se fornecidos
    if segmentos is not None:
        # Mapeia cada segmento a uma cor suave
        cores_segmentos = {
                1: (0.2, 0.4, 0.8, 0.3),  # Azul mais forte
                2: (0.5, 0.8, 0.5, 0.3),  # Verde mais forte
                3: (1, 0.2, 0.2, 0.3)     # Vermelho mais forte
            } # Laranja suave
        for i in range(len(dados) - 1):
            if segmentos[i] in cores_segmentos:
                ax.axvspan(tempo[i], tempo[i + 1], color=cores_segmentos[segmentos[i]])

    plt.tight_layout(rect=[0, 0.05, 1, 0.98])  # Ajusta o layout para evitar sobreposição
    print(plot_path)
    plt.savefig(plot_path, dpi=300)
    plt.show()
    plt.close()
    
@routes.route('/patient/upload_ecg', methods=['POST'])
@login_required
def upload_exam():
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Only patients can upload exams'}), 403)

        file = request.files.get('file')
        name = request.form.get('name')
        if not file or not allowed_file(file.filename, Config.ALLOWED_EXTENSIONS):
            return make_response(jsonify({'message': 'File not found or invalid file type'}), 400)

        filepath = save_file(file, Config.UPLOAD_FOLDER, name)
        file_np_array = np.loadtxt(filepath, delimiter=",")
        
        img_tensor = torch.from_numpy(file_np_array).float().unsqueeze(0)
        if img_tensor.shape[1] > img_tensor.shape[2]:
            img_tensor = img_tensor.permute(0, 2, 1).to(device) 
        print(img_tensor)
        
        result_dict = make_prediction(model, img_tensor, f'{model_images_path}/{name}_model_plot.png')
        
        plotar_ecg_unico(torch.from_numpy(file_np_array).flatten(), f'{ecg_images_path}/{name}_ecg_plot.png')
        
        # with open(f'ecg_images/ecg_{name}_plot.png', "rb") as img_file:
        #     encoded_img = base64.b64encode(img_file.read()).decode('utf-8')

        # result_data = {'image': encoded_img }
        
        # Query the patient object
        patient = Patient.query.get(current_user.id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        
        exam_result = ExamResult(patient_id=current_user.id, doctor_id=patient.doctor.id, exam_name=name, result=result_dict, ecg_image_path=f'{ecg_images_path}/{name}_ecg_plot.png', model_result_image_path=f'{model_images_path}/{name}_model_plot.png')
        db.session.add(exam_result)
        db.session.commit()

        return make_response(jsonify({'examID': exam_result.id}), 201)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@routes.route('/patient/exams', methods=['GET'])
@login_required
def get_patient_exams():
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Acesso não autorizado'}), 403)
        
        exams = ExamResult.query.filter_by(patient_id=current_user.id).all()
        exams_data = []
        for exam in exams:
            doctor = Doctor.query.get(exam.doctor_id)

            exam_info = {
                'id': exam.id,
                'exam_name': exam.exam_name,
                'created_at': exam.created_at,
                'doctor_name': doctor.name,
            }
            exams_data.append(exam_info)
        
        return make_response(jsonify(exams_data), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
@routes.route('/patient/exams/<int:exam_id>', methods=['GET'])
@login_required
def get_patient_exam(exam_id):
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Acesso não autorizado'}), 403)
        
        exam = ExamResult.query.get(exam_id)
        if not exam:
            return make_response(jsonify({'message': 'Exame não encontrado'}), 404)
        
        doctor = Doctor.query.get(exam.doctor_id)
        
        # Carregar e codificar a imagem em Base64
        # image_path = os.path.join(current_app.root_path, 'static/ecg_images', exam.ecg_image_path)
        with open(exam.ecg_image_path, "rb") as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        
        exam_info = {
            'id': exam.id,
            'exam_name': exam.exam_name,
            'ecg_image_base64': encoded_image,  # Imagem codificada em Base64
            'created_at': exam.created_at,
            'doctor_name': doctor.name,
            'doctor_email': doctor.email,
            'doctor_feedback': exam.doctor_feedback
        }
        
        return make_response(jsonify(exam_info), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)


@routes.route('/images/<filename>')
def serve_ecg_image(filename):
    # filename = filename.replace('server/', '')
    # # Construa o caminho completo do arquivo
    # file_path = os.path.join(current_app.root_path, filename)
    return send_file(filename)