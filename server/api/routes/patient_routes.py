import os
from flask import Blueprint, request, jsonify, make_response
from flask_login import login_user, logout_user, login_required, current_user
import numpy as np
import torch
from api.schemas import patient_schema, patients_schema
from api.models import ExamResult, UserRole, db, Patient
from api.utils import allowed_file, load_model, make_prediction, save_file
from PIL import Image
from api.config import Config
from api.auth import logout
from matplotlib import pyplot as plt
import seaborn as sns

routes = Blueprint('patient_routes', __name__)
model = load_model(Config.MODEL_PATH)
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

        logout()
        db.session.delete(patient)
        db.session.commit()
        return make_response(jsonify({'message': 'Patient deleted successfully'}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)
    
def plotar_ecg_unico(dados, plot_path, segmentos=None, largura_figura=12, cor_linha='black'):
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
    
@routes.route('/temp_route', methods=['POST'])
@login_required
def upload_exam(patient_id):
    try:
        if current_user.role != UserRole.PATIENT:
            return make_response(jsonify({'message': 'Only patients can upload exams'}), 403)

        file = request.files.get('file')
        if not file or not allowed_file(file.filename, Config.ALLOWED_EXTENSIONS):
            return make_response(jsonify({'message': 'File not found or invalid file type'}), 400)

        filepath = save_file(file, Config.UPLOAD_FOLDER)
        file_np_array = np.loadtxt(filepath)
        
        img_tensor = torch.from_numpy(file_np_array).float().unsqueeze(0)
        img_tensor = img_tensor.view(1, 12, -1) 
        
        result = make_prediction(model, img_tensor)
        
        plotar_ecg_unico(file_np_array, 'plot.png')
        image = Image.open('plot.png')

        result_data = {'result': result.item()}
        
        # Query the patient object
        patient = Patient.query.get(patient_id)
        if not patient:
            return make_response(jsonify({'message': 'Patient not found'}), 404)
        
        exam_result = ExamResult(patient_id=patient_id, doctor_id=patient.doctor.id, result={})
        db.session.add(exam_result)
        db.session.commit()

        return make_response(jsonify({'message': 'File uploaded successfully', 'result': result_data}), 200)
    except Exception as e:
        return make_response(jsonify({'message': str(e)}), 500)